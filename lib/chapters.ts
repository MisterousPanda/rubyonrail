import { architectureChapters } from "@/content/architecture";
import { codeChapters } from "@/content/code";
import { deployChapters } from "@/content/deploy";
import { doctrineChapters } from "@/content/doctrine";
import { omarchyChapters } from "@/content/omarchy";
import { railsChapters } from "@/content/rails";
import { rubyChapters } from "@/content/ruby";
import {
  chapterPath,
  reservedPaths,
  type Chapter,
  type SectionId,
} from "@/lib/chapter";

const catalog: Record<SectionId, Chapter[]> = {
  ruby: rubyChapters,
  rails: railsChapters,
  deploy: deployChapters,
  omarchy: omarchyChapters,
  architecture: architectureChapters,
  doctrine: doctrineChapters,
  code: codeChapters,
};

export function chaptersIn(section: SectionId): Chapter[] {
  return catalog[section];
}

export function allChapters(): Chapter[] {
  return Object.values(catalog).flat();
}

export function findChapter(section: SectionId, slug: string) {
  return chaptersIn(section).find((chapter) => chapter.slug === slug);
}

export function findChapterByPath(href: string) {
  return allChapters().find((chapter) => chapterPath(chapter) === href);
}

export function publicChapterParams(section: SectionId) {
  return chaptersIn(section)
    .filter((chapter) => !reservedPaths.has(chapterPath(chapter)))
    .map((chapter) => ({ slug: chapter.slug }));
}

export function libraryCount() {
  return allChapters().length;
}
