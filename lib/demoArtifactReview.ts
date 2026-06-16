import type { CSSProperties } from 'react';

/** Line indices + default copy for artifact review demo highlights */

export type ArtifactReviewPhase = 'idle' | 'selecting' | 'composing' | 'saved';

export type ArtifactReviewState = {
  phase: ArtifactReviewPhase;
  selectedLines: number[];
  draftText: string;
};

export const EMPTY_ARTIFACT_REVIEW: ArtifactReviewState = {
  phase: 'idle',
  selectedLines: [],
  draftText: '',
};

export function getArtifactReviewLines(content: string, artifactName?: string): number[] {
  const lines = content.split('\n');

  const verified = lines
    .map((line, i) => (line.includes('✓') || /\bPASS\b/.test(line)) ? i : -1)
    .filter((i) => i >= 0);
  if (verified.length >= 2) return verified.slice(0, 3);

  if (content.includes('@@') || artifactName?.endsWith('.diff')) {
    const adds = lines
      .map((line, i) => (line.startsWith('+') && !line.startsWith('+++')) ? i : -1)
      .filter((i) => i >= 0);
    if (adds.length >= 1) return adds.slice(-3);
  }

  const checked = lines
    .map((line, i) => (/^- \[[xX]\]/.test(line.trim()) ? i : -1))
    .filter((i) => i >= 0);
  if (checked.length >= 1) return checked.slice(-3);

  const nonEmpty = lines.map((line, i) => (line.trim() ? i : -1)).filter((i) => i >= 0);
  if (nonEmpty.length >= 2) return nonEmpty.slice(-3);
  if (nonEmpty.length === 1) return nonEmpty;

  return lines.length > 0 ? [lines.length - 1] : [];
}

export function defaultArtifactReviewComment(content: string, artifactName: string): string {
  if (artifactName.includes('backup') || content.includes('✓')) {
    return 'All three regions verified — OK to mark backup step complete.';
  }
  if (artifactName.endsWith('.diff') || content.includes('@@')) {
    return 'Duplicate invoice removed — reconcile looks correct.';
  }
  if (artifactName.endsWith('.md')) {
    return 'Checklist looks good — budget line still needs sign-off.';
  }
  return 'Looks good — approve this section before we ship.';
}

export function lineHighlightStyle(selected: boolean): CSSProperties {
  if (!selected) return {};
  return {
    background: 'rgba(63,107,0,0.15)',
    borderLeft: '2px solid rgba(63,107,0,0.55)',
    paddingLeft: 8,
    marginLeft: -10,
    paddingRight: 4,
    borderRadius: '0 2px 2px 0',
  };
}
