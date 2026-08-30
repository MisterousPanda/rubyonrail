type CodeBlockProps = {
  title?: string;
  language?: string;
  code: string;
};

export function CodeBlock({ title, language = "ruby", code }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden rounded-sm border border-ink/12 bg-ink text-paper shadow-[0_24px_60px_-28px_rgba(22,18,14,0.55)]">
      <figcaption className="flex items-center justify-between gap-4 border-b border-paper/10 px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] text-paper/55 uppercase">
        <span>{title ?? language}</span>
        <span>{language}</span>
      </figcaption>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-paper/92 sm:p-6 sm:text-[14px]">
        <code>{code.trim()}</code>
      </pre>
    </figure>
  );
}
