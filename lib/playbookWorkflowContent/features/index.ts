import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';
import { aiWorkforcePlaybookWorkflow } from './ai-workforce';
import { githubIntegrationPlaybookWorkflow } from './github-integration';
import { taskExecutionPlaybookWorkflow } from './task-execution';
import { persistentMemoryPlaybookWorkflow } from './persistent-memory';
import { browserControlPlaybookWorkflow } from './browser-control';
import { systemAccessPlaybookWorkflow } from './system-access';
import { emailAutomationPlaybookWorkflow } from './email-automation';
import { skillsPluginsPlaybookWorkflow } from './skills-plugins';
import { multiAgentCollaborationPlaybookWorkflow } from './multi-agent-collaboration';
import { openclawPoweredPlaybookWorkflow } from './openclaw-powered';
import { chatInterfacesPlaybookWorkflow } from './chat-interfaces';
import { LEGACY_FEATURE_PLAYBOOKS } from './legacy';

export const FEATURE_PLAYBOOKS: Record<string, PlaybookWorkflowContent> = {
  'ai-workforce': aiWorkforcePlaybookWorkflow,
  'github-integration': githubIntegrationPlaybookWorkflow,
  'task-execution': taskExecutionPlaybookWorkflow,
  'persistent-memory': persistentMemoryPlaybookWorkflow,
  'browser-control': browserControlPlaybookWorkflow,
  'system-access': systemAccessPlaybookWorkflow,
  'email-automation': emailAutomationPlaybookWorkflow,
  'skills-plugins': skillsPluginsPlaybookWorkflow,
  'multi-agent-collaboration': multiAgentCollaborationPlaybookWorkflow,
  'openclaw-powered': openclawPoweredPlaybookWorkflow,
  'chat-interfaces': chatInterfacesPlaybookWorkflow,
  ...LEGACY_FEATURE_PLAYBOOKS,
};

export const FEATURE_PLAYBOOK_SLUGS = Object.keys(FEATURE_PLAYBOOKS);
