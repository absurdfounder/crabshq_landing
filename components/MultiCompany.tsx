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
      className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm"
    >
      <div className="flex flex-col items-center">
        {/* CEO */}
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-medium text-slate-700 flex items-center gap-1.5 shadow-sm">
          <span>{orgChart.ceo.icon}</span>
          <span>{orgChart.ceo.label}</span>
        </div>

        {/* Connector CEO → Managers */}
        <div className="w-px h-4 bg-slate-300" />
        <div className="relative w-full flex justify-center">
          <div className="absolute top-0 h-px bg-slate-300" style={{ left: `${50 - (orgChart.managers.length - 1) * 16}%`, right: `${50 - (orgChart.managers.length - 1) * 16}%` }} />
        </div>

        {/* Managers */}
        <div className="flex gap-2 mt-1">
          {orgChart.managers.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-3 bg-slate-300" />
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 flex items-center gap-1 shadow-sm">
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Connector Managers → Agents */}
        <div className="w-px h-3 bg-slate-300" />
        <div className="relative w-full flex justify-center">
          <div className="absolute top-0 h-px bg-slate-300" style={{ left: `${50 - (orgChart.agents.length - 1) * 12}%`, right: `${50 - (orgChart.agents.length - 1) * 12}%` }} />
        </div>

        {/* Agents */}
        <div className="flex gap-2 mt-1">
          {orgChart.agents.map((a, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-3 bg-slate-300" />
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] text-slate-500 flex items-center gap-1">
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

  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <hr className="border-slate-200 mb-12" />

        <div className="mb-10">
          <span className="inline-block rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-[0.1em] text-slate-600">
            Multi-Company
          </span>
          <h2 className="font-funneldisplay text-3xl sm:text-4xl md:text-[42px] tracking-tight text-slate-900 mt-4 leading-tight">
            One deployment.<br />
            Many companies.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-lg leading-relaxed">
            Crabs HQ supports multiple businesses in one install. Run one AI company or run fifty.
            Complete data isolation between companies. One control plane for your entire portfolio.
          </p>
        </div>

        {/* Company cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {companies.map((c, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 sm:p-5 cursor-pointer transition-all duration-200 ${
                hovered === i
                  ? 'border-emerald-400 bg-white shadow-sm'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="mb-3">{c.icon}</div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">{c.name}</h3>
              <p className="text-[12px] text-slate-400 mt-1">{c.agents} agents</p>
              <p className="text-[12px] font-medium text-emerald-600 mt-1">Active</p>
            </div>
          ))}

          {/* Add company placeholder */}
          <div
            className={`rounded-xl border border-dashed p-4 sm:p-5 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
              hovered === 3
                ? 'border-emerald-400 bg-white'
                : 'border-slate-300 hover:border-slate-400'
            }`}
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
