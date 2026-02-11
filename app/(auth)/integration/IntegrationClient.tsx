'use client'

import { useState, useMemo } from 'react'
import { ExternalLink, Terminal, Copy, Check } from 'lucide-react'
import type { Skill } from '@/app/utils/helper'

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'Coding Agents & IDEs': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  'Git & GitHub': { bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-600' },
  'Moltbook': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Web & Frontend Development': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'DevOps & Cloud': { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  'Browser & Automation': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  'Image & Video Generation': { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-500' },
  'Apple Apps & Services': { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' },
  'Search & Research': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Clawdbot Tools': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  'CLI Utilities': { bg: 'bg-zinc-50', text: 'text-zinc-700', dot: 'bg-zinc-500' },
  'Marketing & Sales': { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
  'Productivity & Tasks': { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  'AI & LLMs': { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  'Data & Analytics': { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500' },
  'Finance': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  'Media & Streaming': { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', dot: 'bg-fuchsia-500' },
  'Notes & PKM': { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-600' },
  'iOS & macOS Development': { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
  'Transportation': { bg: 'bg-lime-50', text: 'text-lime-700', dot: 'bg-lime-600' },
  'Health & Fitness': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Communication': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Speech & Transcription': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  'Smart Home & IoT': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Shopping & E-commerce': { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-500' },
  'Calendar & Scheduling': { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  'PDF & Documents': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  'Self-Hosted & Automation': { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  'Security & Passwords': { bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-600' },
}

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] || { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' }
}

function getFaviconUrl(website: string) {
  return `https://www.google.com/s2/favicons?domain=${website}&sz=64`
}

function SkillCard({ skill }: { skill: Skill }) {
  const [copied, setCopied] = useState(false)
  const color = getCategoryColor(skill.category)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(skill.install_command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback - do nothing
    }
  }

  return (
    <div className="relative flex flex-col p-5 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-200 h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-white border border-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFaviconUrl(skill.website)}
            alt={skill.name}
            width={24}
            height={24}
            className="w-6 h-6"
            loading="lazy"
          />
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${color.bg} ${color.text} whitespace-nowrap`}>
          {skill.category}
        </span>
      </div>

      <h3 className="font-semibold text-slate-900 text-sm mb-1">{skill.name}</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{skill.description}</p>

      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-1 bg-slate-50 rounded-md px-2 py-1.5 group">
          <Terminal className="w-3 h-3 text-slate-400 flex-shrink-0" />
          <code className="text-[10px] text-slate-600 truncate flex-1 font-mono">
            {skill.install_command}
          </code>
          <button
            onClick={handleCopy}
            className="p-0.5 rounded hover:bg-slate-200 transition-colors flex-shrink-0"
            title="Copy install command"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
            )}
          </button>
        </div>
        <a
          href={`/integration/${skill.id}`}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
        >
          View Skill
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

interface IntegrationClientProps {
  skills: Skill[]
}

export default function IntegrationClient({ skills }: IntegrationClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(skills.map(s => s.category)))
    return ['All', ...cats.sort()]
  }, [skills])

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All') return skills
    return skills.filter(s => s.category === selectedCategory)
  }, [skills, selectedCategory])

  const skillCountByCategory = useMemo(() => {
    const counts: Record<string, number> = { 'All': skills.length }
    skills.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + 1
    })
    return counts
  }, [skills])

  return (
    <div>
      {/* Subtitle */}
      <div className="text-center mb-6">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{skills.length.toLocaleString()}</span> skills from{' '}
          <a
            href="https://github.com/VoltAgent/awesome-openclaw-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 underline underline-offset-2"
          >
            awesome-openclaw-skills
          </a>
          {' '}&middot;{' '}Install via{' '}
          <a
            href="https://www.clawhub.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 underline underline-offset-2"
          >
            ClawHub
          </a>
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(cat => {
          const isActive = selectedCategory === cat
          const color = cat === 'All' ? { bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-500' } : getCategoryColor(cat)
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : `${color.bg} ${color.text} hover:ring-1 hover:ring-slate-200`
              }`}
            >
              {cat !== 'All' && (
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : color.dot}`} />
              )}
              {cat}
              <span className={`text-[10px] ${isActive ? 'text-slate-300' : 'opacity-60'}`}>
                {skillCountByCategory[cat] || 0}
              </span>
            </button>
          )
        })}
      </div>

      {/* Skills grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {/* Browse all CTA */}
      <div className="text-center mt-10">
        <a
          href="https://www.clawhub.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          Browse Skills on ClawHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
