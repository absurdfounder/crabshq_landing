import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Copy } from 'lucide-react';
import Header from '@/components/ui/header';
import { getPrimitive, primitivePath, primitives } from '@/lib/primitives';

export function generateStaticParams() {
  return primitives.map((primitive) => ({ slug: primitive.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const primitive = getPrimitive(params.slug);
  if (!primitive) return { title: 'Primitive not found | Trooper' };
  return { title: `${primitive.name} | Trooper Primitives`, description: primitive.description, alternates: { canonical: `https://trooper.so${primitivePath(primitive.slug)}` } };
}

export default function PrimitiveDetailPage({ params }: { params: { slug: string } }) {
  const primitive = getPrimitive(params.slug);
  if (!primitive) notFound();
  const related = primitives.filter((item) => item.category === primitive.category && item.slug !== primitive.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main className="site-header-clear">
        <div className="mx-auto max-w-7xl border-x-0 border-[var(--color-line)] md:border-x">
          <div className="border-b border-[var(--color-line)] px-5 py-6 md:px-10"><Link href="/primitives" className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"><ArrowLeft className="h-4 w-4" /> All primitives</Link></div>

          <section className="grid gap-10 border-b border-[var(--color-line)] px-5 py-12 md:grid-cols-[minmax(0,1fr)_21rem] md:gap-16 md:px-10 md:py-20">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fern-700">{primitive.category} · primitive</span>
              <h1 className="mt-5 max-w-3xl font-funneldisplay text-4xl leading-[1.02] tracking-[-0.04em] text-ink md:text-6xl">{primitive.tagline}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{primitive.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://app.trooper.so" className="inline-flex items-center gap-2 bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">Build with {primitive.name} <ArrowRight className="h-4 w-4" /></a>
                <a href="#api" className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-slate-500">Read the API</a>
              </div>
            </div>

            <div className="border border-slate-200 bg-canvas-warm p-4 font-mono text-xs text-slate-600">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 uppercase tracking-[0.16em] text-slate-400"><span>capability</span><span className="text-fern-700">active</span></div>
              <p className="mt-5 text-lg text-ink">{primitive.name}</p><p className="mt-2 leading-relaxed text-slate-500">{primitive.category}</p>
              <div className="mt-8 space-y-3 border-t border-slate-200 pt-4">{primitive.outcomes.slice(0, 3).map((outcome) => <div key={outcome} className="flex gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-fern-700" />{outcome}</div>)}</div>
            </div>
          </section>

          <section id="api" className="grid border-b border-[var(--color-line)] md:grid-cols-[minmax(0,1fr)_21rem]">
            <div className="px-5 py-12 md:px-10 md:py-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fern-700">Paste and ship</span>
              <h2 className="mt-4 font-funneldisplay text-3xl tracking-tight">One call to {primitive.name}</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">Use the CLI, SDK, or REST API. Each invocation returns a structured record that your agents can act on and your team can audit.</p>
              <div className="mt-8 border border-slate-200 bg-slate-950 p-5 font-mono text-sm text-slate-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.18em] text-slate-400"><span>Terminal</span><Copy className="h-3.5 w-3.5" /></div>
                <p className="mt-4"><span className="text-lime-300">$</span> {primitive.endpoint} --goal &quot;Your agent objective&quot;</p><p className="mt-3 text-slate-500">→ job accepted · controls applied · execution tracked</p>
              </div>
            </div>
            <div className="border-t border-[var(--color-line)] bg-canvas-warm px-5 py-12 md:border-l md:border-t-0 md:px-8 md:py-16">
              <h2 className="font-funneldisplay text-2xl tracking-tight">What you get</h2>
              <ul className="mt-6 space-y-5">{primitive.outcomes.map((outcome, index) => <li key={outcome} className="border-b border-slate-200 pb-5 last:border-0"><span className="font-mono text-[10px] text-fern-700">0{index + 1}</span><p className="mt-1 text-sm text-ink-muted">{outcome}</p></li>)}</ul>
            </div>
          </section>

          <section className="px-5 py-12 md:px-10 md:py-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fern-700">Keep building</span><h2 className="mt-4 font-funneldisplay text-3xl tracking-tight">Related primitives</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={primitivePath(item.slug)} className="group border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-400 hover:bg-emerald-50/30"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fern-700">{item.category}</span><h3 className="mt-3 font-funneldisplay text-xl">{item.name}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.tagline}</p><span className="mt-5 inline-flex items-center gap-2 text-sm text-slate-500 group-hover:text-fern-700">View primitive <ArrowRight className="h-4 w-4" /></span></Link>)}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
