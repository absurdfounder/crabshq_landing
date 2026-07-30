/**
 * The Trooper cast.
 *
 * Every trooper is a named character with a handle, an accent colour, and one
 * concrete story of the form `{trooper} {verb} {human}'s {artifact}`. Abstract
 * capability lists ("writes code, runs ads, closes deals") don't stick; a named
 * agent doing one specific job for a named person does.
 *
 * Each story is anchored to a real loop in `public/loops_catalog.json` — the
 * cast is a friendlier index into work the product actually ships, not
 * decoration. Keep `loopSlug` valid: it links straight to /loops/[slug].
 */

export type Trooper = {
  /** Callsign — short, human, memorable. */
  name: string;
  /** Mailbox handle rendered as `{handle}@trooper.so`. */
  handle: string;
  /** What this trooper is hired for. */
  role: string;
  /** Accent used for the avatar, name highlight and handle annotation. */
  accent: string;
  /** Darker shade for avatar shoulders + text on light surfaces. */
  accentDark: string;
  /** Tint used behind the avatar in the cast grid. */
  tint: string;
  /** The human this trooper reports to, in the story. */
  human: string;
  /** Verb phrase, e.g. `ships`. Kept separate so it can be styled inline. */
  verb: string;
  /** The concrete artifact, e.g. `Friday release`. */
  artifact: string;
  /** Longer beat shown in the cast grid. */
  detail: string;
  /** Slug in the loop catalog that backs this story. */
  loopSlug: string;
  /** Display title of the backing loop. */
  loopTitle: string;
};

export const TROOPERS: Trooper[] = [
  {
    name: 'Rex',
    handle: 'rex',
    role: 'Engineering',
    accent: '#3f6b00',
    accentDark: '#284800',
    tint: '#f0f5e6',
    human: 'Priya',
    verb: 'ships',
    artifact: 'Friday release',
    detail:
      'Opens the branch, runs the tests, pushes the fix, and keeps looping until CI is green. Priya reviews the PR, not the diff.',
    loopSlug: 'ship-pr-until-green',
    loopTitle: 'Ship PR Until Green',
  },
  {
    name: 'Nova',
    handle: 'nova',
    role: 'Support',
    accent: '#1d5fa8',
    accentDark: '#123f70',
    tint: '#e7f0fa',
    human: 'Sam',
    verb: 'clears',
    artifact: 'inbox before standup',
    detail:
      'Triages overnight tickets, drafts the replies in Sam’s voice, and holds every send until Sam approves it.',
    loopSlug: 'inbox-triage-with-approval',
    loopTitle: 'Inbox Triage with Approval',
  },
  {
    name: 'Scout',
    handle: 'scout',
    role: 'Growth',
    accent: '#b4530d',
    accentDark: '#7d3907',
    tint: '#fbeee2',
    human: 'Dana',
    verb: 'runs',
    artifact: 'ad tests',
    detail:
      'Ships creative variants, watches spend against the budget Dana set, and kills the losers without being asked.',
    loopSlug: 'meta-ads-ab-test',
    loopTitle: 'Meta Ads A/B Test',
  },
  {
    name: 'Pip',
    handle: 'pip',
    role: 'Operations',
    accent: '#6d3f9e',
    accentDark: '#4a2a6b',
    tint: '#f1eaf9',
    human: 'Ana',
    verb: 'writes',
    artifact: 'morning brief',
    detail:
      'Reads the overnight traffic across every channel and leaves one page on Ana’s desk: what moved, what’s stuck, what needs a decision.',
    loopSlug: 'morning-operator-brief',
    loopTitle: 'Morning Operator Brief',
  },
  {
    name: 'Wren',
    handle: 'wren',
    role: 'Design',
    accent: '#a8175a',
    accentDark: '#74103e',
    tint: '#fbe8f0',
    human: 'Marco',
    verb: 'rebuilds',
    artifact: 'landing page',
    detail:
      'Takes the Figma frame, ships it to staging, screenshots the result, and iterates until it matches the design.',
    loopSlug: 'landing-page-iteration',
    loopTitle: 'Landing Page Iteration',
  },
];

export const TROOPER_BY_HANDLE = new Map(TROOPERS.map((t) => [t.handle, t]));

export function getTrooper(handle: string): Trooper | undefined {
  return TROOPER_BY_HANDLE.get(handle);
}
