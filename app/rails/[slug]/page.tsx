import {
  SectionChapterPage,
  chapterMetadata,
  generateSectionParams,
} from "@/lib/section-page";

export function generateStaticParams() {
  return generateSectionParams("rails");
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return chapterMetadata("rails", params);
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <SectionChapterPage section="rails" params={params} />;
}
