import { draftsToChapters, type ChapterDraft } from "@/lib/chapter";

const drafts: ChapterDraft[] = [
  {
    slug: "doctrine",
    title: "The doctrine, in the app",
    lead: "Nine pillars live at rubyonrails.org/doctrine. This page is the field guide: how those sentences show up in a running app.",
    paragraphs: [
      "Happiness is the Inflector and the smile in people.third. Convention is Post → posts. Omakase is not inventing a stack on day one. Integrated systems are why jobs and mailers sit in the same repo.",
      "Read the full tent next door. Then come back and look at routes.rb with that voice in your head.",
    ],
    related: ["/doctrine/happiness", "/doctrine/omakase", "/doctrine/integrated"],
  },
  {
    slug: "mvc",
    title: "MVC is a hallway, not a prison",
    lead: "Model, view, controller. Rails did not invent the triad. It made the hallway so obvious that you stop arguing about furniture.",
    paragraphs: [
      "The controller is thin on purpose: permit, load, choose a response. The model holds the rules that survive any delivery. The view is HTML — or JSON — that the controller already decided to render.",
      "When a controller starts orchestrating five models and a remote API, you have a scene. Extract it. That is still MVC. It is just honest about the fourth object.",
    ],
    related: ["/architecture/request", "/code/posts-controller", "/demo/controller"],
  },
  {
    slug: "routing",
    title: "routes.rb is the map",
    lead: "HTTP arrives as a verb and a path. The router names the controller action. Resources give you the seven REST actions without drawing each line.",
    paragraphs: [
      "root, resources, namespace, member, collection, resolve. Constraints and redirects. The file is Ruby, so a loop that draws a little admin is allowed — and usually a smell.",
      "bin/rails routes is the truth. If the table surprises you, the app will surprise the next person.",
    ],
    code: {
      filename: "config/routes.rb",
      code: `Rails.application.routes.draw do
  root "home#index"
  resources :posts do
    resources :comments, only: [:create, :destroy]
  end
  get "up" => "rails/health#show", as: :rails_health_check
end`,
    },
    related: ["/code/routes", "/demo/routes", "/architecture/request"],
  },
  {
    slug: "active-record",
    title: "The table is the object",
    lead: "Active Record is the row and the class. Validations, associations, and scopes live next to the data they describe.",
    paragraphs: [
      "You do not write a separate DTO to feel professional. You write Post.published.limit(20) and keep the SQL on the relation until you enumerate.",
      "N+1 is the tax for forgetting includes. Callbacks are the tax for hiding a second write in a save. Both are sharp knives.",
    ],
    code: {
      filename: "app/models/post.rb",
      code: `class Post < ApplicationRecord
  belongs_to :author
  has_many :comments, dependent: :destroy

  scope :published, -> { where(published: true) }

  validates :title, presence: true
end

Post.published.includes(:author).order(created_at: :desc).limit(20)`,
    },
    related: ["/demo/active-record", "/code/post-model", "/rails/associations"],
  },
  {
    slug: "associations",
    title: "has_many is a sentence",
    lead: "belongs_to, has_many, has_one, has_and_belongs_to_many, has_many :through. The names are the relationship.",
    paragraphs: [
      "dependent: :destroy is a policy. optional: true is a policy. inverse_of stops a certain class of double-think. through is how you keep a join table from becoming a personality.",
      "If the association name needs a comment, the name is wrong.",
    ],
    code: {
      filename: "associations.rb",
      code: `class Author < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, through: :posts
end

class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :author
end`,
    },
    related: ["/rails/active-record", "/rails/migrations"],
  },
  {
    slug: "migrations",
    title: "Schema is history you can replay",
    lead: "A migration is a dated class that changes the database. schema.rb (or structure.sql) is the current picture. Both belong in git.",
    paragraphs: [
      "db:prepare on deploy creates or migrates. Reversible changes are a kindness. Irreversible data rewrites need a note and a backup.",
      "Rails 8 still wants a real database process. A Function with a client is not a migrator.",
    ],
    code: {
      filename: "db/migrate/20260830000000_create_posts.rb",
      code: `class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :body
      t.boolean :published, default: false, null: false
      t.references :author, null: false, foreign_key: true
      t.timestamps
    end
  end
end`,
    },
    related: ["/demo/migration", "/deploy/postgres", "/code/post-model"],
  },
  {
    slug: "controllers",
    title: "Thin controllers, three outcomes",
    lead: "Permit params. Load or build a record. Redirect on success, re-render on failure, or head a status. That is most of a controller.",
    paragraphs: [
      "before_action is for authentication and loading, not for business novels. rescue_from is for the exceptions you mean to translate into HTTP.",
      "Turbo Stream responses are still controller work: same action, different format.",
    ],
    code: {
      filename: "app/controllers/posts_controller.rb",
      code: `class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to @post, notice: "Published."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def post_params
      params.require(:post).permit(:title, :body)
    end
end`,
    },
    related: ["/demo/controller", "/code/posts-controller", "/rails/security"],
  },
  {
    slug: "views",
    title: "A view that is still HTML",
    lead: "ERB is HTML with pockets. Layouts wrap. Partials repeat. Helpers keep the pockets from growing teeth.",
    paragraphs: [
      "instance variables leak from controller to view by convention. That is intimate and a little rude. Keep the surface small: @post, not twelve cousins.",
      "Hotwire did not replace ERB. It made ERB feel instant.",
    ],
    related: ["/demo/erb", "/code/show-erb", "/rails/hotwire"],
  },
  {
    slug: "hotwire",
    title: "Hotwire, not a mandatory SPA",
    lead: "The server still renders HTML. Turbo Drive, Frames, and Streams make it feel instant. You can expose an API. You do not have to start there.",
    paragraphs: [
      "Drive intercepts link clicks and form submits. Frames morph a region. Streams push HTML over the socket or the response. Stimulus sprinkles behavior when HTML is not enough.",
      "This is the opposite of shipping a JavaScript runtime that reimplements routing, caching, and templates. The playground at /demo/hotwire is a postcard. Rails is the post office.",
    ],
    related: ["/rails/turbo", "/rails/stimulus", "/demo/hotwire"],
  },
  {
    slug: "turbo",
    title: "Turbo Drive, Frames, Streams",
    lead: "Three tools, one idea: update HTML without becoming a single-page app.",
    paragraphs: [
      "Drive is the default smoothness. Frames are the islands. Streams are the letters that arrive after the request — or instead of a full document.",
      "turbo_stream_from plus a broadcast from a model is how a comment appears on someone else’s desk. That wants Action Cable, which wants a process, which is not a Function.",
    ],
    code: {
      filename: "app/views/comments/_form.html.erb",
      language: "erb",
      code: `<%= turbo_frame_tag @comment do %>
  <%= form_with model: [@post, @comment] do |form| %>
    <%= form.text_area :body %>
    <%= form.submit "Post" %>
  <% end %>
<% end %>`,
    },
    related: ["/rails/cable", "/demo/hotwire", "/deploy/vercel"],
  },
  {
    slug: "stimulus",
    title: "Stimulus is a sprinkle",
    lead: "A modest JavaScript framework: controllers on the DOM, values as attributes, targets as hooks. No virtual DOM required.",
    paragraphs: [
      "When a disclosure widget or a local search does not deserve a SPA, you put data-controller=\"search\" on an element and write a small class.",
      "importmap-rails pins the files. You do not owe anyone webpack for a toggle.",
    ],
    code: {
      filename: "app/javascript/controllers/clipboard_controller.js",
      language: "javascript",
      code: `import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["source"]

  copy() {
    navigator.clipboard.writeText(this.sourceTarget.value)
  }
}`,
    },
    related: ["/demo/stimulus", "/rails/hotwire"],
  },
  {
    slug: "jobs",
    title: "Work later, same app",
    lead: "ApplicationJob, perform_later, a queue. Solid Queue in Rails 8 can keep the jobs in your database. Sidekiq is still a fine knife.",
    paragraphs: [
      "The request returns. A worker process pops the job. That worker is why Kamal has a job role and Vercel does not have a dyno.",
      "Idempotency, retries, and discard_on are the adult parts. The cute part is WelcomeEmailJob.perform_later(user).",
    ],
    related: ["/demo/job", "/rails/solid", "/code/job"],
  },
  {
    slug: "mailers",
    title: "Mail is just another view",
    lead: "Action Mailer: a class, a method, two templates (text and HTML), and deliver_later if you are civilized.",
    paragraphs: [
      "Preview in the browser. Test by asserting enqueued mail. Do not send real mail from a request if you can help it.",
      "Credentials hold SMTP. The worker holds the night shift.",
    ],
    related: ["/code/mailer", "/rails/jobs"],
  },
  {
    slug: "cable",
    title: "Action Cable is a long conversation",
    lead: "WebSockets for the monolith. A channel, a stream, a broadcast. Solid Cable can keep pub/sub in the database.",
    paragraphs: [
      "The connection is the reason serverless essays get quiet. A Function that dies after the response cannot be a socket server.",
      "Use Cable when two browsers should see the same HTML land. Use polling if you are not ready for a process that stays.",
    ],
    related: ["/rails/solid", "/architecture/processes", "/deploy/vercel"],
  },
  {
    slug: "solid",
    title: "Solid Queue, Cache, Cable",
    lead: "Rails 8’s bet: your database can be the queue, the cache store, and the pub/sub board. No Redis tax on day one.",
    paragraphs: [
      "Three gems, three schemas (often separate SQLite or Postgres databases). bin/jobs runs the worker. Puma can run the supervisor on small apps.",
      "You can still bring Redis later. The doctrine is progress and an omakase default, not a lifetime ban on extra boxes.",
    ],
    related: ["/rails/eight", "/architecture/tree", "/deploy/kamal"],
  },
  {
    slug: "generators",
    title: "The generator is a teacher",
    lead: "bin/rails generate scaffold post title:string body:text writes the hallway. You delete what you do not want. That is convention as a printer.",
    paragraphs: [
      "People sneer at scaffolds, then reinvent them poorly. Use generate to see the official shape of a resource, then edit like an adult.",
      "config/application.rb can turn off the helpers or the assets you do not want printed.",
    ],
    code: {
      filename: "terminal",
      language: "bash",
      code: `bin/rails generate model Post title:string body:text published:boolean
bin/rails generate controller Posts index show new create
bin/rails generate job WelcomeEmail
bin/rails db:migrate`,
    },
    related: ["/rails/mvc", "/code/routes"],
  },
  {
    slug: "testing",
    title: "The test directory is part of the app",
    lead: "Models, controllers, system tests, mailers, jobs. Rails ships a test stack the way it ships a router.",
    paragraphs: [
      "fixtures/ or FactoryBot. Capybara for the browser. Parallel tests when the suite gets heavy. CI is just bin/rails test with a database.",
      "A system test that clicks Publish is worth more than a mock that proves you mocked.",
    ],
    related: ["/ruby/testing", "/demo/controller"],
  },
  {
    slug: "security",
    title: "The boring security that ships",
    lead: "CSRF tokens, encrypted credentials, strong parameters, default headers, has_secure_password. Rails is opinionated about the attacks of 2005–2025.",
    paragraphs: [
      "permit is allowlisting. skip_forgery_protection is a confession. store the session in a cookie or a db, but do not invent a token scheme on a napkin.",
      "Brakeman and bundler-audit are neighbors, not a personality. Read the security guide when you touch auth.",
    ],
    related: ["/rails/controllers", "/architecture/secrets"],
  },
  {
    slug: "api",
    title: "API mode is still Rails",
    lead: "rails new --api drops views and browsers. You still have routes, Active Record, jobs, and a process. JSON is a format, not a new religion.",
    paragraphs: [
      "The same monolith can serve HTML on one subdomain and JSON on another. Separate apps are optional.",
      "Token auth, pagination, and serializers are where people wander off the omakase menu. Wander on purpose.",
    ],
    related: ["/rails/routing", "/architecture/deploy-split"],
  },
  {
    slug: "eight",
    title: "Rails 8 without a landlord",
    lead: "Solid Queue, Cache, and Cable plus Kamal 2 and Thruster. A new app can go to a VPS you own — no Redis tax, no PaaS, on day one.",
    paragraphs: [
      "Propshaft for assets. importmap or jsbundling if you need a build. SQLite is a serious default for small apps; Postgres when the data says so.",
      "This site is Next.js on Vercel on purpose. The Rails 8 story is the other machine in the room.",
    ],
    related: ["/deploy/kamal", "/rails/solid", "/architecture/tree"],
  },
];

export const railsChapters = draftsToChapters("rails", drafts);
