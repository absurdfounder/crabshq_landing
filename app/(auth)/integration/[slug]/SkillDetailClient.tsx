'use client'

import { useState } from 'react'
import { Terminal, Copy, Check, ChevronDown, ChevronRight, FileText, ExternalLink } from 'lucide-react'

interface SkillDetailClientProps {
  installCommand: string
  skillName?: string
  skillDescription?: string
  category?: string
  website?: string
  githubLink?: string
}

function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left group"
      >
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-700 font-mono">{title}</h3>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5 text-sm text-slate-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback - do nothing
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-slate-200 transition-colors flex-shrink-0"
      title={label || "Copy to clipboard"}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400 hover:text-slate-600" />
      )}
    </button>
  )
}

function FileExplorer({ skillName, githubLink }: { skillName: string; githubLink: string }) {
  const files = [
    { name: 'SKILL.md', description: 'Skill definition and instructions' },
    { name: '_meta.json', description: 'Metadata and configuration' },
    { name: 'EXAMPLES.md', description: 'Usage examples' },
    { name: 'REFERENCE.md', description: 'Detailed reference docs' },
    { name: 'setup.json', description: 'Setup and dependencies' },
  ]

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200">
        <span className="text-xs font-mono text-slate-500">Files in {skillName}/</span>
      </div>
      <div className="divide-y divide-slate-100">
        {files.map((file) => (
          <a
            key={file.name}
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
          >
            <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-sm font-mono text-slate-700 group-hover:text-slate-900">{file.name}</span>
            <span className="text-xs text-slate-400 ml-auto hidden sm:block">{file.description}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function SkillDetailClient({
  installCommand,
  skillName = '',
  skillDescription = '',
  category = '',
  website = '',
  githubLink = ''
}: SkillDetailClientProps) {
  return (
    <div className="space-y-6">
      {/* Install command block */}
      <div>
        <h2 className="text-sm font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">Installation</h2>
        <div className="flex items-center gap-2 bg-slate-900 rounded-lg px-4 py-3 group">
          <Terminal className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <code className="text-sm text-green-400 font-mono flex-1 truncate select-all">
            {installCommand}
          </code>
          <CopyButton text={installCommand} label="Copy install command" />
        </div>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Or install manually: copy to <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">~/.openclaw/skills/</code> (global) or <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">&lt;project&gt;/skills/</code> (workspace)
        </p>
      </div>

      {/* File explorer */}
      {githubLink && (
        <FileExplorer skillName={skillName} githubLink={githubLink} />
      )}

      {/* Collapsible content sections */}
      <div className="mt-6">
        <CollapsibleSection title="Overview" defaultOpen={true}>
          <p>{skillDescription || `${skillName} is an OpenClaw skill that extends AI agent capabilities. It can be installed globally or per-workspace and is compatible with all OpenClaw-powered agents on CrabsHQ.`}</p>
        </CollapsibleSection>

        <CollapsibleSection title="How this skill works">
          <p>When installed, this skill becomes available to your AI agents on CrabsHQ. The agent can invoke it when relevant tasks are detected based on trigger phrases and context. Skills operate within the agent&apos;s sandbox and follow the permissions and access levels configured in your workspace.</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Automatically activated when matching triggers are detected</li>
            <li>Runs within the agent&apos;s execution sandbox</li>
            <li>Follows workspace permission settings</li>
            <li>Can be combined with other installed skills</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="When to use it">
          <ul className="list-disc pl-5 space-y-1">
            <li>When you need to extend your AI agent&apos;s capabilities in the <strong>{category}</strong> domain</li>
            <li>To automate repetitive tasks related to {skillName.toLowerCase()}</li>
            <li>When building multi-agent workflows that require specialized functionality</li>
            <li>To leverage community-maintained, battle-tested implementations</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Best practices">
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Test in development first</strong> — Install in a test workspace before deploying to production agents.</li>
            <li><strong>Review the SKILL.md</strong> — Understand what the skill does and what permissions it requires before installing.</li>
            <li><strong>Keep skills updated</strong> — Re-run the install command periodically to get the latest version.</li>
            <li><strong>Combine with related skills</strong> — Skills in the same category often work well together for complex workflows.</li>
            <li><strong>Monitor agent behavior</strong> — Check agent logs to ensure the skill is being triggered appropriately.</li>
          </ol>
        </CollapsibleSection>

        <CollapsibleSection title="FAQ">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-slate-700">How do I uninstall this skill?</p>
              <p className="mt-1">Remove the skill folder from <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">~/.openclaw/skills/{skillName.toLowerCase()}/</code> or your project&apos;s <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">skills/</code> directory.</p>
            </div>
            <div>
              <p className="font-medium text-slate-700">Can I customize this skill?</p>
              <p className="mt-1">Yes. After installing, you can modify the SKILL.md and configuration files to tailor the skill to your specific needs.</p>
            </div>
            <div>
              <p className="font-medium text-slate-700">Is this skill compatible with all agents?</p>
              <p className="mt-1">This skill works with any OpenClaw-compatible agent on CrabsHQ, including ClawdBot and MoltBot-based agents.</p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}
