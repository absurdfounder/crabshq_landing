export type MaturityLevelId = 'L1' | 'L2' | 'L3' | 'L4';

export type MaturityStepIcon =
  | 'user'
  | 'agent'
  | 'integration'
  | 'goal'
  | 'success'
  | 'escalate';

export type MaturityStep = {
  label: string;
  icon?: MaturityStepIcon;
  /** Favicon domain for integration triggers (e.g. github.com). */
  iconDomain?: string;
  /** When true, consecutive grouped steps render inside a dashed box. */
  grouped?: boolean;
  /** Accent styling for goals / outcomes (typically L3/L4). */
  accent?: boolean;
};

export type MaturityLevel = {
  id: MaturityLevelId;
  headline: string;
  steps: MaturityStep[];
};

export type MaturityLadderContent = {
  /** e.g. "Example — PR review workflow" */
  title: string;
  levels: MaturityLevel[];
};

export const MATURITY_LEVEL_IDS: MaturityLevelId[] = ['L1', 'L2', 'L3', 'L4'];

/** Split steps into ungrouped singles and grouped runs for layout. */
export type MaturityStepBlock =
  | { type: 'single'; step: MaturityStep }
  | { type: 'group'; steps: MaturityStep[] };

export function groupMaturitySteps(steps: MaturityStep[]): MaturityStepBlock[] {
  const blocks: MaturityStepBlock[] = [];
  let i = 0;

  while (i < steps.length) {
    if (steps[i].grouped) {
      const group: MaturityStep[] = [];
      while (i < steps.length && steps[i].grouped) {
        group.push(steps[i]);
        i += 1;
      }
      blocks.push({ type: 'group', steps: group });
    } else {
      blocks.push({ type: 'single', step: steps[i] });
      i += 1;
    }
  }

  return blocks;
}
