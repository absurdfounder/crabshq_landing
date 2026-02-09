'use client'

import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function TabletMenu() {
  const [tabletNavOpen, setTabletNavOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const tabletNav = useRef<HTMLDivElement>(null);

  // close the tablet menu on click outside
  useEffect(() => {
    if (!tabletNavOpen) return;
    
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!tabletNav.current || !trigger.current) return;
      if (tabletNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setTabletNavOpen(false);
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [tabletNavOpen]);

  // close the tablet menu if the esc key is pressed
  useEffect(() => {
    if (!tabletNavOpen) return;
    
    const keyHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setTabletNavOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [tabletNavOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (tabletNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [tabletNavOpen]);

  return (
    <div className="hidden md:flex lg:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${tabletNavOpen ? 'active' : ''}`}
        aria-controls="tablet-nav"
        aria-expanded={tabletNavOpen}
        onClick={() => setTabletNavOpen(!tabletNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-6 h-6 fill-current text-slate-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect y="4" width="24" height="2" rx="1" />
          <rect y="11" width="24" height="2" rx="1" />
          <rect y="18" width="24" height="2" rx="1" />
        </svg>
      </button>

      {/* Tablet navigation */}
      <Transition
        show={tabletNavOpen}
        as="div"
        ref={tabletNav}
        className="fixed inset-0 z-50 hidden md:block lg:hidden"
      >
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          onClick={() => {
            setTabletNavOpen(false);
            setDropdownOpen(false);
          }}
        />

        <Transition.Child
          as="nav"
          id="tablet-nav"
          className="absolute top-0 left-0 w-full h-full overflow-y-auto bg-white shadow-lg pt-16 pb-8"
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 -translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-full"
        >
          <ul className="px-5 py-4 space-y-4">
            {/* Website Examples */}
            <li>
              <Link href="/showcase" className="font-medium text-slate-600 hover:text-slate-900 px-5 py-3 flex items-center transition duration-150 ease-in-out w-full justify-between border-b-2" onClick={() => {
                setTabletNavOpen(false);
                setDropdownOpen(false);
              }}>
                Website Examples
              </Link>
            </li>

            {/* Affiliate Link */}
            <li>
              <Link href="https://wondersites.lemonsqueezy.com/affiliates" className="font-medium text-slate-600 hover:text-slate-900 px-5 py-3 flex items-center transition duration-150 ease-in-out w-full justify-between border-b-2" onClick={() => {
                setTabletNavOpen(false);
                setDropdownOpen(false);
              }}>
                Affiliate
              </Link>
            </li>

            {/* Pricing */}
            <li>
              <Link href="/pricing" className="font-medium text-slate-600 hover:text-slate-900 px-5 py-3 flex items-center transition duration-150 ease-in-out w-full justify-between border-b-2" onClick={() => {
                setTabletNavOpen(false);
                setDropdownOpen(false);
              }}>
                Pricing
              </Link>
            </li>

            {/* Build dropdown */}
            <li>
              <button
                className="font-medium text-slate-600 hover:text-slate-900 px-5 py-3 flex items-center transition duration-150 ease-in-out w-full justify-between border-b-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                aria-expanded={dropdownOpen}
              >
                Build
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ease-in-out ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <Transition
                show={dropdownOpen}
                enter="transition-all ease-out duration-200"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-[1000px]"
                leave="transition-all ease-in duration-150"
                leaveFrom="opacity-100 max-h-[1000px]"
                leaveTo="opacity-0 max-h-0"
                className="overflow-hidden w-full"
              >
                <div className="bg-white w-full pt-2 pb-2">
                  <ul className="space-y-2 px-2">
                    <li className="flex items-start p-2 sm:p-3 transition duration-150 ease-in-out rounded-lg hover:bg-slate-100">
                      <Link href="/create-a-helpdesk-servicedesk-notion" className="flex items-start w-full" onClick={() => {
                        setTabletNavOpen(false);
                        setDropdownOpen(false);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                          <span className="text-sm sm:text-base font-medium text-slate-900 block">
                            Help Center
                          </span>
                          <p className="mt-1 text-xs sm:text-sm text-slate-500">Get a professional self-service help center with Notion and Crabs HQ.</p>
                        </div>
                      </Link>
                    </li>

                    <li className="flex items-start p-2 sm:p-3 transition duration-150 ease-in-out rounded-lg hover:bg-slate-100">
                      <Link href="/create-a-blog-notion" className="flex items-start w-full" onClick={() => {
                        setTabletNavOpen(false);
                        setDropdownOpen(false);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5">
                          <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          ></path>
                        </svg>
                        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                          <span className="text-sm sm:text-base font-medium text-slate-900 block">
                            Blog
                          </span>
                          <p className="mt-1 text-xs sm:text-sm text-slate-500">Get a beautiful blog for your startup or company with Notion and Crabs HQ.</p>
                        </div>
                      </Link>
                    </li>

                    <li className="flex items-start p-2 sm:p-3 transition duration-150 ease-in-out rounded-lg hover:bg-slate-100">
                      <Link href="/create-a-documentation-notion" className="flex items-start w-full" onClick={() => {
                        setTabletNavOpen(false);
                        setDropdownOpen(false);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                        </svg>
                        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                          <span className="text-sm sm:text-base font-medium text-slate-900 block">
                            Product Docs
                          </span>
                          <p className="mt-1 text-xs sm:text-sm text-slate-500">Create product docs like wikis, api dashboards, etc;</p>
                        </div>
                      </Link>
                    </li>

                    <li className="flex items-start p-2 sm:p-3 transition duration-150 ease-in-out rounded-lg hover:bg-slate-100">
                      <Link href="/create-a-company-wiki-notion" className="flex items-start w-full" onClick={() => {
                        setTabletNavOpen(false);
                        setDropdownOpen(false);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                        </svg>
                        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                          <span className="text-sm sm:text-base font-medium text-slate-900 block">
                            Changelogs
                          </span>
                          <p className="mt-1 text-xs sm:text-sm text-slate-500">Create company wiki protected access and AI to answer queries on top of Notion as a database.</p>
                        </div>
                      </Link>
                    </li>

                    <li className="flex items-start p-2 sm:p-3 transition duration-150 ease-in-out rounded-lg hover:bg-slate-100">
                      <Link href="/create-a-marketplace-notion" className="flex items-start w-full" onClick={() => {
                        setTabletNavOpen(false);
                        setDropdownOpen(false);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                          <span className="text-sm sm:text-base font-medium text-slate-900 block">
                            Marketplace / Directories
                          </span>
                          <p className="mt-1 text-xs sm:text-sm text-slate-500">Get a self-serving community marketplace that can handle millions in traffic on Notion.</p>
                        </div>
                      </Link>
                    </li>

                  </ul>
                </div>
              </Transition>
            </li>

            {/* Login */}
            <li>
              <Link href="https://app.crabshq.com" className="font-medium text-slate-600 hover:text-slate-900 px-5 py-3 flex items-center transition duration-150 ease-in-out w-full justify-between border-b-2" onClick={() => {
                setTabletNavOpen(false);
                setDropdownOpen(false);
              }}>
                Login
              </Link>
            </li>

            {/* Create Website button */}
            <li className="pt-2">
              <Link
                href="https://app.crabshq.com"
                target='_blank'
                className="btn-sm text-white bg-slate-900 hover:bg-slate-800 w-full flex items-center justify-between px-5 py-3 rounded-md transition duration-300 ease-in-out group relative overflow-hidden"
                onClick={() => {
                  setTabletNavOpen(false);
                  setDropdownOpen(false);
                }}
              >
                <span className="relative z-10">Create free account</span>
                <div className="absolute bg-red-500 w-0 h-full left-0 top-0 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></div>
                <svg className="w-4 h-4 fill-current text-white shrink-0 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                </svg>
              </Link>
            </li>
          </ul>
        </Transition.Child>
      </Transition>
    </div>
  );
}