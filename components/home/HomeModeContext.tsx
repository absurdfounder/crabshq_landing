'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type HomeAgentMode = 'multi' | 'personal'

type HomeModeContextValue = {
  mode: HomeAgentMode
  setMode: (mode: HomeAgentMode) => void
  isPersonal: boolean
  isMulti: boolean
}

const HomeModeContext = createContext<HomeModeContextValue | null>(null)

const STORAGE_KEY = 'trooper.home-agent-mode'

function readInitialMode(): HomeAgentMode {
  if (typeof window === 'undefined') return 'multi'
  try {
    const q = new URLSearchParams(window.location.search).get('mode')
    if (q === 'personal' || q === 'buddy') return 'personal'
    if (q === 'multi' || q === 'team' || q === 'workforce') return 'multi'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'personal' || stored === 'multi') return stored
  } catch {
    /* ignore */
  }
  return 'multi'
}

export function HomeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<HomeAgentMode>('multi')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setModeState(readInitialMode())
    setReady(true)
  }, [])

  const setMode = useCallback((next: HomeAgentMode) => {
    setModeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
      const url = new URL(window.location.href)
      if (next === 'personal') url.searchParams.set('mode', 'personal')
      else url.searchParams.delete('mode')
      window.history.replaceState({}, '', url.toString())
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({
      mode,
      setMode,
      isPersonal: mode === 'personal',
      isMulti: mode === 'multi',
    }),
    [mode, setMode],
  )

  // Avoid a flash of wrong copy after hydration when localStorage says personal.
  return (
    <HomeModeContext.Provider value={value}>
      <div data-home-mode={mode} data-home-mode-ready={ready ? '1' : '0'}>
        {children}
      </div>
    </HomeModeContext.Provider>
  )
}

export function useHomeMode() {
  const ctx = useContext(HomeModeContext)
  if (!ctx) {
    return {
      mode: 'multi' as const,
      setMode: (_: HomeAgentMode) => {},
      isPersonal: false,
      isMulti: true,
    }
  }
  return ctx
}
