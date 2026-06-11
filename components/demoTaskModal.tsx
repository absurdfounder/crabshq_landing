'use client';

import { useState } from 'react';
import {
  X, Check, Loader2, Globe, Search, FileText, GitCommit, MessageSquare, Terminal, Wrench,
  ChevronDown, ChevronUp, FileCode, Package,
} from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoModalMessage, DemoSubtask, DemoToolLog } from './demoTaskExecution';
import { getToolIconName } from './demoTaskExecution';

const ALL_PEOPLE: Record<string, { img: string }> = {
  Vaibhav: { img: 'https://avatars.githubusercontent.com/u/25829699?v=4' },
  Jordan: { img: 'https://i.pravatar.cc/150?u=agent-jordan' },
  Aria: { img: 'https://i.pravatar.cc/150?u=agent-aria' },
  Leo: { img: 'https://i.pravatar.cc/150?u=agent-leo' },
  Ren: { img: 'https://i.pravatar.cc/150?u=agent-ren' },
};

function ToolIcon({ tool }: { tool: string }) {
  const name = getToolIconName(tool);
  const props = { size: 16, strokeWidth: 1.75, color: '#44403c' };
  switch (name) {
    case 'globe': return <Globe {...props} />;
    case 'search': return <Search {...props} />;
    case 'file': return <FileText {...props} />;
    case 'git': return <GitCommit {...props} />;
    case 'message': return <MessageSquare {...props} />;
    case 'terminal': return <Terminal {...props} />;
    default: return <Wrench {...props} />;
  }
}

function Av({ name, size = 24 }: { name: string; size?: number }) {
  const src = ALL_PEOPLE[name]?.img || `https://i.pravatar.cc/150?u=${name}`;
  return <img src={src} alt="" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />;
}

function SubtaskRow({ subtask }: { subtask: DemoSubtask }) {
  const done = subtask.status === 'done';
  const running = subtask.status === 'running';
  return (
    <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${C.borderWarm}`, alignItems: 'flex-start' }}>
      <div style={{
        width: 18, height: 18, borderRadius: 4, marginTop: 2, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: done ? C.brand : running ? '#FFFBEB' : C.card,
        border: done ? 'none' : running ? '1px solid #FDE68A' : `1px solid ${C.border}`,
        color: done ? 'white' : running ? '#B45309' : 'transparent',
      }}>
        {done ? <Check size={11} strokeWidth={3} /> : running ? <Loader2 size={11} strokeWidth={2.5} className="demo-spin" /> : null}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: done ? 500 : 600, color: done ? C.textMuted : C.text, textDecoration: done ? 'line-through' : 'none' }}>
          {subtask.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Av name={subtask.agent} size={16} />
          <span style={{ fontSize: 11, color: C.textSubtle }}>{subtask.agent}</span>
          {running && <span style={{ fontSize: 10, fontWeight: 600, color: '#B45309', background: '#FFFBEB', padding: '1px 6px', borderRadius: 4 }}>Running</span>}
          {done && <span style={{ fontSize: 10, fontWeight: 600, color: C.brand }}>Done</span>}
        </div>
      </div>
    </div>
  );
}

function ToolLogRow({ log }: { log: DemoToolLog }) {
  const running = log.status === 'running';
  return (
    <div style={{ animation: 'fadeIn 0.25s ease both', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.bg, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ToolIcon tool={log.tool} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{log.label}</span>
            {running ? <Loader2 size={12} strokeWidth={2.5} className="demo-spin" color={C.brand} /> : <Check size={12} strokeWidth={2.5} color={C.brand} />}
          </div>
          {log.detail && (
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: 'ui-monospace, monospace', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {log.detail}
            </div>
          )}
        </div>
        <Av name={log.agent} size={20} />
      </div>
    </div>
  );
}

function CoordinationMessage({ msg }: { msg: DemoModalMessage }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 10, animation: 'fadeIn 0.25s ease both' }}>
      <Av name={msg.sender} size={22} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{msg.sender}</span>
          <span style={{ fontSize: 10, color: C.textSubtle }}>{msg.time}</span>
        </div>
        <p style={{ fontSize: 12, lineHeight: 1.5, color: C.textMuted, margin: 0 }}>{msg.text}</p>
      </div>
    </div>
  );
}

export function DemoTaskModal({
  open,
  taskTitle,
  assignee,
  subtasks,
  toolLogs,
  messages,
  delivery,
  statusCol,
  onClose,
}: {
  open: boolean;
  taskTitle: string;
  assignee: string;
  subtasks: DemoSubtask[];
  toolLogs: DemoToolLog[];
  messages: DemoModalMessage[];
  delivery: string | null;
  statusCol?: 'in_progress' | 'review' | 'done';
  onClose?: () => void;
}) {
  const [checklistOpen, setChecklistOpen] = useState(true);
  const doneCount = subtasks.filter(s => s.status === 'done').length;
  const statusLabel = statusCol === 'review' ? 'Human review' : statusCol === 'done' ? 'Completed' : 'In progress';
  const statusBg = statusCol === 'review' ? '#FFFBEB' : statusCol === 'done' ? '#ECFDF5' : '#FFFBEB';
  const statusColor = statusCol === 'review' ? '#78350F' : statusCol === 'done' ? '#065F46' : '#B45309';

  if (!open) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(28,25,23,0.35)', backdropFilter: 'blur(2px)', padding: 16,
    }}>
      <div style={{
        width: '100%', maxWidth: 780, maxHeight: '92%', display: 'flex', flexDirection: 'column',
        borderRadius: 14, border: `1px solid ${C.border}`, background: C.card,
        boxShadow: '0 24px 48px -12px rgba(28,25,23,0.25)',
        animation: 'cardIn 0.35s ease both',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, background: statusBg, padding: '2px 8px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                {statusLabel}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, background: C.bg, padding: '2px 8px', borderRadius: 999 }}>seo · visibility</span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.3 }}>{taskTitle}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <Av name={assignee} size={22} />
              <span style={{ fontSize: 12, color: C.textMuted }}>Assigned to <strong style={{ color: C.text }}>{assignee}</strong> · coordinated by Jordan</span>
            </div>
          </div>
          <button type="button" onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMuted }}>
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* Checklist */}
          <div style={{ width: '42%', minWidth: 0, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', background: C.cardWarm }}>
            <button type="button" onClick={() => setChecklistOpen(v => !v)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px',
              border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: `1px solid ${C.borderWarm}`,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Checklist ({doneCount}/{subtasks.length})
              </span>
              {checklistOpen ? <ChevronUp size={14} color={C.textSubtle} /> : <ChevronDown size={14} color={C.textSubtle} />}
            </button>
            {checklistOpen && (
              <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '4px 14px 12px' }}>
                {subtasks.map(s => <SubtaskRow key={s.id} subtask={s} />)}
              </div>
            )}
            {delivery && (
              <div style={{ padding: 12, borderTop: `1px solid ${C.borderWarm}`, background: '#ECFDF5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Package size={14} strokeWidth={1.75} color={C.brand} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#065F46', textTransform: 'uppercase', letterSpacing: 0.4 }}>Delivered</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 10, background: C.card, border: `1px solid ${C.brandSoft}` }}>
                  <FileCode size={16} strokeWidth={1.75} color={C.brand} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{delivery}</span>
                </div>
              </div>
            )}
          </div>

          {/* Activity / run log */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${C.borderWarm}`, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Activity & run log
            </div>
            <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>
              {messages.map(m => <CoordinationMessage key={m.id} msg={m} />)}
              {toolLogs.length > 0 && (
                <div style={{ marginTop: messages.length ? 8 : 0, paddingTop: messages.length ? 8 : 0, borderTop: messages.length ? `1px solid ${C.borderWarm}` : undefined }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.textSubtle, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>Tool calls</div>
                  {toolLogs.map(log => <ToolLogRow key={log.id} log={log} />)}
                </div>
              )}
              {toolLogs.length === 0 && messages.length === 0 && (
                <p style={{ fontSize: 12, color: C.textSubtle, textAlign: 'center', padding: 24 }}>Agents coordinating…</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
