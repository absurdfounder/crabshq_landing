// app/(auth)/pricing/page.tsx (Server Component)

import React from "react";
import { Metadata } from "next";
import Header from "@/components/ui/header";
import SimplePricing from "@/components/SimplePricing";
import FAQ from "@/components/faq";

export const metadata: Metadata = {
  title: "Crabs HQ Pricing – Solo Lifetime Deal, Cloud, and Enterprise",
  description:
    "Choose how you want to run Crabs HQ. Solo lifetime deal for $79, hosted cloud for teams at $99/mo, or self-host for enterprise. Unlimited agents, all AI models, bring your own API keys.",
  alternates: {
    canonical: "https://crabshq.com/pricing",
  },
  openGraph: {
    images: [
      {
        url: "https://dazzling-cat.netlify.app/crabshq_social.png",
        width: 1200,
        height: 630,
        alt: "Crabs HQ Pricing – Solo, Cloud, Enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://dazzling-cat.netlify.app/crabshq_social.png",
        alt: "Crabs HQ Pricing – Solo, Cloud, Enterprise",
      },
    ],
  },
};

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="pt-16">
        <SimplePricing />
        <FAQ />
      </div>
    </div>
  );
}
