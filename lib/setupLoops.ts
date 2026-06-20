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

export type SetupLoopChat = {
  userMessage: string;
  agentMessage: string;
  campaign?: SetupLoopCampaignPreview;
};

export type SetupLoopId = 'command-layer' | 'apple-search-ads';

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
];

export const DEFAULT_SETUP_LOOP_ID: SetupLoopId = 'command-layer';

export const SETUP_LOOP_ROTATE_MS = 7000;

export function getSetupLoop(id: SetupLoopId) {
  return SETUP_LOOPS.find((loop) => loop.id === id) ?? SETUP_LOOPS[0];
}
