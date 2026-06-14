import { Metadata } from "next";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = {
  title: "Download Trooper - Mac, Web, and Local Host",
  description:
    "Download Trooper for Mac, open the web app, or pair a local Mac host for agents that run on your own machine.",
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
