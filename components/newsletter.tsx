'use client'

import React, { useState, useEffect } from 'react'; // Import React hooks
import Image from 'next/image'; // Import the Image component from Next.js
import Link from 'next/link';

// --- Reusable Flipping Button Component ---
interface FlippingButtonLinkProps {
  href: string;
  initialText: string;
  hoverText: string;
  className?: string; // To pass the dynamic styles
  target?: string;    // Prop for target attribute
  rel?: string;       // Prop for rel attribute
}

const FlippingButtonLink: React.FC<FlippingButtonLinkProps> = ({
  href,
  initialText,
  hoverText,
  className = '', // Default to empty string
  target,
  rel,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Base classes for the link structure and behavior
  // Note: Original button used 'btn' class which might imply specific base styles.
  // We use flexbox for centering and pass other styles via className.
  // Adjust padding/height as needed to match 'btn' style if necessary.
  const baseClasses = "flex items-center justify-center py-2.5 px-4 rounded-lg font-medium text-sm sm:text-base md:text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 relative";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${className}`} // Combine base and passed classes
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      target={target} // Pass target
      rel={rel}       // Pass rel
    >
      {/* Container for the flipping text - adjust height based on font size */}
      <div className="relative overflow-hidden h-6 sm:h-7 md:h-8 leading-tight"> {/* Responsive height for text */}
        {/* Initial Text */}
        <div
          style={{
            transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'transform 0.3s ease-in-out',
            whiteSpace: 'nowrap', // Prevent text wrapping during transition
          }}
        >
          {initialText}
        </div>
        {/* Hover Text */}
        <div
          className="absolute right-0 top-0 pointer-events-none hidden lg:block" // Center text
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease-in-out',
            whiteSpace: 'nowrap', // Prevent text wrapping during transition
          }}
        >
          {hoverText}
        </div>
      </div>
    </Link>
  );
};
// --- End of FlippingButtonLink Component ---


export default function Newsletter() {
  const words = ["Directory", "Marketplaces", "Directory"]; // Original list provided by user
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change word every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [words.length]); // Added dependency array

  return (
    <section className='bg-white'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 newsletter-section">
        <div className="pb-12 md:pb-20">

          {/* CTA box */}
          <div
            className="relative py-8 px-6 sm:px-8 md:py-16 md:px-12 overflow-hidden rounded-2xl my-8 border"
            style={{
              backgroundImage: 'linear-gradient(rgb(0 0 0 / 72%), rgb(0 0 0 / 51%)), url(https://dazzling-cat.netlify.app/backgroundgreysketch.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >

            {/* Background illustration */}
            <div className="absolute right-0 pointer-events-none hidden lg:block" >
              <Image alt="Logo"
                width={600}
                height={600}
                className="block"
                src="https://dazzling-cat.netlify.app/crabsperson.png" />
            </div>

            <div className="relative flex flex-col lg:flex-row justify-between items-center">

              {/* CTA content */}
              <div className="text-center lg:text-left lg:max-w-xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 my-2 leading-tight">
                  Try the <span style={{ color: '#f9551f' }}>alien tech</span> in your company.
                </h3>
                {/* Original rotating text logic (kept for reference) */}
                {/* <h3 className="text-slate-100 my-2">Build <span className="text-red-400">{words[index]}</span> Sites</h3> */}
                <p className="text-sm sm:text-base font-normal text-slate-100/75 my-2">
                  Deploy AI employees that write code, manage tasks, connect to 3,000 tools, and get things done — without the overhead of hiring.
                </p>

                {/* CTA form */}
                <form className="w-full lg:w-auto mt-6">
                  <div className="flex flex-col sm:flex-row gap-3 max-w-xs mx-auto sm:max-w-none lg:mx-0 lg:gap-2">
                    {/* --- UPDATED CTA Button --- */}
                    <Link
                      href="https://app.crabshq.com"
                      className="flex items-center justify-center py-2.5 px-4 rounded-lg font-medium text-sm sm:text-base md:text-lg text-white bg-red-600 hover:bg-red-700 w-full sm:w-auto whitespace-nowrap"
                    >
                      Get started for free
                    </Link>
                    {/* --- END OF UPDATE --- */}

                    {/* Original button commented out for reference */}
                    {/* <Link href="https://app.crabshq.com" className="btn text-dark text-2xl bg-red-300 hover:bg-red-700 hover:text-red-100 w-full mb-4 sm:w-auto sm:mb-0 flex items-center justify-center" >Create a free account</Link> */}

                    {/* Original Subscribe button (commented out in user code) */}
                    {/* <button type="submit" className="btn text-white bg-red-600 hover:bg-red-700 shadow" href="#0">Subscribe</button> */}
                  </div>
                  {/* Success message (commented out in user code) */}
                  {/* <p className="text-sm text-gray-400 mt-3">Thanks for subscribing!</p> */}
                  {/* <p className="text-sm text-gray-400 mt-3">No spam. You can unsubscribe at any time.</p> */}
                </form>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}