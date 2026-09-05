import { ogImageMeta } from "@/lib/og/url";

const homeOg = ogImageMeta("home", "Trooper: AI teammates that ship real work");

export const metadata = {
  metadataBase: new URL("https://trooper.so"),
  title: "Trooper: AI teammates that ship real work",
  description:
    "Give tasks to AI employees like teammates. They use your tools, run loops you approved, and come back when they need a sign-off.",
  alternates: {
    canonical: "https://trooper.so",
  },
  openGraph: {
    title: "Trooper: AI teammates that ship real work",
    description:
      "Give tasks to AI employees like teammates. They use your tools, run loops you approved, and come back when they need a sign-off.",
    url: "https://trooper.so",
    siteName: "Trooper",
    images: homeOg.openGraph!.images,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trooper: AI teammates that ship real work",
    description:
      "Give tasks to AI employees like teammates. They use your tools, run loops you approved, and come back when they need a sign-off.",
    site: "@trooper_so",
    images: homeOg.twitter!.images,
  },
  keywords: [
    "trooper",
    "ai teammates",
    "ai employees",
    "ai workforce",
    "loop api",
    "self-host ai agents",
    "openclaw",
  ],
};

import LandingPage from "@/components/landing/LandingPage";
import { getIntegrationTiles } from "@/lib/integrationScroller";
import { PLUGIN_CATALOG_COUNT } from "@/lib/pluginCatalog";
import { LOOP_CATALOG_COUNT } from "@/lib/loopCatalog";

export default function Home() {
  return (
    <LandingPage
      integrations={getIntegrationTiles(12)}
      pluginCount={PLUGIN_CATALOG_COUNT}
      loopCount={LOOP_CATALOG_COUNT}
    />
  );
}
