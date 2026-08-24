'use client'

import { useEffect, useState, type ComponentType } from 'react'

type DemoProps = {
  scenarioId?: string
  rotate?: boolean
  flush?: boolean
  maxHeight?: number
}

export default function LazyHeroArticleDemo(props: DemoProps) {
  const [Demo, setDemo] = useState<ComponentType<DemoProps> | null>(null)

  useEffect(() => {
    let live = true
    import('@/components/HeroArticleDemo').then((mod) => {
      if (live) setDemo(() => mod.default as ComponentType<DemoProps>)
    })
    return () => {
      live = false
    }
  }, [])

  if (!Demo) {
    return <div className="aspect-[16/10] w-full rounded-xl bg-black/[0.04]" aria-hidden />
  }
  return <Demo {...props} />
}
