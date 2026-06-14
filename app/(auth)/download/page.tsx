import { Metadata } from "next";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = {
  title: "Download Trooper – Mac, Windows, iOS, Android",
  description:
    "Download the Trooper app for your platform. Available on Mac, Windows, iOS, and Android. Deploy AI agents anywhere.",
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
