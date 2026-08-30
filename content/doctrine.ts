import { draftsToChapters, type ChapterDraft } from "@/lib/chapter";

const drafts: ChapterDraft[] = [
  {
    slug: "happiness",
    title: "Optimize for programmer happiness",
    kicker: "Pillar 1 · rubyonrails.org/doctrine",
    lead: "There would be no Rails without Ruby. The first pillar is Matz’s heresy: put the happiness of the programmer on a pedestal.",
    paragraphs: [
      "DHH calls the Rails version The Principle of The Bigger Smile — APIs designed for whatever would make him smile more. The Inflector mapping Person to people. Array#second through #fifth, and #forty_two for the trolling.",
      "Happiness is hard to measure in a micro-benchmark. It is obvious in a community that stayed because Tuesday morning felt better.",
    ],
    quote:
      "Optimizing for happiness is perhaps the most formative key to Ruby on Rails.",
    related: ["/ruby/history", "/rails"],
    aside: "Source: The Rails Doctrine, David Heinemeier Hansson — rubyonrails.org/doctrine",
  },
  {
    slug: "convention",
    title: "Convention over configuration",
    kicker: "Pillar 2",
    lead: "You are not a beautiful and unique snowflake. Give up vain individuality on the mundane decisions so you can spend taste on the product.",
    paragraphs: [
      "A Post talks to posts. app/models/post.rb is enough. resources :posts draws seven routes. You write the exception, not the skeleton.",
      "The payoff is not obedience. It is a shared map. A new person can open the app and guess where things live because a thousand other apps guessed the same.",
    ],
    code: {
      filename: "convention.rb",
      code: `# No map telling Post to use table "posts"
class Post < ApplicationRecord
  has_many :comments
end

# No XML listing every verb
resources :posts`,
    },
    related: ["/rails/mvc", "/architecture/tree"],
  },
  {
    slug: "omakase",
    title: "The menu is omakase",
    kicker: "Pillar 3",
    lead: "Rails is not a blank canvas and a pile of paint. Someone already chose the stack so you can cook the meal.",
    paragraphs: [
      "Router, ORM, mailer, jobs, cable, tests, generators — one curated menu. You can replace a dish. You should not start by replacing the kitchen.",
      "Omarchy makes the same bet for a Linux desk. This site keeps using that word because it is the doctrine, not a vibe.",
    ],
    related: ["/omarchy", "/rails/solid"],
  },
  {
    slug: "paradigms",
    title: "No one paradigm",
    kicker: "Pillar 4",
    lead: "Rails is not a purity cult. Objects, functional maps, procedural scripts, and a dash of metaprogramming sit in the same app.",
    paragraphs: [
      "Use a service object when the work is a scene, not a row. Use a PORO when Active Record would be a costume. Use a SQL view when the query is the product.",
      "The framework refuses to pick a single academic school and shame the rest. That refusal is a feature.",
    ],
    related: ["/architecture/monolith", "/ruby/enumerable"],
  },
  {
    slug: "beautiful-code",
    title: "Exalt beautiful code",
    kicker: "Pillar 5",
    lead: "Aesthetics are not a luxury. Ugly APIs tax every future morning. Rails treats how the code looks as part of how it works.",
    paragraphs: [
      "has_many :comments is beautiful because it is short and true. A four-file XML mapping for the same idea is true and ugly. The doctrine picks the first.",
      "Beautiful here does not mean clever. It means a stranger can read the controller on a bad day.",
    ],
    related: ["/code/posts-controller", "/ruby/dsl"],
  },
  {
    slug: "sharp-knives",
    title: "Provide sharp knives",
    kicker: "Pillar 6",
    lead: "Ruby hands you method_missing and open classes. Rails hands you concerns, callbacks, and metaprogramming. Adults get sharp tools.",
    paragraphs: [
      "You can cut yourself. That is the point of a knife. A language that hides every edge also hides every craft.",
      "The counterweight is convention and code review, not a compiler that treats you like a child. Use the knives. Do not juggle them in production callbacks.",
    ],
    related: ["/ruby/metaprogramming", "/rails/security"],
  },
  {
    slug: "integrated",
    title: "Value integrated systems",
    kicker: "Pillar 7",
    lead: "The majestolith. HTML, JSON, jobs, mail, and sockets in one application until you have a real reason to split.",
    paragraphs: [
      "Microservices as a default are a way to pay a distributed-systems tax before you have a product. Rails would rather you grow a modular monolith and extract later, on evidence.",
      "This is why Vercel’s Function model and Rails’ process model argue. An integrated system wants to stay up, enqueue work, and keep a socket — not boot per request.",
    ],
    related: ["/architecture/monolith", "/deploy/vercel", "/architecture/deploy-split"],
  },
  {
    slug: "progress",
    title: "Progress over stability",
    kicker: "Pillar 8",
    lead: "Rails will break your app to make the next decade kinder. The changelog is a conversation, not a museum label.",
    paragraphs: [
      "Autoloading, Zeitwerk, importmaps, Hotwire, Solid Queue — each one asked applications to move. The doctrine prefers a living framework to a frozen one that never surprises you and never helps you.",
      "Appraise upgrades as taste, not as betrayal. Stay current enough that the knives stay sharp.",
    ],
    related: ["/rails/eight", "/rails/hotwire"],
  },
  {
    slug: "big-tent",
    title: "Push up a big tent",
    kicker: "Pillar 9",
    lead: "There is no one true Rails stack beyond the defaults. People bring RSpec, extra gems, APIs, and opinions. The tent is supposed to hold them.",
    paragraphs: [
      "The omakase menu is a suggestion with gravity, not a loyalty oath. You can use Vue. You can use Sidekiq. You can deploy on Hatchbox instead of Kamal.",
      "What the tent does not include is pretending a serverless Function is the monolith. Honesty is also hospitality.",
    ],
    related: ["/deploy/hybrid", "/omarchy"],
  },
];

export const doctrineChapters = draftsToChapters("doctrine", drafts);
