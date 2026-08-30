import {
  SectionChapterPage,
  chapterMetadata,
  generateSectionParams,
} from "@/lib/section-page";

export function generateStaticParams() {
  return generateSectionParams("ruby");
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return chapterMetadata("ruby", params);
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <SectionChapterPage section="ruby" params={params} />;
}
