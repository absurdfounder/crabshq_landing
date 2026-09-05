import { Metadata } from 'next';
import Header from '@/components/ui/header';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gumloop exact mirror — Trooper lab',
  description:
    'Internal lab: static SSR + CSS capture of gumloop.com for pixel-faithful design reference. Not linked from marketing.',
  robots: { index: false, follow: false },
};

export default function GumloopExactMirrorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Header />
      <div className="site-header-clear flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            lab · exact mirror
          </p>
          <p className="mt-0.5 text-[13px] text-white/70">
            Static SSR HTML + Gumloop CSS/fonts. Scripts stripped (no live hydration).{' '}
            <Link href="/lab/gumloop" className="underline underline-offset-2 hover:text-white">
              ← extracts
            </Link>
          </p>
        </div>
        <a
          href="/lab/gumloop-exact/index.html"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-md bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-950 hover:bg-white/90"
        >
          Open fullscreen
        </a>
      </div>
      <iframe
        title="Gumloop exact mirror"
        src="/lab/gumloop-exact/index.html"
        className="min-h-0 w-full flex-1 border-0 bg-white"
        style={{ height: 'calc(100vh - 7.5rem)' }}
      />
    </div>
  );
}
