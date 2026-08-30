type Layer = {
  name: string;
  detail: string;
};

export function Architecture({
  title,
  layers,
}: {
  title: string;
  layers: Layer[];
}) {
  return (
    <section aria-labelledby="architecture-heading">
      <h2 id="architecture-heading" className="font-serif text-3xl tracking-tight">
        {title}
      </h2>
      <ol className="mt-8 grid border border-ink/12 sm:grid-cols-2 lg:grid-cols-3">
        {layers.map((layer, index) => (
          <li
            key={layer.name}
            className="border-ink/12 p-6 border-b sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0 last:border-b-0"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] text-ruby uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-serif text-2xl">{layer.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              {layer.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
