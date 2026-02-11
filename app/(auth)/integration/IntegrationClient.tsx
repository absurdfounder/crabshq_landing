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
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{skills.length.toLocaleString()}</span> skills available
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => {
          const isActive = selectedCategory === cat
          const CategoryIcon = cat === 'All' ? LayoutGrid : getCategoryIcon(cat)
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                isActive
                  ? 'bg-black text-white border-black shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <CategoryIcon className="w-4 h-4" />
              {cat}
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                isActive ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {skillCountByCategory[cat] || 0}
              </span>
            </button>
          )
        })}
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