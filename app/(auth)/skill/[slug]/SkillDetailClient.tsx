'use client'

import { useState } from 'react'
import { Check, ChevronDown, ChevronRight, Copy, ExternalLink, FileText, Terminal } from 'lucide-react'

interface SkillDetailClientProps {
  installCommand: string
  skillName?: string
  category?: string
  githubLink?: string
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-slate-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-4 text-left"
      >
        <h3 className="font-funneldisplay text-base font-semibold text-slate-900 group-hover:text-slate-700">
          {title}
        </h3>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-400" />
        )}
      </button>
      {isOpen ? (
        <div className="pb-5 text-sm leading-relaxed text-slate-600">{children}</div>
      ) : null}
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
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded p-1.5 transition-colors hover:bg-slate-800"
      title={label || 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 text-slate-400 hover:text-slate-200" />
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
    <div className="border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
          Files in {skillName}/
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {files.map((file) => (
          <a
            key={file.name}
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-slate-50"
          >
            <FileText className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="font-mono text-sm text-slate-700 group-hover:text-slate-900">{file.name}</span>
            <span className="ml-auto hidden text-xs text-slate-400 sm:block">{file.description}</span>
            <ExternalLink className="h-3 w-3 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default function SkillDetailClient({
  installCommand,
  skillName = '',
  category = '',
  githubLink = '',
}: SkillDetailClientProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-slate-900 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
            Install command
          </span>
          <CopyButton text={installCommand} label="Copy install command" />
        </div>
        <div className="flex items-start gap-2">
          <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <code className="flex-1 select-all break-all font-mono text-sm text-green-400">
            {installCommand}
          </code>
        </div>
      </div>

      <p className="font-mono text-xs text-slate-500">
        Or install manually: copy to{' '}
        <code className="rounded-sm bg-slate-100 px-1 py-0.5 text-slate-600">~/.openclaw/skills/</code>{' '}
        (global) or{' '}
        <code className="rounded-sm bg-slate-100 px-1 py-0.5 text-slate-600">&lt;project&gt;/skills/</code>{' '}
        (workspace)
      </p>

      {githubLink ? <FileExplorer skillName={skillName} githubLink={githubLink} /> : null}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-funneldisplay text-lg font-semibold text-slate-900">How this skill works</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          When installed, this skill becomes available to your AI agents on Trooper. The agent can invoke
          it when relevant tasks are detected based on trigger phrases and context.
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
          <li>Automatically activated when matching triggers are detected</li>
          <li>Runs within the agent&apos;s execution sandbox</li>
          <li>Follows workspace permission settings</li>
          <li>Can be combined with other installed skills</li>
        </ul>
      </div>

      <div>
        <CollapsibleSection title="When to use it">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              When you need to extend your AI agent&apos;s capabilities in the{' '}
              <strong>{category}</strong> domain
            </li>
            <li>To automate repetitive tasks related to {skillName.toLowerCase()}</li>
            <li>When building multi-agent workflows that require specialized functionality</li>
            <li>To leverage community-maintained, battle-tested implementations</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Best practices">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong>Test in development first</strong> — Install in a test workspace before deploying
              to production agents.
            </li>
            <li>
              <strong>Review the SKILL.md</strong> — Understand what the skill does and what permissions
              it requires before installing.
            </li>
            <li>
              <strong>Keep skills updated</strong> — Re-run the install command periodically to get the
              latest version.
            </li>
            <li>
              <strong>Combine with related skills</strong> — Skills in the same category often work well
              together for complex workflows.
            </li>
            <li>
              <strong>Monitor agent behavior</strong> — Check agent logs to ensure the skill is being
              triggered appropriately.
            </li>
          </ol>
        </CollapsibleSection>

        <CollapsibleSection title="FAQ">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-slate-800">How do I uninstall this skill?</p>
              <p className="mt-1">
                Remove the skill folder from{' '}
                <code className="rounded-sm bg-slate-100 px-1 py-0.5 text-slate-600">
                  ~/.openclaw/skills/{skillName.toLowerCase()}/
                </code>{' '}
                or your project&apos;s{' '}
                <code className="rounded-sm bg-slate-100 px-1 py-0.5 text-slate-600">skills/</code>{' '}
                directory.
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-800">Can I customize this skill?</p>
              <p className="mt-1">
                Yes. After installing, you can modify the SKILL.md and configuration files to tailor the
                skill to your specific needs.
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-800">Is this skill compatible with all agents?</p>
              <p className="mt-1">
                This skill works with any OpenClaw-compatible agent on Trooper, including ClawdBot and
                MoltBot-based agents.
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}
