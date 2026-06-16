import type { DemoArtifact, DemoArtifactKind } from '@/components/demoTaskExecution';

type ArtifactInput = {
  name: string;
  kind?: DemoArtifactKind;
  ext?: string;
  content?: string;
  src?: string;
  browserUrl?: string;
  faviconDomain?: string;
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
    browserUrl: input.browserUrl,
    faviconDomain: input.faviconDomain,
    posterSrc: input.posterSrc,
    caption: input.caption,
  };
}

export function assetPath(scenarioId: string, file: string): string {
  return `/demo-assets/${scenarioId}/${file}`;
}

/** Stable external media for demo artifacts — avoids broken local placeholders. */
export const DEMO_MEDIA = {
  linkedinCarousel:
    'https://images.unsplash.com/photo-1611162616475-46b635cb6848?auto=format&fit=crop&w=960&q=80',
  socialVideoPoster:
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=960&q=80',
  socialVideo:
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
} as const;
