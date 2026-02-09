import { useState, useEffect, useCallback, useRef } from "react";
import {
  MessageCircle, Send, AtSign, RotateCcw, Pause, Play, Lock, Bell,
  Users, Bot, Hash, Paperclip, Smile, LayoutGrid,
  Clock, MessageSquare, Zap, Activity
} from "lucide-react";

/* ─── Data ─── */
const HUMANS = [
  { name: "Vaibhav", role: "Founder", img: "https://avatars.githubusercontent.com/u/25829699?v=4" },
  { name: "Ryan", role: "Product Manager", img: "https://i.pravatar.cc/150?u=human-timmy" },
];

const AGENTS = [
  { name: "Coulson", role: "Expand Game Cate…", badge: "LEAD", img: "https://i.pravatar.cc/150?u=agent-coulson", emoji: "🔥" },
  { name: "Maria", role: "Product Manager", badge: "LEAD", img: "https://i.pravatar.cc/150?u=agent-maria", emoji: "🧠" },
  { name: "Nick", role: "Chief of Staff", badge: "LEAD", img: "https://i.pravatar.cc/150?u=agent-nick", emoji: "⚡" },
  { name: "Hill", role: "Operations Manager", badge: "LEAD", img: "https://i.pravatar.cc/150?u=agent-hill", emoji: "📋" },
  { name: "Shuri", role: "Product Analyst", badge: "SPC", img: "https://i.pravatar.cc/150?u=agent-shuri", emoji: "🧪" },
  { name: "Fury", role: "Customer Researcher", badge: "SPC", img: "https://i.pravatar.cc/150?u=agent-fury", emoji: "🔍" },
  { name: "Banner", role: "Data Scientist", badge: "SPC", img: "https://i.pravatar.cc/150?u=agent-banner", emoji: "📊" },
  { name: "Monica", role: "Business Intelligence", badge: "SPC", img: "https://i.pravatar.cc/150?u=agent-monica", emoji: "💡" },
  { name: "Vision", role: "Engineering", badge: "SPC", img: "https://i.pravatar.cc/150?u=agent-vision", emoji: "👁️" },
];

const ALL_PEOPLE = Object.fromEntries(
  [...HUMANS, ...AGENTS,
    { name: "Wanda", img: "https://i.pravatar.cc/150?u=agent-wanda" },
    { name: "Loki", img: "https://i.pravatar.cc/150?u=agent-loki" },
    { name: "Quill", img: "https://i.pravatar.cc/150?u=agent-quill" },
    { name: "Friday", img: "https://i.pravatar.cc/150?u=agent-friday" },
  ].map(p => [p.name, p])
);

const PHASE1_TASKS = [
  { id: 1, title: "SEO Optimization for Wonder", col: "inbox", status: "Inbox", tags: ["seo", "visibility"], watchers: ["Vaibhav", "Ryan"], comments: 2, by: "Vision", time: "just now" },
  { id: 2, title: "Create and Distribute Branded Swag", col: "inbox", status: "Inbox", tags: ["branding", "merchandise"], watchers: ["Maria", "Nick"], comments: 1, by: "Wanda", time: "just now" },
  { id: 3, title: "Write blog post on AI trends", col: "assigned", status: "Assigned", tags: ["content", "research"], watchers: ["Shuri"], comments: 0, by: "Vision", time: "just now" },
  { id: 4, title: "Improve Website User Experience", col: "assigned", status: "Assigned", tags: ["ux", "ui"], watchers: ["Banner", "Monica"], comments: 0, by: "Wanda", time: "just now" },
  { id: 5, title: "Update Website with New Game Releases", col: "progress", status: "In Progress", tags: ["website", "content"], watchers: ["Vaibhav", "Ryan"], comments: 0, by: "Loki", time: "just now" },
  { id: 6, title: "Expand Game Categories and Tags", col: "progress", status: "In Progress", tags: ["game", "categories"], watchers: ["Vaibhav", "Ryan"], comments: 2, by: "Coulson", time: "just now" },
];

const PHASE2_TASKS = [
  { id: 7, title: "Develop Social Media Strategy", col: "progress", status: "In Progress", tags: ["social", "media"], watchers: ["Vaibhav", "Ryan"], comments: 0, by: "Quill", time: "just now" },
  { id: 8, title: "Design landing page mockup", col: "review", status: "Review", tags: ["design", "ui"], watchers: ["Maria", "Nick", "Hill"], comments: 2, by: "Wanda", time: "just now" },
  { id: 9, title: "API integration review", col: "review", status: "Review", tags: ["dev", "docs"], watchers: ["Shuri", "Banner"], comments: 2, by: "Friday", time: "just now" },
  { id: 10, title: "Capture Website Screenshots", col: "review", status: "Review", tags: ["website", "visual"], watchers: ["Monica", "Vision", "Fury", "Banner", "Hill"], comments: 10, by: "Maria", time: "just now" },
];

const CHAT_SCRIPT = [
  { type: "mention_tab", text: "Vaibhav: @Nick hey...", delay: 150 },
  { type: "typing", text: "hey @Nick we just launched Wonder on Product Hunt today 🚀 can you get the team set up for launch day?", delay: 200 },
  { type: "send", sender: "Vaibhav", role: "Founder", text: "hey @Nick we just launched Wonder on Product Hunt today 🚀 can you get the team set up for launch day?", delay: 300 },
  { type: "nick_typing", delay: 800 },
  { type: "response", sender: "Nick", role: "Chief of Staff", text: "congrats on the launch! 🎉 let me pull together everything we need — checking our playbook, past launches, and support tickets now...", time: "14:52", delay: 1400 },
  { type: "nick_typing", delay: 1200 },
  { type: "response", sender: "Nick", role: "Chief of Staff", text: "alright, I've created 6 tasks based on what worked for our last 3 launches. SEO, content, UX improvements, website updates — the works. They're on the board now!", time: "14:53", delay: 300 },
  { type: "addTasks", phase: 1, delay: 600 },
  { type: "reaction", emoji: "🔥", count: 2, delay: 500 },
  { type: "typing", text: "this is amazing. can you assign them to whoever's best?", delay: 800 },
  { type: "send", sender: "Vaibhav", role: "Founder", text: "this is amazing. can you assign them to whoever's best? don't need to check with me", delay: 300 },
  { type: "nick_typing", delay: 800 },
  { type: "response", sender: "Nick", role: "Chief of Staff", text: "on it — matching tasks by each agent's skillset and past performance. Coulson's got SEO, Vision's on content, Wanda's handling UX & design...", time: "14:54", delay: 1200 },
  { type: "addTasks", phase: 2, delay: 500 },
  { type: "response", sender: "Nick", role: "Chief of Staff", text: "done! all 10 tasks assigned and the team's already working. I'll flag anything that needs your attention. go enjoy launch day 🦀💪", time: "14:55", delay: 1400 },
  { type: "reaction", emoji: "👍", count: 3, delay: 600 },
];

/* ─── Helpers ─── */
function Av({ name, size = 28, border = true }: { name: string; size?: number; border?: boolean }) {
  const p = ALL_PEOPLE[name as keyof typeof ALL_PEOPLE];
  const src = p?.img || `https://i.pravatar.cc/150?u=${name.toLowerCase()}`;
  return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: border ? "1.5px solid white" : "none", boxShadow: border ? "0 0 0 0.5px rgba(0,0,0,0.08)" : "none", flexShrink: 0, display: "block" }} />;
}

function AvatarStack({ names, size = 18, max = 2 }: { names: string[]; size?: number; max?: number }) {
  const shown = names.slice(0, max);
  const extra = names.length - max;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {shown.map((n, i) => <div key={n} style={{ marginLeft: i > 0 ? -5 : 0, zIndex: max - i, position: "relative" }}><Av name={n} size={size} /></div>)}
      {extra > 0 && <span style={{ marginLeft: -4, width: size, height: size, borderRadius: "50%", background: "#f3f4f6", border: "1.5px solid white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: "#6b7280", zIndex: 0 }}>+{extra}</span>}
    </div>
  );
}

function TaskTag({ text }: { text: string }) {
  return <span style={{ fontSize: 10.5, fontWeight: 500, color: "#525252", background: "#f5f5f5", border: "1px solid #e5e5e5", padding: "1px 8px", borderRadius: 5, lineHeight: "18px", whiteSpace: "nowrap" }}>{text}</span>;
}

/* ─── Compact Task Card ─── */
function TaskCard({ task, index }: { task: (typeof PHASE1_TASKS)[number]; index: number }) {
  return (
    <div style={{
      background: "white", borderRadius: 10, border: "1.5px dashed #d4d4d4",
      padding: "10px 12px", marginBottom: 6,
      animation: `cardIn 0.4s ease ${index * 80}ms both`,
    }}>
      {/* Title */}
      <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.35, marginBottom: 2 }}>{task.title}</div>
      <div style={{ fontSize: 10, color: "#b5b5b5", marginBottom: 6 }}>{task.status}</div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
        {task.tags.slice(0, 2).map(t => <TaskTag key={t} text={t} />)}
        {task.tags.length > 2 && <span style={{ fontSize: 10, color: "#b5b5b5", padding: "1px 5px", background: "#f5f5f5", borderRadius: 5, border: "1px solid #e5e5e5" }}>+1</span>}
      </div>

      {/* Watchers row + avatar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10, color: "#b5b5b5" }}>{task.watchers.length} watching</span>
          <AvatarStack names={task.watchers} size={18} max={2} />
        </div>
        <Av name={task.by} size={24} />
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, paddingTop: 6, borderTop: "1px solid #f5f5f5", fontSize: 10, color: "#d4d4d4" }}>
        <MessageSquare size={11} strokeWidth={1.5} color="#ccc" />
        <span style={{ color: "#b5b5b5" }}>{task.comments}</span>
        <span>by {task.by} · {task.time}</span>
      </div>
    </div>
  );
}

/* ─── Column ─── */
const COL_META = {
  inbox: { label: "Inbox", bg: "#f5f5f5", accent: "#737373" },
  assigned: { label: "Assigned", bg: "#fef3c7", accent: "#d97706" },
  progress: { label: "In Progress", bg: "#dbeafe", accent: "#2563eb" },
  review: { label: "Review", bg: "#f3e8ff", accent: "#9333ea" },
};

function KanbanColumn({ colKey, tasks }: { colKey: keyof typeof COL_META; tasks: Task[] }) {

  const m = COL_META[colKey];
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", marginBottom: 8, background: m.bg, borderRadius: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: m.accent === "#737373" ? "#525252" : m.accent }}>{m.label}</span>
        <span style={{ fontSize: 11, fontWeight: 800, color: m.accent, background: m.accent + "18", padding: "0 7px", borderRadius: 8, lineHeight: "20px" }}>{tasks.length}</span>
      </div>
      <div className="crabs-scrollbar" style={{ flex: 1, overflowY: "auto", paddingRight: 2 }}>
        {tasks.map((t, i) => <TaskCard key={t.id} task={t} index={i} />)}
      </div>
    </div>
  );
}

/* ─── Typing dots ─── */
function TypingIndicator({ name }: { name: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", animation: "fadeIn 0.25s ease both" }}>
      <Av name={name} size={20} />
      <span style={{ fontSize: 11, fontWeight: 600, color: "#a3a3a3" }}>{name} is typing</span>
      <div style={{ display: "flex", gap: 2.5, alignItems: "center" }}>
        <div className="typing-dot" style={{ animationDelay: "0ms" }} />
        <div className="typing-dot" style={{ animationDelay: "150ms" }} />
        <div className="typing-dot" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

/* ═══════════ Main ═══════════ */
type Message = { sender: string; role: string; text: string; isHuman: boolean; time: string; reaction?: { emoji: string; count: number } };
type Task = (typeof PHASE1_TASKS)[number];

export default function CrabsHQDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());
  const [mentionTab, setMentionTab] = useState("");
  const [nickTyping, setNickTyping] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages, inputText, nickTyping]);

  const cleanUp = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (typeRef.current) clearInterval(typeRef.current);
  }, []);

  const processStep = useCallback((idx: number) => {
    if (idx >= CHAT_SCRIPT.length) {
      timerRef.current = setTimeout(() => {
        setMessages([]); setTasks([]); setInputText(""); setActiveAgents(new Set()); setMentionTab(""); setNickTyping(false); setScriptIndex(0);
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
      if (s.type === "nick_typing") { setNickTyping(true); setActiveAgents(p => new Set([...Array.from(p), "Nick"])); setScriptIndex(idx + 1); return; }
      if (s.type === "response") { setNickTyping(false); setActiveAgents(p => new Set([...Array.from(p), s.sender || ""])); setMessages(p => [...p, { sender: s.sender || "", role: s.role || "", text: s.text || "", isHuman: false, time: s.time || "" }]); setScriptIndex(idx + 1); return; }
      if (s.type === "reaction") { setMessages(p => { const c = [...p]; if (c.length) c[c.length - 1] = { ...c[c.length - 1], reaction: { emoji: s.emoji || "", count: s.count || 0 } }; return c; }); setScriptIndex(idx + 1); return; }
      if (s.type === "addTasks") { setTasks(p => [...p, ...(s.phase === 1 ? PHASE1_TASKS : PHASE2_TASKS)] as Task[]); setScriptIndex(idx + 1); return; }
    }, s.delay);
  }, []);

  useEffect(() => { if (!isRunning) return; processStep(scriptIndex); return cleanUp; }, [scriptIndex, isRunning, processStep, cleanUp]);

  const restart = () => { cleanUp(); setMessages([]); setTasks([]); setInputText(""); setActiveAgents(new Set()); setMentionTab(""); setNickTyping(false); setScriptIndex(0); setIsRunning(true); };

  const cols: { [key in keyof typeof COL_META]: Task[] } = { inbox: [], assigned: [], progress: [], review: [] };
  tasks.forEach((t: Task) => { if (cols[t.col as keyof typeof COL_META]) cols[t.col as keyof typeof COL_META].push(t); });

  return (
    <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes cardIn { from { opacity:0; transform: translateY(10px) scale(0.97); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px); } to { opacity:1; transform: translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(239,68,68,.4)} 70%{box-shadow:0 0 0 8px rgba(239,68,68,0)} 100%{box-shadow:0 0 0 0 rgba(239,68,68,0)} }
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-3px);opacity:1} }
        .typing-dot { width:3.5px; height:3.5px; border-radius:50%; background:#a3a3a3; animation:dotBounce 1.2s infinite ease-in-out; }
        .crabs-scrollbar::-webkit-scrollbar{width:3px}
        .crabs-scrollbar::-webkit-scrollbar-track{background:transparent}
        .crabs-scrollbar::-webkit-scrollbar-thumb{background:#ddd;border-radius:3px}
        *{box-sizing:border-box}
      `}</style>

      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #d4d4d4", boxShadow: "0 25px 50px rgba(0,0,0,.1), 0 8px 20px rgba(0,0,0,.05)", background: "#fafaf9" }}>

        {/* macOS bar */}
        <div style={{ display: "flex", alignItems: "center", padding: "9px 16px", background: "#fafaf9", borderBottom: "1px solid #e7e5e4", gap: 12 }}>
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0efed", borderRadius: 7, padding: "4px 18px", fontSize: 11.5, color: "#78716c", border: "1px solid #e7e5e4", maxWidth: 280, width: "100%", justifyContent: "center" }}>
              <Lock size={10} strokeWidth={2.5} color="#78716c" />
              app.crabshq.com
            </div>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => setIsRunning(p => !p)} style={{ width: 26, height: 26, borderRadius: 5, border: "1px solid #d6d3d1", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#78716c" }}>
              {isRunning ? <Pause size={12} strokeWidth={2} /> : <Play size={12} strokeWidth={2} />}
            </button>
            <button onClick={restart} style={{ width: 26, height: 26, borderRadius: 5, border: "1px solid #d6d3d1", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#78716c" }}>
              <RotateCcw size={12} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* App Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 18px", background: "white", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="https://dazzling-cat.netlify.app/crabhq1.png" alt="Crabs HQ" style={{ height: 30, objectFit: "contain" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#78716c", background: "#f5f5f4", padding: "3px 10px", borderRadius: 7, border: "1px solid #e7e5e4", display: "flex", alignItems: "center", gap: 4, marginLeft: 4 }}>
              <LayoutGrid size={11} strokeWidth={2} /> Wonder
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 17, fontWeight: 800, color: "#171717" }}>19</div><div style={{ fontSize: 8, fontWeight: 600, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: 1 }}>Active</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 17, fontWeight: 800, color: "#171717" }}>10</div><div style={{ fontSize: 8, fontWeight: 600, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: 1 }}>Queued</div></div>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 5, background: "#ef4444", color: "white", padding: "5px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", animation: "pulseRing 2s infinite" }}>
              <Bell size={12} strokeWidth={2.5} /> Attention
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#a3a3a3", fontWeight: 500 }}>
              <Zap size={12} strokeWidth={2} />
              <Clock size={12} strokeWidth={2} />
              <span>14:57</span>
              <span style={{ fontSize: 9, color: "#d4d4d4" }}>MON, FEB 9</span>
            </div>
          </div>
        </div>

        {/* ── 3-Panel ── */}
        <div style={{ display: "flex", height: 520, background: "#f5f5f4" }}>

          {/* LEFT SIDEBAR */}
          <div className="crabs-scrollbar" style={{ width: 185, minWidth: 185, borderRight: "1px solid #e5e7eb", background: "white", overflowY: "auto", padding: "10px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 12px", marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: 1 }}>Team</span>
              <span style={{ fontSize: 9, color: "#d4d4d4", display: "flex", alignItems: "center", gap: 2 }}>
                2 <Users size={9} strokeWidth={2} /> · 19 <Bot size={9} strokeWidth={2} />
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 7, margin: "0 8px 10px", padding: "6px 8px", background: "#f5f5f5", borderRadius: 8, border: "1px solid #e5e7eb", cursor: "pointer" }}>
              <LayoutGrid size={14} strokeWidth={1.5} color="#737373" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#171717" }}>All Tasks</span>
            </div>

            <div style={{ padding: "0 12px", marginBottom: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: 1 }}>Humans</span>
            </div>
            {HUMANS.map(h => (
              <div key={h.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 12px" }}>
                <div style={{ position: "relative" }}>
                  <img src={h.img} alt={h.name} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#22c55e", border: "1.5px solid white" }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>{h.name}</span>
                    <span style={{ fontSize: 8, fontWeight: 800, color: "#2563eb", background: "#dbeafe", padding: "0.5px 5px", borderRadius: 3 }}>HUMAN</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#a3a3a3" }}>{h.role}</div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", margin: "10px 0 4px" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: 1 }}>AI Agents</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#ef4444" }}>19 ACTIVE</span>
            </div>
            {AGENTS.map(a => {
              const isActive = activeAgents.has(a.name);
              const bc = a.badge === "LEAD" ? "#f59e0b" : "#a855f7";
              return (
                <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 12px", background: isActive ? "#fef2f2" : "transparent", transition: "background 0.3s" }}>
                  <div style={{ position: "relative" }}>
                    <img src={a.img} alt={a.name} style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", bottom: -1, right: -1, width: 7, height: 7, borderRadius: "50%", background: isActive ? "#22c55e" : "#d4d4d4", border: "1.5px solid white", transition: "background 0.3s" }} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#171717" }}>{a.name}</span>
                      <span style={{ fontSize: 7.5, fontWeight: 800, color: bc, background: bc + "20", padding: "0.5px 4px", borderRadius: 3, textTransform: "uppercase", letterSpacing: 0.3 }}>{a.badge}</span>
                      <span style={{ fontSize: 10 }}>{a.emoji}</span>
                    </div>
                    <div style={{ fontSize: 9.5, color: "#a3a3a3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.role}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER KANBAN */}
          <div style={{ flex: 1, overflow: "hidden", padding: "10px 12px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 8, flex: 1, overflow: "hidden" }}>
              {["inbox", "assigned", "progress", "review"].map(k => (
                <KanbanColumn key={k} colKey={k as keyof typeof COL_META} tasks={cols[k as keyof typeof COL_META]} />
              ))}
            </div>
          </div>

          {/* RIGHT CHAT */}
          <div style={{ width: 300, minWidth: 300, borderLeft: "1px solid #e5e7eb", background: "white", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid #e5e7eb", gap: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", borderBottom: "2px solid #ef4444", paddingBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
                <MessageCircle size={13} strokeWidth={2} /> Team Chat
              </span>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#a3a3a3", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
                <Activity size={13} strokeWidth={1.5} /> Activity
              </span>
            </div>

            <div style={{ padding: "6px 14px", borderBottom: "1px solid #f5f5f5", fontSize: 9, color: "#b5b5b5", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
              TYPE <AtSign size={9} strokeWidth={2.5} /> TO MENTION
            </div>

            {mentionTab && (
              <div style={{ padding: "5px 14px", borderBottom: "1px solid #f0f0f0", background: "#fafafa", fontSize: 11, color: "#737373", display: "flex", alignItems: "center", gap: 5, animation: "fadeIn 0.25s ease both" }}>
                <Av name="Vaibhav" size={16} border={false} />
                <span style={{ color: "#a3a3a3" }}>{mentionTab}</span>
              </div>
            )}

            <div ref={chatRef} className="crabs-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: 12, animation: "fadeIn 0.3s ease both" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <Av name={msg.sender} size={22} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: msg.isHuman ? "#171717" : "#dc2626" }}>{msg.sender}</span>
                    <span style={{ fontSize: 10, color: "#b5b5b5" }}>{msg.role}</span>
                    <span style={{ fontSize: 9, color: "#d4d4d4", marginLeft: "auto" }}>{msg.time}</span>
                  </div>
                  <div style={{ marginLeft: 28, fontSize: 12.5, lineHeight: 1.55, color: "#374151" }}>
                    {msg.text.split(/(@\w+)/g).map((part: string, j: number) =>
                      part.startsWith("@") ? <span key={j} style={{ color: "#2563eb", fontWeight: 600, background: "#dbeafe", padding: "1px 4px", borderRadius: 4, fontSize: 11.5 }}>{part}</span> : <span key={j}>{part}</span>
                    )}
                  </div>
                  {msg.reaction && (
                    <div style={{ marginLeft: 28, marginTop: 4 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, background: "#fefce8", border: "1px solid #fde68a", padding: "1px 7px", borderRadius: 7 }}>
                        {msg.reaction.emoji} {msg.reaction.count}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {nickTyping && <TypingIndicator name="Nick" />}
            </div>

            {/* Input */}
            <div style={{ padding: "8px 12px", borderTop: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f5f5f5", borderRadius: 9, border: "1px solid #e5e5e5", padding: "8px 12px" }}>
                <div style={{ flex: 1, fontSize: 12, color: inputText ? "#171717" : "#a3a3a3", minHeight: 16, fontWeight: inputText ? 500 : 400, lineHeight: 1.4, wordBreak: "break-word" }}>
                  {inputText ? (
                    <>
                      {inputText.split(/(@\w+)/g).map((part, i) =>
                        part.startsWith("@") ? <span key={i} style={{ color: "#2563eb", fontWeight: 600, background: "#dbeafe", padding: "0 2px", borderRadius: 3 }}>{part}</span> : <span key={i}>{part}</span>
                      )}
                      <span style={{ display: "inline-block", width: 1.5, height: 14, background: "#171717", marginLeft: 0.5, verticalAlign: "text-bottom", animation: "blink 1s infinite" }} />
                    </>
                  ) : "Message as Vaibhav..."}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                  <Paperclip size={14} strokeWidth={1.5} color="#b5b5b5" />
                  <Smile size={14} strokeWidth={1.5} color="#b5b5b5" />
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: inputText ? "#ef4444" : "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                    <Send size={13} strokeWidth={2} color={inputText ? "white" : "#b5b5b5"} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Av name="Vaibhav" size={16} border={false} />
                  <span style={{ fontSize: 10, color: "#a3a3a3" }}>Chatting as <strong style={{ color: "#525252" }}>Vaibhav</strong></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Hash size={10} strokeWidth={1.5} color="#d4d4d4" />
                  <span style={{ fontSize: 9, color: "#d4d4d4" }}>Press @ to mention</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
