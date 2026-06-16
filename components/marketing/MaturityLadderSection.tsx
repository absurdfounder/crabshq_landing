import SectionShell from '@/components/ui/SectionShell';
import { getFaviconUrl } from '@/lib/favicon';
import {
  groupMaturitySteps,
  MATURITY_LEVEL_IDS,
  type MaturityLevelId,
  type MaturityLadderContent,
  type MaturityStep,
  type MaturityStepIcon,
} from '@/lib/maturityLadder';
import {
  ArrowDown,
  CheckCircle2,
  Circle,
  Diamond,
  UserRound,
} from 'lucide-react';

type MaturityLadderSectionProps = {
  content: MaturityLadderContent;
  eyebrow?: string;
  eyebrowNumber?: string;
};

const ACTIVE_LEVELS: MaturityLevelId[] = ['L3', 'L4'];

function StepIcon({
  icon,
  iconDomain,
  accent,
}: {
  icon?: MaturityStepIcon;
  iconDomain?: string;
  accent?: boolean;
}) {
  const shell =
    'flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]';

  switch (icon) {
    case 'agent':
      return (
        <span className={`${shell} border-trooper/20`}>
          <img
            src="/images/trooper-logomark.png"
            alt=""
            width={14}
            height={14}
            className="pixel-render object-contain"
          />
        </span>
      );
    case 'integration':
      return (
        <span className={`${shell} border-slate-200`}>
          {iconDomain ? (
            <img
              src={getFaviconUrl(iconDomain, 32)}
              alt=""
              width={14}
              height={14}
              className="rounded-sm object-contain"
            />
          ) : (
            <Circle className="h-3 w-3 text-slate-400" strokeWidth={2} />
          )}
        </span>
      );
    case 'goal':
      return (
        <span className={`${shell} ${accent ? 'border-trooper/30 bg-trooper-50/80' : 'border-slate-200'}`}>
          <Diamond
            className={`h-3.5 w-3.5 ${accent ? 'text-trooper' : 'text-slate-400'}`}
            strokeWidth={2}
          />
        </span>
      );
    case 'success':
      return (
        <span className={`${shell} border-trooper/25 bg-trooper-50/70`}>
          <CheckCircle2 className="h-3.5 w-3.5 text-trooper" strokeWidth={2} />
        </span>
      );
    case 'escalate':
      return (
        <span className={`${shell} border-amber-200/80 bg-amber-50/60`}>
          <UserRound className="h-3.5 w-3.5 text-amber-700" strokeWidth={2} />
        </span>
      );
    case 'user':
    default:
      return (
        <span className={`${shell} border-slate-200`}>
          <Circle className="h-3 w-3 text-slate-400" strokeWidth={2} />
        </span>
      );
  }
}

function StepCard({ step }: { step: MaturityStep }) {
  const isOutcome = step.icon === 'success' || step.accent;

  return (
    <div
      className={`flex items-start gap-2.5 rounded-sm border px-2.5 py-2 ${
        isOutcome
          ? 'border-trooper/25 bg-trooper-50/50'
          : 'border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.03)]'
      }`}
    >
      <StepIcon icon={step.icon} iconDomain={step.iconDomain} accent={step.accent} />
      <span
        className={`pt-0.5 text-[13px] leading-snug sm:text-sm ${
          step.accent ? 'font-semibold text-trooper' : 'font-medium text-slate-700'
        }`}
      >
        {step.label}
      </span>
    </div>
  );
}

function StepConnector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <div className="flex flex-col items-center gap-0.5">
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <ArrowDown className="h-3 w-3 text-slate-300" strokeWidth={2} />
      </div>
    </div>
  );
}

function StepFlow({ steps }: { steps: MaturityStep[] }) {
  const blocks = groupMaturitySteps(steps);

  return (
    <div className="mt-3 flex flex-1 flex-col gap-0">
      {blocks.map((block, blockIndex) => {
        const key =
          block.type === 'single' ? block.step.label : block.steps.map((s) => s.label).join('|');

        return (
          <div key={key} className="flex flex-col">
            {blockIndex > 0 && <StepConnector />}
            {block.type === 'single' ? (
              <StepCard step={block.step} />
            ) : (
              <div className="rounded-sm border border-dashed border-slate-300/90 bg-slate-50/80 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <p className="mb-2 px-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Agent chain
                </p>
                <div className="space-y-1.5">
                  {block.steps.map((step, stepIndex) => (
                    <div key={step.label}>
                      {stepIndex > 0 && (
                        <div className="flex justify-center py-0.5" aria-hidden>
                          <ArrowDown className="h-2.5 w-2.5 text-slate-300" strokeWidth={2} />
                        </div>
                      )}
                      <StepCard step={step} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {blockIndex < blocks.length - 1 && <StepConnector />}
          </div>
        );
      })}
    </div>
  );
}

function ProgressTrack() {
  return (
    <div className="border-b border-slate-200 bg-slate-50/60 px-4 py-4 sm:px-6 sm:py-5">
      <p className="mb-4 text-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
        Maturity path
      </p>
      <div className="relative mx-auto max-w-4xl px-2">
        <div
          className="absolute left-[12.5%] right-[12.5%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-slate-200"
          aria-hidden
        />
        <div
          className="absolute left-[62.5%] right-[12.5%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-trooper"
          aria-hidden
        />
        <div className="relative grid grid-cols-4 gap-2">
          {MATURITY_LEVEL_IDS.map((id) => {
            const active = ACTIVE_LEVELS.includes(id);
            return (
              <div key={id} className="flex flex-col items-center gap-1.5">
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold tracking-tight shadow-sm sm:h-9 sm:w-9 sm:text-xs ${
                    active
                      ? 'border-trooper bg-white text-trooper ring-2 ring-trooper/15'
                      : 'border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  {id}
                </div>
                <span
                  className={`hidden font-mono text-[9px] font-semibold uppercase tracking-[0.14em] sm:block ${
                    active ? 'text-trooper' : 'text-slate-400'
                  }`}
                >
                  {active ? 'Automated' : 'Manual'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LevelColumn({
  level,
  index,
}: {
  level: MaturityLadderContent['levels'][number];
  index: number;
}) {
  const active = ACTIVE_LEVELS.includes(level.id);

  return (
    <article
      className={`flex min-h-[420px] min-w-[240px] flex-col border-slate-200 px-3 py-4 sm:min-w-0 sm:px-4 sm:py-5 lg:min-h-[460px] ${
        index > 0 ? 'border-t lg:border-t-0 lg:border-l' : ''
      } ${active ? 'bg-trooper-50/35' : 'bg-white'}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${
            active
              ? 'border-trooper/25 bg-white text-trooper shadow-sm'
              : 'border-slate-200 bg-slate-50 text-slate-500'
          }`}
        >
          {level.id}
        </span>
        {active && (
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-trooper/80">
            Live
          </span>
        )}
      </div>
      <h3 className="font-funneldisplay text-[15px] font-semibold leading-snug tracking-tight text-slate-900 sm:text-base">
        {level.headline}
      </h3>
      <StepFlow steps={level.steps} />
    </article>
  );
}

export default function MaturityLadderSection({
  content,
  eyebrow = 'Automation ladder',
  eyebrowNumber = '03',
}: MaturityLadderSectionProps) {
  return (
    <SectionShell eyebrow={eyebrow} eyebrowNumber={eyebrowNumber} bgClass="bg-white">
      <section className="pb-10 pt-2 md:pb-16 md:pt-4">
        <p className="mb-5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:mb-6">
          {content.title}
        </p>

        <div className="relative border border-slate-200 bg-slate-50/70 shadow-sm">
          <div className="pointer-events-none absolute inset-0 border border-white/60" aria-hidden />
          <div className="relative overflow-hidden bg-white">
            <ProgressTrack />

            <div className="-mx-px overflow-x-auto pb-px lg:overflow-visible">
              <div className="flex min-w-max snap-x snap-mandatory lg:grid lg:min-w-0 lg:grid-cols-4 lg:snap-none">
                {content.levels.map((level, index) => (
                  <div key={level.id} className="w-[78vw] max-w-[300px] shrink-0 snap-center sm:w-[280px] lg:w-auto lg:max-w-none">
                    <LevelColumn level={level} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 lg:hidden">
          Swipe to compare levels
        </p>
      </section>
    </SectionShell>
  );
}
