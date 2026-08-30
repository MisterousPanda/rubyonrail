import { draftsToChapters, type ChapterDraft } from "@/lib/chapter";

const drafts: ChapterDraft[] = [
  {
    slug: "walker",
    title: "Walker is Super + Space",
    lead: "Walker is the app launcher. Super + Space. Type a name, filter the desk, launch. It is not the Omarchy Menu.",
    paragraphs: [
      "People collapse “the menu” into one chord. On Omarchy they are two overlays. Walker finds apps, files, and commands you already have. The Omarchy Menu is where you install and configure the desk.",
      "If you want Cursor, Walker will launch it after it exists. The install path is still Install → Editor → Cursor in the other overlay.",
    ],
    aside:
      "Do not invent extra official keybinds. Super + Space is Walker. Super + Alt + Space is the Omarchy Menu. Default CLI agent: Super + Shift + Ctrl + A.",
    related: ["/omarchy/menu", "/demo/walker", "/omarchy/cursor"],
  },
  {
    slug: "menu",
    title: "The Omarchy Menu",
    lead: "Super + Alt + Space. Install an editor, pick a theme, set a default agent. A finished desk, not a wiki of keybinds.",
    paragraphs: [
      "This is the omakase move. The menu is how Omarchy ships taste — packages, appearances, and agent defaults — without sending you to a forum thread.",
      "Cursor lives under Install → Editor. Hermes does not live there as an ISO default. Bring Hermes if you want it; do not expect the menu to pretend it was bundled.",
    ],
    related: ["/omarchy/cursor", "/omarchy/hermes", "/omarchy/themes"],
  },
  {
    slug: "t2",
    title: "A T2 Mac is still a computer",
    lead: "Late Intel, T2 chip, Touch Bar. linux-t2, Broadcom, audio, t2fanrd. Intel only — not Apple silicon.",
    paragraphs: [
      "Apple moved on. The chassis did not stop being a good keyboard attached to enough CPU. What it needed was a kernel that treated the T2 as hardware instead of folklore, and a desktop that had already decided what a computer is for.",
      "Omarchy on that machine is not a restoration project. It is a place to write. Broadcom wifi, audio routing, and fans are the unglamorous half of “it works.”",
    ],
    list: [
      "Kernel flavor: linux-t2 (Intel T2 Macs)",
      "Wifi: Broadcom, not a mystery dongle as the first plan",
      "Fans: t2fanrd or the current Omarchy equivalent",
      "Not M1/M2/M3 — different world, different ISO story",
    ],
    related: ["/omarchy", "/omarchy/hyprland"],
  },
  {
    slug: "hyprland",
    title: "Hyprland is the glass",
    lead: "Wayland, tiled, and fast. Omarchy does not ask you to assemble a compositor, a bar, and a wallpaper script.",
    paragraphs: [
      "Hyprland is the compositor. The rest of the desk — Walker, the menu, themes, terminals — hangs on it. You can learn every bind. You can also live in the defaults and ship work.",
      "Tiling is not an aesthetic tax. It is a way to keep a browser, a terminal, and an editor in a conversation without stacking unread windows.",
    ],
    related: ["/omarchy/themes", "/omarchy/walker"],
  },
  {
    slug: "agents",
    title: "Agents as first-class, lazy citizens",
    lead: "Claude, Codex, and the rest arrive as lazy mise stubs. Nothing downloads until you invite it. The default CLI agent chord is Super + Shift + Ctrl + A.",
    paragraphs: [
      "OpenCode on c and Claude Code on cx are common lazy launchers people add. They are not a secret ISO religion. Hermes is bring-your-own.",
      "The desktop treats an agent like a terminal: something you can keybind, theme, and ignore. That is the opposite of a chat tab you forgot existed.",
    ],
    related: ["/omarchy/cursor", "/omarchy/hermes", "/omarchy/menu"],
  },
  {
    slug: "themes",
    title: "A theme is a room",
    lead: "Switch once and the compositor, the menu, the terminal, and the optional IDEs are supposed to agree — Cursor included, when you install it.",
    paragraphs: [
      "A wallpaper is not a theme. Omarchy’s bet is that the whole desk shares a taste so you stop tuning pixels and start typing.",
      "If Cursor looks like a tourist after a theme change, match it. The point of omakase is agreement, not a collection of competing skins.",
    ],
    related: ["/omarchy/cursor", "/omarchy/menu"],
  },
];

export const omarchyChapters = draftsToChapters("omarchy", drafts);
