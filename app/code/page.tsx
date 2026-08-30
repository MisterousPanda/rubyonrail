import type { Metadata } from "next";
import Link from "next/link";
import { LibraryGrid } from "@/components/library-grid";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Full files",
  description:
    "Gemfile, routes, model, controller, ERB, job, mailer, Dockerfile, and Kamal — a small Rails 8 app on the page.",
};

export default function CodePage() {
  return (
    <article>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <PageHeader
          kicker="Code · A small Rails 8 app"
          title="Read the files. Then remix the postcard."
          lede="Architecture names the folders. These pages print the source: Gemfile, routes.rb, Post, PostsController, show.html.erb, a job, a mailer, a Dockerfile, deploy.yml. Teaching sketches — prefer what rails new writes on your machine."
        />
        <p className="mt-10 max-w-2xl text-[17px] leading-8 text-ink/80">
          Want a Run button? The{" "}
          <Link href="/demo" className="text-ruby underline">
            Replit-style demos
          </Link>{" "}
          are the same ideas in a sandbox that does not boot MRI or Puma.
        </p>
      </div>
      <LibraryGrid section="code" />
    </article>
  );
}
