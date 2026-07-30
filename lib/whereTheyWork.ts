import { MAC_DMG_URL } from '@/lib/downloadUrls';

/**
 * Where the work actually happens.
 *
 * Every claim here is checkable against the product repo, because the whole
 * point of the section is that these are real places agents run:
 *
 * - Desktop: the Tauri Mac app ships signed and notarized to MAC_DMG_URL. It
 *   exists precisely because the sandbox can't do what it needs — the product's
 *   own release doc lists "a native helper, background behavior, local HTTP
 *   bridges, OpenClaw coordination, screen/accessibility permissions, global
 *   shortcut behavior, shell integration, and local model support".
 * - Browser: an MV3 extension (Chrome 116+) that claims tabs in the user's own
 *   Chrome profile. Two builds exist in the product repo; the store listing ID
 *   below is hardcoded as a production constant in four separate server and UI
 *   files, so it is the real listing rather than a guess.
 * - Devices: the app calls this surface "Devices" — NOT "control center",
 *   which appears nowhere in either repo. Enrollment is "Connect this Mac" for
 *   the local machine and a rotating connection key for remote ones.
 *
 * Deliberately absent: any Linux claim (no Linux build workflow exists), any
 * mobile app-store link (those URLs are placeholders with no app ID), and
 * anything about desktop speed or battery (the product's own performance doc
 * documents the opposite).
 */
export const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/trooper/ioaibohjnndgbmfpkipamhplihobflgb';

export type WorkSurface = {
  id: 'desktop' | 'browser' | 'devices';
  /** Mono label above the headline. */
  kicker: string;
  headline: string;
  body: string;
  /** Three short proof points, each traceable to a real capability. */
  points: string[];
  cta: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  /** Requirement line, verbatim from the download page where one applies. */
  meta?: string;
};

export const WORK_SURFACES: WorkSurface[] = [
  {
    id: 'desktop',
    kicker: 'On your desktop',
    headline: 'Agents that use your Mac,\nnot a copy of it.',
    body:
      'Install the desktop app and a trooper can wake the machine, open the apps you already own, run shell commands and read what is on screen — with macOS asking your permission first.',
    points: [
      'Opens real apps — Numbers, Finder, your terminal',
      'Runs local models on your own hardware',
      'Screen and accessibility access you grant per machine',
    ],
    cta: { label: 'Download for Mac', href: MAC_DMG_URL, external: true },
    secondary: { label: 'Windows and more', href: '/download' },
    meta: 'macOS 12+ · Universal (Intel & Apple Silicon)',
  },
  {
    id: 'browser',
    kicker: 'In your browser',
    headline: 'Your logged-in browser,\nnot a fresh one.',
    body:
      'The Chrome extension lets a trooper claim a tab in your own profile — so it works inside the tools you are already signed in to, instead of hitting a login wall in some throwaway browser.',
    points: [
      'Uses your existing sessions and cookies',
      'Reads page context, clicks, types and scrolls',
      'Works tab by tab — it claims one, and you can take it back',
    ],
    cta: { label: 'Get the Chrome extension', href: CHROME_WEB_STORE_URL, external: true },
    meta: 'Chrome 116+ · claims tabs you approve',
  },
  {
    id: 'devices',
    kicker: 'Across your machines',
    headline: 'Connect every machine\nyou already own.',
    body:
      'Pair the Mac in the studio, the desktop at home and the box under the desk at the office. Each one shows up in Devices, and any trooper can be sent to whichever machine has the thing it needs.',
    points: [
      'Connect this Mac in one click, remote machines with a key',
      'Every device reports status, so work routes to what is awake',
      'Unlimited connected devices on Trooper Cloud',
    ],
    cta: { label: 'See the plans', href: '/pricing' },
    secondary: { label: 'How it works', href: '/features/browser-control' },
  },
];
