import { launchScenario } from './launch';
import { codingScenario } from './coding';
import { marketingScenario } from './marketing';
import { salesScenario } from './sales';
import { legalScenario } from './legal';
import { engineeringScenario } from './engineering';
import { operationsScenario } from './operations';
import { slackScenario } from './slack';
import { whatsappScenario } from './whatsapp';
import { messagingScenario } from './messaging';
import { emailScenario } from './email';
import { designScenario } from './design';
import { supportScenario } from './support';
import { financeScenario } from './finance';
import { bdScenario } from './bd';
import { researchScenario } from './research';
import { securityScenario } from './security';
import { prScenario } from './pr';
import { growthScenario } from './growth';
import { browserWorkScenario } from './browserWork';
import { videoEditScenario } from './videoEdit';
import { deviceWorkScenario } from './deviceWork';
import type { DemoScenario, DemoScenarioId } from './types';

export type { DemoScenario, DemoScenarioId, DemoOrg, DemoKanbanTask, ChannelBrand } from './types';

const SCENARIOS: Record<DemoScenarioId, DemoScenario> = {
  launch: launchScenario,
  coding: codingScenario,
  marketing: marketingScenario,
  sales: salesScenario,
  legal: legalScenario,
  engineering: engineeringScenario,
  operations: operationsScenario,
  slack: slackScenario,
  whatsapp: whatsappScenario,
  messaging: messagingScenario,
  email: emailScenario,
  design: designScenario,
  support: supportScenario,
  finance: financeScenario,
  bd: bdScenario,
  research: researchScenario,
  security: securityScenario,
  pr: prScenario,
  growth: growthScenario,
  'browser-work': browserWorkScenario,
  'video-edit': videoEditScenario,
  'device-work': deviceWorkScenario,
};

export function getDemoScenario(id: DemoScenarioId = 'launch'): DemoScenario {
  return SCENARIOS[id] ?? launchScenario;
}

export const DEFAULT_DEMO_SCENARIO_ID: DemoScenarioId = 'launch';

/**
 * What the homepage hero cycles through, one scenario per loop. Ordered so a
 * visitor who watches twice sees a different capability the second time —
 * document work, then live browser work, then video, then desk work on a
 * real machine.
 */
export const HERO_SCENARIO_ROTATION: DemoScenarioId[] = [
  'launch',
  'browser-work',
  'video-edit',
  'device-work',
];
