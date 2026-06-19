// app/(auth)/pricing/page.tsx (Server Component)

import React from "react";
import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Trooper Pricing – Solo Lifetime Deal, Cloud, and Enterprise",
  description:
    "Choose how you want to run Trooper. Solo lifetime for $49, Cloud Lifetime for $149, hosted cloud from $25/mo, or self-host for enterprise. Unlimited agents, all AI models, bring your own API keys.",
  alternates: {
    canonical: "https://trooper.so/pricing",
  },
  openGraph: {
    images: [
      {
        url: "https://dazzling-cat.netlify.app/trooper_social.png",
        width: 1200,
        height: 630,
        alt: "Trooper Pricing – Solo, Cloud, Enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://dazzling-cat.netlify.app/trooper_social.png",
        alt: "Trooper Pricing – Solo, Cloud, Enterprise",
      },
    ],
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
