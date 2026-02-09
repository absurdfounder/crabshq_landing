'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  Camera, 
  MessageCircle, 
  Code, 
  Globe, 
  Lock, 
  Zap, 
  Chrome,
  Bot,
  BookOpen,
  ScrollText
} from 'lucide-react';
import Logo from '@/public/images/logonew-black.png';
import MobileMenu from './mobile-menu';
import TabletMenu from './tablet-menu';
import TranslateButton from './TranslateButton';
import { getCalApi } from "@calcom/embed-react";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isBookHovered, setIsBookHovered] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [dropdownOpen]);

  // Initialize Cal.com booking widget
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "setup-call" });
      cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, []);

  return (
    <>
      {/* Main Header */}
      <header
        className={`w-full z-30 transition-all duration-300 ease-in-out w-full fixed top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 md:px-6 ${!top ? 'bg-none' : ''}`}
      >
        <div className="max-w-7xl mx-auto py-2 px-4 sm:py-2.5 sm:px-6">
          <div className="flex items-center justify-between h-11 sm:h-12 md:h-12">
            {/* Logo */}
            <div className='flex items-center'>
              <Link href="/" className="shrink-0 mr-2 sm:mr-4 relative group">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={260}
                  height={200}
                  className="relative w-44 h-auto sm:w-52 md:w-56 lg:w-48"
                  priority
                />
              </Link>

              <TranslateButton />
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex lg:grow">
              <ul className="flex gap-2 sm:gap-3 items-center justify-end w-full">
                <li className="relative" ref={dropdownRef}>
                  <button
                    className="font-bold text-slate-800 hover:text-[#009fbc] py-2 flex items-center transition duration-150 ease-in-out relative group text-base"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                  >
                    <span className="relative overflow-hidden text-ellipsis max-w-[120px] block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#009fbc] group-hover:after:w-full after:transition-all after:duration-300">Features</span>
                    <ChevronDown className={`w-4 h-4 ml-1 text-slate-400 transition-transform duration-200 flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-2 z-50"
                      >
                        <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black/5 bg-white">
                          <div className="p-6 w-[640px]">
                            <h3 className="mb-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                              Features
                            </h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                              <DropdownLink
                                href="/features/ai-help-center"
                                iconColor="text-sky-500"
                                bgColor="bg-sky-50"
                                icon={Sparkles}
                                title="Help Center"
                                description="Self-updating knowledge base"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/features/ai-documentation-agent"
                                iconColor="text-amber-500"
                                bgColor="bg-amber-50"
                                icon={Bot}
                                title="AI agent"
                                description="AI that writes your docs"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/features/automated-screenshots-for-docs"
                                iconColor="text-red-500"
                                bgColor="bg-red-50"
                                icon={Camera}
                                title="Automated screenshots"
                                description="Screenshots that stay current"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/features/self-service-help-widget"
                                iconColor="text-rose-500"
                                bgColor="bg-rose-50"
                                icon={MessageCircle}
                                title="Self-service widget"
                                description="Embed help in your product"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/create-a-blog-notion"
                                iconColor="text-blue-500"
                                bgColor="bg-blue-50"
                                icon={BookOpen}
                                title="Blog"
                                description="Beautiful automated blog"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/create-a-changelog-notion"
                                iconColor="text-indigo-500"
                                bgColor="bg-indigo-50"
                                icon={ScrollText}
                                title="Changelog"
                                description="Automated product updates"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/features/code-to-docs"
                                iconColor="text-violet-500"
                                bgColor="bg-violet-50"
                                icon={Code}
                                title="Code to help docs"
                                description="Sync docs with your code"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/features/multilingual-knowledge-base"
                                iconColor="text-teal-500"
                                bgColor="bg-teal-50"
                                icon={Globe}
                                title="Multilingual"
                                description="Translate your help center"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/features/internal-knowledge-base"
                                iconColor="text-stone-500"
                                bgColor="bg-stone-50"
                                icon={Lock}
                                title="Internal knowledge base"
                                description="Private docs with login required"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/features/generative-ai-customer-service"
                                iconColor="text-lime-600"
                                bgColor="bg-lime-50"
                                icon={Sparkles}
                                title="AI answers"
                                description="Help desk chatbot for support"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/integration"
                                iconColor="text-blue-500"
                                bgColor="bg-blue-50"
                                icon={Zap}
                                title="Integrations"
                                description="Connect your favorite tools"
                                onClick={() => setDropdownOpen(false)}
                              />
                              <DropdownLink
                                href="/features/chrome-extension-for-documentation"
                                iconColor="text-amber-700"
                                bgColor="bg-amber-50/50"
                                icon={Chrome}
                                title="Chrome extension"
                                description="Update docs from any tab"
                                onClick={() => setDropdownOpen(false)}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                <NavLink href="/showcase" text="Examples" />
                <NavLink href="/pricing" text="Pricing" />
                <NavLink href="https://app.crabshq.com" text="Login" />

                <li>
                  <button
                    data-cal-namespace="setup-call"
                    data-cal-link="set-meeting/setup-call"
                    data-cal-config='{"layout":"month_view"}'
                    className="btn-sm text-black border border-gray-200 bg-white hover:bg-slate-800 hover:text-white ml-2 flex items-center justify-between px-3 py-1.5 rounded-md transition duration-150 ease-in-out group overflow-hidden relative text-base"
                    onMouseEnter={() => setIsBookHovered(true)}
                    onMouseLeave={() => setIsBookHovered(false)}
                  >
                    <div className="relative z-10 overflow-hidden w-full">
                      <div className="flex items-center justify-between">
                        <span className="truncate max-w-[120px]">Sign In</span>
                      </div>
                    </div>
                  </button>
                </li>

                <li>
                  <Link
                    href="https://app.crabshq.com"
                    target='_blank'
                    className="btn-sm text-white bg-slate-900 hover:bg-slate-800 ml-2 flex items-center justify-between px-3 py-1.5 rounded-md transition duration-150 ease-in-out group overflow-hidden relative text-base"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="relative z-10 overflow-hidden w-full">
                      <div className="flex items-center justify-between">
                        <div className="transition-transform duration-300 transform truncate max-w-[150px]"
                          style={{
                            transform: isHovered ? 'translateY(-100%)' : 'translateY(0)'
                          }}>
                          Get Started for free
                        </div>
                        <div className="transition-transform duration-300 transform absolute top-0 left-0 truncate max-w-[150px]"
                          style={{
                            transform: isHovered ? 'translateY(0)' : 'translateY(100%)'
                          }}>
                          Takes 15 mins
                        </div>
                        <ArrowRight className="w-4 h-4 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Tablet menu */}
            <div className="hidden md:block lg:hidden">
              <TabletMenu />
            </div>

            {/* Mobile menu */}
            <div className="block md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

interface DropdownLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
  onClick?: () => void;
}

function DropdownLink({ href, icon: Icon, iconColor, bgColor, title, description, onClick }: DropdownLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-neutral-50 group"
    >
      <div className={`flex-shrink-0 ${iconColor} ${bgColor} transition-all duration-200 group-hover:scale-110 p-2.5 rounded-lg`}>
        <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-800 group-hover:text-[#009fbc] transition-colors duration-200 mb-0.5">
          {title}
        </p>
        <p className="text-xs text-neutral-500 leading-snug">
          {description}
        </p>
      </div>
    </Link>
  );
}

interface NavLinkProps {
  href: string;
  text: string;
}

function NavLink({ href, text }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="font-medium text-slate-900 hover:text-[#009fbc] px-1 py-2 flex items-center transition duration-150 ease-in-out relative group text-base"
    >
      <span className="relative truncate max-w-[120px] block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#009fbc] group-hover:after:w-full after:transition-all after:duration-300">{text}</span>
    </Link>
  );
}