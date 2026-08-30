import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import {
  chapterPath,
  sectionMeta,
  sectionOrder,
} from "@/lib/chapter";
import { chaptersIn, libraryCount } from "@/lib/chapters";
import { demos } from "@/lib/demos";

export const metadata: Metadata = {
  title: "Site map",
  description: "Every library page, demo, and hub in the homage.",
};

const hubs = [
  { href: "/", title: "Home" },
  { href: "/ruby", title: "Ruby hub" },
  { href: "/rails", title: "Rails hub" },
  { href: "/doctrine", title: "Doctrine hub" },
  { href: "/architecture", title: "Architecture hub" },
  { href: "/code", title: "Code hub" },
  { href: "/deploy", title: "Deploy hub" },
  { href: "/omarchy", title: "Omarchy hub" },
  { href: "/omarchy/cursor", title: "Cursor on Omarchy" },
  { href: "/omarchy/hermes", title: "Hermes on Omarchy" },
  { href: "/demo", title: "Replit-style demos" },
];

export default function MapPage() {
  return (
    <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        kicker="Map · The whole desk"
        title={`${libraryCount()} library pages, ${demos.length} sandboxes.`}
        lede="A catalog of the homage: hubs, doctrine, architecture, full files, deploy honesty, Omarchy, and the Replit-type demos."
      />
      <section className="mt-14">
        <h2 className="font-serif text-2xl text-ink">Hubs</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {hubs.map((hub) => (
            <li key={hub.href}>
              <Link href={hub.href} className="text-ruby hover:underline">
                {hub.title}
              </Link>
              <span className="ml-2 font-mono text-xs text-ink/40">{hub.href}</span>
            </li>
          ))}
        </ul>
      </section>
      {sectionOrder.map((section) => (
        <section key={section} className="mt-14">
          <h2 className="font-serif text-2xl text-ink">
            {sectionMeta[section].label}
          </h2>
          <p className="mt-1 text-sm text-ink/55">{sectionMeta[section].blurb}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {chaptersIn(section).map((chapter) => (
              <li key={chapter.slug}>
                <Link
                  href={chapterPath(chapter)}
                  className="text-ruby hover:underline"
                >
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="mt-14">
        <h2 className="font-serif text-2xl text-ink">Demos</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {demos.map((demo) => (
            <li key={demo.slug}>
              <Link href={`/demo/${demo.slug}`} className="text-ruby hover:underline">
                {demo.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
