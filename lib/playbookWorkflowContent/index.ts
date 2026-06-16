import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';
import type { PluginCatalogItem } from '@/lib/pluginCatalog';
import { TEAM_PLAYBOOKS } from './teams';
import { FEATURE_PLAYBOOKS } from './features';

import overrides from './plugins/overrides.json';
import chunk01 from './plugins/chunks/plugins-chunk-01--21risk-to-biorender.json';
import chunk02 from './plugins/chunks/plugins-chunk-02-bitbucket-to-cody.json';
import chunk03 from './plugins/chunks/plugins-chunk-03-cogedim-to-expofp.json';
import chunk04 from './plugins/chunks/plugins-chunk-04-extracta-ai-to-hyperframes.json';
import chunk05 from './plugins/chunks/plugins-chunk-05-hyperise-to-mixmax.json';
import chunk06 from './plugins/chunks/plugins-chunk-06-mixpanel-to-polygon-io.json';
import chunk07 from './plugins/chunks/plugins-chunk-07-postalytics-to-sendspark.json';
import chunk08 from './plugins/chunks/plugins-chunk-08-sensibo-to-tiktok.json';
import chunk09 from './plugins/chunks/plugins-chunk-09-timecamp-to-zotero.json';

export { codingPlaybookWorkflow } from './teams/coding';
export { githubIntegrationPlaybookWorkflow } from './features/github-integration';

const PLUGIN_PLAYBOOKS: Record<string, PlaybookWorkflowContent> = {
  ...(chunk01 as Record<string, PlaybookWorkflowContent>),
  ...(chunk02 as Record<string, PlaybookWorkflowContent>),
  ...(chunk03 as Record<string, PlaybookWorkflowContent>),
  ...(chunk04 as Record<string, PlaybookWorkflowContent>),
  ...(chunk05 as Record<string, PlaybookWorkflowContent>),
  ...(chunk06 as Record<string, PlaybookWorkflowContent>),
  ...(chunk07 as Record<string, PlaybookWorkflowContent>),
  ...(chunk08 as Record<string, PlaybookWorkflowContent>),
  ...(chunk09 as Record<string, PlaybookWorkflowContent>),
  ...(overrides as Record<string, PlaybookWorkflowContent>),
};

export function getTeamPlaybook(slug: string): PlaybookWorkflowContent {
  const playbook = TEAM_PLAYBOOKS[slug];
  if (!playbook) {
    throw new Error(`Missing team playbook for slug: ${slug}`);
  }
  return playbook;
}

export function getFeaturePlaybook(slug: string): PlaybookWorkflowContent {
  const playbook = FEATURE_PLAYBOOKS[slug];
  if (!playbook) {
    throw new Error(`Missing feature playbook for slug: ${slug}`);
  }
  return playbook;
}

export function getPluginPlaybook(catalog: PluginCatalogItem): PlaybookWorkflowContent {
  const playbook = PLUGIN_PLAYBOOKS[catalog.slug];
  if (!playbook) {
    throw new Error(`Missing plugin playbook for slug: ${catalog.slug}`);
  }
  return playbook;
}

export { TEAM_PLAYBOOKS, FEATURE_PLAYBOOKS };
