import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Hermes on Omarchy",
  description:
    "Run Nous Hermes on Omarchy with a skill that understands Hyprland, themes, and safety boundaries.",
};

export default function HermesOnOmarchyPage() {
  return (
    <article>
      <PageHeader
        kicker="Chapter 06 · Omarchy / Hermes"
        title="Hermes should not see a generic Arch box."
        lede="Nous Research’s Hermes agent is another harness you can run on the same desk. The difference that matters is the skill: Omarchy is Hyprland, Walker, a menu, and files you should not casually rewrite."
      />

      <div className="prose-essay mt-10 max-w-3xl text-[17px] leading-8 text-ink/80">
        <p>
          Omarchy’s AI chapter is explicit: every major coding-agent CLI is a
          lazy mise stub in{" "}
          <code className="font-mono text-[14px] text-ruby">~/.local/bin/</code>
          . Nothing downloads until you type the name. Extra CLIs wrap the same
          way with{" "}
          <code className="font-mono text-[14px] text-ruby">
            omarchy-mise-install
          </code>
          . Hermes fits that pattern — an agent you invite, not a daemon the
          ISO forced on you.
        </p>
        <p>
          The Omarchy skill (maintained with the desktop, adapted into Hermes’
          skill format) teaches the agent the real map: Hyprland under{" "}
          <code className="font-mono text-[14px] text-ruby">~/.config/hypr/</code>
          , themes, the shell/bar, plugins, hooks, terminals, and which
          commands are user configuration versus system-managed. Without it,
          Hermes will treat Omarchy like “some Arch install” and wander.
        </p>
      </div>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="border border-ink/12 p-6">
          <h2 className="font-serif text-2xl">What the skill is for</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
            <li>Theme changes that stay inside Omarchy’s theme system</li>
            <li>Hyprland tweaks without inventing a second compositor story</li>
            <li>Bar / shell / plugin edits with the restart path the menu uses</li>
            <li>Safety: do not casually overwrite system-owned files</li>
          </ul>
        </div>
        <div className="border border-ink/12 p-6">
          <h2 className="font-serif text-2xl">How to stay safe</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
            <li>Plan mode first — read the diff before the write</li>
            <li>
              Keep{" "}
              <code className="font-mono text-[12px] text-ruby">
                omarchy reinstall configs
              </code>{" "}
              as the undo
            </li>
            <li>Prefer the menu for installs; let the agent edit user dots</li>
            <li>
              Local models (LM Studio / Ollama) if you want Hermes-class weights
              on-machine
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-10 max-w-3xl">
        <CodeBlock
          title="Invite Hermes the Omarchy way"
          language="bash"
          code={`# Wrap a new CLI like the bundled agents
omarchy-mise-install hermes

# Or pick a default from the menu:
# Setup → Defaults → Agent

# Then launch
omarchy default agent
# Super + Shift + Ctrl + A   →  default agent window
# a                          →  default agent in this terminal

# Skill guidance (experimental on every harness)
# Plan first. Rollback with:
omarchy reinstall configs`}
        />
      </div>

      <p className="mt-12">
        <Link href="/omarchy/cursor" className="font-mono text-sm tracking-[0.14em] text-ink/50 uppercase">
          ← Cursor on Omarchy
        </Link>
      </p>
    </article>
  );
}
