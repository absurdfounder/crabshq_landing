import Image from "next/image";

const sectionXPadding = "px-4 sm:px-6 lg:px-8";

const blocks = [
  {
    title: "Use your own domain or a subpath",
    body: "so your help site feels like a natural part of your main site.",
    image: "https://dazzling-cat.netlify.app/wonderdomain.png",
    alt: "Custom domain",
  },
  {
    title: "Built for search from day one",
    body: "so people discover your content on Google, ChatGPT, and other platforms.",
    image: "https://dazzling-cat.netlify.app/wonderdomain.png",
    alt: "SEO",
  },
  {
    title: "Lightning-fast article delivery",
    body: "boosting search rankings and helping customers get answers in no time.",
    image: "https://dazzling-cat.netlify.app/wonderdomain.png",
    alt: "Performance",
  }
];

export default function FeaturesBlocks() {
  return (
    <section className="relative py-12 md:py-16 bg-white">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-12">
        <div className="text-start">
          <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl mb-4 font-normal text-slate-800">
          Get discovered by <b>Users</b> and <b>AI assistants</b>           
          </h2>
          <p className="text-xl text-slate-600">
            CrabsHQ optimizes your content so it ranks on Google, surfaces in ChatGPT, and gets referenced by AI assistants — automatically.
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
