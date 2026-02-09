import Image from "next/image";

const sectionXPadding = "px-4 sm:px-6 lg:px-8";

const blocks = [
  {
    title: "Advanced analytics",
    body: "show you how your customers are using your help center, what articles are performing well, and where there's room for improvement.",
    image: "https://dazzling-cat.netlify.app/wonderdomain.png",
    alt: "Analytics",
  },
  {
    title: "World-class editor",
    body: "helps you create and edit content faster than any other platform.",
    image: "https://dazzling-cat.netlify.app/wonderdomain.png",
    alt: "Editor",
  },
  {
    title: "Customer feedback",
    body: "collect positive and negative feedback from your customers, and use them to improve your help center over time.",
    image: "https://dazzling-cat.netlify.app/wonderdomain.png",
    alt: "Feedback",
  }
];

export default function FeaturesBlocks() {
  return (
    <section className="relative py-12 md:py-16">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-12">
        <div className="text-start">
          <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl mb-4 text-slate-800">
          Optimize
          </h2>
          <p className="text-xl text-slate-600 mb-2">
            Continuously improve your help center
          </p>
          <p className="text-lg text-slate-600">
            CrabsHQ gives you the tools you need to optimize your help center and improve customer satisfaction.
          </p>
        </div>
      </div>

      {/* 3-column grid with cards - max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {blocks.map((block) => (
          <section
            key={block.title}
            className="flex flex-col rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={sectionXPadding}>
              <div className="grid items-start gap-8 md:grid-cols-1 md:gap-12">
                <div className="md:order-1 pt-12 pb-12">
                  <p className="body-text mt-6 max-w-4xl text-base text-slate-700">
                    <b className="font-semibold text-slate-900">{block.title}</b> {block.body}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:order-2 mt-auto">
              <Image
                alt={block.alt}
                src={block.image}
                width={1200}
                height={600}
                className="w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>
        ))}
        </div>
      </div>
    </section>
  );
}
