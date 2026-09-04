/**
 * Product mockups for the /download page — phone + desktop in soft wells,
 * matching the Manus-style “image above, options below” card layout.
 */

export function MobileAppPreview() {
  return (
    <div
      className="relative flex h-full min-h-[300px] items-end justify-center overflow-hidden px-6 pb-0 pt-12 sm:min-h-[360px] sm:px-10 sm:pt-14"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(20,23,15,0.06), transparent 70%)',
        }}
      />

      <div className="relative w-[min(54%,12.5rem)] translate-y-8 sm:w-[min(50%,14rem)] sm:translate-y-10">
        <div
          className="rounded-[2.2rem] p-[2.5px] shadow-[0_28px_48px_-18px_rgba(20,23,15,0.45)]"
          style={{
            background: 'linear-gradient(160deg, #d4d4d6 0%, #8e8e93 40%, #3a3a3c 100%)',
          }}
        >
          <div className="relative aspect-[9/19.4] overflow-hidden rounded-[2rem] bg-[#0c0b09]">
            <div className="absolute left-1/2 top-[9px] z-10 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />

            <div className="flex h-full flex-col px-3.5 pb-4 pt-9 font-[system-ui] text-[#f2f0ea]">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#7a776e]">
                Trooper
              </p>
              <p className="mt-2 text-[13px] font-medium leading-snug tracking-tight">
                Add Vanta demo page + follow-up assets
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[9px] text-[#9a978e]">
                <span className="rounded-full bg-[rgba(61,214,140,0.14)] px-1.5 py-0.5 font-medium text-[#3dd68c]">
                  Open
                </span>
                <span className="text-[#3dd68c]">+48</span>
                <span className="text-[#f09595]">−6</span>
              </div>

              <div className="mt-3 rounded-xl border border-white/[0.09] bg-[#171612] p-2.5">
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="flex size-4 items-center justify-center rounded-full bg-[#3dd68c] text-[8px] font-bold text-black">
                    ✓
                  </span>
                  <span className="text-[9px] text-[#c8c4b8]">All checks passed</span>
                </div>
                <div className="flex h-7 items-center justify-center rounded-lg bg-[#f2f0ea] text-[10px] font-semibold text-[#0c0b09]">
                  Squash & Merge
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.09] bg-[#171612]">
                <div className="flex items-center gap-1.5 border-b border-white/[0.09] px-2 py-1.5">
                  <span className="min-w-0 flex-1 truncate font-mono text-[8px] text-[#c8c4b8]">
                    app/demos/vanta.tsx
                  </span>
                  <span className="text-[8px] text-[#3dd68c]">+48</span>
                </div>
                <div className="space-y-0.5 px-1 py-1 font-mono text-[7px] leading-tight">
                  <div className="rounded-sm bg-[rgba(240,149,149,0.14)] px-1 py-0.5 text-[#f09595]">
                    − title: &quot;Generic demo&quot;
                  </div>
                  <div className="rounded-sm bg-[rgba(61,214,140,0.14)] px-1 py-0.5 text-[#3dd68c]">
                    + title: &quot;Vanta · Thu 2pm&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesktopAppPreview() {
  return (
    <div
      className="relative flex h-full min-h-[300px] items-end justify-center overflow-hidden px-5 pb-0 pt-12 sm:min-h-[360px] sm:px-8 sm:pt-14"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(20,23,15,0.06), transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[24rem] translate-y-5 sm:max-w-[28rem] sm:translate-y-7">
        {/* Monitor bezel */}
        <div className="overflow-hidden rounded-t-xl bg-[#1c1c1e] shadow-[0_28px_48px_-18px_rgba(20,23,15,0.4)] ring-1 ring-black/20">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
            <div className="flex items-center gap-2 text-[10px] text-white/85">
              <span className="size-2 rounded-full bg-[#28c840]" />
              <span className="font-medium">Studio-Mac</span>
              <span className="text-white/40">Trooper</span>
            </div>
            <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[8px] font-semibold text-amber-200 ring-1 ring-amber-400/30">
              ● Busy
            </span>
          </div>

          <div className="relative bg-[#2c2c2e] p-2.5 sm:p-3">
            <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/10">
              <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-gradient-to-b from-neutral-50 to-neutral-100/90 px-2.5 py-1.5">
                <span className="size-2 rounded-full bg-[#ff5f57]" />
                <span className="size-2 rounded-full bg-[#febc2e]" />
                <span className="size-2 rounded-full bg-[#28c840]" />
                <span className="ml-1.5 truncate text-[9px] font-medium text-neutral-500">
                  Trooper — AI workforce
                </span>
              </div>

              <div className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[5.5rem_1fr]">
                <aside className="space-y-1.5 border-r border-neutral-100 bg-stone-50 px-2 py-2.5">
                  <div className="h-1.5 w-10 rounded-full bg-neutral-300" />
                  <div className="h-1.5 w-8 rounded-full bg-neutral-200" />
                  <div className="mt-2 space-y-1">
                    {['Ops', 'Sales', 'Eng'].map((label) => (
                      <div
                        key={label}
                        className="flex items-center gap-1 rounded-md px-1 py-0.5 text-[8px] font-medium text-neutral-600"
                      >
                        <span className="size-1.5 rounded-full bg-fern-500" />
                        {label}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="space-y-2 px-2.5 py-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-neutral-800">Active loops</p>
                    <span className="rounded-md bg-fern-50 px-1.5 py-0.5 text-[8px] font-semibold text-fern-800">
                      3 running
                    </span>
                  </div>
                  {[
                    { title: 'Inbox triage', meta: '12 handled' },
                    { title: 'PR review', meta: 'Ready to merge' },
                    { title: 'Demo follow-up', meta: 'Drafting' },
                  ].map((row) => (
                    <div
                      key={row.title}
                      className="flex items-center justify-between rounded-lg border border-neutral-100 bg-white px-2 py-1.5"
                    >
                      <div>
                        <p className="text-[9px] font-semibold text-neutral-800">{row.title}</p>
                        <p className="text-[8px] text-neutral-500">{row.meta}</p>
                      </div>
                      <span className="size-1.5 rounded-full bg-fern-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stand */}
        <div className="mx-auto h-2.5 w-[28%] bg-gradient-to-b from-neutral-400 to-neutral-500" />
        <div className="mx-auto h-1 w-[42%] rounded-full bg-neutral-400/80" />
      </div>
    </div>
  );
}
