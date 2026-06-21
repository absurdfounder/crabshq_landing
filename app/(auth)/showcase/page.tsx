import React from "react";
import { Metadata } from "next";
import ShowcaseClient from "./ShowcaseClient";
import { buildPageMetadata } from "@/lib/og/buildMetadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Websites built on Trooper – Simple to Use - Transparent Pricing",
  description:
    "Explore the websites built on Trooper. From personal projects to enterprise-scale solutions, unlock unlimited AI-powered websites, custom domains, analytics, SEO tools, and more — all built on Notion. Try free for 3 days!",
  canonical: "https://trooper.so/showcase",
  ogKind: "hub",
  ogSlug: "showcase",
});

export default function ShowcasePage() {
  return <ShowcaseClient />;
}
