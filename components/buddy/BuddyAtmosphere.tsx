/**
 * Poke-style coastal ground: soft dreamy photo behind the phone,
 * feathered left wash for copy, clean dissolve to white at the bottom.
 */
export default function BuddyAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#f3f1eb]" />

      {/* Soft-focus coast — scaled + blurred so grain reads as atmosphere, not noise */}
      <div
        className="absolute -inset-[4%] opacity-50 lg:opacity-[0.85]"
        style={{
          backgroundImage: 'url(/images/buddy/coast.webp)',
          backgroundSize: 'cover',
          backgroundPosition: '68% 40%',
          filter: 'blur(10px) saturate(0.95) brightness(1.06)',
        }}
      />

      {/* Left copy wash */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[55%] lg:max-w-[680px]"
        style={{
          background:
            'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.94) 48%, rgba(255,255,255,0.35) 82%, transparent 100%)',
        }}
      />
      <div className="absolute inset-0 bg-white/60 lg:hidden" />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      {/* Clean bottom dissolve — no muddy mid band */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 45%, #fff 82%)',
        }}
      />
    </div>
  )
}
