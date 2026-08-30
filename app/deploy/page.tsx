import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Deploying Rails — and Vercel",
  description:
    "How to deploy Ruby on Rails with Kamal and friends, and whether Vercel supports a full Rails app.",
};

const comparison = [
  {
    need: "Lifetime",
    rails: "Puma stays up. Warm boot, then keep serving.",
    vercel: "A request-scoped isolate. Cold start is a tax, not a footnote.",
  },
  {
    need: "Boot unit",
    rails: "./bin/rails server behind a proxy (Thruster, kamal-proxy, nginx).",
    vercel: "A Handler proc in api/*.rb plus a Gemfile. MRI 3.x.",
  },
  {
    need: "Database",
    rails: "Active Record, db:prepare on release, migrations that actually run.",
    vercel: "You may open a client. There is no first-class Rails migrator.",
  },
  {
    need: "Jobs",
    rails: "Solid Queue or Sidekiq as a worker process (or in Puma, for small apps).",
    vercel: "No worker dyno. Cron is a schedule hitting another Function.",
  },
  {
    need: "Realtime",
    rails: "Action Cable — a long-lived socket on a process you own.",
    vercel: "Not Cable. Not the same connection model.",
  },
  {
    need: "Disk",
    rails: "Volumes for Active Storage local, or object storage beside the box.",
    vercel: "Ephemeral filesystem. Treat the Function as stateless.",
  },
];

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
            <strong>Not as a first-class Rails host.</strong> Vercel does not
            ship Puma, Active Record migrations, Action Cable, or Solid Queue
            as a monolith you git-push and forget. It shines at Next.js, Node,
            Python, and other frameworks that compile down to static assets
            plus Vercel Functions. There is an official{" "}
            <a
              className="underline decoration-teal underline-offset-3"
              href="https://vercel.com/docs/functions/runtimes/ruby"
            >
              Ruby runtime for Functions
            </a>
            : a{" "}
            <code className="font-mono text-[13px] text-ruby">Handler</code>{" "}
            proc in{" "}
            <code className="font-mono text-[13px] text-ruby">api/</code>, a
            Gemfile, MRI 3.x. That is request-scoped Ruby — not{" "}
            <code className="font-mono text-[13px] text-ruby">
              ./bin/rails server
            </code>
            .
          </p>
          <p className="mt-4 leading-relaxed text-ink/75">
            The framework list includes{" "}
            <code className="font-mono text-[13px] text-ruby">ruby</code>{" "}
            (think Jekyll-style or function apps). It does not treat a full
            Rails monolith the way it treats this Next.js site. Vercel’s own{" "}
            <a
              className="underline decoration-teal underline-offset-3"
              href="https://vercel.com/kb/guide/does-vercel-support-ruby-on-rails-applications"
            >
              knowledge base
            </a>{" "}
            describes the honest pattern: Rails as a headless API elsewhere,
            Next.js (or another frontend) on Vercel.{" "}
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
          Rails process vs Vercel Function
        </h2>
        <p className="mt-3 max-w-2xl text-ink/65">
          Same language. Different contract. If the row matters to your app,
          you are not choosing a host — you are choosing a process model.
        </p>
        <div className="mt-8 overflow-x-auto border border-ink/12">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Side-by-side: what a Rails process provides versus a Vercel Ruby
              Function
            </caption>
            <thead>
              <tr className="border-b border-ink/12 bg-paper-2/60">
                <th
                  scope="col"
                  className="px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase"
                >
                  Need
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-ruby uppercase"
                >
                  Rails process
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-teal uppercase"
                >
                  Vercel Function
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row.need}
                  className="border-b border-ink/10 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-serif text-lg font-normal text-ink"
                  >
                    {row.need}
                  </th>
                  <td className="px-5 py-4 align-top leading-relaxed text-ink/75">
                    {row.rails}
                  </td>
                  <td className="px-5 py-4 align-top leading-relaxed text-ink/75">
                    {row.vercel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            body="The 37signals path — DHH’s own. Docker images, kamal-proxy, one or more VMs. You own the metal (or the droplet). Fits the Omarchy worldview: fewer landlords, more craft."
          />
          <Path
            title="Hatchbox / Hatchbox-style"
            href="https://www.hatchbox.io"
            body="A Rails-shaped PaaS on servers you still recognize. Good when you want Capistrano energy without writing the playbook twice."
          />
          <Path
            title="Fly.io · Render"
            href="https://fly.io/docs/rails/"
            body="Containers with a Postgres addon. Closer to “git push” than Kamal, still a real process model — Puma, a worker, a database."
          />
          <Path
            title="Heroku & friends"
            href="https://devcenter.heroku.com/articles/getting-started-with-rails8"
            body="The original Rails PaaS shape: web dyno, worker dyno, addon database. Still a valid teaching model, and the mold later hosts copied."
          />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl tracking-tight">
          Kamal, sketched — not a tutorial
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/65">
          Rails 8 already writes you a production Dockerfile. Kamal’s job is
          to build that image, push it, and run Puma (plus a job process if
          you ask) on a box you control.{" "}
          <code className="font-mono text-[13px] text-ruby">kamal setup</code>
          {" "}once;{" "}
          <code className="font-mono text-[13px] text-ruby">kamal deploy</code>
          {" "}thereafter. The YAML is the interesting part.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <CodeBlock
            title="config/deploy.yml — Kamal 2 sketch"
            language="yaml"
            code={`# Not a full playbook. Enough to see the process model.
service: campfire
image: your-registry/campfire

servers:
  web:
    - 192.168.0.10
  # Optional: keep Solid Queue off the request path
  job:
    hosts:
      - 192.168.0.10
    cmd: bin/jobs

proxy:
  ssl: true
  host: campfire.example.com
  # kamal-proxy in front of Puma. A process, not a lambda.

registry:
  username: your-user
  password:
    - KAMAL_REGISTRY_PASSWORD

env:
  clear:
    RAILS_ENV: production
    # SOLID_QUEUE_IN_PUMA: true   # fine for small apps; drop the job role
  secret:
    - RAILS_MASTER_KEY

builder:
  arch: amd64
  # Uses the Dockerfile rails new already wrote`}
          />
          <CodeBlock
            title="Dockerfile — the image Kamal ships"
            language="dockerfile"
            code={`# Rails 8 default, abbreviated. Comments, not a tutorial.
# syntax=docker/dockerfile:1
FROM ruby:3.3-slim AS base
WORKDIR /rails
# jemalloc, libvips, libpq — the usual production extras

# build: bundle install, bootsnap, assets:precompile
# final: copy the bundle, drop to a non-root user, then:

ENTRYPOINT ["/rails/bin/docker-entrypoint"]
# entrypoint typically runs db:prepare before boot

EXPOSE 80
# Thruster + Puma. Stays up. Serves the monolith.
CMD ["./bin/thrust", "./bin/rails", "server"]`}
          />
        </div>
      </section>

      <section className="mt-10">
        <CodeBlock
          title="Vercel Ruby Function — not Rails"
          language="ruby"
          code={`# api/hello.rb  →  a Function, not ./bin/rails server
# Docs: https://vercel.com/docs/functions/runtimes/ruby
Handler = Proc.new do |request, response|
  name = request.query["name"] || "world"
  response.status = 200
  response["Content-Type"] = "text/plain; charset=utf-8"
  response.body = "hello, #{name}"
end

# Gemfile at the project root. MRI 3.x. Request-scoped.
# No Puma. No migrations. No Action Cable. No Solid Queue.`}
        />
      </section>

      <section className="mt-16 max-w-3xl text-[17px] leading-8 text-ink/80">
        <h2 className="font-serif text-3xl tracking-tight text-ink">
          The hybrid that does work
        </h2>
        <p className="mt-5">
          Put the marketing site, docs, or this homage on Vercel (Next.js). Put
          the Rails app on Kamal, Hatchbox, Fly, Render, or a Heroku-shaped
          PaaS. Talk over HTTPS. That is a real architecture — not a compromise
          pretending to be a monolith, and not a Function pretending to be
          Puma.
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
