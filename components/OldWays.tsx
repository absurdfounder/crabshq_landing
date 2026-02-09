'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sectionXPadding = "px-4 sm:px-6 lg:px-8";

export default function OldWays() {
  const [cardTransforms, setCardTransforms] = useState<Array<{ scale: number; opacity: number; y: number }>>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

const cards = [
  {
    tag: "AI ORGANIZATIONS",
    title: "AI organizations, not",
    highlight: "single-purpose agents.",
    description:
      "Crabs HQ lets you create AI organizations made up of multiple AI employees. Each organization works together on tasks, shares context, and coordinates execution — similar to how real teams operate.",
    image: "https://dazzling-cat.netlify.app/notion%20to%20website.png",
    alt: "AI organizations"
  },
  {
    tag: "SKILLS & INTEGRATIONS",
    title: "AI employees with real",
    highlight: "skills and system access.",
    description:
      "AI employees can be connected to skills like GitHub, Gmail, Apple Notes, databases, APIs, and internal tools through OpenClaw. They don’t just think — they operate inside your actual systems.",
    image: "https://dazzling-cat.netlify.app/integrationsdb.png",
    alt: "Skills and integrations"
  },
  {
    tag: "ACTION, NOT ANSWERS",
    title: "AI that takes",
    highlight: "action — not just questions.",
    description:
      "Instead of replying with suggestions, AI employees create issues, update files, send emails, take screenshots, post updates, and complete real tasks from start to finish.",
    image: "https://dazzling-cat.netlify.app/performancewebsite.png",
    alt: "AI taking action"
  },
  {
    tag: "INFINITE MEMORY",
    title: "Persistent memory across",
    highlight: "tasks, projects, and time.",
    description:
      "AI employees remember past work, decisions, preferences, and project context. Every task builds on previous knowledge, so work gets faster and more accurate over time.",
    image: "https://dazzling-cat.netlify.app/analyticsseo.png",
    alt: "Infinite memory"
  },
  {
    tag: "COLLABORATION",
    title: "Multiple AI employees",
    highlight: "working together.",
    description:
      "Complex tasks are automatically split across AI employees. Research, execution, review, and follow-ups happen in parallel — with shared memory and coordinated progress.",
    image: "https://dazzling-cat.netlify.app/aisupportreco.png",
    alt: "AI collaboration"
  },
  {
    tag: "OPENCLAW RUNTIME",
    title: "Powered by OpenClaw for",
    highlight: "high-agency execution.",
    description:
      "Crabs HQ is built on OpenClaw, enabling safe, observable, high-agency AI execution. Every action is logged, reviewable, and controllable from a single interface.",
    image: "https://dazzling-cat.netlify.app/write%20on%20notion.png",
    alt: "OpenClaw execution runtime"
  }
];


  useEffect(() => {
    const calculateTransforms = () => {
      const viewportHeight = window.innerHeight;
      const stickyTop = viewportHeight * 0.15; // 15% from top - more centered
      const transforms: { scale: number; opacity: number; y: number }[] = [];

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

    let rafId: number | undefined;
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
                ref={(el) => { cardRefs.current[index] = el; }}
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
                      <p className="text-sm font-bold uppercase tracking-wide text-red-600 font-silkscreen">
                        {card.tag}
                      </p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-funneldisplay font-bold tracking-tight text-slate-900 mt-3 sm:mt-4">
                        {card.title} <span className="font-normal text-red-600">{card.highlight}</span>
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