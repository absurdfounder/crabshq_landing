// app/(auth)/pricing/page.tsx (Server Component)

import React from "react";
import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Crabs HQ Pricing – Simple, Transparent, and Scalable Plans",
  description:
    "Explore Crabs HQ’ flexible pricing plans. From personal projects to enterprise-scale solutions, unlock unlimited AI-powered websites, custom domains, analytics, SEO tools, and more — all built on Notion. Try free for 3 days!",
  alternates: {
    canonical: "https://crabshq.com/pricing",
  },
  openGraph: {
    images: [
      {
        url: "https://dazzling-cat.netlify.app/notiontohelpdesk_socialshare.png",
        width: 1200,
        height: 630,
        alt: "Crabs HQ Pricing Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://dazzling-cat.netlify.app/notiontohelpdesk_socialshare.png",
        alt: "Crabs HQ Pricing Overview",
      },
    ],
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
