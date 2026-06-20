import type { MarketingHeadlineLine } from '@/components/marketing/MarketingHeadline';

export type SetupLoopCampaignCountry = {
  code: string;
  flag: string;
  keywords: number;
  dailyBudget: string;
};

export type SetupLoopCampaignPreview = {
  appName: string;
  campaignCount: number;
  statusLabel: string;
  countries: SetupLoopCampaignCountry[];
  moreLabel: string;
  moreDailyBudget: string;
  footer: string;
};

export type SetupLoopMetaAdVariant = {
  platform: 'Facebook' | 'Instagram';
  label: string;
  detail: string;
  dailyBudget: string;
};

export type SetupLoopMetaAdsPreview = {
  appName: string;
  statusLabel: string;
  inspiration: string;
  variants: SetupLoopMetaAdVariant[];
  moreLabel: string;
  footer: string;
};

export type SetupLoopChat = {
  userMessage: string;
  agentMessage: string;
  campaign?: SetupLoopCampaignPreview;
  metaAds?: SetupLoopMetaAdsPreview;
};

export type SetupLoopId = 'command-layer' | 'apple-search-ads' | 'meta-ads-launch' | 'meta-ads-optimize';

export type SetupLoop = {
  id: SetupLoopId;
  label: string;
  headlineLines: MarketingHeadlineLine[];
  subline: string;
  chat: SetupLoopChat;
  /** Auto-advance interval when the carousel is running. */
  durationMs?: number;
};

export const SETUP_LOOPS: SetupLoop[] = [
  {
    id: 'command-layer',
    label: 'Command layer',
    headlineLines: [
      {
        parts: [{ text: 'Just Ask.', tone: 'default' }],
        iconAfter: 0,
      },
      {
        parts: [{ text: 'Troopers will do it.', tone: 'brand' }],
      },
    ],
    subline:
      'AI units that write code, make commits, browse the web, send emails, and execute real missions — not just answer questions.',
    chat: {
      userMessage: '@Jordan ship the Q2 landing refresh and open a PR when checks pass.',
      agentMessage:
        'Mission live — Ren is on the HTML diff, Aria is updating SEO copy, Leo opens the PR when CI is green.',
    },
    durationMs: 6500,
  },
  {
    id: 'apple-search-ads',
    label: 'Apple Search Ads',
    headlineLines: [
      {
        parts: [
          { text: 'Launch Apple Search Ads in', tone: 'default' },
          { text: '90 countries', tone: 'brand' },
          { text: 'by chatting.', tone: 'default' },
        ],
      },
    ],
    subline:
      'Describe your app. AI drafts country-by-country campaigns with localized keywords.',
    chat: {
      userMessage: 'Launch Pomelo Notes in the 11 premium tier countries.',
      agentMessage: "Here's a draft. 11 campaigns, paused until you approve.",
      campaign: {
        appName: 'Pomelo Notes',
        campaignCount: 11,
        statusLabel: 'awaiting approval',
        countries: [
          { code: 'US', flag: '🇺🇸', keywords: 28, dailyBudget: '$20/d' },
          { code: 'GB', flag: '🇬🇧', keywords: 26, dailyBudget: '$20/d' },
          { code: 'DE', flag: '🇩🇪', keywords: 24, dailyBudget: '$20/d' },
        ],
        moreLabel: '+ 8 more',
        moreDailyBudget: '$20/d',
        footer: '$220 / day · paused on deploy',
      },
    },
    durationMs: 8000,
  },
  {
    id: 'meta-ads-launch',
    label: 'Meta launch',
    headlineLines: [
      {
        parts: [
          { text: 'Launch Facebook & Instagram ads', tone: 'default' },
          { text: 'from what already wins.', tone: 'brand' },
        ],
      },
    ],
    subline:
      'Trooper finds top-performing ads in your category, designs banners, gets your approval, runs the launch, and keeps A/B testing for you.',
    chat: {
      userMessage:
        'Launch Pomelo Notes on Facebook and Instagram — use the best ads in our category as the starting point.',
      agentMessage:
        'Scouted 14 winning creatives · drafted 4 banners · paused until you approve.',
      metaAds: {
        appName: 'Pomelo Notes',
        statusLabel: 'awaiting approval',
        inspiration: 'Inspired by top Notes apps · 3.2% avg CTR',
        variants: [
          {
            platform: 'Facebook',
            label: 'Feed · Variant A',
            detail: 'Auto banner · 3.1% CTR benchmark',
            dailyBudget: '$30/d',
          },
          {
            platform: 'Instagram',
            label: 'Story · Variant A',
            detail: 'Auto banner · 2.9% CTR benchmark',
            dailyBudget: '$25/d',
          },
          {
            platform: 'Instagram',
            label: 'Reel · Variant B',
            detail: 'A/B test slot · hook v2',
            dailyBudget: '$25/d',
          },
        ],
        moreLabel: '+ 1 more',
        footer: '$80 / day · paused on deploy · A/B rotation after launch',
      },
    },
    durationMs: 8500,
  },
  {
    id: 'meta-ads-optimize',
    label: 'Meta A/B',
    headlineLines: [
      {
        parts: [
          { text: 'A/B test Facebook & Instagram ads', tone: 'default' },
          { text: 'while you sleep.', tone: 'brand' },
        ],
      },
    ],
    subline:
      'Troopers track performance, pause losers, spin new banners, and keep testing until your launch hits target CPA.',
    chat: {
      userMessage: 'Keep optimizing the Pomelo launch — pause underperformers and test new banners.',
      agentMessage: 'Week 1 report · IG Reel B is winning · 2 new variants ready for approval.',
      metaAds: {
        appName: 'Pomelo Notes',
        statusLabel: 'A/B testing live',
        inspiration: 'CPA −18% vs launch baseline · 4.2% CTR on winner',
        variants: [
          {
            platform: 'Instagram',
            label: 'Reel · Variant B',
            detail: 'Winner · 4.2% CTR',
            dailyBudget: '$35/d',
          },
          {
            platform: 'Facebook',
            label: 'Feed · Variant A',
            detail: 'Paused · 1.1% CTR',
            dailyBudget: '$0/d',
          },
          {
            platform: 'Instagram',
            label: 'Story · Variant C',
            detail: 'Testing · day 2',
            dailyBudget: '$20/d',
          },
        ],
        moreLabel: '+ 2 variants in review',
        footer: '$55 / day live · auto-pause rules on',
      },
    },
    durationMs: 8500,
  },
];

export const DEFAULT_SETUP_LOOP_ID: SetupLoopId = 'command-layer';

export const SETUP_LOOP_ROTATE_MS = 7000;

export function getSetupLoop(id: SetupLoopId) {
  return SETUP_LOOPS.find((loop) => loop.id === id) ?? SETUP_LOOPS[0];
}
