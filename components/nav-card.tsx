import Link from "next/link";

type NavCardProps = {
  href: string;
  kicker: string;
  title: string;
  blurb: string;
};

export function NavCard({ href, kicker, title, blurb }: NavCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-ink/10 bg-paper-2/60 p-6 transition-colors hover:border-ruby/40 hover:bg-paper-2"
    >
      <span className="font-mono text-[11px] tracking-[0.22em] text-teal uppercase">
        {kicker}
      </span>
      <h3 className="mt-3 font-serif text-2xl tracking-tight text-ink group-hover:text-ruby">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{blurb}</p>
      <span className="mt-6 font-mono text-[11px] tracking-[0.18em] text-ruby uppercase">
        Open chapter →
      </span>
    </Link>
  );
}
