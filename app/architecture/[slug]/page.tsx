import {
  SectionChapterPage,
  chapterMetadata,
  generateSectionParams,
} from "@/lib/section-page";

export function generateStaticParams() {
  return generateSectionParams("architecture");
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return chapterMetadata("architecture", params);
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <SectionChapterPage section="architecture" params={params} />;
}
