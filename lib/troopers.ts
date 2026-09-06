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
 *
 * Colour system (learned from Gumloop-style agent marks):
 * - UI chrome stays monochrome (ink / line / canvas).
 * - Rainbow lives on identity marks — one saturated solid per trooper.
 * - `accent` = fill for marks/avatars (vivid). `accentDark` = text on tint.
 * - `tint` = soft wash behind names, never a competing UI surface colour.
 * - `mark` = distinct silhouette so agents read apart even in greyscale.
 */

export type TrooperMarkShape =
  | 'clover'
  | 'squircle'
  | 'round-rect'
  | 'pebble'
  | 'circle';

export type Trooper = {
  /** Callsign — short, human, memorable. */
  name: string;
  /** Mailbox handle rendered as `{handle}@trooper.so`. */
  handle: string;
  /** What this trooper is hired for. */
  role: string;
  /** Saturated fill for identity mark + avatar. */
  accent: string;
  /** Darker shade for text on light tints / avatar shoulders. */
  accentDark: string;
  /** Soft wash behind the avatar / name plate. */
  tint: string;
  /** Distinct silhouette for the identity mark. */
  mark: TrooperMarkShape;
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
    accent: '#6bcf8e',
    accentDark: '#1a4d32',
    tint: '#eef9f2',
    mark: 'clover',
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
    accent: '#7ebef0',
    accentDark: '#1a3f5c',
    tint: '#eef6fc',
    mark: 'squircle',
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
    accent: '#f0b45c',
    accentDark: '#5a3a12',
    tint: '#fbf5ea',
    mark: 'round-rect',
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
    accent: '#b49aef',
    accentDark: '#3a2866',
    tint: '#f5f1fc',
    mark: 'pebble',
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
    accent: '#f0a0bc',
    accentDark: '#5a2840',
    tint: '#fcf0f5',
    mark: 'circle',
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
