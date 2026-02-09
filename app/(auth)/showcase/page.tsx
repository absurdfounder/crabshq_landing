// app/(auth)/Showcase/page.tsx (Server Component)

import React from "react";
import { Metadata } from "next";
import ShowcaseClient from "./ShowcaseClient";

export const metadata: Metadata = {
  title: "Websites built on Crabs HQ – Simple to Use - Transparent Pricing",
  description:
    "Explore the websites built on Crabs HQ. From personal projects to enterprise-scale solutions, unlock unlimited AI-powered websites, custom domains, analytics, SEO tools, and more — all built on Notion. Try free for 3 days!",
    alternates: {
      canonical: "https://crabshq.com/showcase",
    },
  openGraph: {
    images: [
      {
        url: "https://dazzling-cat.netlify.app/notiontohelpdesk_socialshare.png",
        width: 1200,
        height: 630,
        alt: "Crabs HQ Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://dazzling-cat.netlify.app/notiontohelpdesk_socialshare.png",
        alt: "Crabs HQ Showcase",
      },
    ],
  },
};

export default function ShowcasePage() {
  return <ShowcaseClient />;
}