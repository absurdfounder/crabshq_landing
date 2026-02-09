"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  videoSrc?: string;
  special?: boolean;
}

const SimpleAnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analytics');
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tabs: TabItem[] = [
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    },
    { 
      id: 'memberships', 
      label: 'Memberships & Paywall', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/memberships-shot.mp4'
    },
    { 
      id: 'content', 
      label: 'Content AI', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    },
    { 
      id: 'forms', 
      label: 'Forms', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    },
    { 
      id: 'seo', 
      label: 'SEO', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    },
    { 
      id: 'integrations', 
      label: 'Integrations', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    },
    { 
      id: 'branding', 
      label: 'Editor', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    },
    { 
      id: 'component_generator', 
      label: 'Code Generator', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    },
    { 
      id: 'wonderai', 
      label: 'AI Agents', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    },
    { 
      id: 'widgets', 
      label: 'Widgets', 
      icon: <Play size={16} />,
      videoSrc: 'https://dazzling-cat.netlify.app/analytics-shot.mp4'
    }
  ];

  const getCurrentVideoSrc = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab?.videoSrc || 'https://your-domain.com/videos/default-demo.mp4';
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsVideoLoading(true);
    setVideoError(false);

    // Simulate video loading time
    setTimeout(() => {
      setIsVideoLoading(false);
    }, 800);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsVideoLoading(false);
  };

  const handleVideoLoad = () => {
    setVideoError(false);
    setIsVideoLoading(false);
  };

  useEffect(() => {
    // Reset and play the video when the tab changes
    if (videoRef.current && !isVideoLoading) {
      videoRef.current.load(); // Reload the video with new source
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Autoplay prevented');
      });
    }
  }, [activeTab, isVideoLoading]);

  useEffect(() => {
    // Simulate initial video load completing
    const timer = setTimeout(() => {
      setIsVideoLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-gray-900 p-8 w-full max-w-6xl mx-auto rounded-lg">
      <h2 className="font-bold text-3xl mb-4 m-auto text-center mt-8">
        We know you're busy.
        <span className="block font-normal text-red-600">Experience clutter-free dashboard</span>
      </h2>

      {/* Header */}
      <div className="text-center mb-12 px-4">
        <p className="text-xl font-medium mb-4 max-w-4xl m-auto">
          Build and forget about us. Focus on what's important: the services that your business provides.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center max-w-4xl m-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md border-2 font-bold border-red-300 text-red-500 transition-all duration-200
              ${tab.special
                ? 'text-red-900 border-red-500'
                : activeTab === tab.id
                  ? 'bg-red-600 border-red-600 text-white shadow-lg'
                  : 'bg-white/50 hover:bg-white hover:shadow-md'
              }
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Chart/Video Section */}
      <div className="relative w-full bg-slate-900/70 rounded-lg overflow-hidden shadow-lg">
        {isVideoLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white text-xl font-medium">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              Loading {tabs.find(t => t.id === activeTab)?.label} Demo...
            </div>
          </div>
        ) : videoError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-red-600 text-white text-center p-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Video Unavailable</h3>
              <p className="text-sm opacity-90">
                Unable to load the {tabs.find(t => t.id === activeTab)?.label} demo video.
                <br />Please check your internet connection.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              controls={false}
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              onCanPlay={handleVideoLoad}
            >
              <source src={getCurrentVideoSrc()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video overlay with tab info */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md backdrop-blur-sm">
              {tabs.find(t => t.id === activeTab)?.label} Demo
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default SimpleAnalyticsDashboard;