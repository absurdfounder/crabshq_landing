'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sectionXPadding = "px-4 sm:px-6 lg:px-8";

export default function OldWays() {
  const [cardTransforms, setCardTransforms] = useState([]);
  const cardRefs = useRef([]);

  const cards = [
    {
      tag: "No Hosting Hassles",
      title: "Your content",
      highlight: "lives inside Notion or Github",
      description: "Your work stays in a place you control and love, while Wonder handles the technical parts of publishing it to your website. This means you can focus on what's actually important to you: creating content and building your brand without worrying about configurations, plugins, downtime, performance, or security.",
      image: "https://dazzling-cat.netlify.app/write%20on%20notion.png",
      alt: "Write on Notion"
    },
    {
      tag: "Optimized for",
      title: "Perfected for",
      highlight: "SEO",
      description: "All you have to do is to write good content that satisfies the needs of your readers. We take care of the rest. Set all the proper meta tags and canonical links, Structured Schema markup for all your posts, Served from the edge to make the blog super fast, Easy controls to override the SEO settings.",
      image: "https://dazzling-cat.netlify.app/performancewebsite.png",
      alt: "Performance Website"
    },
    {
      tag: "Paid Subscribers",
      title: "Membership for",
      highlight: "paid subscribers.",
      description: "Style the look and feel of your site with no-code themes and designer templates. Everything can be customized inside Wonder without code to make you proud of the unique site you share with the world. Add custom-code only if you want to.",
      image: "https://dazzling-cat.netlify.app/notion%20to%20website.png",
      alt: "Notion to Website"
    },
    {
      tag: "In-built",
      title: "In-built",
      highlight: "analytics",
      description: "See your page views, visitors, referrers, clicks, and much more for all of your websites. Wonder provides Inbuilt analytics for all your sites to help you find out where people are finding your blog, which links people are clicking the most, which of your posts are popular.",
      image: "https://dazzling-cat.netlify.app/analyticsseo.png",
      alt: "Analytics SEO"
    },
    {
      tag: "AI SUPPORT & SUGGESTIONS",
      title: "Intelligent assistance",
      highlight: "for your users.",
      description: "Create AI Agents for support, suggestions, sales, therapy or any other purposes you have in mind. Because it's 2025 and AI is cheap. Make AI do most of work so that you can focus on whats important.",
      image: "https://dazzling-cat.netlify.app/aisupportreco.png",
      alt: "AI Support"
    },
    {
      tag: "Integrates with",
      title: "Integrates with",
      highlight: "your existing apps",
      description: "Wonder integrates with the tools you already use. Connect to Slack for notifications, embed your live chat widget from Intercom, Hubspot, Crisp and more. Need your app connected to Crabs HQ? We got you covered.",
      image: "https://dazzling-cat.netlify.app/integrationsdb.png",
      alt: "Integrations DB"
    }
  ];

  useEffect(() => {
    const calculateTransforms = () => {
      const viewportHeight = window.innerHeight;
      const stickyTop = viewportHeight * 0.15; // 15% from top - more centered
      const transforms = [];

      // Find which card is currently "active" (at sticky position)
      let activeCardIndex = 0;
      
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        if (rect.top <= stickyTop + 10) {
          activeCardIndex = index;
        }
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          transforms.push({ scale: 1, opacity: 1, y: 0 });
          return;
        }

        const rect = card.getBoundingClientRect();
        const distanceFromSticky = rect.top - stickyTop;
        
        // How many cards are stacked on top of this one
        const cardsOnTop = Math.max(0, activeCardIndex - index);
        
        if (cardsOnTop > 0) {
          // This card is behind other cards
          const scaleReduction = 0.06 * cardsOnTop;
          const scale = Math.max(0.7, 1 - scaleReduction);
          const opacity = Math.max(0, 1 - (0.25 * cardsOnTop));
          const y = -20 * cardsOnTop;
          
          transforms.push({ scale, opacity, y });
        } else if (distanceFromSticky > 0 && distanceFromSticky < 300) {
          // Card is approaching sticky position - animate it in
          const progress = 1 - (distanceFromSticky / 300);
          transforms.push({ 
            scale: 1, 
            opacity: 1,
            y: 0
          });
        } else {
          // Card is at normal position or is the active card
          transforms.push({ scale: 1, opacity: 1, y: 0 });
        }
      });

      setCardTransforms(transforms);
    };

    calculateTransforms();

    let rafId;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateTransforms);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateTransforms);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateTransforms);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section 
      className="bg-white relative"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(186, 183, 195, 0.08) 2px, rgba(186, 183, 195, 0.08) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(186, 183, 195, 0.08) 2px, rgba(186, 183, 195, 0.08) 4px)',
        backgroundSize: '100% 20px, 20px 100%',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div 
          className="relative"
          style={{ perspective: '1000px' }}
        >
          {cards.map((card, index) => {
            const transform = cardTransforms[index] || { scale: 1, opacity: 1, y: 0 };
            const isLast = index === cards.length - 1;
            
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="xl:sticky mb-6 lg:mb-8"
                style={{
                  top: 'calc(15vh)', // Sticky at 15% from viewport top
                  zIndex: cards.length + index, // Later cards always on top
                  marginBottom: isLast ? '0' : undefined,
                }}
              >
                <div
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-lg transition-[filter] duration-200"
                  style={{
                    transform: `scale(${transform.scale}) translateY(${transform.y}px)`,
                    opacity: transform.opacity,
                    transformOrigin: 'center top',
                    filter: transform.scale < 1 ? `blur(${(1 - transform.scale) * 15}px)` : 'none',
                    boxShadow: transform.scale < 1 
                      ? `0 25px 50px -12px rgba(0, 0, 0, ${0.15 + (1 - transform.scale) * 0.2})`
                      : '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                  }}
                >
                  <div className="grid md:flex items-center bg-white">
                    <div className={`${sectionXPadding} py-8 sm:py-10 lg:py-12 md:w-2/5 w-full`}>
                      <p className="text-sm font-bold uppercase tracking-wide text-blue-600 font-silkscreen">
                        {card.tag}
                      </p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-funneldisplay font-bold tracking-tight text-slate-900 mt-3 sm:mt-4">
                        {card.title} <span className="font-normal text-orange-600">{card.highlight}</span>
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    <div 
                      className="w-full px-4 md:px-6 pt-6 pb-4 md:pb-6 md:w-3/5"
                      style={{
                        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      }}
                    >
                      <Image
                        src={card.image}
                        alt={card.alt}
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-xl object-cover shadow-sm"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}