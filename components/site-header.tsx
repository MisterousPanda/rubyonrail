"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link href="/" className="font-serif text-xl tracking-tight text-ink">
          Ruby<span className="text-ruby">/</span>Omarchy
        </Link>
        <nav className="hidden items-center gap-4 lg:flex lg:gap-6" aria-label="Primary">
          {nav.map((item) => (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                className={`font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                  isActive(pathname, item.href)
                    ? "text-ruby"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
        <button
          type="button"
          className="font-mono text-[11px] tracking-[0.18em] text-ink/70 uppercase lg:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav
          className="border-t border-ink/10 px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="grid gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block font-serif text-2xl ${
                    isActive(pathname, item.href) ? "text-ruby" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="mt-1 block pl-3 font-mono text-xs tracking-[0.16em] text-ink/55 uppercase"
                  >
                    {child.label}
                  </Link>
                ))}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
