import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@trooper/demo';
import type { RelatedLink, UseCasePageContent } from '@/lib/useCaseContent';

export type IndustryPageContent = UseCasePageContent;

type IndustryDef = {
  slug: string;
  name: string;
  /** e.g. "pest control businesses" — defaults from name */
  audience?: string;
  demoId?: DemoScenarioId;
  /** Cover photo for hub / reseller cards */
  coverImage: string;
};

export type IndustryCard = {
  slug: string;
  name: string;
  title: string;
  description: string;
  coverImage: string;
  href: string;
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

/** Curated Unsplash covers — field / home-service atmosphere per vertical */
const INDUSTRY_CATALOG: IndustryDef[] = [
  {
    slug: 'pest-control',
    name: 'Pest Control',
    audience: 'pest control businesses',
    coverImage:
      'https://images.unsplash.com/photo-1670989292166-8b20b9530438?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'hvac',
    name: 'HVAC',
    audience: 'HVAC businesses',
    coverImage:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    audience: 'plumbing businesses',
    coverImage:
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    audience: 'electrical contractors',
    coverImage:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'roofing',
    name: 'Roofing',
    audience: 'roofing contractors',
    coverImage:
      'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'garage-door',
    name: 'Garage Door',
    audience: 'garage door businesses',
    coverImage:
      'https://images.unsplash.com/photo-1692133188474-8c5591e6a6a8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'construction',
    name: 'Construction',
    audience: 'construction companies',
    coverImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'handyman',
    name: 'Handyman',
    audience: 'handyman businesses',
    coverImage:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'home-security',
    name: 'Home Security',
    audience: 'home security companies',
    coverImage:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    audience: 'automotive businesses',
    coverImage:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'dealership-service',
    name: 'Dealership Service',
    audience: 'dealership service departments',
    coverImage:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'painters',
    name: 'Painters',
    audience: 'painting contractors',
    coverImage:
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'interior-designers',
    name: 'Interior Designers',
    audience: 'interior design businesses',
    coverImage:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'home-cleaners',
    name: 'Home Cleaners',
    audience: 'home cleaning businesses',
    coverImage:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'lawn-care',
    name: 'Lawn Care',
    audience: 'lawn care businesses',
    coverImage:
      'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'landscapers',
    name: 'Landscaping',
    audience: 'landscaping businesses',
    coverImage:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'pressure-washers',
    name: 'Pressure Washing',
    audience: 'pressure washing businesses',
    coverImage:
      'https://images.unsplash.com/photo-1581883579507-019c44b711cb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'window-cleaners',
    name: 'Window Cleaning',
    audience: 'window cleaning businesses',
    coverImage:
      'https://images.unsplash.com/photo-1769788161278-8dc624a2d537?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'junk-removal',
    name: 'Junk Removal',
    audience: 'junk removal businesses',
    coverImage:
      'https://images.unsplash.com/photo-1707960186132-cee9548de238?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'movers',
    name: 'Moving',
    audience: 'moving companies',
    coverImage:
      'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'pool-maintenance',
    name: 'Pool Maintenance',
    audience: 'pool service businesses',
    coverImage:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'pet-sitting',
    name: 'Pet Sitting',
    audience: 'pet sitting businesses',
    coverImage:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'restoration-services',
    name: 'Restoration',
    audience: 'restoration contractors',
    coverImage:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'energy',
    name: 'Energy',
    audience: 'energy service businesses',
    coverImage:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
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
      'A lead calls, texts, or submits a form — the agent answers with your scripts and pricing rules',
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

export function getIndustryCards(): IndustryCard[] {
  return INDUSTRY_CATALOG.map((def) => {
    const page = industries[def.slug];
    return {
      slug: def.slug,
      name: def.name,
      title: page.title,
      description: page.description,
      coverImage: def.coverImage,
      href: `/industries/${def.slug}`,
    };
  });
}

export const industryHubMeta = {
  title: 'Industries | Trooper',
  description:
    'AI front office for home services and field businesses — call handling, booking, dispatch, and follow-up powered by OpenClaw.',
  canonical: 'https://trooper.so/industries',
};
