export type SectionId =
  | "ruby"
  | "rails"
  | "deploy"
  | "omarchy"
  | "architecture"
  | "doctrine"
  | "code";

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "code"; filename?: string; language?: string; code: string }
  | { type: "aside"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Chapter = {
  slug: string;
  section: SectionId;
  title: string;
  kicker?: string;
  lead: string;
  blocks: Block[];
  related: string[];
};

export type ChapterDraft = {
  slug: string;
  title: string;
  lead: string;
  kicker?: string;
  paragraphs: string[];
  heading?: string;
  more?: string[];
  code?: { filename: string; language?: string; code: string };
  list?: string[];
  aside?: string;
  quote?: string;
  related?: string[];
};

export const sectionMeta: Record<
  SectionId,
  { href: string; label: string; blurb: string }
> = {
  ruby: {
    href: "/ruby",
    label: "Ruby",
    blurb: "Language, objects, blocks, DSLs, and the runtime.",
  },
  rails: {
    href: "/rails",
    label: "Rails",
    blurb: "MVC, Active Record, Hotwire, jobs, and the monolith.",
  },
  deploy: {
    href: "/deploy",
    label: "Deploy",
    blurb: "Kamal, hosts, and why Vercel is not a Rails server.",
  },
  omarchy: {
    href: "/omarchy",
    label: "Omarchy",
    blurb: "Hyprland desk, T2 Macs, agents, Cursor, Hermes.",
  },
  architecture: {
    href: "/architecture",
    label: "Architecture",
    blurb: "Directory trees, request paths, and split deploys.",
  },
  doctrine: {
    href: "/doctrine",
    label: "Doctrine",
    blurb: "Nine pillars from rubyonrails.org/doctrine.",
  },
  code: {
    href: "/code",
    label: "Code",
    blurb: "Full files from a small Rails 8 app.",
  },
};

export const sectionOrder: SectionId[] = [
  "ruby",
  "rails",
  "doctrine",
  "architecture",
  "code",
  "deploy",
  "omarchy",
];

export function chapterPath(chapter: Chapter) {
  return `/${chapter.section}/${chapter.slug}`;
}

export const reservedPaths = new Set(["/omarchy/cursor", "/omarchy/hermes"]);

export function draftsToChapters(
  section: SectionId,
  drafts: ChapterDraft[],
): Chapter[] {
  return drafts.map((draft) => {
    const blocks: Block[] = [];
    for (const text of draft.paragraphs) blocks.push({ type: "p", text });
    if (draft.quote) blocks.push({ type: "quote", text: draft.quote });
    if (draft.heading) {
      blocks.push({ type: "h", text: draft.heading });
      for (const text of draft.more ?? []) blocks.push({ type: "p", text });
    }
    if (draft.list) blocks.push({ type: "list", items: draft.list });
    if (draft.code) {
      blocks.push({
        type: "code",
        filename: draft.code.filename,
        language: draft.code.language ?? "ruby",
        code: draft.code.code,
      });
    }
    if (draft.aside) blocks.push({ type: "aside", text: draft.aside });
    return {
      slug: draft.slug,
      section,
      title: draft.title,
      kicker: draft.kicker,
      lead: draft.lead,
      blocks,
      related: draft.related ?? [],
    };
  });
}
