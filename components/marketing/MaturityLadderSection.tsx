import SectionShell from '@/components/ui/SectionShell';
import {
  groupMaturitySteps,
  MATURITY_LEVEL_IDS,
  type MaturityLevelId,
  type MaturityLadderContent,
  type MaturityStep,
  type MaturityStepIcon,
} from '@/lib/maturityLadder';
import {
  Bot,
  CheckCircle2,
  Circle,
  Diamond,
  Plug,
  UserRound,
} from 'lucide-react';

type MaturityLadderSectionProps = {
  content: MaturityLadderContent;
  eyebrow?: string;
  eyebrowNumber?: string;
};

const ACTIVE_LEVELS: MaturityLevelId[] = ['L3', 'L4'];

function StepIcon({ icon, accent }: { icon?: MaturityStepIcon; accent?: boolean }) {
  const className = accent ? 'text-trooper shrink-0' : 'text-slate-400 shrink-0';

  switch (icon) {
    case 'agent':
      return <Bot className={`h-3.5 w-3.5 ${className}`} strokeWidth={2} />;
    case 'integration':
      return <Plug className={`h-3.5 w-3.5 ${className}`} strokeWidth={2} />;
    case 'goal':
      return <Diamond className={`h-3.5 w-3.5 ${accent ? 'text-trooper' : 'text-slate-400'} shrink-0`} strokeWidth={2} />;
    case 'success':
      return <CheckCircle2 className="h-3.5 w-3.5 text-trooper shrink-0" strokeWidth={2} />;
    case 'escalate':
      return <UserRound className={`h-3.5 w-3.5 ${className}`} strokeWidth={2} />;
    case 'user':
    default:
      return <Circle className="h-3 w-3 text-slate-300 shrink-0" strokeWidth={1.75} />;
  }
}

function StepRow({ step }: { step: MaturityStep }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-4 w-4 items-center justify-center">
        <StepIcon icon={step.icon} accent={step.accent} />
      </div>
      <span
        className={`text-xs leading-snug sm:text-[13px] ${
          step.accent ? 'font-medium text-trooper' : 'text-slate-600'
        }`}
      >
        {step.label}
      </span>
    </div>
  );
}

function StepConnector() {
  return (
    <div className="ml-[7px] flex justify-start py-1">
      <div className="h-3 w-px border-l border-dashed border-slate-300" aria-hidden />
    </div>
  );
}

function StepFlow({ steps }: { steps: MaturityStep[] }) {
  const blocks = groupMaturitySteps(steps);

  return (
    <div className="mt-4">
      {blocks.map((block, blockIndex) => {
        const key = block.type === 'single' ? block.step.label : block.steps.map((s) => s.label).join('|');

        return (
          <div key={key}>
            {blockIndex > 0 && <StepConnector />}
            {block.type === 'single' ? (
              <StepRow step={block.step} />
            ) : (
              <div className="rounded-sm border border-dashed border-slate-300 bg-slate-50/60 px-3 py-2.5 space-y-2.5">
                {block.steps.map((step, stepIndex) => (
                  <div key={step.label}>
                    {stepIndex > 0 && (
                      <div className="mb-2.5 ml-[7px] h-2 w-px border-l border-dashed border-slate-300" aria-hidden />
                    )}
                    <StepRow step={step} />
                  </div>
                ))}
              </div>
            )}
            {blockIndex < blocks.length - 1 && <StepConnector />}
          </div>
        );
      })}
    </div>
  );
}

function ProgressMarkers() {
  return (
    <div className="relative mx-auto mb-8 max-w-3xl px-4">
      <div
        className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px -translate-y-1/2 bg-slate-200"
        aria-hidden
      />
      <div
        className="absolute left-[62.5%] right-[12.5%] top-1/2 h-px -translate-y-1/2 bg-trooper"
        aria-hidden
      />
      <div className="relative flex justify-between">
        {MATURITY_LEVEL_IDS.map((id) => {
          const active = ACTIVE_LEVELS.includes(id);
          return (
            <div
              key={id}
              className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[10px] font-bold tracking-tight sm:h-8 sm:w-8 sm:text-[11px] ${
                active
                  ? 'border-trooper bg-trooper text-white'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              {id}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MaturityLadderSection({
  content,
  eyebrow = 'Automation ladder',
  eyebrowNumber = '03',
}: MaturityLadderSectionProps) {
  return (
    <SectionShell eyebrow={eyebrow} eyebrowNumber={eyebrowNumber} bgClass="bg-white">
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            {content.title}
          </p>

          <ProgressMarkers />

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200 border border-slate-200 bg-white">
            {content.levels.map((level, index) => (
              <div
                key={level.id}
                className={`px-4 py-6 sm:px-5 sm:py-7 lg:px-5 ${
                  index > 0 ? 'border-t border-slate-200 lg:border-t-0' : ''
                }`}
              >
                <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {level.id}
                </div>
                <h3 className="font-funneldisplay text-sm font-semibold leading-snug tracking-tight text-slate-900 sm:text-[15px]">
                  {level.headline}
                </h3>
                <StepFlow steps={level.steps} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
