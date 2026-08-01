export type PrimitiveCategory =
  | 'Identity & Legal'
  | 'Money'
  | 'Automation'
  | 'Content'
  | 'Intelligence'
  | 'Market Data'
  | 'Cloud'
  | 'Orchestration'
  | 'Trust & Ops';

export type Primitive = {
  slug: string;
  name: string;
  category: PrimitiveCategory;
  tagline: string;
  description: string;
  endpoint: string;
  featured?: boolean;
  outcomes: string[];
};

const createPrimitive = (
  slug: string,
  name: string,
  category: PrimitiveCategory,
  tagline: string,
  description: string,
  outcomes: string[],
  featured = false,
): Primitive => ({
  slug,
  name,
  category,
  tagline,
  description,
  endpoint: `trooper ${slug} run`,
  outcomes,
  featured,
});

/** The atomic capabilities an agent can call through Trooper. */
export const primitives: Primitive[] = [
  createPrimitive('formation', 'AgentLLC', 'Identity & Legal', 'Incorporate a real US company for your agent.', 'Create an agent-ready business with formation, filings, and essential company records in one workflow.', ['US business formation', 'Document vault', 'Status tracking', 'Agent-ready records'], true),
  createPrimitive('verification', 'AgentKYC', 'Identity & Legal', 'Verify people and businesses before agents act.', 'Collect, validate, and retain identity evidence with a reviewable record for every verification.', ['Identity checks', 'Business verification', 'Decision records', 'Reusable profiles'], true),
  createPrimitive('profile', 'AgentProfile', 'Identity & Legal', 'Create portable identity profiles for every agent.', 'Maintain the legal, operational, and contact context an agent needs without scattering it across tools.', ['Profile records', 'Contact details', 'Permissions context', 'Portable identity']),
  createPrimitive('business', 'AgentBusiness', 'Identity & Legal', 'Manage business entities and their operating details.', 'Keep entity details, ownership, operating status, and business documents together for every agent-run venture.', ['Entity registry', 'Operating status', 'Ownership context', 'Business documents']),
  createPrimitive('auth', 'AgentAuth', 'Identity & Legal', 'Give agents scoped, auditable access.', 'Issue time-bounded credentials and policies so every action is explicitly authorized and easy to review.', ['Scoped credentials', 'Policy checks', 'Expiring access', 'Audit trail']),
  createPrimitive('vault', 'AgentVault', 'Identity & Legal', 'Keep sensitive agent data encrypted and available.', 'Store secrets, agreements, credentials, and generated records behind controlled agent access.', ['Encrypted secrets', 'Document storage', 'Access policies', 'Activity logs']),

  createPrimitive('cards', 'AgentCard', 'Money', 'Scoped virtual cards with hard spend limits.', 'Create purpose-bound spend controls for agents, teams, and workflows with immediate visibility into every charge.', ['Virtual cards', 'Spend limits', 'Merchant controls', 'Transaction history'], true),
  createPrimitive('billing', 'AgentBilling', 'Money', 'Meter usage, issue invoices, and collect payment.', 'Turn agent work into clear usage records, invoices, subscriptions, and reconciled payments.', ['Usage metering', 'Invoices', 'Subscriptions', 'Reconciliation']),
  createPrimitive('wallet', 'AgentWallet', 'Money', 'Hold and move funds with explicit controls.', 'Give agents balances, transfers, and approval rules without exposing broad payment credentials.', ['Balances', 'Transfers', 'Approval rules', 'Ledger entries']),
  createPrimitive('trading', 'AgentTrading', 'Money', 'Execute market actions inside your guardrails.', 'Set trade policies, review intent, and retain a decision trail around every agent-initiated order.', ['Policy checks', 'Order execution', 'Risk limits', 'Decision history']),

  createPrimitive('browser', 'AgentBrowser', 'Automation', 'Use the web like a trained operator.', 'Navigate sites, complete tasks, collect evidence, and hand off browser state without losing context.', ['Managed sessions', 'Form actions', 'Structured outputs', 'Action replay'], true),
  createPrimitive('cron', 'AgentCron', 'Automation', 'Run agents exactly when work needs to happen.', 'Schedule recurring jobs, track their runs, and make time-based work visible to the whole team.', ['Recurring schedules', 'Run history', 'Failure alerts', 'Timezone aware']),
  createPrimitive('webhooks', 'AgentWebhooks', 'Automation', 'React to real-world events in real time.', 'Receive, validate, and route external events into agent workflows with durable delivery records.', ['Event intake', 'Signature validation', 'Routing rules', 'Delivery logs']),

  createPrimitive('audio', 'AgentAudio', 'Content', 'Turn audio into usable work.', 'Transcribe, summarize, classify, and produce audio outputs with an agent-friendly workflow.', ['Transcription', 'Summaries', 'Speaker context', 'Audio generation']),
  createPrimitive('images', 'AgentImages', 'Content', 'Create and transform images on demand.', 'Generate, edit, organize, and deliver visual assets as part of an agent workflow.', ['Generation', 'Edits', 'Asset storage', 'Delivery formats']),
  createPrimitive('video', 'AgentVideo', 'Content', 'Plan, create, and ship video with agents.', 'Move from brief to storyboard, clips, revisions, and delivery through one structured capability.', ['Storyboards', 'Scene generation', 'Timeline edits', 'Exports']),
  createPrimitive('clips', 'AgentClips', 'Content', 'Find the moments worth sharing.', 'Extract, caption, reframe, and package short-form clips from long recordings automatically.', ['Highlight detection', 'Captions', 'Reframing', 'Social-ready exports']),
  createPrimitive('media', 'AgentMedia', 'Content', 'Organize every media asset in one place.', 'Index media, retain metadata, and make content available to the agents that need it.', ['Media library', 'Metadata', 'Searchable assets', 'Usage history']),
  createPrimitive('seo', 'AgentSEO', 'Content', 'Make agent-made content discoverable.', 'Audit pages, generate structured recommendations, and track the work required to improve search presence.', ['Site audits', 'Content briefs', 'Metadata checks', 'Performance tracking']),

  createPrimitive('aeo', 'AgentAEO', 'Intelligence', 'Prepare your knowledge for answer engines.', 'Shape content, entities, and evidence so AI answer engines can confidently surface your work.', ['Entity coverage', 'Answer-ready content', 'Evidence mapping', 'Visibility reports']),
  createPrimitive('brain', 'AgentBrain', 'Intelligence', 'Give every agent durable operating context.', 'Store goals, rules, preferences, and learned decisions in a memory layer agents can use safely.', ['Persistent context', 'Decision memory', 'Policies', 'Shared knowledge']),
  createPrimitive('llm', 'AgentLLM', 'Intelligence', 'Route model work through one reliable interface.', 'Use the right model, tool policy, and output contract for every agent task without rebuilding integrations.', ['Model routing', 'Tool policies', 'Output schemas', 'Usage records']),
  createPrimitive('search', 'AgentSearch', 'Intelligence', 'Research the web with traceable evidence.', 'Search, extract, cite, and summarize external information while keeping source context intact.', ['Web search', 'Source capture', 'Citations', 'Research briefs']),

  createPrimitive('apps', 'AgentApps', 'Market Data', 'Ship full-stack apps from an agent workflow.', 'Create deployable apps with structured requirements, implementation steps, and handoff-ready output.', ['App blueprints', 'Build tasks', 'Deploy targets', 'Release records']),
  createPrimitive('app-data', 'AgentAppData', 'Market Data', 'Understand how apps perform in the real world.', 'Collect product events, user feedback, and operational signals so agents can make better product decisions.', ['Product events', 'Usage analysis', 'Feedback intake', 'Reports']),
  createPrimitive('ecommerce', 'AgentCommerce', 'Market Data', 'Operate storefront work without context switching.', 'Read catalog, order, customer, and inventory data through a capability designed for agent execution.', ['Catalog access', 'Order workflows', 'Inventory signals', 'Customer context']),
  createPrimitive('mobile', 'AgentMobile', 'Market Data', 'Build and operate mobile experiences.', 'Coordinate mobile release work, device feedback, and app-store operations from one agent surface.', ['Release tasks', 'Device context', 'Store operations', 'Feedback loops']),
  createPrimitive('social', 'AgentSocial', 'Market Data', 'Turn social signals into coordinated action.', 'Monitor conversations, prepare posts, and track outcomes across channels without losing the original context.', ['Listening', 'Publishing', 'Engagement signals', 'Campaign reporting']),

  createPrimitive('compute', 'AgentCompute', 'Cloud', 'Provision compute for an agent job.', 'Launch the right isolated resources for a task, then retain the job output and execution record.', ['Isolated workloads', 'Runtime controls', 'Job outputs', 'Cost visibility']),
  createPrimitive('database', 'AgentDatabase', 'Cloud', 'Give agents safe access to structured data.', 'Query, write, and operate databases through explicit schemas, permissions, and audit trails.', ['Schema-aware access', 'Scoped queries', 'Write controls', 'Audit logs']),
  createPrimitive('domains', 'AgentDomains', 'Cloud', 'Provision and manage domains for agent-built products.', 'Connect, configure, and monitor domains with DNS and TLS handled as a clear agent workflow.', ['Domain provisioning', 'DNS management', 'TLS status', 'Tenant mapping'], true),
  createPrimitive('functions', 'AgentFunctions', 'Cloud', 'Run durable functions whenever work arrives.', 'Deploy small, observable units of agent logic that respond to events and return structured results.', ['Event handlers', 'Versioned deploys', 'Observability', 'Structured results']),
  createPrimitive('logs', 'AgentLogs', 'Cloud', 'See exactly what happened in every run.', 'Collect events, traces, and agent reasoning artifacts into a searchable operational timeline.', ['Event streams', 'Run traces', 'Searchable history', 'Alerts']),
  createPrimitive('storage', 'AgentStorage', 'Cloud', 'Store artifacts where agents can safely retrieve them.', 'Manage files, generated assets, and task outputs with access controls and lifecycle policies.', ['Object storage', 'Access controls', 'Artifact versions', 'Lifecycle rules']),
  createPrimitive('sessions', 'AgentSessions', 'Cloud', 'Keep work alive across long-running tasks.', 'Persist browser, tool, and task state so agents can resume without repeating setup.', ['State persistence', 'Session handoff', 'Resume controls', 'Expiry policies']),

  createPrimitive('ceo', 'AgentCEO', 'Orchestration', 'Translate strategy into a living operating plan.', 'Turn a business objective into priorities, owners, checks, and a reviewable plan of record.', ['Strategic plans', 'Priority setting', 'Owner assignment', 'Progress reviews']),
  createPrimitive('employees', 'AgentEmployees', 'Orchestration', 'Compose a workforce from specialist agents.', 'Define agent roles, working rules, and access boundaries for a durable multi-agent organization.', ['Role definitions', 'Team structure', 'Access boundaries', 'Operating rules']),
  createPrimitive('jobs', 'AgentJobs', 'Orchestration', 'Make every unit of work explicit.', 'Create work with goals, inputs, owners, and completion criteria that agents can execute and report on.', ['Job records', 'Inputs and outputs', 'Owner routing', 'Completion checks']),
  createPrimitive('objectives', 'AgentObjectives', 'Orchestration', 'Keep agents aligned on measurable outcomes.', 'Convert intentions into measurable objectives with milestones, evidence, and accountable progress.', ['Objectives', 'Milestones', 'Success evidence', 'Progress updates']),
  createPrimitive('queue', 'AgentQueue', 'Orchestration', 'Route work to the right agent at the right time.', 'Prioritize, delay, retry, and observe work across a reliable execution queue.', ['Priority lanes', 'Retries', 'Scheduling', 'Queue visibility']),
  createPrimitive('tasks', 'AgentTasks', 'Orchestration', 'Coordinate work from request through delivery.', 'Break work into tracked tasks that keep humans and agents aligned on what happens next.', ['Task boards', 'Dependencies', 'Status updates', 'Delivery records']),

  createPrimitive('approvals', 'AgentApprovals', 'Trust & Ops', 'Keep a human in the loop when it matters.', 'Define decision gates, collect approvals, and release work only when the right person has signed off.', ['Approval rules', 'Decision gates', 'Review history', 'Escalations']),
  createPrimitive('connections', 'AgentConnections', 'Trust & Ops', 'Connect the systems your agents already use.', 'Manage integrations, credentials, scopes, and health checks from one operational layer.', ['Integration setup', 'Credential scopes', 'Health checks', 'Connection logs']),
  createPrimitive('email', 'AgentEmail', 'Trust & Ops', 'Give agents a professional inbox and outbox.', 'Read, draft, send, and organize email while preserving thread context and approval controls.', ['Inbox access', 'Drafting', 'Send approvals', 'Thread context']),
  createPrimitive('memory', 'AgentMemory', 'Trust & Ops', 'Retain useful context without losing control.', 'Capture durable facts, task outcomes, and preferences with clear retention and retrieval rules.', ['Long-term memory', 'Retrieval rules', 'Retention controls', 'Context summaries']),
  createPrimitive('phone', 'AgentPhone', 'Trust & Ops', 'Equip agents to make and receive calls.', 'Provision voice numbers, route calls, and retain structured call records for follow-up work.', ['Phone numbers', 'Call routing', 'Transcripts', 'Follow-up tasks']),
];

export const primitiveCategories: PrimitiveCategory[] = [
  'Identity & Legal',
  'Money',
  'Automation',
  'Content',
  'Intelligence',
  'Market Data',
  'Cloud',
  'Orchestration',
  'Trust & Ops',
];

export function getPrimitive(slug: string) {
  return primitives.find((primitive) => primitive.slug === slug);
}

export function primitivePath(slug: string) {
  return `/primitives/${slug}`;
}
