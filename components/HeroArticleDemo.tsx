'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Send, RotateCcw, Pause, Play, Lock, Bell,
  Hash, LayoutGrid, Activity, Home, ListTodo, Plus, Search,
  Target, HardDrive, Brain, Users, Laptop, Settings, Shapes, Clock,
  ChevronDown, Columns3, List, MessageCircle, MessageSquarePlus, ArrowUp,
} from "lucide-react";
import { TROOPER_DEMO as C, KANBAN_COLUMNS, type DemoColumnId } from './demoTheme';

const HUMANS = [
  { name: "Vaibhav", role: "Founder", img: "https://avatars.githubusercontent.com/u/25829699?v=4" },
];

const AGENTS = [
  { name: "Jordan", role: "Chief of Staff", badge: "LEAD", img: "https://i.pravatar.cc/150?u=agent-jordan" },
  { name: "Aria", role: "Growth & Marketing", badge: "MEMBER", img: "https://i.pravatar.cc/150?u=agent-aria" },
  { name: "Leo", role: "Operations & Finance", badge: "MEMBER", img: "https://i.pravatar.cc/150?u=agent-leo" },
  { name: "Ren", role: "Product Builder", badge: "MEMBER", img: "https://i.pravatar.cc/150?u=agent-ren" },
];

const ALL_PEOPLE = Object.fromEntries(
  [...HUMANS, ...AGENTS].map(p => [p.name, p])
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
  return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: border ? `1.5px solid ${C.card}` : "none", flexShrink: 0, display: "block" }} />;
}

function AvatarStack({ names, size = 18, max = 2 }: { names: string[]; size?: number; max?: number }) {
  const shown = names.slice(0, max);
  const extra = names.length - max;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {shown.map((n, i) => <div key={n} style={{ marginLeft: i > 0 ? -5 : 0, zIndex: max - i, position: "relative" }}><Av name={n} size={size} /></div>)}
      {extra > 0 && <span style={{ marginLeft: -4, width: size, height: size, borderRadius: "50%", background: C.bg, border: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: C.textMuted, zIndex: 0 }}>+{extra}</span>}
    </div>
  );
}

function DemoTaskCard({ task, index }: { task: Task; index: number }) {
  return (
    <div style={{
      background: C.card,
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      padding: "10px 11px",
      marginBottom: 6,
      boxShadow: "0 1px 2px rgba(28,25,23,0.04)",
      animation: `cardIn 0.4s ease ${index * 80}ms both`,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.45, marginBottom: 8 }}>{task.title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
        {task.tags.slice(0, 2).map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 500, color: C.textMuted, background: C.bg, border: `1px solid ${C.border}`, padding: "2px 7px", borderRadius: 999 }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <AvatarStack names={task.watchers} size={16} max={3} />
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

function DemoKanbanColumn({ colKey, tasks }: { colKey: DemoColumnId; tasks: Task[] }) {
  const col = KANBAN_COLUMNS[colKey];
  return (
    <div style={{ width: 210, minWidth: 210, flexShrink: 0, display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 12px", borderRadius: 8, marginBottom: 4,
        background: col.headerBg, color: col.headerText,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>{col.emoji}</span>
          <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{col.label}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 6px", borderRadius: 999,
          background: "rgba(255,255,255,0.6)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
        }}>{tasks.length}</span>
      </div>
      <div className="Trooper-scrollbar" style={{
        flex: 1, overflowY: "auto", borderRadius: 8, padding: 8,
        background: col.bodyBg, border: "1px solid transparent",
      }}>
        {tasks.length === 0 ? (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            borderRadius: 8, border: `1px dashed ${C.border}`, background: "rgba(255,255,255,0.8)",
            padding: "16px 10px", textAlign: "center",
          }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: C.textMuted, margin: 0 }}>Nothing here yet</p>
            <p style={{ fontSize: 10, color: C.textSubtle, margin: "4px 0 0", lineHeight: 1.4 }}>Drop a task here or add one with +</p>
          </div>
        ) : tasks.map((t, i) => <DemoTaskCard key={t.id} task={t} index={i} />)}
      </div>
    </div>
  );
}

function DemoSidebarRail() {
  return (
    <div style={{
      width: 52, minWidth: 52, borderRight: `1px solid ${C.border}`, background: C.bg,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "8px 0",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
        <img src="/images/trooper-logomark.png" alt="" style={{ width: 32, height: 32, objectFit: "contain", imageRendering: "pixelated" }} />
        <div style={{ width: 28, height: 1, background: "rgba(231,229,228,0.9)" }} />
        <div style={{
          width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          background: C.card, boxShadow: "0 1px 4px rgba(28,25,23,0.08)", overflow: "hidden", padding: 4,
        }}>
          <img src="/images/trooper-logomark.png" alt="" style={{ width: 28, height: 28, objectFit: "contain", imageRendering: "pixelated" }} />
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(245,245,244,0.7)", color: C.textSubtle,
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
    { label: "Home", icon: Home, id: "home" },
    { label: "Tasks", icon: ListTodo, id: "tasks" },
    { label: "Goals", icon: Target, id: "goals" },
    { label: "Routines", icon: Clock, id: "routines" },
    { label: "Files", icon: HardDrive, id: "files" },
  ],
  team: [
    { label: "Agents", icon: Users, id: "agents" },
    { label: "Devices", icon: Laptop, id: "devices" },
    { label: "Memory", icon: Brain, id: "memory" },
  ],
  advanced: [
    { label: "Skills & Plugins", icon: Shapes, id: "skills" },
    { label: "Settings", icon: Settings, id: "settings" },
  ],
};

function DemoSidebarNav({ activePage }: { activePage: string }) {
  const sectionLabel = { fontSize: 11, fontWeight: 500, color: C.textMuted, padding: "0 4px 6px" } as const;

  const navRow = (item: { label: string; icon: typeof Home; id: string }, tone: "primary" | "advanced" = "primary") => {
    const Icon = item.icon;
    const active = activePage === item.id;
    return (
      <div key={item.id} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 16, marginBottom: 2,
        background: active ? C.card : "transparent",
        boxShadow: active ? "0 1px 3px rgba(28,25,23,0.06)" : "none",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          background: active ? C.brandLight : tone === "advanced" ? C.brandLight : "rgba(237,235,233,0.8)",
          color: active ? "#292524" : tone === "advanced" ? C.textSubtle : C.textMuted,
        }}>
          <Icon size={16} strokeWidth={1.35} />
        </div>
        <span style={{ fontSize: 14, fontWeight: active ? 600 : tone === "advanced" ? 400 : 500, color: active ? C.text : tone === "advanced" ? C.textMuted : "#44403c" }}>{item.label}</span>
      </div>
    );
  };

  return (
    <div className="Trooper-scrollbar" style={{
      width: 260, minWidth: 260, borderRight: `1px solid ${C.border}`, background: C.bg,
      display: "flex", flexDirection: "column", overflow: "hidden",
      boxShadow: "4px 0 24px rgba(28,25,23,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "10px 12px 8px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 10px",
          borderRadius: 16, background: C.card, boxShadow: "0 1px 3px rgba(28,25,23,0.06)",
          fontSize: 14, fontWeight: 600, color: C.text,
        }}>
          <LayoutGrid size={16} strokeWidth={1.35} />
          Menu
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          color: C.textMuted,
        }}>
          <MessageCircle size={16} strokeWidth={1.35} />
        </div>
        <div style={{ flex: 1 }} />
        <div style={{
          width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          background: C.card, color: C.textMuted, boxShadow: "0 1px 3px rgba(28,25,23,0.06)",
        }}>
          <Search size={16} strokeWidth={1.35} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 8px" }}>
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
      </div>

      <div style={{ padding: "8px 12px 12px", borderTop: `1px solid ${C.borderWarm}`, background: C.bg }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 8, background: C.card, borderRadius: 16, padding: 4, boxShadow: "0 1px 3px rgba(28,25,23,0.06)" }}>
          {[
            { icon: Activity, label: "Activity" },
            { icon: Bell, label: "Attention" },
            { icon: Pause, label: "Pause" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 2px", borderRadius: 12, color: C.textMuted }}>
              <Icon size={18} strokeWidth={1.5} />
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2 }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, height: 44, padding: "0 14px",
          borderRadius: 16, border: `1px solid ${C.border}`, background: C.card,
          boxShadow: "0 1px 2px rgba(28,25,23,0.04)", fontSize: 14, fontWeight: 500, color: C.text,
        }}>
          <img src="/images/trooper-logomark.png" alt="" style={{ width: 20, height: 20, objectFit: "contain", imageRendering: "pixelated" }} />
          New chat
        </div>
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

export default function TrooperDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");
  const [mentionTab, setMentionTab] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);
  const [activePage, setActivePage] = useState("tasks");
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
        setMessages([]); setTasks([]); setInputText(""); setMentionTab(""); setAgentTyping(false); setActivePage("tasks"); setScriptIndex(0);
      }, 5000);
      return;
    }
    const s = CHAT_SCRIPT[idx];
    timerRef.current = setTimeout(() => {
      if (s.type === "mention_tab") { setMentionTab(s.text || ""); setScriptIndex(idx + 1); return; }
      if (s.type === "typing") {
        setMentionTab(""); let ci = 0; setInputText("");
        typeRef.current = setInterval(() => { ci++; setInputText((s.text || "").slice(0, ci)); if (ci >= (s.text || "").length) { if (typeRef.current) clearInterval(typeRef.current); typeRef.current = null; setScriptIndex(idx + 1); } }, 28);
        return;
      }
      if (s.type === "send") { setInputText(""); setMessages(p => [...p, { sender: s.sender || "", role: s.role || "", text: s.text || "", isHuman: true, time: "14:52" }]); setScriptIndex(idx + 1); return; }
      if (s.type === "nick_typing") { setAgentTyping(true); setScriptIndex(idx + 1); return; }
      if (s.type === "response") {
        setAgentTyping(false);
        setMessages(p => [...p, { sender: s.sender || "", role: s.role || "", text: s.text || "", isHuman: false, time: s.time || "" }]);
        if (s.text?.includes("on the board")) setActivePage("tasks");
        setScriptIndex(idx + 1);
        return;
      }
      if (s.type === "reaction") { setMessages(p => { const c = [...p]; if (c.length) c[c.length - 1] = { ...c[c.length - 1], reaction: { emoji: s.emoji || "", count: s.count || 0 } }; return c; }); setScriptIndex(idx + 1); return; }
      if (s.type === "addTasks") { setTasks(p => [...p, ...(s.phase === 1 ? PHASE1_TASKS : PHASE2_TASKS)]); setActivePage("tasks"); setScriptIndex(idx + 1); return; }
    }, s.delay);
  }, []);

  useEffect(() => { if (!isRunning) return; processStep(scriptIndex); return cleanUp; }, [scriptIndex, isRunning, processStep, cleanUp]);

  const restart = () => {
    cleanUp();
    setMessages([]); setTasks([]); setInputText(""); setMentionTab(""); setAgentTyping(false);
    setActivePage("tasks"); setScriptIndex(0); setIsRunning(true);
  };

  const cols: Record<DemoColumnId, Task[]> = { inbox: [], in_progress: [], review: [], done: [] };
  tasks.forEach((t) => { if (cols[t.col]) cols[t.col].push(t); });

  const composerPlaceholder = inputText ? "" : (messages.length > 0 ? "Send follow-up" : "Do anything with AI…");

  return (
    <div className="Trooper-demo" style={{ width: "100%", margin: "0 auto", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 14 }}>
      <style>{`
        @keyframes cardIn { from { opacity:0; transform: translateY(10px) scale(0.97); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px); } to { opacity:1; transform: translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-3px);opacity:1} }
        .typing-dot { width:3.5px; height:3.5px; border-radius:50%; background:${C.textSubtle}; animation:dotBounce 1.2s infinite ease-in-out; }
        .Trooper-scrollbar::-webkit-scrollbar{width:4px;height:4px}
        .Trooper-scrollbar::-webkit-scrollbar-track{background:transparent}
        .Trooper-scrollbar::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}
        *{box-sizing:border-box}
        @media (max-width: 1024px) { .Trooper-demo { display: none !important; } }
      `}</style>

      <div style={{
        position: "relative", padding: "32px 20px", backgroundColor: C.bg,
        backgroundImage: `linear-gradient(rgba(123, 160, 68, 0.22), rgba(0, 122, 90, 0.16)), url(/images/hero-bg-pixel.png)`,
        backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        imageRendering: "pixelated", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          position: "relative", margin: "0 auto", maxWidth: 1280, borderRadius: C.radius, overflow: "hidden",
          border: `1px solid ${C.border}`, background: C.bg,
          boxShadow: "0 24px 48px -16px rgba(28,25,23,0.18), 0 8px 16px -8px rgba(28,25,23,0.08)",
        }}>
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

          {/* App shell — matches AgentSidebar + ChatPanel + KanbanBoard split */}
          <div style={{ display: "flex", height: 540, background: C.bg }}>
            <DemoSidebarRail />
            <DemoSidebarNav activePage={activePage} />

            {/* Chat pane */}
            <div style={{ width: "42%", minWidth: 0, borderRight: `1px solid ${C.borderWarm}`, background: C.card, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "12px 16px 8px", borderBottom: `1px solid ${C.borderWarm}`, background: C.card }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <button type="button" style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "none", padding: 0, cursor: "default", fontSize: 14, fontWeight: 600, color: "#525252" }}>
                    <Hash size={14} strokeWidth={1.75} color="#a3a3a3" />
                    general
                    <ChevronDown size={14} strokeWidth={2} color="#a3a3a3" />
                  </button>
                  <button type="button" style={{
                    display: "inline-flex", alignItems: "center", gap: 4, height: 32, padding: "0 10px",
                    borderRadius: 8, border: `1px solid rgba(231,229,228,0.8)`, background: C.card,
                    fontSize: 12, fontWeight: 500, color: "#525252", boxShadow: "0 1px 2px rgba(28,25,23,0.04)",
                  }}>
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
                  <div key={i} style={{ marginBottom: 16, animation: "fadeIn 0.3s ease both" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <Av name={msg.sender} size={24} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{msg.sender}</span>
                      {!msg.isHuman && (
                        <span style={{ fontSize: 9, fontWeight: 600, color: C.text, background: C.brandLight, padding: "2px 6px", borderRadius: 4, height: 16, display: "inline-flex", alignItems: "center" }}>Manager</span>
                      )}
                      <span style={{ fontSize: 12, color: C.textSubtle }}>— {msg.role}</span>
                      <span style={{ fontSize: 11, color: "#d6d3d1", marginLeft: "auto" }}>{msg.time}</span>
                    </div>
                    <div style={{ marginLeft: 32, fontSize: 14, lineHeight: 1.55, color: C.textMuted }}>
                      {msg.text.split(/(@\w+)/g).map((part: string, j: number) =>
                        part.startsWith("@") ? <span key={j} style={{ color: C.brand, fontWeight: 600 }}>{part}</span> : <span key={j}>{part}</span>
                      )}
                    </div>
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
                {agentTyping && <TypingIndicator name="Jordan" />}
              </div>

              {/* Composer — matches SharedComposer shape */}
              <div style={{ padding: "10px 16px 12px", borderTop: `1px solid ${C.borderWarm}`, background: C.card }}>
                <div style={{
                  borderRadius: 16, border: `1px solid ${C.border}`, background: C.card,
                  boxShadow: "0 1px 2px rgba(28,25,23,0.04)", overflow: "hidden",
                }}>
                  <div style={{ minHeight: 52, padding: "12px 14px", fontSize: 14, color: inputText ? C.text : C.textSubtle }}>
                    {inputText ? (
                      <>
                        {inputText.split(/(@\w+)/g).map((part, i) =>
                          part.startsWith("@") ? <span key={i} style={{ color: C.brand, fontWeight: 600 }}>{part}</span> : <span key={i}>{part}</span>
                        )}
                        <span style={{ display: "inline-block", width: 1.5, height: 16, background: C.text, marginLeft: 1, verticalAlign: "text-bottom", animation: "blink 1s infinite" }} />
                      </>
                    ) : composerPlaceholder}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px 8px", borderTop: `1px solid ${C.borderWarm}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.textSubtle }}>
                        <Plus size={16} strokeWidth={1.75} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 500, color: C.textSubtle, padding: "4px 8px", borderRadius: 8, background: C.bg }}>Trooper Auto</span>
                    </div>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: inputText ? C.text : C.bg, border: inputText ? "none" : `1px solid ${C.border}`,
                    }}>
                      <ArrowUp size={14} strokeWidth={2.5} color={inputText ? "white" : C.textSubtle} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Board pane */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: C.card, padding: "10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexShrink: 0 }}>
                <div style={{ display: "inline-flex", height: 32, alignItems: "center", borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, padding: 1, boxShadow: "0 1px 2px rgba(28,25,23,0.04)" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 30, padding: "0 8px", borderRadius: 6, background: "rgba(231,229,228,0.9)", fontSize: 11, fontWeight: 500, color: C.text }}>
                    <Columns3 size={14} strokeWidth={1.5} />
                    Columns
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 30, padding: "0 8px", borderRadius: 6, fontSize: 11, fontWeight: 500, color: C.textMuted }}>
                    <List size={14} strokeWidth={1.5} />
                    List
                  </div>
                </div>
                <div style={{ flex: 1 }} />
                <button type="button" style={{
                  width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(28,25,23,0.9)",
                  background: "#1c1917", color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                }}>
                  <Plus size={14} strokeWidth={2} />
                </button>
              </div>

              <div className="Trooper-scrollbar" style={{ display: "flex", gap: 10, flex: 1, overflowX: "auto", overflowY: "hidden", minHeight: 0 }}>
                {(Object.keys(KANBAN_COLUMNS) as DemoColumnId[]).map((k) => (
                  <DemoKanbanColumn key={k} colKey={k} tasks={cols[k]} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
