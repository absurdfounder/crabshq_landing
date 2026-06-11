'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import {
  MessageCircle, Send, AtSign, RotateCcw, Pause, Play, Lock, Bell,
  Users, Bot, Hash, Paperclip, Smile, LayoutGrid,
  Clock, MessageSquare, Activity
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
  { type: "response", sender: "Nick", role: "Chief of Staff", text: "done! all 10 tasks assigned and the team's already working. I'll flag anything that needs your attention. go enjoy launch day 🪖💪", time: "14:55", delay: 1400 },
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
  return <span style={{ fontSize: 10, fontWeight: 500, color: "#525252", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "1px 6px", borderRadius: 2, lineHeight: "16px", whiteSpace: "nowrap", fontFamily: "ui-monospace, SFMono-Regular, monospace", textTransform: "lowercase", letterSpacing: 0.2 }}>{text}</span>;
}

/* ─── Compact Task Card ─── */
function TaskCard({ task, index }: { task: (typeof PHASE1_TASKS)[number]; index: number }) {
  return (
    <div style={{
      background: "white", borderRadius: 2, border: "1px solid #e2e8f0",
      padding: "9px 10px", marginBottom: 6,
      animation: `cardIn 0.4s ease ${index * 80}ms both`,
    }}>
      {/* Title */}
      <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", lineHeight: 1.4, marginBottom: 6 }}>{task.title}</div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
        {task.tags.slice(0, 2).map(t => <TaskTag key={t} text={t} />)}
        {task.tags.length > 2 && <span style={{ fontSize: 10, color: "#94a3b8", padding: "1px 5px", background: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>+1</span>}
      </div>

      {/* Watchers row + author */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 6, borderTop: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <AvatarStack names={task.watchers} size={16} max={3} />
          <span style={{ fontSize: 9, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
            {task.watchers.length} watching
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MessageSquare size={10} strokeWidth={2} color="#cbd5e1" />
          <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>{task.comments}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Column ─── */
const COL_META = {
  inbox: { label: "Inbox", accent: "#94a3b8" },
  assigned: { label: "Assigned", accent: "#d97706" },
  progress: { label: "In Progress", accent: "#2563eb" },
  review: { label: "Review", accent: "#9333ea" },
};

function KanbanColumn({ colKey, tasks }: { colKey: keyof typeof COL_META; tasks: Task[] }) {

  const m = COL_META[colKey];
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 4px 10px", marginBottom: 6, borderTop: `2px solid ${m.accent}` }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>{m.label}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", marginLeft: "auto", fontFamily: "ui-monospace, SFMono-Regular, monospace", letterSpacing: 0.5 }}>{tasks.length}</span>
      </div>
      <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: "auto", paddingRight: 2 }}>
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

export default function TrooperDemo() {
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
    <div className="Trooper-demo" style={{ width: "100%", margin: "0 auto", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes cardIn { from { opacity:0; transform: translateY(10px) scale(0.97); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px); } to { opacity:1; transform: translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(16,185,129,.35)} 70%{box-shadow:0 0 0 10px rgba(16,185,129,0)} 100%{box-shadow:0 0 0 0 rgba(16,185,129,0)} }
        @keyframes agentPulse { 0%{transform:scale(1);opacity:.6} 70%{transform:scale(2);opacity:0} 100%{transform:scale(1);opacity:0} }
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-3px);opacity:1} }
        .typing-dot { width:3.5px; height:3.5px; border-radius:50%; background:#a3a3a3; animation:dotBounce 1.2s infinite ease-in-out; }
        .Trooper-scrollbar::-webkit-scrollbar{width:3px}
        .Trooper-scrollbar::-webkit-scrollbar-track{background:transparent}
        .Trooper-scrollbar::-webkit-scrollbar-thumb{background:#ddd;border-radius:3px}
        *{box-sizing:border-box}
        
        /* Hide on mobile and tablet */
        @media (max-width: 1024px) {
          .Trooper-demo { display: none !important; }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          padding: "32px 20px",
          backgroundColor: "#f8fafc",
          backgroundImage:
            "linear-gradient(rgb(16 185 129 / 53%), rgb(16 185 129 / 40%)), url(/images/hero-bg-pixel.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >

      <div style={{ position: "relative", margin: "0 auto", maxWidth: 1200, borderRadius: 0, overflow: "hidden", border: "1px solid #cbd5e1", background: "#fafaf9", boxShadow: "0 24px 48px -16px rgba(15,23,42,0.28), 0 8px 16px -8px rgba(15,23,42,0.14)" }}>

        {/* macOS bar */}
        <div style={{ display: "flex", alignItems: "center", padding: "9px 16px", background: "#fafaf9", borderBottom: "1px solid #e7e5e4", gap: 12 }}>
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0efed", borderRadius: 2, padding: "4px 18px", fontSize: 11.5, color: "#78716c", border: "1px solid #e2e8f0", maxWidth: 280, width: "100%", justifyContent: "center" }}>
              <Lock size={10} strokeWidth={2.5} color="#78716c" />
              app.trooper.so
            </div>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => setIsRunning(p => !p)} style={{ width: 26, height: 26, borderRadius: 2, border: "1px solid #e2e8f0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#78716c" }}>
              {isRunning ? <Pause size={12} strokeWidth={2} /> : <Play size={12} strokeWidth={2} />}
            </button>
            <button onClick={restart} style={{ width: 26, height: 26, borderRadius: 2, border: "1px solid #e2e8f0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#78716c" }}>
              <RotateCcw size={12} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* App Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: "white", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <img
                src="/images/trooper-logomark.png"
                alt=""
                className="h-[26px] w-auto object-contain bg-transparent"
              />
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", background: "white", padding: "4px 10px", borderRadius: 2, border: "1px solid #cbd5e1", display: "flex", alignItems: "center", gap: 5, marginLeft: 4, textTransform: "uppercase", letterSpacing: 0.6, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
              <LayoutGrid size={11} strokeWidth={2.25} /> Wonder
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 0, border: "1px solid #e2e8f0", borderRadius: 2, background: "white" }}>
              <div style={{ textAlign: "center", padding: "4px 10px", borderRight: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", lineHeight: 1.1, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>19</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "ui-monospace, SFMono-Regular, monospace", marginTop: 1 }}>Active</div>
              </div>
              <div style={{ textAlign: "center", padding: "4px 10px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", lineHeight: 1.1, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>10</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "ui-monospace, SFMono-Regular, monospace", marginTop: 1 }}>Queued</div>
              </div>
            </div>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#10b981", color: "white", padding: "6px 11px", borderRadius: 2, border: "none", fontSize: 10, fontWeight: 700, cursor: "pointer", animation: "pulseRing 2s infinite", textTransform: "uppercase", letterSpacing: 0.7, fontFamily: "ui-monospace, SFMono-Regular, monospace", lineHeight: 1 }}>
              <Bell size={11} strokeWidth={2.5} /> Attention
            </button>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, color: "#64748b", fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, monospace", textTransform: "uppercase", letterSpacing: 0.7, padding: "4px 8px", border: "1px solid #e2e8f0", borderRadius: 2, background: "white" }}>
              <Clock size={10} strokeWidth={2} color="#94a3b8" />
              <span style={{ color: "#0f172a" }}>14:57</span>
              <span style={{ color: "#cbd5e1" }}>·</span>
              <span style={{ color: "#94a3b8" }}>Mon Feb 9</span>
            </div>
          </div>
        </div>

        {/* ── 3-Panel ── */}
        <div className="Trooper-container" style={{ display: "flex", height: 520, background: "#f5f5f4" }}>

          {/* LEFT SIDEBAR */}
          <div className="Trooper-sidebar Trooper-scrollbar" style={{ width: 190, minWidth: 190, borderRight: "1px solid #e2e8f0", background: "white", overflowY: "auto", padding: "10px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", marginBottom: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
                <span style={{ color: "#cbd5e1" }}>[01]</span> Team
              </span>
              <span style={{ fontSize: 9, color: "#cbd5e1", fontFamily: "ui-monospace, SFMono-Regular, monospace", display: "flex", alignItems: "center", gap: 4 }}>
                <Users size={9} strokeWidth={2} /> 2
                <Bot size={9} strokeWidth={2} /> 19
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 7, margin: "0 8px 10px", padding: "6px 8px", background: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0", cursor: "pointer" }}>
              <LayoutGrid size={13} strokeWidth={1.5} color="#64748b" />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>All Tasks</span>
              <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 600, color: "#94a3b8", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>29</span>
            </div>

            <div style={{ padding: "0 12px", marginBottom: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
                <span style={{ color: "#cbd5e1" }}>[02]</span> Humans
              </span>
            </div>
            {HUMANS.map(h => (
              <div key={h.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px" }}>
                <div style={{ position: "relative" }}>
                  <img src={h.img} alt={h.name} style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#10b981", border: "1.5px solid white" }} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>{h.name}</span>
                    <span style={{ fontSize: 8, fontWeight: 700, color: "#475569", background: "#f1f5f9", border: "1px solid #e2e8f0", padding: "0 4px", borderRadius: 2, fontFamily: "ui-monospace, SFMono-Regular, monospace", letterSpacing: 0.4 }}>YOU</span>
                  </div>
                  <div style={{ fontSize: 9.5, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.role}</div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", margin: "12px 0 4px" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
                <span style={{ color: "#cbd5e1" }}>[03]</span> AI Agents
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#059669", display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
                <span style={{ position: "relative", width: 5, height: 5 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#10b981", opacity: 0.5, animation: "agentPulse 1.6s infinite" }} />
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#10b981" }} />
                </span>
                19 ACTIVE
              </span>
            </div>
            {AGENTS.map(a => {
              const isActive = activeAgents.has(a.name);
              const isLead = a.badge === "LEAD";
              return (
                <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", paddingLeft: isActive ? 10 : 12, background: isActive ? "#ecfdf5" : "transparent", borderLeft: isActive ? "2px solid #10b981" : "2px solid transparent", transition: "background 0.3s, border-color 0.3s, padding 0.3s" }}>
                  <div style={{ position: "relative" }}>
                    <img src={a.img} alt={a.name} style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", filter: isActive ? "none" : "saturate(0.85)" }} />
                    <div style={{ position: "absolute", bottom: -1, right: -1, width: 7, height: 7, borderRadius: "50%", background: isActive ? "#10b981" : "#cbd5e1", border: "1.5px solid white", transition: "background 0.3s" }} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>{a.name}</span>
                      <span style={{ fontSize: 7.5, fontWeight: 700, color: isLead ? "#059669" : "#64748b", background: isLead ? "#ecfdf5" : "#f1f5f9", border: `1px solid ${isLead ? "#a7f3d0" : "#e2e8f0"}`, padding: "0 4px", borderRadius: 2, fontFamily: "ui-monospace, SFMono-Regular, monospace", letterSpacing: 0.4 }}>{a.badge}</span>
                    </div>
                    <div style={{ fontSize: 9.5, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.role}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER KANBAN */}
          <div className="Trooper-kanban" style={{ flex: 1, overflow: "hidden", padding: "10px 12px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 8, flex: 1, overflow: "hidden" }}>
              {["inbox", "assigned", "progress", "review"].map(k => (
                <KanbanColumn key={k} colKey={k as keyof typeof COL_META} tasks={cols[k as keyof typeof COL_META]} />
              ))}
            </div>
          </div>

          {/* RIGHT CHAT */}
          <div className="Trooper-chat" style={{ width: 300, minWidth: 300, borderLeft: "1px solid #e5e7eb", background: "white", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid #e2e8f0", gap: 18, paddingLeft: 14, paddingRight: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "10px 0 8px", borderBottom: "2px solid #10b981", marginBottom: -1, fontSize: 10, fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.7, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
                <MessageCircle size={11} strokeWidth={2.25} color="#10b981" /> Team Chat
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "10px 0 8px", fontSize: 10, fontWeight: 600, color: "#94a3b8", cursor: "pointer", textTransform: "uppercase", letterSpacing: 0.7, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
                <Activity size={11} strokeWidth={1.5} /> Activity
              </span>
            </div>

            <div style={{ padding: "6px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 9, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, fontFamily: "ui-monospace, SFMono-Regular, monospace", background: "#f8fafc" }}>
              Type <AtSign size={9} strokeWidth={2.5} /> to mention
            </div>

            {mentionTab && (
              <div style={{ padding: "5px 14px", borderBottom: "1px solid #f0f0f0", background: "#fafafa", fontSize: 11, color: "#737373", display: "flex", alignItems: "center", gap: 5, animation: "fadeIn 0.25s ease both" }}>
                <Av name="Vaibhav" size={16} border={false} />
                <span style={{ color: "#a3a3a3" }}>{mentionTab}</span>
              </div>
            )}

            <div ref={chatRef} className="Trooper-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: 12, animation: "fadeIn 0.3s ease both" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <Av name={msg.sender} size={22} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{msg.sender}</span>
                    <span style={{ fontSize: 8, fontWeight: 700, color: msg.isHuman ? "#475569" : "#059669", background: msg.isHuman ? "#f1f5f9" : "#ecfdf5", border: `1px solid ${msg.isHuman ? "#e2e8f0" : "#a7f3d0"}`, padding: "0 4px", borderRadius: 2, fontFamily: "ui-monospace, SFMono-Regular, monospace", letterSpacing: 0.4, textTransform: "uppercase" }}>
                      {msg.isHuman ? "Human" : "Agent"}
                    </span>
                    <span style={{ fontSize: 10, color: "#94a3b8" }}>{msg.role}</span>
                    <span style={{ fontSize: 9, color: "#cbd5e1", marginLeft: "auto", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>{msg.time}</span>
                  </div>
                  <div style={{ marginLeft: 28, fontSize: 12, lineHeight: 1.55, color: "#334155" }}>
                    {msg.text.split(/(@\w+)/g).map((part: string, j: number) =>
                      part.startsWith("@") ? <span key={j} style={{ color: "#059669", fontWeight: 600, background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "0 4px", borderRadius: 2, fontSize: 11.5 }}>{part}</span> : <span key={j}>{part}</span>
                    )}
                  </div>
                  {msg.reaction && (
                    <div style={{ marginLeft: 28, marginTop: 5 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, background: "white", border: "1px solid #e2e8f0", padding: "1px 7px", borderRadius: 2 }}>
                        <span>{msg.reaction.emoji}</span>
                        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: 10, color: "#64748b", fontWeight: 600 }}>{msg.reaction.count}</span>
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {nickTyping && <TypingIndicator name="Nick" />}
            </div>

            {/* Input */}
            <div style={{ padding: "8px 12px", borderTop: "1px solid #e2e8f0", background: "white" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0", padding: "8px 10px" }}>
                <div style={{ flex: 1, fontSize: 12, color: inputText ? "#0f172a" : "#94a3b8", minHeight: 16, fontWeight: inputText ? 500 : 400, lineHeight: 1.4, wordBreak: "break-word" }}>
                  {inputText ? (
                    <>
                      {inputText.split(/(@\w+)/g).map((part, i) =>
                        part.startsWith("@") ? <span key={i} style={{ color: "#059669", fontWeight: 600, background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "0 3px", borderRadius: 2 }}>{part}</span> : <span key={i}>{part}</span>
                      )}
                      <span style={{ display: "inline-block", width: 1.5, height: 14, background: "#0f172a", marginLeft: 0.5, verticalAlign: "text-bottom", animation: "blink 1s infinite" }} />
                    </>
                  ) : "Message as Vaibhav..."}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <Paperclip size={13} strokeWidth={1.5} color="#cbd5e1" />
                  <Smile size={13} strokeWidth={1.5} color="#cbd5e1" />
                  <div style={{ width: 26, height: 26, borderRadius: 2, background: inputText ? "#10b981" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                    <Send size={12} strokeWidth={2} color={inputText ? "white" : "#94a3b8"} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Av name="Vaibhav" size={14} border={false} />
                  <span style={{ fontSize: 9, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
                    Chatting as <span style={{ color: "#475569" }}>Vaibhav</span>
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Hash size={10} strokeWidth={1.5} color="#cbd5e1" />
                  <span style={{ fontSize: 9, color: "#cbd5e1", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>Press @ to mention</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
