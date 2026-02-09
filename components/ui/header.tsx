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
  Network,
  Terminal,
  Users,
  Github,
  CheckCircle,
  Brain,
  Mail,
  Puzzle,
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
        <div className="max-w-7xl mx-auto py-4 px-4 sm:py-2.5 sm:px-6">
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
                        className="absolute right-0 top-full mt-2 z-50"
                      >
                        <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black/5 bg-white">
                          <div className="p-6 w-[640px]">
                            <h3 className="mb-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                              Features
                            </h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">

                              <DropdownLink
                                href="/features/ai-workforce"
                                iconColor="text-purple-500"
                                bgColor="bg-purple-50"
                                icon={Users} // Add Users icon from lucide-react
                                title="AI Workforce"
                                description="Multiple AI employees working together"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/github-integration"
                                iconColor="text-slate-700"
                                bgColor="bg-slate-50"
                                icon={Github} // Add Github icon from lucide-react
                                title="GitHub Integration"
                                description="Autonomous commits, PRs, and code reviews"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/task-execution"
                                iconColor="text-emerald-500"
                                bgColor="bg-emerald-50"
                                icon={CheckCircle} // Add CheckCircle icon
                                title="Task Execution"
                                description="End-to-end task completion, not just answers"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/persistent-memory"
                                iconColor="text-indigo-500"
                                bgColor="bg-indigo-50"
                                icon={Brain} // Add Brain icon
                                title="Persistent Memory"
                                description="Remembers context across all tasks"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/browser-control"
                                iconColor="text-red-500"
                                bgColor="bg-red-50"
                                icon={Globe}
                                title="Browser Control"
                                description="Navigate web, fill forms, extract data"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/system-access"
                                iconColor="text-orange-500"
                                bgColor="bg-orange-50"
                                icon={Terminal} // Add Terminal icon
                                title="Full System Access"
                                description="Execute scripts, manage files, run commands"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/email-automation"
                                iconColor="text-red-500"
                                bgColor="bg-red-50"
                                icon={Mail} // Add Mail icon
                                title="Email & Communication"
                                description="Gmail, Slack, Discord integration"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/skills-plugins"
                                iconColor="text-violet-500"
                                bgColor="bg-violet-50"
                                icon={Puzzle} // Add Puzzle icon
                                title="Skills & Plugins"
                                description="Extend with community or custom skills"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/multi-agent-collaboration"
                                iconColor="text-cyan-500"
                                bgColor="bg-cyan-50"
                                icon={Network} // Add Network icon
                                title="Multi-Agent Teams"
                                description="AI employees collaborate on complex tasks"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/openclaw-powered"
                                iconColor="text-pink-500"
                                bgColor="bg-pink-50"
                                icon={Sparkles}
                                title="OpenClaw Runtime"
                                description="Built on proven OpenClaw framework"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/integration"
                                iconColor="text-red-500"
                                bgColor="bg-red-50"
                                icon={Zap}
                                title="Integrations"
                                description="GitHub, Gmail, Notion, APIs & more"
                                onClick={() => setDropdownOpen(false)}
                              />

                              <DropdownLink
                                href="/features/chat-interfaces"
                                iconColor="text-green-500"
                                bgColor="bg-green-50"
                                icon={MessageCircle}
                                title="Chat Anywhere"
                                description="WhatsApp, Telegram, Discord, Slack, Signal"
                                onClick={() => setDropdownOpen(false)}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>


                <li>
                  <Link
                    href="https://app.crabshq.com"
                    target='_blank'
                    className="btn-sm text-black border border-gray-200 bg-white hover:bg-slate-800 hover:text-white ml-2 flex items-center justify-between px-3 py-1.5 rounded-md transition duration-150 ease-in-out group overflow-hidden relative text-base"
                    onMouseEnter={() => setIsBookHovered(true)}
                    onMouseLeave={() => setIsBookHovered(false)}
                  >
                    <div className="relative z-10 overflow-hidden w-full">
                      <div className="flex items-center justify-between">
                        <span className="truncate max-w-[120px]">Sign In</span>
                      </div>
                    </div>
                  </Link>
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


          </div>
        </div>
      </header>
    </>
  );
}

interface DropdownLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: string | number }>;
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