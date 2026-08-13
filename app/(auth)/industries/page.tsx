import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/ui/header';
import PixelButton from '@/components/ui/PixelButton';
import SectionShell from '@/components/ui/SectionShell';
import { getIndustryCards, industryHubMeta } from '@/lib/industryContent';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import { ArrowRight } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';

export const metadata = buildPageMetadata({
  title: industryHubMeta.title,
  description: industryHubMeta.description,
  canonical: industryHubMeta.canonical,
  ogKind: 'hub',
  ogSlug: 'industries',
});

export default function IndustriesHubPage() {
  const pages = getIndustryCards();

  return (
    <div className="bg-canvas text-ink">
      <Header />

      <section className="site-header-clear bg-canvas">
        <div className="rail border-b border-[var(--color-line)] pb-12 pt-10 sm:pb-16 sm:pt-12">
          <p className="kicker mb-3">Industries</p>
          <h1 className="max-w-3xl text-balance font-display text-4xl leading-[1.08] tracking-tight text-neutral-800 sm:text-5xl">
            AI Front Office by industry
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Trooper agents handle calls, booking, dispatch, and follow-up for home services and field
            businesses — built on OpenClaw, ready to deploy in minutes.
          </p>
          <div className="mt-8">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="dark"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Deploy agents
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell rhythm eyebrow="Industries" bgClass="bg-canvas">
        <div className="dot-grid rounded-2xl border border-black/5 p-4 sm:p-5 md:p-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <Link
                  key={page.slug}
                  href={page.href}
                  className="card-flush group flex h-full flex-col transition-transform duration-200 hover:scale-[1.015]"
                >
                  <div className="relative h-44 overflow-hidden border-b border-black/5 sm:h-48">
                    <Image
                      src={page.coverImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-[13px] font-medium text-neutral-800 shadow-xs backdrop-blur">
                      {page.name}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                    <h2 className="text-base font-semibold text-balance text-neutral-800 group-hover:text-fern-800 sm:text-lg">
                      {page.title}
                    </h2>
                    <p className="card-body flex-1 line-clamp-2">{page.description}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-fern-700">
                      Open playbook
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </SectionShell>

      <MarketingSubpageTail />
    </div>
  );
}
