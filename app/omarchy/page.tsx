import type { Metadata } from "next";
import Link from "next/link";
import { NavCard } from "@/components/nav-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Omarchy",
  description:
    "DHH’s beautiful, fun, opinionated Arch Linux + Hyprland desktop — including T2 Mac support.",
};

const anatomy = [
  {
    name: "Hyprland",
    kicker: "Compositor",
    detail:
      "Wayland, tiled, and fast. Omarchy does not ask you to assemble a compositor, a bar, and a wallpaper script. Hyprland is the glass — the rest of the desk is already hung on it.",
  },
  {
    name: "The menu",
    kicker: "Super + Alt + Space",
    detail:
      "The omakase move. Super + Space is Walker, the app launcher. Super + Alt + Space is the Omarchy Menu: install an editor, pick a theme, set a default agent. You live in a finished desk, not a wiki of keybinds.",
  },
  {
    name: "Terminals",
    kicker: "The working surface",
    detail:
      "A terminal is not an afterthought. It is where mise hands you a toolchain, where Neovim opens by default, and where an agent CLI appears the first time you type its name.",
  },
  {
    name: "Themes",
    kicker: "One taste, everywhere",
    detail:
      "A theme is a room, not a wallpaper. Switch once and the compositor, the menu, the terminal, and the optional IDEs are supposed to agree — Cursor included, when you install it.",
  },
  {
    name: "Agents",
    kicker: "First-class, lazy",
    detail:
      "Claude, Codex, and the rest arrive as lazy mise stubs. Nothing downloads until you invite it. The desktop treats agents as citizens, not browser tabs you remember to open.",
  },
];

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
          compositor, Walker on Super + Space, the Omarchy Menu on Super +
          Alt + Space, mise for toolchains, Neovim as the default editor, and
          defaults you can live in on day one. Manual:{" "}
          <a
            className="underline decoration-teal underline-offset-3"
            href="https://learn.omacom.io/2/the-omarchy-manual"
          >
            learn.omacom.io
          </a>
          .
        </p>
        <p>
          This page is written from that desk — specifically from a T2 Mac
          that Omarchy made feel finished again. The homage is unofficial. The
          machine is not.
        </p>
      </div>

      <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat k="Compositor" v="Hyprland (Wayland)" />
        <Stat k="Base" v="Arch Linux" />
        <Stat k="Menu" v="Super + Alt + Space" />
        <Stat k="Launcher" v="Walker · Super + Space" />
        <Stat k="Editors" v="Neovim default · Cursor optional" />
        <Stat k="Agents" v="Lazy-loaded CLIs via mise" />
        <Stat k="T2 Macs" v="linux-t2, audio, Wi-Fi, fans" />
      </section>

      <section className="mt-16" aria-labelledby="desk-anatomy-heading">
        <h2 id="desk-anatomy-heading" className="font-serif text-3xl tracking-tight">
          Desk anatomy
        </h2>
        <p className="mt-3 max-w-2xl text-ink/65">
          Five pieces you actually touch. The ISO is Arch. The feeling is a
          room someone already arranged.
        </p>
        <ol className="mt-8 grid border border-ink/12 sm:grid-cols-2 lg:grid-cols-3">
          {anatomy.map((piece, index) => (
            <li
              key={piece.name}
              className="border-ink/12 p-6 border-b last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0 lg:last:col-span-2"
            >
              <span className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
                {String(index + 1).padStart(2, "0")} · {piece.kicker}
              </span>
              <h3 className="mt-3 font-serif text-2xl">{piece.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {piece.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="prose-essay mt-16 max-w-3xl text-[17px] leading-8 text-ink/80">
        <h2 className="font-serif text-3xl tracking-tight text-ink">
          A T2 Mac, loved on purpose
        </h2>
        <p className="mt-5">
          On a T2 Mac it is not a science project anymore. The installer
          detects Apple hardware, pulls the patched{" "}
          <code className="font-mono text-[14px] text-ruby">linux-t2</code>{" "}
          kernel, Broadcom firmware, T2 audio, and{" "}
          <code className="font-mono text-[14px] text-ruby">t2fanrd</code>. The
          Touch Bar gets Boot Camp-style kernel support. Intel Macs only —
          M-series is not directly supported, and that is the honest line.
          The machine that felt finished in 2019 can feel new again.
        </p>
        <p>
          Wi-Fi that works. Fans that listen. Sound that is not a forum
          thread. That is why this homage is typed here: Omarchy did not
          merely boot on T2 silicon. It made the aluminum feel like a
          workstation again — Hyprland on the glass, the menu a chord away,
          an agent a keystroke away.
        </p>
        <p>
          37signals is moving Ops and Ruby teams onto Omarchy across hardware
          refresh cycles — not a claim that every desk already switched. The
          same omakase bet, aimed at the machine you sit down at.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl tracking-tight">Two ways to think</h2>
        <p className="mt-3 max-w-2xl text-ink/65">
          Omarchy does not pick a single AI religion. Cursor is the graphical
          IDE path. Hermes is a bring-your-own agent that can learn the desk
          as a skill — not a bundled ISO default.
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
