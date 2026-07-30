import type { ReactNode } from 'react';

/** Harness chrome. Deliberately plain — it must never be mistaken for the demo. */

export function Chrome({ title, onBack, children }: { title: string; onBack: () => void; children: ReactNode }) {
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        display: 'flex', alignItems: 'center', gap: 12, height: 44, flexShrink: 0,
        padding: '0 14px', background: '#1c1917', color: '#fafaf9',
      }}>
        <button onClick={onBack} style={{
          border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: '#fafaf9',
          borderRadius: 6, height: 24, padding: '0 9px', fontSize: 11, cursor: 'pointer',
        }}>
          ← All
        </button>
        <strong style={{ fontSize: 12.5, fontFamily: 'ui-monospace, Menlo, monospace' }}>{title}</strong>
      </header>
      {children}
    </div>
  );
}

export function Toolbar({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', flexShrink: 0,
      padding: '10px 16px', borderBottom: '1px solid #e7e5e4', background: '#fff',
    }}>
      {children}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      {label && (
        <span style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#78716c' }}>
          {label}
        </span>
      )}
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{children}</span>
    </label>
  );
}

export function Btn({ children, on, onClick }: { children: ReactNode; on?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      height: 24, padding: '0 9px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600,
      border: `1px solid ${on ? '#3f6b00' : '#e7e5e4'}`,
      background: on ? '#f0f5e6' : '#fff',
      color: on ? '#325600' : '#57534e',
    }}>
      {children}
    </button>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>{children}</div>;
}
