/** Cast SVG marks for demo AI agents (Jordan / Aria / Leo / Ren). */
export const DEMO_AGENT_CAST = {
  Jordan: 'nova',
  Aria: 'scout',
  Leo: 'pip',
  Ren: 'wren',
} as const;

export type DemoAgentName = keyof typeof DEMO_AGENT_CAST;

/** Cache-busted cast snapshot URL for landing + demo shells. */
export function demoCastAvatarSrc(handle: string): string {
  return `/images/cast/${handle}.svg?v=mickey-cloud-v2`;
}

export function demoAgentAvatarSrc(name: string): string | undefined {
  const handle = DEMO_AGENT_CAST[name as DemoAgentName];
  return handle ? demoCastAvatarSrc(handle) : undefined;
}
