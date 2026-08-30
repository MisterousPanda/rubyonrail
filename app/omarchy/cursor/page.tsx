import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Cursor on Omarchy",
  description:
    "Install Cursor on Omarchy Linux, match themes, and use Omarchy’s first-class AI agent desktop.",
};

export default function CursorOnOmarchyPage() {
  return (
    <article>
      <PageHeader
        kicker="Chapter 05 · Omarchy / Cursor"
        title="Cursor belongs on this desk."
        lede="Omarchy ships Neovim as the default editor. When you want the Cursor you already think in — the one that wrote this site — the menu already knows the name."
      />

      <div className="prose-essay mt-10 max-w-3xl text-[17px] leading-8 text-ink/80">
        <p>
          Open the Omarchy menu with{" "}
          <code className="font-mono text-[14px] text-ruby">Super + Space</code>{" "}
          (or Super + Alt + Space, depending on your generation of bindings).
          Walk <strong>Install → Editor → Cursor</strong>. Theme matching is
          offered for Cursor the same way it is for VS Code, Zed, and Helix.
          Set the system default under{" "}
          <strong>Setup → Defaults → Editor</strong>.
        </p>
        <p>
          That is the blessed path. Community AppImage wrappers exist if you
          want a side install, and Wayland/Electron has the usual footnotes
          (slow first paint on some GPUs;{" "}
          <code className="font-mono text-[14px] text-ruby">--use-gl=egl</code>{" "}
          is the fix people reach for). Prefer the menu so updates and theming
          stay inside Omarchy.
        </p>
      </div>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        <Step n="01" t="Install" d="Menu → Install → Editor → Cursor. Let Omarchy place the desktop entry." />
        <Step n="02" t="Theme" d="Switch an Omarchy theme. Cursor is on the matching list — the desk and the IDE should agree." />
        <Step n="03" t="Agent" d="Pick a default CLI agent, then Super + Shift + Ctrl + A. Cursor remains the editor; the panel tracks usage." />
      </section>

      <section className="mt-16 max-w-3xl text-[17px] leading-8 text-ink/80">
        <h2 className="font-serif text-3xl tracking-tight text-ink">
          The Omarchy skill in Cursor
        </h2>
        <p className="mt-5">
          Omarchy ships a skill for tailoring the system — Hyprland, the bar,
          a new theme. It is symlinked into the usual skill directories so
          Claude Code, Codex, Pi, and generic{" "}
          <code className="font-mono text-[14px] text-ruby">~/.agents/skills</code>{" "}
          harnesses pick it up. Cursor can take the same skill when you add it
          to the project or user skills path.
        </p>
        <p className="mt-5">
          Treat it as experimental. Plan mode first. Keep{" "}
          <code className="font-mono text-[14px] text-ruby">
            omarchy reinstall configs
          </code>{" "}
          in your pocket if an agent gets enthusiastic about your dots.
        </p>
      </section>

      <div className="mt-10 max-w-3xl">
        <CodeBlock
          title="Add the Omarchy skill (Cursor)"
          language="bash"
          code={`# From a project, when you want the published skill locally
npx skills add https://github.com/basecamp/omarchy --skill omarchy

# Official install path stays the menu:
# Super + Space  →  Install  →  Editor  →  Cursor`}
        />
      </div>

      <p className="mt-12 flex flex-wrap gap-6">
        <Link href="/omarchy" className="font-mono text-sm tracking-[0.14em] text-ink/50 uppercase">
          ← Omarchy
        </Link>
        <Link href="/omarchy/hermes" className="font-mono text-sm tracking-[0.14em] text-teal uppercase">
          Hermes on Omarchy →
        </Link>
      </p>
    </article>
  );
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="border border-ink/12 p-5">
      <p className="font-mono text-[11px] tracking-[0.2em] text-ruby uppercase">{n}</p>
      <h3 className="mt-2 font-serif text-2xl">{t}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{d}</p>
    </div>
  );
}
