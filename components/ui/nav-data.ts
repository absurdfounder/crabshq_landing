import type { LucideIcon } from 'lucide-react'
import {
  Brain,
  Briefcase,
  CheckCircle,
  Code,
  DollarSign,
  FlaskConical,
  Github,
  Globe,
  Headphones,
  Mail,
  Megaphone,
  MessageCircle,
  Network,
  Palette,
  Puzzle,
  Radio,
  Rocket,
  Scale,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

export type NavItem = {
  href: string
  title: string
  description?: string
  icon: LucideIcon
  iconColor: string
  bgColor: string
}

export const featureNavItems: NavItem[] = [
  { href: '/features/ai-workforce', title: 'AI Workforce', description: 'Multiple AI employees working together', icon: Users, iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { href: '/features/github-integration', title: 'GitHub Integration', description: 'Autonomous commits, PRs, and code reviews', icon: Github, iconColor: 'text-slate-700', bgColor: 'bg-slate-50' },
  { href: '/features/task-execution', title: 'Task Execution', description: 'End-to-end task completion, not just answers', icon: CheckCircle, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/features/persistent-memory', title: 'Persistent Memory', description: 'Remembers context across all tasks', icon: Brain, iconColor: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { href: '/features/browser-control', title: 'Browser Control', description: 'Navigate web, fill forms, extract data', icon: Globe, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/features/system-access', title: 'Full System Access', description: 'Execute scripts, manage files, run commands', icon: Terminal, iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { href: '/features/email-automation', title: 'Email & Communication', description: 'Gmail, Slack, Discord integration', icon: Mail, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/features/skills-plugins', title: 'Skills & Plugins', description: 'Extend with community or custom skills', icon: Puzzle, iconColor: 'text-violet-500', bgColor: 'bg-violet-50' },
  { href: '/features/multi-agent-collaboration', title: 'Multi-Agent Teams', description: 'AI employees collaborate on complex tasks', icon: Network, iconColor: 'text-cyan-500', bgColor: 'bg-cyan-50' },
  { href: '/features/openclaw-powered', title: 'OpenClaw Runtime', description: 'Built on the proven OpenClaw framework', icon: Sparkles, iconColor: 'text-pink-500', bgColor: 'bg-pink-50' },
  { href: '/integration', title: 'Integrations', description: 'GitHub, Gmail, Notion, APIs & more', icon: Zap, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/features/chat-interfaces', title: 'Chat Anywhere', description: 'WhatsApp, Telegram, Discord, Slack, Signal', icon: MessageCircle, iconColor: 'text-green-500', bgColor: 'bg-green-50' },
]

export const teamNavItems: NavItem[] = [
  { href: '/teams/marketing', title: 'Marketing', description: 'AI-powered campaigns & strategies', icon: Megaphone, iconColor: 'text-pink-500', bgColor: 'bg-pink-50' },
  { href: '/teams/sales', title: 'Sales', description: 'Intelligent lead gen & deal closing', icon: TrendingUp, iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { href: '/teams/engineering', title: 'Engineering', description: 'Automated development & code reviews', icon: Code, iconColor: 'text-slate-600', bgColor: 'bg-slate-50' },
  { href: '/teams/design', title: 'Design', description: 'Creative design & brand assets', icon: Palette, iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { href: '/teams/customer-support', title: 'Customer Support', description: '24/7 support & customer success', icon: Headphones, iconColor: 'text-green-500', bgColor: 'bg-green-50' },
  { href: '/teams/operations', title: 'Operations', description: 'Process automation & optimization', icon: Settings, iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { href: '/teams/finance', title: 'Finance', description: 'Financial planning & analysis', icon: DollarSign, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/teams/legal', title: 'Legal', description: 'Contract review & compliance', icon: Scale, iconColor: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { href: '/teams/business-development', title: 'Business Development', description: 'Partnership & growth opportunities', icon: Briefcase, iconColor: 'text-cyan-500', bgColor: 'bg-cyan-50' },
  { href: '/teams/research', title: 'Research', description: 'Market research & data analysis', icon: FlaskConical, iconColor: 'text-violet-500', bgColor: 'bg-violet-50' },
  { href: '/teams/security', title: 'Security', description: 'Security audits & threat detection', icon: Shield, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/teams/pr', title: 'PR', description: 'Public relations & media management', icon: Radio, iconColor: 'text-fuchsia-500', bgColor: 'bg-fuchsia-50' },
  { href: '/teams/growth', title: 'Growth', description: 'User acquisition & retention', icon: Rocket, iconColor: 'text-amber-500', bgColor: 'bg-amber-50' },
]

export const primaryNavLinks = [
  { href: '/integration', label: 'Skills' },
  { href: '/download', label: 'Download' },
  { href: '/pricing', label: 'Pricing' },
] as const
