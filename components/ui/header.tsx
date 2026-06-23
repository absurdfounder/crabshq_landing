'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown } from 'lucide-react'

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

type DropdownKey = 'features' | 'teams' | null

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const navRef = useRef<HTMLElement>(null)

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
      className={`notranslate fixed top-0 z-[200] w-full border-b border-slate-200 bg-white transition-all duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 border-l border-r border-slate-200 px-3 sm:h-16 sm:gap-4 sm:px-6">
        <TrooperLogo
          asLink
          priority
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
            />
            {primaryNavLinks.map((link) => (
              <li key={link.href} className="relative z-[220]">
                <NavLink
                  href={link.href}
                  label={link.label}
                  onNavigate={() => setOpenDropdown(null)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-[220] ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <TranslateButton />
          </div>

          <PixelButton
            href="https://app.trooper.so"
            external
            size="sm"
            variant="outline"
            tone="dark"
            className="hidden lg:inline-flex"
          >
            Sign in
          </PixelButton>

          <PixelButton
            href="https://app.trooper.so"
            external
            size="sm"
            tone="brand"
            className="hidden lg:inline-flex"
            icon={<ArrowRight className="h-3 w-3" strokeWidth={2.5} />}
          >
            Get started
          </PixelButton>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function NavDropdownItem({
  label,
  title,
  items,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string
  title: string
  items: NavItem[]
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) {
  return (
    <li className="relative z-[210]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-nav-dropdown-toggle
        className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isOpen
            ? 'bg-slate-50 text-slate-900'
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-600' : ''
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
}: {
  href: string
  label: string
  onNavigate?: () => void
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
    >
      {label}
    </a>
  )
}
