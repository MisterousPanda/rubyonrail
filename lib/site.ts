export const site = {
  name: "Ruby · Rails · Omarchy",
  tagline: "A homage to DHH — the beauty of Ruby, the architecture of Rails, and Omarchy on a T2 Mac.",
};

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const nav: NavItem[] = [
  { href: "/ruby", label: "Ruby" },
  { href: "/rails", label: "Rails" },
  { href: "/deploy", label: "Deploy" },
  {
    href: "/omarchy",
    label: "Omarchy",
    children: [
      { href: "/omarchy/cursor", label: "Cursor" },
      { href: "/omarchy/hermes", label: "Hermes" },
    ],
  },
];

export const chapters = [
  {
    href: "/ruby",
    kicker: "01",
    title: "The beauty of Ruby",
    blurb: "A language designed for programmer happiness — objects, blocks, and DSLs that read like prose.",
  },
  {
    href: "/rails",
    kicker: "02",
    title: "What Rails is",
    blurb: "Why use it: happiness, convention, omakase, one monolith, Hotwire, Rails 8 without a PaaS. Plus the architecture and the code.",
  },
  {
    href: "/deploy",
    kicker: "03",
    title: "Shipping Rails",
    blurb: "Can you deploy Rails on Vercel? No — not the monolith. Kamal, Hatchbox, Fly, Render, and why the process model matters.",
  },
  {
    href: "/omarchy",
    kicker: "04",
    title: "Omarchy",
    blurb: "DHH’s beautiful, fun, opinionated Arch + Hyprland Linux — especially sweet on a T2 Mac.",
  },
  {
    href: "/omarchy/cursor",
    kicker: "05",
    title: "Cursor on Omarchy",
    blurb: "Install Cursor from the Omarchy menu, match the theme, and let the desktop treat agents as first-class.",
  },
  {
    href: "/omarchy/hermes",
    kicker: "06",
    title: "Hermes on Omarchy",
    blurb: "Nous Hermes with an Omarchy skill — Hyprland, themes, and safety boundaries the agent actually understands.",
  },
];
