import type { ReactNode } from "react";
import { OmarchySubnav } from "@/components/omarchy-subnav";

export default function OmarchyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <OmarchySubnav />
      {children}
    </div>
  );
}
