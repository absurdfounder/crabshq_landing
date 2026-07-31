import { MAC_DMG_URL } from '@/lib/downloadUrls';

/**
 * Desktop / browser / devices capability rows — same section as Capabilities,
 * same chat-bubble + product-frame layout. Claims stay checkable against the
 * product repo (Mac DMG, Chrome MV3 extension, Devices enrollment).
 */
export const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/trooper/ioaibohjnndgbmfpkipamhplihobflgb';

export type WorkSurface = {
  id: 'desktop' | 'browser' | 'devices';
  ask: string;
  reply: string;
  /** Traffic-light window title above the scene. */
  window: string;
  title: string;
  highlight?: string;
  body: string;
  cta: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  meta?: string;
  /** Leading brand icon on the CTA (Apple / Chrome). */
  ctaIcon?: { src: string; invert?: boolean };
};

export const WORK_SURFACES: WorkSurface[] = [
  {
    id: 'desktop',
    ask: 'trooper, open Numbers and update the Q3 forecast',
    reply: 'on it — waking your Mac',
    window: 'Desktop — studio-mac',
    title: 'Works on your desktop.',
    highlight: 'Controls your apps.',
    body: 'Download the Mac app. Troopers open the software you already use, run commands, and work on your machine — with permission.',
    cta: { label: 'Download for Mac', href: MAC_DMG_URL, external: true },
    secondary: { label: 'Windows and more', href: '/download' },
    meta: 'macOS 12+ · Universal (Intel & Apple Silicon)',
    ctaIcon: { src: '/images/platforms/apple.svg', invert: true },
  },
  {
    id: 'browser',
    ask: 'trooper, pull last month from Stripe',
    reply: 'claiming your Chrome tab',
    window: 'Chrome — claimed tab',
    title: 'In the browser',
    highlight: 'you’re already signed in to.',
    body: 'The Chrome extension claims a tab in your own profile — Gmail, Stripe, QuickBooks — so work happens where you already are.',
    cta: { label: 'Get the Chrome extension', href: CHROME_WEB_STORE_URL, external: true },
    meta: 'Chrome 116+',
    ctaIcon: { src: '/images/desktop/dock/chrome.png' },
  },
  {
    id: 'devices',
    ask: 'trooper, get the forecast from Home and the ledger from Office',
    reply: 'routing across your machines',
    window: 'Devices — your fleet',
    title: 'Across every machine',
    highlight: 'you already own.',
    body: 'Pair Home, Office, and the studio Mac. Asks route to whichever machine has the app and the files.',
    cta: { label: 'See the plans', href: '/pricing' },
    secondary: { label: 'How it works', href: '/features/browser-control' },
  },
];
