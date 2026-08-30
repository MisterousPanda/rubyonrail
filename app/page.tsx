import Link from "next/link";
import { NavCard } from "@/components/nav-card";
import { chapters } from "@/lib/site";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24">
        <p className="font-mono text-[11px] tracking-[0.32em] text-teal uppercase">
          An unofficial homage · For DHH
        </p>
        <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.88] tracking-tight text-ink sm:text-8xl">
          The beauty of Ruby.
          <span className="block text-ruby">The craft of Rails.</span>
          <span className="block text-teal">The joy of Omarchy.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl">
          Written from a T2 Mac running Omarchy — because David Heinemeier
          Hansson did not just give the world a web framework. He kept arguing
          that computers, languages, and desktops should feel like tools made by
          a person, for a person.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/omarchy"
            className="bg-ink px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] text-paper uppercase"
          >
            Enter Omarchy
          </Link>
          <Link
            href="/rails"
            className="border border-ink/20 px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] text-ink uppercase hover:border-ruby hover:text-ruby"
          >
            Read Rails
          </Link>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper-2/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
          <Quote
            mark="01"
            text="Ruby is designed to make programmers happy."
            cite="Yukihiro Matsumoto"
          />
          <Quote
            mark="02"
            text="Convention over configuration. The menu, not the blank canvas."
            cite="The Rails Doctrine"
          />
          <Quote
            mark="03"
            text="Beautiful, fun & opinionated Linux — Arch, Hyprland, and taste."
            cite="omarchy.org"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink/45 uppercase">
          Six chapters
        </p>
        <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Start anywhere. The stack is one story.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <NavCard key={chapter.href} {...chapter} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Quote({
  mark,
  text,
  cite,
}: {
  mark: string;
  text: string;
  cite: string;
}) {
  return (
    <figure>
      <span className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
        {mark}
      </span>
      <blockquote className="mt-3 font-serif text-2xl leading-snug">
        {text}
      </blockquote>
      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.16em] text-ink/50 uppercase">
        {cite}
      </figcaption>
    </figure>
  );
}
