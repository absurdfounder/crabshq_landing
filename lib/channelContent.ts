import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@trooper/demo';
import type { MarketingFeatureSection } from '@/lib/marketingFeatures';
import { canvasFeatureSection } from '@/lib/marketingFeatures';
import {
  allChannelSlugs,
  getChannelBySlug,
  type ChannelCatalogItem,
} from '@/lib/channelCatalog';

const SOCIAL_IMAGE = 'https://dazzling-cat.netlify.app/trooper_social.png';

export type ChannelPageContent = {
  slug: string;
  catalog: ChannelCatalogItem;
  missionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  setupTitle: string;
  setupSteps: string[];
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
};

type BuildArgs = {
  slug: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  setupTitle?: string;
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
};

function buildChannelPage(args: BuildArgs): ChannelPageContent | undefined {
  const catalog = getChannelBySlug(args.slug);
  if (!catalog) return undefined;

  return {
    slug: args.slug,
    catalog,
    missionLabel: 'Channel brief',
    title: `Command Trooper from ${catalog.name}`,
    titleAccent: args.titleAccent,
    description: args.description,
    overviewTitle: args.overviewTitle,
    overviewParagraphs: args.overviewParagraphs,
    benefits: args.benefits,
    setupTitle: args.setupTitle ?? `Connect ${catalog.name}`,
    setupSteps: catalog.steps,
    demoId: args.demoId,
    featureSections: args.featureSections,
    meta: {
      title: `${catalog.name} Channel | Trooper`,
      description: args.description,
      canonical: `https://trooper.so/channels/${args.slug}`,
    },
  };
}

const genericBenefits = (channel: string): SubpageBenefit[] => [
  {
    title: 'Same workforce, new front line',
    description: `Message from ${channel} and your Trooper unit picks up the task on the board — no context lost between apps.`,
  },
  {
    title: 'Ticket-grade traceability',
    description: 'Every assignment becomes a traced ticket. Chat stays chat; ops stays auditable.',
  },
  {
    title: 'OpenClaw routing',
    description: 'Credentials sync to your private server. Agents respond on the channel you configured.',
  },
];

const channelPages: Record<string, ChannelPageContent> = {};

const slack = buildChannelPage({
  slug: 'slack',
  demoId: 'slack',
  featureSections: [
    {
      eyebrow: 'Command',
      eyebrowNumber: '03',
      ask: 'trooper, turn this Slack thread into a ticket',
      reply: 'on it — work is on the board',
      window: 'Slack — Command',
      title: 'Assign work in Slack,',
      titleHighlight: 'track it like ops.',
      intro:
        'Drop a task in a channel or DM. Trooper opens a real mission with the conversation attached — chat stays fast, work stays clear.',
      visual: 'slack-routing',
    },
    {
      eyebrow: 'Updates',
      eyebrowNumber: '04',
      ask: 'trooper, post status back in the thread',
      reply: 'progress updates in Slack',
      window: 'Slack — Updates',
      title: 'Status comes back',
      titleHighlight: 'where you asked.',
      intro:
        'Agents report progress in the same Slack thread — so the team sees outcomes without opening another app.',
      visual: 'canvas-desktop',
    },
  ],
  titleAccent: 'without leaving your workspace',
  description:
    'Assign tasks, get status updates, and approve agent actions from Slack channels and DMs. Your Trooper workforce meets your team where they already coordinate.',
  overviewTitle: 'Ops command inside Slack',
  overviewParagraphs: [
    'Drop a task in #engineering or DM your Trooper bot — agents checkout work on the unified board and report back in-thread.',
    'Threaded tickets keep Slack fast while preserving full tool traces, diffs, and decision logs in Trooper.',
    'Same org memory whether you command from desktop, mobile, or a standup channel.',
  ],
  benefits: [
    {
      title: 'Channel or DM routing',
      description: 'Route general ops to a team channel and sensitive approvals to direct messages.',
    },
    {
      title: 'Slash-free delegation',
      description: 'Plain-language task assignment — agents parse intent and spawn the right subtasks.',
    },
    {
      title: 'Workspace-native alerts',
      description: 'PR opened, deploy failed, report ready — agents push updates where your team already looks.',
    },
  ],
});
if (slack) channelPages.slack = slack;

const whatsapp = buildChannelPage({
  slug: 'whatsapp',
  demoId: 'whatsapp',
  featureSections: [
    {
      eyebrow: 'Command',
      eyebrowNumber: '03',
      ask: 'trooper, take this WhatsApp and run it',
      reply: 'on it — field ticket opened',
      window: 'WhatsApp — Command',
      title: 'Command from your phone,',
      titleHighlight: 'execute on your server.',
      intro:
        'Send a message on WhatsApp. Agents run the work on your infrastructure while approvals stay a quick reply away.',
      visual: 'whatsapp-routing',
    },
    {
      eyebrow: 'Updates',
      eyebrowNumber: '04',
      ask: 'trooper, ping me when the mission finishes',
      reply: 'completion summary on WhatsApp',
      window: 'WhatsApp — Updates',
      title: 'Field updates',
      titleHighlight: 'on your phone.',
      intro:
        'Completion summaries and approval asks return in WhatsApp so you stay in command without watching a dashboard.',
      visual: 'canvas-desktop',
    },
  ],
  titleAccent: 'from your pocket',
  description:
    'Run your AI workforce from WhatsApp. Assign missions on the go, approve spend, and get field reports — all through the Business API on your private OpenClaw server.',
  overviewTitle: 'Field command on mobile',
  overviewParagraphs: [
    'WhatsApp is where founders and operators actually respond. Trooper turns those messages into traced tickets, not lost threads.',
    'Agents execute on your server while you approve high-risk moves with a quick reply.',
    'Business API credentials stay in your Secrets vault — Trooper never resells messaging access.',
  ],
  benefits: [
    {
      title: 'Mobile-first command',
      description: 'Assign and approve from your phone without opening the dashboard.',
    },
    {
      title: 'Async mission updates',
      description: 'Agents send progress pings and completion summaries to your WhatsApp thread.',
    },
    {
      title: 'Business API ready',
      description: 'Connect Meta Business credentials once; routing handles inbound and outbound reliably.',
    },
  ],
});
if (whatsapp) channelPages.whatsapp = whatsapp;

const telegram = buildChannelPage({
  slug: 'telegram',
  demoId: 'messaging',
  featureSections: [
    {
      eyebrow: 'Command',
      eyebrowNumber: '03',
      ask: 'trooper, take this Telegram message and open a mission',
      reply: 'ticket opened — same workforce',
      window: 'Telegram — Command',
      title: 'Telegram becomes',
      titleHighlight: 'the same task board.',
      intro:
        'Bot messages turn into tracked missions with the same agents and memory as the rest of Trooper — lightweight command, full ops trail.',
      visual: 'messaging-routing',
    },
    {
      eyebrow: 'Updates',
      eyebrowNumber: '04',
      ask: 'trooper, keep me posted in this chat',
      reply: 'mission updates in-thread',
      window: 'Channel — Updates',
      title: 'Same chat,',
      titleHighlight: 'real mission updates.',
      intro:
        'Progress and completion notes return in the channel you used — lightweight command, full ops trail.',
      visual: 'canvas-desktop',
    },
  ],
  titleAccent: 'via your bot',
  description:
    'Connect a Telegram bot to Trooper and command your AI workforce from any device. Fast setup, global reach, full ticket tracing.',
  overviewTitle: 'Lightweight bot command',
  overviewParagraphs: [
    'Telegram bots are ideal for solo operators and distributed teams who want instant mobile access.',
    'Create a bot with BotFather, paste the token in Trooper, and start assigning work in minutes.',
    'Every bot message maps to a ticket — agents execute with the same memory and skills as the web app.',
  ],
  benefits: genericBenefits('Telegram'),
});
if (telegram) channelPages.telegram = telegram;

const discord = buildChannelPage({
  slug: 'discord',
  demoId: 'messaging',
  featureSections: [
    {
      eyebrow: 'Command',
      eyebrowNumber: '03',
      ask: 'trooper, turn this Discord message into a ticket',
      reply: 'mission on the board',
      window: 'Discord — Command',
      title: 'Server chat becomes',
      titleHighlight: 'real missions.',
      intro:
        'Community channels and DMs open first-class work on your board — same workforce, same approvals, right where your team already talks.',
      visual: 'messaging-routing',
    },
    {
      eyebrow: 'Updates',
      eyebrowNumber: '04',
      ask: 'trooper, keep me posted in this chat',
      reply: 'mission updates in-thread',
      window: 'Channel — Updates',
      title: 'Same chat,',
      titleHighlight: 'real mission updates.',
      intro:
        'Progress and completion notes return in the channel you used — lightweight command, full ops trail.',
      visual: 'canvas-desktop',
    },
  ],
  titleAccent: 'in your server',
  description:
    'Deploy Trooper inside Discord servers and DMs. Perfect for community teams, gaming orgs, and dev squads who live in voice and text channels.',
  overviewTitle: 'Community-scale command',
  overviewParagraphs: [
    'Invite the Trooper bot to your server and delegate from any channel your team uses daily.',
    'Agents share org memory across Discord, the dashboard, and other connected channels.',
    'Moderators stay in command — sensitive actions still require explicit approval.',
  ],
  benefits: genericBenefits('Discord'),
});
if (discord) channelPages.discord = discord;

const signal = buildChannelPage({
  slug: 'signal',
  demoId: 'messaging',
  featureSections: [
    {
      eyebrow: 'Command',
      eyebrowNumber: '03',
      ask: 'trooper, take this Signal DM and open a mission',
      reply: 'encrypted handoff — ticket opened',
      window: 'Signal — Command',
      title: 'Private messages,',
      titleHighlight: 'auditable execution.',
      intro:
        'Signal keeps the conversation encrypted. Trooper still opens a clear mission on your runtime so work does not vanish into a DM.',
      visual: 'messaging-routing',
    },
    {
      eyebrow: 'Updates',
      eyebrowNumber: '04',
      ask: 'trooper, keep me posted in this chat',
      reply: 'mission updates in-thread',
      window: 'Channel — Updates',
      title: 'Same chat,',
      titleHighlight: 'real mission updates.',
      intro:
        'Progress and completion notes return in the channel you used — lightweight command, full ops trail.',
      visual: 'canvas-desktop',
    },
  ],
  titleAccent: 'with end-to-end encryption',
  description:
    'Command Trooper over Signal for private, encrypted ops communication. Ideal for security-conscious teams and personal command lines.',
  overviewTitle: 'Encrypted field comms',
  overviewParagraphs: [
    'Signal keeps message content off third-party servers while Trooper handles execution on your private runtime.',
    'Connect via signal-cli-rest-api on infrastructure you control.',
    'Assign tasks and receive status without sacrificing encryption expectations.',
  ],
  benefits: genericBenefits('Signal'),
});
if (signal) channelPages.signal = signal;

const imessage = buildChannelPage({
  slug: 'imessage',
  demoId: 'messaging',
  featureSections: [
    {
      eyebrow: 'Command',
      eyebrowNumber: '03',
      ask: 'trooper, bridge this iMessage to the workforce',
      reply: 'relay up — ticket opened',
      window: 'iMessage — Command',
      title: 'iMessage to your workforce,',
      titleHighlight: 'no new app.',
      intro:
        'Bridge Apple Messages through your Mac relay. Assign work from the app you already use — tickets still land on Trooper.',
      visual: 'messaging-routing',
    },
    {
      eyebrow: 'Updates',
      eyebrowNumber: '04',
      ask: 'trooper, keep me posted in this chat',
      reply: 'mission updates in-thread',
      window: 'Channel — Updates',
      title: 'Same chat,',
      titleHighlight: 'real mission updates.',
      intro:
        'Progress and completion notes return in the channel you used — lightweight command, full ops trail.',
      visual: 'canvas-desktop',
    },
  ],
  titleAccent: 'through your Mac relay',
  description:
    'Bridge iMessage to Trooper via a Mac relay. Command your workforce from the messaging app you already use with friends, family, and clients.',
  overviewTitle: 'Apple ecosystem bridge',
  overviewParagraphs: [
    'iMessage requires a Mac relay — BlueBubbles or similar — that stays online and exposes an API.',
    'Trooper stores relay credentials securely and routes agent replies back through iMessage.',
    'Best for operators who want zero new apps on their phone.',
  ],
  benefits: genericBenefits('iMessage'),
});
if (imessage) channelPages.imessage = imessage;

const email = buildChannelPage({
  slug: 'email',
  demoId: 'email',
  featureSections: [
    {
      eyebrow: 'Command',
      eyebrowNumber: '03',
      ask: 'trooper, turn this inbox thread into a mission',
      reply: 'parsed — research and draft queued',
      window: 'Email — Command',
      title: 'Your inbox becomes',
      titleHighlight: 'a command channel.',
      intro:
        'RFPs, support threads, and follow-ups become missions with research and drafts — email stops being a black hole.',
      visual: 'email-routing',
    },
    {
      eyebrow: 'Approve',
      eyebrowNumber: '04',
      ask: 'trooper, hold the reply until I approve',
      reply: 'draft queued — waiting on you',
      window: 'Email — Approve',
      title: 'Drafts wait',
      titleHighlight: 'for your send.',
      intro:
        'Research and reply drafts stay held until you approve — inbox automation without accidental sends.',
      visual: 'legal-review',
    },
  ],
  titleAccent: 'via IMAP and SMTP',
  description:
    'Send and receive email through Trooper agents. Inbox triage, drafted replies, scheduled follow-ups — all traced as tickets.',
  overviewTitle: 'Inbox as command channel',
  overviewParagraphs: [
    'Connect Gmail or any IMAP provider with app passwords stored in your Secrets vault.',
    'Agents read threads, draft responses, and escalate when human sign-off is required.',
    'Email assignments become first-class tickets alongside Slack, WhatsApp, and dashboard work.',
  ],
  benefits: [
    {
      title: 'Inbox triage on autopilot',
      description: 'Agents classify, summarize, and draft replies from your knowledge base.',
    },
    {
      title: 'Thread-aware memory',
      description: 'Long email chains stay linked to the same ticket and org context.',
    },
    {
      title: 'Provider-flexible',
      description: 'Gmail, Outlook, or self-hosted — standard IMAP/SMTP credentials.',
    },
  ],
});
if (email) channelPages.email = email;

export const channelHubMeta = {
  title: 'Messaging Channels | Trooper',
  description:
    'Connect Slack, WhatsApp, Telegram, Discord, Signal, iMessage, and Email to your Trooper AI workforce. Command agents from the channels you already use.',
  canonical: 'https://trooper.so/channels',
};

export function getChannelPage(slug: string): ChannelPageContent | undefined {
  return channelPages[slug];
}

export function allChannelPageSlugs(): string[] {
  return allChannelSlugs().filter((slug) => Boolean(channelPages[slug]));
}

export const channelSocialImage = SOCIAL_IMAGE;
