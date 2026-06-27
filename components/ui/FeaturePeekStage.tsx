import type { ReactNode } from 'react';

/**
 * Light-theme adaptation of the reference design system's bottom "dot-matrix"
 * fade — brand-green dots dissolving up into the canvas.
 */
export function DotMatrixFade() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[36%] min-h-[56px] overflow-hidden opacity-70"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: 'radial-gradient(circle, #000 32.5%, transparent 46.5%)',
          maskImage: 'radial-gradient(circle, #000 32.5%, transparent 46.5%)',
          WebkitMaskSize: '5px 5px',
          maskSize: '5px 5px',
          backgroundColor: '#b9cda0',
          backgroundImage:
            'radial-gradient(125% 95% at 50% 108%, #7aa824 0%, #9db866 30%, #c4d9a0 56%, transparent 80%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, transparent 0%, color-mix(in srgb, var(--color-canvas) 45%, transparent) 55%, var(--color-canvas) 100%)',
        }}
      />
    </div>
  );
}

type FeaturePeekStageProps = {
  children: ReactNode;
  /** Wrap the visual in a glass card. Set false when the visual is already self-framed. */
  framed?: boolean;
  /** Wider canvas for expansive visuals (e.g. OpenClaw runtime). */
  wide?: boolean;
};

/**
 * Shared feature visual stage: a clean canvas wash, dot-matrix fade, and a
 * focused visual centered in the panel.
 */
export default function FeaturePeekStage({ children, framed = true, wide = false }: FeaturePeekStageProps) {
  const contentMax = wide
    ? 'max-w-[min(100%,36rem)]'
    : 'max-w-[min(100%,24rem)] sm:max-w-[min(100%,26rem)]';

  return (
    <div className="relative flex min-h-[320px] flex-col overflow-hidden sm:min-h-[380px] lg:min-h-[500px]">
      <div className="absolute inset-0 bg-gradient-to-br from-canvas via-canvas to-slate-100/50" />
      <DotMatrixFade />

      <div className="relative z-10 flex flex-1 items-center justify-center p-5 sm:p-7 md:p-9 lg:p-10">
        <div className={`w-full ${contentMax}`}>
          {framed ? (
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white/85 shadow-[0_28px_64px_-28px_rgba(28,25,23,0.35)] ring-1 ring-black/[0.04] backdrop-blur-xl">
              <div className="p-4 sm:p-5">{children}</div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
