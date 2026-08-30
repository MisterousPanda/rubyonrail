type PageHeaderProps = {
  kicker: string;
  title: string;
  lede: string;
};

export function PageHeader({ kicker, title, lede }: PageHeaderProps) {
  return (
    <header className="border-b border-ink/10 pb-12">
      <p className="font-mono text-[11px] tracking-[0.28em] text-ruby uppercase">
        {kicker}
      </p>
      <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-ink sm:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl">
        {lede}
      </p>
    </header>
  );
}
