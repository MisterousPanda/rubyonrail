import Link from "next/link";
import { chapterPath, sectionMeta, type SectionId } from "@/lib/chapter";
import { chaptersIn } from "@/lib/chapters";

export function LibraryGrid({
  section,
  contained = false,
}: {
  section: SectionId;
  contained?: boolean;
}) {
  const chapters = chaptersIn(section);
  const meta = sectionMeta[section];
  if (!chapters.length) return null;
  return (
    <section className={contained ? "mt-16" : "border-t border-ink/10"}>
      <div className={contained ? "" : "mx-auto max-w-6xl px-5 py-20 sm:px-8"}>
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink/45 uppercase">
          {meta.label} library · {chapters.length} pages
        </p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink">
          Keep reading
        </h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={chapterPath(chapter)}
              className="border border-ink/10 bg-paper-2/60 p-5 transition-colors hover:border-ruby/40 hover:bg-paper-2"
            >
              <p className="font-serif text-lg text-ink">{chapter.title}</p>
              <p className="mt-2 text-sm leading-6 text-ink/55">{chapter.lead}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
