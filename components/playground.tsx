"use client";

import Link from "next/link";
import { useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import type { Demo } from "@/lib/demos";
import { runDemo } from "@/lib/run-demo";

type PlaygroundProps = {
  demo: Demo;
  catalog: { slug: string; title: string }[];
};

export function Playground({ demo, catalog }: PlaygroundProps) {
  const [code, setCode] = useState(demo.starter);
  const [ran, setRan] = useState<ReturnType<typeof runDemo> | null>(null);
  const [tab, setTab] = useState<"console" | "preview">("console");
  const dirty = code !== demo.starter;
  const lineCount = useMemo(() => code.split("\n").length, [code]);

  function run() {
    const result = runDemo(demo, code);
    setRan(result);
    if (result.html) setTab("preview");
    else setTab("console");
  }

  function reset() {
    setCode(demo.starter);
    setRan(null);
    setTab("console");
  }

  async function copy() {
    await navigator.clipboard.writeText(code);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      run();
    }
  }

  return (
    <div className="border border-ink/15 bg-ink text-paper shadow-[0_24px_60px_-28px_rgba(22,18,14,0.55)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 px-4 py-2.5">
        <p className="font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase">
          Replit-style sandbox · {demo.language}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={run}
            className="bg-ruby px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-paper uppercase"
          >
            Run
          </button>
          <button
            type="button"
            onClick={reset}
            className="border border-paper/20 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-paper/80 uppercase"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => void copy()}
            className="border border-paper/20 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-paper/80 uppercase"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)]">
        <nav
          aria-label="Sandbox files"
          className="border-b border-paper/10 lg:border-r lg:border-b-0"
        >
          <p className="px-4 pt-3 font-mono text-[10px] tracking-[0.18em] text-paper/40 uppercase">
            Files
          </p>
          <ul className="p-2">
            {catalog.map((item) => {
              const active = item.slug === demo.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/demo/${item.slug}`}
                    className={`block px-2 py-1.5 font-mono text-[12px] ${
                      active
                        ? "bg-paper/10 text-gold"
                        : "text-paper/65 hover:bg-paper/5 hover:text-paper"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0 border-b border-paper/10 lg:border-r lg:border-b-0">
          <label className="sr-only" htmlFor="sandbox-editor">
            Code editor
          </label>
          <div className="flex">
            <pre
              aria-hidden
              className="select-none border-r border-paper/10 px-3 py-4 text-right font-mono text-[13px] leading-relaxed text-paper/30"
            >
              {Array.from({ length: lineCount }, (_, i) => i + 1).join("\n")}
            </pre>
            <textarea
              id="sandbox-editor"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              className="min-h-[28rem] w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-relaxed text-paper/92 outline-none sm:min-h-[32rem]"
            />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex border-b border-paper/10">
            <TabButton
              active={tab === "console"}
              onClick={() => setTab("console")}
            >
              Console
            </TabButton>
            <TabButton
              active={tab === "preview"}
              onClick={() => setTab("preview")}
              disabled={!ran?.html}
            >
              Preview
            </TabButton>
          </div>
          {tab === "preview" && ran?.html ? (
            <iframe
              title="Sandbox preview"
              sandbox=""
              srcDoc={ran.html}
              className="h-[28rem] w-full bg-paper sm:h-[32rem]"
            />
          ) : (
            <pre
              aria-live="polite"
              className="min-h-[28rem] overflow-auto p-4 font-mono text-[13px] leading-relaxed text-gold/90 sm:min-h-[32rem]"
            >
              {ran
                ? ran.stdout
                : "Press Run (⌘/Ctrl + Enter).\nThis is a teaching REPL, not MRI and not rails s."}
            </pre>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-paper/10 px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-paper/45 uppercase">
        <span>
          {dirty ? "Unsaved remix" : "Starter"} · {lineCount} lines
        </span>
        <span>{demo.hint}</span>
      </div>
      {ran?.note ? (
        <p className="border-t border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-6 text-paper/80">
          {ran.note}
        </p>
      ) : null}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase ${
        active ? "text-gold" : "text-paper/45"
      } disabled:opacity-30`}
    >
      {children}
    </button>
  );
}
