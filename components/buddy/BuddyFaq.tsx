const FAQS = [
  {
    q: 'What is Buddy?',
    a: 'Buddy is Trooper’s personal agent — an iMessage assistant with its own computer. Text it tasks; it browses, runs commands, uses your tools, and comes back when it needs your approval.',
  },
  {
    q: 'How is Buddy different from Workforce?',
    a: 'Workforce is multiplayer: teams of specialized troopers that coordinate on org work. Buddy is one personal agent simplified for you — same computer power, no team to manage.',
  },
  {
    q: 'Is it just a chatbot on iMessage?',
    a: 'No. Buddy gets a full personal computer — browser, terminal, files, and desktop apps — so it can finish work, not only answer questions.',
  },
  {
    q: 'Do I need to watch a dashboard?',
    a: 'No. Start from iMessage. Review and approve from Messages or the Trooper app when Buddy needs a sign-off.',
  },
  {
    q: 'Can Buddy use my existing tools?',
    a: 'Yes. Connect the apps you already use. If it has an API, Buddy can reach it — email, calendar, docs, code hosts, and more.',
  },
  {
    q: 'Is my data private?',
    a: 'Your workspace is isolated. API keys stay yours. Sensitive actions wait in Human Review until you release them.',
  },
] as const

export default function BuddyFaq() {
  return (
    <section className="w-full" aria-labelledby="buddy-faq-heading">
      <h2 id="buddy-faq-heading" className="font-display text-xl font-medium tracking-tight text-amber-800 sm:text-2xl">
        Questions
      </h2>
      <div className="mt-6 space-y-7">
        {FAQS.map((item) => (
          <div key={item.q}>
            <h3 className="font-sans text-[15px] font-semibold leading-snug text-ink sm:text-base">
              {item.q}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted sm:text-[15px]">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
