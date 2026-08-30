import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight">
        That route is not in the convention.
      </h1>
      <p className="mt-4 text-ink/65">
        Try the index. Rails would have generated it for you.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block font-mono text-sm tracking-[0.14em] text-teal uppercase"
      >
        ← Home
      </Link>
    </div>
  );
}
