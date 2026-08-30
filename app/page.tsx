import Link from "next/link";
import { NavCard } from "@/components/nav-card";
import { chapters } from "@/lib/site";

const bets = [
  {
    href: "/ruby",
    mark: "I",
    accent: "text-ruby",
    title: "Ruby happiness",
    body: "Matz built a language whose first constraint was how Tuesday morning feels. Objects, blocks, a DSL that reads like speech.",
  },
  {
    href: "/rails",
    mark: "II",
    accent: "text-gold",
    title: "Rails omakase",
    body: "Convention over configuration. The chef picks the stack so you spend taste on the product, not on glue.",
  },
  {
    href: "/omarchy",
    mark: "III",
    accent: "text-teal",
    title: "Omarchy desktop",
    body: "Arch and Hyprland with a finished menu. The same omakase instinct, aimed at the machine you sit down at.",
  },
] as const;

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

      <section
        aria-labelledby="bets-heading"
        className="border-y border-ink/10 bg-ink text-paper"
      >
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <p className="font-mono text-[11px] tracking-[0.28em] text-gold uppercase">
            A short manifesto
          </p>
          <h2
            id="bets-heading"
            className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl"
          >
            Three bets. One through-line.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/70">
            Programmer happiness, an omakase web stack, a desktop with taste.
            DHH did not invent three hobbies. He kept making the same argument
            in different rooms.
          </p>
          <ol className="mt-10 grid gap-px bg-paper/10 sm:grid-cols-3">
            {bets.map((bet) => (
              <li key={bet.href} className="bg-ink">
                <Link
                  href={bet.href}
                  className="group flex h-full flex-col p-6 sm:p-7"
                >
                  <span
                    className={`font-mono text-[11px] tracking-[0.22em] uppercase ${bet.accent}`}
                  >
                    Bet {bet.mark}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl tracking-tight text-paper group-hover:text-gold">
                    {bet.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/65">
                    {bet.body}
                  </p>
                  <span className="mt-6 font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
                    Open {bet.href.replace("/", "")} →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="quotes-heading"
        className="border-b border-ink/10 bg-paper-2/40"
      >
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 id="quotes-heading" className="sr-only">
            Voices behind the stack
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
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
        </div>
      </section>

      <aside
        aria-labelledby="t2-heading"
        className="border-b border-ink/10 bg-paper"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-teal uppercase">
              Desk notes · T2 + Omarchy
            </p>
            <h2
              id="t2-heading"
              className="mt-3 font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl"
            >
              This was typed on a machine Apple was done with.
            </h2>
          </div>
          <div className="max-w-xl text-[17px] leading-8 text-ink/75">
            <p>
              A late Intel Mac. T2 chip, Touch Bar, the last chassis before the
              company changed the plot. It still boots. The keyboard still
              sounds like itself. What it needed was a desk that had already
              decided what a computer is for.
            </p>
            <p className="mt-4">
              Omarchy is that desk: Arch, Hyprland, a menu on Super, a patched
              kernel that treats the T2 as hardware instead of folklore. Not a
              restoration project. Just a place to write — which is the whole
              argument, if you sit with it.
            </p>
            <p className="mt-6">
              <Link
                href="/omarchy"
                className="font-mono text-[11px] tracking-[0.18em] text-ruby uppercase underline decoration-ruby/40 underline-offset-4 hover:decoration-ruby"
              >
                How the T2 actually runs Omarchy →
              </Link>
            </p>
          </div>
        </div>
      </aside>

      <section
        aria-labelledby="chapters-heading"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-8"
      >
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink/45 uppercase">
          Six chapters
        </p>
        <h2
          id="chapters-heading"
          className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl"
        >
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
    <figure className="border-l border-ruby/30 pl-5">
      <span className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
        {mark}
      </span>
      <blockquote className="mt-3 font-serif text-2xl leading-snug text-ink">
        <p>{text}</p>
      </blockquote>
      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.16em] text-ink/50 uppercase">
        — {cite}
      </figcaption>
    </figure>
  );
}
