import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Hermes on Omarchy",
  description:
    "Invite Nous Research’s Hermes onto Omarchy with a skill that maps Hyprland, themes, and safety — not a generic Arch box.",
};

export default function HermesOnOmarchyPage() {
  return (
    <article>
      <PageHeader
        kicker="Chapter 06 · Omarchy / Hermes"
        title="Hermes should not see a generic Arch box."
        lede="Nous Research’s Hermes agent is a harness you invite onto the desk — not a bundled default on the Omarchy ISO. The difference that matters is the skill: Omarchy is Hyprland, Walker, a menu, and files you should not casually rewrite."
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
          . Hermes fits that invite-and-wrap pattern. Treat it as a guest you
          seated, not a daemon the installer forced on you.
        </p>
        <p>
          The Omarchy skill — maintained with the desktop, adapted into Hermes’
          skill format — is the map. Hyprland under{" "}
          <code className="font-mono text-[14px] text-ruby">~/.config/hypr/</code>
          , themes, the shell and bar, plugins, hooks, terminals, and which
          paths are yours versus system-managed. Without it, Hermes will treat
          Omarchy like “some Arch install” and wander. With it, the agent can
          talk about the desk the way the menu already does.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-3xl tracking-tight text-ink">
          Skill versus generic Arch
        </h2>
        <p className="mt-4 max-w-3xl text-[17px] leading-8 text-ink/75">
          A generic Arch prompt is a blank canvas and a wiki. Omarchy is an
          omakase desk. The skill is how you refuse to let Hermes flatten one
          into the other.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Contrast
            kicker="Without the skill"
            title="Generic Arch"
            tone="warn"
            points={[
              "Sees pacman, a compositor, and a pile of dots — no Walker, no menu, no theme contract.",
              "May invent a second Hyprland story, or paste a wiki conf over Omarchy’s.",
              "May stand up a bar, plugin, or hook from scratch instead of the restart path the menu already uses.",
              "Cannot tell user configuration from system-managed files. That is how a desk gets broken.",
            ]}
          />
          <Contrast
            kicker="With the Omarchy skill"
            title="This desk"
            tone="safe"
            points={[
              "Hyprland lives under ~/.config/hypr/ and stays one compositor story.",
              "Theme changes stay inside Omarchy’s theme system — the desk and the apps should agree.",
              "Shell, bar, plugins, and hooks are edited with the restart path the menu already knows.",
              "Safety first: user dots are fair game; system-owned files are not casual rewrites.",
            ]}
          />
        </div>
      </section>

      <section
        className="mt-16 border border-ruby/25 bg-ruby/[0.04] p-6 sm:p-8"
        aria-labelledby="hermes-safety"
      >
        <p className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
          Safety is the feature
        </p>
        <h2
          id="hermes-safety"
          className="mt-3 font-serif text-3xl tracking-tight text-ink"
        >
          Plan first. Keep an undo.
        </h2>
        <p className="mt-4 max-w-3xl text-[17px] leading-8 text-ink/75">
          An agent that can edit Hyprland can also brick a session. The skill
          is not permission to write everything. It is a map of what not to
          touch. Stay in plan mode until you have read the diff. Prefer the
          menu for installs. Let Hermes edit user configuration — not
          system-managed files the ISO and updates own.
        </p>
        <ul className="mt-6 max-w-3xl space-y-3 text-[15px] leading-7 text-ink/80">
          <li>
            <strong className="text-ink">Plan before write.</strong> Read the
            proposed change. If you would not paste it by hand, do not let
            Hermes apply it.
          </li>
          <li>
            <strong className="text-ink">Undo is a command.</strong>{" "}
            <code className="font-mono text-[14px] text-ruby">
              omarchy reinstall configs
            </code>{" "}
            puts the desktop’s defaults back. Keep that in your pocket before
            you invite enthusiasm.
          </li>
          <li>
            <strong className="text-ink">System-managed stays closed.</strong>{" "}
            User dots under your home are the workspace. Files the desktop
            owns are not a sandbox.
          </li>
          <li>
            <strong className="text-ink">Menu for installs.</strong> Agents
            guess package names. The menu already knows the blessed path.
          </li>
        </ul>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="border border-ink/12 p-6">
          <h2 className="font-serif text-2xl">What the skill is for</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
            <li>Theme changes that stay inside Omarchy’s theme system</li>
            <li>Hyprland tweaks without inventing a second compositor story</li>
            <li>Bar / shell / plugin / hook edits with the restart path the menu uses</li>
            <li>A clear line between user configuration and system-managed files</li>
          </ul>
        </div>
        <div className="border border-ink/12 p-6">
          <h2 className="font-serif text-2xl">Models and the launcher</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
            <li>
              Local models: LM Studio or Ollama via{" "}
              <strong>Install → AI</strong>
            </li>
            <li>Pick a default agent under Setup → Defaults → Agent</li>
            <li>
              Then{" "}
              <code className="font-mono text-[12px] text-ruby">
                Super + Shift + Ctrl + A
              </code>{" "}
              opens that default
            </li>
            <li>
              Weights can be on-machine; the ISO still did not preinstall
              Hermes for you
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-10 max-w-3xl">
        <CodeBlock
          title="Invite Hermes the Omarchy way"
          language="bash"
          code={`# Wrap a new CLI like the other agents — lazy mise stub in ~/.local/bin
omarchy-mise-install hermes

# Or pick whichever agent you actually seated:
# Setup → Defaults → Agent

# Local models, when you want weights on this machine:
# Install → AI  →  LM Studio / Ollama

# Then launch the default you chose
omarchy default agent
# Super + Shift + Ctrl + A   →  default agent window
# a                          →  default agent in this terminal

# Skill guidance (experimental on every harness)
# Plan first. Do not let it rewrite system-managed files.
# Rollback with:
omarchy reinstall configs`}
        />
      </div>

      <p className="mt-12">
        <Link
          href="/omarchy/cursor"
          className="font-mono text-sm tracking-[0.14em] text-ink/50 uppercase"
        >
          ← Cursor on Omarchy
        </Link>
      </p>
    </article>
  );
}

function Contrast({
  kicker,
  title,
  tone,
  points,
}: {
  kicker: string;
  title: string;
  tone: "warn" | "safe";
  points: string[];
}) {
  const kickerClass =
    tone === "warn"
      ? "font-mono text-[11px] tracking-[0.2em] text-ruby uppercase"
      : "font-mono text-[11px] tracking-[0.2em] text-teal uppercase";

  return (
    <div className="border border-ink/12 p-6">
      <p className={kickerClass}>{kicker}</p>
      <h3 className="mt-2 font-serif text-2xl">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/70">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
