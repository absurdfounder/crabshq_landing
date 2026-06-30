import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@/lib/demoScenarios';
import type { RelatedLink, UseCasePageContent } from '@/lib/useCaseContent';

export type IndustryPageContent = UseCasePageContent;

type IndustryDef = {
  slug: string;
  name: string;
  /** e.g. "pest control businesses" — defaults from name */
  audience?: string;
  demoId?: DemoScenarioId;
};

const DEFAULT_TEAMS: RelatedLink[] = [
  { href: '/teams/customer-support', label: 'Customer Support', description: 'Front-office agents' },
  { href: '/teams/operations', label: 'Operations', description: 'Scheduling and dispatch' },
  { href: '/teams/sales', label: 'Sales', description: 'Quotes and follow-up' },
];

const DEFAULT_INTEGRATIONS: RelatedLink[] = [
  { href: '/channels/whatsapp', label: 'WhatsApp', description: 'Field updates and booking' },
  { href: '/plugin/ai_agent_for_gmail', label: 'Gmail', description: 'Email follow-up' },
  { href: '/plugin/ai_agent_for_hubspot', label: 'HubSpot', description: 'CRM logging' },
];

const INDUSTRY_CATALOG: IndustryDef[] = [
  { slug: 'pest-control', name: 'Pest Control', audience: 'pest control businesses' },
  { slug: 'hvac', name: 'HVAC', audience: 'HVAC businesses' },
  { slug: 'plumbing', name: 'Plumbing', audience: 'plumbing businesses' },
  { slug: 'electrical', name: 'Electrical', audience: 'electrical contractors' },
  { slug: 'roofing', name: 'Roofing', audience: 'roofing contractors' },
  { slug: 'garage-door', name: 'Garage Door', audience: 'garage door businesses' },
  { slug: 'construction', name: 'Construction', audience: 'construction companies' },
  { slug: 'handyman', name: 'Handyman', audience: 'handyman businesses' },
  { slug: 'home-security', name: 'Home Security', audience: 'home security companies' },
  { slug: 'automotive', name: 'Automotive', audience: 'automotive businesses' },
  { slug: 'dealership-service', name: 'Dealership Service', audience: 'dealership service departments' },
  { slug: 'painters', name: 'Painters', audience: 'painting contractors' },
  { slug: 'interior-designers', name: 'Interior Designers', audience: 'interior design businesses' },
  { slug: 'home-cleaners', name: 'Home Cleaners', audience: 'home cleaning businesses' },
  { slug: 'lawn-care', name: 'Lawn Care', audience: 'lawn care businesses' },
  { slug: 'landscapers', name: 'Landscaping', audience: 'landscaping businesses' },
  { slug: 'pressure-washers', name: 'Pressure Washing', audience: 'pressure washing businesses' },
  { slug: 'window-cleaners', name: 'Window Cleaning', audience: 'window cleaning businesses' },
  { slug: 'junk-removal', name: 'Junk Removal', audience: 'junk removal businesses' },
  { slug: 'movers', name: 'Moving', audience: 'moving companies' },
  { slug: 'pool-maintenance', name: 'Pool Maintenance', audience: 'pool service businesses' },
  { slug: 'pet-sitting', name: 'Pet Sitting', audience: 'pet sitting businesses' },
  { slug: 'restoration-services', name: 'Restoration', audience: 'restoration contractors' },
  { slug: 'energy', name: 'Energy', audience: 'energy service businesses' },
];

function audienceLabel(def: IndustryDef): string {
  return def.audience ?? `${def.name.toLowerCase()} businesses`;
}

function buildIndustry(def: IndustryDef): IndustryPageContent {
  const audience = audienceLabel(def);
  const lowerName = def.name.toLowerCase();

  const benefits: SubpageBenefit[] = [
    {
      title: 'Answer every lead',
      description: `Agents pick up calls, texts, and web forms — qualify the job and capture address, scope, and urgency.`,
    },
    {
      title: 'Book while you’re on-site',
      description: `Check calendars, propose times, and confirm appointments without pulling techs off the truck.`,
    },
    {
      title: 'Follow up automatically',
      description: `Send estimates, reminders, and review requests after the job — traced and logged to your CRM.`,
    },
  ];

  return {
    slug: def.slug,
    missionLabel: 'Industry brief',
    title: `The AI Front Office for ${def.name}`,
    description: `AI-powered call handling, booking, and follow-up — built for ${audience}.`,
    overviewTitle: `Run ${lowerName} ops without hiring a front desk`,
    overviewParagraphs: [
      `Missed calls are missed revenue for ${audience}. Trooper agents answer inbound, qualify the request, and book jobs into your calendar — 24/7, with full transcripts and approval gates.`,
      `Dispatchers and owners stay in command: agents draft quotes, send follow-ups, and update CRM records, but nothing goes out without your rules.`,
      `Powered by OpenClaw — connect phone, SMS, email, and field tools your ${lowerName} team already uses.`,
    ],
    benefits,
    howItWorks: [
      'Lead calls, texts, or submits a form — agent answers with your scripts and pricing rules',
      'Agent qualifies the job, checks availability, and books or escalates to a human',
      'Confirmation and prep details sent to the customer; ticket logged in CRM',
      'Post-job follow-up, reviews, and reactivation campaigns run on schedule',
    ],
    relatedTeams: DEFAULT_TEAMS,
    relatedIntegrations: DEFAULT_INTEGRATIONS,
    demoId: def.demoId ?? 'messaging',
    meta: {
      title: `The AI Front Office for ${def.name} | Trooper`,
      description: `AI-powered call handling, booking, and follow-up — built for ${audience}.`,
      canonical: `https://trooper.so/industries/${def.slug}`,
    },
  };
}

const industries: Record<string, IndustryPageContent> = Object.fromEntries(
  INDUSTRY_CATALOG.map((def) => [def.slug, buildIndustry(def)]),
);

export function getIndustryPage(slug: string): IndustryPageContent | undefined {
  return industries[slug];
}

export function allIndustrySlugs(): string[] {
  return INDUSTRY_CATALOG.map((def) => def.slug);
}

export function getIndustryHubCards(): IndustryPageContent[] {
  return INDUSTRY_CATALOG.map((def) => industries[def.slug]);
}

export const industryHubMeta = {
  title: 'Industries | Trooper',
  description:
    'AI front office for home services and field businesses — call handling, booking, dispatch, and follow-up powered by OpenClaw.',
  canonical: 'https://trooper.so/industries',
};
