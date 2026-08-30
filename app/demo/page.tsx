import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { demos } from "@/lib/demos";

export const metadata: Metadata = {
  title: "Replit-style demos",
  description:
    "In-browser teaching sandboxes for Ruby, Rails routes, Active Record, Hotwire, Kamal, and Walker — not MRI, and not rails s.",
};

export default function DemoIndexPage() {
  return (
    <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        kicker="Demos · Replit-type"
        title="Press Run. Remix the postcard."
        lede="A folder of in-browser sandboxes in the Replit spirit: editor, console, preview, a file list. They teach the shape of Ruby and Rails. They do not boot MRI, Puma, or Postgres. For a real process, see Deploy."
      />
      <p className="mt-8 max-w-2xl text-[17px] leading-8 text-ink/75">
        Hello Ruby and Enumerable actually evaluate a tiny subset in the
        browser. Everything else shows a reference run so the file stays
        honest. Open a card, edit, hit Run or ⌘/Ctrl + Enter.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <Link
            key={demo.slug}
            href={`/demo/${demo.slug}`}
            className="flex flex-col border border-ink/10 bg-paper-2/60 p-6 transition-colors hover:border-ruby/40 hover:bg-paper-2"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] text-teal uppercase">
              {demo.language}
            </span>
            <h2 className="mt-3 font-serif text-2xl tracking-tight text-ink">
              {demo.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
              {demo.lead}
            </p>
            <span className="mt-6 font-mono text-[11px] tracking-[0.18em] text-ruby uppercase">
              Open sandbox →
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
