"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  Apple,
  Smartphone,
  Download,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/ui/header";

type Platform = "mac" | "windows" | "ios" | "android" | "unknown";

interface PlatformInfo {
  key: Platform;
  label: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  buttonText: string;
}

const SiWindows = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

const SiApple = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const platforms: PlatformInfo[] = [
  {
    key: "mac",
    label: "macOS",
    icon: <SiApple className="h-6 w-6" />,
    description: "For macOS 12 Monterey and later. Universal binary for Intel and Apple Silicon.",
    href: "https://app.crabshq.com/download/mac",
    buttonText: "Download for Mac",
  },
  {
    key: "windows",
    label: "Windows",
    icon: <SiWindows className="h-5 w-5" />,
    description: "For Windows 10 and later. 64-bit installer.",
    href: "https://app.crabshq.com/download/windows",
    buttonText: "Download for Windows",
  },
  {
    key: "ios",
    label: "iOS",
    icon: <Smartphone className="h-6 w-6" />,
    description: "For iPhone and iPad. Requires iOS 16 or later.",
    href: "https://apps.apple.com/app/crabshq",
    buttonText: "Download on App Store",
  },
  {
    key: "android",
    label: "Android",
    icon: <Smartphone className="h-6 w-6" />,
    description: "For Android phones and tablets. Requires Android 10 or later.",
    href: "https://play.google.com/store/apps/details?id=com.crabshq.app",
    buttonText: "Get it on Google Play",
  },
];

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator as any).userAgentData?.platform?.toLowerCase() || navigator.platform?.toLowerCase() || "";

  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/mac/.test(platform) || /macintosh/.test(ua)) return "mac";
  if (/win/.test(platform) || /windows/.test(ua)) return "windows";
  return "unknown";
}

export default function DownloadClient() {
  const [detected, setDetected] = useState<Platform>("unknown");

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  const primary = platforms.find((p) => p.key === detected) || platforms[0];
  const others = platforms.filter((p) => p.key !== primary.key);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight">
              Download Crabs HQ
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
              Your AI workforce, on every device. Deploy agents from your desktop or manage them on the go.
            </p>
          </motion.div>

          {/* Primary download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-12"
          >
            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-center gap-3 text-slate-800">
                {primary.icon}
                <span className="text-lg font-semibold">{primary.label}</span>
                {detected !== "unknown" && (
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Detected
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-slate-500">{primary.description}</p>

              <Link
                href={primary.href}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-base font-medium text-white hover:bg-slate-800 transition-colors w-full"
              >
                <Download className="h-5 w-5" />
                {primary.buttonText}
              </Link>
            </div>
          </motion.div>

          {/* Platform icons row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-6"
          >
            {platforms.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className={`flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-colors ${
                  p.key === primary.key
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {p.icon}
                <span className="text-xs font-medium">{p.label}</span>
              </Link>
            ))}
          </motion.div>

          {/* Other platforms */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-12"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
              <ChevronDown className="h-4 w-4" />
              <span>Also available on</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {others.map((p) => (
                <Link
                  key={p.key}
                  href={p.href}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className="text-slate-600">{p.icon}</div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-800">{p.label}</div>
                    <div className="text-xs text-slate-400">{p.buttonText}</div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Web app fallback */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-12 text-sm text-slate-400"
          >
            Or use{" "}
            <Link
              href="https://app.crabshq.com"
              className="text-red-600 hover:text-red-700 hover:underline font-medium"
            >
              app.crabshq.com
            </Link>{" "}
            in your browser — no download needed.
          </motion.div>
        </div>
      </div>
    </div>
  );
}
