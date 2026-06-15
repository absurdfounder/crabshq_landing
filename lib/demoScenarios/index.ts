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
};

export function getDemoScenario(id: DemoScenarioId = 'launch'): DemoScenario {
  return SCENARIOS[id] ?? launchScenario;
}

export const DEFAULT_DEMO_SCENARIO_ID: DemoScenarioId = 'launch';
