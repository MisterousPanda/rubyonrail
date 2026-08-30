import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Playground } from "@/components/playground";
import { demos, getDemo } from "@/lib/demos";

export function generateStaticParams() {
  return demos.map((demo) => ({ slug: demo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return {};
  return { title: `${demo.title} · Demo`, description: demo.lead };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();
  const catalog = demos.map(({ slug: s, title }) => ({ slug: s, title }));

  return (
    <article className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-ruby uppercase">
        Replit-style demo
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink sm:text-5xl">
        {demo.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
        {demo.lead}
      </p>
      <p className="mt-6">
        <Link
          href="/demo"
          className="font-mono text-[11px] tracking-[0.16em] text-teal uppercase"
        >
          ← All sandboxes
        </Link>
      </p>
      <div className="mt-8">
        <Playground key={demo.slug} demo={demo} catalog={catalog} />
      </div>
    </article>
  );
}
