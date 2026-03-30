'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu, ChevronRight } from 'lucide-react';

interface MenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [buildMenuOpen, setBuildMenuOpen] = useState(false);

  const buildItems: MenuItem[] = [
    {
      label: 'Help Center',
      href: '/create-a-helpdesk-servicedesk-notion',
      description: 'Professional self-service help center with Notion',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      label: 'Blog',
      href: '/create-a-blog-notion',
      description: 'Beautiful blog for your startup with Notion',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      label: 'Changelogs',
      href: '/create-a-company-wiki-notion',
      description: 'Company wiki with protected access and AI',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
    {
      label: 'Product Docs',
      href: '/create-a-documentation-notion',
      description: 'Product docs, wikis, and API dashboards',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      label: 'Marketplace',
      href: '/create-a-marketplace-notion',
      description: 'Community marketplace handling millions in traffic',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
    setBuildMenuOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-900" />
        ) : (
          <Menu className="w-6 h-6 text-slate-900" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={handleClose}
          style={{
            animation: 'fadeIn 0.2s ease-out',
          }}
        />
      )}

      {/* Side Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Menu</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {/* Affiliate */}
              <Link
                href="https://crabshq.lemonsqueezy.com/affiliates"
                onClick={handleClose}
                className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Affiliate</span>
              </Link>

              {/* Pricing */}
              <Link
                href="/pricing"
                onClick={handleClose}
                className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Pricing</span>
              </Link>

              {/* Download */}
              <Link
                href="/download"
                onClick={handleClose}
                className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Download</span>
              </Link>

              {/* Build Dropdown */}
              <div>
                <button
                  onClick={() => setBuildMenuOpen(!buildMenuOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <span className="font-medium">Build</span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      buildMenuOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* Build Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    buildMenuOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 pr-2 py-2 space-y-2">
                    {buildItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={handleClose}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <div className="text-red-600 flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-900 text-sm group-hover:text-red-600 transition-colors">
                            {item.label}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Login */}
              <Link
                href="https://app.crabshq.com"
                onClick={handleClose}
                className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Login</span>
              </Link>
            </nav>
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-slate-200">
            <Link
              href="https://app.crabshq.com"
              target="_blank"
              onClick={handleClose}
              className="flex items-center justify-center w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-medium group"
            >
              <span>Create free account</span>
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path
                  d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
