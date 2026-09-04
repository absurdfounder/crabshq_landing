import { Metadata } from 'next';
import Header from '@/components/ui/header';
import { GUMLOOP_EXTRACTS } from '@/lib/gumloop-extract/catalog';
import {
  GlCursorDecoration,
  GlDualCta,
  GlEnterpriseDark,
  GlExpertsSplit,
  GlFinalCta,
  GlHeroShell,
  GlMarkDriftField,
  GlOptimizeCards,
  GlOrbitRing,
  GlProductWell,
  GlShippedLog,
  GlTrustStrip,
} from '@/components/gumloop-lab/Extracts';

export const metadata: Metadata = {
  title: 'Gumloop extracts lab — Trooper',
  description:
    'Internal lab: Gumloop section layouts and SVG motion recipes extracted for Trooper. Not linked from marketing nav.',
  robots: { index: false, follow: false },
};

function LabBand({
  id,
  title,
  note,
  children,
  dark = false,
}: {
  id: string;
  title: string;
  note: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section id={id} className={dark ? '' : 'border-b border-[var(--color-line)] bg-canvas'}>
      {!dark && (
        <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
            extract · {id}
          </p>
          <h2 className="mt-1 text-sm font-medium text-neutral-700">{title}</h2>
          <p className="mt-1 max-w-2xl text-[13px] text-neutral-500">{note}</p>
        </div>
      )}
      <div className={dark ? '' : 'pb-12 pt-6'}>{children}</div>
    </section>
  );
}

export default function GumloopLabPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />

      <div className="site-header-clear border-b border-[var(--color-line)] bg-canvas">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fern">Lab</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-neutral-950 sm:text-5xl">
            Gumloop extracts
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-neutral-500">
            Section layouts and SVG motion recipes pulled from gumloop.com, rebuilt with Trooper
            marks and tokens. Nothing here is linked from the marketing nav — pick what to promote.
          </p>

          <ol className="mt-8 grid gap-2 sm:grid-cols-2">
            {GUMLOOP_EXTRACTS.filter((e) => e.id !== 'where-they-work').map((e) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  className="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 text-[13px] ring-1 ring-transparent transition-colors hover:bg-white hover:ring-black/5"
                >
                  <span className="font-medium text-neutral-800">{e.title}</span>
                  <span
                    className={`shrink-0 font-mono text-[10px] uppercase tracking-wider ${
                      e.status === 'promoted'
                        ? 'text-fern'
                        : e.status === 'skip'
                          ? 'text-neutral-300'
                          : 'text-neutral-400'
                    }`}
                  >
                    {e.status}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <LabBand
        id="hero-marks"
        title="Hero agent-mark carousel"
        note="Scale + rotate + translate settle with cubic-bezier(0.77,0,0.175,1). Promoted on the cast section."
      >
        <GlHeroShell />
      </LabBand>

      <LabBand
        id="dual-cta"
        title="Dual CTA pair"
        note="Black primary + soft ring secondary — Gumloop nav/hero buttons."
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <GlDualCta />
        </div>
      </LabBand>

      <LabBand
        id="hero-drift"
        title="Hero decoration drift"
        note="Organic idle drift via CSS vars — ±12px translate, ±4° rotate."
      >
        <div className="px-5 sm:px-8">
          <GlMarkDriftField />
        </div>
      </LabBand>

      <LabBand
        id="cursor-choreo"
        title="Agent cursor decoration"
        note="Hop translate + click squash to 0.92 — Gumloop agents-decoration module."
      >
        <GlCursorDecoration />
      </LabBand>

      <LabBand
        id="orbit"
        title="Orbit ring"
        note="Center mark + counter-spinning satellites on a dashed ring."
      >
        <GlOrbitRing />
      </LabBand>

      <LabBand
        id="experts-split"
        title="Experts build agents"
        note="Left copy + right list with a traversing cursor."
      >
        <GlExpertsSplit />
      </LabBand>

      <LabBand
        id="product-well"
        title="Soft product well"
        note="Calm #f3f4f6 rounded stage for demos (also used inside the hero shell above)."
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <GlProductWell className="min-h-[200px]" />
        </div>
      </LabBand>

      <LabBand id="optimize" title="Optimize cards" note="Three quiet claims, no cards-as-boxes.">
        <GlOptimizeCards />
      </LabBand>

      <LabBand
        id="enterprise-dark"
        title="Enterprise dark band"
        note="Ink band with control tiles — maps to DarkSplitSection language."
        dark
      >
        <GlEnterpriseDark />
      </LabBand>

      <LabBand id="trust" title="Trust strip" note="Quote-forward with one big metric.">
        <GlTrustStrip />
      </LabBand>

      <LabBand id="shipped" title="Recently shipped" note="Dense changelog rows.">
        <GlShippedLog />
      </LabBand>

      <LabBand id="final-cta" title="Final CTA" note="Closing headline + mark carousel + dual CTA.">
        <GlFinalCta />
      </LabBand>
    </div>
  );
}
