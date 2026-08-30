import type { Metadata } from "next";
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
      </div>
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
