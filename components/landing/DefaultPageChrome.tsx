"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import s from "./chrome.module.css";

/** Keep the homepage treatment scoped; catalog and product pages retain their chrome. */
export default function DefaultPageChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className={pathname === "/" ? s.homeChrome : undefined}>
      {children}
    </div>
  );
}
