import type { Metadata } from "next";
import { Architecture } from "@/components/architecture";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "What Rails is",
  description:
    "Ruby on Rails: convention over configuration, MVC, Active Record, and the architecture of a full-stack default.",
};

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
          product grows.
        </p>
      </div>

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
      </div>
    </article>
  );
}
