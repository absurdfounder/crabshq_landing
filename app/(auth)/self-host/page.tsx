import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Github, KeyRound, Laptop, Server } from 'lucide-react';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import CatalogHero from '@/components/marketing/CatalogHero';
import PixelButton from '@/components/ui/PixelButton';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import { MAC_DMG_URL, WINDOWS_INSTALLER_URL } from '@/lib/downloadUrls';
import CopyCli from './CopyCli';

export const metadata: Metadata = buildPageMetadata({
  title: 'Self-host Trooper | Open source on your machine',
  description:
    'Run Trooper on a laptop or virtual machine you own. Open source, your API keys, your models. Nothing has to live on our cloud.',
  canonical: 'https://trooper.so/self-host',
  ogKind: 'page',
  ogSlug: 'self-host',
});

const GITHUB_URL = 'https://github.com/Trooper-AI/trooper-core';

const STEPS = [
  {
    n: '01',
    title: 'Install it',
    body: 'Download the Mac or Windows app, or clone the repo and run the CLI. Same product, on hardware you control.',
  },
  {
    n: '02',
    title: 'Add your keys',
    body: 'Point Trooper at Claude, GPT, Grok, Gemini, or a local model. Usage is billed by the provider, not by us.',
  },
  {
    n: '03',
    title: 'Give it work',
    body: 'Assign a loop. Troopers use your tools, come back when they need a sign-off, and keep data on that machine.',
  },
] as const;

const PLACES = [
  {
    icon: Laptop,
    title: 'Your laptop',
    body: 'Mac and Windows apps run the workforce on the computer in front of you. Close the lid and it pauses with you.',
  },
  {
    icon: Server,
    title: 'A VM or VPS',
    body: 'Put Trooper on a virtual machine you already rent. It keeps working when your laptop is off.',
  },
  {
    icon: KeyRound,
    title: 'Your own server',
    body: 'Enterprise can go further: private VPC, on-prem, SSO. The runtime is still yours.',
  },
] as const;

const KEEPS = [
  {
    title: 'The computer is yours',
    body: 'Browser, shell, files, and sessions stay on the machine you installed. Nothing has to phone home to run.',
  },
  {
    title: 'Your keys, your models',
    body: 'Bring Anthropic, OpenAI, xAI, Gemini, or a local model. Swap per trooper. We do not resell tokens.',
  },
  {
    title: 'Approvals that hold',
    body: 'Commits, mail, and campaigns wait in Human Review until you release them. The audit log lives with you.',
  },
] as const;

const FAQS = [
  {
    q: 'Is Trooper open source?',
    a: 'Yes. The core is on GitHub. You can read it, run it, and self-host it.',
  },
  {
    q: 'Do I need the cloud plan?',
    a: 'No. Local install is enough to run troopers on your own machine. Cloud is for hosted workspaces and extra devices.',
  },
  {
    q: 'Can I run it on Linux?',
    a: 'Yes, on a Linux VM or server via the CLI and repo. Desktop apps today are Mac and Windows.',
  },
] as const;

export default function SelfHostPage() {
  return (
    <div className="bg-canvas">
      <Header />
      <CatalogHero
        label="Self-host"
        title="Run Trooper on a machine you own"
        description="Open source. Your keys, your models, your laptop or VM. Give troopers real work without sending the computer to someone else."
        actions={
          <>
            <PixelButton href="/download" size="lg" tone="dark" icon={<ArrowRight className="h-4 w-4" />}>
              Download the app
            </PixelButton>
            <PixelButton
              href={GITHUB_URL}
              external
              size="lg"
              variant="outline"
              tone="dark"
              icon={<Github className="h-4 w-4" />}
            >
              View on GitHub
            </PixelButton>
          </>
        }
      />

      <SectionShell rhythm>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2-section mx-auto">Three steps. Then it is yours.</h2>
          <p className="lede mx-auto">No cluster to provision. Install, connect a key, assign a loop.</p>
        </div>
        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl bg-white px-5 py-6 shadow-xs ring-1 ring-black/5 sm:px-6"
            >
              <p className="font-mono text-[11px] font-medium tracking-wide text-neutral-400">{step.n}</p>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-neutral-800">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SectionShell rhythm>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2-section mx-auto">Local machine or virtual machine</h2>
          <p className="lede mx-auto">Same troopers. You pick where the computer lives.</p>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {PLACES.map((place) => {
            const Icon = place.icon;
            return (
              <article
                key={place.title}
                className="rounded-2xl bg-white px-5 py-6 shadow-xs ring-1 ring-black/5 sm:px-6"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-trooper-50 text-trooper-700">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-neutral-800">
                  {place.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{place.body}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PixelButton href={MAC_DMG_URL} external size="md" tone="dark">
            Mac app
          </PixelButton>
          <PixelButton href={WINDOWS_INSTALLER_URL} external size="md" variant="outline" tone="dark">
            Windows app
          </PixelButton>
          <Link href="/download" className="group link-mono">
            <span>All downloads</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </SectionShell>

      <SectionShell rhythm>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2-section mx-auto">What stays with you</h2>
          <p className="lede mx-auto">Self-hosting is the product, not a locked enterprise extra.</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {KEEPS.map((item) => (
            <article key={item.title} className="border-t border-[var(--color-line)] pt-5">
              <h3 className="font-display text-lg font-medium tracking-tight text-neutral-800">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{item.body}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell rhythm>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2-section mx-auto">Or install from the terminal</h2>
          <p className="lede mx-auto">One command. Then open the app and connect keys.</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <CopyCli />
          <p className="mt-4 text-center text-sm text-neutral-500">
            Source:{' '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-800 underline-offset-2 hover:underline"
            >
              github.com/Trooper-AI/trooper-core
            </a>
          </p>
        </div>
      </SectionShell>

      <SectionShell rhythm>
        <div className="rounded-2xl bg-white px-6 py-10 text-center shadow-xs ring-1 ring-black/5 sm:px-10 sm:py-12">
          <h2 className="h2-section mx-auto">Prefer we run the computer?</h2>
          <p className="lede mx-auto">
            Cloud is the same workforce, hosted. Self-host stays available. You can move later.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <PixelButton href="/pricing" size="md" tone="dark" icon={<ArrowRight className="h-3.5 w-3.5" />}>
              See plans
            </PixelButton>
            <PixelButton
              href="https://app.trooper.so"
              external
              size="md"
              variant="outline"
              tone="dark"
            >
              Open the web app
            </PixelButton>
          </div>
        </div>
      </SectionShell>

      <SectionShell rhythm>
        <div className="mx-auto max-w-2xl">
          <h2 className="h2-section">Questions</h2>
          <dl className="mt-10 space-y-8">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-[var(--color-line)] pt-5">
                <dt className="font-display text-lg font-medium tracking-tight text-neutral-800">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-neutral-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </SectionShell>
    </div>
  );
}
