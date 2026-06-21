import Link from 'next/link';
import { RequirementItemIcon } from '@/components/loops/RequirementItemIcon';
import type { LoopRequirements } from '@/lib/loopMermaid';
import { getLoopPluginIconUrl, getLoopSkillIconUrl, getSystemIconUrl } from '@/lib/loopIcons';
import { getPluginBySlug, pluginPagePath } from '@/lib/pluginCatalog';

type LoopRequirementsPanelProps = {
  requirements?: LoopRequirements;
  inferred?: boolean;
};

export function LoopRequirementsPanel({ requirements, inferred }: LoopRequirementsPanelProps) {
  if (!requirements) return null;
  const { plugins = [], skills = [], systems = [] } = requirements;
  if (!plugins.length && !skills.length && !systems.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
        Install requirements
      </h3>
      {inferred ? (
        <p className="mb-3 text-xs text-slate-500">Suggested from loop title, steps, and tags.</p>
      ) : null}

      {plugins.length > 0 ? (
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-slate-700">Plugins to connect</p>
          <ul className="space-y-2">
            {plugins.map((plugin) => {
              const catalogPlugin = getPluginBySlug(plugin.id);
              const label = plugin.label || catalogPlugin?.name || plugin.id;
              const href = catalogPlugin ? pluginPagePath(plugin.id) : null;
              const iconSrc = getLoopPluginIconUrl(plugin.id, label);
              return (
                <li
                  key={plugin.id}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <RequirementItemIcon src={iconSrc} fallback={label} size={20} />
                      {href ? (
                        <Link href={href} className="font-medium text-emerald-700 hover:text-emerald-800">
                          {label}
                        </Link>
                      ) : (
                        <span className="font-medium">{label}</span>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-slate-500">
                      {plugin.required === false ? 'optional' : 'required'}
                    </span>
                  </div>
                  {plugin.reason ? (
                    <p className="mt-1 pl-7 text-xs leading-relaxed text-slate-500">{plugin.reason}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {skills.length > 0 ? (
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-slate-700">Skills to attach</p>
          <ul className="space-y-2">
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <RequirementItemIcon
                      src={getLoopSkillIconUrl(skill)}
                      fallback={skill.label}
                      size={20}
                    />
                    <span className="font-medium">{skill.label}</span>
                  </div>
                  <span className="shrink-0 text-xs text-slate-500">
                    {skill.required === false ? 'optional' : 'required'}
                  </span>
                </div>
                {skill.reason ? (
                  <p className="mt-1 pl-7 text-xs leading-relaxed text-slate-500">{skill.reason}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {systems.length > 0 ? (
        <div>
          <p className="mb-2 text-xs font-medium text-slate-700">Systems this loop touches</p>
          <ul className="space-y-2">
            {systems.map((system) => (
              <li
                key={`${system.name}-${system.role}`}
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <RequirementItemIcon
                    src={getSystemIconUrl(system.name)}
                    fallback={system.name}
                    size={20}
                  />
                  <span className="font-medium">{system.name}</span>
                  <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                    {system.role}
                  </span>
                  {system.via ? (
                    <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                      {system.via}
                    </span>
                  ) : null}
                </div>
                {system.notes ? (
                  <p className="mt-1 pl-7 text-xs leading-relaxed text-slate-500">{system.notes}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
