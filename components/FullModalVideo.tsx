'use client'

import { useState, useEffect } from 'react'

export default function TellaVideoButton() {
  const [modalOpen, setModalOpen] = useState(false)

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [modalOpen])

  return (
    <div className="flex justify-center items-center w-full px-4 py-6">
      {/* Main Button Component - Rotated and with hover effect */}
      <div 
        className="relative grid items-center w-full mx-auto border pl-2 md:pl-4 py-3 md:py-4 rounded-2xl md:rounded-3xl overflow-hidden transform -rotate-1 transition-all duration-300 hover:rotate-0 hover:shadow-2xl cursor-pointer p-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://framerusercontent.com/images/Rh8N2lKfT4GgxB0zJhxSsJE11Y.jpg?scale-down-to=4096)'
        }}
        onClick={() => setModalOpen(true)}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl md:rounded-3xl"></div>
        
        {/* Content wrapper with relative positioning */}
        <div className="relative z-10">
          {/* Video thumbnail - Full width on mobile, 2/5 width on larger screens */}
          <div className="relative w-full border rounded-md mb-3 md:mb-0 overflow-hidden">
            <div className="aspect-video">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="object-cover w-full h-full"
              >
                <source src="https://dazzling-cat.netlify.app/wonder.mp4" type="video/mp4" />
              </video>
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center rounded-xl bg-neutral-300/30 px-4 py-3 text-lg font-semibold text-gray-600 shadow-xl ring-4 shadow-gray-800/30 ring-gray-400/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-10 md:w-10 text-red-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </div>

      {/* Custom Modal - Responsive padding on smaller screens */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center px-2 md:px-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-75" 
              onClick={() => setModalOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative bg-black w-full max-w-5xl rounded-lg overflow-hidden z-10">
              {/* Close button */}
              <button
                className="absolute top-2 right-2 md:top-3 md:right-3 bg-black bg-opacity-60 rounded-full p-1 md:p-2 text-white z-20"
                onClick={() => setModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/MoQ4suV6lvU?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}