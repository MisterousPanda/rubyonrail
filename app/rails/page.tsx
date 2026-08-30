import type { Metadata } from "next";
import Link from "next/link";
import { Architecture } from "@/components/architecture";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "What Rails is",
  description:
    "Ruby on Rails: convention over configuration, MVC, Active Record, and the architecture of a full-stack default.",
};

const reasons = [
  {
    title: "Programmer happiness",
    body: "The first constraint is how Tuesday morning feels. Rails exists so you ship product, not glue — the same bet Matz made for Ruby.",
  },
  {
    title: "Convention over configuration",
    body: "A Post talks to posts. The seven REST actions arrive with resources :posts. You write the exception, not the skeleton.",
  },
  {
    title: "The menu is omakase",
    body: "Router, ORM, mailer, jobs, cable, tests, generators — one curated stack. You spend taste on the product, not on choosing 50 libraries.",
  },
  {
    title: "One process, a whole product",
    body: "HTML, JSON, background work, email, and WebSockets live in the same application. No second runtime required to post a comment.",
  },
  {
    title: "Hotwire, not a mandatory SPA",
    body: "The server still renders HTML. Turbo Drive, Frames, and Streams make it feel instant. You can expose an API. You do not have to start there.",
  },
  {
    title: "Rails 8 ships without a PaaS",
    body: "Solid Queue, Cache, and Cable plus Kamal 2. A new app can go to a VPS you own — no Redis tax, no landlord, on day one.",
  },
];

const layers = [
  {
    name: "Router",
    detail:
      "config/routes.rb maps HTTP to a controller action. Resources give you the seven REST actions without drawing each line by hand.",
  },
  {
    name: "Controller",
    detail:
      "A thin object that permits params, loads records, and chooses a response — HTML, Turbo Stream, or JSON.",
  },
  {
    name: "Model",
    detail:
      "Active Record is the table and the object. Validations, associations, and callbacks live next to the data they describe.",
  },
  {
    name: "View",
    detail:
      "ERB, layouts, and partials. With Hotwire, the server still renders HTML — Turbo paints the page without a separate SPA.",
  },
  {
    name: "Jobs & mailers",
    detail:
      "Solid Queue, Action Mailer, Action Cable. The monolith keeps background work and realtime in the same application.",
  },
  {
    name: "Doctrine",
    detail:
      "OMAC — omakase. Rails chooses the stack so you can spend taste on the product, not on glue.",
  },
];

const walk = [
  {
    name: "The browser",
    detail:
      "Someone hits GET /articles/hello-rails. Cookies, Accept: text/html, maybe a Turbo-Frame header. No app-owned JavaScript router has to invent that URL — it is just HTTP.",
  },
  {
    name: "routes.rb",
    detail:
      "The mapper already knows resources :articles. That path is ArticlesController#show. Convention drew the line; you only write the exception.",
  },
  {
    name: "The controller",
    detail:
      "A thin object permits nothing it does not need, finds the record, and decides the response. HTML by default. A Turbo Stream if the form asked for one. JSON if you truly have an API client.",
  },
  {
    name: "The model",
    detail:
      "Active Record is the table and the object. Article.find_by!(slug:) hits articles, runs validations you declared beside the data, and walks has_many :comments without a separate repository layer.",
  },
  {
    name: "View, then Turbo",
    detail:
      "show.html.erb renders HTML in a layout. Turbo Drive swaps the body. A stream can append a comment without a page load. The server still owns the markup.",
  },
];

export default function RailsPage() {
  return (
    <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        kicker="Chapter 02 · The framework"
        title="Rails is the omakase web stack."
        lede="David Heinemeier Hansson extracted Ruby on Rails from Basecamp in 2004. The bet was not “more libraries.” It was a default: MVC, Active Record, migrations, and a generator that gets you from idea to running app before the coffee cools."
      />

      <div className="prose-essay mt-14 max-w-3xl text-[17px] leading-8 text-ink/80">
        <p>
          Convention over configuration means the framework already knows where
          things live. A{" "}
          <code className="font-mono text-[14px] text-ruby">Post</code> model
          talks to{" "}
          <code className="font-mono text-[14px] text-ruby">posts</code>.{" "}
          <code className="font-mono text-[14px] text-ruby">
            PostsController#show
          </code>{" "}
          renders{" "}
          <code className="font-mono text-[14px] text-ruby">
            app/views/posts/show.html.erb
          </code>
          . You override the default when you have a reason — not because the
          skeleton was empty.
        </p>
        <p>
          That is architecture as kindness. Layers are visible. The request
          walks a straight line. Twenty years later the same line still holds:
          route, controller, model, view — plus the jobs and cables a real
          product grows. Rails 8’s default is the Solid trifecta — Queue,
          Cache, Cable — plus Kamal 2, so a new app can ship without renting
          a PaaS or standing up Redis on day one.{" "}
          <a
            className="underline decoration-ruby/40 underline-offset-3"
            href="https://rubyonrails.org/doctrine"
          >
            The Rails Doctrine
          </a>{" "}
          is still the why: happiness, convention, omakase.
        </p>
        <p>
          Hotwire (Turbo + Stimulus) is the honest counter-offer to the SPA
          default. A React or Vue shell wins when the UI is a long-lived client:
          offline caches, pixel-perfect canvases, an app that is mostly state
          machines. Most product software is still forms, lists, and
          authorization. For that, shipping a JSON API and a second runtime is
          a tax, not a virtue. Rails 7 and 8 keep rendering HTML on the server
          and let Turbo Drive, Frames, and Streams refresh what changed. You
          can still expose JSON. You just do not start there.
        </p>
      </div>

      <section className="mt-16" aria-labelledby="why-rails-heading">
        <p className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
          Why teams still pick it
        </p>
        <h2
          id="why-rails-heading"
          className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl"
        >
          Advantages — the reasons to use Ruby on Rails
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-8 text-ink/70">
          Not a feature dump. Six bets that still hold: happiness, convention,
          a finished menu, one monolith, HTML over the wire, and a deploy path
          that does not require Vercel.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <li
              key={reason.title}
              className="border border-ink/12 bg-paper-2/40 p-6"
            >
              <span className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {reason.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link
            href="/deploy"
            className="font-mono text-sm tracking-[0.14em] text-ruby uppercase"
          >
            Can you deploy that monolith on Vercel? No. →
          </Link>
        </p>
      </section>

      <section className="mt-16" aria-labelledby="request-walk-heading">
        <h2
          id="request-walk-heading"
          className="font-serif text-3xl tracking-tight"
        >
          A request, walked
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-8 text-ink/70">
          Same line as the grid below — told as a single trip from the tab to
          the template. This is the 2004 shape, still the Rails 8 shape.
        </p>
        <ol className="mt-8 max-w-3xl divide-y divide-ink/12 border border-ink/12">
          {walk.map((step, index) => (
            <li key={step.name} className="flex gap-5 p-6 sm:gap-8">
              <span className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-2xl">{step.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-16">
        <Architecture title="A request through the monolith" layers={layers} />
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <CodeBlock
          title="config/routes.rb"
          language="ruby"
          code={`Rails.application.routes.draw do
  root "articles#index"

  resources :articles do
    resources :comments, only: %i[create destroy]
  end

  get "up" => "rails/health#show", as: :rails_health_check
end`}
        />
        <CodeBlock
          title="app/models/article.rb"
          language="ruby"
          code={`class Article < ApplicationRecord
  belongs_to :author, class_name: "User"
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :slug, uniqueness: true

  scope :published, -> { where(published: true) }
end`}
        />
        <CodeBlock
          title="app/controllers/articles_controller.rb"
          language="ruby"
          code={`class ArticlesController < ApplicationController
  def index
    @articles = Article.published.order(published_at: :desc)
  end

  def show
    @article = Article.find_by!(slug: params[:id])
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to @article, notice: "Published."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def article_params
      params.require(:article).permit(:title, :body, :slug)
    end
end`}
        />
        <CodeBlock
          title="app/views/articles/show.html.erb"
          language="erb"
          code={`<%# Server-rendered HTML. Turbo keeps it feeling instant. %>
<article>
  <h1><%= @article.title %></h1>
  <p class="byline"><%= @article.author.name %></p>
  <%= simple_format @article.body %>
</article>

<%= turbo_stream_from @article %>
<%= render @article.comments %>`}
        />
        <CodeBlock
          title="app/views/comments/_form.html.erb"
          language="erb"
          code={`<%= form_with model: [@article, Comment.new] do |form| %>
  <%= form.label :body, "Add a comment" %>
  <%= form.text_area :body, rows: 3, required: true %>
  <%= form.submit "Post comment" %>
<% end %>`}
        />
      </div>

      <p className="mt-16">
        <Link
          href="/deploy"
          className="font-mono text-sm tracking-[0.14em] text-teal uppercase"
        >
          Next: Shipping Rails →
        </Link>
      </p>
    </article>
  );
}
