import React, { useState, useEffect, useRef } from 'react';
import { Info, BarChart3, Users, ArrowDownUp, FolderTree, ShoppingBag } from 'lucide-react';

// Define types for TypeScript
type Hotspot = {
  id: number;
  x: number;
  y: number;
  text: string;
};

type Tab = {
  title: string;
  image: string;
  hotspots: Hotspot[];
  icon: React.ReactNode;
  activeColor: string;
  inactiveColor: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
};

const TabImageHotspots = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isComponentHovered, setIsComponentHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoSwitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const tabs: Tab[] = [
    {
      title: 'Helpdesk',
      image: 'https://dazzling-cat.netlify.app/marketingai.png',
      icon: <Users size={isMobile ? 16 : 20} />,
      activeColor: 'bg-red-100',
      inactiveColor: 'bg-red-50',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-500',
      hotspots: [

      ]
    },
    {
      title: 'Blog',
      image: 'https://dazzling-cat.netlify.app/airdropswork.png',
      icon: <ArrowDownUp size={isMobile ? 16 : 20} />,
      activeColor: 'bg-green-100',
      inactiveColor: 'bg-green-50',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-500',
      hotspots: [

      ]
    },
    {
      title: 'Product Docs',
      image: 'https://dazzling-cat.netlify.app/marketingai.png',
      icon: <BarChart3 size={isMobile ? 16 : 20} />,
      activeColor: 'bg-yellow-100',
      inactiveColor: 'bg-yellow-50',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-500',
      hotspots: [

      ]
    },
    {
      title: 'Changelogs',
      image: 'https://dazzling-cat.netlify.app/remotejobs.png',
      icon: <ShoppingBag size={isMobile ? 16 : 20} />,
      activeColor: 'bg-pink-100',
      inactiveColor: 'bg-pink-50',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800',
      borderColor: 'border-pink-500',
      hotspots: [

      ]
    }
  ];

  // Auto-switching functionality - only when user is not interacting
  useEffect(() => {
    if (autoSwitchTimerRef.current) {
      clearTimeout(autoSwitchTimerRef.current);
    }
    
    // Only auto-switch if user is not hovering over component and not actively interacting
    if (!isComponentHovered && !isUserInteracting) {
      autoSwitchTimerRef.current = setTimeout(() => {
        setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
      }, 3000);
    }

    return () => {
      if (autoSwitchTimerRef.current) {
        clearTimeout(autoSwitchTimerRef.current);
      }
    };
  }, [activeTab, isComponentHovered, isUserInteracting, tabs.length]);

  useEffect(() => {
    setImagesLoaded(new Array(tabs.length).fill(false));
    tabs.forEach((tab, index) => {
      const img = new Image();
      img.src = tab.image;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
    
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHotspotInteraction = (hotspotId: number) => {
    setActiveHotspot(activeHotspot === hotspotId ? null : hotspotId);
    // Mark user as interacting to prevent auto-switching
    setIsUserInteracting(true);
    
    // Clear existing timer
    if (userInteractionTimerRef.current) {
      clearTimeout(userInteractionTimerRef.current);
    }
    
    // Reset interaction state after 5 seconds of no interaction
    userInteractionTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  const changeTab = (index: number) => {
    setActiveTab(index);
    setActiveHotspot(null);
    
    // Mark user as interacting to prevent immediate auto-switching
    setIsUserInteracting(true);
    
    // Clear existing timer
    if (userInteractionTimerRef.current) {
      clearTimeout(userInteractionTimerRef.current);
    }
    
    // Reset interaction state after 5 seconds
    userInteractionTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  const calculateTooltipPosition = (x: number, y: number) => {
    // Mobile-first approach for tooltip positioning
    if (windowWidth < 640) {
      return {
        left: '50%',
        top: y > 50 ? '-90px' : '40px',
        transform: 'translateX(-50%)',
        maxWidth: '280px'
      };
    } else if (windowWidth < 1024) {
      // Tablet positioning
      return {
        left: x > 50 ? '-250px' : '35px',
        top: y > 50 ? '-70px' : '10px',
        transform: 'none',
        maxWidth: '240px'
      };
    }
    // Desktop positioning
    return {
      left: x > 50 ? '-270px' : '30px',
      top: y > 50 ? '-80px' : '0px',
      transform: 'none',
      maxWidth: '260px'
    };
  };

  // Determine responsive breakpoints
  const isExtraSmall = windowWidth < 480;
  const isSmall = windowWidth < 640;
  const isMedium = windowWidth < 1024;

  return (
    <div className="w-full max-w-7xl rounded-lg px-1 sm:px-2 md:px-4">
      {/* Inline style for ::before pseudo-element */}
      <style>{`
        .active-tab::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: inherit;
          z-index: 20;
        }
        @media (max-width: 640px) {
          .hotspot-tooltip {
            font-size: 12px;
            padding: 8px 12px;
            line-height: 1.4;
          }
        }
      `}</style>

      <div 
        className="relative"
        onMouseEnter={() => setIsComponentHovered(true)}
        onMouseLeave={() => setIsComponentHovered(false)}
      >
        {/* Responsive Tab Navigation */}
        <div className={`flex m-auto ${isExtraSmall ? 'gap-0.5' : 'gap-1'} w-full  mt-4 sm:mt-6 md:mt-8 overflow-hidden`}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`
                ${isExtraSmall ? 'px-2 py-1.5' : isSmall ? 'px-3 py-2' : 'px-4 py-2'}
                flex items-center justify-center
                ${isExtraSmall ? 'gap-1' : 'gap-2'} 
                border-b-transparent
                font-medium 
                ${isExtraSmall ? 'text-xs' : isSmall ? 'text-sm' : 'text-sm sm:text-base'}
                transition-all duration-200 
                rounded-t-lg border-b-0 
                relative z-10
                min-w-0 flex-shrink-0
                ${activeTab === index
                  ? `active-tab ${tab.activeColor} border-t-2 border-r-2 border-l-2 ${tab.borderColor}`
                  : `${tab.inactiveColor} border border-gray-300 shadow-inner`
                }
                ${tab.textColor}
                touch-manipulation
              `}
              onClick={() => changeTab(index)}
              style={{ marginBottom: '-1px' }}
            >
              <span className={`${isExtraSmall ? 'p-0.5' : 'p-1'} rounded-md flex-shrink-0`}>
                {tab.icon}
              </span>
              {/* Show full text without truncation */}
              {(!isExtraSmall || activeTab === index) && (
                <span className="whitespace-nowrap">
                  {tab.title}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div
          className={`
            relative w-full 
            ${tabs[activeTab].bgColor} 
            rounded-b-xl rounded-md 
            overflow-hidden 
            ${isExtraSmall ? 'p-2' : isSmall ? 'p-4' : 'p-6'}
            shadow-md 
            transition-colors duration-300 
            border-2 
            ${tabs[activeTab].borderColor}
          `}
        >
          <div className="rounded-xl overflow-hidden bg-white shadow-2xl border border-gray-200">
            {/* Browser Chrome - Responsive */}
            <div className={`bg-gray-100 ${isExtraSmall ? 'px-2 py-1' : isSmall ? 'px-3 py-1.5' : 'px-4 py-2'} border-b border-gray-200`}>
              <div className="flex gap-1 sm:gap-2">
                <div className={`${isExtraSmall ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-red-400`}></div>
                <div className={`${isExtraSmall ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-yellow-400`}></div>
                <div className={`${isExtraSmall ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-green-400`}></div>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative min-h-0">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`${activeTab === index ? 'block' : 'hidden'} relative`}
                >
                  {!imagesLoaded[index] && (
                    <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 animate-pulse flex items-center justify-center">
                      <span className={`text-gray-500 ${isSmall ? 'text-sm' : 'text-base'}`}>Loading...</span>
                    </div>
                  )}

                  <img
                    src={tab.image}
                    alt={`${tab.title} interface`}
                    className={`w-full h-auto max-h-[70vh] object-contain ${imagesLoaded[index] ? 'block' : 'hidden'}`}
                    onLoad={() => {
                      setImagesLoaded(prev => {
                        const newState = [...prev];
                        newState[index] = true;
                        return newState;
                      });
                    }}
                  />

                  {/* Responsive Hotspots */}
                  {imagesLoaded[index] && tab.hotspots.map((hotspot) => (
                    <div
                      key={hotspot.id}
                      className="absolute"
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <button
                        className={`cursor-pointer flex items-center justify-center transition-all duration-300 z-10 touch-manipulation
                          ${isExtraSmall ? 'w-5 h-5' : isSmall ? 'w-6 h-6' : 'w-8 h-8'} 
                          rounded-full
                          ${activeHotspot === hotspot.id
                            ? 'bg-red-600 text-white scale-110'
                            : 'bg-white text-red-600 hover:bg-red-100 shadow-md hover:scale-105'
                          }`}
                        onClick={() => handleHotspotInteraction(hotspot.id)}
                        onMouseEnter={() => !isMobile && handleHotspotInteraction(hotspot.id)}
                        onMouseLeave={() => !isMobile && setActiveHotspot(null)}
                        aria-label={`Info about ${hotspot.text}`}
                      >
                        <Info size={isExtraSmall ? 10 : isSmall ? 12 : 16} />
                      </button>

                      {/* Responsive Tooltips */}
                      {activeHotspot === hotspot.id && (
                        <div
                          className={`absolute z-20 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 hotspot-tooltip
                            ${isExtraSmall ? 'p-2 text-xs' : isSmall ? 'p-2.5 text-sm' : 'p-3 text-sm'}
                            ${isSmall ? 'w-64' : 'w-48 sm:w-64'}
                            text-gray-700 leading-relaxed
                          `}
                          style={calculateTooltipPosition(hotspot.x, hotspot.y)}
                        >
                          {hotspot.text}
                          {/* Arrow pointer for better UX */}
                          <div className={`absolute w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45
                            ${hotspot.y > 50 ? 'bottom-[-4px]' : 'top-[-4px] rotate-[-135deg]'}
                            left-1/2 translate-x-[-50%]
                          `}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>






    </div>
  );
};

export default TabImageHotspots;