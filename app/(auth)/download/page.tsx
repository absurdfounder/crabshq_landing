import { Metadata } from "next";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = {
  title: "Download Trooper - Mac, iOS, Local Host, and Web",
  description:
    "Use Trooper on Mac, pair your Mac as a local agent host, command agents from iOS, or open your workspace on the web.",
  alternates: {
    canonical: "https://trooper.so/download",
  },
  openGraph: {
    images: [
      {
        url: "https://dazzling-cat.netlify.app/trooper_social.png",
        width: 1200,
        height: 630,
        alt: "Download Trooper",
      },
    ],
  },
};

export default function DownloadPage() {
  return <DownloadClient />;
}
