'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MarketingHeadline from '@/components/marketing/MarketingHeadline';
import { DemoFavicon } from '@/components/DemoFavicon';
import {
  DEFAULT_SETUP_LOOP_ID,
  SETUP_LOOPS,
  SETUP_LOOP_ROTATE_MS,
  type SetupLoop,
  type SetupLoopCampaignPreview,
} from '@/lib/setupLoops';

function CampaignPreviewCard({ campaign }: { campaign: SetupLoopCampaignPreview }) {
  return (
    <div className="mt-3 rounded-sm border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-900">
          {campaign.appName} · {campaign.campaignCount} campaigns
        </p>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-800 border border-amber-200 bg-amber-50 px-2 py-0.5">
          {campaign.statusLabel}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {campaign.countries.map((country) => (
          <div key={country.code} className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-slate-900">
              {country.code} {country.flag}
            </span>
            <span className="text-slate-500">{country.keywords} keywords</span>
            <span className="font-medium tabular-nums text-slate-700">{country.dailyBudget}</span>
          </div>
        ))}

        <div className="flex items-center justify-between gap-3 border-t border-dashed border-slate-200 pt-2 text-sm">
          <span className="text-slate-600">{campaign.moreLabel}</span>
          <span className="text-slate-500">CA · AU · IT · FR · AE · SA · KW · BH</span>
          <span className="font-medium tabular-nums text-slate-700">{campaign.moreDailyBudget}</span>
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
        {campaign.footer}
      </p>
    </div>
  );
}

function SetupLoopChatPreview({ loop }: { loop: SetupLoop }) {
  return (
    <div className="mt-5 max-w-xl rounded-sm border border-slate-200 bg-[#FAFAF8] p-3 sm:p-4">
      <div className="flex items-start gap-2.5">
        <DemoFavicon domain="trooper.so" src="/images/trooper-logomark.png" size={28} rounded="sm" alt="" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">You</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-800">{loop.chat.userMessage}</p>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2.5 border-t border-slate-200/80 pt-3">
        <DemoFavicon domain="openclaw.ai" size={28} rounded="sm" alt="" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-trooper-700">Jordan · Chief of Staff</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-800">{loop.chat.agentMessage}</p>
          {loop.chat.campaign ? <CampaignPreviewCard campaign={loop.chat.campaign} /> : null}
        </div>
      </div>
    </div>
  );
}

export default function HeroSetupLoops() {
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      SETUP_LOOPS.findIndex((loop) => loop.id === DEFAULT_SETUP_LOOP_ID),
    ),
  );
  const [paused, setPaused] = useState(false);

  const loop = SETUP_LOOPS[activeIndex] ?? SETUP_LOOPS[0];

  useEffect(() => {
    if (paused || SETUP_LOOPS.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SETUP_LOOPS.length);
    }, loop.durationMs ?? SETUP_LOOP_ROTATE_MS);

    return () => window.clearInterval(interval);
  }, [paused, loop.durationMs, activeIndex]);

  return (
    <div
      className="max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={loop.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <MarketingHeadline as="h1" size="hero" lines={loop.headlineLines} subline={loop.subline} />
          <SetupLoopChatPreview loop={loop} />
        </motion.div>
      </AnimatePresence>

      {SETUP_LOOPS.length > 1 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {SETUP_LOOPS.map((entry, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={entry.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveIndex(index)}
                className={[
                  'rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors',
                  selected
                    ? 'border-trooper-200 bg-trooper-50 text-trooper-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700',
                ].join(' ')}
              >
                {entry.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
