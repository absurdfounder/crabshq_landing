'use client';

import { useState, useEffect, useCallback, useRef, type ReactNode, type RefObject } from "react";
import {
  RotateCcw, Pause, Play, Lock, Bell, Hash, LayoutGrid, Activity, Home, ListTodo, Plus, Search,
  Target, HardDrive, Brain, Users, Laptop, Settings, Shapes, Clock,
  ChevronDown, Columns3, List, MessageCircle, MessageSquarePlus, ArrowUp,
  MessagesSquare, ArrowLeftRight, SlidersHorizontal, Mic, Heart,
} from "lucide-react";
import { TROOPER_DEMO as C, KANBAN_COLUMNS, type DemoColumnId } from './demoTheme';
import { DemoMainPage, DEMO_AGENTS } from './demoPages';
import { DemoTaskModal } from './demoTaskModal';
import { DemoFavicon } from './DemoFavicon';
import {
  INITIAL_SUBTASKS, SPOTLIGHT_TASK_ID, TASK_EXEC_SCRIPT, DEMO_ARTIFACTS, DEMO_ORG,
  type DemoArtifact, type DemoFeedItem, type DemoSubtask, type TaskExecStep,
} from './demoTaskExecution';

const HUMANS = [
  { name: "Vaibhav", role: "Founder", img: "https://avatars.githubusercontent.com/u/25829699?v=4" },
];

const ALL_PEOPLE = Object.fromEntries(
  [...HUMANS, ...DEMO_AGENTS].map(p => [p.name, p])
);

const DEMO_CHANNELS = [
  { id: 'general', name: 'general', preview: 'Jordan: on it — matching tasks…', time: '14:54', system: false },
  { id: 'launch', name: 'product-launch', preview: 'Vaibhav: hey @Jordan we just launched…', time: '14:52', system: false },
  { id: 'ops', name: 'ops', preview: 'Leo: API integration review ready', time: '1h', system: false },
];

const PHASE1_TASKS = [
  { id: 1, title: "SEO Optimization for Wonder", col: "inbox" as DemoColumnId, tags: ["seo", "visibility"], watchers: ["Vaibhav", "Jordan"], comments: 2 },
  { id: 2, title: "Create and Distribute Branded Swag", col: "inbox" as DemoColumnId, tags: ["branding", "merchandise"], watchers: ["Aria", "Jordan"], comments: 1 },
  { id: 3, title: "Write blog post on AI trends", col: "inbox" as DemoColumnId, tags: ["content", "research"], watchers: ["Ren"], comments: 0 },
  { id: 4, title: "Improve Website User Experience", col: "in_progress" as DemoColumnId, tags: ["ux", "ui"], watchers: ["Ren", "Leo"], comments: 0 },
  { id: 5, title: "Update Website with New Game Releases", col: "in_progress" as DemoColumnId, tags: ["website", "content"], watchers: ["Vaibhav"], comments: 0 },
  { id: 6, title: "Expand Game Categories and Tags", col: "in_progress" as DemoColumnId, tags: ["game", "categories"], watchers: ["Vaibhav", "Jordan"], comments: 2 },
];

const PHASE2_TASKS = [
  { id: 7, title: "Develop Social Media Strategy", col: "in_progress" as DemoColumnId, tags: ["social", "media"], watchers: ["Aria"], comments: 0 },
  { id: 8, title: "Design landing page mockup", col: "review" as DemoColumnId, tags: ["design", "ui"], watchers: ["Ren", "Jordan"], comments: 2 },
  { id: 9, title: "API integration review", col: "review" as DemoColumnId, tags: ["dev", "docs"], watchers: ["Leo"], comments: 2 },
  { id: 10, title: "Capture Website Screenshots", col: "done" as DemoColumnId, tags: ["website", "visual"], watchers: ["Jordan", "Aria"], comments: 10 },
];

const CHAT_SCRIPT = [
  { type: "mention_tab", text: "Vaibhav: @Jordan hey...", delay: 150 },
  { type: "typing", text: "hey @Jordan we just launched Wonder on Product Hunt today 🚀 can you get the team set up for launch day?", delay: 200 },
  { type: "send", sender: "Vaibhav", role: "Founder", text: "hey @Jordan we just launched Wonder on Product Hunt today 🚀 can you get the team set up for launch day?", delay: 300 },
  { type: "nick_typing", delay: 800 },
  { type: "response", sender: "Jordan", role: "Chief of Staff", text: "congrats on the launch! 🎉 let me pull together everything we need — checking our playbook, past launches, and support tickets now...", time: "14:52", delay: 1400 },
  { type: "nick_typing", delay: 1200 },
  { type: "response", sender: "Jordan", role: "Chief of Staff", text: "alright, I've created 6 tasks based on what worked for our last 3 launches. SEO, content, UX improvements, website updates — the works. They're on the board now!", time: "14:53", delay: 300 },
  { type: "addTasks", phase: 1, delay: 600 },
  { type: "reaction", emoji: "🔥", count: 2, delay: 500 },
  { type: "typing", text: "this is amazing. can you assign them to whoever's best?", delay: 800 },
  { type: "send", sender: "Vaibhav", role: "Founder", text: "this is amazing. can you assign them to whoever's best? don't need to check with me", delay: 300 },
  { type: "nick_typing", delay: 800 },
  { type: "response", sender: "Jordan", role: "Chief of Staff", text: "on it — matching tasks by each agent's skillset and past performance. Aria's on social, Ren's on UX & design, Leo's handling ops...", time: "14:54", delay: 1200 },
  { type: "addTasks", phase: 2, delay: 500 },
  { type: "response", sender: "Jordan", role: "Chief of Staff", text: "done! all 10 tasks assigned and the team's already working. I'll flag anything that needs your attention. go enjoy launch day 🪖💪", time: "14:55", delay: 1400 },
  { type: "reaction", emoji: "👍", count: 3, delay: 600 },
];

type Task = (typeof PHASE1_TASKS)[number];
type Message = { sender: string; role: string; text: string; isHuman: boolean; time: string; reaction?: { emoji: string; count: number } };
type SidebarTab = 'menu' | 'channels';
type DemoPageId = 'home' | 'tasks' | 'goals' | 'routines' | 'files' | 'agents' | 'devices' | 'memory' | 'skills' | 'settings';

const SPLIT_PAGES: DemoPageId[] = ['tasks'];

/** Design canvas — scaled to fit hero width so the full app (4 kanban cols + chat) is visible */
const DEMO_CANVAS_W = 1360;
const DEMO_APP_H = 680;
const DEMO_CHROME_H = 44;
const DEMO_CANVAS_H = DEMO_APP_H + DEMO_CHROME_H;
const DEMO_SIDEBAR_W = 236;
const DEMO_CHAT_W = 392;
const DEMO_KANBAN_COL_W = 162;

function DemoScaleFrame({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(w >= DEMO_CANVAS_W ? 1 : Math.max(0.72, w / DEMO_CANVAS_W));
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
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      <div style={{ height: scaledH, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: scaledW, height: scaledH, position: 'relative', flexShrink: 0 }}>
          <div
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

function Av({ name, size = 28, border = true }: { name: string; size?: number; border?: boolean }) {
  const p = ALL_PEOPLE[name as keyof typeof ALL_PEOPLE];
  const src = p?.img || `https://i.pravatar.cc/150?u=${name.toLowerCase()}`;
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

function ComposerTag({ children, icon: Icon }: { children: ReactNode; icon?: typeof ArrowLeftRight }) {
  return (
    <button type="button" style={{
      display: "inline-flex", alignItems: "center", gap: 4, height: 28, padding: "0 8px",
      borderRadius: 8, border: `1px solid ${C.border}`, background: C.card,
      fontSize: 11, fontWeight: 500, color: C.textMuted, cursor: "default", whiteSpace: "nowrap",
    }}>
      {Icon ? <Icon size={12} strokeWidth={1.75} /> : null}
      {children}
      <ChevronDown size={11} strokeWidth={2} color={C.textSubtle} />
    </button>
  );
}

function DemoTaskCard({ task, index, highlighted }: { task: Task; index: number; highlighted?: boolean }) {
  return (
    <div style={{
      background: C.card, borderRadius: 10,
      border: highlighted ? `2px solid ${C.brand}` : `1px solid ${C.border}`,
      padding: "10px 11px", marginBottom: 6,
      boxShadow: highlighted ? `0 0 0 3px rgba(0,122,90,0.12), 0 1px 2px rgba(28,25,23,0.04)` : "0 1px 2px rgba(28,25,23,0.04)",
      animation: `cardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${index * 90}ms both`,
      transition: "border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      transform: highlighted ? "translateY(-1px)" : "translateY(0)",
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.45, marginBottom: 8 }}>{task.title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
        {task.tags.slice(0, 2).map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 500, color: C.textMuted, background: C.bg, border: `1px solid ${C.border}`, padding: "2px 7px", borderRadius: 999 }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          {task.watchers.slice(0, 3).map((n, i) => (
            <div key={n} style={{ marginLeft: i > 0 ? -5 : 0 }}><Av name={n} size={16} /></div>
          ))}
        </div>
        {task.comments > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 3, color: C.textSubtle }}>
            <MessageCircle size={11} strokeWidth={1.75} />
            <span style={{ fontSize: 10, fontWeight: 600 }}>{task.comments}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DemoKanbanColumn({ colKey, tasks, highlightedTaskId }: { colKey: DemoColumnId; tasks: Task[]; highlightedTaskId?: number | null }) {
  const col = KANBAN_COLUMNS[colKey];
  return (
    <div style={{ width: DEMO_KANBAN_COL_W, minWidth: DEMO_KANBAN_COL_W, flexShrink: 0, display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 12px", borderRadius: 8, marginBottom: 4, background: col.headerBg, color: col.headerText,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>{col.emoji}</span>
          <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{col.label}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 6px", borderRadius: 999,
          background: "rgba(255,255,255,0.6)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          display: "inline-block",
        }}>{tasks.length}</span>
      </div>
      <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: "auto", borderRadius: 8, padding: 8, background: col.bodyBg }}>
        {tasks.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 8, border: `1px dashed ${C.border}`, background: "rgba(255,255,255,0.8)", padding: "16px 10px", textAlign: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: C.textMuted, margin: 0 }}>Nothing here yet</p>
            <p style={{ fontSize: 10, color: C.textSubtle, margin: "4px 0 0", lineHeight: 1.4 }}>Drop a task here or add one with +</p>
          </div>
        ) : tasks.map((t, i) => <DemoTaskCard key={t.id} task={t} index={i} highlighted={highlightedTaskId === t.id} />)}
      </div>
    </div>
  );
}

function DemoSidebarRail() {
  return (
    <div style={{ width: 52, minWidth: 52, borderRight: `1px solid ${C.border}`, background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
        <img src="/images/trooper-logomark.png" alt="" style={{ width: 32, height: 32, objectFit: "contain", imageRendering: "pixelated" }} />
        <div style={{ width: 28, height: 1, background: "rgba(231,229,228,0.9)" }} />
        <div style={{ width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: C.card, boxShadow: "0 1px 4px rgba(28,25,23,0.08)", overflow: "hidden", padding: 6 }}>
          <DemoFavicon src={DEMO_ORG.icon} size={24} rounded="md" alt={DEMO_ORG.name} />
        </div>
        <button type="button" style={{ width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(245,245,244,0.7)", color: C.textSubtle, border: "none", cursor: "default" }}>
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
  sidebarTab, setSidebarTab, activePage, onNavigate, activeChannel, onSelectChannel, onUserInteract,
}: {
  sidebarTab: SidebarTab;
  setSidebarTab: (t: SidebarTab) => void;
  activePage: DemoPageId;
  onNavigate: (id: DemoPageId) => void;
  activeChannel: string;
  onSelectChannel: (id: string) => void;
  onUserInteract: () => void;
}) {
  const sectionLabel = { fontSize: 11, fontWeight: 500, color: C.textMuted, padding: "0 4px 6px" } as const;
  const tabBtn = (tab: SidebarTab, icon: typeof LayoutGrid, label: string) => {
    const active = sidebarTab === tab;
    return (
      <button
        type="button"
        onClick={() => { onUserInteract(); setSidebarTab(tab); }}
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
        onClick={() => { onUserInteract(); onNavigate(item.id); }}
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

  const channelRow = (ch: typeof DEMO_CHANNELS[number]) => {
    const active = activeChannel === ch.id;
    return (
      <button
        key={ch.id}
        type="button"
        onClick={() => { onUserInteract(); onSelectChannel(ch.id); onNavigate('tasks'); }}
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
        <button type="button" onClick={onUserInteract} style={{ width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: C.card, color: C.textMuted, boxShadow: "0 1px 3px rgba(28,25,23,0.06)", border: "none", cursor: "default" }}>
          <Search size={16} strokeWidth={1.35} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 8px" }}>
        {sidebarTab === 'channels' ? (
          <>
            <div style={sectionLabel}>Channels</div>
            {DEMO_CHANNELS.map(channelRow)}
            <div style={{ marginTop: 8, padding: "0 4px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: C.textMuted, padding: "8px 4px 6px" }}>Direct messages</div>
              {DEMO_AGENTS.slice(0, 3).map(a => (
                <button key={a.name} type="button" onClick={() => { onUserInteract(); onNavigate('tasks'); }} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 14, marginBottom: 4,
                  width: "100%", border: "none", cursor: "pointer", background: "transparent", textAlign: "left",
                }}>
                  <img src={a.img} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{a.name}</div>
                    <div style={{ fontSize: 10, color: C.textSubtle }}>{a.role}</div>
                  </div>
                </button>
              ))}
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
            <button key={label} type="button" onClick={onUserInteract} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 2px", borderRadius: 12, color: C.textMuted, border: "none", background: "transparent", cursor: "default" }}>
              <Icon size={18} strokeWidth={1.5} />
              <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={() => { onUserInteract(); setSidebarTab('channels'); onNavigate('tasks'); }} style={{
          display: "flex", alignItems: "center", gap: 10, height: 44, padding: "0 14px", width: "100%",
          borderRadius: 16, border: `1px solid ${C.border}`, background: C.card,
          boxShadow: "0 1px 2px rgba(28,25,23,0.04)", fontSize: 14, fontWeight: 500, color: C.text, cursor: "pointer",
        }}>
          <DemoFavicon src={DEMO_ORG.icon} size={20} rounded="md" alt={DEMO_ORG.name} />
          New chat
        </button>
      </div>
    </div>
  );
}

function DemoChatPane({
  messages, inputText, mentionTab, agentTyping, activeChannel, composerPlaceholder, chatRef,
}: {
  messages: Message[];
  inputText: string;
  mentionTab: string;
  agentTyping: boolean;
  activeChannel: string;
  composerPlaceholder: string;
  chatRef: RefObject<HTMLDivElement>;
}) {
  const channelName = DEMO_CHANNELS.find(c => c.id === activeChannel)?.name || 'general';

  return (
    <div style={{ width: DEMO_CHAT_W, minWidth: DEMO_CHAT_W, flexShrink: 0, borderRight: `1px solid ${C.borderWarm}`, background: C.card, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 8px", borderBottom: `1px solid ${C.borderWarm}`, background: C.card }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <button type="button" style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "none", padding: 0, cursor: "default", fontSize: 14, fontWeight: 600, color: "#525252" }}>
            <Hash size={14} strokeWidth={1.75} color="#a3a3a3" />
            {channelName}
            <ChevronDown size={14} strokeWidth={2} color="#a3a3a3" />
          </button>
          <button type="button" style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 32, padding: "0 10px", borderRadius: 8, border: `1px solid rgba(231,229,228,0.8)`, background: C.card, fontSize: 12, fontWeight: 500, color: "#525252", boxShadow: "0 1px 2px rgba(28,25,23,0.04)" }}>
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

      <div ref={chatRef} className="Trooper-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "12px 16px", background: C.card }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 16, animation: `msgIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both` }}>
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
                <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, background: C.card, border: `1px solid ${C.border}`, padding: "2px 7px", borderRadius: 999 }}>
                  <span>{msg.reaction.emoji}</span>
                  <span style={{ fontSize: 10, color: C.textSubtle, fontWeight: 600 }}>{msg.reaction.count}</span>
                </span>
              </div>
            )}
          </div>
        ))}
        {agentTyping && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", animation: "fadeIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both" }}>
            <Av name="Jordan" size={20} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.textSubtle }}>Jordan is typing</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, marginLeft: 2 }} aria-hidden>
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: C.textSubtle,
                    animation: `dotBounce 1.2s ease-in-out ${dot * 0.15}s infinite`,
                  }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: "10px 16px 12px", borderTop: `1px solid ${C.borderWarm}`, background: C.card }}>
        <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.card, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ minHeight: 52, padding: "12px 14px", fontSize: 14, color: inputText ? C.text : C.textSubtle, lineHeight: 1.5 }}>
            {inputText ? (
              <>
                {renderMentionParts(inputText, true)}
                <span style={{ display: "inline-block", width: 1.5, height: 16, background: C.text, marginLeft: 1, verticalAlign: "text-bottom", animation: "blink 1s infinite" }} />
              </>
            ) : composerPlaceholder}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "6px 10px 8px", borderTop: `1px solid ${C.borderWarm}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", minWidth: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle, border: `1px solid ${C.border}`, background: C.card }}>
                <Plus size={16} strokeWidth={1.75} />
              </div>
              <ComposerTag>
                <DemoFavicon src={DEMO_ORG.icon} size={14} rounded="sm" alt={DEMO_ORG.name} />
                {DEMO_ORG.name}
              </ComposerTag>
              <ComposerTag>Auto</ComposerTag>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle }}>
                <Mic size={16} strokeWidth={1.75} />
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: inputText ? C.brand : "rgba(28,25,23,0.09)", color: inputText ? "white" : C.textSubtle,
              }}>
                <ArrowUp size={14} strokeWidth={2.25} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, overflowX: "auto" }}>
          <ComposerTag icon={ArrowLeftRight}>All Devices</ComposerTag>
          <ComposerTag icon={SlidersHorizontal}>Smart Approve</ComposerTag>
        </div>
      </div>
    </div>
  );
}

function DemoBoardPane({ tasks, highlightedTaskId }: { tasks: Task[]; highlightedTaskId?: number | null }) {
  const cols: Record<DemoColumnId, Task[]> = { inbox: [], in_progress: [], review: [], done: [] };
  tasks.forEach((t) => { if (cols[t.col]) cols[t.col].push(t); });

  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: C.card, padding: "10px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexShrink: 0 }}>
        <div style={{ display: "inline-flex", height: 32, alignItems: "center", borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, padding: 1, boxShadow: "0 1px 2px rgba(28,25,23,0.04)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 30, padding: "0 8px", borderRadius: 6, background: "rgba(231,229,228,0.9)", fontSize: 11, fontWeight: 500, color: C.text }}>
            <Columns3 size={14} strokeWidth={1.5} /> Columns
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 30, padding: "0 8px", borderRadius: 6, fontSize: 11, fontWeight: 500, color: C.textMuted }}>
            <List size={14} strokeWidth={1.5} /> List
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <button type="button" style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(28,25,23,0.9)", background: "#1c1917", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>
      <div className="Trooper-scrollbar" style={{ display: "flex", gap: 10, flex: 1, overflowX: "auto", overflowY: "hidden", minHeight: 0 }}>
        {(Object.keys(KANBAN_COLUMNS) as DemoColumnId[]).map((k) => (
          <DemoKanbanColumn key={k} colKey={k} tasks={cols[k]} highlightedTaskId={highlightedTaskId} />
        ))}
      </div>
    </div>
  );
}

export default function TrooperDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");
  const [mentionTab, setMentionTab] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);
  const [activePage, setActivePage] = useState<DemoPageId>("tasks");
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("channels");
  const [activeChannel, setActiveChannel] = useState("general");
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [modalSubtasks, setModalSubtasks] = useState<DemoSubtask[]>(INITIAL_SUBTASKS);
  const [modalFeed, setModalFeed] = useState<DemoFeedItem[]>([]);
  const [modalArtifact, setModalArtifact] = useState<DemoArtifact | null>(null);
  const [modalDelivery, setModalDelivery] = useState<string | null>(null);
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typeRef = useRef<NodeJS.Timeout | null>(null);
  const modalMsgCounter = useRef(0);

  const totalScriptLength = CHAT_SCRIPT.length + TASK_EXEC_SCRIPT.length;
  const spotlightTask = tasks.find(t => t.id === SPOTLIGHT_TASK_ID);

  const resetTaskModal = useCallback(() => {
    setTaskModalOpen(false);
    setModalSubtasks(INITIAL_SUBTASKS.map(s => ({ ...s, status: 'pending' as const })));
    setModalFeed([]);
    setModalArtifact(null);
    setModalDelivery(null);
    setHighlightedTaskId(null);
    modalMsgCounter.current = 0;
  }, []);

  const resetDemo = useCallback(() => {
    setMessages([]); setTasks([]); setInputText(""); setMentionTab(""); setAgentTyping(false);
    setActivePage("tasks"); setSidebarTab("channels"); setActiveChannel("general");
    resetTaskModal();
    setScriptIndex(0);
  }, [resetTaskModal]);

  const pauseDemo = useCallback(() => setIsRunning(false), []);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, agentTyping]);

  const cleanUp = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (typeRef.current) clearInterval(typeRef.current);
  }, []);

  const applyTaskExecStep = useCallback((step: TaskExecStep) => {
    switch (step.type) {
      case 'moveTask':
        setTasks(p => p.map(t => t.id === step.taskId ? { ...t, col: step.col } : t));
        setHighlightedTaskId(step.taskId);
        break;
      case 'openTaskModal':
        setTaskModalOpen(true);
        setHighlightedTaskId(step.taskId);
        setActivePage('tasks');
        break;
      case 'subtask':
        setModalSubtasks(p => p.map(s => s.id === step.id ? { ...s, status: step.status } : s));
        break;
      case 'tool':
        setModalFeed(p => [...p, { kind: 'tool', ...step.log, status: 'running' }]);
        break;
      case 'toolDone':
        setModalFeed(p => p.map(item => item.kind === 'tool' && item.id === step.id ? { ...item, status: 'done' as const } : item));
        break;
      case 'modalMsg': {
        modalMsgCounter.current += 1;
        const t = step.time || `14:${57 + modalMsgCounter.current}`;
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
      case 'openArtifact':
        setModalArtifact(DEMO_ARTIFACTS[step.key] || null);
        break;
      case 'deliver':
        setModalDelivery(step.name);
        setModalArtifact(DEMO_ARTIFACTS['seo-launch-report.md'] || null);
        break;
      case 'closeTaskModal':
        setTaskModalOpen(false);
        break;
      case 'chatMsg':
        setMessages(p => [...p, { sender: step.sender, role: step.role, text: step.text, isHuman: false, time: step.time }]);
        break;
      default:
        break;
    }
  }, []);

  const processStep = useCallback((idx: number) => {
    if (idx >= totalScriptLength) {
      timerRef.current = setTimeout(() => {
        resetDemo();
        setIsRunning(true);
      }, 5000);
      return;
    }

    if (idx >= CHAT_SCRIPT.length) {
      const execStep = TASK_EXEC_SCRIPT[idx - CHAT_SCRIPT.length];
      timerRef.current = setTimeout(() => {
        applyTaskExecStep(execStep);
        setScriptIndex(idx + 1);
      }, execStep.delay);
      return;
    }

    const s = CHAT_SCRIPT[idx];
    timerRef.current = setTimeout(() => {
      if (s.type === "mention_tab") { setMentionTab(s.text || ""); setSidebarTab("channels"); setScriptIndex(idx + 1); return; }
      if (s.type === "typing") {
        setMentionTab(""); let ci = 0; setInputText("");
        typeRef.current = setInterval(() => { ci++; setInputText((s.text || "").slice(0, ci)); if (ci >= (s.text || "").length) { if (typeRef.current) clearInterval(typeRef.current); typeRef.current = null; setScriptIndex(idx + 1); } }, 28);
        return;
      }
      if (s.type === "send") { setInputText(""); setMessages(p => [...p, { sender: s.sender || "", role: s.role || "", text: s.text || "", isHuman: true, time: "14:52" }]); setScriptIndex(idx + 1); return; }
      if (s.type === "nick_typing") { setAgentTyping(true); setActivePage("tasks"); setScriptIndex(idx + 1); return; }
      if (s.type === "response") {
        setAgentTyping(false);
        setMessages(p => [...p, { sender: s.sender || "", role: s.role || "", text: s.text || "", isHuman: false, time: s.time || "" }]);
        setActivePage("tasks");
        setScriptIndex(idx + 1);
        return;
      }
      if (s.type === "reaction") { setMessages(p => { const c = [...p]; if (c.length) c[c.length - 1] = { ...c[c.length - 1], reaction: { emoji: s.emoji || "", count: s.count || 0 } }; return c; }); setScriptIndex(idx + 1); return; }
      if (s.type === "addTasks") {
        const newTasks = s.phase === 1 ? PHASE1_TASKS : PHASE2_TASKS;
        newTasks.forEach((task, taskIndex) => {
          setTimeout(() => {
            setTasks((p) => [...p, task]);
          }, taskIndex * 110);
        });
        setActivePage("tasks");
        setScriptIndex(idx + 1);
        return;
      }
    }, s.delay);
  }, [applyTaskExecStep, resetDemo, totalScriptLength]);

  useEffect(() => { if (!isRunning) return; processStep(scriptIndex); return cleanUp; }, [scriptIndex, isRunning, processStep, cleanUp]);

  const restart = () => {
    cleanUp();
    resetDemo();
    setIsRunning(true);
  };

  const composerPlaceholder = inputText ? "" : (messages.length > 0 ? "Send follow-up" : "Do anything with AI…");
  const showSplit = SPLIT_PAGES.includes(activePage);

  return (
    <div className="Trooper-demo" style={{ width: "100%", margin: "0 auto", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 13 }}>
      <style>{`
        @keyframes cardIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px); } to { opacity:1; transform: translateY(0); } }
        @keyframes msgIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:.35} 40%{transform:translateY(-4px);opacity:1} }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes modalIn { from { opacity:0; transform: scale(0.985); } to { opacity:1; transform: scale(1); } }
        @keyframes modalBackdropIn { from { opacity:0; } to { opacity:1; } }
        @keyframes demoThreadEnter { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform: translateY(0); } }
        .demo-thread-turn { animation: demoThreadEnter 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .demo-thread-tool-row { animation: demoThreadEnter 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .demo-spin { animation: spin 1s linear infinite; }
        .Trooper-scrollbar::-webkit-scrollbar{width:5px;height:5px}
        .Trooper-scrollbar::-webkit-scrollbar-track{background:rgba(231,229,228,0.35);border-radius:4px}
        .Trooper-scrollbar::-webkit-scrollbar-thumb{background:${C.textSubtle};border-radius:4px}
        *{box-sizing:border-box}
        @media (max-width: 1024px) { .Trooper-demo { display: none !important; } }
      `}</style>

      <div className="dashboard-landscape-bg" style={{
        position: "relative", padding: "20px 12px 24px",
        borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      }}>
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
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.bg, borderRadius: 999, padding: "4px 16px", fontSize: 11.5, color: C.textSubtle, border: `1px solid ${C.border}`, maxWidth: 280, width: "100%", justifyContent: "center" }}>
                <Lock size={10} strokeWidth={2.5} />
                app.trooper.so
              </div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <button type="button" onClick={() => setIsRunning(p => !p)} style={{ width: 26, height: 26, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle }}>
                {isRunning ? <Pause size={12} strokeWidth={2} /> : <Play size={12} strokeWidth={2} />}
              </button>
              <button type="button" onClick={restart} style={{ width: 26, height: 26, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle }}>
                <RotateCcw size={12} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", height: DEMO_APP_H, background: C.bg }}>
            <DemoSidebarRail />
            <DemoSidebarNav
              sidebarTab={sidebarTab}
              setSidebarTab={setSidebarTab}
              activePage={activePage}
              onNavigate={setActivePage}
              activeChannel={activeChannel}
              onSelectChannel={setActiveChannel}
              onUserInteract={pauseDemo}
            />

            {showSplit ? (
              <>
                <DemoChatPane
                  messages={messages}
                  inputText={inputText}
                  mentionTab={mentionTab}
                  agentTyping={agentTyping}
                  activeChannel={activeChannel}
                  composerPlaceholder={composerPlaceholder}
                  chatRef={chatRef}
                />
                <DemoBoardPane tasks={tasks} highlightedTaskId={highlightedTaskId} />
              </>
            ) : (
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                <DemoMainPage pageId={activePage} />
              </div>
            )}

            <DemoTaskModal
              open={taskModalOpen}
              taskTitle={spotlightTask?.title || 'SEO Optimization for Wonder'}
              assignee="Aria"
              subtasks={modalSubtasks}
              feed={modalFeed}
              artifact={modalArtifact}
              delivery={modalDelivery}
              statusCol={spotlightTask?.col === 'review' || spotlightTask?.col === 'done' ? spotlightTask.col : 'in_progress'}
              onClose={() => { pauseDemo(); setTaskModalOpen(false); }}
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
  );
}
