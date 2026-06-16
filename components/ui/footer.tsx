'use client';

import Link from 'next/link';

type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

type LinkColumn = {
  title: string;
  links: LinkItem[];
};

const tagline =
  'Execution infrastructure for your AI workforce — autonomous agents that ship work across GitHub, email, browsers, and your stack.';

const linkColumns: LinkColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '/' },
      { label: 'Integrations', href: '/integration' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Download', href: '/download' },
      { label: 'Dashboard', href: 'https://app.trooper.so', external: true },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: 'https://docs.openclaw.ai', external: true },
      { label: 'Blog', href: 'https://app.trooper.so/blog', external: true },
      { label: 'Changelog', href: 'https://app.trooper.so/changelog', external: true },
      { label: 'Features', href: '/features/ai-workforce' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: 'mailto:support@trooper.so' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'OpenClaw', href: 'https://openclaw.ai', external: true },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Twitter (X)', href: 'https://twitter.com/absurdfounder', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/trooper', external: true },
      { label: 'YouTube', href: 'https://www.youtube.com/@trooper', external: true },
      { label: 'Discord', href: 'https://discord.com/invite/clawd', external: true },
    ],
  },
];

function FooterLink({ link }: { link: LinkItem }) {
  const className =
    'text-sm text-white/80 transition-colors hover:text-white';

  if (link.external) {
    return (
      <a
        className={className}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link className={className} href={link.href}>
      {link.label}
    </Link>
  );
}

function LinkColumnBlock({ column }: { column: LinkColumn }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
        {column.title}
      </h3>
      <ul className="space-y-2.5">
        {column.links.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <p className="max-w-md text-base leading-relaxed text-white/90 md:text-lg">
            {tagline}
          </p>

          <div className="grid w-full max-w-2xl grid-cols-2 gap-8 sm:grid-cols-4 lg:max-w-none lg:flex-1">
            {linkColumns.map((column) => (
              <LinkColumnBlock key={column.title} column={column} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-start md:mt-12 md:justify-end">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
            © Boring Sites LLC. All rights reserved.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden pb-2 pt-4 md:pb-4 md:pt-6">
        <p
          aria-hidden
          className="pointer-events-none select-none whitespace-nowrap text-center font-brand lowercase leading-[0.85] tracking-tight text-blue-400/35 text-[clamp(3.5rem,22vw,12rem)]"
        >
          trooper.
        </p>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center"
        >
          <div className="rounded-2xl bg-white/10 p-3 shadow-lg ring-1 ring-white/15 backdrop-blur-sm md:rounded-3xl md:p-4">
            <img
              src="/images/trooper-logomark.png"
              alt=""
              width={1024}
              height={1024}
              className="pixel-render h-12 w-12 object-contain md:h-16 md:w-16"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
