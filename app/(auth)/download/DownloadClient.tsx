'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Copy,
  Download,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  Terminal,
} from 'lucide-react';
import Header from '@/components/ui/header';
import PixelButton from '@/components/ui/PixelButton';

type Platform = 'mac' | 'ios' | 'android' | 'web' | 'unknown';

type DownloadItem = {
  label: string;
  detail: string;
  href: string;
  enabled?: boolean;
};

const LOCAL_HOST_INSTALLER =
  'curl -fsSL https://raw.githubusercontent.com/absurdfounder/trooper-bridge/main/setup-local-mac-host.sh | bash';

const pairedCommandExample = [
  'ORG_ID=...',
  'API_URL=https://app.trooper.so',
  'GATEWAY_TOKEN=...',
  'BRIDGE_AUTH_TOKEN=...',
  LOCAL_HOST_INSTALLER,
].join(' \\\n  ');

const macDownloads: DownloadItem[] = [
  {
    label: 'Mac Universal',
    detail: 'Apple Silicon and Intel',
    href: 'https://app.trooper.so/download/mac',
  },
  {
    label: 'Run on this Mac',
    detail: 'Generate a paired local host command',
    href: 'https://app.trooper.so/settings/server',
  },
];

const mobileDownloads: DownloadItem[] = [
  {
    label: 'iPhone and iPad',
    detail: 'Open Trooper on iOS',
    href: 'https://app.trooper.so',
  },
  {
    label: 'Android',
    detail: 'Open Trooper on Android',
    href: 'https://app.trooper.so',
  },
];

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase()
    || navigator.platform?.toLowerCase()
    || '';

  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  if (/mac/.test(platform) || /macintosh/.test(ua)) return 'mac';
  return 'web';
}

const SiApple = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

function DeviceShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-white/15 bg-[#090906] p-3 shadow-2xl shadow-black/40 ${className}`}>
      <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#0f0e0a]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        {children}
      </div>
    </div>
  );
}

function AgentPreview() {
  return (
    <DeviceShell>
      <div className="grid min-h-[260px] grid-cols-1 sm:min-h-[280px] sm:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/10 bg-[#15130f] p-4 sm:border-b-0 sm:border-r">
          <div className="mb-4 h-7 rounded bg-white/10" />
          <div className="space-y-2">
            <div className="h-2.5 w-5/6 rounded bg-white/25" />
            <div className="h-2.5 w-2/3 rounded bg-white/10" />
            <div className="h-2.5 w-4/5 rounded bg-white/10" />
          </div>
          <div className="mt-8 rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="mb-2 h-16 rounded bg-white/10" />
            <div className="h-2 w-4/5 rounded bg-white/20" />
          </div>
        </div>
        <div className="p-4 font-mono text-[11px] leading-relaxed text-emerald-200/80">
          <p className="text-white/70">Trooper</p>
          <p className="mt-4 text-white">Build a launch checklist</p>
          <p className="mt-5 text-white/50">Explored 18 files, 4 services</p>
          <p className="mt-3 text-emerald-300">Done. Drafted the deploy plan.</p>
          <div className="mt-10 rounded border border-white/10 bg-white/[0.03] px-3 py-2 text-white/40">
            Ask a follow-up...
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}

function TerminalPreview() {
  return (
    <DeviceShell>
      <div className="min-h-[280px] p-8 font-mono text-sm leading-7 text-white/80">
        <p className="text-white/40">Question</p>
        <p className="mt-3">Where should this workspace run?</p>
        <p className="mt-5 text-emerald-300">[x] Cloud Computer</p>
        <p className="text-white/45">[ ] This Mac</p>
        <div className="mt-7 border border-white/10 bg-black/20 px-4 py-3 text-white/40">
          Add a follow-up
        </div>
        <p className="mt-5 text-emerald-300">Plan mode ready</p>
        <p className="text-white/40">/ commands · @ files · ! shell</p>
      </div>
    </DeviceShell>
  );
}

function PhonePreview() {
  return (
    <div className="mx-auto flex h-[310px] max-w-[250px] flex-col rounded-[2.2rem] border-[10px] border-[#15140f] bg-[#0f0e0a] shadow-2xl shadow-black/40">
      <div className="mx-auto mt-3 h-7 w-24 rounded-full bg-black" />
      <div className="flex-1 px-5 py-6">
        <div className="mb-5 flex items-center justify-between text-white/45">
          <span className="h-5 w-5 rounded bg-white/15" />
          <span className="h-5 w-5 rounded bg-white/15" />
        </div>
        <div className="mt-10 text-center">
          <div className="mx-auto h-10 w-10 rounded-full bg-emerald-300/20" />
          <p className="mt-5 text-lg font-semibold text-white">Trooper on web</p>
          <p className="mt-2 text-sm leading-relaxed text-white/45">
            Start sessions from your phone, then continue anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}

function SurfaceCard({
  title,
  description,
  preview,
  action,
}: {
  title: string;
  description: string;
  preview: React.ReactNode;
  action: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[520px] flex-col overflow-hidden rounded border border-white/8 bg-[#171610] p-4 sm:p-6">
      <div className="flex-1">{preview}</div>
      <div className="mt-7">
        <h2 className="font-funneldisplay text-2xl tracking-tight text-white">{title}</h2>
        <p className="mt-3 text-lg leading-relaxed text-white/50">{description}</p>
      </div>
      <div className="mt-8">{action}</div>
    </div>
  );
}

function DownloadRow({ item }: { item: DownloadItem }) {
  return (
    <Link
      href={item.href}
      className="group flex items-center justify-between gap-4 border-t border-white/10 py-5 text-white/80 transition hover:text-white"
    >
      <div>
        <p className="text-lg">{item.label}</p>
        <p className="mt-1 text-sm text-white/40">{item.detail}</p>
      </div>
      <Download className="h-5 w-5 text-white/55 transition group-hover:text-white" />
    </Link>
  );
}

function DownloadPanel({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: DownloadItem[];
}) {
  return (
    <div className="rounded border border-white/8 bg-[#171610] p-6 sm:p-7">
      <div className="mb-8 flex items-center gap-3 text-white">
        {icon}
        <h3 className="font-funneldisplay text-2xl">{title}</h3>
      </div>
      {items.map((item) => (
        <DownloadRow item={item} key={item.label} />
      ))}
    </div>
  );
}

function CopyCommandButton({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard?.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-emerald-100"
      aria-label="Copy install command"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function VersionSection() {
  const [open, setOpen] = useState(true);

  return (
    <section className="border-t border-white/10 py-16">
      <div className="mb-10 flex items-center justify-between gap-6">
        <div>
          <p className="text-3xl text-white">
            1.0 <span className="ml-2 rounded-full border border-white/30 px-3 py-1 align-middle text-sm text-white/65">Latest</span>
          </p>
          <p className="mt-3 text-white/45">The first Trooper launch channel for Mac, web, and local host pairing.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="text-white/75 transition hover:text-white"
          aria-label={open ? 'Collapse latest downloads' : 'Expand latest downloads'}
        >
          {open ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="grid gap-4 lg:grid-cols-3">
          <DownloadPanel
            title="macOS"
            icon={<SiApple className="h-6 w-6" />}
            items={macDownloads}
          />
          <DownloadPanel
            title="Local host"
            icon={<Terminal className="h-6 w-6" />}
            items={[
              {
                label: 'Generate paired command',
                detail: 'Required for secure org connection',
                href: 'https://app.trooper.so/settings/server',
              },
              {
                label: 'View installer script',
                detail: 'Underlying Mac helper installer',
                href: 'https://raw.githubusercontent.com/absurdfounder/trooper-bridge/main/setup-local-mac-host.sh',
              },
            ]}
          />
          <DownloadPanel
            title="Mobile and web"
            icon={<Smartphone className="h-6 w-6" />}
            items={mobileDownloads}
          />
        </div>
      ) : null}
    </section>
  );
}

export default function DownloadClient() {
  const [detected, setDetected] = useState<Platform>('unknown');

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  const recommendedHref = detected === 'mac'
    ? 'https://app.trooper.so/download/mac'
    : 'https://app.trooper.so';
  const recommendedLabel = detected === 'mac' ? 'Download for macOS' : 'Open Trooper';

  return (
    <div className="min-h-screen bg-[#100f0a] text-white">
      <Header />

      <main className="mx-auto max-w-[1760px] px-5 pb-20 pt-28 sm:px-8 lg:px-12 xl:px-20">
        <section className="pb-16 pt-20">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-300/80">Download Trooper</p>
              <h1 className="mt-5 font-funneldisplay text-4xl tracking-tight text-white sm:text-5xl">
                Use Trooper everywhere you work
              </h1>
              <p className="mt-3 max-w-3xl text-2xl leading-snug text-white/50">
                One command center for agents across desktop, terminal, browser, and mobile.
              </p>
            </div>
            <PixelButton
              href={recommendedHref}
              external
              size="lg"
              tone="brand"
              icon={detected === 'mac' ? <Download className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            >
              {recommendedLabel}
            </PixelButton>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <SurfaceCard
              title="Desktop"
              description="Run Trooper as a Mac app when you want a focused agent workspace on your machine."
              preview={<AgentPreview />}
              action={
                <Link
                  href="https://app.trooper.so/download/mac"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition hover:bg-white/90"
                >
                  Download for macOS
                  <Download className="h-5 w-5" />
                </Link>
              }
            />

            <SurfaceCard
              title="Terminal"
              description="Pair a Mac as a local Trooper host when you want agents to run on your own machine."
              preview={<TerminalPreview />}
              action={
                <div className="rounded bg-[#1d1b14] p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/35">Paired install command</span>
                    <CopyCommandButton command={pairedCommandExample} />
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-6 text-white/70">
                    <code>{pairedCommandExample}</code>
                  </pre>
                  <p className="mt-3 text-sm leading-relaxed text-white/40">
                    Tokens are generated after sign in. The raw installer alone is not enough to connect an org.
                  </p>
                </div>
              }
            />

            <SurfaceCard
              title="Web"
              description="Start agents from the browser, phone, or a shared device with no install required."
              preview={<PhonePreview />}
              action={
                <Link
                  href="https://app.trooper.so"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition hover:bg-white/90"
                >
                  Start Trooper in Web
                  <ArrowRight className="h-5 w-5" />
                </Link>
              }
            />
          </div>
        </section>

        <section className="py-12">
          <div className="rounded border border-white/8 bg-[#171610] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-300">
                  <Laptop className="h-6 w-6" />
                </div>
                <h2 className="font-funneldisplay text-3xl tracking-tight text-white">
                  Local Mac host setup lives inside Trooper
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/50">
                  Sign in, choose <span className="text-white">Settings - AI Server - This Mac</span>, then run the paired command on the Mac that should host your agents.
                </p>
              </div>
              <div className="rounded bg-[#100f0a] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/35">Underlying installer</span>
                  <CopyCommandButton command={LOCAL_HOST_INSTALLER} />
                </div>
                <pre className="overflow-x-auto font-mono text-sm leading-6 text-emerald-200/80">
                  <code>{LOCAL_HOST_INSTALLER}</code>
                </pre>
                <div className="mt-5 grid gap-3 text-sm text-white/45 sm:grid-cols-3">
                  <div className="rounded border border-white/10 p-3">
                    <Monitor className="mb-2 h-4 w-4 text-emerald-300" />
                    LaunchAgent services
                  </div>
                  <div className="rounded border border-white/10 p-3">
                    <Globe className="mb-2 h-4 w-4 text-emerald-300" />
                    Secure tunnel ready
                  </div>
                  <div className="rounded border border-white/10 p-3">
                    <Clipboard className="mb-2 h-4 w-4 text-emerald-300" />
                    Org heartbeat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <VersionSection />
      </main>
    </div>
  );
}
