'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'

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
    <section 
      className="border border-neutral-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Video container with background */}
        <div 
          className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden p-6 md:p-8 lg:p-12 flex items-center justify-center"
          style={{
            backgroundImage: "linear-gradient(rgb(255 255 255), rgb(255 255 255 / 70%), rgb(255 255 255 / 48%)), url(https://dazzling-cat.netlify.app/backgroundgreysketch.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          {/* Video thumbnail */}
          <div 
            className="relative w-full rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            onClick={() => setModalOpen(true)}
          >
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
            <div className="flex items-center justify-center rounded-full bg-white/90 p-4 md:p-6 shadow-xl transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Modal - Responsive padding on smaller screens */}
      <Dialog 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="min-h-screen flex items-center justify-center px-2 md:px-4">
          {/* Backdrop */}
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />

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
      </Dialog>
      </div>
    </section>
  )
}