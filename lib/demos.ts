export type Demo = {
  slug: string;
  title: string;
  lead: string;
  language: "ruby" | "html" | "erb" | "yaml" | "bash";
  starter: string;
  expected: string;
  hint: string;
};

export const demos: Demo[] = [
  {
    slug: "hello-ruby",
    title: "Hello, Ruby",
    lead: "Print, interpolate, and return a string. The playground evaluates a tiny subset of Ruby.",
    language: "ruby",
    starter: `name = "DHH"
puts "Hello, #{name}"
3.times { |i| puts i }
[1, 2, 3].map { |n| n * 2 }`,
    expected: `Hello, DHH
0
1
2
[2, 4, 6]`,
    hint: "Change the name. Change the map. Reset if you break it.",
  },
  {
    slug: "enumerable",
    title: "Enumerable as a habit",
    lead: "Filter, map, reduce — the three verbs that replace most loops.",
    language: "ruby",
    starter: `people = [
  { name: "David", role: "rails" },
  { name: "Yukihiro", role: "ruby" },
  { name: "DHH", role: "rails" }
]

people
  .select { |p| p[:role] == "rails" }
  .map { |p| p[:name] }
  .join(", ")`,
    expected: `"David, DHH"`,
    hint: "Try role == \"ruby\". Try map the roles instead.",
  },
  {
    slug: "routes",
    title: "Draw the map",
    lead: "A routes.rb sketch. The playground does not boot Rails — it shows the table you would get.",
    language: "ruby",
    starter: `Rails.application.routes.draw do
  root "home#index"
  resources :posts do
    resources :comments, only: [:create, :destroy]
  end
  get "up" => "rails/health#show", as: :rails_health_check
end`,
    expected: `GET    /                         home#index
GET    /posts                    posts#index
GET    /posts/new                posts#new
POST   /posts                    posts#create
GET    /posts/:id                posts#show
GET    /posts/:id/edit           posts#edit
PATCH  /posts/:id                posts#update
DELETE /posts/:id                posts#destroy
POST   /posts/:post_id/comments  comments#create
DELETE /posts/:post_id/comments/:id comments#destroy
GET    /up                       rails/health#show`,
    hint: "Add resources :authors. The preview table is illustrative, not a real router.",
  },
  {
    slug: "active-record",
    title: "Ask the database in English",
    lead: "A Post query chain. Imagine the SQL. Do not paste this into a Vercel Function and call it Rails.",
    language: "ruby",
    starter: `Post
  .published
  .where("created_at > ?", 1.week.ago)
  .includes(:author, :comments)
  .order(created_at: :desc)
  .limit(20)`,
    expected: `SELECT "posts".* FROM "posts"
WHERE "posts"."published" = TRUE
  AND (created_at > '2026-08-23 …')
ORDER BY "posts"."created_at" DESC
LIMIT 20

-- plus two more queries via includes, not N+1`,
    hint: "Add .where(featured: true). The SQL is a teaching sketch.",
  },
  {
    slug: "controller",
    title: "One action, three outcomes",
    lead: "Create a post. Success redirects. Failure re-renders. That is most of a controller.",
    language: "ruby",
    starter: `class PostsController < ApplicationController
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
    expected: `POST /posts  { post: { title: "Hello", body: "…" } }
→ 302 Location: /posts/1   (save succeeded)

POST /posts  { post: { title: "", body: "" } }
→ 422 render new.html.erb  (@post.errors full)`,
    hint: "Add authenticate before create. Add a Turbo stream response if you like fiction.",
  },
  {
    slug: "erb",
    title: "A view that is still HTML",
    lead: "ERB is HTML with pockets. The preview renders a static stand-in, not a real template engine.",
    language: "erb",
    starter: `<article class="post">
  <h1><%= @post.title %></h1>
  <p class="byline">
    <%= @post.author.name %> · <%= time_ago_in_words(@post.created_at) %>
  </p>
  <div class="body">
    <%= @post.body %>
  </div>
</article>`,
    expected: `<article class="post">
  <h1>Convention over configuration</h1>
  <p class="byline">DHH · about 2 hours ago</p>
  <div class="body">The framework should guess the obvious.</div>
</article>`,
    hint: "Change the heading tag. The preview is a postcard, not Rails.",
  },
  {
    slug: "hotwire",
    title: "Morph, do not redraw",
    lead: "A Turbo Frame form. Submit would morph the frame. Here you only see the HTML you would ship.",
    language: "erb",
    starter: `<%= turbo_frame_tag @comment do %>
  <%= form_with model: [@post, @comment] do |form| %>
    <%= form.text_area :body, placeholder: "Write a comment" %>
    <%= form.submit "Post" %>
  <% end %>
<% end %>`,
    expected: `[turbo-frame#comment_new]
  form POST /posts/1/comments
    textarea
    button Post

On success: frame morphs to the saved comment.
On failure: same frame, errors inline. No layout paint.`,
    hint: "This is the opposite of an SPA bundle. The playground cannot morph; Rails can.",
  },
  {
    slug: "job",
    title: "Work later",
    lead: "A Solid Queue job. Enqueue in the request. Run in another process. Not on Vercel.",
    language: "ruby",
    starter: `class WelcomeEmailJob < ApplicationJob
  queue_as :default

  def perform(user)
    UserMailer.welcome(user).deliver_now
  end
end

# in the controller
WelcomeEmailJob.perform_later(@user)`,
    expected: `INSERT INTO solid_queue_jobs …
Request returns 302.
Later: worker pops job, SMTP send, job marked finished.`,
    hint: "Change queue_as :mailers. Add retry_on TimeoutError.",
  },
  {
    slug: "kamal-vs-vercel",
    title: "Two platforms, two answers",
    lead: "A Kamal accessory versus a Vercel Function. Edit either side. Neither becomes the other.",
    language: "yaml",
    starter: `# kamal deploy.yml (sketch)
service: blog
image: you/blog
servers:
  web:
    hosts:
      - 1.2.3.4
  job:
    hosts:
      - 1.2.3.4
    cmd: bin/jobs
accessories:
  db:
    image: postgres:16

# vercel.json cannot express this`,
    expected: `Kamal:  docker compose, but for a VPS you own.
Vercel: one HTTP Function, then gone.

rails s  ≠  vercel dev
bin/jobs ≠  (no equivalent)`,
    hint: "This demo is a pamphlet. See /deploy and /deploy/vercel.",
  },
  {
    slug: "walker",
    title: "Walker versus the menu",
    lead: "Two Omarchy chords. Type a command. The playground only prints what Walker would filter.",
    language: "bash",
    starter: `# Super + Space  → Walker
# Super + Alt + Space → Omarchy Menu

query="cursor"`,
    expected: `Walker results for "cursor":
  cursor
  cursor-install (if you aliased it)
  … files / apps matching cursor

Omarchy Menu is a different overlay:
  Install → Editor → Cursor`,
    hint: "Change query to hermes or omarchy. This is not the real Walker binary.",
  },
  {
    slug: "migration",
    title: "Write history the database can replay",
    lead: "A Rails 8 migration. The playground prints the table you would have after db:migrate — it does not open Postgres.",
    language: "ruby",
    starter: `class CreatePosts < ActiveRecord::Migration[8.0]
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
    expected: `== CreatePosts: migrating =============================
-- create_table(:posts)
   -> 0.0123s
== CreatePosts: migrated (0.0124s) ====================

posts
  id           bigint PK
  title        varchar  NOT NULL
  body         text
  published    boolean  NOT NULL DEFAULT false
  author_id    bigint   NOT NULL → authors.id
  created_at   datetime NOT NULL
  updated_at   datetime NOT NULL`,
    hint: "Add t.string :slug. The table sketch will not change — this is a postcard, not Active Record.",
  },
  {
    slug: "stimulus",
    title: "A sprinkle of Stimulus",
    lead: "A clipboard controller. The preview is the HTML you would hang it on, not a webpack build.",
    language: "html",
    starter: `<div data-controller="clipboard">
  <input data-clipboard-target="source" value="has_many :comments" readonly>
  <button data-action="clipboard#copy">Copy</button>
</div>

<!-- app/javascript/controllers/clipboard_controller.js
import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  static targets = ["source"]
  copy() { navigator.clipboard.writeText(this.sourceTarget.value) }
}
-->`,
    expected: `[clipboard controller]
  input value="has_many :comments"
  button Copy  →  writes the input to the clipboard

No virtual DOM. No client-side router.
The server already rendered the HTML.`,
    hint: "Change the input value. Preview will show your markup; Stimulus will not actually boot here.",
  },
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
