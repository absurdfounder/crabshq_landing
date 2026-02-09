"use client"

import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { Twitter, Linkedin } from 'lucide-react';

interface Testimonial {
  name: string;
  handle?: string;
  avatar: string;
  content: string;
  additionalContent?: string;
  platform?: 'twitter' | 'linkedin';
  category: string[];
}

// Updated testimonials with categories
const testimonials: Testimonial[] = [
  {
    name: "Zack Swire",
    handle: "@swire",
    avatar: "https://framerusercontent.com/images/688Eh9PtIW8FyDbcf5H3QvtePBA.jpeg",
    content:
      "If you're a Coach or a Creator, and you'd like to build better websites quickly, check out @Crabs_HQ",
    additionalContent: "I switched from Squarespace & I'm not looking back 🙌",
    platform: "twitter",
    category: ["All", "Blog", "Directory"]
  },
  {
    name: "Dan Rowden",
    handle: "@dr",
    avatar: "https://framerusercontent.com/images/ZPFWVz5iXLUOm3QgC66kg4NxQ30.jpeg",
    content: "Wow @Crabs_HQ is amazing ✨",
    platform: "twitter",
    category: ["All", "Product Docs", "Directory"]
  },
  {
    name: "Laura Evans-Hill",
    handle: "@EvansNifty",
    avatar: "https://framerusercontent.com/images/64FW2f03YxmX7qiS7QezpeGu4.png",
    content:
      "A HUGGGGEEEE shout out to @Crabs_HQ for putting me onto them—my course landing pages have never looked better.",
    platform: "twitter",
    category: ["All", "Helpdesk", "Blog"]
  },
  {
    name: "Alberto Di Risio",
    handle: "albertodirisio",
    avatar: "https://framerusercontent.com/images/B14xyvywVCK3F2McxEUBvZtI.jpeg",
    content:
      "First I downgraded my old site builder to the free plan. Then I stopped using it entirely.",
    additionalContent:
      "What am I using now?\n\nThis thing called CrabsHQ (crabshq.com) 🎉\n\nAfter trying it for half an hour I upgraded to a paid plan—and I really really like it.",
    platform: "linkedin",
    category: ["All", "Product Docs", "Marketplace"]
  },
  {
    name: "Annie Hwang",
    avatar: "https://framerusercontent.com/images/Y9stNCmCgju1PW4P2VKfoBK4Q.jpeg",
    content:
      "The customization in CrabsHQ is awesome. My product pages always look super fun and match Jemi's brand.",
    category: ["All", "Product Docs", "Blog"]
  },
  {
    name: "Ben Barrett-Forrest",
    avatar: "https://framerusercontent.com/images/VA5C0bceopw0oYN50h8gv6aP4.jpeg",
    content:
      "I was up and running with CrabsHQ in literally 2 minutes. I love how simple it is to launch landing pages. Would highly recommend!",
    category: ["All", "Helpdesk", "Directory"]
  },
  {
    name: "Max Haining",
    handle: "@HainingMax",
    avatar: "https://framerusercontent.com/images/N4NgdRImFNTAYSobmVTKVyb4vys.png",
    content:
      "@Crabs_HQ\n\nLike Webflow, but better.\n\nPerfect for...\n- Sharing course previews\n- Product demos\n- Creating sales funnels\n- Teaching your audience",
    platform: "twitter",
    category: ["All", "Product Docs", "Marketplace"]
  },
  {
    name: "Mike Futia",
    handle: "@mikefutia",
    avatar: "https://framerusercontent.com/images/CgcgsYZhqHDIikpyOTQoutkLPM.png",
    content:
      "The best new tool for building:\n\n- Course websites\n- Webinar pages\n- 1-on-1 booking sites\n- Or ANY type of landing page\n\nIs crabshq.com\n\nIt blows everything else out of the water.",
    platform: "twitter",
    category: ["All", "Blog", "Directory"]
  },
  {
    name: "Raffaele Gaito",
    avatar: "https://framerusercontent.com/images/D6HX35QUEaWpRufse6kuiDm3fo.png",
    content:
      "I love Wonder, it's a platform that has incredibly sped up my site creation speed. If I'm growing quickly on YouTube, I owe it also to CrabsHQ.",
    category: ["All", "Helpdesk", "Marketplace"]
  },
  {
    name: "Tom Critchlow",
    handle: "@tomcritchlow",
    avatar: "https://framerusercontent.com/images/Qh9VsRKfvO9HwGpy24f2XjHjY.jpeg",
    content:
      "Wrapping up day 1 of site building for my new course and just so much <3 for @Crabs_HQ\n\n- Impeccable and speedy support (even on a Sunday!)\n- Great templates (recognizing my brand's vibe instantly!)\n- Putting professional websites within reach (in browser!)",
    platform: "twitter",
    category: ["All", "Product Docs", "Helpdesk"]
  },
  {
    name: "Martin Cregut",
    handle: "martin-cregut",
    avatar: "https://framerusercontent.com/images/MkF6kIsOTqaahIQbedhHEcGmM.jpeg",
    content:
      "CrabsHQ c'est Webflow en 100x plus intuitif, 100x plus beau et 100x plus vaste.",
    platform: "linkedin",
    category: ["All", "Blog", "Marketplace"]
  },
  {
    name: "Justin Moore",
    handle: "@justinmoorefam",
    avatar: "https://framerusercontent.com/images/r5BRfhG49vqh8JZSzSVI8EnJ2k.jpg",
    content:
      "I just re-launched my entire course site on @Crabs_HQ and holy cow their multi-layout views and custom CSS are soooo sick 🤩",
    platform: "twitter",
    category: ["All", "Directory", "Marketplace"]
  },
  {
    name: "Mona",
    handle: "@simondela",
    avatar: "https://framerusercontent.com/images/tjmtGfBi6yjVmhqy5ZLuzQTm6E.png",
    content:
      "One more vote for @Crabs_HQ! Have been using other builders for 3 years now and CrabsHQ just kicks them out of the market imo.",
    platform: "twitter",
    category: ["All", "Helpdesk", "Product Docs"]
  },
];

const tabs = ['All', 'Product Docs', 'Blog', 'Helpdesk', 'Directory', 'Marketplace'] as const;
type Tab = typeof tabs[number];

const TestimonialsGrid: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);

  // Function to shuffle array - Fisher-Yates algorithm
  const shuffleArray = (array: Testimonial[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Update displayed testimonials when tab changes
  useEffect(() => {
    const filteredTestimonials = testimonials.filter(t => 
      t.category.includes(activeTab)
    );
    // Shuffle and limit to maximum 9 testimonials
    setDisplayedTestimonials(shuffleArray(filteredTestimonials).slice(0, 9));
  }, [activeTab]);

  const getRandomRotation = (): CSSProperties['transform'] => {
    const deg = Math.random() * 4 - 2;
    return `rotate(${deg}deg)`;
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Loved by entrepreneurs</h2>
          <p className="text-xl text-gray-600">
            We could toot our horn, but customers do it for us.
          </p>
        </header>

        {/* Tabs */}
        <nav className="flex justify-center flex-wrap gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Testimonials grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTestimonials.map((t, i) => (
            <article
              key={`${activeTab}-${i}`}
              className="bg-white rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 p-6 break-inside-avoid border"
              style={{ transform: getRandomRotation() }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={t.avatar}
                    alt={`${t.name}'s avatar`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{t.name}</h3>
                    {t.handle && (
                      <p className="text-gray-500 text-sm">{t.handle}</p>
                    )}
                  </div>
                </div>
                <div>
                  {t.platform === 'twitter' && (
                    <Twitter size={20} className="text-gray-400" />
                  )}
                  {t.platform === 'linkedin' && (
                    <Linkedin size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
              <div className="space-y-3 whitespace-pre-line">
                <p>{t.content}</p>
                {t.additionalContent && <p>{t.additionalContent}</p>}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default TestimonialsGrid;