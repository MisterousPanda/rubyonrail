import {
  SectionChapterPage,
  chapterMetadata,
  generateSectionParams,
} from "@/lib/section-page";

export function generateStaticParams() {
  return generateSectionParams("omarchy");
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return chapterMetadata("omarchy", params);
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <SectionChapterPage section="omarchy" params={params} />;
}
