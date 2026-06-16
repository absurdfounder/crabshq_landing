'use client';

import { useState } from 'react';
import MarketingHeadline from '@/components/marketing/MarketingHeadline';
import SectionShell from '@/components/ui/SectionShell';
import { ProviderChip } from '@/components/marketing/visuals/shared';
import { getFaviconUrl } from '@/lib/favicon';
import type {
  PlaybookWorkflow,
  PlaybookWorkflowContent,
  PlaybookWorkflowNode,
} from '@/lib/playbookWorkflow';
import { Zap } from 'lucide-react';

type PlaybookWorkflowSectionProps = {
  content: PlaybookWorkflowContent;
  eyebrow?: string;
  eyebrowNumber?: string;
};

const defaultHeadline = [
  {
    parts: [
      { text: 'Build agents that run', tone: 'default' as const },
      { text: 'your playbooks.', tone: 'brand' as const },
    ],
  },
];

function NodeIcon({ node }: { node: PlaybookWorkflowNode }) {
  if (node.agent) {
    return <ProviderChip provider={node.agent} size={16} />;
  }
  if (node.iconDomain === 'trooper') {
    return (
      <img
        src="/images/trooper-logomark.png"
        alt=""
        width={16}
        height={16}
        className="pixel-render shrink-0 object-contain"
      />
    );
  }
  if (node.iconDomain) {
    return (
      <img
        src={getFaviconUrl(node.iconDomain, 32)}
        alt=""
        width={16}
        height={16}
        className="shrink-0 rounded-sm"
      />
    );
  }
  return null;
}

function WorkflowNode({ node }: { node: PlaybookWorkflowNode }) {
  const isTrigger = node.kind === 'trigger';
  const isGate = node.kind === 'gate';

  return (
    <div
      className={`absolute z-10 w-[max-content] max-w-[132px] sm:max-w-[152px] -translate-x-1/2 -translate-y-1/2 ${
        isGate ? 'border-trooper/40' : 'border-slate-200'
      }`}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      {isTrigger && (
        <span className="mb-1 inline-flex items-center gap-1 rounded-sm border border-trooper/25 bg-trooper-50 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-trooper">
          <Zap className="h-3 w-3" strokeWidth={2.5} />
          Trigger
        </span>
      )}
      <div
        className={`flex items-center gap-2 border bg-white px-2.5 py-2 shadow-sm sm:px-3 sm:py-2.5 ${
          isGate ? 'border-trooper/30 ring-1 ring-trooper/10' : 'border-slate-200'
        }`}
      >
        <NodeIcon node={node} />
        <span className="text-xs font-medium leading-snug text-slate-700 sm:text-[13px]">
          {node.label}
        </span>
      </div>
    </div>
  );
}

function WorkflowCanvas({ workflow }: { workflow: PlaybookWorkflow }) {
  const nodeById = Object.fromEntries(workflow.nodes.map((n) => [n.id, n]));

  return (
    <div className="relative overflow-hidden border border-slate-200 bg-slate-50/70 p-2 shadow-sm sm:p-3">
      <div className="relative overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div
          className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgb(148 163 184 / 0.35) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          backgroundColor: 'rgb(248 250 252 / 0.6)',
        }}
      >
        {workflow.triggerBadge && (
          <div className="absolute left-3 top-3 z-20 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:left-4 sm:top-4 sm:text-[10px]">
            {workflow.triggerBadge}
          </div>
        )}

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {workflow.edges.map((edge) => {
            const from = nodeById[edge.from];
            const to = nodeById[edge.to];
            if (!from || !to) return null;
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgb(148 163 184)"
                strokeWidth="0.35"
                strokeDasharray="1.2 0.8"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {workflow.nodes.map((node) => (
          <WorkflowNode key={node.id} node={node} />
        ))}
      </div>

      {workflow.statusBar && (
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/90 px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[11px]">
            {workflow.statusBar.label}
          </span>
          <span className="font-mono text-xs font-bold text-trooper sm:text-sm">
            {workflow.statusBar.value}
          </span>
        </div>
      )}
      </div>
    </div>
  );
}

export default function PlaybookWorkflowSection({
  content,
  eyebrow = 'Playbooks',
  eyebrowNumber = '04',
}: PlaybookWorkflowSectionProps) {
  const [activeId, setActiveId] = useState(content.playbooks[0]?.id ?? '');
  const active = content.playbooks.find((p) => p.id === activeId) ?? content.playbooks[0];

  return (
    <SectionShell eyebrow={eyebrow} eyebrowNumber={eyebrowNumber} bgClass="bg-slate-50">
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <MarketingHeadline
              as="h2"
              size="section"
              lines={content.headlineLines ?? defaultHeadline}
              subline={content.subheading}
            />
          </div>

          <div className="mb-4 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {content.playbooks.map((playbook) => {
              const selected = playbook.id === active?.id;
              return (
                <button
                  key={playbook.id}
                  type="button"
                  onClick={() => setActiveId(playbook.id)}
                  className={`border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors sm:text-[11px] ${
                    selected
                      ? 'border-trooper/30 bg-trooper text-white'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {playbook.tabLabel}
                </button>
              );
            })}
          </div>

          {active && <WorkflowCanvas workflow={active} />}
        </div>
      </section>
    </SectionShell>
  );
}
