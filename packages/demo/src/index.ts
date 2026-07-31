/**
 * Public surface of the Trooper demo.
 *
 * Hosts should only ever need `TrooperDemo`. Everything else is exported so the
 * dev harness can mount individual workspaces in isolation — that's the whole
 * reason this lives outside the landing site.
 */

export { default as TrooperDemo } from './TrooperDemo';

export { getDemoScenario, DEFAULT_DEMO_SCENARIO_ID, HERO_SCENARIO_ROTATION } from './scenarios/index';
export type { DemoScenario, DemoScenarioId, DemoOrg, DemoKanbanTask, ChannelBrand } from './scenarios/types';

export { TROOPER_DEMO, KANBAN_COLUMNS } from './components/demoTheme';
export type { DemoColumnId } from './components/demoTheme';

export { setDemoAssetBase } from './lib/favicon';

// Workspaces — mounted directly by the harness.
export { DemoBrowserStream } from './workspaces/DemoBrowserStream';
export { DemoVideoWorkspace } from './workspaces/DemoVideoWorkspace';
export { default as VideoEditorCapabilityVisual } from './workspaces/VideoEditorCapabilityVisual';
export { DemoDesktopWorkspace } from './workspaces/DemoDesktopWorkspace';
export { DemoGenerationCard } from './workspaces/DemoGenerationCard';
export { DemoNodeGraph } from './workspaces/DemoNodeGraph';
export {
  CLAIM_TABS,
  BrowserClaimPage,
  TabFavicon,
  type ClaimTabId,
} from './workspaces/BrowserClaimPanes';
export { DemoTaskModal } from './components/demoTaskModal';
export { DemoKanbanColumn, DemoTaskCard } from './components/DemoKanban';

export { DEMO_KEYFRAMES } from './lib/demoMotion';

/**
 * Pieces the landing's own marketing visuals reuse — favicons, browser chrome,
 * the cursor glyph and the artifact helper. They predate the extraction and are
 * genuinely shared, so they stay part of the public surface rather than being
 * duplicated on the host side.
 */
export { DemoTagBadge, TAG_COLORS } from './components/DemoTagBadge';
export type { DemoTag } from './components/demoTaskExecution';
export { DemoFavicon } from './components/DemoFavicon';
export { DemoBrowserFrame, DemoBrowserTitleBar } from './components/DemoBrowserChrome';
export { DemoCursorGlyph } from './components/DemoCursorGlyph';
export { getProviderDomain } from './lib/demoProviders';
export { a as demoArtifact, assetPath as demoAssetPath, DEMO_MEDIA } from './assets/helpers';
export {
  CANVAS_STATUS_BAR_H,
  CANVAS_TITLE_BAR_H,
  scatterLayout,
  tidyGridLayout,
  wideRowLayout,
  lerpLayouts,
  lerpSizeMap,
} from './lib/canvasDesktopLayout';
export type { DesktopSize } from './lib/canvasDesktopLayout';

export type {
  DemoArtifact,
  DemoBrowserSession,
  DemoDesktopSession,
  DemoGenerationJob,
  DemoVideoProject,
  DemoWorkflowGraph,
  DemoWorkspaceMode,
} from './components/demoTaskExecution';
