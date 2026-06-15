const steps = [
  {
    number: '01',
    title: 'Define the goal.',
    example: '"Build the #1 AI note-taking app to $1mm ARR."',
  },
  {
    number: '02',
    title: 'Hire the team.',
    example: 'CEO, CTO, engineers, designers, marketers — any agent, any provider.',
  },
  {
    number: '03',
    title: 'Approve and run.',
    example: "Review the CEO's strategy. Set budgets. Hit go. Monitor from the dashboard.",
  },
];

export default function HowItWorksSteps() {
  return (
    <div className="pb-10 md:pb-16 pt-2">
      <div className="how-it-works-header mb-8 md:mb-12 max-w-3xl">
        <h2 className="how-it-works-heading font-funneldisplay text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-slate-900 leading-[1.15]">
          Manage business goals
          <br />
          not pull requests.
        </h2>
      </div>

      <div className="steps-grid grid grid-cols-1 md:grid-cols-3 border border-slate-200 bg-white overflow-hidden">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={[
              'step-card p-6 md:p-8',
              index < steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-slate-200' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="step-number block font-mono text-2xl sm:text-3xl text-slate-300 tabular-nums">
              {step.number}
            </span>
            <h3 className="step-title font-funneldisplay text-lg sm:text-xl text-slate-900 mt-4 mb-3">
              {step.title}
            </h3>
            <p className="step-example text-sm sm:text-base text-slate-500 leading-relaxed">
              {step.example}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
