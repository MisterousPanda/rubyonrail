import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { LibraryGrid } from "@/components/library-grid";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Rails architecture",
  description:
    "The Rails 8 directory tree, the request path, the monolith, and why a Function is not a process.",
};

export default function ArchitecturePage() {
  return (
    <article>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <PageHeader
          kicker="Architecture · The map"
          title="The folders are the framework."
          lede="A Rails 8 app is a hallway you can walk with your eyes closed: app for what you wrote, config for how it boots and ships, db for history, bin for the official doors. This page is the lobby. The library is the building."
        />
        <div className="prose-essay mt-12 max-w-3xl text-[17px] leading-8 text-ink/80">
          <p>
            People ask for “the architecture” as if it were a slide. It is a
            tree. Open{" "}
            <Link href="/architecture/tree" className="text-ruby underline">
              the full Rails 8 tree
            </Link>
            , then follow{" "}
            <Link href="/architecture/request" className="text-ruby underline">
              a request
            </Link>{" "}
            from TLS to ERB. The{" "}
            <Link href="/code" className="text-ruby underline">
              code library
            </Link>{" "}
            prints the files. The{" "}
            <Link href="/demo" className="text-ruby underline">
              Replit-style demos
            </Link>{" "}
            let you press Run on a postcard of the same ideas.
          </p>
          <p>
            Two deploys exist in this story:{" "}
            <Link href="/architecture/deploy-full" className="text-ruby underline">
              the whole process
            </Link>{" "}
            (Kamal and friends) and{" "}
            <Link href="/architecture/deploy-split" className="text-ruby underline">
              a split on a seam
            </Link>{" "}
            (this Next.js site on Vercel, Rails somewhere that can stay up). A
            Function is not a third option for the monolith.
          </p>
        </div>
        <div className="mt-12">
          <CodeBlock
            title="the spine"
            language="text"
            code={`app/        controllers models views jobs mailers javascript
bin/        rails jobs thrust
config/     routes.rb application.rb deploy.yml environments/
db/         migrate schema.rb  + solid cache/queue/cable schemas
Dockerfile  Gemfile  config.ru  Procfile.dev`}
          />
        </div>
      </div>
      <LibraryGrid section="architecture" />
    </article>
  );
}
