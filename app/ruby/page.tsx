import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "The beauty of Ruby",
  description:
    "Why Ruby feels like literature: objects everywhere, blocks, symbols, and DSLs that read like speech.",
};

export default function RubyPage() {
  return (
    <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        kicker="Chapter 01 · The language"
        title="Ruby is a love letter to the programmer."
        lede="Yukihiro Matsumoto designed Ruby so the person writing the program would enjoy the day. That single bet — happiness over ceremony — is why Rails could exist, and why the code still looks like someone meant it."
      />

      <div className="prose-essay mt-14 grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-2xl text-[17px] leading-8 text-ink/80">
          <p>
            Everything is an object. Integers answer messages.{" "}
            <code className="font-mono text-[14px] text-ruby">nil</code> is an
            object. Classes are objects that spawn objects. The language does
            not split the world into “primitives over here, real things over
            there.” It asks you to talk to values.
          </p>
          <p>
            Blocks turn iteration into a conversation. You do not write a{" "}
            <code className="font-mono text-[14px] text-ruby">for</code> loop
            and hope the index stays honest. You hand a collection a thought,
            and it carries that thought through every element. Enumerable is
            not a library you remember to import. It is how Ruby thinks.
          </p>
          <p>
            Symbols are names, not strings you keep reallocating. Hashes read
            like records. Open classes and modules let a domain language grow
            in place — which is how Rails can say{" "}
            <code className="font-mono text-[14px] text-ruby">
              has_many :articles
            </code>{" "}
            and mean it.
          </p>
          <p>
            The beauty is not cleverness. It is readability as a moral
            position. Ruby would rather be obvious on Tuesday morning than
            impressive in a conference talk. That is the same instinct that
            later became Omarchy: pick a taste, ship the default, let people
            make things.
          </p>
        </div>
        <aside className="space-y-4">
          <Fact label="Author" value="Yukihiro “Matz” Matsumoto" />
          <Fact label="First public" value="1995" />
          <Fact label="North star" value="Programmer happiness" />
          <Fact label="License" value="Open source from the start" />
          <Fact label="Ontology" value="Everything is an object" />
          <Fact label="VM" value="YARV, then YJIT" />
          <Fact label="Runtime" value="MRI, YJIT, and friends" />
          <Fact label="Spirit" value="Objects, blocks, DSLs" />
        </aside>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <CodeBlock
          title="enumerable.rb"
          code={`names = %w[DHH Matz tenderlove]
greetings = names.map { |name| "hello, #{name}" }

(1..7).select(&:odd?).reduce(0, :+)
# => 16

{ city: "Copenhagen", craft: "Rails" }.each do |key, value|
  puts "#{key} is #{value}"
end`}
        />
        <CodeBlock
          title="dsl.rb"
          code={`class Recipe
  def self.ingredient(name, &)
    define_method(name, &)
  end

  ingredient :greeting do |who|
    "A warm plate for #{who}."
  end
end

puts Recipe.new.greeting("the T2 Mac")
# => A warm plate for the T2 Mac.`}
        />
        <CodeBlock
          title="letter.rb"
          code={`class Letter
  def to(name)
    @name = name
    self
  end

  def write
    yield @name
  end
end

note = Letter.new.to("the next reader")
puts note.write { |who| "Hello, #{who}. Stay curious." }
# => Hello, the next reader. Stay curious.`}
        />
      </div>

      <section className="mt-16 border border-ink/10 bg-paper-2/50 p-8 sm:p-10">
        <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
          Why this language made Rails possible
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          A framework can sound like speech only if the language already does.
        </h2>
        <div className="prose-essay mt-6 max-w-3xl text-[17px] leading-8 text-ink/80">
          <p>
            Rails did not invent kindness. It inherited a language that treats
            method names as sentences and blocks as asides.{" "}
            <code className="font-mono text-[14px] text-ruby">
              has_many :comments
            </code>
            ,{" "}
            <code className="font-mono text-[14px] text-ruby">
              validates :title, presence: true
            </code>
            ,{" "}
            <code className="font-mono text-[14px] text-ruby">
              resources :articles
            </code>{" "}
            — those lines work because Ruby lets a library grow a dialect
            without leaving the file. Open classes, symbols, and{" "}
            <code className="font-mono text-[14px] text-ruby">yield</code>{" "}
            turned configuration into conversation.
          </p>
          <p>
            Matz optimized for the person at the keyboard. DHH optimized for
            the person shipping the product. Same bet, next chapter: a default
            so complete you can spend taste on the work, not the glue.
          </p>
        </div>
        <p className="mt-8">
          <Link
            href="/rails"
            className="font-mono text-sm tracking-[0.14em] text-teal uppercase"
          >
            Next: The craft of Rails →
          </Link>
        </p>
      </section>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-ink/10 py-3">
      <dt className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-serif text-xl">{value}</dd>
    </div>
  );
}
