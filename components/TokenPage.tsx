'use client'

import React, { useState, useEffect } from 'react';

const BelieveLandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseUrl = 'https://believe.app';

  return (
    <div className=" flex flex-col items-center min-h-screen">



      {/* Hero Images */}
      <div className="w-full flex justify-center items-center flex-col relative pt-10 -mt-20 sm:-mt-24 -mb-12">
        <img 
          src={`${baseUrl}/images/hero-coin.png`} 
          alt="Believe Coin" 
          className="w-32 sm:w-56 relative z-20 animate-bounce -mb-8 sm:-mb-16" 
        />
        <img 
          src={`${baseUrl}/images/hero-shadow.png`} 
          alt="Shadow" 
          className="w-[400px] sm:w-[720px] max-w-[400px] sm:max-w-[720px] relative z-10 animate-pulse" 
        />
        <img 
          src={`${baseUrl}/images/hero-iphone.png`} 
          alt="iPhone Mockup" 
          className="w-[540px] max-w-[540px] sm:w-[960px] sm:max-w-[960px] z-0 -mt-44 sm:-mt-80" 
        />
      </div>

      {/* Features Section */}
      <div className="max-w-[85%] w-[1024px]">
        {/* Feature 1 */}
        <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-10 sm:gap-20 my-20 sm:my-30">
          <img src={`${baseUrl}/images/feature-3.png`} alt="Instant revenue" className="w-full sm:w-1/2" />
          <div className="w-full flex flex-col items-start gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Instant revenue</h2>
            <p className="text-lg text-neutral-600">Earn 0.5% in Solana on every buy of your coin. Revenue starts as soon as your project graduates.</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="w-full flex justify-center items-center flex-col sm:flex-row-reverse gap-10 sm:gap-20 my-20 sm:my-30">
          <img src={`${baseUrl}/images/feature-2.png`} alt="Find your first users" className="w-full sm:w-1/2" />
          <div className="w-full flex flex-col items-start gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Find your first users</h2>
            <p className="text-lg text-neutral-600">Reach early adopters and supporters directly through the Believe platform.</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="w-full flex justify-center items-center flex-col sm:flex-row gap-10 sm:gap-20 my-20 sm:my-30">
          <img src={`${baseUrl}/images/feature-1.png`} alt="Give back" className="w-full sm:w-1/2" />
          <div className="w-full flex flex-col items-start gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Give back</h2>
            <p className="text-lg text-neutral-600">Give your holders utility by enabling features like airdrops, burns, and custom rewards.</p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="max-w-[85%] w-[448px] flex flex-col items-center gap-4 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Believe it or not</h2>
        <p className="text-lg text-neutral-600">Already hundreds of founders launched their coins on Believe and some raised up to $500k.</p>
      </div>

      {/* Revenue Cards */}
      <div className="max-w-[85%] w-[1024px] flex flex-col md:flex-row items-center justify-center relative mb-16 md:mb-28">
        <div className="w-full flex flex-col items-center p-4 sm:p-12 relative">
          <h1 className="text-4xl sm:text-6xl font-bold tabular-nums -mt-8 z-10">$420,069</h1>
          <p className="relative z-10 text-neutral-600 mt-2">Coin revenue since launch</p>
          <a 
            className="w-full bg-white rounded-3xl shadow-xl shadow-black/5 flex justify-center items-center gap-4 p-4 hover:-translate-y-1 transition-all duration-200 mt-8 z-10" 
            target="_blank" 
            href={`${baseUrl}/token/dupe`}
          >
            <img className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-neutral-100" src={`${baseUrl}/images/avatar-dupe.png`} alt="Dupe" />
            <div className="w-full flex flex-col items-start">
              <h5 className="text-black font-semibold">Dupe.com</h5>
              <p className="uppercase text-sm text-neutral-600">$dupe</p>
            </div>
          </a>
        </div>

        <div className="w-full md:w-[1px] h-[1px] my-12 md:my-0 md:h-auto top-0 bottom-0 bg-black/5 relative md:absolute left-auto md:left-1/2 translate-x-0 md:-translate-x-1/2"></div>

        <div className="w-full flex flex-col items-center p-4 sm:p-16 relative">
          <h1 className="text-4xl sm:text-6xl font-bold tabular-nums -mt-8 z-10">$420,069</h1>
          <p className="relative z-10 text-neutral-600 mt-2">Coin revenue since launch</p>
          <a 
            className="w-full bg-white rounded-3xl shadow-xl shadow-black/5 flex justify-center items-center gap-4 p-4 hover:-translate-y-1 transition-all duration-200 mt-8 z-10" 
            target="_blank" 
            href={`${baseUrl}/token/superfriend`}
          >
            <img className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-neutral-100" src={`${baseUrl}/images/avatar-sf.png`} alt="Superfriend" />
            <div className="w-full flex flex-col items-start">
              <h5 className="text-black font-semibold">Superfriend</h5>
              <p className="uppercase text-sm text-neutral-600">$superfriend</p>
            </div>
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full flex justify-center py-12 sm:py-16 bg-gray-50 text-left">
        <div className="max-w-[85%] w-[1024px] flex items-center flex-col lg:flex-row gap-20">
          <div className="w-full flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
            <h2 className="w-full md:w-1/2 lg:w-full text-3xl sm:text-4xl font-bold leading-tight">Participate in giveways and trading competions</h2>
            <p className="mb-3 text-lg text-neutral-600">Let others believe in your next million dollar idea.</p>
            
            <a 
              target="_blank" 
              className="bg-white flex justify-center items-center gap-6 rounded-3xl p-4 shadow-lg shadow-black/5 hover:-translate-y-1 transition-all duration-200 w-80 hidden lg:flex" 
              href="https://apps.apple.com/us/app/believe/id6737437664"
            >
              <div className="w-20 flex-shrink-0">
                <img src={`${baseUrl}/images/qr.svg`} alt="QR Code" className="w-full h-auto" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h4 className="text-black text-xl font-semibold">Available on iOS</h4>
                <p className="text-sm">Point your camera at the QR code to download.</p>
              </div>
            </a>
            
            <a 
              className="flex items-center justify-center font-semibold gap-2 py-2 px-4 rounded-full transition-all duration-200 flex-shrink-0 cursor-pointer mx-[-1px] bg-red-600 hover:bg-red-700 text-white flex lg:hidden" 
              target="_blank" 
              href="https://apps.apple.com/us/app/believe/id6737437664"
            >
              <img src={`${baseUrl}/images/icons/apple.svg`} alt="apple" className="w-4 h-4 -mt-0.5" />
              Download on iOS
            </a>
          </div>
          
          <div className="w-full max-w-full sm:w-[480px] sm:h-[360px] sm:min-w-[480px] sm:min-h-[360px] flex-shrink-0 relative flex justify-center">
            <img src={`${baseUrl}/images/graphic-chart-m.png`} className="w-full h-full block sm:hidden" alt="Chart Mobile" />
            <img src={`${baseUrl}/images/graphic-chart.png`} className="w-full h-full hidden sm:block" alt="Chart Desktop" />
          </div>
        </div>
      </div>


    </div>
  );
};

export default BelieveLandingPage;