/**
 * Poke-style hero atmosphere: coastal photo with top veil + long bottom fade to white.
 */
export default function BuddyAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Soft coast plate — sits mid/lower so the photo reads clearly */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/buddy/coast.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      />

      {/* Soften only the upper third for type — leave mid coast visible */}
      <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-white/70 via-white/25 to-transparent" />

      {/* Side vignette so phone/copy stay readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 18% 45%, rgba(255,255,255,0.5) 0%, transparent 55%)',
        }}
      />

      {/* Bottom dissolve into white — poke-style fade */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-transparent via-white/55 to-white" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white sm:h-36" />
    </div>
  )
}
