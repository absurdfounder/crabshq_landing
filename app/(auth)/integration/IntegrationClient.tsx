'use client'

import { useMemo, useRef, useState } from 'react'
import { 
  ExternalLink, 
  LayoutGrid,
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
  Terminal,
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
} from 'lucide-react'
import type { Skill } from '@/app/utils/helper'
import type { LucideIcon } from 'lucide-react'
import { HubCatalogCard } from '@/components/marketing/HubCatalogCard'
import { buildSkillRouteIndex, getSkillPagePath } from '@/lib/skillRoutes'
import { getSkillIconUrl } from '@/lib/skillIcon'

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

function SkillCard({ skill, href }: { skill: Skill; href: string }) {
  return (
    <HubCatalogCard
      href={href}
      title={skill.name}
      description={skill.description}
      category={skill.category}
      viewLabel="View skill →"
      icon={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getSkillIconUrl(skill)}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
          loading="lazy"
        />
      }
    />
  )
}

interface IntegrationClientProps {
  skills: Skill[]
  initialCategory?: string
}

export default function IntegrationClient({ skills, initialCategory }: IntegrationClientProps) {
  const catalogRef = useRef<HTMLDivElement>(null)
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
  const [query, setQuery] = useState('')

  const filteredSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return skills.filter((skill) => {
      if (selectedCategory !== 'All' && skill.category !== selectedCategory) return false
      return !normalizedQuery || [skill.name, skill.description, skill.category]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [skills, selectedCategory, query])

  const skillCountByCategory = useMemo(() => {
    const counts: Record<string, number> = { 'All': skills.length }
    skills.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + 1
    })
    return counts
  }, [skills])

  const skillRouteIndex = useMemo(() => buildSkillRouteIndex(skills), [skills])

  const selectCategory = (category: string) => {
    setSelectedCategory(category)
    requestAnimationFrame(() => catalogRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' }))
  }

  const filterButtons = categories.map((cat) => {
    const isActive = selectedCategory === cat
    const CategoryIcon = cat === 'All' ? LayoutGrid : getCategoryIcon(cat)
    const count = skillCountByCategory[cat] || 0
    return (
      <button
        key={cat}
        type="button"
        onClick={() => selectCategory(cat)}
        aria-pressed={isActive}
        className={`flex w-48 shrink-0 items-center gap-2 px-2 py-1.5 text-left text-sm transition-colors md:w-full ${
          isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        }`}
      >
        <CategoryIcon className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
        <span className="min-w-0 flex-1 truncate">{cat}</span>
        <span className={`font-mono text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>{count.toLocaleString()}</span>
      </button>
    )
  })

  return (
    <div ref={catalogRef} className="mx-auto scroll-mt-[var(--site-header-height)] max-w-7xl border-y border-slate-200 bg-white md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:border-x">
      <aside className="border-b border-slate-200 p-5 md:sticky md:top-[var(--site-header-height)] md:h-[calc(100vh-var(--site-header-height))] md:border-b-0 md:border-r md:p-6">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skills…" className="w-full border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500" />
        </label>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Filter by category</p>
        <div className="mt-3 flex gap-2 overflow-x-auto border-t border-slate-100 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:max-h-[calc(100vh-16rem)] md:overflow-y-auto">{filterButtons}</div>
      </aside>

      <section className="min-h-[calc(100vh-var(--site-header-height))] min-w-0 [overflow-anchor:none]">
        <div className="border-b border-slate-200 px-5 py-6 md:px-8 md:py-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500"><span className="font-semibold text-slate-900 tabular-nums">{filteredSkills.length.toLocaleString()}</span>{' '}{filteredSkills.length === skills.length ? 'skills available' : `of ${skills.length.toLocaleString()} skills`}</p>
          <h2 className="mt-3 font-funneldisplay text-2xl tracking-tight text-slate-950 md:text-3xl">{selectedCategory === 'All' ? 'All skills' : selectedCategory}</h2>
        </div>
        {filteredSkills.length ? <div className="grid gap-4 p-5 sm:grid-cols-2 md:gap-5 md:p-8 xl:grid-cols-3">{filteredSkills.map((skill) => <SkillCard key={skill.id} skill={skill} href={getSkillPagePath(skill, skillRouteIndex)} />)}</div> : <p className="p-8 text-sm text-slate-500">No skills match that search.</p>}
        <div className="border-t border-slate-200 p-8 text-center">
          <a href="https://www.clawhub.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">Explore All Skills on ClawHub <ExternalLink className="h-4 w-4" /></a>
        </div>
      </section>
    </div>
  )
}
