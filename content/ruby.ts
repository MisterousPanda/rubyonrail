import { draftsToChapters, type ChapterDraft } from "@/lib/chapter";

const drafts: ChapterDraft[] = [
  {
    slug: "objects",
    title: "Everything is an object",
    lead: "Integers answer messages. nil is an object. Classes are objects that spawn objects. Ruby does not split the world into primitives and real things.",
    paragraphs: [
      "Send a message, get an answer. 1.succ is not a special case hiding under the syntax. It is the same idea as user.save. The language asks you to talk to values.",
      "Even the absences participate. nil has methods. false has methods. You can reopen Fixnum in a console and the machine will let you, which is either a gift or a warning depending on the morning.",
    ],
    heading: "Talk to values",
    more: [
      "This ontology is why Rails can treat a row as an object without a translation layer that feels bolted on. Active Record is not a foreign dialect. It is Ruby applied to a table.",
    ],
    code: {
      filename: "objects.rb",
      code: `1.class          # => Integer
nil.class        # => NilClass
true.object_id
:hello.class     # => Symbol

class Integer
  def clap
    "#{self} 👏"
  end
end

puts 3.clap`,
    },
    related: ["/ruby/blocks", "/rails/active-record", "/demo/hello-ruby"],
  },
  {
    slug: "blocks",
    title: "Blocks are conversation",
    lead: "You do not write a for loop and hope the index stays honest. You hand a collection a thought, and it carries that thought through every element.",
    paragraphs: [
      "A block is an anonymous argument that looks like an aside. do … end or { }. yield hands control to the caller for a moment, then takes it back. That is enough to invent iterators, transactions, and DSLs.",
      "Procs and lambdas box the same idea so you can pass it around. The difference in return behavior matters the first time you put a lambda in a method and wonder where you went.",
    ],
    code: {
      filename: "blocks.rb",
      code: `def with_timing
  started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
  result = yield
  elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - started
  [result, elapsed]
end

value, seconds = with_timing { (1..1000).reduce(:+) }
puts "sum=#{value} in #{seconds.round(4)}s"`,
    },
    related: ["/ruby/enumerable", "/ruby/dsl", "/demo/enumerable"],
  },
  {
    slug: "symbols",
    title: "Symbols are names",
    lead: "A symbol is an interned name, not a string you keep reallocating. Hashes read like records because the keys are already vocabulary.",
    paragraphs: [
      ":published is the idea of published. \"published\" is a sentence you might print. Rails uses the first for options, associations, and statuses, and the second for text humans read.",
      "You can turn one into the other. You should not treat them as interchangeable in an API just because to_s exists. The type is the meaning.",
    ],
    code: {
      filename: "symbols.rb",
      code: `status = :published
Post.where(status:)

options = { locale: :en, format: :json }
options[:locale] # => :en

# A name, not a sentence
%i[draft published archived].include?(status)`,
    },
    related: ["/rails/active-record", "/demo/enumerable"],
  },
  {
    slug: "enumerable",
    title: "Enumerable as a habit",
    lead: "map, select, reduce — the three verbs that replace most loops. Enumerable is not a library you remember to import. It is how Ruby thinks.",
    paragraphs: [
      "Once a class includes Enumerable and implements each, it inherits a dialect: find, grep, group_by, tally, lazy. The habit is to ask the collection, not to walk an index.",
      "Rails relations pretend to be Enumerable until you force them, which is why you learn to keep work in SQL until you mean to bring rows home.",
    ],
    code: {
      filename: "enumerable.rb",
      code: `names = %w[DHH Matz tenderlove]
greetings = names.map { |name| "hello, #{name}" }

(1..7).select(&:odd?).reduce(0, :+)
# => 16

{ city: "Copenhagen", craft: "Rails" }.each do |key, value|
  puts "#{key} is #{value}"
end`,
    },
    related: ["/demo/enumerable", "/ruby/blocks", "/rails/active-record"],
    aside: "Try the same idea in the Replit-style sandbox: /demo/enumerable.",
  },
  {
    slug: "modules",
    title: "Modules are shared vocabulary",
    lead: "A module is a bag of methods you can include, prepend, or extend. Namespaces and mixins are the same object wearing two hats.",
    paragraphs: [
      "include mixes instance methods. extend mixes on the singleton. prepend puts you in front of the class so you can wrap a method and call super. Concerns in Rails are modules with a little ceremony.",
      "When every model includes the same ten concerns, you have reinvented a god object by committee. Use a module when the vocabulary is real.",
    ],
    code: {
      filename: "modules.rb",
      code: `module Publishable
  def publish
    update!(status: :published, published_at: Time.current)
  end
end

class Post
  include Publishable
end

Post.new.publish`,
    },
    related: ["/ruby/classes", "/rails/active-record"],
  },
  {
    slug: "classes",
    title: "Classes you can reopen",
    lead: "A class is an object. You can reopen it. You can subclass it. You can ask it to class_eval a string you should not have built.",
    paragraphs: [
      "Inheritance in Rails is a spine: ApplicationRecord, ApplicationController, ApplicationJob. The application class is the place for the house rules.",
      "Open classes let a gem add minutes_ago to Numeric. They also let a gem collide with another gem. The knife is sharp on purpose.",
    ],
    code: {
      filename: "classes.rb",
      code: `class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def self.[](id)
    find(id)
  end
end

Post[42] # => the post, or RecordNotFound`,
    },
    related: ["/ruby/metaprogramming", "/doctrine/sharp-knives"],
  },
  {
    slug: "dsl",
    title: "A language inside the language",
    lead: "has_many :comments works because Ruby lets a library grow a dialect without leaving the file. DSLs are just methods with good names and a block.",
    paragraphs: [
      "instance_eval changes what self is for the duration of a block. That is how routes.draw, a factory, and a migration all feel like configuration files while remaining Ruby.",
      "A good DSL reads like speech and compiles to ordinary objects. A bad DSL hides control flow until Saturday night.",
    ],
    code: {
      filename: "dsl.rb",
      code: `class Recipe
  def self.ingredient(name, &)
    define_method(name, &)
  end

  ingredient :greeting do |who|
    "A warm plate for #{who}."
  end
end

puts Recipe.new.greeting("the T2 Mac")`,
    },
    related: ["/rails/routing", "/ruby/metaprogramming", "/demo/routes"],
  },
  {
    slug: "metaprogramming",
    title: "Metaprogramming, used sparingly",
    lead: "define_method, method_missing, class_eval — the tools that make Rails feel magical. Magic is just code that wrote code.",
    paragraphs: [
      "method_missing is how Active Record turns .published into a scope you never declared, until it is not, and you get a NoMethodError two layers down.",
      "Prefer define_method at load time over method_missing at call time. Prefer an explicit API over a ghost. Rails itself has been walking this direction for years.",
    ],
    code: {
      filename: "meta.rb",
      code: `module StatusQuery
  STATUSES = %i[draft published archived].freeze

  def self.included(base)
    STATUSES.each do |status|
      base.define_singleton_method(status) { where(status:) }
    end
  end
end

class Post < ApplicationRecord
  include StatusQuery
end

Post.published`,
    },
    related: ["/ruby/dsl", "/doctrine/sharp-knives"],
  },
  {
    slug: "yjit",
    title: "YARV, then YJIT",
    lead: "MRI still walks bytecode. YJIT sits beside it and turns hot paths into machine code. Ruby got faster without becoming a different language.",
    paragraphs: [
      "Turn it on with --yjit or RUBY_YJIT_ENABLE=1. Rails 7+ will enable it in production when the Ruby is new enough. You do not rewrite the app.",
      "YJIT likes warm processes. That is another reason a long-lived Puma on a VPS smiles more than a cold Function that boots MRI per request.",
    ],
    code: {
      filename: "yjit.rb",
      language: "bash",
      code: `# MRI 3.3+
RUBY_YJIT_ENABLE=1 bin/rails server

# or in config
# Rails 7.2+ enables YJIT in production by default
# when the interpreter supports it.`,
    },
    related: ["/architecture/boot", "/deploy/vercel"],
    aside: "A Vercel Ruby Function can run MRI. It still is not rails s, and it will not keep YJIT warm the way a Puma worker does.",
  },
  {
    slug: "history",
    title: "From 1995 to a Tuesday",
    lead: "Matz released Ruby in 1995. Rails appeared in 2004. The through-line is programmer happiness as a design constraint, not a slogan on a sticker.",
    paragraphs: [
      "Ruby came from Japan with Perl’s pragmatism, Smalltalk’s objects, and a refusal to treat the programmer as a liability. Rails took that language and applied it to the boring web — forms, tables, emails — until the boring web felt like literature.",
      "The history that matters for this site is not a timeline of version numbers. It is that both projects kept choosing taste when the industry asked for ceremony.",
    ],
    list: [
      "1995 — Ruby public",
      "2004 — Rails extracted from Basecamp",
      "2005 — Rails 1.0",
      "2016 — Rails 5, Cable, API mode",
      "2021 — Hotwire as the default front-end bet",
      "2024 — Rails 8, Solid Queue/Cache/Cable, Kamal 2",
    ],
    related: ["/doctrine/happiness", "/rails/eight"],
  },
  {
    slug: "gems",
    title: "Gems, Bundler, the load path",
    lead: "A gem is a packaged library. Bundler pins the graph. require is still just Ruby finding a file.",
    paragraphs: [
      "Gemfile declares intent. Gemfile.lock declares the world. You commit the lock so Tuesday’s deploy is the same as Tuesday’s laptop.",
      "In Rails, bundler/setup runs from config/boot.rb before the application class exists. That order is the architecture.",
    ],
    code: {
      filename: "Gemfile",
      language: "ruby",
      code: `source "https://rubygems.org"

gem "rails", "~> 8.0"
gem "propshaft"
gem "pg"
gem "puma"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"
gem "kamal", require: false
gem "thruster", require: false`,
    },
    related: ["/code/gemfile", "/architecture/bundler"],
  },
  {
    slug: "testing",
    title: "Tests that read like speech",
    lead: "Minitest in the box. RSpec if you prefer a dialect. Either way, Ruby lets an assertion look like a sentence.",
    paragraphs: [
      "Rails fixtures or factories, system tests in a browser, jobs tested by performing them. The framework ships a test directory the way it ships a router.",
      "A test that only mirrors the implementation is a second copy of the bug. Test the promise: the post is published, the mail is enqueued, the visitor sees the title.",
    ],
    code: {
      filename: "test/models/post_test.rb",
      code: `require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "publish stamps the time" do
    post = posts(:draft)
    post.publish
    assert post.published?
    assert_not_nil post.published_at
  end
end`,
    },
    related: ["/rails/testing", "/demo/controller"],
  },
];

export const rubyChapters = draftsToChapters("ruby", drafts);
