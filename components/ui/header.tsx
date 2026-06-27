'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, Github } from 'lucide-react'

import TrooperLogo from '@/components/ui/TrooperLogo'
import MobileMenu from './mobile-menu'
import PixelButton from '@/components/ui/PixelButton'
import TranslateButton from './TranslateButton'
import {
  featureNavItems,
  primaryNavLinks,
  teamNavItems,
  type NavItem,
} from './nav-data'
import TopBar from './TopBar'

type DropdownKey = 'features' | 'teams' | null

const GITHUB_URL = 'https://github.com/Trooper-AI'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const navRef = useRef<HTMLElement>(null)
  const darkNav = false

  useEffect(() => {
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!openDropdown) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (navRef.current?.contains(target)) return
      setOpenDropdown(null)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openDropdown])

  return (
    <header
      translate="no"
      className={`notranslate site-header fixed top-0 z-[200] w-full transition-all duration-200`}
    >
      <TopBar />
      <div
        className={`transition-colors duration-200 transition-shadow duration-200 ${
          darkNav
            ? 'border-b border-white/[0.06] bg-split'
            : `border-b border-[var(--color-line)] bg-canvas ${scrolled ? 'shadow-sm' : ''}`
        }`}
      >
      <div
        className={`mx-auto flex h-14 max-w-7xl items-center gap-3 border-l border-r px-3 sm:h-16 sm:gap-4 sm:px-6 ${
          darkNav ? 'border-white/[0.06]' : 'border-[var(--color-line)]'
        }`}
      >
        <TrooperLogo
          asLink
          priority
          theme={darkNav ? 'dark' : 'light'}
          className="shrink-0"
          characterClassName="h-8 w-8 sm:h-10 sm:w-10 object-contain"
          textClassName="text-[15px] sm:text-lg"
        />

        <nav
          ref={navRef}
          className="hidden flex-1 items-center justify-center lg:flex"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-1">
            <NavDropdownItem
              label="Features"
              title="Features"
              items={featureNavItems}
              isOpen={openDropdown === 'features'}
              onToggle={() =>
                setOpenDropdown(openDropdown === 'features' ? null : 'features')
              }
              onClose={() => setOpenDropdown(null)}
              dark={darkNav}
            />
            <NavDropdownItem
              label="Teams"
              title="AI Teams"
              items={teamNavItems}
              isOpen={openDropdown === 'teams'}
              onToggle={() =>
                setOpenDropdown(openDropdown === 'teams' ? null : 'teams')
              }
              onClose={() => setOpenDropdown(null)}
              dark={darkNav}
            />
            {primaryNavLinks.map((link) => (
              <li key={link.href} className="relative z-[220]">
                <NavLink
                  href={link.href}
                  label={link.label}
                  onNavigate={() => setOpenDropdown(null)}
                  dark={darkNav}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-[220] ml-auto flex items-center gap-2 sm:gap-3">
          <GitHubNavLink dark={darkNav} />

          <div className={`hidden lg:block ${darkNav ? '[&_button]:!text-white/80 [&_button:hover]:!text-white' : ''}`}>
            <TranslateButton />
          </div>

          <PixelButton
            href="https://app.trooper.so"
            external
            size="sm"
            variant="outline"
            tone="dark"
            className={`hidden lg:inline-flex ${
              darkNav
                ? '!border-white/25 !text-white hover:!bg-white/10 focus-visible:!ring-offset-[#141a10]'
                : ''
            }`}
          >
            Sign in
          </PixelButton>

          <PixelButton
            href="https://app.trooper.so"
            external
            size="sm"
            tone="dark"
            className={`hidden lg:inline-flex ${darkNav ? 'focus-visible:!ring-offset-split' : ''}`}
            icon={<ArrowRight className="h-3 w-3" strokeWidth={2.5} />}
          >
            Get started
          </PixelButton>

          <MobileMenu dark={darkNav} />
        </div>
      </div>
      </div>
    </header>
  )
}

function GitHubNavLink({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Trooper on GitHub"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors sm:h-10 sm:w-10 ${
        dark
          ? 'border-white/20 text-white/75 hover:bg-white/10 hover:text-white'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Github className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} />
    </a>
  )
}

function NavDropdownItem({
  label,
  title,
  items,
  isOpen,
  onToggle,
  onClose,
  dark = false,
}: {
  label: string
  title: string
  items: NavItem[]
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  dark?: boolean
}) {
  return (
    <li className="relative z-[210]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-nav-dropdown-toggle
        className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          dark
            ? isOpen
              ? 'bg-white/10 text-white'
              : 'text-white/75 hover:bg-white/10 hover:text-white'
            : isOpen
              ? 'bg-canvas-warm text-ink'
              : 'text-ink-muted hover:bg-canvas-warm hover:text-ink'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            dark
              ? isOpen
                ? 'rotate-180 text-white/80'
                : 'text-white/45'
              : isOpen
                ? 'rotate-180 text-slate-600'
                : 'text-slate-400'
          }`}
        />
      </button>

      {isOpen ? (
        <div
          className="absolute left-1/2 top-full z-[205] mt-2 w-[min(46rem,calc(100vw-2rem))] -translate-x-1/2"
          role="menu"
          data-nav-dropdown-panel
        >
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5">
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {title}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {items.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      role="menuitem"
                      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.bgColor} transition-transform group-hover:scale-105`}
                      >
                        <Icon className={`h-4 w-4 ${item.iconColor}`} strokeWidth={2} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-slate-900 group-hover:text-emerald-600">
                          {item.title}
                        </span>
                        {item.description ? (
                          <span className="mt-0.5 block truncate text-xs text-slate-500">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  )
}

function NavLink({
  href,
  label,
  onNavigate,
  dark = false,
}: {
  href: string
  label: string
  onNavigate?: () => void
  dark?: boolean
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        dark
          ? 'text-white/75 hover:bg-white/10 hover:text-white'
          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {label}
    </a>
  )
}
