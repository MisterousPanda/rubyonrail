import { draftsToChapters, type ChapterDraft } from "@/lib/chapter";

const drafts: ChapterDraft[] = [
  {
    slug: "gemfile",
    title: "Gemfile",
    lead: "The menu. Rails 8 omakase: Puma, Propshaft, importmap, Turbo, Stimulus, Solid*, Kamal, Thruster. Postgres when you outgrow SQLite.",
    paragraphs: [
      "This is a teaching Gemfile for a small blog, not a lockfile from a real app. Versions float on the minor. You would commit Gemfile.lock.",
    ],
    code: {
      filename: "Gemfile",
      code: `source "https://rubygems.org"

ruby "3.4.5"

gem "rails", "~> 8.0.2"
gem "propshaft"
gem "pg", "~> 1.5"
gem "puma", ">= 6.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"
gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false
gem "image_processing", "~> 1.2"

group :development, :test do
  gem "debug", require: false
  gem "brakeman", require: false
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end`,
    },
    related: ["/ruby/gems", "/architecture/bundler", "/code/dockerfile"],
  },
  {
    slug: "routes",
    title: "config/routes.rb",
    lead: "The public map. Health check included because Kamal and load balancers need a boring URL.",
    paragraphs: [
      "Print the table with bin/rails routes. The demo at /demo/routes is the same file with a fake table.",
    ],
    code: {
      filename: "config/routes.rb",
      code: `Rails.application.routes.draw do
  root "home#index"

  resources :posts do
    resources :comments, only: [:create, :destroy]
  end

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  get "up" => "rails/health#show", as: :rails_health_check
end`,
    },
    related: ["/rails/routing", "/demo/routes"],
  },
  {
    slug: "post-model",
    title: "app/models/post.rb",
    lead: "A Post with an author, comments, a published scope, and a broadcast when the row lands.",
    paragraphs: [
      "The broadcast is how Hotwire updates other browsers. It needs Cable. Cable needs a process.",
    ],
    code: {
      filename: "app/models/post.rb",
      code: `class Post < ApplicationRecord
  belongs_to :author, class_name: "User"
  has_many :comments, dependent: :destroy

  scope :published, -> { where(published: true) }
  scope :recent, -> { order(created_at: :desc) }

  validates :title, presence: true, length: { maximum: 140 }
  validates :body, presence: true

  broadcasts_refreshes

  def publish
    update!(published: true, published_at: Time.current)
  end
end`,
    },
    related: ["/rails/active-record", "/demo/active-record"],
  },
  {
    slug: "posts-controller",
    title: "app/controllers/posts_controller.rb",
    lead: "Index, show, new, create. Authenticate on writes. Permit two fields. That is a resource.",
    paragraphs: [
      "index uses the published scope so drafts never leak. create stays on the happy redirect / sad re-render pair.",
    ],
    code: {
      filename: "app/controllers/posts_controller.rb",
      code: `class PostsController < ApplicationController
  before_action :authenticate, except: [:index, :show]
  before_action :set_post, only: [:show]

  def index
    @posts = Post.published.recent.includes(:author)
  end

  def show
  end

  def new
    @post = Current.user.posts.new
  end

  def create
    @post = Current.user.posts.new(post_params)
    if @post.save
      WelcomeEmailJob.perform_later(@post.author) if @post.author.posts.one?
      redirect_to @post, notice: "Published."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def set_post
      @post = Post.published.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :body)
    end
end`,
    },
    related: ["/demo/controller", "/rails/controllers"],
  },
  {
    slug: "show-erb",
    title: "app/views/posts/show.html.erb",
    lead: "Server-rendered HTML. A Turbo stream subscription. Comments as a collection partial.",
    paragraphs: [
      "No client router. The URL is the URL. The demo at /demo/erb renders a static stand-in of the same idea.",
    ],
    code: {
      filename: "app/views/posts/show.html.erb",
      language: "erb",
      code: `<%# Server-rendered HTML. Turbo keeps it feeling instant. %>
<article>
  <h1><%= @post.title %></h1>
  <p class="byline">
    <%= @post.author.name %> ·
    <%= time_ago_in_words(@post.created_at) %> ago
  </p>
  <%= simple_format @post.body %>
</article>

<%= turbo_stream_from @post %>
<section id="comments">
  <h2>Comments</h2>
  <%= render @post.comments %>
  <%= render "comments/form", post: @post, comment: Comment.new %>
</section>`,
    },
    related: ["/demo/erb", "/rails/views", "/demo/hotwire"],
  },
  {
    slug: "job",
    title: "app/jobs/welcome_email_job.rb",
    lead: "Enqueue in the request. Run in bin/jobs. Not on Vercel.",
    paragraphs: [
      "queue_as :default is enough until it is not. retry_on for timeouts. The mailer does the talking.",
    ],
    code: {
      filename: "app/jobs/welcome_email_job.rb",
      code: `class WelcomeEmailJob < ApplicationJob
  queue_as :default
  retry_on Net::OpenTimeout, wait: :polynomially_longer, attempts: 5

  def perform(user)
    UserMailer.welcome(user).deliver_now
  end
end`,
    },
    related: ["/demo/job", "/rails/jobs", "/code/mailer"],
  },
  {
    slug: "mailer",
    title: "app/mailers/user_mailer.rb",
    lead: "A method, a subject, two templates you would add beside this class.",
    paragraphs: [
      "welcome.html.erb and welcome.text.erb live in app/views/user_mailer/. Preview at /rails/mailers in development.",
    ],
    code: {
      filename: "app/mailers/user_mailer.rb",
      code: `class UserMailer < ApplicationMailer
  default from: "desk@example.com"

  def welcome(user)
    @user = user
    mail to: @user.email, subject: "You have a desk here."
  end
end`,
    },
    related: ["/rails/mailers", "/code/job"],
  },
  {
    slug: "dockerfile",
    title: "Dockerfile",
    lead: "A sketch of the Rails 8 production image: build stage, runtime stage, Thruster, non-root. Use the generated file in a real app.",
    paragraphs: [
      "Kamal builds this. Fly builds this. Render can build this. Vercel will not run it as rails s.",
    ],
    code: {
      filename: "Dockerfile",
      language: "dockerfile",
      code: `# syntax=docker/dockerfile:1
# Teaching sketch — prefer the file \`rails new\` wrote.

ARG RUBY_VERSION=3.4.5
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base
WORKDIR /rails
RUN apt-get update -qq && apt-get install --no-install-recommends -y curl libjemalloc2 libvips postgresql-client && rm -rf /var/lib/apt/lists/*
ENV RAILS_ENV=production BUNDLE_DEPLOYMENT=1 BUNDLE_PATH=/usr/local/bundle BUNDLE_WITHOUT="development:test"

FROM base AS build
RUN apt-get update -qq && apt-get install --no-install-recommends -y build-essential git libpq-dev libyaml-dev && rm -rf /var/lib/apt/lists/*
COPY Gemfile Gemfile.lock ./
RUN bundle install && rm -rf ~/.bundle/ $BUNDLE_PATH/ruby/*/cache
COPY . .
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

FROM base
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails
RUN groupadd --system --gid 1000 rails && useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && chown -R rails:rails log tmp storage
USER 1000:1000
ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]`,
    },
    related: ["/deploy/docker", "/deploy/kamal"],
  },
  {
    slug: "deploy-yml",
    title: "config/deploy.yml",
    lead: "Kamal’s recipe: image, web, job, proxy, accessory database. The playground at /demo/kamal-vs-vercel is the pamphlet version.",
    paragraphs: [
      "Fill in your registry and hosts. Keep secrets in .kamal/secrets or the environment, not in this file.",
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

registry:
  server: ghcr.io
  username: you

env:
  secret:
    - RAILS_MASTER_KEY
    - DATABASE_URL

accessories:
  db:
    image: postgres:16
    host: 1.2.3.4
    port: 5432
    env:
      secret:
        - POSTGRES_PASSWORD`,
    },
    related: ["/deploy/kamal", "/demo/kamal-vs-vercel", "/architecture/deploy-full"],
  },
];

export const codeChapters = draftsToChapters("code", drafts);
