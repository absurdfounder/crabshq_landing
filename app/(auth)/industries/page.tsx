import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/ui/header';
import PixelButton from '@/components/ui/PixelButton';
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

const PX = 'px-4 sm:px-6 lg:px-8';

export default function IndustriesHubPage() {
  const pages = getIndustryCards();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />

      <section className="site-header-clear border-b border-black/5 bg-canvas">
        <div className={`mx-auto max-w-7xl ${PX} pb-12 pt-10 sm:pb-16 sm:pt-14`}>
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

      <section className="border-b border-black/5">
        <div className="dot-grid py-12 sm:py-20">
          <div className={`mx-auto max-w-7xl ${PX}`}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <Link
                  key={page.slug}
                  href={page.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-black/5 transition-transform duration-200 hover:scale-[1.015]"
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
                    <p className="flex-1 text-[15px] leading-relaxed text-pretty text-neutral-500 line-clamp-2">
                      {page.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-fern-700">
                      Open playbook
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarketingSubpageTail />
    </div>
  );
}
