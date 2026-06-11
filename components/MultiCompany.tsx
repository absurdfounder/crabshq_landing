'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, TrendingUp, Video, Plus } from 'lucide-react';

type OrgNode = {
  icon: string;
  label: string;
};

type Company = {
  icon: React.ReactNode;
  name: string;
  agents: number;
  orgChart: {
    ceo: OrgNode;
    managers: OrgNode[];
    agents: OrgNode[];
  };
};

const companies: Company[] = [
  {
    icon: <Smartphone className="w-5 h-5 text-slate-500" />,
    name: 'Mobile Marketing Co',
    agents: 8,
    orgChart: {
      ceo: { icon: '👤', label: 'CEO' },
      managers: [
        { icon: '📈', label: 'VP Marketing' },
        { icon: '🚀', label: 'VP Growth' },
      ],
      agents: [
        { icon: '✏️', label: 'Content' },
        { icon: '📺', label: 'Ads' },
        { icon: '🔍', label: 'SEO' },
        { icon: '📊', label: 'Analytics' },
      ],
    },
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-slate-500" />,
    name: 'John Street Hyperliquid Fund',
    agents: 14,
    orgChart: {
      ceo: { icon: '👤', label: 'Managing Partner' },
      managers: [
        { icon: '📈', label: 'Trading' },
        { icon: '🔍', label: 'Research' },
        { icon: '🛡️', label: 'Risk' },
      ],
      agents: [
        { icon: '💻', label: 'Quant' },
        { icon: '📺', label: 'Exec Bot' },
        { icon: '🌐', label: 'Scout' },
        { icon: '🛡️', label: 'Hedger' },
      ],
    },
  },
  {
    icon: <Video className="w-5 h-5 text-slate-500" />,
    name: 'Faceless TikTok Factory',
    agents: 5,
    orgChart: {
      ceo: { icon: '👤', label: 'Producer' },
      managers: [
        { icon: '✏️', label: 'Scriptwriter' },
        { icon: '📺', label: 'Video Editor' },
      ],
      agents: [
        { icon: '🎙️', label: 'Voice' },
        { icon: '🖼️', label: 'Thumbnail' },
        { icon: '⏰', label: 'Scheduler' },
      ],
    },
  },
];

const addCompanyPlaceholder = {
  orgChart: {
    ceo: { icon: '👤', label: 'Your CEO' },
    managers: [
      { icon: '⚙️', label: 'Role...' },
      { icon: '💻', label: 'Role...' },
      { icon: '📈', label: 'Role...' },
    ],
    agents: [
      { icon: '👤', label: 'Agent...' },
      { icon: '👤', label: 'Agent...' },
    ],
  },
};

function MiniOrgChart({ orgChart }: { orgChart: Company['orgChart'] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="border border-slate-200 bg-white p-5"
    >
      <div className="flex flex-col items-center">
        {/* CEO */}
        <div className="border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-medium text-slate-700 flex items-center gap-1.5">
          <span>{orgChart.ceo.icon}</span>
          <span>{orgChart.ceo.label}</span>
        </div>

        {/* Connector CEO → Managers */}
        <div className="w-px h-4 bg-slate-300" />
        <div className="relative w-full flex justify-center">
          <div
            className="absolute top-0 h-px bg-slate-300"
            style={{
              left: `${50 - (orgChart.managers.length - 1) * 16}%`,
              right: `${50 - (orgChart.managers.length - 1) * 16}%`,
            }}
          />
        </div>

        {/* Managers */}
        <div className="flex gap-2 mt-1">
          {orgChart.managers.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-3 bg-slate-300" />
              <div className="border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 flex items-center gap-1">
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Connector Managers → Agents */}
        <div className="w-px h-3 bg-slate-300" />
        <div className="relative w-full flex justify-center">
          <div
            className="absolute top-0 h-px bg-slate-300"
            style={{
              left: `${50 - (orgChart.agents.length - 1) * 12}%`,
              right: `${50 - (orgChart.agents.length - 1) * 12}%`,
            }}
          />
        </div>

        {/* Agents */}
        <div className="flex gap-2 mt-1">
          {orgChart.agents.map((a, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-3 bg-slate-300" />
              <div className="border border-dashed border-slate-300 bg-slate-50 px-3 py-1.5 text-[10px] text-slate-500 flex items-center gap-1">
                <span>{a.icon}</span>
                <span>{a.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function MultiCompany() {
  const [hovered, setHovered] = useState<number | null>(null);
  const totalTiles = companies.length + 1; // +1 for Add placeholder

  // Shared-hairline classes for a tile in a 2-col (mobile) / 4-col (sm+) grid.
  // 4 tiles total → 2x2 on mobile, 1x4 on sm+.
  const tileBorders = (i: number) => {
    const isLastMobile = i === totalTiles - 1; // index 3
    const isMobileRight = i % 2 === 1; // 1, 3
    const isMobileBottomRow = i >= totalTiles - 2; // 2, 3
    const isSmLast = i === totalTiles - 1; // 3

    return [
      // bottom hairline on mobile when not in bottom row
      !isMobileBottomRow ? 'border-b border-slate-200' : '',
      // right hairline on mobile when not in right column
      !isMobileRight ? 'border-r border-slate-200' : '',
      // sm: collapse to single row → no bottom borders
      'sm:border-b-0',
      // sm: right hairline on every tile except last
      isSmLast ? 'sm:border-r-0' : 'sm:border-r sm:border-slate-200',
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-0 py-16 md:py-24">
        <div className="mb-10">
          <h2 className="font-funneldisplay text-3xl sm:text-4xl md:text-[42px] tracking-tight text-slate-900 leading-tight">
            One theater.
            <br />
            Many units.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-lg leading-relaxed">
            Run one AI company or fifty. Each unit is fully isolated — separate data, agents, and audit trails under one command plane.
          </p>
        </div>

        {/* Workspace tiles — shared-border grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-slate-200 bg-white">
          {companies.map((c, i) => (
            <div
              key={i}
              className={[
                'p-5 sm:p-6 cursor-pointer transition-colors duration-200 bg-white',
                tileBorders(i),
                hovered === i ? 'bg-slate-50' : 'hover:bg-slate-50/60',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="mb-3">{c.icon}</div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">{c.name}</h3>
              <p className="text-[12px] text-slate-400 mt-1">{c.agents} agents</p>
            </div>
          ))}

          {/* Add company placeholder */}
          <div
            className={[
              'p-5 sm:p-6 cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center bg-white',
              tileBorders(totalTiles - 1),
              hovered === 3 ? 'bg-slate-50' : 'hover:bg-slate-50/60',
            ]
              .filter(Boolean)
              .join(' ')}
            onMouseEnter={() => setHovered(3)}
            onMouseLeave={() => setHovered(null)}
          >
            <Plus className="w-5 h-5 text-slate-400" />
            <p className="text-sm text-slate-500 mt-2">Add company</p>
          </div>
        </div>

        {/* Org chart that appears on hover */}
        <div className="mt-6 min-h-[180px]">
          <AnimatePresence mode="wait">
            {hovered !== null && hovered < 3 && (
              <MiniOrgChart key={hovered} orgChart={companies[hovered].orgChart} />
            )}
            {hovered === 3 && (
              <MiniOrgChart key="add" orgChart={addCompanyPlaceholder.orgChart} />
            )}
            {hovered === null && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-[180px] rounded-sm border border-dashed border-slate-200 bg-white/60"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
                  Select a command post to preview org chart
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
