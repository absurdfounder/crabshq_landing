'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Send, RotateCcw, Pause, Play, Lock, Bell,
  Hash, Paperclip, LayoutGrid,
  Clock, MessageSquare, Activity, Home, ListTodo, Plus,
  Target, HardDrive, Brain, Users, Laptop, Settings, Shapes,
} from "lucide-react";
import { TROOPER_DEMO as C, KANBAN_COLUMNS, type DemoColumnId } from './demoTheme';

/* ─── Data ─── */
const HUMANS = [
  { name: "Vaibhav", role: "Founder", img: "https://avatars.githubusercontent.com/u/25829699?v=4" },
];

const AGENTS = [
  { name: "Jordan", role: "Chief of Staff", badge: "LEAD", img: "https://i.pravatar.cc/150?u=agent-jordan", emoji: "⚡" },
  { name: "Aria", role: "Growth & Marketing", badge: "MEMBER", img: "https://i.pravatar.cc/150?u=agent-aria", emoji: "📣" },
  { name: "Leo", role: "Operations & Finance", badge: "MEMBER", img: "https://i.pravatar.cc/150?u=agent-leo", emoji: "📊" },
  { name: "Ren", role: "Product Builder", badge: "MEMBER", img: "https://i.pravatar.cc/150?u=agent-ren", emoji: "🛠️" },
];

const ALL_PEOPLE = Object.fromEntries(
  [...HUMANS, ...AGENTS,
    { name: "Vision", img: "https://i.pravatar.cc/150?u=agent-vision" },
    { name: "Wanda", img: "https://i.pravatar.cc/150?u=agent-wanda" },
  ].map(p => [p.name, p])
);

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

function Av({ name, size = 28, border = true }: { name: string; size?: number; border?: boolean }) {
  const p = ALL_PEOPLE[name as keyof typeof ALL_PEOPLE];
  const src = p?.img || `https://i.pravatar.cc/150?u=${name.toLowerCase()}`;
  return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: border ? `1.5px solid ${C.card}` : "none", boxShadow: border ? "0 0 0 0.5px rgba(28,25,23,0.06)" : "none", flexShrink: 0, display: "block" }} />;
}

function AvatarStack({ names, size = 18, max = 2 }: { names: string[]; size?: number; max?: number }) {
  const shown = names.slice(0, max);
  const extra = names.length - max;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {shown.map((n, i) => <div key={n} style={{ marginLeft: i > 0 ? -5 : 0, zIndex: max - i, position: "relative" }}><Av name={n} size={size} /></div>)}
      {extra > 0 && <span style={{ marginLeft: -4, width: size, height: size, borderRadius: "50%", background: C.bg, border: `1.5px solid ${C.card}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: C.textMuted, zIndex: 0 }}>+{extra}</span>}
    </div>
  );
}

function TaskTag({ text }: { text: string }) {
  return <span style={{ fontSize: 10, fontWeight: 500, color: C.textMuted, background: C.bg, border: `1px solid ${C.border}`, padding: "2px 7px", borderRadius: 999, lineHeight: "14px", whiteSpace: "nowrap" }}>{text}</span>;
}

function TaskCard({ task, index }: { task: Task; index: number }) {
  return (
    <div style={{
      background: C.card,
      borderRadius: C.radiusSm,
      border: `1px solid ${C.border}`,
      padding: "10px 11px",
      marginBottom: 8,
      boxShadow: "0 1px 2px rgba(28,25,23,0.04)",
      animation: `cardIn 0.4s ease ${index * 80}ms both`,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.text, lineHeight: 1.45, marginBottom: 8 }}>{task.title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
        {task.tags.slice(0, 2).map(t => <TaskTag key={t} text={t} />)}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 6, borderTop: `1px solid ${C.borderWarm}` }}>
        <AvatarStack names={task.watchers} size={16} max={3} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MessageSquare size={10} strokeWidth={2} color={C.textSubtle} />
          <span style={{ fontSize: 10, color: C.textSubtle, fontWeight: 600 }}>{task.comments}</span>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ colKey, tasks }: { colKey: DemoColumnId; tasks: Task[] }) {
  const m = KANBAN_COLUMNS[colKey];
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: C.bg, borderRadius: C.radiusSm, border: `1px solid ${C.border}`, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", background: m.headerBg, borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 12 }}>{m.emoji}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: m.headerText, textTransform: "uppercase", letterSpacing: 0.6 }}>{m.label}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: C.textSubtle, marginLeft: "auto" }}>{tasks.length}</span>
      </div>
      <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: "auto", padding: 8 }}>
        {tasks.map((t, i) => <TaskCard key={t.id} task={t} index={i} />)}
      </div>
    </div>
  );
}

function TypingIndicator({ name }: { name: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", animation: "fadeIn 0.25s ease both" }}>
      <Av name={name} size={20} />
      <span style={{ fontSize: 11, fontWeight: 600, color: C.textSubtle }}>{name} is typing</span>
      <div style={{ display: "flex", gap: 2.5, alignItems: "center" }}>
        <div className="typing-dot" style={{ animationDelay: "0ms" }} />
        <div className="typing-dot" style={{ animationDelay: "150ms" }} />
        <div className="typing-dot" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

function DemoSidebarRail() {
  return (
    <div style={{ width: 52, minWidth: 52, borderRight: `1px solid ${C.border}`, background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
        <img src="/images/trooper-logomark.png" alt="" style={{ width: 32, height: 32, objectFit: "contain" }} />
        <div style={{ width: 28, height: 1, background: C.border }} />
        <div style={{
          width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          background: C.card, boxShadow: "0 1px 4px rgba(28,25,23,0.08)", fontSize: 16, fontWeight: 800, color: "#7C3AED",
        }}>W</div>
        <div style={{
          width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          background: `${C.brandLight}`, color: C.textSubtle,
        }}>
          <Plus size={16} strokeWidth={1.5} />
        </div>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(28,25,23,0.06)" }}>
        <Av name="Vaibhav" size={40} border={false} />
      </div>
    </div>
  );
}

const MENU_NAV = {
  core: [
    { label: "Home", icon: Home, active: true },
    { label: "Tasks", icon: ListTodo, active: false },
    { label: "Goals", icon: Target, active: false },
    { label: "Routines", icon: Clock, active: false },
    { label: "Files", icon: HardDrive, active: false },
  ],
  team: [
    { label: "Agents", icon: Users, active: false },
    { label: "Devices", icon: Laptop, active: false },
    { label: "Memory", icon: Brain, active: false },
  ],
  advanced: [
    { label: "Skills & Plugins", icon: Shapes, active: false },
    { label: "Settings", icon: Settings, active: false },
  ],
};

function DemoSidebarNav({ sidebarTab }: { sidebarTab: 'menu' | 'chats' }) {
  const sectionLabel = { fontSize: 10, fontWeight: 600, color: C.textSubtle, textTransform: "uppercase" as const, letterSpacing: 0.6, padding: "0 4px 6px" };
  const navRow = (item: { label: string; icon: typeof Home; active: boolean }) => {
    const Icon = item.icon;
    return (
      <div key={item.label} style={{
        display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 12, marginBottom: 2,
        background: item.active ? C.card : "transparent",
        color: item.active ? C.text : C.textMuted,
        boxShadow: item.active ? "0 1px 3px rgba(28,25,23,0.06)" : "none",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          background: item.active ? C.brandLight : C.bg,
          color: item.active ? C.brand : C.textSubtle,
        }}>
          <Icon size={15} strokeWidth={item.active ? 2 : 1.75} />
        </div>
        <span style={{ fontSize: 12, fontWeight: item.active ? 600 : 500 }}>{item.label}</span>
      </div>
    );
  };

  return (
    <div className="Trooper-scrollbar" style={{ width: 260, minWidth: 260, borderRight: `1px solid ${C.border}`, background: C.bg, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "4px 0 24px rgba(28,25,23,0.05)" }}>
      <div style={{ display: "flex", gap: 4, padding: "10px 12px 8px" }}>
        {(['menu', 'chats'] as const).map((tab) => (
          <span key={tab} style={{
            flex: 1, textAlign: "center", fontSize: 11, fontWeight: 700, padding: "6px 0", borderRadius: 8,
            background: sidebarTab === tab ? C.card : "transparent",
            color: sidebarTab === tab ? C.text : C.textSubtle,
            boxShadow: sidebarTab === tab ? "0 1px 2px rgba(28,25,23,0.06)" : "none",
            textTransform: "capitalize",
          }}>
            {tab === 'menu' ? 'Menu' : 'Chats'}
          </span>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 8px" }}>
        {sidebarTab === 'chats' ? (
          <>
            <div style={{ padding: "4px 4px 8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 12, background: C.brandLight, color: C.brand, fontSize: 12, fontWeight: 600 }}>
                <Hash size={14} strokeWidth={2} />
                general
              </div>
            </div>
            <div style={{ padding: "0 4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", borderRadius: 12, border: `1px dashed ${C.border}`, color: C.textSubtle, fontSize: 11, fontWeight: 600 }}>
                <Plus size={13} strokeWidth={2} /> New chat
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={sectionLabel}>Core workspace</div>
              {MENU_NAV.core.map(navRow)}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={sectionLabel}>Team & data</div>
              {MENU_NAV.team.map(navRow)}
            </div>
            <div>
              <div style={sectionLabel}>Advanced</div>
              {MENU_NAV.advanced.map(navRow)}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: "8px 10px 10px", borderTop: `1px solid ${C.borderWarm}`, background: C.bg }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 8, background: C.card, borderRadius: 14, padding: 4, boxShadow: "0 1px 3px rgba(28,25,23,0.06)" }}>
          {[
            { icon: Activity, label: "Activity" },
            { icon: Bell, label: "Attention" },
            { icon: Pause, label: "Pause" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 2px", borderRadius: 10, color: C.textMuted }}>
              <Icon size={16} strokeWidth={1.5} />
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: -0.2 }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 10px", borderRadius: 12, background: C.brand, color: "white", fontSize: 11, fontWeight: 700 }}>
          <Plus size={13} strokeWidth={2.5} /> New chat
        </div>
      </div>
    </div>
  );
}

export default function TrooperDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());
  const [mentionTab, setMentionTab] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);
  const [workspaceTab, setWorkspaceTab] = useState<'messages' | 'board'>('messages');
  const [sidebarTab, setSidebarTab] = useState<'menu' | 'chats'>('chats');
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages, inputText, agentTyping]);

  const cleanUp = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (typeRef.current) clearInterval(typeRef.current);
  }, []);

  const processStep = useCallback((idx: number) => {
    if (idx >= CHAT_SCRIPT.length) {
      timerRef.current = setTimeout(() => {
        setMessages([]); setTasks([]); setInputText(""); setActiveAgents(new Set()); setMentionTab(""); setAgentTyping(false); setScriptIndex(0);
      }, 5000);
      return;
    }
    const s = CHAT_SCRIPT[idx];
    timerRef.current = setTimeout(() => {
      if (s.type === "mention_tab") { setMentionTab(s.text || ""); setSidebarTab('chats'); setScriptIndex(idx + 1); return; }
      if (s.type === "typing") {
        setMentionTab(""); let ci = 0; setInputText("");
        typeRef.current = setInterval(() => { ci++; setInputText((s.text || "").slice(0, ci)); if (ci >= (s.text || "").length) { if (typeRef.current) clearInterval(typeRef.current); typeRef.current = null; setScriptIndex(idx + 1); } }, 28);
        return;
      }
      if (s.type === "send") { setInputText(""); setMessages(p => [...p, { sender: s.sender || "", role: s.role || "", text: s.text || "", isHuman: true, time: "14:52" }]); setScriptIndex(idx + 1); return; }
      if (s.type === "nick_typing") { setAgentTyping(true); setActiveAgents(p => new Set([...Array.from(p), "Jordan"])); setScriptIndex(idx + 1); return; }
      if (s.type === "response") {
        setAgentTyping(false);
        setActiveAgents(p => new Set([...Array.from(p), s.sender || ""]));
        setMessages(p => [...p, { sender: s.sender || "", role: s.role || "", text: s.text || "", isHuman: false, time: s.time || "" }]);
        if (s.text?.includes("on the board")) setWorkspaceTab('board');
        setScriptIndex(idx + 1);
        return;
      }
      if (s.type === "reaction") { setMessages(p => { const c = [...p]; if (c.length) c[c.length - 1] = { ...c[c.length - 1], reaction: { emoji: s.emoji || "", count: s.count || 0 } }; return c; }); setScriptIndex(idx + 1); return; }
      if (s.type === "addTasks") { setTasks(p => [...p, ...(s.phase === 1 ? PHASE1_TASKS : PHASE2_TASKS)]); setWorkspaceTab('board'); setScriptIndex(idx + 1); return; }
    }, s.delay);
  }, []);

  useEffect(() => { if (!isRunning) return; processStep(scriptIndex); return cleanUp; }, [scriptIndex, isRunning, processStep, cleanUp]);

  const restart = () => { cleanUp(); setMessages([]); setTasks([]); setInputText(""); setActiveAgents(new Set()); setMentionTab(""); setAgentTyping(false); setWorkspaceTab('messages'); setSidebarTab('chats'); setScriptIndex(0); setIsRunning(true); };

  const cols: Record<DemoColumnId, Task[]> = { inbox: [], in_progress: [], review: [], done: [] };
  tasks.forEach((t) => { if (cols[t.col]) cols[t.col].push(t); });

  return (
    <div className="Trooper-demo" style={{ width: "100%", margin: "0 auto", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes cardIn { from { opacity:0; transform: translateY(10px) scale(0.97); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px); } to { opacity:1; transform: translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(0,122,90,.35)} 70%{box-shadow:0 0 0 10px rgba(0,122,90,0)} 100%{box-shadow:0 0 0 0 rgba(0,122,90,0)} }
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-3px);opacity:1} }
        .typing-dot { width:3.5px; height:3.5px; border-radius:50%; background:${C.textSubtle}; animation:dotBounce 1.2s infinite ease-in-out; }
        .Trooper-scrollbar::-webkit-scrollbar{width:4px}
        .Trooper-scrollbar::-webkit-scrollbar-track{background:transparent}
        .Trooper-scrollbar::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}
        *{box-sizing:border-box}
        @media (max-width: 1024px) { .Trooper-demo { display: none !important; } }
      `}</style>

      <div style={{
        position: "relative",
        padding: "32px 20px",
        backgroundColor: C.bg,
        backgroundImage: `linear-gradient(rgba(123, 160, 68, 0.28), rgba(0, 122, 90, 0.22)), url(/images/hero-bg-pixel.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ position: "relative", margin: "0 auto", maxWidth: 1200, borderRadius: C.radius, overflow: "hidden", border: `1px solid ${C.border}`, background: C.bg, boxShadow: "0 24px 48px -16px rgba(28,25,23,0.18), 0 8px 16px -8px rgba(28,25,23,0.08)" }}>

          {/* Browser chrome */}
          <div style={{ display: "flex", alignItems: "center", padding: "9px 16px", background: C.cardWarm, borderBottom: `1px solid ${C.border}`, gap: 12 }}>
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

          {/* Workspace header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: C.card, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.text, background: C.bg, padding: "5px 10px", borderRadius: 999, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 5 }}>
                <LayoutGrid size={12} strokeWidth={2} /> Wonder
              </span>
              <div style={{ display: "flex", gap: 4, background: C.bg, borderRadius: 10, padding: 3, border: `1px solid ${C.border}` }}>
                {(['messages', 'board'] as const).map((tab) => (
                  <button key={tab} type="button" onClick={() => setWorkspaceTab(tab)} style={{
                    border: "none", cursor: "pointer", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 600,
                    background: workspaceTab === tab ? C.card : "transparent",
                    color: workspaceTab === tab ? C.text : C.textSubtle,
                    boxShadow: workspaceTab === tab ? "0 1px 2px rgba(28,25,23,0.06)" : "none",
                  }}>
                    {tab === 'messages' ? 'Messages' : 'Board'}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 0, border: `1px solid ${C.border}`, borderRadius: 8, background: C.card, overflow: "hidden" }}>
                <div style={{ textAlign: "center", padding: "4px 10px", borderRight: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>{Math.max(activeAgents.size, 1)}</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: C.textSubtle, textTransform: "uppercase", letterSpacing: 0.6, marginTop: 1 }}>Active</div>
                </div>
                <div style={{ textAlign: "center", padding: "4px 10px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>{tasks.length}</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: C.textSubtle, textTransform: "uppercase", letterSpacing: 0.6, marginTop: 1 }}>Tasks</div>
                </div>
              </div>
              <button type="button" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.brand, color: "white", padding: "6px 11px", borderRadius: 999, border: "none", fontSize: 10, fontWeight: 700, cursor: "pointer", animation: "pulseRing 2s infinite", textTransform: "uppercase", letterSpacing: 0.5 }}>
                <Bell size={11} strokeWidth={2.5} /> Attention
              </button>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, color: C.textSubtle, fontWeight: 600, padding: "4px 8px", border: `1px solid ${C.border}`, borderRadius: 8, background: C.card }}>
                <Clock size={10} strokeWidth={2} />
                <span style={{ color: C.text }}>14:57</span>
              </div>
            </div>
          </div>

          {/* App shell: rail | nav | workspace */}
          <div style={{ display: "flex", height: 520, background: C.bg }}>
            <DemoSidebarRail />
            <DemoSidebarNav sidebarTab={sidebarTab} />

            {/* Chat pane */}
            <div style={{ width: workspaceTab === 'board' ? '42%' : '58%', minWidth: 0, borderRight: `1px solid ${C.border}`, background: C.cardWarm, display: "flex", flexDirection: "column", transition: "width 0.25s ease" }}>
              <div style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 6 }}>
                <Hash size={12} strokeWidth={2.2} color={C.textSubtle} /> general
              </div>
              {mentionTab && (
                <div style={{ padding: "5px 12px", borderBottom: `1px solid ${C.borderWarm}`, background: C.bg, fontSize: 11, color: C.textMuted, display: "flex", alignItems: "center", gap: 5 }}>
                  <Av name="Vaibhav" size={16} border={false} />
                  <span>{mentionTab}</span>
                </div>
              )}
              <div ref={chatRef} className="Trooper-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ marginBottom: 12, animation: "fadeIn 0.3s ease both" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <Av name={msg.sender} size={22} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{msg.sender}</span>
                      <span style={{ fontSize: 8, fontWeight: 700, color: msg.isHuman ? C.textMuted : C.brand, background: msg.isHuman ? C.bg : C.brandLight, border: `1px solid ${msg.isHuman ? C.border : C.brandSoft}`, padding: "1px 6px", borderRadius: 999, textTransform: "uppercase" }}>
                        {msg.isHuman ? "Human" : "Agent"}
                      </span>
                      <span style={{ fontSize: 10, color: C.textSubtle }}>{msg.role}</span>
                      <span style={{ fontSize: 9, color: C.border, marginLeft: "auto" }}>{msg.time}</span>
                    </div>
                    <div style={{ marginLeft: 28, fontSize: 12, lineHeight: 1.55, color: C.textMuted }}>
                      {msg.text.split(/(@\w+)/g).map((part: string, j: number) =>
                        part.startsWith("@") ? <span key={j} style={{ color: C.brand, fontWeight: 600, background: C.brandLight, border: `1px solid ${C.brandSoft}`, padding: "0 4px", borderRadius: 6, fontSize: 11.5 }}>{part}</span> : <span key={j}>{part}</span>
                      )}
                    </div>
                    {msg.reaction && (
                      <div style={{ marginLeft: 28, marginTop: 5 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, background: C.card, border: `1px solid ${C.border}`, padding: "2px 7px", borderRadius: 999 }}>
                          <span>{msg.reaction.emoji}</span>
                          <span style={{ fontSize: 10, color: C.textSubtle, fontWeight: 600 }}>{msg.reaction.count}</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                {agentTyping && <TypingIndicator name="Jordan" />}
              </div>
              <div style={{ padding: "8px 10px", borderTop: `1px solid ${C.border}`, background: C.card }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.card, borderRadius: C.radiusSm, border: `1px solid ${C.border}`, padding: "8px 10px" }}>
                  <div style={{ flex: 1, fontSize: 12, color: inputText ? C.text : C.textSubtle, minHeight: 16, lineHeight: 1.4 }}>
                    {inputText ? (
                      <>
                        {inputText.split(/(@\w+)/g).map((part, i) =>
                          part.startsWith("@") ? <span key={i} style={{ color: C.brand, fontWeight: 600, background: C.brandLight, padding: "0 3px", borderRadius: 4 }}>{part}</span> : <span key={i}>{part}</span>
                        )}
                        <span style={{ display: "inline-block", width: 1.5, height: 14, background: C.text, marginLeft: 0.5, verticalAlign: "text-bottom", animation: "blink 1s infinite" }} />
                      </>
                    ) : "Message as Vaibhav…"}
                  </div>
                  <Paperclip size={13} strokeWidth={1.5} color={C.textSubtle} />
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: inputText ? C.text : C.bg, display: "flex", alignItems: "center", justifyContent: "center", border: inputText ? "none" : `1px solid ${C.border}` }}>
                    <Send size={12} strokeWidth={2} color={inputText ? "white" : C.textSubtle} />
                  </div>
                </div>
              </div>
            </div>

            {/* Board pane */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: C.bg, padding: 10 }}>
              <div style={{ display: "flex", gap: 8, flex: 1, overflow: "hidden", opacity: workspaceTab === 'board' || tasks.length > 0 ? 1 : 0.45 }}>
                {(Object.keys(KANBAN_COLUMNS) as DemoColumnId[]).map((k) => (
                  <KanbanColumn key={k} colKey={k} tasks={cols[k]} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
