import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';
import { codingPlaybookWorkflow } from './coding';
import { marketingPlaybookWorkflow } from './marketing';
import { salesPlaybookWorkflow } from './sales';
import { lawyersPlaybookWorkflow } from './lawyers';
import { engineeringPlaybookWorkflow } from './engineering';
import { operationsPlaybookWorkflow } from './operations';
import { designPlaybookWorkflow } from './design';
import { customerSupportPlaybookWorkflow } from './customer-support';
import { financePlaybookWorkflow } from './finance';
import { businessDevelopmentPlaybookWorkflow } from './business-development';
import { researchPlaybookWorkflow } from './research';
import { securityPlaybookWorkflow } from './security';
import { prPlaybookWorkflow } from './pr';
import { growthPlaybookWorkflow } from './growth';

export const TEAM_PLAYBOOKS: Record<string, PlaybookWorkflowContent> = {
  coding: codingPlaybookWorkflow,
  marketing: marketingPlaybookWorkflow,
  sales: salesPlaybookWorkflow,
  lawyers: lawyersPlaybookWorkflow,
  engineering: engineeringPlaybookWorkflow,
  operations: operationsPlaybookWorkflow,
  design: designPlaybookWorkflow,
  'customer-support': customerSupportPlaybookWorkflow,
  finance: financePlaybookWorkflow,
  'business-development': businessDevelopmentPlaybookWorkflow,
  research: researchPlaybookWorkflow,
  security: securityPlaybookWorkflow,
  pr: prPlaybookWorkflow,
  growth: growthPlaybookWorkflow,
};

export const TEAM_PLAYBOOK_SLUGS = Object.keys(TEAM_PLAYBOOKS);
