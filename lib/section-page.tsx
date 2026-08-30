import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterArticle } from "@/components/chapter-article";
import type { SectionId } from "@/lib/chapter";
import { findChapter, publicChapterParams } from "@/lib/chapters";

export function generateSectionParams(section: SectionId) {
  return publicChapterParams(section);
}

export async function chapterMetadata(
  section: SectionId,
  params: Promise<{ slug: string }>,
): Promise<Metadata> {
  const { slug } = await params;
  const chapter = findChapter(section, slug);
  if (!chapter) return {};
  return { title: chapter.title, description: chapter.lead };
}

export async function SectionChapterPage({
  section,
  params,
}: {
  section: SectionId;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = findChapter(section, slug);
  if (!chapter) notFound();
  return (
    <ChapterArticle chapter={chapter} framed={section !== "omarchy"} />
  );
}
