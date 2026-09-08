'use client'

import type { ReactNode } from 'react'
import { HomeModeProvider } from '@/components/home/HomeModeContext'

/** Client boundary so homepage sections can read Personal vs Multiplayer mode. */
export default function HomeModeShell({ children }: { children: ReactNode }) {
  return <HomeModeProvider>{children}</HomeModeProvider>
}
