'use client';

import TrooperLogo from '@/components/ui/TrooperLogo';
import PixelButton from '@/components/ui/PixelButton';
import Link from 'next/link';
import { getFaviconUrl } from '@/lib/favicon';
import {
  Twitter,
  Linkedin,
  Youtube,
  Github,
  Users,
  CheckCircle,
  Brain,
  Globe,
  Terminal,
  Mail,
  Puzzle,
  Network,
  Zap,
} from 'lucide-react';

const GITHUB_ORG_URL = 'https://github.com/Trooper-AI';

type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
};

type CellGroup = {
  heading: string;
  links: LinkItem[];
};

type FooterColumn = {
  number: string;
  eyebrow: string;
  groups: CellGroup[];
};

const featureColumn: FooterColumn = {
  number: '02',
  eyebrow: 'Features',
  groups: [
    {
      heading: 'Features',
      links: [
        { label: 'AI Workforce', href: '/features/ai-workforce', icon: <Users className="h-3.5 w-3.5 text-emerald-500" /> },
        { label: 'GitHub Integration', href: '/features/github-integration', icon: <Github className="h-3.5 w-3.5 text-orange-500" /> },
        { label: 'Task Execution', href: '/features/task-execution', icon: <CheckCircle className="h-3.5 w-3.5 text-yellow-500" /> },
        { label: 'Persistent Memory', href: '/features/persistent-memory', icon: <Brain className="h-3.5 w-3.5 text-green-500" /> },
        { label: 'Browser Control', href: '/features/browser-control', icon: <Globe className="h-3.5 w-3.5 text-emerald-500" /> },
        { label: 'System Access', href: '/features/system-access', icon: <Terminal className="h-3.5 w-3.5 text-indigo-500" /> },
        { label: 'Email & Communication', href: '/features/email-automation', icon: <Mail className="h-3.5 w-3.5 text-violet-500" /> },
        { label: 'Chat Anywhere', href: '/features/chat-interfaces', icon: <Mail className="h-3.5 w-3.5 text-green-500" /> },
        { label: 'Messaging Channels', href: '/channels', icon: <Mail className="h-3.5 w-3.5 text-blue-500" /> },
        { label: 'Skills & Plugins', href: '/features/skills-plugins', icon: <Puzzle className="h-3.5 w-3.5 text-pink-500" /> },
        { label: 'Multi-Agent Teams', href: '/features/multi-agent-collaboration', icon: <Network className="h-3.5 w-3.5 text-cyan-500" /> },
        { label: 'Plugin Integrations', href: '/plugin', icon: <Zap className="h-3.5 w-3.5 text-purple-500" /> },
        { label: 'OpenClaw Skills', href: '/integration', icon: <Puzzle className="h-3.5 w-3.5 text-violet-500" /> },
        { label: 'Agent Loops', href: '/loops', icon: <Zap className="h-3.5 w-3.5 text-emerald-600" /> },
      ],
    },
    {
      heading: 'Get help',
      links: [
        { label: 'Contact us', href: 'mailto:support@trooper.so' },
        { label: 'Privacy policy', href: '/privacy' },
        { label: 'Terms of service', href: '/terms' },
      ],
    },
  ],
};

const productColumn: FooterColumn = {
  number: '03',
  eyebrow: 'Product',
  groups: [
    {
      heading: 'Product',
      links: [
        { label: 'How it works', href: '/' },
        { label: 'Plugin Integrations', href: '/plugin' },
        { label: 'OpenClaw Skills', href: '/integration' },
        { label: 'Agent Loops', href: '/loops' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Changelog', href: 'https://app.trooper.so/changelog', external: true },
        { label: 'Download', href: '/download' },
        { label: 'Dashboard', href: 'https://app.trooper.so', external: true },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Industries', href: '/industries' },
        { label: 'Use Cases', href: '/use-cases' },
        { label: 'Alternatives', href: '/alternatives' },
        { label: 'Documentation', href: 'https://docs.openclaw.ai', external: true },
        { label: 'Blog', href: 'https://app.trooper.so/blog', external: true },
        { label: 'Changelog', href: 'https://app.trooper.so/changelog', external: true },
      ],
    },
  ],
};

const ecosystemColumn: FooterColumn = {
  number: '04',
  eyebrow: 'OpenClaw Ecosystem',
  groups: [
    {
      heading: 'OpenClaw Ecosystem',
      links: [
        { label: 'OpenClaw AI', href: 'https://openclaw.ai', external: true },
        { label: 'GitHub OpenClaw', href: 'https://github.com/openclaw/openclaw', external: true },
        { label: 'ClawHub Skills', href: 'https://clawhub.com', external: true },
        { label: 'Discord Community', href: 'https://discord.com/invite/clawd', external: true },
        { label: 'OpenClaw Docs', href: 'https://docs.openclaw.ai', external: true },
      ],
    },
  ],
};

function CellHeader({ number, eyebrow }: { number: string; eyebrow: string }) {
  return (
    <div className="font-silkscreen text-[11px] uppercase tracking-[0.18em] text-slate-500">
      <span className="text-slate-400">[{number}]</span> {eyebrow}
    </div>
  );
}

function LinkList({ links }: { links: LinkItem[] }) {
  return (
    <ul className="space-y-1.5">
      {links.map((l) => {
        const className =
          'group flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900';
        const content = (
          <>
            {l.icon ? <span className="shrink-0">{l.icon}</span> : null}
            <span>{l.label}</span>
          </>
        );
        if (l.external) {
          return (
            <li key={l.label}>
              <a
                className={className}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            </li>
          );
        }
        return (
          <li key={l.label}>
            <Link className={className} href={l.href}>
              {content}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function FooterColumnCell({
  column,
  borderRight,
}: {
  column: FooterColumn;
  borderRight: boolean;
}) {
  return (
    <div
      className={[
        'flex flex-col gap-6 px-6 py-8 md:px-8 md:py-10',
        borderRight ? 'lg:border-r lg:border-slate-100' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <CellHeader number={column.number} eyebrow={column.eyebrow} />
      {column.groups.map((group, gIdx) => (
        <div
          key={group.heading}
          className={gIdx > 0 ? 'border-t border-slate-100 pt-5' : ''}
        >
          {column.groups.length > 1 && (
            <div className="mb-3 text-sm font-semibold text-slate-900">{group.heading}</div>
          )}
          <LinkList links={group.links} />
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  const linkColumns = [featureColumn, productColumn, ecosystemColumn];
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl border-l border-r border-slate-100">
        {/* Cell grid: 1 brand cell + 3 link cells, sharing hairlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand cell */}
          <div className="flex flex-col gap-5 px-6 py-8 md:px-8 md:py-10 lg:border-r lg:border-slate-100 border-b border-slate-100 sm:col-span-2 lg:col-span-1 lg:border-b-0">
            <CellHeader number="01" eyebrow="Trooper" />
            <TrooperLogo
              characterClassName="h-10 w-10 sm:h-11 sm:w-11 object-contain"
              textClassName="text-lg sm:text-xl"
            />
            <p className="text-sm leading-relaxed text-slate-600">
              AI workforce platform powered by OpenClaw. Multiple AI employees executing tasks
              autonomously across GitHub, email, browsers, and your entire tech stack.
            </p>
            <p className="text-sm text-slate-600">
              Built by{' '}
              <a
                className="text-emerald-600 hover:underline"
                href="https://twitter.com/absurdfounder"
                target="_blank"
                rel="noopener noreferrer"
              >
                @absurdfounder
              </a>
              .
            </p>
            <ul className="mt-auto space-y-1.5 pt-2">
              <li>
                <a
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={GITHUB_ORG_URL}
                >
                  <Github className="h-3.5 w-3.5 text-slate-400" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/absurdfounder"
                >
                  <Twitter className="h-3.5 w-3.5 text-slate-400" />
                  <span>Twitter (X)</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/trooper"
                >
                  <Linkedin className="h-3.5 w-3.5 text-slate-400" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/@trooper"
                >
                  <Youtube className="h-3.5 w-3.5 text-slate-400" />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Link cells */}
          {linkColumns.map((col, idx) => {
            const isLast = idx === linkColumns.length - 1;
            const isMobileLast = idx === linkColumns.length - 1;
            return (
              <div
                key={col.number}
                className={[
                  !isMobileLast ? 'border-b border-slate-100 sm:border-b lg:border-b-0' : '',
                  idx % 2 === 0 ? 'sm:border-r sm:border-slate-100 lg:border-r-0' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <FooterColumnCell column={col} borderRight={!isLast} />
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 md:text-sm">
            <span>© Boring Sites LLC. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-slate-900">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-900">
              Terms
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PixelButton
              href={GITHUB_ORG_URL}
              external
              size="sm"
              variant="outline"
              tone="dark"
              ariaLabel="Trooper open source on GitHub"
              icon={<Github className="h-3.5 w-3.5" strokeWidth={2} />}
            >
              Open Source
            </PixelButton>
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-xs font-mono uppercase tracking-[0.12em] text-slate-600 transition-colors hover:text-slate-900 md:text-[11px]"
            >
              <span className="text-slate-400">Powered by</span>
              <img
                src={getFaviconUrl('openclaw.ai', 32)}
                alt="OpenClaw"
                className="h-3.5 w-3.5 rounded-sm"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/trooper-logomark.png';
                }}
              />
              <span className="font-semibold text-slate-700">OpenClaw</span>
            </a>
          </div>
        </div>

        {/* Giant trooper. watermark */}
        <div className="overflow-x-hidden border-t border-slate-100 pb-5 pt-3 sm:pb-6 sm:pt-4 md:pb-8">
          <p
            aria-hidden
            className="pointer-events-none select-none whitespace-nowrap text-center font-brand lowercase leading-none tracking-tight text-slate-200 text-[clamp(2.75rem,18vw,12rem)]"
          >
            trooper.
          </p>
        </div>
      </div>
    </footer>
  );
}
