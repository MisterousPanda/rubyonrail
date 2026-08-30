import { draftsToChapters, type ChapterDraft } from "@/lib/chapter";

const drafts: ChapterDraft[] = [
  {
    slug: "vercel",
    title: "Vercel will not host the monolith",
    lead: "Official answer: Vercel does not support deploying a full Ruby on Rails application. Ruby Functions are MRI entrypoints, not rails s.",
    paragraphs: [
      "A Function is a request-scoped isolate. Puma is a process that stays. Migrations, Solid Queue, Action Cable, and a warm YJIT all assume the second thing.",
      "This homage runs on Vercel because it is Next.js. That is the hybrid that does work. Do not paste a Rails app into api/*.rb and call it a deploy.",
    ],
    list: [
      "Docs: vercel.com/docs/functions/runtimes/ruby",
      "KB: vercel.com/kb/guide/does-vercel-support-ruby-on-rails-applications",
      "Answer in the KB: no, not the full application",
    ],
    related: ["/deploy", "/deploy/hybrid", "/demo/kamal-vs-vercel"],
    aside: "If a tutorial says “Rails on Vercel,” it is talking about a thin Handler, not Basecamp’s stack.",
  },
  {
    slug: "kamal",
    title: "Kamal is the omakase deploy",
    lead: "Docker image, a VPS you SSH into, kamal-proxy, accessories for Postgres and the rest. DHH’s path for Rails 8.",
    paragraphs: [
      "config/deploy.yml names the image, the hosts, the roles (web, job), and the accessories. kamal deploy builds, pushes, boots, and cuts traffic over.",
      "You own the box. You own the midnight. That is the point, not a punishment.",
    ],
    code: {
      filename: "config/deploy.yml",
      language: "yaml",
      code: `service: blog
image: you/blog
servers:
  web:
    hosts:
      - 1.2.3.4
  job:
    hosts:
      - 1.2.3.4
    cmd: bin/jobs
proxy:
  ssl: true
  host: blog.example.com
accessories:
  db:
    image: postgres:16`,
    },
    related: ["/code/deploy-yml", "/deploy/docker", "/demo/kamal-vs-vercel"],
  },
  {
    slug: "docker",
    title: "The Dockerfile is the unit",
    lead: "Rails 8 generates a production Dockerfile: multi-stage, non-root, Thruster in front of Puma. Kamal builds that file. So can anyone else.",
    paragraphs: [
      "Do not copy a random Node image and hope bundle works. Use the file the generator wrote, then change the exceptions.",
      "Assets precompile in the build stage. The runtime stage is lean. Secrets are not ENV in the image layers.",
    ],
    related: ["/code/dockerfile", "/deploy/assets", "/deploy/kamal"],
  },
  {
    slug: "hatchbox",
    title: "Hatchbox: Kamal manners, less SSH",
    lead: "A managed way to land Rails on your own VPS. Still a process. Still a database. Still not a Function.",
    paragraphs: [
      "If Kamal’s YAML is more kitchen than you want, Hatchbox keeps the same architecture with a UI. You are not switching religions. You are hiring a sous-chef.",
    ],
    related: ["/deploy/kamal", "/deploy/render"],
  },
  {
    slug: "fly",
    title: "Fly.io and machines that stay",
    lead: "Fly will run a Dockerized Rails app close to visitors. You still bring a process, a volume or an attached Postgres, and a worker if you enqueue.",
    paragraphs: [
      "fly launch from a Rails app is a well-lit path. It is not Vercel. It is a different landlord with a process model Rails recognizes.",
    ],
    related: ["/deploy/kamal", "/architecture/processes"],
  },
  {
    slug: "render",
    title: "Render’s web + worker",
    lead: "A web service for Puma, a worker for jobs, a Postgres add-on. The split is honest: two process types, one repo.",
    paragraphs: [
      "This is the Heroku-shaped world with different prices. Fine for teams that want a PaaS and a monolith. Still no Cable miracle on a Function.",
    ],
    related: ["/deploy/heroku", "/rails/jobs"],
  },
  {
    slug: "heroku",
    title: "Heroku taught the process model",
    lead: "web and worker dynos. Procfile. Add-ons. Rails grew up here. The metaphor is still the right one even if you left the building.",
    paragraphs: [
      "A dyno is not a Function. It stays until it does not. You pay for the staying. That invoice is why Kamal exists, and also why Heroku still exists.",
    ],
    related: ["/architecture/processes", "/deploy/render"],
  },
  {
    slug: "postgres",
    title: "Postgres is the grown-up default",
    lead: "SQLite is real in Rails 8. Postgres is what you reach for when the data, the team, or the hosting says so.",
    paragraphs: [
      "database.yml per environment. DATABASE_URL in production. Migrations on release, not on the first web request if you can help it.",
      "Managed Postgres (Neon, RDS, Hatchbox, Render) is fine. Putting the only copy on an ephemeral Function filesystem is not.",
    ],
    related: ["/rails/migrations", "/architecture/tree"],
  },
  {
    slug: "assets",
    title: "Propshaft, images, and the CDN",
    lead: "Rails 8 defaults to Propshaft. Fingerprinted files in public/assets. A CDN can sit in front. The app still knows the digest.",
    paragraphs: [
      "Precompile at image build. Do not compile on a tiny boot if you can avoid it. importmaps keep JS as files; jsbundling is when you truly need a pipeline.",
      "Vercel is excellent at static assets — for this Next site. For Rails, the asset story lives next to Puma or on object storage.",
    ],
    related: ["/deploy/docker", "/architecture/tree"],
  },
  {
    slug: "hybrid",
    title: "The hybrid that does work",
    lead: "Marketing and docs on Vercel. Rails on Kamal, Hatchbox, Fly, Render, or a Heroku-shaped host. Talk over HTTPS.",
    paragraphs: [
      "That is a real architecture: two deploy targets, one product story. It is not a compromise pretending to be a monolith, and not a Function pretending to be Puma.",
      "This homage is the Vercel half on purpose. The library pages exist so the Rails half stays honest.",
    ],
    related: ["/deploy/vercel", "/architecture/deploy-split", "/"],
  },
];

export const deployChapters = draftsToChapters("deploy", drafts);
