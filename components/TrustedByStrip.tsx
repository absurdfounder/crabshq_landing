const DEFAULT_LOGOS = ['OpenClaw', 'GitHub', 'Y Combinator', 'ClawdBot'] as const;

type TrustedByStripProps = {
  label?: string;
  logos?: readonly string[];
};

export default function TrustedByStrip({
  label = 'Trusted by teams building with AI',
  logos = DEFAULT_LOGOS,
}: TrustedByStripProps) {
  return (
    <div className="flex flex-col gap-5 border-b border-white/[0.08] py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7 md:py-8">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 sm:gap-x-9 md:gap-x-11">
        {logos.map((name) => (
          <span
            key={name}
            className="font-display text-[15px] font-medium tracking-tight text-white/85 sm:text-base"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
