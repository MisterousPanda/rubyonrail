import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import {
  chapterPath,
  sectionMeta,
  type Chapter,
} from "@/lib/chapter";
import { chaptersIn, findChapterByPath } from "@/lib/chapters";

export function ChapterArticle({
  chapter,
  framed = true,
}: {
  chapter: Chapter;
  framed?: boolean;
}) {
  const meta = sectionMeta[chapter.section];
  const siblings = chaptersIn(chapter.section);
  const idx = siblings.findIndex((c) => c.slug === chapter.slug);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  return (
    <article
      className={
        framed
          ? "mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20"
          : "max-w-3xl"
      }
    >
      <PageHeader
        kicker={`${meta.label} library`}
        title={chapter.title}
        lede={chapter.lead}
      />
      <div className="mt-12">
        {chapter.kicker ? (
          <p className="mb-8 border-l-2 border-gold pl-4 font-serif text-lg italic text-ink/70">
            {chapter.kicker}
          </p>
        ) : null}
        {chapter.blocks.map((block, i) => {
          if (block.type === "p") {
            return (
              <p key={i} className="mb-5 text-[17px] leading-8 text-ink/80">
                {block.text}
              </p>
            );
          }
          if (block.type === "h") {
            return (
              <h2 key={i} className="mt-12 mb-4 font-serif text-2xl text-ink">
                {block.text}
              </h2>
            );
          }
          if (block.type === "code") {
            return (
              <div key={i} className="my-8">
                <CodeBlock
                  title={block.filename}
                  language={block.language}
                  code={block.code}
                />
              </div>
            );
          }
          if (block.type === "aside") {
            return (
              <aside
                key={i}
                className="my-8 border border-gold/40 bg-gold/8 px-5 py-4 text-sm leading-7 text-ink/80"
              >
                {block.text}
              </aside>
            );
          }
          if (block.type === "list") {
            return (
              <ul
                key={i}
                className="mb-6 list-disc space-y-2 pl-6 text-[17px] leading-8 text-ink/80"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <blockquote
              key={i}
              className="my-8 border-l-2 border-ruby pl-6 font-serif text-xl italic leading-8 text-ink"
            >
              {block.text}
            </blockquote>
          );
        })}

        {chapter.related.length ? (
          <div className="mt-16 border-t border-ink/10 pt-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-ink/45 uppercase">
              Related
            </p>
            <ul className="mt-4 space-y-2">
              {chapter.related.map((href) => {
                const related = findChapterByPath(href);
                return (
                  <li key={href}>
                    <Link href={href} className="text-ruby hover:underline">
                      {related ? related.title : href}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <nav className="mt-16 flex justify-between gap-8 border-t border-ink/10 pt-8 text-sm">
          {prev ? (
            <Link
              href={chapterPath(prev)}
              className="text-ink/70 hover:text-ruby"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={chapterPath(next)}
              className="ml-auto text-right text-ink/70 hover:text-ruby"
            >
              {next.title} →
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}
