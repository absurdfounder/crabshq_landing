'use client'

import { useState, useMemo } from 'react'
import { 
  ExternalLink, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles,
  Code2,
  GitBranch,
  BookOpen,
  Globe,
  Cloud,
  MousePointer,
  Image,
  Apple,
  Search,
  Bot,
  FileCode,
  TrendingUp,
  CheckSquare,
  Brain,
  BarChart3,
  DollarSign,
  Play,
  FileText,
  Smartphone,
  Car,
  Heart,
  MessageSquare,
  Mic,
  Home,
  ShoppingCart,
  Calendar,
  FileType,
  Zap,
  Lock,
  LayoutGrid
} from 'lucide-react'
import type { Skill } from '@/app/utils/helper'
import type { LucideIcon } from 'lucide-react'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Coding Agents & IDEs': Code2,
  'Git & GitHub': GitBranch,
  'Moltbook': BookOpen,
  'Web & Frontend Development': Globe,
  'DevOps & Cloud': Cloud,
  'Browser & Automation': MousePointer,
  'Image & Video Generation': Image,
  'Apple Apps & Services': Apple,
  'Search & Research': Search,
  'Clawdbot Tools': Bot,
  'CLI Utilities': Terminal,
  'Marketing & Sales': TrendingUp,
  'Productivity & Tasks': CheckSquare,
  'AI & LLMs': Brain,
  'Data & Analytics': BarChart3,
  'Finance': DollarSign,
  'Media & Streaming': Play,
  'Notes & PKM': FileText,
  'iOS & macOS Development': Smartphone,
  'Transportation': Car,
  'Health & Fitness': Heart,
  'Communication': MessageSquare,
  'Speech & Transcription': Mic,
  'Smart Home & IoT': Home,
  'Shopping & E-commerce': ShoppingCart,
  'Calendar & Scheduling': Calendar,
  'PDF & Documents': FileType,
  'Self-Hosted & Automation': Zap,
  'Security & Passwords': Lock,
}

function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] || LayoutGrid
}

function getFaviconUrl(website: string) {
  return `https://www.google.com/s2/favicons?domain=${website}&sz=64`
}

function SkillCard({ skill }: { skill: Skill }) {
  const [copied, setCopied] = useState(false)
  const CategoryIcon = getCategoryIcon(skill.category)

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
    <div className="group relative flex flex-col p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:border-gray-200 transition-colors">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFaviconUrl(skill.website)}
            alt={skill.name}
            width={32}
            height={32}
            className="w-8 h-8"
            loading="lazy"
          />
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 whitespace-nowrap">
          <CategoryIcon className="w-3.5 h-3.5" />
          {skill.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 mb-5">
        <h3 className="font-semibold text-gray-900 text-base mb-2 tracking-tight">{skill.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{skill.description}</p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {/* Install Command */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 group/cmd border border-gray-100 hover:border-gray-200 transition-colors">
          <Terminal className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <code className="text-xs text-gray-700 truncate flex-1 font-mono">
            {skill.install_command}
          </code>
          <button
            onClick={handleCopy}
            className="p-1 rounded-md hover:bg-gray-200 transition-colors flex-shrink-0"
            title="Copy install command"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-gray-400 group-hover/cmd:text-gray-600" />
            )}
          </button>
        </div>

        {/* View Button */}
        <a
          href={`/integration/${skill.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-200"
        >
          View Details
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}

interface IntegrationClientProps {
  skills: Skill[]
  initialCategory?: string
}

export default function IntegrationClient({ skills, initialCategory }: IntegrationClientProps) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(skills.map(s => s.category)))
    return ['All', ...cats.sort()]
  }, [skills])

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (initialCategory && categories.includes(initialCategory)) {
      return initialCategory
    }
    return 'All'
  })

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
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span className="font-semibold text-slate-900 tabular-nums">{skills.length.toLocaleString()}</span>{' '}
          skills available
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-10 sm:mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-3 sm:mb-4">
          Filter by category
        </p>
        <div className="-mx-4 sm:mx-0">
          <div
            className="overflow-x-auto px-4 sm:px-0 pb-1 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Skill category filters"
          >
            <div className="flex flex-nowrap sm:flex-wrap gap-x-2.5 gap-y-3 sm:gap-x-3 sm:gap-y-3 min-w-0 sm:min-w-full">
              {categories.map(cat => {
                const isActive = selectedCategory === cat
                const CategoryIcon = cat === 'All' ? LayoutGrid : getCategoryIcon(cat)
                const count = skillCountByCategory[cat] || 0
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-2.5 shrink-0 px-3.5 py-2 min-h-[36px] rounded-sm text-sm font-medium transition-colors duration-150 border ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <CategoryIcon className="w-3.5 h-3.5 flex-shrink-0 opacity-80" aria-hidden />
                    <span className="whitespace-nowrap leading-none">{cat}</span>
                    <span
                      className={`font-mono text-[11px] tabular-nums leading-none px-1.5 py-0.5 rounded-sm flex-shrink-0 ${
                        isActive
                          ? 'bg-slate-700/70 text-slate-300'
                          : 'bg-slate-100 text-slate-500 border border-slate-200/80'
                      }`}
                    >
                      {count.toLocaleString()}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center">
        <a
          href="https://www.clawhub.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Explore All Skills on ClawHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}