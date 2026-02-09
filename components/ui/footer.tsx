'use client'

import Image from 'next/image'
import Logo from '@/public/images/logonew-black.png'
import Link from 'next/link'
import {
  Twitter,
  Linkedin,
  Youtube,
  Sparkles,
  Bot,
  Image as ImageIcon,
  MessageCircle,
  Code,
  Globe,
  Lock,
  MessageSquare,
  Plug,
  Chrome,
  BookOpen,
  Pen,
  Users,
  Bell,
  Heart,
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
            The AI agent that keeps your help center, blog, changelog, and documentation up to date.
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Lead by <a className="text-orange-600 hover:underline" href="https://twitter.com/absurdfounder" target="_blank" rel="noopener noreferrer">@absurdfounder</a>.
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
                      href="#"
                    >
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-sky-500 flex-shrink-0" />
                      <span className="break-words">Notion Integration</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                      <span className="break-words">AI-Agents</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" />
                      <span className="break-words">Custom Themes</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 flex-shrink-0" />
                      <span className="break-words">Forms & Widgets</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <Code className="h-3 w-3 sm:h-4 sm:w-4 text-violet-500 flex-shrink-0" />
                      <span className="break-words">Custom Code</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500 flex-shrink-0" />
                      <span className="break-words">Custom Domains</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-stone-500 flex-shrink-0" />
                      <span className="break-words">SEO Ready</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-lime-600 flex-shrink-0" />
                      <span className="break-words">Analytics</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/integration"
                    >
                      <Plug className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                      <span className="break-words">Integrations</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/create-a-chrome-extension"
                    >
                      <Chrome className="h-3 w-3 sm:h-4 sm:w-4 text-amber-800/30 flex-shrink-0" />
                      <span className="break-words">Chrome Extension</span>
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
                      href="/showcase"
                    >
                      <span className="break-words">Showcase</span>
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
                      href="#"
                    >
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-sky-500 flex-shrink-0" />
                      <span className="break-words">Help Center</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <Pen className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                      <span className="break-words">Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/showcase"
                    >
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-violet-500 flex-shrink-0" />
                      <span className="break-words">Case studies</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="#"
                    >
                      <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-lime-500 flex-shrink-0" />
                      <span className="break-words">Changelog</span>
                    </Link>
                  </li>

                </ul>
              </div>
            </div>

            {/* Alternatives Column */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">Alternatives</span>
                <ul className="mt-2 sm:mt-3 space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/helpdocs-io"
                    >
                      <span className="break-words">Helpdocs.io alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/mintlify"
                    >
                      <span className="break-words">Mintlify alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/zendesk-help-center"
                    >
                      <span className="break-words">Zendesk Help Center alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/intercom-help-center"
                    >
                      <span className="break-words">Intercom Help Center alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/docusaurus"
                    >
                      <span className="break-words">Docusaurus alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/gitbook"
                    >
                      <span className="break-words">GitBook alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/document360"
                    >
                      <span className="break-words">Document360 alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/proprofs-kb"
                    >
                      <span className="break-words">ProProfs KB alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/zoho-desk"
                    >
                      <span className="break-words">Zoho Desk alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/help-scout"
                    >
                      <span className="break-words">Help Scout alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/helpjuice"
                    >
                      <span className="break-words">Helpjuice alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/knowledgeowl"
                    >
                      <span className="break-words">KnowledgeOwl alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/archbee"
                    >
                      <span className="break-words">Archbee alternative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 transition-colors hover:text-neutral-800"
                      href="/compare-against/stonly"
                    >
                      <span className="break-words">Stonly alternative</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 md:py-8 border-t border-slate-200 max-w-9xl">
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
              href="https://bags.fm/FpTvUc2MuoeegL8Tw1QjY8wwBACv7sg5u7gN3yG2BAGS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center text-slate-600 hover:text-slate-900 bg-white hover:bg-white-100 rounded-md shadow transition duration-150 ease-in-out border px-3 py-1 md:px-4 md:py-1 text-sm"
            >
              View <b className="px-2">$WONDER</b> on
              <Image
                src="https://bags.fm/assets/images/bags-icon.png"
                alt="Bags Logo"
                width={24}
                height={24}
                className="mx-1 sm:mx-2 w-5 h-5 sm:w-6 sm:h-6 object-contain brightness-0 p-0.5"
                unoptimized
              />
              Bags
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.notion.com/integrations/wonder-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center text-slate-600 hover:text-slate-900 bg-white hover:bg-white-100 rounded-md shadow transition duration-150 ease-in-out border px-3 py-1 md:px-4 md:py-1 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="12 0.19 487.619 510.941"
                className="w-5 h-5 md:w-6 md:h-6 mr-2 p-0.5"
              >
                <path
                  d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934L358.186 335.22V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className="hidden md:inline">Notion Certified <b className="px-2">Partner</b></span>
              <span className="md:hidden">Notion Partner</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
