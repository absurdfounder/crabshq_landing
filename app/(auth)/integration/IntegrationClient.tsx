'use client'

import { useMemo, useState } from 'react'
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

  const skillRouteIndex = useMemo(() => buildSkillRouteIndex(skills), [skills])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span className="font-semibold text-slate-900 tabular-nums">{skills.length.toLocaleString()}</span>{' '}
          skills available
        </p>
      </div>

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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            href={getSkillPagePath(skill, skillRouteIndex)}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="https://www.clawhub.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-sm text-sm font-medium transition-colors"
        >
          Explore All Skills on ClawHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
