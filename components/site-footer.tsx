import Link from "next/link";
import { chapters } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-serif text-3xl tracking-tight">For DHH.</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/65">
            An unofficial homage to Ruby, Rails, and Omarchy — written because
            Omarchy on a T2 Mac feels like the machine finally got out of the
            way. Official sources:{" "}
            <a
              className="underline decoration-ruby/70 underline-offset-3 hover:text-paper"
              href="https://rubyonrails.org"
            >
              rubyonrails.org
            </a>
            ,{" "}
            <a
              className="underline decoration-ruby/70 underline-offset-3 hover:text-paper"
              href="https://omarchy.org"
            >
              omarchy.org
            </a>
            ,{" "}
            <a
              className="underline decoration-ruby/70 underline-offset-3 hover:text-paper"
              href="https://vercel.com/docs/functions/runtimes/ruby"
            >
              Vercel Ruby runtime
            </a>
            .
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[11px] tracking-[0.22em] text-paper/45 uppercase">
            Chapters
          </p>
          <ul className="mt-4 grid gap-2 text-sm">
            {chapters.map((chapter) => (
              <li key={chapter.href}>
                <Link
                  href={chapter.href}
                  className="text-paper/75 transition-colors hover:text-paper"
                >
                  {chapter.kicker} · {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
