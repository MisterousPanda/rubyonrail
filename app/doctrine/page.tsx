import type { Metadata } from "next";
import { LibraryGrid } from "@/components/library-grid";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "The Rails Doctrine",
  description:
    "Nine pillars from rubyonrails.org/doctrine — happiness, convention, omakase, and the rest.",
};

export default function DoctrinePage() {
  return (
    <article>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <PageHeader
          kicker="Doctrine · Nine pillars"
          title="A controversial set of heresies that stayed."
          lede="David Heinemeier Hansson published the Rails Doctrine so the framework would have a spine after the novelty wore off. The nine pillars are official. These pages are a field guide, not a replacement for the essay."
        />
        <div className="prose-essay mt-12 max-w-3xl text-[17px] leading-8 text-ink/80">
          <p>
            Read the source:{" "}
            <a
              className="underline decoration-ruby underline-offset-3"
              href="https://rubyonrails.org/doctrine"
            >
              rubyonrails.org/doctrine
            </a>
            . The pages below keep each pillar short enough to hold in one
            sitting, then send you back to the app — routes, models, Kamal,
            Omarchy — where the sentence becomes a file.
          </p>
        </div>
      </div>
      <LibraryGrid section="doctrine" />
    </article>
  );
}
