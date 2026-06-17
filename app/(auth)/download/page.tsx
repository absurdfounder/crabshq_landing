import { Metadata } from "next";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = {
  title: "Download Trooper - Mac, Windows, iOS, and Android",
  description:
    "Download Trooper for Mac or Windows, command your agents from iOS or Android, or open your workspace on the web.",
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
