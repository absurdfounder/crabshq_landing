'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'

import {
  featureNavItems,
  primaryNavLinks,
  teamNavItems,
  type NavItem,
} from './nav-data'

type AccordionProps = {
  label: string
  items: NavItem[]
  onNavigate?: () => void
  defaultOpen?: boolean
}

function Accordion({ label, items, onNavigate, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold text-slate-900"
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open ? (
        <ul className="grid grid-cols-1 gap-1 pb-3">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-center gap-3 rounded-lg p-2 text-slate-800 active:bg-slate-50"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${item.bgColor}`}
                  >
                    <Icon className={`h-4 w-4 ${item.iconColor}`} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-slate-900">{item.title}</span>
                    {item.description ? (
                      <span className="block truncate text-xs text-slate-500">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default function MobileMenu({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  useEffect(() => {
    close()
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm active:bg-slate-50 sm:h-10 sm:w-10 ${
          dark
            ? 'border-white/20 bg-white/5 text-white active:bg-white/10'
            : 'border-slate-200 bg-white text-slate-900'
        }`}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className="fixed inset-0 z-[250] cursor-default bg-slate-900/50 backdrop-blur-[2px] animate-[fadeIn_.18s_ease-out] lg:hidden"
        />
      ) : null}

      {isOpen ? (
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        className="fixed inset-y-0 right-0 z-[260] flex h-[100dvh] w-[min(88vw,320px)] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out translate-x-0 lg:hidden"
      >
        <div className="flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4">
          <span className="font-display text-base font-bold text-slate-900">Menu</span>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 active:bg-slate-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain bg-white px-4 pb-4">
          <Accordion label="Features" items={featureNavItems} onNavigate={close} defaultOpen />
          <Accordion label="Teams" items={teamNavItems} onNavigate={close} />

          {primaryNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="flex border-b border-slate-100 py-4 text-[15px] font-semibold text-slate-900 active:text-[#009fbc]"
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://app.trooper.so"
            onClick={close}
            className="flex border-b border-slate-100 py-4 text-[15px] font-semibold text-slate-900 active:text-[#009fbc]"
          >
            Sign in
          </a>
        </nav>

        <div className="border-t border-slate-100 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href="https://app.trooper.so"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-3 text-sm font-semibold text-white shadow-sm active:bg-neutral-900"
          >
            Get started free
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/pricing"
            onClick={close}
            className="mt-2 flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 active:bg-slate-50"
          >
            View pricing
          </a>
        </div>
      </aside>
      ) : null}
    </div>
  )
}
