'use client'

import { useState } from 'react'
import { Terminal, Copy, Check } from 'lucide-react'

interface SkillDetailClientProps {
  installCommand: string
}

export default function SkillDetailClient({ installCommand }: SkillDetailClientProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback - do nothing
    }
  }

  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 group">
      <Terminal className="w-4 h-4 text-slate-400 flex-shrink-0" />
      <code className="text-sm text-slate-700 font-mono flex-1 truncate">
        {installCommand}
      </code>
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md hover:bg-slate-200 transition-colors flex-shrink-0"
        title="Copy install command"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
        )}
      </button>
    </div>
  )
}
