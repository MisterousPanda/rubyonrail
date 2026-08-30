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
    blurb: "Convention over configuration. MVC, Active Record, Hotwire — the full-stack default that still ships product.",
  },
  {
    href: "/deploy",
    kicker: "03",
    title: "Shipping Rails",
    blurb: "Kamal, a VPS, Hatchbox, Fly, Render. And an honest answer: does Vercel host Ruby on Rails?",
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
