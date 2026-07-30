/**
 * What people say.
 *
 * Pure data — no 'use client', so a server component can import it.
 *
 * `sourceUrl` is deliberately NOT optional. You cannot add a quote to this
 * file without a public link to it, which makes it structurally impossible to
 * ship an unsourced testimonial. The repo already contained a 13-entry
 * testimonial wall inherited from an unrelated template ("switched from
 * Squarespace", "my course landing pages") — that component is deleted, and
 * this type is the reason it cannot come back by accident.
 *
 * To add a quote: append an entry. VoicesSection changes layout on its own
 * as the list grows (single → two-up → hairline grid). No component edits.
 */
export type Voice = {
  id: string;
  /** Verbatim. Don't ellipsis-edit someone's words into a better pull quote. */
  quote: string;
  author: string;
  /** Role and company as the person states it. */
  title: string;
  /** Path under /public/images. Omit for a monogram fallback. */
  avatar?: string;
  /** REQUIRED — the public link the quote can be checked against. */
  sourceUrl: string;
  /** Where the link goes, e.g. 'View on X'. */
  sourceLabel: string;
};

export const VOICES: Voice[] = [
  {
    id: 'garry-tan',
    quote:
      'Placing agent power on your own computer empowers every user and I’m so here for that.',
    author: 'Garry Tan',
    title: 'CEO of Y Combinator',
    avatar: '/images/garry-tan.jpg',
    sourceUrl: 'https://x.com/garrytan',
    sourceLabel: 'View on X',
  },
];

export function getVoices(): Voice[] {
  return VOICES;
}
