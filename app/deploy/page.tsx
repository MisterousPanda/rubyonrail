import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Deploying Rails — and Vercel",
  description:
    "How to deploy Ruby on Rails with Kamal and friends, and whether Vercel supports a full Rails app.",
};

export default function DeployPage() {
  return (
    <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        kicker="Chapter 03 · Shipping"
        title="Rails wants a process. Vercel wants a function."
        lede="You can absolutely deploy Rails — DHH’s own path is Kamal onto a VPS you own. You can run thin Ruby on Vercel. Those are not the same sentence. This page keeps them honest."
      />

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="border border-teal/30 bg-teal/8 p-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-teal uppercase">
            Direct answer
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight">
            Does Vercel support Ruby on Rails?
          </h2>
          <p className="mt-4 leading-relaxed text-ink/75">
            <strong>Not as a first-class Rails host.</strong> Vercel shines at
            Next.js, Node, Python, and other frameworks that compile down to
            static assets plus Vercel Functions. There is an official{" "}
            <a
              className="underline decoration-teal underline-offset-3"
              href="https://vercel.com/docs/functions/runtimes/ruby"
            >
              Ruby runtime for Functions
            </a>
            : a{" "}
            <code className="font-mono text-[13px] text-ruby">Handler</code>{" "}
            proc in <code className="font-mono text-[13px] text-ruby">api/</code>
            , a Gemfile, MRI 3.x. That is request-scoped Ruby — not Puma,
            Active Record migrations, Action Cable, or Solid Queue.
          </p>
          <p className="mt-4 leading-relaxed text-ink/75">
            The framework list includes{" "}
            <code className="font-mono text-[13px] text-ruby">ruby</code>{" "}
            (think Jekyll-style or function apps). It does not treat a full
            Rails monolith the way it treats this Next.js site.{" "}
            <em>This homage is Next.js on Vercel on purpose.</em>
          </p>
        </div>
        <div className="border border-ink/12 p-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-ruby uppercase">
            What Rails actually needs
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
            <li>
              <strong>Puma</strong> — a long-running Ruby process, not a
              per-request lambda with a boot tax.
            </li>
            <li>
              <strong>Postgres</strong> — and usually Redis or Solid Cache /
              Solid Queue for jobs and cable.
            </li>
            <li>
              <strong>Assets & Active Storage</strong> — compiled CSS/JS, then
              object storage for uploads.
            </li>
            <li>
              <strong>Migrations & clocks</strong> —{" "}
              <code className="font-mono text-[12px]">db:prepare</code> on
              release, recurring jobs, maybe a worker process.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl tracking-tight">
          How people actually ship Rails
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Path
            title="Kamal"
            href="https://kamal-deploy.org"
            body="The 37signals path. Docker images, a load balancer, one or more VMs. You own the metal (or the droplet). Fits the Omarchy worldview: fewer landlords, more craft."
          />
          <Path
            title="Hatchbox / Hatchbox-style"
            href="https://www.hatchbox.io"
            body="A Rails-shaped PaaS on servers you still recognize. Good when you want Capistrano energy without writing the playbook twice."
          />
          <Path
            title="Fly.io · Render · Railway"
            href="https://fly.io/docs/rails/"
            body="Containers with a Postgres addon. Closer to “git push” than Kamal, still a real process model."
          />
          <Path
            title="Heroku & friends"
            href="https://devcenter.heroku.com/articles/getting-started-with-rails8"
            body="The original Rails PaaS shape: web dyno, worker dyno, addon database. Still a valid teaching model."
          />
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <CodeBlock
          title="Kamal-shaped deploy (sketch)"
          language="bash"
          code={`# On a box you control
kamal setup
kamal deploy

# Rails still boots as Puma behind the proxy
# Workers run Solid Queue or Sidekiq beside it`}
        />
        <CodeBlock
          title="Vercel Ruby Function — not Rails"
          language="ruby"
          code={`# api/hello.rb  →  a Function, not ./bin/rails server
Handler = Proc.new do |request, response|
  name = request.query["name"] || "world"
  response.status = 200
  response["Content-Type"] = "text/plain; charset=utf-8"
  response.body = "hello, #{name}"
end`}
        />
      </section>

      <section className="mt-16 max-w-3xl text-[17px] leading-8 text-ink/80">
        <h2 className="font-serif text-3xl tracking-tight text-ink">
          The hybrid that does work
        </h2>
        <p className="mt-5">
          Put the marketing site, docs, or this homage on Vercel (Next.js). Put
          the Rails app on Kamal, Fly, or Render. Talk over HTTPS. That is a
          real architecture — not a compromise pretending to be a monolith.
        </p>
        <p className="mt-5">
          If you came here from Omarchy on a T2 Mac: deploy Rails the way DHH
          would recognize. Use Vercel for the things it is world-class at —
          including this site.
        </p>
        <p className="mt-8">
          <Link href="/omarchy" className="font-mono text-sm tracking-[0.14em] text-teal uppercase">
            Next: Omarchy →
          </Link>
        </p>
      </section>
    </article>
  );
}

function Path({
  title,
  href,
  body,
}: {
  title: string;
  href: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="border border-ink/12 p-6 transition-colors hover:border-ruby/40"
    >
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{body}</p>
    </a>
  );
}
