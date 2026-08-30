import { runRubyLite } from "@/lib/ruby-lite";
import type { Demo } from "@/lib/demos";

export type DemoRun = {
  stdout: string;
  html?: string;
  note?: string;
};

function previewDoc(inner: string) {
  return `<!doctype html><html><head><style>
    body { font-family: ui-serif, Georgia, serif; margin: 1.25rem; color: #16120e; background: #f3ecdf; }
    h1 { font-size: 1.6rem; margin: 0 0 .5rem; }
    .byline, .post .byline { color: #0f6b5c; font-size: .9rem; }
    .post { border: 1px solid #16120e22; padding: 1rem 1.1rem; }
    input, textarea, button { font: inherit; }
    button { background: #b42318; color: #f3ecdf; border: 0; padding: .35rem .7rem; }
  </style></head><body>${inner}</body></html>`;
}

function asPreviewHtml(demo: Demo, code: string, unchanged: boolean) {
  if (demo.language === "erb" || demo.language === "html") {
    if (unchanged && demo.expected.includes("<")) return previewDoc(demo.expected);
    const stripped = code
      .replace(/<%[\s\S]*?%>/g, "")
      .replace(/<!--[\s\S]*?-->/g, "");
    return previewDoc(stripped || "<p>Empty preview.</p>");
  }
  return undefined;
}

export function runDemo(demo: Demo, code: string): DemoRun {
  const unchanged = code.trim() === demo.starter.trim();

  if (demo.language === "ruby" && (demo.slug === "hello-ruby" || demo.slug === "enumerable")) {
    const lite = runRubyLite(code);
    if (lite.ok && lite.stdout.trim()) {
      return {
        stdout: lite.stdout,
        note: unchanged
          ? undefined
          : "Ran in a tiny in-browser subset of Ruby. Not MRI.",
      };
    }
  }

  const html = asPreviewHtml(demo, code, unchanged);

  if (unchanged) {
    return { stdout: demo.expected, html };
  }

  return {
    stdout: demo.expected,
    html,
    note: "This is a teaching sandbox — not MRI, and not a Rails boot. Showing the reference run for the starter. Your edits stay in the editor.",
  };
}
