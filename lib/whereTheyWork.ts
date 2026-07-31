import { MAC_DMG_URL } from '@/lib/downloadUrls';

/**
 * Where the work actually happens.
 *
 * Every claim here is checkable against the product repo, because the whole
 * point of the section is that these are real places agents run:
 *
 * - Desktop: the Tauri Mac app ships signed and notarized to MAC_DMG_URL.
 * - Browser: an MV3 extension (Chrome 116+) that claims tabs in the user's own
 *   Chrome profile.
 * - Devices: enrollment is "Connect this Mac" / connection key for remotes.
 */
export const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/trooper/ioaibohjnndgbmfpkipamhplihobflgb';

export type WorkSurface = {
  id: 'desktop' | 'browser' | 'devices';
  ask: string;
  reply: string;
  headline: string;
  /** Short supporting line — one job, matching the scene. */
  body: string;
  cta: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  meta?: string;
};

export const WORK_SURFACES: WorkSurface[] = [
  {
    id: 'desktop',
    ask: 'trooper, open Numbers and update the Q3 forecast',
    reply: 'on it — waking your Mac',
    headline: 'Works on your desktop.\nControls your apps.',
    body: 'Download the Mac app. Troopers open the software you already use, run commands, and work on your machine — with permission.',
    cta: { label: 'Download for Mac', href: MAC_DMG_URL, external: true },
    secondary: { label: 'Windows and more', href: '/download' },
    meta: 'macOS 12+ · Universal (Intel & Apple Silicon)',
  },
  {
    id: 'browser',
    ask: 'trooper, pull last month from Stripe',
    reply: 'claiming your Chrome tab',
    headline: 'In the browser\nyou’re already signed in to.',
    body: 'The Chrome extension claims a tab in your own profile — Gmail, Stripe, QuickBooks — so work happens where you already are.',
    cta: { label: 'Get the Chrome extension', href: CHROME_WEB_STORE_URL, external: true },
    meta: 'Chrome 116+',
  },
  {
    id: 'devices',
    ask: 'trooper, get the forecast from Home and the ledger from Office',
    reply: 'routing across your machines',
    headline: 'Across every machine\nyou already own.',
    body: 'Pair Home, Office, and the studio Mac. Asks route to whichever machine has the app and the files.',
    cta: { label: 'See the plans', href: '/pricing' },
    secondary: { label: 'How it works', href: '/features/browser-control' },
  },
];
