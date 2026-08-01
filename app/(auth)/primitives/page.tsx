import Header from '@/components/ui/header';
import PrimitivesCatalog from '@/components/primitives/PrimitivesCatalog';
import { primitives } from '@/lib/primitives';

export const metadata = {
  title: 'Agent Primitives | Trooper',
  description: 'Composable real-world capabilities for your Trooper AI workforce — identity, payments, automation, content, cloud, and operations.',
  alternates: { canonical: 'https://trooper.so/primitives' },
};

export default function PrimitivesPage() {
  return (
    <div className="min-h-screen bg-[#080a08] text-white">
      <Header />
      <section className="site-header-clear border-b border-white/15">
        <div className="mx-auto max-w-7xl border-x-0 border-white/15 px-5 py-12 md:border-x md:px-10 md:py-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-200">Trooper primitives · {primitives.length} capabilities</span>
          <h1 className="mt-5 max-w-5xl font-funneldisplay text-4xl leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl md:text-7xl">
            One call for every real-world capability your agents need.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Give your workforce the primitives to identify, transact, create, research, and operate — with durable controls around every action.
          </p>
        </div>
      </section>
      <PrimitivesCatalog />
    </div>
  );
}
