"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Input suggestion options
const suggestionOptions = [
  "Job website with location filters",
  "Real estate directory with Sales AI",
  "Marketplace for handmade products",
  "Event listing platform for local events",
  "Knowledge base for software documentation"
];

// Typing animation phrases
const typingPhrases = [
  "my blog...",
  "an internal tool that...",
  "a portfolio...",
  "a directory...",
  "a helpdesk...",
  "a marketplace where..."
];

export default function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Typing animation states
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  // Controls typing speed
  const typingSpeed = 100; // milliseconds per character
  const deletingSpeed = 50; // milliseconds per character
  const pauseBeforeDelete = 1500; // pause before deleting starts
  const pauseBeforeNewPhrase = 500; // pause before new phrase starts

  // Typing animation effect
  useEffect(() => {
    if (!isAnimating) return;

    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedPhrase.length < typingPhrases[currentPhraseIndex].length) {
        // Still typing current phrase
        timeout = setTimeout(() => {
          setDisplayedPhrase(
            typingPhrases[currentPhraseIndex].substring(0, displayedPhrase.length + 1)
          );
        }, typingSpeed);
      } else {
        // Finished typing, pause before deleting
        setTypingComplete(true);
        timeout = setTimeout(() => {
          setIsTyping(false);
          setTypingComplete(false);
        }, pauseBeforeDelete);
      }
    } else {
      if (displayedPhrase.length > 0) {
        // Deleting
        timeout = setTimeout(() => {
          setDisplayedPhrase(displayedPhrase.substring(0, displayedPhrase.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next phrase
        timeout = setTimeout(() => {
          setCurrentPhraseIndex((currentPhraseIndex + 1) % typingPhrases.length);
          setIsTyping(true);
        }, pauseBeforeNewPhrase);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedPhrase, isTyping, currentPhraseIndex, isAnimating]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (isAnimating) {
      setIsAnimating(false);
    }
  };

  // Handle keypress (Enter)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setShowLoginPopup(true);
    }
  };

  // Add suggestion to input
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsAnimating(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close login popup
  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mb-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="relative">
        <div className="bg-white border border-slate-300 rounded-xl overflow-hidden opacity-80 hover:opacity-100 focus:opacity-100 active:opacity-100 shadow-md hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-red-300 focus-within:border-slate-600">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onClick={() => setIsAnimating(false)}
              placeholder={isAnimating ? "" : "Ask CrabsHQ  to create a ..."}
              className="w-full p-5 text-lg text-slate-700 outline-none resize-none min-h-[100px] placeholder:text-slate-400 font-lato border-transparent focus:outline-none focus:ring-0 focus:border-transparent opacity-75 hover:opacity-100 focus:opacity-100"
              rows={3}
            />

            {isAnimating && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-5 flex items-start text-lg text-slate-400 font-lato">
                Ask CrabsHQ  to create <span className="ml-2">{displayedPhrase}</span>
                <span className={`${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity text-red-500`}>|</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-gray-50 p-2 px-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex gap-2 items-center">
                <button
                  className="text-slate-900 hover:text-red-600 transition-colors rounded-md flex items-center justify-center gap-1 px-2 py-1.5 text-sm font-medium hover:bg-slate-100"
                  type="button"
                  onClick={() => setShowLoginPopup(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 -960 960 960"
                    className="shrink-0 h-4 w-4"
                    fill="currentColor"
                  >
                    <path
                      d="M180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h379q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v600h600v-378q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v378q0 24.75-17.62 42.37Q804.75-120 780-120zm520-579h-51q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h51v-51q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v51h51q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-51v51q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37zM449-307l-82-108q-5-6-12-6t-12 6l-84 109q-6 8-1.5 16t13.5 8h419q8.5 0 12.75-8t-.75-16L588-458q-5-6-12-6t-12 6zm31-173"
                    ></path>
                  </svg>
                  <span>Attach</span>
                </button>
                <input
                  id="file-upload"
                  className="hidden"
                  accept="image/jpeg,.jpg,.jpeg,image/png,.png,image/webp,.webp"
                  type="file"
                  tabIndex={-1}
                />
                <button
                  className="text-slate-900 hover:text-red-600 transition-colors rounded-md flex items-center justify-center gap-1 px-2 py-1.5 text-sm font-medium hover:bg-slate-100"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  data-state="closed"
                  onClick={() => setShowLoginPopup(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    className="shrink-0 h-4 w-4"
                  >
                    <mask
                      id="figma_logo_outline_svg__a"
                      width="21"
                      height="20"
                      x="0"
                      y="0"
                      maskUnits="userSpaceOnUse"
                    >
                      <path fill="#D9D9D9" d="M.286 0h20v20h-20z"></path>
                    </mask>
                    <g mask="url(#figma_logo_outline_svg__a)">
                      <path
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.25"
                        d="M5.772 5.716c0 .872.419 1.647 1.065 2.134a2.67 2.67 0 0 0-1.065 2.135c0 .873.419 1.647 1.065 2.135a2.67 2.67 0 0 0-1.065 2.134 2.68 2.68 0 0 0 2.683 2.67 2.704 2.704 0 0 0 2.705-2.693v-2.106c.446.333 1 .53 1.599.53h.046a2.67 2.67 0 0 0 1.606-4.805 2.67 2.67 0 0 0-1.606-4.805H8.443a2.67 2.67 0 0 0-2.67 2.67Zm6.987 5.867a1.598 1.598 0 0 1 0-3.196h.046a1.598 1.598 0 1 1 0 3.196zM8.443 8.387h1.645v3.196h-1.65a1.598 1.598 0 0 1 .005-3.196Zm-.005 4.269h1.65v1.575c0 .892-.734 1.621-1.633 1.621-.887 0-1.61-.719-1.61-1.598s.712-1.595 1.592-1.598Zm1.65-5.342H8.443a1.598 1.598 0 1 1 0-3.196h1.645zm2.717 0H11.16V4.118h1.645a1.598 1.598 0 1 1 0 3.196Z"
                      ></path>
                    </g>
                  </svg>
                  <span>Import</span>
                </button>
              </div>

              <div className="flex items-center">
                <button
                  id="chatinput-send-message-button"
                  type="submit"
                  className={`flex gap-2 px-2 items-center justify-center rounded-md p-1 ${
                    inputValue.trim()
                      ? "bg-slate-900 text-white hover:bg-red-600"
                      : "bg-slate-200 text-slate-400"
                  } transition-colors duration-150 ease-out`}
                  disabled={!inputValue.trim()}
                  onClick={() => inputValue.trim() && setShowLoginPopup(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 -960 960 960"
                    className="shrink-0 h-5 w-5"
                    fill="currentColor"
                  >
                    <path
                      d="M450-514v152q0 13 8.5 21.5T480-332t21.5-8.5T510-362v-152l53 53q9 9 21 9t21-9 9-21-9-21L501-607q-9-9-21-9t-21 9L355-503q-9 9-9 21t9 21 21 9 21-9zm30 434q-82 0-155-31.5t-127.5-86-86-127.5T80-480q0-83 31.5-156t86-127T325-848.5 480-880q83 0 156 31.5T763-763t85.5 127T880-480q0 82-31.5 155T763-197.5t-127 86T480-80"
                    ></path>
                  </svg>
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion buttons */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {suggestionOptions.map((suggestion, idx) => (
            <motion.button
              key={idx}
              className="text-sm bg-slate-100 opacity-75 hover:bg-slate-800 hover:opacity-100 text-slate-900 hover:text-white px-3 py-1.5 rounded-md border border-transparent transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <motion.div
            className="bg-slate-900 rounded-lg p-8 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-white">Sign in to continue</h2>
              <button onClick={closeLoginPopup} className="text-gray-500 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <p className="text-gray-300 mb-6 grid">
              Create an account or sign in to use AI Designer.
            </p>
            <a
              type="button"
              href="https://app.crabshq.com"
              className="w-full bg-white hover:bg-gray-100 text-slate-900 py-3 rounded block text-center"
            >
              Sign up for free
            </a>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
