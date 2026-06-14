'use client';

import {
  Laptop, Brain, Users, ChevronRight, ChevronDown,
  Wifi, FileText, Clock, Shapes, HardDrive, Plus, Search, RefreshCw,
  LayoutGrid, List, Folder, Upload, ArrowUp, Mic,
  User, CreditCard, Plug, Bot, KeyRound, Server, Link2,
  Monitor, Shield, Trash2, History,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { TROOPER_DEMO as C } from './demoTheme';
import { getFaviconUrl } from '@/lib/favicon';

/* ─── Shared tokens (mirrors Trooper index.css + PageLayout) ─── */
const card: CSSProperties = {
  borderRadius: 16, border: '1px solid #F5F5F4', background: C.card,
  boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
};
const listCard: CSSProperties = {
  borderRadius: 16, border: '1px solid #F5F5F4', background: C.card, overflow: 'hidden',
};
const sectionLabel: CSSProperties = { fontSize: 12, fontWeight: 500, color: '#a3a3a3' };

export const DEMO_AGENTS = [
  { name: 'Jordan', role: 'Chief of Staff', badge: 'LEAD', img: 'https://i.pravatar.cc/150?u=agent-jordan' },
  { name: 'Aria', role: 'Growth & Marketing', badge: 'MEMBER', img: 'https://i.pravatar.cc/150?u=agent-aria' },
  { name: 'Leo', role: 'Operations & Finance', badge: 'MEMBER', img: 'https://i.pravatar.cc/150?u=agent-leo' },
  { name: 'Ren', role: 'Product Builder', badge: 'MEMBER', img: 'https://i.pravatar.cc/150?u=agent-ren' },
];

function Av({ src, size = 32 }: { src: string; size?: number }) {
  return <img src={src} alt="" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />;
}

function DemoPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="Trooper-scrollbar" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.card }}>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '12px 12px 24px', maxWidth: 1024, margin: '0 auto', width: '100%' }}>
        <div style={{ padding: '0 8px' }}>{children}</div>
      </div>
    </div>
  );
}

function DemoPageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16, paddingBottom: 12 }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: C.text, margin: 0, letterSpacing: '-0.02em', fontFamily: 'Manrope, Inter, sans-serif' }}>{title}</h1>
        {description && <p style={{ fontSize: 13, color: C.textMuted, margin: '4px 0 0', lineHeight: 1.5 }}>{description}</p>}
      </div>
      {actions && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>{actions}</div>}
    </div>
  );
}

function SectionHead({ label, action }: { label: string; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <span style={sectionLabel}>{label}</span>
      {action && (
        <span style={{ fontSize: 12, color: '#a3a3a3', display: 'flex', alignItems: 'center', gap: 2 }}>
          {action} <ChevronRight size={12} />
        </span>
      )}
    </div>
  );
}

function Btn({ children, primary, outline, icon: Icon }: { children: ReactNode; primary?: boolean; outline?: boolean; icon?: typeof Plus }) {
  return (
    <button type="button" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px',
      borderRadius: 8, border: outline ? `1px solid ${C.border}` : 'none',
      background: primary ? C.brand : outline ? C.card : C.text,
      color: primary ? 'white' : outline ? C.text : 'white',
      fontSize: 12, fontWeight: 500, cursor: 'default',
      boxShadow: outline ? '0 1px 2px rgba(28,25,23,0.04)' : undefined,
    }}>
      {Icon && <Icon size={14} strokeWidth={1.75} />}
      {children}
    </button>
  );
}

function StatsStrip({ items }: { items: { label: string; value: string | number; accent?: string }[] }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16,
      borderRadius: 12, border: '1px solid rgba(231,229,228,0.9)', background: C.card,
      padding: '10px 14px', fontSize: 12, color: C.textMuted, marginBottom: 16,
      boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
    }}>
      {items.map((item, i) => (
        <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {i > 0 && <span style={{ width: 1, height: 12, background: C.border }} />}
          <span>{item.label} <strong style={{ color: item.accent || C.text, fontWeight: 600 }}>{item.value}</strong></span>
        </span>
      ))}
    </div>
  );
}

function TabPills({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <div style={{ display: 'inline-flex', borderRadius: 16, border: `1px solid ${C.border}`, background: C.card, padding: 4, marginBottom: 16, boxShadow: '0 1px 2px rgba(28,25,23,0.04)' }}>
      {tabs.map(t => (
        <span key={t} style={{
          padding: '6px 14px', borderRadius: 12, fontSize: 13, fontWeight: 500,
          background: active === t ? '#1c1917' : 'transparent',
          color: active === t ? 'white' : C.textMuted,
        }}>
          {t}
        </span>
      ))}
    </div>
  );
}

/* ─── Home (centered composer shell — HomePage.jsx) ─── */
export function DemoHomePage() {
  return (
    <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: 'auto', background: C.card }}>
      <div style={{ maxWidth: 672, margin: '0 auto', padding: '28px 20px 32px' }}>
        {/* Hero header */}
        <header style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            {DEMO_AGENTS.map((a, i) => (
              <div key={a.name} style={{ marginLeft: i > 0 ? -8 : 0, border: `2px solid ${C.card}`, borderRadius: '50%' }}>
                <Av src={a.img} size={i === 0 ? 40 : 36} />
              </div>
            ))}
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: '#0a0a0a', margin: 0, letterSpacing: '-0.02em' }}>How can we help you today?</h1>
          <p style={{ fontSize: 14, color: '#a3a3a3', marginTop: 12, lineHeight: 1.5 }}>
            Good afternoon, <span style={{ color: C.textMuted }}>Vaibhav</span>
            <span style={{ color: '#d4d4d4' }}> · </span>
            <span style={{ color: C.textMuted }}>4 team members ready</span>
          </p>
        </header>

        {/* Composer */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.card, boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ minHeight: 52, padding: '12px 14px', fontSize: 14, color: C.textSubtle }}>Do anything with AI…</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px 8px', borderTop: `1px solid ${C.borderWarm}` }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={14} color={C.textSubtle} /></div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 8px', borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 11, color: C.textMuted }}>
                  <img src="/images/trooper-logomark.png" alt="" style={{ width: 14, height: 14, imageRendering: 'pixelated' }} /> Trooper Auto
                </span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textSubtle }}><Mic size={14} /></div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(28,25,23,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowUp size={14} color={C.textSubtle} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Needs attention */}
        <section style={{ marginBottom: 28 }}>
          <SectionHead label="Needs attention" action="View all" />
          <div style={listCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>Design landing page mockup</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 6px', borderRadius: 4, background: '#FEF3C7', color: '#B45309' }}>Human Review</span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>Ren</span>
                </div>
              </div>
              <span style={{ fontSize: 12, color: '#a3a3a3' }}>2m ago</span>
            </div>
          </div>
        </section>

        {/* Activity tabs */}
        <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid #F5F5F4`, marginBottom: 24 }}>
          {['Activity', 'Recommendations (2)'].map((t, i) => (
            <span key={t} style={{
              padding: '8px 12px', fontSize: 13, fontWeight: 500,
              borderBottom: i === 0 ? '2px solid #171717' : '2px solid transparent',
              color: i === 0 ? '#171717' : '#a3a3a3', marginBottom: -1,
            }}>{t}</span>
          ))}
        </div>

        {/* Running tasks */}
        <section style={{ marginBottom: 28 }}>
          <SectionHead label="Running tasks" action="View all" />
          <div style={listCard}>
            {['SEO Optimization for Wonder', 'Update Website with New Game Releases', 'Develop Social Media Strategy'].map((t, i) => (
              <div key={t} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                borderTop: i ? '1px solid #F5F5F4' : undefined,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.brand, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{t}</div>
                  <div style={{ fontSize: 11, color: '#a3a3a3', marginTop: 2 }}>Aria · In progress</div>
                </div>
                <ChevronRight size={14} color="#d4d4d4" />
              </div>
            ))}
          </div>
        </section>

        {/* Devices */}
        <section style={{ marginBottom: 28 }}>
          <SectionHead label="Devices" action="View all" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {[{ name: 'Vaibhav MacBook Pro', online: true }, { name: 'Wonder Cloud', online: true }].map(d => (
              <div key={d.name} style={{ ...card, padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F5F5F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Laptop size={16} color={C.textMuted} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: '#3f6b00', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Wifi size={11} /> Online
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ─── Agents ─── */
export function DemoAgentsPage() {
  return (
    <DemoPageLayout>
      <DemoPageHeader
        title="Agents"
        description="Manage your org team, hire individual agents, and onboard whole teams from the team library."
        actions={<><Btn outline icon={Users}>Manage team</Btn><Btn primary icon={Plus}>Agent</Btn></>}
      />
      <TabPills tabs={['My Org', 'Hire Employees', 'Hire Teams']} active="My Org" />

      <section style={{ borderRadius: 24, border: `1px solid ${C.border}`, background: C.card, overflow: 'hidden', boxShadow: '0 1px 3px rgba(28,25,23,0.06)' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, background: 'linear-gradient(to bottom, white, #FAFAF9)' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.textMuted, margin: 0 }}>Organization</p>
          <p style={{ fontSize: 13, color: C.textMuted, margin: '4px 0 10px' }}>Reporting structure by team.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['1 human', '1 manager', '3 specialists', '1 team'].map(p => (
              <span key={p} style={{ fontSize: 12, fontWeight: 500, padding: '4px 12px', borderRadius: 999, border: `1px solid ${C.border}`, background: C.card, color: C.textMuted }}>{p}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: '32px 24px 40px', background: 'rgba(250,250,249,0.2)', minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Org chart mock */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <OrgNode name="Vaibhav" role="Founder" img="https://avatars.githubusercontent.com/u/25829699?v=4" human />
            <div style={{ width: 1, height: 24, background: C.border }} />
            <OrgNode name="Jordan" role="Chief of Staff" img={DEMO_AGENTS[0].img} lead />
            <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 1, height: 20, background: C.border }} />
                <OrgNode name="Aria" role="Growth" img={DEMO_AGENTS[1].img} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 1, height: 20, background: C.border }} />
                <OrgNode name="Ren" role="Product" img={DEMO_AGENTS[3].img} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 1, height: 20, background: C.border }} />
                <OrgNode name="Leo" role="Ops" img={DEMO_AGENTS[2].img} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </DemoPageLayout>
  );
}

function OrgNode({ name, role, img, human, lead }: { name: string; role: string; img: string; human?: boolean; lead?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <Av src={img} size={human ? 44 : 40} />
      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{name}</span>
      <span style={{ fontSize: 11, color: C.textMuted }}>{role}</span>
      {lead && <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: '#FEF3C7', color: '#B45309' }}>Manager</span>}
      {human && <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: C.bg, color: C.textMuted }}>Human</span>}
    </div>
  );
}

/* ─── Goals ─── */
export function DemoGoalsPage() {
  const goals = [
    { title: 'Launch Wonder on Product Hunt', status: 'Active', priority: 'High', progress: 72, tasks: 6 },
    { title: 'Hit 10k monthly visitors', status: 'Active', priority: 'Medium', progress: 45, tasks: 4 },
    { title: 'Ship v2 onboarding', status: 'Planned', priority: 'Low', progress: 12, tasks: 3 },
  ];
  return (
    <DemoPageLayout>
      <DemoPageHeader title="Goals" description="North-star outcomes your agents work toward." actions={<Btn primary icon={Plus}>New goal</Btn>} />
      <StatsStrip items={[{ label: 'Active', value: 2, accent: '#3f6b00' }, { label: 'Achieved', value: 1 }, { label: 'Total', value: 3 }]} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['All', 'Active', 'Achieved'].map((f, i) => (
          <span key={f} style={{
            fontSize: 12, fontWeight: 500, padding: '6px 12px', borderRadius: 999,
            background: i === 1 ? C.brand : '#F5F5F4', color: i === 1 ? 'white' : C.textMuted,
          }}>{f}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {goals.map(g => (
          <div key={g.title} style={{ ...card, padding: 16 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: g.status === 'Active' ? '#f0f5e6' : '#F5F5F4', color: g.status === 'Active' ? '#325600' : C.textMuted, textTransform: 'uppercase' }}>{g.status}</span>
              <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 999, background: '#F5F5F4', color: C.textMuted }}>{g.priority}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 10 }}>{g.title}</div>
            <div style={{ height: 4, borderRadius: 999, background: C.bg, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ width: `${g.progress}%`, height: '100%', background: C.brand, borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 11, color: C.textSubtle }}>{g.progress}% · {g.tasks} linked tasks</div>
          </div>
        ))}
      </div>
    </DemoPageLayout>
  );
}

/* ─── Devices ─── */
export function DemoDevicesPage() {
  const devices = [
    { name: 'Wonder Cloud Computer', kind: 'Cloud', status: 'Online', specs: '4 vCPU · 8 GB RAM' },
    { name: 'Vaibhav MacBook Pro', kind: 'Device', status: 'Online', specs: 'darwin · arm64' },
  ];
  return (
    <DemoPageLayout>
      <DemoPageHeader
        title="Devices"
        description="Cloud computer and connected devices in this workspace."
        actions={<><button type="button" style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RefreshCw size={16} color={C.textSubtle} /></button><Btn primary icon={Plus}>Add device</Btn></>}
      />
      <StatsStrip items={[{ label: 'Total', value: 2 }, { label: 'Online', value: 2, accent: '#325600' }]} />

      {/* Cloud computer card */}
      <div style={{ ...card, padding: 16, marginBottom: 16, border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0f5e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HardDrive size={20} color={C.brand} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Cloud Computer</div>
            <div style={{ fontSize: 12, color: '#3f6b00', marginTop: 2 }}>Running · VPS</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: '#f0f5e6', color: '#325600', border: '1px solid #c4d9a0' }}>Online</span>
        </div>
      </div>

      <div style={{ ...listCard, border: '1px solid rgba(231,229,228,0.9)' }}>
        {devices.map((d, i) => (
          <div key={d.name} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            borderTop: i ? `1px solid ${C.borderWarm}` : undefined, cursor: 'default',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F5F5F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Laptop size={18} color={C.textMuted} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.textSubtle, marginTop: 2 }}>{d.specs}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: '#f0f5e6', color: '#325600' }}>{d.status}</span>
            <ChevronDown size={14} color={C.textSubtle} />
          </div>
        ))}
      </div>
    </DemoPageLayout>
  );
}

/* ─── Memory ─── */
export function DemoMemoryPage() {
  const tabs = ['Adaptive Memory', 'Layers', 'Knowledge Graph', 'SOPs'];
  const memories = [
    { title: 'Wonder launch playbook', category: 'Operations', updated: '2d ago' },
    { title: 'Brand voice guidelines', category: 'Marketing', updated: '1w ago' },
    { title: 'Vaibhav approval preferences', category: 'Personal', updated: '3d ago' },
    { title: 'SEO keyword clusters', category: 'Research', updated: '5h ago' },
  ];
  return (
    <DemoPageLayout>
      <DemoPageHeader title="Memory" description="What your agents remember about your company and how they use it." />
      <div style={{ borderRadius: 16, border: `1px solid rgba(231,229,228,0.7)`, background: C.card, overflow: 'hidden', boxShadow: '0 1px 2px rgba(28,25,23,0.04), 0 8px 24px rgba(28,25,23,0.04)' }}>
        <div style={{ display: 'flex', gap: 4, padding: '8px 10px', borderBottom: '1px solid rgba(231,229,228,0.7)', background: 'rgba(245,245,244,0.8)' }}>
          {tabs.map((t, i) => (
            <span key={t} style={{
              fontSize: 12, fontWeight: 500, padding: '6px 10px', borderRadius: 12,
              background: i === 0 ? C.card : 'transparent', color: i === 0 ? C.text : C.textMuted,
              boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.04)' : undefined,
            }}>{t}</span>
          ))}
        </div>
        <div style={{ padding: '12px 16px 16px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Btn outline icon={RefreshCw}>Sync memories</Btn>
            <Btn primary icon={Plus}>Add memory</Btn>
          </div>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <Search size={14} color={C.textSubtle} style={{ position: 'absolute', left: 12, top: 11 }} />
            <div style={{ height: 36, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, paddingLeft: 36, display: 'flex', alignItems: 'center', fontSize: 13, color: C.textSubtle }}>Search memories…</div>
          </div>
          <div style={listCard}>
            {memories.map((m, i) => (
              <div key={m.title} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderTop: i ? `1px solid #F5F5F4` : undefined }}>
                <Brain size={16} color={C.textSubtle} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{m.title}</div>
                  <div style={{ fontSize: 11, color: C.textSubtle }}>{m.category}</div>
                </div>
                <span style={{ fontSize: 11, color: '#a3a3a3' }}>{m.updated}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoPageLayout>
  );
}

/* ─── Skills ─── */
export function DemoSkillsPage() {
  const skills: { name: string; domain: string; connected: boolean }[] = [
    { name: 'Web browsing', domain: 'google.com', connected: true },
    { name: 'GitHub', domain: 'github.com', connected: true },
    { name: 'Gmail', domain: 'gmail.com', connected: true },
    { name: 'Notion', domain: 'notion.so', connected: false },
    { name: 'Slack', domain: 'slack.com', connected: true },
    { name: 'Product Hunt', domain: 'producthunt.com', connected: false },
  ];
  return (
    <DemoPageLayout>
      <DemoPageHeader title="Skills & Plugins" description="Capabilities and integrations installed in your workspace." actions={<Btn outline icon={RefreshCw}>Refresh</Btn>} />
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {['Plugins', 'Skills'].map((t, i) => (
          <span key={t} style={{
            fontSize: 13, fontWeight: 500, padding: '6px 14px', borderRadius: 8,
            borderBottom: i === 1 ? `2px solid ${C.text}` : '2px solid transparent',
            color: i === 1 ? C.text : C.textMuted,
          }}>{t}</span>
        ))}
      </div>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search size={14} color={C.textSubtle} style={{ position: 'absolute', left: 12, top: 11 }} />
        <div style={{ height: 36, borderRadius: 8, border: `1px solid ${C.border}`, paddingLeft: 36, display: 'flex', alignItems: 'center', fontSize: 13, color: C.textSubtle }}>Search skills…</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
        {skills.map(s => (
          <div key={s.name} style={{ ...card, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F4', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                  src={getFaviconUrl(s.domain, 64)}
                  alt=""
                  width={20}
                  height={20}
                  style={{ width: 20, height: 20, borderRadius: 4, objectFit: 'contain' }}
                />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.name}</div>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4,
              color: s.connected ? '#325600' : C.textSubtle,
            }}>{s.connected ? 'Connected' : 'Not connected'}</span>
          </div>
        ))}
      </div>
    </DemoPageLayout>
  );
}

/* ─── Settings ─── */
const SETTINGS_SECTIONS = [
  { label: 'Company', desc: 'Workspace, team policy, and business details', icon: User },
  { label: 'Billing', desc: 'Plan, usage, and invoices', icon: CreditCard },
  { label: 'AI providers', desc: 'Models and routing', icon: Plug },
  { label: 'Agent settings', desc: 'Providers, voice, channels, permissions, and mailboxes', icon: Bot },
  { label: 'Secrets', desc: 'API keys, tokens, and skill credentials', icon: KeyRound },
  { label: 'AI Server', desc: 'Status, config, and maintenance', icon: Server },
  { label: 'Channels', desc: 'Telegram, Slack, and more', icon: Link2 },
  { label: 'GitHub settings', desc: 'Repos and deployments', icon: Monitor },
  { label: 'Permissions', desc: 'Site access in the browser', icon: Shield },
  { label: 'Operations', desc: 'Tasks, cleanup, export, delete organization, and delete account', icon: Trash2 },
];

export function DemoSettingsPage() {
  return (
    <DemoPageLayout>
      <DemoPageHeader title="Settings" description="Account, billing, AI providers, server, channels, and more." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 8, border: `1px solid ${C.border}`, background: '#E7E5E4', overflow: 'hidden' }}>
        {SETTINGS_SECTIONS.map(({ label, desc, icon: Icon }) => (
          <button key={label} type="button" style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
            padding: '14px 16px', border: 'none', background: C.card, cursor: 'default',
          }}>
            <Icon size={16} strokeWidth={1.5} color={C.textMuted} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{label}</div>
              <div style={{ fontSize: 12, color: C.textSubtle, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{desc}</div>
            </div>
            <ChevronRight size={14} color={C.textSubtle} />
          </button>
        ))}
      </div>
    </DemoPageLayout>
  );
}

/* ─── Files ─── */
export function DemoFilesPage() {
  const files = [
    { name: 'launch-plan.md', type: 'file', size: '12 KB', modified: '2h ago' },
    { name: 'seo-launch-report.md', type: 'file', size: '8 KB', modified: '1h ago' },
    { name: 'hero-mockup.png', type: 'file', size: '240 KB', modified: '3d ago' },
    { name: 'brand-guide.pdf', type: 'file', size: '1.2 MB', modified: '1w ago' },
    { name: 'workspace', type: 'dir', size: '4 items', modified: '—' },
  ];
  return (
    <DemoPageLayout>
      <DemoPageHeader title="Files" description="Workspace deliverables, artifacts, and uploads." actions={<Btn primary icon={Upload}>Upload</Btn>} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={14} color={C.textSubtle} style={{ position: 'absolute', left: 12, top: 10 }} />
          <div style={{ height: 36, borderRadius: 8, border: `1px solid ${C.border}`, paddingLeft: 36, display: 'flex', alignItems: 'center', fontSize: 13, color: C.textSubtle }}>Search files…</div>
        </div>
        <div style={{ display: 'inline-flex', borderRadius: 8, border: `1px solid ${C.border}`, padding: 2 }}>
          <span style={{ padding: '4px 8px', borderRadius: 6, background: '#E7E5E4' }}><List size={14} color={C.text} /></span>
          <span style={{ padding: '4px 8px' }}><LayoutGrid size={14} color={C.textSubtle} /></span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.textMuted, padding: '8px 0', borderBottom: `1px solid ${C.borderWarm}`, marginBottom: 0 }}>
        workspace <span style={{ color: '#d4d4d4' }}>›</span> wonder-launch
      </div>
      <div style={{ borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden', background: C.card }}>
        {files.map((f, i) => {
          const Icon = f.type === 'dir' ? Folder : FileText;
          return (
            <div key={f.name} style={{
              display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, padding: '10px 16px',
              borderTop: i ? `1px solid ${C.borderWarm}` : undefined,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: f.type === 'dir' ? '#F5F3FF' : '#F5F5F4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={16} color={f.type === 'dir' ? '#7C3AED' : C.textMuted} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{f.name}</div>
                <div style={{ fontSize: 11, color: C.textSubtle }}>{f.size}</div>
              </div>
              <span style={{ fontSize: 11, color: '#a3a3a3' }}>{f.modified}</span>
            </div>
          );
        })}
      </div>
    </DemoPageLayout>
  );
}

/* ─── Routines ─── */
export function DemoRoutinesPage() {
  const routines = [
    { name: 'Daily standup digest', schedule: 'Weekdays 9:00 AM', agent: 'Jordan', status: 'Active', lastRun: 'Today 9:00' },
    { name: 'Weekly SEO report', schedule: 'Mondays 8:00 AM', agent: 'Aria', status: 'Active', lastRun: 'Mon 8:00' },
    { name: 'Invoice reconciliation', schedule: '1st of month', agent: 'Leo', status: 'Paused', lastRun: 'Mar 1' },
  ];
  return (
    <DemoPageLayout>
      <DemoPageHeader
        title="Routines"
        description="Scheduled runs for your workspace — cron jobs, reports, and recurring agent work."
        actions={<><Btn outline icon={History}>History</Btn><Btn primary icon={Plus}>New automation</Btn></>}
      />
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {['Routines (3)', 'Run History'].map((t, i) => (
          <span key={t} style={{
            fontSize: 13, fontWeight: 500, padding: '6px 12px', borderRadius: 8,
            background: i === 0 ? '#F5F5F4' : 'transparent', color: i === 0 ? C.text : C.textMuted,
            border: i === 0 ? `1px solid ${C.border}` : '1px solid transparent',
          }}>{t}</span>
        ))}
      </div>
      <StatsStrip items={[{ label: 'Active', value: 2, accent: '#325600' }, { label: 'Paused', value: 1 }, { label: 'Runs today', value: 2 }]} />
      <div style={{ display: 'grid', gap: 10 }}>
        {routines.map(r => (
          <div key={r.name} style={{ ...card, padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F5F5F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} color={C.textMuted} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{r.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{r.schedule} · {r.agent}</div>
              <div style={{ fontSize: 11, color: C.textSubtle, marginTop: 4 }}>Last run {r.lastRun}</div>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
              background: r.status === 'Active' ? '#f0f5e6' : '#FFFBEB',
              color: r.status === 'Active' ? '#325600' : '#B45309',
              border: r.status === 'Active' ? '1px solid #c4d9a0' : '1px solid #FDE68A',
            }}>{r.status}</span>
          </div>
        ))}
      </div>
    </DemoPageLayout>
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
    default: return <DemoHomePage />;
  }
}
