'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Keep heavy client trees out of the first paint. SSR still sends the wrapper;
 * children mount once the node is near the viewport (and optionally only on desktop).
 */
export default function DeferredMount({
  children,
  minHeight = 0,
  desktopOnly = false,
  rootMargin = '320px',
}: {
  children: ReactNode
  minHeight?: number
  desktopOnly?: boolean
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (desktopOnly && !window.matchMedia('(min-width: 1024px)').matches) return
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShow(true)
        io.disconnect()
      },
      { rootMargin },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [desktopOnly, rootMargin])

  return (
    <div ref={ref} style={!show && minHeight ? { minHeight } : undefined}>
      {show ? children : null}
    </div>
  )
}
