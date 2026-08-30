import {
  SectionChapterPage,
  chapterMetadata,
  generateSectionParams,
} from "@/lib/section-page";

export function generateStaticParams() {
  return generateSectionParams("doctrine");
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return chapterMetadata("doctrine", params);
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <SectionChapterPage section="doctrine" params={params} />;
}
