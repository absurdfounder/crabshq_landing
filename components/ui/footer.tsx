'use client'

import Image from 'next/image'
import Logo from '@/public/images/logonew-black.png'
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
    <footer className="border-neutral-200 px-4 sm:px-6 md:px-8 bg-white">
      <div className="mx-auto max-w-7xl py-6 sm:py-8 md:py-12">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-12">
          {/* Brand Section */}
          <div className="w-full md:w-64">
            <div className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="Crabs HQ"
                width={169}
                className="rounded-lg w-32 sm:w-40 md:w-auto"
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
              AI workforce platform powered by OpenClaw. Multiple AI employees executing tasks autonomously across GitHub, email, browsers, and your entire tech stack.
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Built by <a className="text-red-600 hover:underline" href="https://twitter.com/absurdfounder" target="_blank" rel="noopener noreferrer">@absurdfounder</a>.
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
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
                  className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/wondersites"
                >
                  <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-500 flex-shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/@wondersites"
                >
                  <Youtube className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-500 flex-shrink-0" />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Links Grid */}
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3">
            {/* Features Column */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">Features</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/ai-workforce"
                    >
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                      <span className="break-words">AI Workforce</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/github-integration"
                    >
                      <Github className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" />
                      <span className="break-words">GitHub Integration</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/task-execution"
                    >
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                      <span className="break-words">Task Execution</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/persistent-memory"
                    >
                      <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                      <span className="break-words">Persistent Memory</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/browser-control"
                    >
                      <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                      <span className="break-words">Browser Control</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/system-access"
                    >
                      <Terminal className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500 flex-shrink-0" />
                      <span className="break-words">System Access</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/email-automation"
                    >
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-violet-500 flex-shrink-0" />
                      <span className="break-words">Email & Communication</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/skills-plugins"
                    >
                      <Puzzle className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500 flex-shrink-0" />
                      <span className="break-words">Skills & Plugins</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/features/multi-agent-collaboration"
                    >
                      <Network className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 flex-shrink-0" />
                      <span className="break-words">Multi-Agent Teams</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
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
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="mailto:support@wondersites.ai"
                    >
                      <span className="break-words">Contact us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/privacy"
                    >
                      <span className="break-words">Privacy policy</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/terms"
                    >
                      <span className="break-words">Terms of service</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">Product</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/"
                    >
                      <span className="break-words">How it works</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/integration"
                    >
                      <span className="break-words">Integrations</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/pricing"
                    >
                      <span className="break-words">Pricing</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <span className="break-words">Changelog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="https://app.crabshq.com"
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
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="https://docs.openclaw.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">Documentation</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <span className="break-words">Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <span className="break-words">Changelog</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* OpenClaw & Community Column */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">OpenClaw Ecosystem</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="https://openclaw.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">OpenClaw AI</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="https://github.com/openclaw/openclaw"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">GitHub OpenClaw</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="https://clawhub.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">ClawHub Skills</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="https://discord.com/invite/clawd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="break-words">Discord Community</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 md:py-8 border-t border-slate-200 max-w-7xl m-auto">
        <div className="text-xs md:text-sm text-slate-600 mb-4 md:mb-0 order-2 md:order-1 flex flex-wrap gap-4">
          © Boring Sites LLC. All rights reserved.{' '}
          <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-900">Terms</Link>
        </div>
        <ul className="flex flex-wrap mb-4 md:mb-0 order-1 md:order-2 gap-3 items-center">
          <li>
            <Image
              width={199}
              height={35}
              src="https://buildform.ai/wp-content/uploads/2024/09/Frame-2147225210.svg"
              alt=""
              className="attachment-large size-large"
              unoptimized
            />
          </li>
          <li>
            <a
              className="flex justify-center items-center text-slate-600 hover:text-slate-900 bg-white hover:bg-white-100 rounded-md shadow transition duration-150 ease-in-out border px-3 py-1 md:px-4 md:py-1 text-sm"
              aria-label="Github"
              href="https://github.com/absurdfounder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"></path>
              </svg>
              <span className="ml-2 hidden md:inline">Track my commits</span>
            </a>
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