import { Metadata } from "next";
import DownloadClient from "./DownloadClient";
import { buildPageMetadata } from "@/lib/og/buildMetadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Download Trooper - Mac, Windows, iOS, and Android",
  description:
    "Download Trooper for Mac or Windows, command your agents from iOS or Android, or open your workspace on the web.",
  canonical: "https://trooper.so/download",
  ogKind: "page",
  ogSlug: "download",
});

export default function DownloadPage() {
  return <DownloadClient />;
}
