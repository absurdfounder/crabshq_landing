import { Metadata } from "next";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = {
  title: "Download Crabs HQ – Mac, Windows, iOS, Android",
  description:
    "Download the Crabs HQ app for your platform. Available on Mac, Windows, iOS, and Android. Deploy AI agents anywhere.",
  alternates: {
    canonical: "https://crabshq.com/download",
  },
  openGraph: {
    images: [
      {
        url: "https://dazzling-cat.netlify.app/crabshq_social.png",
        width: 1200,
        height: 630,
        alt: "Download Crabs HQ",
      },
    ],
  },
};

export default function DownloadPage() {
  return <DownloadClient />;
}
