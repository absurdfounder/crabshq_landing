import type { DemoArtifact, DemoArtifactKind } from '@/components/demoTaskExecution';

type ArtifactInput = {
  name: string;
  kind?: DemoArtifactKind;
  ext?: string;
  content?: string;
  src?: string;
  posterSrc?: string;
  caption?: string;
};

/** Build a demo artifact — prefers checked-in src over inline content. */
export function a(input: ArtifactInput): DemoArtifact {
  const ext = input.ext ?? input.name.split('.').pop() ?? '';
  return {
    name: input.name,
    ext,
    kind: input.kind,
    content: input.content ?? '',
    src: input.src,
    posterSrc: input.posterSrc,
    caption: input.caption,
  };
}

export function assetPath(scenarioId: string, file: string): string {
  return `/demo-assets/${scenarioId}/${file}`;
}
