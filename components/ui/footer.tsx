'use client'

import TrooperLogo from '@/components/ui/TrooperLogo'
import PixelButton from '@/components/ui/PixelButton'
import Link from 'next/link'
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
  Sparkles,
  MessageCircle,
  Zap,
  BookOpen,
  Pen,
  Bell,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl border-l border-r border-slate-200 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-0">
          {/* Brand Section */}
          <div className="w-full md:w-64 md:pr-8">
            <div className="flex items-center gap-2">
              <TrooperLogo
                characterClassName="h-8 w-auto sm:h-9 [image-rendering:pixelated]"
                textClassName="text-lg sm:text-xl"
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              AI workforce platform powered by OpenClaw. Multiple AI employees executing tasks autonomously across GitHub, email, browsers, and your entire tech stack.
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Built by <a className="text-emerald-600 hover:underline" href="https://twitter.com/absurdfounder" target="_blank" rel="noopener noreferrer">@absurdfounder</a>.
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/absurdfounder"
                >
                  <Twitter className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-500 flex-shrink-0" />
                  <span>Twitter (X)</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/trooper"
                >
                  <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-500 flex-shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/@trooper"
                >
                  <Youtube className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-500 flex-shrink-0" />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Links Grid — thin vertical dividers between columns on sm+/md+ */}
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0 md:grid-cols-3 md:border-l md:border-slate-200">
            {/* Features Column */}
            <div className="space-y-6 sm:space-y-8 md:pl-8 md:pr-6">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">Features</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/ai-workforce"
                    >
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 flex-shrink-0" />
                      <span className="break-words">AI Workforce</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/github-integration"
                    >
                      <Github className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" />
                      <span className="break-words">GitHub Integration</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/task-execution"
                    >
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                      <span className="break-words">Task Execution</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/persistent-memory"
                    >
                      <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                      <span className="break-words">Persistent Memory</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/browser-control"
                    >
                      <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 flex-shrink-0" />
                      <span className="break-words">Browser Control</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/system-access"
                    >
                      <Terminal className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500 flex-shrink-0" />
                      <span className="break-words">System Access</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/email-automation"
                    >
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-violet-500 flex-shrink-0" />
                      <span className="break-words">Email & Communication</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/skills-plugins"
                    >
                      <Puzzle className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500 flex-shrink-0" />
                      <span className="break-words">Skills & Plugins</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/features/multi-agent-collaboration"
                    >
                      <Network className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 flex-shrink-0" />
                      <span className="break-words">Multi-Agent Teams</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/integration"
                    >
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" />
                      <span className="break-words">Integrations</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">Get help</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="mailto:support@trooper.so"
                    >
                      <span className="break-words">Contact us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/privacy"
                    >
                      <span className="break-words">Privacy policy</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/terms"
                    >
                      <span className="break-words">Terms of service</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-6 sm:space-y-8 sm:pl-6 sm:border-l sm:border-slate-200 md:pr-6">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">Product</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/"
                    >
                      <span className="break-words">How it works</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/integration"
                    >
                      <span className="break-words">Integrations</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/pricing"
                    >
                      <span className="break-words">Pricing</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://app.trooper.so/changelog"
                    >
                      <span className="break-words">Changelog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="/download"
                    >
                      <span className="break-words">Download</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://app.trooper.so"
                    >
                      <span className="break-words">Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">Resources</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://docs.openclaw.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">Documentation</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://app.trooper.so/blog"
                    >
                      <span className="break-words">Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://app.trooper.so/changelog"
                    >
                      <span className="break-words">Changelog</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* OpenClaw & Community Column */}
            <div className="space-y-6 sm:space-y-8 sm:col-span-2 sm:pt-6 sm:border-t sm:border-slate-200 md:col-span-1 md:pt-0 md:border-t-0 md:pl-6 md:border-l md:border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">OpenClaw Ecosystem</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://openclaw.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">OpenClaw AI</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://github.com/openclaw/openclaw"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">GitHub OpenClaw</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://clawhub.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">ClawHub Skills</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://discord.com/invite/clawd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">Discord Community</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                      href="https://docs.openclaw.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">OpenClaw Docs</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 md:py-8 px-4 sm:px-6 md:px-8 border-t border-l border-r border-slate-200 max-w-7xl mx-auto">
        <div className="text-xs md:text-sm text-slate-700 mb-4 md:mb-0 order-2 md:order-1 flex flex-wrap gap-4">
          © Boring Sites LLC. All rights reserved.{' '}
          <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-900">Terms</Link>
        </div>
        <ul className="flex flex-wrap mb-4 md:mb-0 order-1 md:order-2 gap-3 items-center">

          <li>
            <PixelButton
              href="https://github.com/absurdfounder"
              external
              size="sm"
              variant="outline"
              tone="dark"
              ariaLabel="Track my commits on Github"
              icon={<Github className="h-3.5 w-3.5" strokeWidth={2} />}
            >
              <span className="hidden md:inline">Track my commits</span>
            </PixelButton>
          </li>
          <li>
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center text-slate-600 hover:text-slate-900 bg-white hover:bg-white-100 rounded-md shadow transition duration-150 ease-in-out border px-3 py-1 md:px-4 md:py-1 text-sm"
            >
              <span className="hidden md:inline">Powered by <b className="px-2">🦞 OpenClaw</b></span>
              <span className="md:hidden">🦞 OpenClaw</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}