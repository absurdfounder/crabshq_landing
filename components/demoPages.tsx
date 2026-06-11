'use client';

import {
  Home, ListTodo, Target, Laptop, Brain, Users, Zap, ChevronRight,
  Wifi, FileText, Clock, Shapes, Settings, HardDrive,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { TROOPER_DEMO as C } from './demoTheme';

const AGENTS = [
  { name: 'Jordan', role: 'Chief of Staff', badge: 'LEAD', img: 'https://i.pravatar.cc/150?u=agent-jordan', emoji: '⚡' },
  { name: 'Aria', role: 'Growth & Marketing', badge: 'MEMBER', img: 'https://i.pravatar.cc/150?u=agent-aria', emoji: '📣' },
  { name: 'Leo', role: 'Operations & Finance', badge: 'MEMBER', img: 'https://i.pravatar.cc/150?u=agent-leo', emoji: '📊' },
  { name: 'Ren', role: 'Product Builder', badge: 'MEMBER', img: 'https://i.pravatar.cc/150?u=agent-ren', emoji: '🛠️' },
];

function Av({ src, size = 32 }: { src: string; size?: number }) {
  return <img src={src} alt="" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />;
}

function PageShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: C.card }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
        {subtitle ? <p style={{ fontSize: 13, color: C.textMuted, margin: '6px 0 0' }}>{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 500, color: C.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>{children}</div>;
}

export function DemoHomePage() {
  return (
    <PageShell title="Good afternoon, Vaibhav" subtitle="Wonder · 4 agents active · 6 tasks in flight">
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.cardWarm, padding: 16 }}>
          <SectionLabel>Needs attention</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📝</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Design landing page mockup</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Ren · waiting for human review</div>
            </div>
            <span style={{ fontSize: 11, color: C.textSubtle }}>2m ago</span>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <SectionLabel>Running tasks</SectionLabel>
            <span style={{ fontSize: 11, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 2 }}>View all <ChevronRight size={12} /></span>
          </div>
          <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden', background: C.card }}>
            {['SEO Optimization for Wonder', 'Update Website with New Game Releases', 'Develop Social Media Strategy'].map((t, i) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderTop: i ? `1px solid ${C.borderWarm}` : undefined }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.brand, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: C.text }}>{t}</span>
                <span style={{ fontSize: 11, color: C.textSubtle }}>In progress</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>Team</SectionLabel>
          <div style={{ display: 'flex', gap: 10 }}>
            {AGENTS.map(a => (
              <div key={a.name} style={{ flex: 1, minWidth: 0, borderRadius: 14, border: `1px solid ${C.border}`, padding: 12, background: C.card }}>
                <Av src={a.img} size={36} />
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 8 }}>{a.name}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{a.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function DemoAgentsPage() {
  return (
    <PageShell title="Agents" subtitle="Your AI workforce — leads, specialists, and personal agents">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {AGENTS.map(a => (
          <div key={a.name} style={{ borderRadius: 16, border: `1px solid ${C.border}`, padding: 14, background: C.card, boxShadow: '0 1px 2px rgba(28,25,23,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Av src={a.img} size={40} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{a.name}</div>
                {a.badge === 'LEAD' ? (
                  <span style={{ fontSize: 9, fontWeight: 600, background: C.brandLight, padding: '2px 6px', borderRadius: 4 }}>Manager</span>
                ) : null}
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{a.role}</div>
            <div style={{ marginTop: 10, fontSize: 11, color: C.brand, fontWeight: 600 }}>● Active</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function DemoGoalsPage() {
  const goals = [
    { title: 'Launch Wonder on Product Hunt', progress: 72, owner: 'Jordan' },
    { title: 'Hit 10k monthly visitors', progress: 45, owner: 'Aria' },
    { title: 'Ship v2 onboarding', progress: 28, owner: 'Ren' },
  ];
  return (
    <PageShell title="Goals" subtitle="North-star outcomes your agents work toward">
      <div style={{ display: 'grid', gap: 10 }}>
        {goals.map(g => (
          <div key={g.title} style={{ borderRadius: 14, border: `1px solid ${C.border}`, padding: 14, background: C.card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{g.title}</span>
              <span style={{ fontSize: 12, color: C.textMuted }}>{g.owner}</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: C.bg, overflow: 'hidden' }}>
              <div style={{ width: `${g.progress}%`, height: '100%', background: C.brand, borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 11, color: C.textSubtle, marginTop: 6 }}>{g.progress}% complete</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function DemoDevicesPage() {
  const devices = [
    { name: 'Vaibhav MacBook Pro', status: 'Online', icon: Laptop },
    { name: 'Wonder Server', status: 'Online', icon: HardDrive },
  ];
  return (
    <PageShell title="Devices" subtitle="Machines your agents can control">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {devices.map(d => {
          const Icon = d.icon;
          return (
            <div key={d.name} style={{ borderRadius: 14, border: `1px solid ${C.border}`, padding: 14, background: C.card, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} strokeWidth={1.5} color={C.textMuted} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{d.name}</div>
                <div style={{ fontSize: 11, color: C.brand, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <Wifi size={11} /> {d.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

export function DemoMemoryPage() {
  const items = [
    { title: 'Wonder launch playbook', detail: 'Jordan saved launch checklist from last 3 releases' },
    { title: 'Brand voice', detail: 'Friendly, direct, no corporate jargon' },
    { title: 'Vaibhav preferences', detail: 'Approve design tasks; auto-assign SEO to Aria' },
  ];
  return (
    <PageShell title="Memory" subtitle="What your agents remember about your company">
      <div style={{ display: 'grid', gap: 8 }}>
        {items.map(m => (
          <div key={m.title} style={{ borderRadius: 12, border: `1px solid ${C.border}`, padding: '12px 14px', background: C.card }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Brain size={14} strokeWidth={1.5} color={C.textMuted} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{m.title}</span>
            </div>
            <p style={{ fontSize: 12, color: C.textMuted, margin: 0, paddingLeft: 22 }}>{m.detail}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function DemoSkillsPage() {
  const skills = ['Web browsing', 'GitHub commits', 'Email outreach', 'SEO research', 'Notion sync', 'Slack posting'];
  return (
    <PageShell title="Skills & Plugins" subtitle="Capabilities installed in your workspace">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
        {skills.map(s => (
          <div key={s} style={{ borderRadius: 12, border: `1px solid ${C.border}`, padding: 12, background: C.card, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shapes size={16} strokeWidth={1.5} color={C.brand} />
            <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{s}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function DemoSettingsPage() {
  const sections = ['Workspace', 'Billing', 'Team members', 'Channels', 'Models', 'Integrations', 'Security'];
  return (
    <PageShell title="Settings" subtitle="Configure your Trooper workspace">
      <div style={{ maxWidth: 480, borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden', background: C.card }}>
        {sections.map((s, i) => (
          <div key={s} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px',
            borderTop: i ? `1px solid ${C.borderWarm}` : undefined, fontSize: 13, fontWeight: 500, color: C.text,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Settings size={14} strokeWidth={1.5} color={C.textMuted} />
              {s}
            </span>
            <ChevronRight size={14} color={C.textSubtle} />
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function DemoFilesPage() {
  const files = ['launch-plan.md', 'hero-mockup.png', 'seo-keywords.csv', 'brand-guide.pdf'];
  return (
    <PageShell title="Files" subtitle="Workspace deliverables and artifacts">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {files.map(f => (
          <div key={f} style={{ borderRadius: 12, border: `1px solid ${C.border}`, padding: 12, background: C.card, textAlign: 'center' }}>
            <FileText size={24} strokeWidth={1.25} color={C.textMuted} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 11, fontWeight: 500, color: C.text, wordBreak: 'break-all' }}>{f}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function DemoRoutinesPage() {
  const routines = [
    { name: 'Daily standup digest', schedule: 'Weekdays 9:00 AM', agent: 'Jordan' },
    { name: 'Weekly SEO report', schedule: 'Mondays 8:00 AM', agent: 'Aria' },
  ];
  return (
    <PageShell title="Routines" subtitle="Scheduled automations for your agents">
      <div style={{ display: 'grid', gap: 10 }}>
        {routines.map(r => (
          <div key={r.name} style={{ borderRadius: 14, border: `1px solid ${C.border}`, padding: 14, background: C.card, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} strokeWidth={1.5} color={C.textMuted} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{r.schedule} · {r.agent}</div>
            </div>
            <Zap size={14} color={C.brand} />
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function DemoPlaceholderPage({ pageId }: { pageId: string }) {
  const labels: Record<string, { title: string; icon: typeof Home }> = {
    home: { title: 'Home', icon: Home },
    tasks: { title: 'Tasks', icon: ListTodo },
    goals: { title: 'Goals', icon: Target },
    routines: { title: 'Routines', icon: Clock },
    files: { title: 'Files', icon: HardDrive },
    agents: { title: 'Agents', icon: Users },
    devices: { title: 'Devices', icon: Laptop },
    memory: { title: 'Memory', icon: Brain },
    skills: { title: 'Skills & Plugins', icon: Shapes },
    settings: { title: 'Settings', icon: Settings },
  };
  const meta = labels[pageId] || { title: pageId, icon: Home };
  const Icon = meta.icon;
  return (
    <PageShell title={meta.title}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, color: C.textMuted }}>
        <Icon size={32} strokeWidth={1.25} />
        <p style={{ marginTop: 12, fontSize: 13 }}>Loading {meta.title.toLowerCase()}…</p>
      </div>
    </PageShell>
  );
}

export function DemoMainPage({ pageId }: { pageId: string }) {
  switch (pageId) {
    case 'home': return <DemoHomePage />;
    case 'agents': return <DemoAgentsPage />;
    case 'goals': return <DemoGoalsPage />;
    case 'devices': return <DemoDevicesPage />;
    case 'memory': return <DemoMemoryPage />;
    case 'skills': return <DemoSkillsPage />;
    case 'settings': return <DemoSettingsPage />;
    case 'files': return <DemoFilesPage />;
    case 'routines': return <DemoRoutinesPage />;
    default: return <DemoPlaceholderPage pageId={pageId} />;
  }
}

export { AGENTS as DEMO_AGENTS };
