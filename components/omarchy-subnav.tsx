"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/omarchy", label: "Omarchy" },
  { href: "/omarchy/cursor", label: "Cursor" },
  { href: "/omarchy/hermes", label: "Hermes" },
  { href: "/omarchy/walker", label: "Walker" },
  { href: "/omarchy/t2", label: "T2 Mac" },
  { href: "/demo/walker", label: "Walker demo" },
];

export function OmarchySubnav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Omarchy chapters"
      className="mb-12 flex flex-wrap gap-2 border-b border-ink/10 pb-4"
    >
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase ${
              active
                ? "bg-teal text-paper"
                : "bg-paper-2 text-ink/65 hover:bg-teal/15 hover:text-ink"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
