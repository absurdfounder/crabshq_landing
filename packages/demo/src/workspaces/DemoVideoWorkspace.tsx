'use client';

import type { DemoVideoProject } from '../components/demoTaskExecution';
import VideoEditorCapabilityVisual from './VideoEditorCapabilityVisual';

/**
 * Map demo playhead beats onto the shared editor phases
 * (0 idle → 1 fillers → 2 highlights → 3 cuts → 4 video → 5 graphics → 6 score).
 */
function phaseFromPlayhead(playhead: number): number {
  if (playhead <= 0) return 0;
  if (playhead < 3) return 1;
  if (playhead < 6) return 2;
  if (playhead < 10) return 3;
  if (playhead < 14) return 4;
  if (playhead < 18) return 5;
  return 6;
}

/**
 * Live-demo video workspace — the ChatCut editor mock only. No generation
 * card, no storyboard surface.
 */
export function DemoVideoWorkspace({
  project: _project,
  stage: _stage,
  playhead,
  scenesReady: _scenesReady,
}: {
  project: DemoVideoProject;
  stage: 'storyboard' | 'timeline';
  playhead: number;
  scenesReady: number;
}) {
  const phase = phaseFromPlayhead(playhead);

  return (
    <div data-demo-target="video-workspace" style={{ height: '100%', minHeight: 0 }}>
      <VideoEditorCapabilityVisual focused phase={phase} fill />
    </div>
  );
}
