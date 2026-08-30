import type { Metadata } from "next";
import Link from "next/link";
import { NavCard } from "@/components/nav-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Omarchy",
  description:
    "DHH’s beautiful, fun, opinionated Arch Linux + Hyprland desktop — including T2 Mac support.",
};

export default function OmarchyPage() {
  return (
    <article>
      <PageHeader
        kicker="Chapter 04 · The desktop"
        title="Omarchy is Linux with taste."
        lede="An opinionated Arch + Hyprland environment by DHH and the Omacom circle. Not a generic distro splash screen — a finished desk: themes, a menu, terminals, and AI agents treated as first-class citizens."
      />

      <div className="prose-essay mt-14 max-w-3xl text-[17px] leading-8 text-ink/80">
        <p>
          Official home:{" "}
          <a className="underline decoration-teal underline-offset-3" href="https://omarchy.org">
            omarchy.org
          </a>
          . Source:{" "}
          <a
            className="underline decoration-teal underline-offset-3"
            href="https://github.com/basecamp/omarchy"
          >
            basecamp/omarchy
          </a>
          . The pitch is the same instinct as Rails: omakase. Hyprland for the
          compositor, a system menu on Super (Space), mise for toolchains, and
          defaults you can live in on day one.
        </p>
        <p>
          On a T2 Mac it is not a science project anymore. The installer
          detects Apple hardware, pulls the patched{" "}
          <code className="font-mono text-[14px] text-ruby">linux-t2</code>{" "}
          kernel, Broadcom firmware, T2 audio, and{" "}
          <code className="font-mono text-[14px] text-ruby">t2fanrd</code>. The
          Touch Bar gets Boot Camp-style kernel support. Intel Macs only —
          M-series is a different story. The machine that felt finished in 2019
          can feel new again.
        </p>
      </div>

      <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat k="Compositor" v="Hyprland (Wayland)" />
        <Stat k="Base" v="Arch Linux" />
        <Stat k="Menu" v="Super + Space" />
        <Stat k="Editors" v="Neovim default · Cursor optional" />
        <Stat k="Agents" v="Lazy-loaded CLIs via mise" />
        <Stat k="T2 Macs" v="linux-t2, audio, Wi-Fi, fans" />
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl tracking-tight">Subpages</h2>
        <p className="mt-3 max-w-2xl text-ink/65">
          Omarchy does not pick a single AI religion. Cursor is the graphical
          IDE path. Hermes is the agent that can learn the desktop as a skill.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <NavCard
            href="/omarchy/cursor"
            kicker="05"
            title="Cursor on Omarchy"
            blurb="Install from the Omarchy menu, match the theme, and run cloud agents from a Linux desk that already speaks AI."
          />
          <NavCard
            href="/omarchy/hermes"
            kicker="06"
            title="Hermes on Omarchy"
            blurb="Nous Hermes plus the Omarchy skill — Hyprland, themes, hooks, and the safety rails the desktop expects."
          />
        </div>
      </section>

      <p className="mt-12">
        <Link href="/omarchy/cursor" className="font-mono text-sm tracking-[0.14em] text-teal uppercase">
          Cursor on Omarchy →
        </Link>
      </p>
    </article>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-ink/12 bg-paper-2/50 p-5">
      <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
        {k}
      </p>
      <p className="mt-2 font-serif text-xl">{v}</p>
    </div>
  );
}
