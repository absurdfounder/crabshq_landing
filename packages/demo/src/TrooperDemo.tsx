'use client';

import { useState, useEffect, useCallback, useRef, type ReactNode, type RefObject, type PointerEvent as ReactPointerEvent } from "react";
import {
  RotateCcw, Pause, Play, Lock, Bell, Hash, LayoutGrid, Activity, Home, ListTodo, Plus, Search,
  Target, HardDrive, Brain, Users, Laptop, Settings, Shapes, Clock,
  ChevronDown, Columns3, List, MessageSquarePlus, ArrowUp,
  MessagesSquare, ArrowLeftRight, SlidersHorizontal, Mic, Heart, MessageCircle,
} from "lucide-react";
import { TROOPER_DEMO as C, KANBAN_COLUMNS, type DemoColumnId } from './components/demoTheme';
import { DemoMainPage, DEMO_AGENTS } from './components/demoPages';
import { DemoTaskModal, type DemoGenerationState } from './components/demoTaskModal';
import { DemoFavicon } from './components/DemoFavicon';
import {
  type DemoArtifact, type DemoFeedItem, type DemoSubtask, type TaskExecStep, type DemoWorkspaceMode,
} from './components/demoTaskExecution';
import {
  getDemoScenario,
  DEFAULT_DEMO_SCENARIO_ID,
  HERO_SCENARIO_ROTATION,
  type DemoScenarioId,
} from './scenarios/index';
import type { DemoChannel, DemoKanbanTask, DemoOrg, ChannelBrand } from './scenarios/types';
import { DemoClickCursor, useDemoCursor } from './components/DemoClickCursor';
import { DemoKanbanColumn, DemoDragOverlay, DEMO_KANBAN_COL_W, DEMO_KANBAN_GAP } from './components/DemoKanban';
import {
  EMPTY_ARTIFACT_REVIEW,
  defaultArtifactReviewComment,
  getArtifactReviewLines,
  type ArtifactReviewState,
} from './lib/demoArtifactReview';
import {
  animateChatStepCursor, animateExecStepCursor, execStepCursorAfterApply, cursorContextForStep, REACTION_MS,
} from './lib/demoCursorActions';
import { DEMO_KEYFRAMES, DRAG, DUR, EASE_OUT, typingDelayFor, usePrefersReducedMotion } from './lib/demoMotion';
import { useDemoDrag } from './lib/useDemoDrag';
import { rectInCanvas, type CanvasRect } from './lib/demoGeometry';

type CanvasReviewState = ArtifactReviewState & { artifactName: string };

const HUMANS = [
  { name: "Vaibhav", role: "Founder", img: "https://avatars.githubusercontent.com/u/25829699?v=4" },
];

const ALL_PEOPLE = Object.fromEntries(
  [...HUMANS, ...DEMO_AGENTS].map(p => [p.name, p])
);

type Task = DemoKanbanTask;
type Message = { sender: string; role: string; text: string; isHuman: boolean; time: string; reaction?: { emoji: string; count: number } };
type SidebarTab = 'menu' | 'channels';
type DemoPageId = 'home' | 'tasks' | 'goals' | 'routines' | 'files' | 'agents' | 'devices' | 'memory' | 'skills' | 'settings';
/** `script` = the reel drives; `user` = the visitor has taken the wheel. */
type DemoMode = 'script' | 'user';

const SPLIT_PAGES: DemoPageId[] = ['tasks'];

/** How long the demo waits after the visitor stops before picking the reel back up. */
const RESUME_AFTER_MS = 6000;

/**
 * Design canvas for the landing showcase.
 *
 * Narrower than a real desktop shell so fit-scale stays near 1 (readable text
 * without a crop-zoom hack). Chat is intentionally wide; the board takes the
 * remaining pane and scrolls horizontally for extra columns.
 *
 * 1320 − 52 rail − 216 sidebar − 440 chat = 612 board pane.
 */
const DEMO_CANVAS_W = 1320;
const DEMO_APP_H = 700;
const DEMO_CHROME_H = 44;
const DEMO_CANVAS_H = DEMO_APP_H + DEMO_CHROME_H;
const DEMO_SIDEBAR_W = 216;
const DEMO_CHAT_W = 440;

function DemoScaleFrame({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      // Fit the host exactly — scale down on narrow hosts and up on wide ones
      // so we never leave empty gutters beside a 1× canvas.
      setScale(w > 0 ? w / DEMO_CANVAS_W : 1);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const scaledW = DEMO_CANVAS_W * scale;
  const scaledH = DEMO_CANVAS_H * scale;

  return (
    <div ref={containerRef} className="w-full overflow-hidden" style={{ position: 'relative' }}>
      <div style={{ height: scaledH, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: scaledW, height: scaledH, position: 'relative', flexShrink: 0 }}>
          <div
            data-demo-canvas
            style={{
              width: DEMO_CANVAS_W,
              height: DEMO_CANVAS_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function avatarFor(name: string): string | undefined {
  const p = ALL_PEOPLE[name as keyof typeof ALL_PEOPLE];
  return p?.img || `https://i.pravatar.cc/150?u=${name.toLowerCase()}`;
}

function Av({ name, size = 28, border = true }: { name: string; size?: number; border?: boolean }) {
  const src = avatarFor(name);
  return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: border ? `1.5px solid ${C.card}` : "none", flexShrink: 0, display: "block" }} />;
}

function renderMentionParts(text: string, chip = false) {
  return text.split(/(@\w+)/g).map((part, i) => {
    if (!part.startsWith("@")) return <span key={i}>{part}</span>;
    const name = part.slice(1);
    return (
      <span key={i} style={{
        display: "inline-flex", alignItems: "center", gap: chip ? 4 : 0,
        color: C.brand, fontWeight: 600,
        background: chip ? C.brandLight : "transparent",
        border: chip ? `1px solid ${C.brandSoft}` : "none",
        padding: chip ? "1px 6px 1px 4px" : 0,
        borderRadius: chip ? 6 : 0,
        marginRight: chip ? 4 : 0,
        verticalAlign: chip ? "middle" : undefined,
        fontSize: chip ? 13 : undefined,
      }}>
        {chip ? <Av name={name} size={16} border={false} /> : null}
        {part}
      </span>
    );
  });
}

function ComposerTag({ children, icon: Icon, onClick }: { children: ReactNode; icon?: typeof ArrowLeftRight; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="demo-hoverable demo-chip" style={{
      display: "inline-flex", alignItems: "center", gap: 4, height: 28, padding: "0 8px",
      borderRadius: 8, border: `1px solid ${C.border}`, background: C.card,
      fontSize: 11, fontWeight: 500, color: C.textMuted, cursor: "pointer", whiteSpace: "nowrap",
    }}>
      {Icon ? <Icon size={12} strokeWidth={1.75} /> : null}
      {children}
      <ChevronDown size={11} strokeWidth={2} color={C.textSubtle} />
    </button>
  );
}

function DemoSidebarRail({ org, onActivity }: { org: DemoOrg; onActivity: () => void }) {
  return (
    <div style={{ width: 52, minWidth: 52, borderRight: `1px solid ${C.border}`, background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
        <img src="/images/trooper-logomark-64.webp" alt="" style={{ width: 32, height: 32, objectFit: "contain" }} />
        <div style={{ width: 28, height: 1, background: "rgba(231,229,228,0.9)" }} />
        <div style={{ width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: C.card, boxShadow: "0 1px 4px rgba(28,25,23,0.08)", overflow: "hidden", padding: 6 }}>
          <DemoFavicon src={org.icon} size={24} rounded="md" alt={org.name} />
        </div>
        <button type="button" onClick={onActivity} className="demo-hoverable demo-icon-btn" style={{ width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(245,245,244,0.7)", color: C.textSubtle, border: "none", cursor: "pointer" }}>
          <Plus size={16} strokeWidth={1.5} />
        </button>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(28,25,23,0.06)" }}>
        <Av name="Vaibhav" size={40} border={false} />
      </div>
    </div>
  );
}

const MENU_NAV = {
  core: [
    { label: "Home", icon: Home, id: "home" as DemoPageId },
    { label: "Tasks", icon: ListTodo, id: "tasks" as DemoPageId },
    { label: "Goals", icon: Target, id: "goals" as DemoPageId },
    { label: "Routines", icon: Clock, id: "routines" as DemoPageId },
    { label: "Files", icon: HardDrive, id: "files" as DemoPageId },
  ],
  team: [
    { label: "Agents", icon: Users, id: "agents" as DemoPageId },
    { label: "Devices", icon: Laptop, id: "devices" as DemoPageId },
    { label: "Memory", icon: Brain, id: "memory" as DemoPageId },
  ],
  advanced: [
    { label: "Skills & Plugins", icon: Shapes, id: "skills" as DemoPageId },
    { label: "Settings", icon: Settings, id: "settings" as DemoPageId },
  ],
};

function DemoSidebarNav({
  sidebarTab, setSidebarTab, activePage, onNavigate, activeChannel, onSelectChannel, onActivity,
  channels, org,
}: {
  sidebarTab: SidebarTab;
  setSidebarTab: (t: SidebarTab) => void;
  activePage: DemoPageId;
  onNavigate: (id: DemoPageId) => void;
  activeChannel: string;
  onSelectChannel: (id: string) => void;
  onActivity: () => void;
  channels: DemoChannel[];
  org: DemoOrg;
}) {
  const sectionLabel = { fontSize: 11, fontWeight: 500, color: C.textMuted, padding: "0 4px 6px" } as const;
  const tabBtn = (tab: SidebarTab, icon: typeof LayoutGrid, label: string) => {
    const active = sidebarTab === tab;
    return (
      <button
        type="button"
        data-demo-target={tab === 'channels' ? 'sidebar-channels-tab' : undefined}
        className="demo-hoverable demo-row"
        onClick={() => { onActivity(); setSidebarTab(tab); }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: active ? "0 10px" : 0,
          width: active ? "auto" : 32, borderRadius: 16, border: "none", cursor: "pointer",
          background: active ? C.card : "transparent",
          boxShadow: active ? "0 1px 3px rgba(28,25,23,0.06)" : "none",
          fontSize: 14, fontWeight: 600, color: active ? C.text : C.textMuted,
          justifyContent: "center",
        }}
        aria-pressed={active}
      >
        {icon === LayoutGrid ? <LayoutGrid size={16} strokeWidth={1.35} /> : <MessagesSquare size={16} strokeWidth={1.35} />}
        {active ? label : null}
      </button>
    );
  };

  const navRow = (item: { label: string; icon: typeof Home; id: DemoPageId }, tone: "primary" | "advanced" = "primary") => {
    const Icon = item.icon;
    const active = activePage === item.id;
    return (
      <button
        key={item.id}
        type="button"
        data-demo-target={item.id === 'tasks' ? 'nav-tasks' : undefined}
        className="demo-hoverable demo-row"
        onClick={() => { onActivity(); onNavigate(item.id); }}
        style={{
          display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 16, marginBottom: 2,
          width: "100%", border: "none", cursor: "pointer", textAlign: "left",
          background: active ? C.card : "transparent",
          boxShadow: active ? "0 1px 3px rgba(28,25,23,0.06)" : "none",
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          background: active ? C.brandLight : tone === "advanced" ? C.brandLight : "rgba(237,235,233,0.8)",
          color: active ? "#292524" : tone === "advanced" ? C.textSubtle : C.textMuted,
        }}>
          <Icon size={16} strokeWidth={1.35} />
        </div>
        <span style={{ fontSize: 14, fontWeight: active ? 600 : tone === "advanced" ? 400 : 500, color: active ? C.text : tone === "advanced" ? C.textMuted : "#44403c" }}>{item.label}</span>
      </button>
    );
  };

  const channelRow = (ch: DemoChannel) => {
    const active = activeChannel === ch.id;
    return (
      <button
        key={ch.id}
        type="button"
        className="demo-hoverable demo-row"
        onClick={() => { onActivity(); onSelectChannel(ch.id); onNavigate('tasks'); }}
        style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 16, marginBottom: 4,
          width: "100%", border: "none", cursor: "pointer", textAlign: "left",
          background: active ? C.card : "transparent",
          boxShadow: active ? "0 1px 3px rgba(28,25,23,0.06)" : "none",
        }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 16, background: C.brandLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, flexShrink: 0 }}>
          {ch.system ? <Heart size={16} strokeWidth={1.75} color={C.brand} fill="currentColor" fillOpacity={0.2} /> : <Hash size={16} strokeWidth={1.35} />}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: active ? 600 : 500, color: active ? C.text : C.textMuted }}>{ch.name}</span>
            <span style={{ fontSize: 10, color: C.textSubtle, flexShrink: 0 }}>{ch.time}</span>
          </div>
          <div style={{ fontSize: 11, color: C.textSubtle, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 }}>{ch.preview}</div>
        </div>
      </button>
    );
  };

  return (
    <div className="Trooper-scrollbar" style={{ width: DEMO_SIDEBAR_W, minWidth: DEMO_SIDEBAR_W, borderRight: `1px solid ${C.border}`, background: C.bg, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "4px 0 24px rgba(28,25,23,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "10px 12px 8px" }}>
        {tabBtn('menu', LayoutGrid, 'Menu')}
        {tabBtn('channels', MessagesSquare, 'Channels')}
        <div style={{ flex: 1 }} />
        <button type="button" onClick={onActivity} className="demo-hoverable demo-icon-btn" style={{ width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: C.card, color: C.textMuted, boxShadow: "0 1px 3px rgba(28,25,23,0.06)", border: "none", cursor: "pointer" }}>
          <Search size={16} strokeWidth={1.35} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 8px" }}>
        {sidebarTab === 'channels' ? (
          <>
            <div style={sectionLabel}>Channels</div>
            {channels.map(channelRow)}
            <div style={{ marginTop: 8, padding: "0 4px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: C.textMuted, padding: "8px 4px 6px" }}>Direct messages</div>
              {DEMO_AGENTS.slice(0, 3).map(a => {
                const dmId = `dm-${a.name.toLowerCase()}`;
                const active = activeChannel === dmId;
                return (
                  <button
                    key={a.name}
                    type="button"
                    onClick={() => {
                      onActivity();
                      onSelectChannel(dmId);
                      onNavigate('tasks');
                    }}
                    className="demo-hoverable demo-row"
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 14, marginBottom: 4,
                      width: "100%", border: "none", cursor: "pointer", textAlign: "left",
                      background: active ? C.card : "transparent",
                      boxShadow: active ? "0 1px 3px rgba(28,25,23,0.06)" : "none",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.img} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: active ? 600 : 500, color: C.text }}>{a.name}</div>
                      <div style={{ fontSize: 10, color: C.textSubtle }}>{a.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={sectionLabel}>Core workspace</div>
              {MENU_NAV.core.map(item => navRow(item))}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={sectionLabel}>Team & data</div>
              {MENU_NAV.team.map(item => navRow(item))}
            </div>
            <div>
              <div style={sectionLabel}>Advanced</div>
              {MENU_NAV.advanced.map(item => navRow(item, "advanced"))}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: "8px 12px 12px", borderTop: `1px solid ${C.borderWarm}`, background: C.bg }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 8, background: C.card, borderRadius: 16, padding: 4, boxShadow: "0 1px 3px rgba(28,25,23,0.06)" }}>
          {[{ icon: Activity, label: "Activity" }, { icon: Bell, label: "Attention" }, { icon: Pause, label: "Pause" }].map(({ icon: Icon, label }) => (
            <button key={label} type="button" onClick={onActivity} className="demo-hoverable demo-row" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 2px", borderRadius: 12, color: C.textMuted, border: "none", background: "transparent", cursor: "pointer" }}>
              <Icon size={18} strokeWidth={1.5} />
              <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={() => { onActivity(); setSidebarTab('channels'); onNavigate('tasks'); }} className="demo-hoverable demo-row" style={{
          display: "flex", alignItems: "center", gap: 10, height: 44, padding: "0 14px", width: "100%",
          borderRadius: 16, border: `1px solid ${C.border}`, background: C.card,
          boxShadow: "0 1px 2px rgba(28,25,23,0.04)", fontSize: 14, fontWeight: 500, color: C.text, cursor: "pointer",
        }}>
          <DemoFavicon src={org.icon} size={20} rounded="md" alt={org.name} />
          New chat
        </button>
      </div>
    </div>
  );
}

/**
 * Channel typing indicator — same row shape as a real message, with bounce
 * dots instead of a spinner badge. Reads as "agent is typing a reply."
 */
function DemoTypingIndicator({ name }: { name: string }) {
  const role = ALL_PEOPLE[name]?.role || 'Agent';
  return (
    <div className="demo-enter" style={{ marginBottom: 8 }} aria-live="polite" aria-label={`${name} is typing`}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        <Av name={name} size={24} />
        <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{name}</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: C.text, background: C.brandLight, padding: "2px 6px", borderRadius: 4, height: 16, display: "inline-flex", alignItems: "center" }}>Manager</span>
        <span style={{ fontSize: 12, color: C.textSubtle }}>— {role}</span>
      </div>
      <div style={{ marginLeft: 32, display: "inline-flex", alignItems: "center", gap: 10 }}>
        <span
          className="demo-typing-bubble"
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            height: 32, padding: "0 12px", borderRadius: 16,
            background: C.bg, border: `1px solid ${C.border}`,
          }}
        >
          <span className="demo-typing-dot" />
          <span className="demo-typing-dot" />
          <span className="demo-typing-dot" />
        </span>
        <span style={{ fontSize: 12, color: C.textSubtle }}>{name} is typing…</span>
      </div>
    </div>
  );
}

function DemoChatPane({
  messages, inputText, mentionTab, agentTyping, typingName, activeChannel, composerPlaceholder, chatRef,
  channels, org, channelBrand = 'trooper', onActivity,
}: {
  messages: Message[];
  inputText: string;
  mentionTab: string;
  agentTyping: boolean;
  typingName: string;
  activeChannel: string;
  composerPlaceholder: string;
  chatRef: RefObject<HTMLDivElement>;
  channels: DemoChannel[];
  org: DemoOrg;
  channelBrand?: ChannelBrand;
  onActivity: () => void;
}) {
  const dmMatch = /^dm-(.+)$/.exec(activeChannel);
  const channelName = dmMatch
    ? dmMatch[1].replace(/^\w/, c => c.toUpperCase())
    : (channels.find(c => c.id === activeChannel)?.name || 'general');
  const headerAccent = channelBrand === 'slack' ? '#611f69' : channelBrand === 'whatsapp' ? '#128C7E' : C.textMuted;
  const ChannelIcon = channelBrand === 'whatsapp' ? MessageCircle : Hash;

  return (
    <div style={{ width: DEMO_CHAT_W, minWidth: DEMO_CHAT_W, flexShrink: 0, borderRight: `1px solid ${C.borderWarm}`, background: C.card, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 8px", borderBottom: `1px solid ${C.borderWarm}`, background: channelBrand === 'slack' ? '#f8f5fb' : channelBrand === 'whatsapp' ? '#f0faf4' : C.card }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <button type="button" onClick={onActivity} className="demo-hoverable" style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "none", padding: 0, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#525252" }}>
            <ChannelIcon size={14} strokeWidth={1.75} color={headerAccent} />
            {channelName}
            <ChevronDown size={14} strokeWidth={2} color="#a3a3a3" />
          </button>
          <button type="button" onClick={onActivity} className="demo-hoverable demo-chip" style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 32, padding: "0 10px", borderRadius: 8, border: `1px solid rgba(231,229,228,0.8)`, background: C.card, fontSize: 12, fontWeight: 500, color: "#525252", boxShadow: "0 1px 2px rgba(28,25,23,0.04)", cursor: "pointer" }}>
            <MessageSquarePlus size={14} strokeWidth={1.75} />
            New session
          </button>
        </div>
      </div>

      {mentionTab && (
        <div style={{ padding: "5px 16px", borderBottom: `1px solid ${C.borderWarm}`, background: C.bg, fontSize: 11, color: C.textMuted, display: "flex", alignItems: "center", gap: 5 }}>
          <Av name="Vaibhav" size={16} border={false} />
          <span>{mentionTab}</span>
        </div>
      )}

      <div ref={chatRef} data-demo-target="chat-thread" className="Trooper-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "12px 16px", background: C.card }}>
        {messages.map((msg, i) => (
          // Only the newest message animates in; re-running the entry on every
          // message each render is what made the thread feel like a slideshow.
          <div key={i} className={i === messages.length - 1 ? 'demo-enter' : undefined} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <Av name={msg.sender} size={24} />
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{msg.sender}</span>
              {!msg.isHuman && (
                <span style={{ fontSize: 9, fontWeight: 600, color: C.text, background: C.brandLight, padding: "2px 6px", borderRadius: 4, height: 16, display: "inline-flex", alignItems: "center" }}>Manager</span>
              )}
              <span style={{ fontSize: 12, color: C.textSubtle }}>— {msg.role}</span>
              <span style={{ fontSize: 11, color: "#d6d3d1", marginLeft: "auto" }}>{msg.time}</span>
            </div>
            <div style={{ marginLeft: 32, fontSize: 14, lineHeight: 1.55, color: C.textMuted }}>{renderMentionParts(msg.text)}</div>
            {msg.reaction && (
              <div style={{ marginLeft: 32, marginTop: 6 }}>
                <span className="demo-pop" style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, background: C.card, border: `1px solid ${C.border}`, padding: "2px 7px", borderRadius: 999 }}>
                  <span>{msg.reaction.emoji}</span>
                  <span style={{ fontSize: 10, color: C.textSubtle, fontWeight: 600 }}>{msg.reaction.count}</span>
                </span>
              </div>
            )}
          </div>
        ))}
        {agentTyping && <DemoTypingIndicator name={typingName} />}
      </div>

      <div style={{ padding: "10px 16px 12px", borderTop: `1px solid ${C.borderWarm}`, background: C.card }}>
        <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.card, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)" }}>
          <div data-demo-target="composer" style={{ minHeight: 52, padding: "12px 14px", fontSize: 14, color: inputText ? C.text : C.textSubtle, lineHeight: 1.5 }}>
            {inputText ? (
              <>
                {renderMentionParts(inputText, true)}
                <span className="demo-blink" style={{ display: "inline-block", width: 1.5, height: 16, background: C.text, marginLeft: 1, verticalAlign: "text-bottom" }} />
              </>
            ) : composerPlaceholder}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "6px 10px 8px", borderTop: `1px solid ${C.borderWarm}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", minWidth: 0 }}>
              <button type="button" onClick={onActivity} className="demo-hoverable demo-icon-btn" style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer" }}>
                <Plus size={16} strokeWidth={1.75} />
              </button>
              <ComposerTag onClick={onActivity}>
                <DemoFavicon src={org.icon} size={14} rounded="sm" alt={org.name} />
                {org.name}
              </ComposerTag>
              <ComposerTag onClick={onActivity}>Auto</ComposerTag>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <button type="button" onClick={onActivity} className="demo-hoverable demo-icon-btn" style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle, border: "none", background: "transparent", cursor: "pointer" }}>
                <Mic size={16} strokeWidth={1.75} />
              </button>
              <div
                data-demo-target="composer-send"
                className="demo-hoverable demo-send"
                style={{
                  width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: inputText ? C.brand : "rgba(28,25,23,0.09)", color: inputText ? "white" : C.textSubtle,
                }}
              >
                <ArrowUp size={14} strokeWidth={2.25} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, overflowX: "auto" }}>
          <ComposerTag icon={ArrowLeftRight} onClick={onActivity}>All Devices</ComposerTag>
          <ComposerTag icon={SlidersHorizontal} onClick={onActivity}>Smart Approve</ComposerTag>
        </div>
      </div>
    </div>
  );
}

/** Showcase board — TODO is hidden; only the active work columns stay. */
const BOARD_COLUMN_IDS: DemoColumnId[] = ['in_progress', 'review', 'done'];

function DemoBoardPane({
  tasks, highlightedTaskId, draggingTaskId, overCol, interactive, onOpenTask, onDragStart, onActivity,
}: {
  tasks: Task[];
  highlightedTaskId?: number | null;
  draggingTaskId?: number | null;
  overCol?: DemoColumnId | null;
  interactive?: boolean;
  onOpenTask?: (task: Task) => void;
  onDragStart?: (task: Task, event: ReactPointerEvent<HTMLDivElement>) => void;
  onActivity: () => void;
}) {
  const [viewMode, setViewMode] = useState<'columns' | 'list'>('columns');
  const cols: Record<DemoColumnId, Task[]> = { inbox: [], in_progress: [], review: [], done: [] };
  tasks.forEach((t) => {
    // Fold inbox into In Progress so cards aren't lost when TODO is hidden.
    const col = t.col === 'inbox' ? 'in_progress' : t.col;
    if (cols[col]) cols[col].push(t);
  });

  const toggle = (mode: 'columns' | 'list', icon: ReactNode, label: string) => (
    <button
      type="button"
      onClick={() => { onActivity(); setViewMode(mode); }}
      className="demo-hoverable"
      style={{
        display: "inline-flex", alignItems: "center", gap: 4, height: 30, padding: "0 8px", borderRadius: 6,
        border: "none", cursor: "pointer",
        background: viewMode === mode ? "rgba(231,229,228,0.9)" : "transparent",
        fontSize: 11, fontWeight: 500, color: viewMode === mode ? C.text : C.textMuted,
      }}
    >
      {icon} {label}
    </button>
  );

  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: C.card, padding: "10px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexShrink: 0 }}>
        <div style={{ display: "inline-flex", height: 32, alignItems: "center", borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, padding: 1, boxShadow: "0 1px 2px rgba(28,25,23,0.04)" }}>
          {toggle('columns', <Columns3 size={14} strokeWidth={1.5} />, 'Columns')}
          {toggle('list', <List size={14} strokeWidth={1.5} />, 'List')}
        </div>
        <div style={{ flex: 1 }} />
        <button type="button" onClick={onActivity} className="demo-hoverable" style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(28,25,23,0.9)", background: "#1c1917", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>
      <div className="Trooper-scrollbar" style={{ display: "flex", gap: DEMO_KANBAN_GAP, flex: 1, overflowX: "auto", overflowY: "hidden", minHeight: 0 }}>
        {BOARD_COLUMN_IDS.map((k) => (
          <DemoKanbanColumn
            key={k}
            colKey={k}
            tasks={cols[k]}
            avatarFor={avatarFor}
            highlightedTaskId={highlightedTaskId}
            draggingTaskId={draggingTaskId}
            isOver={overCol === k || (k === 'in_progress' && overCol === 'inbox')}
            interactive={interactive}
            onOpenTask={onOpenTask}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}

/** Chrome pill telling the visitor whether the reel or they are driving. */
function DemoModePill({ mode, resumeIn }: { mode: DemoMode; resumeIn: number | null }) {
  const driving = mode === 'user';
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6, height: 24, padding: "0 10px",
      borderRadius: 999, fontSize: 10.5, fontWeight: 600, whiteSpace: "nowrap",
      background: driving ? C.brandTint : C.bg,
      border: `1px solid ${driving ? 'rgba(63,107,0,0.25)' : C.border}`,
      color: driving ? C.brandHover : C.textSubtle,
      transition: `background-color ${DUR.panel}ms ${EASE_OUT}, color ${DUR.panel}ms ${EASE_OUT}, border-color ${DUR.panel}ms ${EASE_OUT}`,
    }}>
      <span
        className={driving ? undefined : 'demo-live-dot'}
        style={{ width: 6, height: 6, borderRadius: '50%', background: driving ? C.brand : '#a8a29e' }}
      />
      {driving
        ? (resumeIn !== null ? `You're driving · resuming in ${resumeIn}s` : "You're driving")
        : 'Live demo — click anything'}
    </div>
  );
}

/** Chat timestamps roll over properly instead of producing "14:60". */
function clockFrom(base: string, addMinutes: number): string {
  const [h, m] = base.split(':').map(Number);
  const total = (h * 60 + m + addMinutes) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

const rawSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const DEMO_STYLES = `${DEMO_KEYFRAMES}
@keyframes modalBackdropIn { from { opacity: 0; } to { opacity: 1; } }
.demo-thread-turn { animation: demoFadeInUp ${DUR.enter}ms ${EASE_OUT} both; }
.demo-thread-tool-row { animation: demoFadeInUp ${DUR.enter}ms ${EASE_OUT} both; }
* { box-sizing: border-box; }
`;

export default function TrooperDemo({
  scenarioId,
  rotate = false,
  backdrop = null,
  flush = false,
  speed = 1,
  startStep = 0,
  onStepChange,
}: {
  scenarioId?: DemoScenarioId;
  /** Cycle through HERO_SCENARIO_ROTATION on each loop instead of repeating. */
  rotate?: boolean;
  /** Drop the band's own rule and vertical padding — for hosts that already
   *  frame the demo (the landing hero mats it otherwise). */
  flush?: boolean;
  /** Host-supplied background behind the frame — the landing passes its dither
   *  gradient. Kept a slot so the package owns none of the host's chrome. */
  backdrop?: ReactNode;
  /** Playback rate for every scripted delay. The harness uses 0.25x-4x. */
  speed?: number;
  /** Jump straight to a beat instead of watching the reel up to it. */
  startStep?: number;
  /** Reports progress so a host can drive a scrubber. */
  onStepChange?: (index: number, total: number) => void;
}) {
  // Rotation advances on loop, so a visitor who watches twice sees a different
  // capability rather than the same reel again.
  const [rotationIndex, setRotationIndex] = useState(0);
  const activeScenarioId = rotate
    ? HERO_SCENARIO_ROTATION[rotationIndex % HERO_SCENARIO_ROTATION.length]
    : scenarioId ?? DEFAULT_DEMO_SCENARIO_ID;
  const scenario = getDemoScenario(activeScenarioId);
  const CHAT_SCRIPT = scenario.chatScript;
  const TASK_EXEC_SCRIPT = scenario.taskExecScript;
  const PHASE1_TASKS = scenario.phase1Tasks;
  const PHASE2_TASKS = scenario.phase2Tasks;
  const DEMO_ARTIFACTS = scenario.artifacts;
  const SPOTLIGHT_TASK_ID = scenario.spotlightTaskId;

  const reducedMotion = usePrefersReducedMotion();

  /** Per-channel / per-DM threads — switching agents must not wipe history. */
  const [threads, setThreads] = useState<Record<string, Message[]>>({});
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");
  const [mentionTab, setMentionTab] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);
  const [typingName, setTypingName] = useState('Jordan');
  const [activePage, setActivePage] = useState<DemoPageId>("tasks");
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>(scenario.defaultSidebarTab ?? "channels");
  const [activeChannel, setActiveChannel] = useState(scenario.defaultChannel ?? "general");
  const activeChannelRef = useRef(activeChannel);
  const lastAgentRef = useRef<string | null>(null);
  const [scriptIndex, setScriptIndex] = useState(startStep);
  const [mode, setMode] = useState<DemoMode>('script');
  const [resumeIn, setResumeIn] = useState<number | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const taskModalOpenRef = useRef(false);
  const [modalOrigin, setModalOrigin] = useState<CanvasRect | null>(null);
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [modalSubtasks, setModalSubtasks] = useState<DemoSubtask[]>(scenario.initialSubtasks);
  const [modalFeed, setModalFeed] = useState<DemoFeedItem[]>([]);
  const [modalArtifact, setModalArtifact] = useState<DemoArtifact | null>(null);
  const [modalWorkspaceMode, setModalWorkspaceMode] = useState<DemoWorkspaceMode>('ide');
  const [modalCanvasKeys, setModalCanvasKeys] = useState<string[]>([]);
  const [modalDelivery, setModalDelivery] = useState<string | null>(null);
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(null);
  // Capability workspace state — each is inert unless the scenario drives it.
  const [browserFrameCount, setBrowserFrameCount] = useState(0);
  const [videoStage, setVideoStage] = useState<'storyboard' | 'timeline'>('timeline');
  const [videoPlayhead, setVideoPlayhead] = useState(0);
  const [videoScenesReady, setVideoScenesReady] = useState(0);
  const [desktopLines, setDesktopLines] = useState<string[]>([]);
  const [desktopActivities, setDesktopActivities] = useState<string[]>([]);
  const [activeNodeIds, setActiveNodeIds] = useState<string[]>([]);
  const [generationJob, setGenerationJob] = useState<DemoGenerationState | null>(null);
  const [artifactReview, setArtifactReview] = useState<ArtifactReviewState>(EMPTY_ARTIFACT_REVIEW);
  const [hasSavedArtifactReview, setHasSavedArtifactReview] = useState(false);
  const [canvasReview, setCanvasReview] = useState<CanvasReviewState | null>(null);
  const [canvasTileComments, setCanvasTileComments] = useState<Record<string, string>>({});
  const modalArtifactRef = useRef<DemoArtifact | null>(null);
  const artifactReviewRef = useRef<ArtifactReviewState>(EMPTY_ARTIFACT_REVIEW);
  const canvasReviewRef = useRef<CanvasReviewState | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  // Once a visitor takes over the thread's scroll position, scripted messages
  // must not pull it back to the latest message. This is intentionally kept
  // outside React state so appending a message never causes a render loop.
  const chatAutoFollowRef = useRef(true);
  const chatProgrammaticScrollRef = useRef(false);
  const chatProgrammaticScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const demoBandRef = useRef<HTMLDivElement>(null);
  const demoCanvasRef = useRef<HTMLDivElement>(null);
  const [isDemoVisible, setIsDemoVisible] = useState(true);
  const modalMsgCounter = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const { cursor, goTo, hide: hideCursor, rest: restCursor, clearTimers: clearCursorTimers } =
    useDemoCursor(demoCanvasRef, { reducedMotion });

  const handleTaskDrop = useCallback((taskId: number, col: DemoColumnId) => {
    setTasks((p) => p.map((t) => (t.id === taskId ? { ...t, col } : t)));
    setHighlightedTaskId(taskId);
  }, []);

  const { drag, overCol, runScriptedMove, startUserDrag, reset: resetDrag } = useDemoDrag({
    canvasRef: demoCanvasRef,
    reducedMotion,
    onDrop: handleTaskDrop,
  });

  const modalCanvasArtifacts = modalCanvasKeys
    .map(k => DEMO_ARTIFACTS[k])
    .filter(Boolean) as DemoArtifact[];

  useEffect(() => { modalArtifactRef.current = modalArtifact; }, [modalArtifact]);
  useEffect(() => { artifactReviewRef.current = artifactReview; }, [artifactReview]);
  useEffect(() => { canvasReviewRef.current = canvasReview; }, [canvasReview]);
  useEffect(() => { activeChannelRef.current = activeChannel; }, [activeChannel]);
  useEffect(() => { taskModalOpenRef.current = taskModalOpen; }, [taskModalOpen]);

  // Start the reel as soon as any part of the band is on screen. Defaulting to
  // `false` left subpage demos dead for seconds (empty board + Pause icon) until
  // the observer fired — even when the visitor was already looking at them.
  useEffect(() => {
    const band = demoBandRef.current;
    if (!band) return;
    if (!('IntersectionObserver' in window)) {
      setIsDemoVisible(true);
      return;
    }

    const sync = (entry?: IntersectionObserverEntry) => {
      if (entry) {
        setIsDemoVisible(entry.isIntersecting);
        return;
      }
      const rect = band.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = rect.bottom > 0 && rect.top < vh;
      setIsDemoVisible(visible);
    };

    sync();

    const observer = new IntersectionObserver(
      ([entry]) => sync(entry),
      // Any pixel counts; generous margin so the reel starts as the band approaches.
      { threshold: 0, rootMargin: '120px 0px 120px 0px' },
    );
    observer.observe(band);
    return () => observer.disconnect();
  }, []);

  const messages = threads[activeChannel] ?? [];

  /** Append into a thread; agent messages also mirror to that agent's DM. */
  const appendToChannel = useCallback((channelId: string, msg: Message) => {
    setThreads(prev => {
      const next: Record<string, Message[]> = { ...prev };
      const target = [...(prev[channelId] ?? [])];

      if (!msg.isHuman && msg.sender) {
        if (lastAgentRef.current && lastAgentRef.current !== msg.sender) {
          const handoff: Message = {
            sender: 'Trooper',
            role: 'System',
            text: `${lastAgentRef.current} handed off to ${msg.sender} — continuing in this thread.`,
            isHuman: false,
            time: msg.time,
          };
          if (channelId === 'general') {
            target.push(handoff);
          } else {
            next.general = [...(prev.general ?? []), handoff];
          }
        }
        lastAgentRef.current = msg.sender;
        const dmId = `dm-${msg.sender.toLowerCase()}`;
        if (dmId !== channelId) {
          next[dmId] = [...(prev[dmId] ?? []), msg];
        }
      }

      target.push(msg);
      next[channelId] = target;
      return next;
    });
  }, []);

  const appendActiveMessage = useCallback((msg: Message) => {
    appendToChannel(activeChannelRef.current, msg);
  }, [appendToChannel]);

  const totalScriptLength = CHAT_SCRIPT.length + TASK_EXEC_SCRIPT.length;
  const spotlightTask = tasks.find(t => t.id === SPOTLIGHT_TASK_ID);

  /** Card rect in canvas space, so the modal can grow out of the card clicked. */
  const captureOrigin = useCallback((taskId: number) => {
    const root = demoCanvasRef.current;
    if (!root) return;
    const el = root.querySelector(`[data-demo-target="task-card"][data-task-id="${taskId}"]`);
    setModalOrigin(el ? rectInCanvas(root, el) : null);
  }, []);

  const resetTaskModal = useCallback(() => {
    setTaskModalOpen(false);
    setModalTask(null);
    setModalOrigin(null);
    setModalSubtasks(scenario.initialSubtasks.map(s => ({ ...s, status: 'pending' as const })));
    setModalFeed([]);
    setModalArtifact(null);
    setModalWorkspaceMode('ide');
    setModalCanvasKeys([]);
    setModalDelivery(null);
    setHighlightedTaskId(null);
    setArtifactReview(EMPTY_ARTIFACT_REVIEW);
    setHasSavedArtifactReview(false);
    setCanvasReview(null);
    setCanvasTileComments({});
    setBrowserFrameCount(0);
    setVideoStage('timeline');
    setVideoPlayhead(0);
    setVideoScenesReady(0);
    setDesktopLines([]);
    setDesktopActivities([]);
    setActiveNodeIds([]);
    setGenerationJob(null);
    modalMsgCounter.current = 0;
  }, [scenario.initialSubtasks]);

  const resetDemo = useCallback(() => {
    setThreads({});
    setTasks([]);
    setInputText("");
    setMentionTab("");
    setAgentTyping(false);
    setTypingName('Jordan');
    lastAgentRef.current = null;
    setActivePage("tasks");
    setSidebarTab(scenario.defaultSidebarTab ?? "channels");
    setActiveChannel(scenario.defaultChannel ?? "general");
    resetTaskModal();
    resetDrag();
    setScriptIndex(0);
    hideCursor();
  }, [resetTaskModal, resetDrag, scenario.defaultChannel, scenario.defaultSidebarTab, hideCursor]);

  /**
   * Same-org rotate: keep #general (and DMs) so the reel doesn't read as a
   * brand-new morning chat after the previous Wonder ticket just finished.
   */
  const softResetForNextScenario = useCallback(() => {
    setThreads(prev => {
      const general = prev.general ?? [];
      if (general.length === 0) return prev;
      const last = general[general.length - 1];
      if (last?.role === 'System' && last.text.startsWith('—')) return prev;
      return {
        ...prev,
        general: [
          ...general,
          {
            sender: 'Trooper',
            role: 'System',
            text: '— continuing in #general —',
            isHuman: false,
            time: '',
          },
        ],
      };
    });
    setTasks([]);
    setInputText('');
    setMentionTab('');
    setAgentTyping(false);
    setTypingName('Jordan');
    setActivePage('tasks');
    setSidebarTab(scenario.defaultSidebarTab ?? 'channels');
    setActiveChannel(scenario.defaultChannel ?? 'general');
    resetTaskModal();
    resetDrag();
    setScriptIndex(0);
    hideCursor();
  }, [resetTaskModal, resetDrag, scenario.defaultChannel, scenario.defaultSidebarTab, hideCursor]);

  /**
   * The visitor touched something. Hand them the wheel rather than killing the
   * reel outright — it picks itself back up once they stop.
   */
  const handleActivity = useCallback(() => {
    setMode('user');
    clearCursorTimers();
    restCursor();
    setResumeIn(Math.ceil(RESUME_AFTER_MS / 1000));
    if (idleTimer.current) clearInterval(idleTimer.current);
    let left = Math.ceil(RESUME_AFTER_MS / 1000);
    idleTimer.current = setInterval(() => {
      left -= 1;
      if (left <= 0) {
        if (idleTimer.current) clearInterval(idleTimer.current);
        idleTimer.current = null;
        setResumeIn(null);
        setMode('script');
      } else {
        setResumeIn(left);
      }
    }, 1000);
  }, [clearCursorTimers, restCursor]);

  useEffect(() => () => { if (idleTimer.current) clearInterval(idleTimer.current); }, []);

  const prevScenarioIdRef = useRef<DemoScenarioId | null>(null);

  useEffect(() => {
    const prevId = prevScenarioIdRef.current;
    prevScenarioIdRef.current = activeScenarioId;

    if (prevId === null) {
      resetDemo();
      setMode('script');
      return;
    }
    if (prevId === activeScenarioId) return;

    const prevOrg = getDemoScenario(prevId).org.domain;
    const nextOrg = scenario.org.domain;
    if (prevOrg === nextOrg) {
      softResetForNextScenario();
    } else {
      resetDemo();
    }
    setMode('script');
  }, [activeScenarioId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Follow new messages only while the reader is at the bottom. A wheel/touch
  // gesture immediately hands control to the visitor; scrolling back to the
  // bottom opts back into following. This prevents the demo reel from
  // hijacking the user's scroll while they inspect earlier messages.
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const interactionRoot = demoCanvasRef.current ?? el;

    const distanceFromBottom = () => el.scrollHeight - el.scrollTop - el.clientHeight;
    const onUserScrollIntent = () => {
      chatAutoFollowRef.current = false;
      if (chatProgrammaticScrollTimer.current) {
        clearTimeout(chatProgrammaticScrollTimer.current);
        chatProgrammaticScrollTimer.current = null;
      }
      chatProgrammaticScrollRef.current = false;
    };
    const onScroll = () => {
      if (!chatProgrammaticScrollRef.current && distanceFromBottom() <= 8) {
        chatAutoFollowRef.current = true;
      }
    };

    // Listen on the whole demo surface: the visitor may be scrolling the page
    // while the pointer is over the kanban/artifact side of the dashboard,
    // not directly over the chat thread.
    interactionRoot.addEventListener('wheel', onUserScrollIntent, { passive: true });
    interactionRoot.addEventListener('touchstart', onUserScrollIntent, { passive: true });
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      interactionRoot.removeEventListener('wheel', onUserScrollIntent);
      interactionRoot.removeEventListener('touchstart', onUserScrollIntent);
      el.removeEventListener('scroll', onScroll);
      if (chatProgrammaticScrollTimer.current) clearTimeout(chatProgrammaticScrollTimer.current);
    };
  }, []);

  // Only chase the bottom when the reader is already there and has not taken
  // control of the scroll position.
  useEffect(() => {
    const el = chatRef.current;
    if (!isDemoVisible || !el || !chatAutoFollowRef.current) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (!nearBottom) return;
    chatProgrammaticScrollRef.current = true;
    const raf = requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' });
      chatProgrammaticScrollTimer.current = setTimeout(() => {
        chatProgrammaticScrollRef.current = false;
        chatProgrammaticScrollTimer.current = null;
      }, reducedMotion ? 0 : 450);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (chatProgrammaticScrollTimer.current) clearTimeout(chatProgrammaticScrollTimer.current);
    };
  }, [messages, agentTyping, reducedMotion, isDemoVisible]);

  const applyTaskExecStep = useCallback((step: TaskExecStep) => {
    switch (step.type) {
      case 'moveTask':
        handleTaskDrop(step.taskId, step.col);
        break;
      case 'openTaskModal':
        setTaskModalOpen(true);
        setHighlightedTaskId(step.taskId);
        setActivePage('tasks');
        setModalWorkspaceMode('ide');
        setModalCanvasKeys([]);
        setArtifactReview(EMPTY_ARTIFACT_REVIEW);
        setHasSavedArtifactReview(false);
        setCanvasReview(null);
        setCanvasTileComments({});
        break;
      case 'subtask':
        setModalSubtasks(p => p.map(s => s.id === step.id ? { ...s, status: step.status } : s));
        break;
      case 'reasoning':
        modalMsgCounter.current += 1;
        setModalFeed(p => [...p, { kind: 'reasoning', id: `r${modalMsgCounter.current}`, agent: step.agent, text: step.text }]);
        break;
      // Any workspace beat dismisses a finished generation card so the panel
      // hands back to whatever the agent is doing next.
      case 'browserFrame':
        setGenerationJob(null);
        setModalWorkspaceMode('browser');
        setBrowserFrameCount(n => n + 1);
        break;
      case 'videoStage':
        setGenerationJob(null);
        setModalWorkspaceMode('video');
        setVideoStage(step.stage);
        break;
      case 'videoProgress':
        setGenerationJob(null);
        setModalWorkspaceMode('video');
        setVideoPlayhead(step.seconds);
        // Scenes reveal in step with the playhead so the storyboard fills in.
        setVideoScenesReady(n => Math.max(n, Math.ceil(step.seconds / 2)));
        break;
      case 'desktopStep':
        setGenerationJob(null);
        setModalWorkspaceMode('desktop');
        setDesktopLines(p => [...p, ...step.lines]);
        if (step.activity) setDesktopActivities(p => [...p, step.activity!]);
        break;
      case 'nodeActive':
        setGenerationJob(null);
        setModalWorkspaceMode('nodes');
        setActiveNodeIds(p => (p.includes(step.nodeId) ? p : [...p, step.nodeId]));
        break;
      case 'generate': {
        const job = scenario.generationJobs?.find(j => j.id === step.jobId);
        if (!job) break;
        setGenerationJob({ job, startedAt: performance.now(), runMs: step.runMs, done: false });
        break;
      }
      case 'tool':
        setModalFeed(p => [...p, { kind: 'tool', ...step.log, status: 'running' }]);
        break;
      case 'toolDone':
        setModalFeed(p => p.map(item => item.kind === 'tool' && item.id === step.id ? { ...item, status: 'done' as const } : item));
        break;
      case 'modalMsg': {
        modalMsgCounter.current += 1;
        const t = step.time || clockFrom('14:57', modalMsgCounter.current);
        setModalFeed(p => [...p, {
          kind: 'message',
          id: `m${modalMsgCounter.current}`,
          sender: step.sender,
          text: step.text,
          time: t,
          tags: step.tags,
        }]);
        break;
      }
      case 'openArtifact': {
        setModalWorkspaceMode('ide');
        setModalArtifact(DEMO_ARTIFACTS[step.key] || null);
        setArtifactReview(EMPTY_ARTIFACT_REVIEW);
        setHasSavedArtifactReview(false);
        setCanvasReview(null);
        setCanvasTileComments({});
        break;
      }
      case 'artifactReviewSelect': {
        const art = step.key ? DEMO_ARTIFACTS[step.key] ?? null : modalArtifactRef.current;
        if (!art) break;
        const selectedLines = getArtifactReviewLines(art.content, art.name);
        const next = { phase: 'selecting' as const, selectedLines, draftText: '' };
        if (step.key) {
          setCanvasReview({ artifactName: art.name, ...next });
        } else {
          setArtifactReview(next);
        }
        break;
      }
      case 'artifactReviewCompose': {
        const art = step.key ? DEMO_ARTIFACTS[step.key] ?? null : modalArtifactRef.current;
        const draftText = step.text ?? (art ? defaultArtifactReviewComment(art.content, art.name) : '');
        if (step.key && art) {
          setCanvasReview((prev) => ({
            artifactName: art.name,
            phase: 'composing',
            selectedLines: prev?.selectedLines.length ? prev.selectedLines : getArtifactReviewLines(art.content, art.name),
            draftText,
          }));
        } else {
          setArtifactReview((prev) => ({
            phase: 'composing',
            selectedLines: prev.selectedLines.length ? prev.selectedLines : (art ? getArtifactReviewLines(art.content, art.name) : []),
            draftText,
          }));
        }
        break;
      }
      case 'artifactReviewSave': {
        const art = step.key ? DEMO_ARTIFACTS[step.key] ?? null : modalArtifactRef.current;
        const commentText = step.text
          ?? (step.key ? canvasReviewRef.current?.draftText : artifactReviewRef.current.draftText)
          ?? (art ? defaultArtifactReviewComment(art.content, art.name) : '');
        modalMsgCounter.current += 1;
        const t = clockFrom('14:57', modalMsgCounter.current);
        const threadText = art ? `${commentText} — on ${art.name}` : commentText;
        setModalFeed((p) => [...p, {
          kind: 'message',
          id: `m${modalMsgCounter.current}`,
          sender: step.sender,
          text: threadText,
          time: t,
        }]);
        if (art) {
          setCanvasTileComments((prev) => ({ ...prev, [art.name]: commentText }));
        }
        if (step.key) {
          setCanvasReview((prev) => (prev ? { ...prev, phase: 'saved' } : null));
        } else {
          setArtifactReview((prev) => ({ ...prev, phase: 'saved' }));
          setHasSavedArtifactReview(true);
        }
        break;
      }
      case 'setWorkspaceMode':
        setModalWorkspaceMode(step.mode);
        break;
      case 'openCanvas': {
        setModalCanvasKeys(step.keys);
        setModalWorkspaceMode('canvas');
        if (step.keys[0]) setModalArtifact(DEMO_ARTIFACTS[step.keys[0]] || null);
        setArtifactReview(EMPTY_ARTIFACT_REVIEW);
        setHasSavedArtifactReview(false);
        setCanvasReview(null);
        setCanvasTileComments({});
        break;
      }
      case 'deliver': {
        setModalDelivery(step.name);
        const deliverKey = scenario.deliverArtifactKey
          ?? Object.keys(DEMO_ARTIFACTS).find(k => DEMO_ARTIFACTS[k].name === step.name);
        if (deliverKey) {
          setModalArtifact(DEMO_ARTIFACTS[deliverKey] || null);
          setModalWorkspaceMode('ide');
          setArtifactReview(EMPTY_ARTIFACT_REVIEW);
          setHasSavedArtifactReview(false);
        }
        break;
      }
      case 'closeTaskModal':
        setTaskModalOpen(false);
        break;
      case 'chatMsg':
        // Status updates always land in #general so ticket work doesn't wipe the channel.
        appendToChannel('general', {
          sender: step.sender,
          role: step.role,
          text: step.text,
          isHuman: false,
          time: step.time,
        });
        break;
      default:
        break;
    }
  }, [DEMO_ARTIFACTS, scenario.deliverArtifactKey, scenario.generationJobs, handleTaskDrop, appendToChannel]);

  /**
   * Step runner. Every beat now reads: wait → move the pointer → click →
   * *then* change state. The old runner fired the state change on a timer while
   * the cursor was still gliding, so effects landed before their causes.
   */
  useEffect(() => {
    if (mode !== 'script' || !isDemoVisible) return;
    let alive = true;
    const idx = scriptIndex;
    // Every scripted wait runs through here, so one knob rescales the whole reel.
    const sleep = (ms: number) => rawSleep(speed > 0 ? ms / speed : ms);
    onStepChange?.(idx, totalScriptLength);

    const run = async () => {
      if (idx >= totalScriptLength) {
        await sleep(5000);
        if (!alive) return;
        if (rotate) {
          // Scenario-change effect owns soft/hard reset so same-org threads survive.
          setRotationIndex(n => n + 1);
        } else {
          resetDemo();
        }
        return;
      }

      if (idx >= CHAT_SCRIPT.length) {
        const step = TASK_EXEC_SCRIPT[idx - CHAT_SCRIPT.length];
        await sleep(step.delay);
        if (!alive) return;
        const ctx = cursorContextForStep(step, DEMO_ARTIFACTS);

        if (step.type === 'moveTask') {
          const task = tasks.find(t => t.id === step.taskId);
          if (task) {
            // TODO is hidden and folded into In Progress — inbox→in_progress is a
            // no-op visually, so skip the flight (also avoids ghost cards over chat).
            const sameVisualCol =
              task.col === step.col ||
              (task.col === 'inbox' && step.col === 'in_progress');
            // Never fly a card over an open ticket — the drag overlay sits above
            // the modal (z-index) and reads as a ghost card mid-work.
            if (taskModalOpenRef.current || sameVisualCol) {
              handleTaskDrop(task.id, step.col);
            } else {
              await goTo(`[data-demo-target="task-card"][data-task-id="${step.taskId}"]`, { click: true });
              if (!alive) return;
              const move = runScriptedMove(task, step.col);
              // The pointer carries the card rather than watching it fly alone.
              setTimeout(() => { if (alive) goTo(`[data-demo-target="kanban-body-${step.col}"]`); }, DRAG.lift);
              await move;
            }
          } else {
            applyTaskExecStep(step);
          }
          if (!alive) return;
          setScriptIndex(idx + 1);
          return;
        }

        if (step.type === 'openTaskModal') {
          captureOrigin(step.taskId);
          setModalTask(tasks.find(t => t.id === step.taskId) ?? null);
        }

        // Generation is the one step that owns real elapsed time: apply it,
        // let the counter run, then resolve the frame.
        if (step.type === 'generate') {
          applyTaskExecStep(step);
          await sleep(step.runMs);
          if (!alive) return;
          setGenerationJob(j => (j ? { ...j, done: true } : j));
          setScriptIndex(idx + 1);
          return;
        }

        if (execStepCursorAfterApply(step)) {
          // Target doesn't exist until the step has run — mutate, then point.
          applyTaskExecStep(step);
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                void (async () => {
                  if (alive) await animateExecStepCursor(step, goTo, ctx);
                  resolve();
                })();
              });
            });
          });
        } else {
          await animateExecStepCursor(step, goTo, ctx);
          if (!alive) return;
          await sleep(REACTION_MS);
          if (!alive) return;
          applyTaskExecStep(step);
        }
        if (!alive) return;
        setScriptIndex(idx + 1);
        return;
      }

      const s = CHAT_SCRIPT[idx];
      await sleep(s.delay);
      if (!alive) return;

      if (s.type === 'typing') {
        // Hands move to the keyboard — the pointer rests instead of hovering
        // over the composer for the whole string.
        setMentionTab("");
        restCursor();
        const text = s.text || "";
        for (let i = 1; i <= text.length; i++) {
          setInputText(text.slice(0, i));
          await sleep(reducedMotion ? 6 : typingDelayFor(text, i - 1));
          if (!alive) return;
        }
        setScriptIndex(idx + 1);
        return;
      }

      // `send` and `mention_tab` are clicks — wait for the pointer to land.
      // The rest are glances; let the cursor drift over while the beat plays.
      if (s.type === 'send' || s.type === 'mention_tab') {
        await animateChatStepCursor(s, goTo);
        if (!alive) return;
        await sleep(REACTION_MS);
        if (!alive) return;
      } else {
        animateChatStepCursor(s, goTo);
      }

      if (s.type === "mention_tab") { setMentionTab(s.text || ""); setSidebarTab("channels"); }
      else if (s.type === "send") {
        setInputText("");
        appendActiveMessage({
          sender: s.sender || "",
          role: s.role || "",
          text: s.text || "",
          isHuman: true,
          time: "14:52",
        });
      }
      else if (s.type === "nick_typing") {
        const next = CHAT_SCRIPT[idx + 1];
        const name = next?.type === 'response' && next.sender ? next.sender : 'Jordan';
        setTypingName(name);
        setAgentTyping(true);
        setActivePage("tasks");
      }
      else if (s.type === "response") {
        setAgentTyping(false);
        if (s.sender) setTypingName(s.sender);
        appendActiveMessage({
          sender: s.sender || "",
          role: s.role || "",
          text: s.text || "",
          isHuman: false,
          time: s.time || "",
        });
        setActivePage("tasks");
      }
      else if (s.type === "reaction") {
        const channelId = activeChannelRef.current;
        setThreads(prev => {
          const c = [...(prev[channelId] ?? [])];
          if (c.length) {
            c[c.length - 1] = {
              ...c[c.length - 1],
              reaction: { emoji: s.emoji || "", count: s.count || 0 },
            };
          }
          return { ...prev, [channelId]: c };
        });
      }
      else if (s.type === "addTasks") {
        const newTasks = s.phase === 1 ? PHASE1_TASKS : PHASE2_TASKS;
        for (const task of newTasks) {
          setTasks((p) => [...p, task]);
          await sleep(reducedMotion ? 0 : 110);
          if (!alive) return;
        }
        setActivePage("tasks");
      }

      if (!alive) return;
      setScriptIndex(idx + 1);
    };

    run();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptIndex, mode, speed]);

  const clearIdleTimer = () => {
    if (idleTimer.current) { clearInterval(idleTimer.current); idleTimer.current = null; }
    setResumeIn(null);
  };

  /** Hand the reel back the wheel without losing the visitor's place. */
  const resumeScript = () => {
    clearIdleTimer();
    setMode('script');
  };

  const restart = () => {
    clearCursorTimers();
    clearIdleTimer();
    resetDemo();
    setMode('script');
  };

  const openTaskFromBoard = useCallback((task: Task) => {
    handleActivity();
    captureOrigin(task.id);
    setModalTask(task);
    setHighlightedTaskId(task.id);
    setTaskModalOpen(true);
  }, [captureOrigin, handleActivity]);

  const beginUserDrag = useCallback((task: Task, event: ReactPointerEvent<HTMLDivElement>) => {
    handleActivity();
    startUserDrag(task, event);
  }, [handleActivity, startUserDrag]);

  const composerPlaceholder = inputText ? "" : (messages.length > 0 ? "Send follow-up" : "Do anything with AI…");
  const showSplit = SPLIT_PAGES.includes(activePage);
  const activeModalTask = modalTask ?? spotlightTask ?? null;

  return (
    <>
      {/* Injected as raw HTML — a CSS text child hydrates as a text node and
          trips React's text-content check. */}
      <style dangerouslySetInnerHTML={{ __html: DEMO_STYLES }} />

      {/* No horizontal padding: the package owns none of the host's chrome, and
          this gutter sat *inside* the host's own, so the backdrop stopped short
          of the page rail and left a strip of page background either side.
          The `hidden lg:block` gate lives here rather than on the inner div —
          below `lg` this band used to render as an empty coloured strip. */}
      <div
        data-hero-demo-band
        ref={demoBandRef}
        className={
          flush
            ? 'relative hidden lg:block'
            : 'relative hidden border-t border-slate-100 py-8 sm:py-10 md:py-12 lg:block'
        }
      >
        {backdrop}
        <div className="Trooper-demo relative z-10" style={{ width: "100%", margin: "0 auto", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 14 }}>
        <DemoScaleFrame>
        <div style={{
          position: "relative", width: DEMO_CANVAS_W, borderRadius: C.radius, overflow: "hidden",
          border: `1px solid ${C.border}`, background: C.bg,
          boxShadow: "0 24px 48px -16px rgba(28,25,23,0.18), 0 8px 16px -8px rgba(28,25,23,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", height: DEMO_CHROME_H, padding: "0 16px", background: C.cardWarm, borderBottom: `1px solid ${C.border}`, gap: 12 }}>
            <div style={{ display: "flex", gap: 7 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.bg, borderRadius: 999, padding: "4px 16px", fontSize: 11.5, color: C.textSubtle, border: `1px solid ${C.border}`, maxWidth: 280, width: "100%", justifyContent: "center" }}>
                <Lock size={10} strokeWidth={2.5} />
                app.trooper.so
              </div>
              <DemoModePill mode={mode} resumeIn={resumeIn} />
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <button
                type="button"
                onClick={() => (mode === 'script' ? handleActivity() : resumeScript())}
                className="demo-hoverable demo-icon-btn"
                aria-label={mode === 'script' ? (isDemoVisible ? 'Pause demo' : 'Demo waiting') : 'Resume demo'}
                title={
                  mode === 'script'
                    ? isDemoVisible
                      ? 'Pause'
                      : 'Starting…'
                    : 'Resume'
                }
                style={{ width: 26, height: 26, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle }}
              >
                {mode === 'script' ? (
                  isDemoVisible ? <Pause size={12} strokeWidth={2} /> : <Play size={12} strokeWidth={2} />
                ) : (
                  <Play size={12} strokeWidth={2} />
                )}
              </button>
              <button type="button" onClick={restart} className="demo-hoverable demo-icon-btn" style={{ width: 26, height: 26, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle }}>
                <RotateCcw size={12} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div ref={demoCanvasRef} style={{ position: "relative", display: "flex", height: DEMO_APP_H, background: C.bg }}>
            <DemoClickCursor state={cursor} />
            {drag && (
              <DemoDragOverlay
                task={drag.task}
                x={drag.x}
                y={drag.y}
                width={drag.width}
                avatarFor={avatarFor}
                animateMs={drag.animateMs}
              />
            )}
            <DemoSidebarRail org={scenario.org} onActivity={handleActivity} />
            <DemoSidebarNav
              sidebarTab={sidebarTab}
              setSidebarTab={setSidebarTab}
              activePage={activePage}
              onNavigate={setActivePage}
              activeChannel={activeChannel}
              onSelectChannel={setActiveChannel}
              onActivity={handleActivity}
              channels={scenario.channels}
              org={scenario.org}
            />

            {showSplit ? (
              <>
                <DemoChatPane
                  messages={messages}
                  inputText={inputText}
                  mentionTab={mentionTab}
                  agentTyping={agentTyping}
                  typingName={typingName}
                  activeChannel={activeChannel}
                  composerPlaceholder={composerPlaceholder}
                  chatRef={chatRef}
                  channels={scenario.channels}
                  org={scenario.org}
                  channelBrand={scenario.channelBrand}
                  onActivity={handleActivity}
                />
                <DemoBoardPane
                  tasks={tasks}
                  highlightedTaskId={highlightedTaskId}
                  draggingTaskId={drag?.task.id ?? null}
                  overCol={overCol}
                  interactive
                  onOpenTask={openTaskFromBoard}
                  onDragStart={beginUserDrag}
                  onActivity={handleActivity}
                />
              </>
            ) : (
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                <DemoMainPage pageId={activePage} />
              </div>
            )}

            <DemoTaskModal
              open={taskModalOpen}
              originRect={modalOrigin}
              taskTitle={activeModalTask?.title || scenario.phase1Tasks[0]?.title || 'Task'}
              assignee={scenario.spotlightAssignee}
              subtasks={modalSubtasks}
              feed={modalFeed}
              artifact={modalArtifact}
              canvasArtifacts={modalCanvasArtifacts}
              workspaceMode={modalWorkspaceMode}
              onWorkspaceModeChange={setModalWorkspaceMode}
              delivery={modalDelivery}
              statusCol={activeModalTask?.col === 'review' || activeModalTask?.col === 'done' ? activeModalTask.col : 'in_progress'}
              taskTags={scenario.spotlightTaskTags}
              org={scenario.org}
              artifactReview={artifactReview}
              hasSavedArtifactReview={hasSavedArtifactReview}
              canvasReview={canvasReview}
              canvasTileComments={canvasTileComments}
              browserSession={scenario.browserSession}
              browserFrameCount={browserFrameCount}
              videoProject={scenario.videoProject}
              videoStage={videoStage}
              videoPlayhead={videoPlayhead}
              videoScenesReady={videoScenesReady}
              desktopSession={scenario.desktopSession}
              desktopLines={desktopLines}
              desktopActivities={desktopActivities}
              workflowGraph={scenario.workflowGraph}
              activeNodeIds={activeNodeIds}
              generationJob={generationJob}
              onClose={() => { handleActivity(); setTaskModalOpen(false); }}
              onSelectArtifact={(name) => {
                const key = Object.keys(DEMO_ARTIFACTS).find(k => DEMO_ARTIFACTS[k].name === name);
                if (key) setModalArtifact(DEMO_ARTIFACTS[key]);
              }}
            />
          </div>
        </div>
        </DemoScaleFrame>
        </div>
      </div>
    </>
  );
}
