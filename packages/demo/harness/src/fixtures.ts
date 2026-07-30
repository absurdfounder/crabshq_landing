/**
 * Fixture data for mounting a single workspace with no reel around it.
 *
 * These pull from the real scenarios rather than inventing parallel data, so
 * what you see in `/workspace/video` is exactly what the reel will show.
 */
import { getDemoScenario } from '@demo/scenarios/index';

const browserWork = getDemoScenario('browser-work');
const videoEdit = getDemoScenario('video-edit');
const deviceWork = getDemoScenario('device-work');

export const FIXTURES = {
  browser: {
    label: 'Live browser',
    scenario: 'browser-work' as const,
    session: browserWork.browserSession!,
  },
  video: {
    label: 'Video editor',
    scenario: 'video-edit' as const,
    project: videoEdit.videoProject!,
  },
  generation: {
    label: 'Generation',
    scenario: 'video-edit' as const,
    jobs: videoEdit.generationJobs ?? [],
  },
  desktop: {
    label: 'Agent desktop',
    scenario: 'device-work' as const,
    session: deviceWork.desktopSession!,
  },
  nodes: {
    label: 'Routine graph',
    scenario: 'device-work' as const,
    graph: deviceWork.workflowGraph!,
  },
} as const;

export type WorkspaceKey = keyof typeof FIXTURES;
