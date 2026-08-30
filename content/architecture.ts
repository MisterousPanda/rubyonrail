import { draftsToChapters, type ChapterDraft } from "@/lib/chapter";

const rails8Tree = `app/
  assets/           # Propshaft-managed statics
  controllers/
    application_controller.rb
    posts_controller.rb
    concerns/
  helpers/
  jobs/
    application_job.rb
    welcome_email_job.rb
  mailers/
    application_mailer.rb
    user_mailer.rb
  models/
    application_record.rb
    post.rb
    concerns/
  views/
    layouts/application.html.erb
    posts/show.html.erb
    user_mailer/welcome.html.erb
  javascript/       # Stimulus controllers, importmaps
    controllers/
    application.js
  views/pwa/        # optional manifest / service worker
bin/
  rails
  rake
  jobs              # Solid Queue worker
  docker-entrypoint
  setup
  thrust            # Thruster (HTTP/2, asset cache) in front of Puma
config/
  application.rb
  boot.rb           # Bundler + bootsnap
  environment.rb
  routes.rb
  puma.rb
  deploy.yml        # Kamal
  deploy.production.yml
  cable.yml
  cache.yml
  queue.yml
  recuring.yml      # Solid Queue schedule (filename varies)
  storage.yml
  database.yml
  credentials.yml.enc
  master.key        # never commit; or use ENV
  importmap.rb
  bundler-audit.yml
  initializers/
  locales/en.yml
  environments/
    development.rb
    test.rb
    production.rb
db/
  migrate/
  schema.rb
  seeds.rb
  cable_schema.rb   # Solid Cable (Rails 8)
  cache_schema.rb
  queue_schema.rb
lib/
  tasks/
log/
public/
  404.html
  406-unsupported-browser.html
storage/            # Active Storage local
test/               # or spec/
  fixtures/
  models/
  controllers/
  system/
tmp/
vendor/
config.ru
Dockerfile
Gemfile
Gemfile.lock
Procfile.dev
Rakefile
.gitignore`;

const drafts: ChapterDraft[] = [
  {
    slug: "tree",
    title: "A Rails 8 directory is the architecture",
    lead: "The tree is not decoration. It is the map of MVC, jobs, mail, Kamal, and the Solid* databases. Learn the folders and you can open any omakase app.",
    paragraphs: [
      "app/ is what you wrote. config/ is how it boots and how it ships. db/ is history and picture. bin/ is the official doors. The generated Dockerfile is the production unit.",
      "If a file is at the root, it is a contract with the OS or the platform. Gemfile, Dockerfile, config.ru, Procfile.dev.",
    ],
    heading: "The full default-ish tree",
    more: [
      "Exact files shift with rails new flags (--api, --skip-solid, javascript strategy). This is the shape of a Rails 8 omakase app in 2026, not a forensic dump of one laptop.",
    ],
    code: {
      filename: "rails-8-tree.txt",
      language: "text",
      code: rails8Tree,
    },
    related: ["/architecture", "/code/gemfile", "/rails/eight"],
  },
  {
    slug: "request",
    title: "The path of a request",
    lead: "Browser → proxy/Thruster → Puma → middleware → router → controller → model → view → HTML. Optional: enqueue a job, broadcast a stream.",
    paragraphs: [
      "config.ru builds the Rack app. Middleware in application.rb and the environment files wrap every call: cookies, sessions, exceptions, host authorization.",
      "The controller does not talk to the socket. It returns a Rack triple. Turbo may ask for a stream. JSON may ask for a jbuilder or a hash.",
    ],
    list: [
      "1. TLS terminated at kamal-proxy, Thruster, or a load balancer",
      "2. Puma thread or worker accepts the request",
      "3. Rack middleware stack",
      "4. routes.rb → PostsController#show",
      "5. Active Record loads the row",
      "6. ERB renders in the layout",
      "7. Optional: perform_later, broadcast, redirect",
    ],
    related: ["/rails/mvc", "/architecture/middleware", "/demo/controller"],
  },
  {
    slug: "monolith",
    title: "The majestolith",
    lead: "One application, many delivery styles. HTML, JSON, jobs, mail, sockets. Modules and packs if the team is large — extract when the seams are real.",
    paragraphs: [
      "A monolith is not a blob. It is a boundary: one deploy, one schema (or a few Solid extras), one set of credentials. Packwerk and folders are manners inside the boundary.",
      "Split when an axis of scale or a team boundary is proven. Do not split because a talk told you microservices are modern.",
    ],
    related: ["/doctrine/integrated", "/architecture/deploy-split"],
  },
  {
    slug: "boot",
    title: "How the process wakes",
    lead: "bin/rails server → Bundler → config/boot.rb → application.rb → environment → initializers → eager load in production → Puma binds.",
    paragraphs: [
      "Bootsnap caches the load path. Zeitwerk autoloads app/. Production eager-loads so the first request is not a surprise.",
      "YJIT warms after boot. Cold Functions pay this tax often. That is an architecture fact, not a vibe.",
    ],
    related: ["/ruby/yjit", "/architecture/bundler", "/deploy/vercel"],
  },
  {
    slug: "bundler",
    title: "Bundler is the first boot",
    lead: "config/boot.rb sets BUNDLE_GEMFILE and requires bundler/setup. Nothing in Rails exists until the graph does.",
    paragraphs: [
      "bundle lock --add-platform. Group :development, :test stays off in production. require: false for kamal and debug gems you only invoke by binary.",
    ],
    related: ["/code/gemfile", "/ruby/gems"],
  },
  {
    slug: "autoload",
    title: "Zeitwerk names the files",
    lead: "app/models/post.rb defines Post. app/services/billing/invoice.rb defines Billing::Invoice. Inflector exceptions live in an initializer.",
    paragraphs: [
      "Do not require files in app/ by hand. Do not define Foo in bar.rb. Collapse is for the few acronyms (HTML, API) you actually have.",
      "lib/ is eager-loaded only if you put it on the autoload paths. Most house code wants to live in app/.",
    ],
    related: ["/doctrine/convention", "/architecture/tree"],
  },
  {
    slug: "middleware",
    title: "Rack is the hallway before Rails",
    lead: "Every request is a hash. Every response is a triple. Middleware is a linked list of objects that wrap app.call.",
    paragraphs: [
      "Rails inserts a lot of it: Static, Runtime, Logger, RequestId, RemoteIp, HostAuthorization, Cookies, Session, Flash, MethodOverride.",
      "config.middleware.insert_before is how you add a knife. bin/rails middleware prints the list when you forget the order.",
    ],
    related: ["/architecture/request", "/rails/security"],
  },
  {
    slug: "secrets",
    title: "Credentials, not a .env folklore",
    lead: "config/credentials.yml.enc plus master.key or RAILS_MASTER_KEY. Per-environment credentials when the stages disagree.",
    paragraphs: [
      "bin/rails credentials:edit. Keep the key in the host’s secret store or Kamal secrets. Do not commit the key. Do not paste production SMTP into a Next.js env and call it Rails.",
    ],
    related: ["/rails/security", "/deploy/kamal"],
  },
  {
    slug: "environments",
    title: "Three houses, one app",
    lead: "development reloads. test is disposable and transactional. production assumes eager load, caching, and that you meant the SSL host.",
    paragraphs: [
      "config/environments/*.rb override application.rb. The same class, different manners. Do not invent a fourth house called staging unless you will operate it.",
    ],
    related: ["/architecture/boot", "/deploy/postgres"],
  },
  {
    slug: "deploy-full",
    title: "Deploy the whole process",
    lead: "One image, web role, job role, database accessory. Kamal, Hatchbox, Fly, Render, Heroku-shaped PaaS. This is the Rails-shaped deploy.",
    paragraphs: [
      "Release phase: db:prepare. Health check: /up. Rollback is a previous image. Logs are the process stdout.",
      "If you cannot name the worker, you are not deploying the monolith — you are deploying a controller action in costume.",
    ],
    related: ["/deploy/kamal", "/architecture/processes", "/code/deploy-yml"],
  },
  {
    slug: "deploy-split",
    title: "Split only on a seam",
    lead: "Next.js on Vercel for the brochure. Rails on a VPS for the product. Or an API box and an HTML box that share a database until they should not.",
    paragraphs: [
      "A split deploy is honest when the runtimes differ — this site versus a Rails app. It is fashion when two Rails apps share nothing but a Slack channel.",
      "Talk over HTTPS. Share auth only with a design. Do not mount the monolith inside a Function to avoid the second invoice.",
    ],
    related: ["/deploy/hybrid", "/doctrine/integrated"],
  },
  {
    slug: "processes",
    title: "Web, worker, cable, cron",
    lead: "Puma serves HTTP. bin/jobs pops Solid Queue. A separate cable process if you outgrow in-process. Cron is recurring.yml or a system timer.",
    paragraphs: [
      "Kamal roles map 1:1 to these. Heroku dyno types did too. Vercel has a Function and a cron that hits a URL. Those are not the same taxonomy.",
    ],
    related: ["/rails/jobs", "/rails/cable", "/demo/kamal-vs-vercel"],
  },
  {
    slug: "full-files",
    title: "From tree to source",
    lead: "The architecture pages name the folders. The code library prints the files. Read them as one exhibit.",
    paragraphs: [
      "Start with Gemfile and routes.rb. Then the Post model, the controller, the ERB, the job, the mailer, the Dockerfile, deploy.yml.",
      "Or open a Replit-style demo and press Run. The sandbox is a postcard. The files are the city.",
    ],
    related: ["/code", "/demo", "/architecture/tree"],
  },
];

export const architectureChapters = draftsToChapters("architecture", drafts);
