type LiteResult = { ok: true; stdout: string } | { ok: false };

function inspect(value: unknown): string {
  if (value === undefined) return "";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "symbol") return value.toString();
  return JSON.stringify(value);
}

function transpileRubyLite(source: string): string {
  let s = source.replace(/\r\n/g, "\n");
  s = s.replace(/^\s*#.*$/gm, "");
  s = s.replace(/"(?:\\.|[^"\\])*"/g, (quoted) => {
    const inner = quoted.slice(1, -1).replace(/#\{([^}]+)\}/g, "${$1}");
    return `\`${inner}\``;
  });
  s = s.replace(/(\d+)\.times\s*\{\s*\|(\w+)\|\s*([^}]*)\}/g, (_m, n, i, body) => {
    return `for (let ${i} = 0; ${i} < ${n}; ${i}++) { ${body} }`;
  });
  s = s.replace(/\.map\s*\{\s*\|(\w+)\|\s*([^}]+)\}/g, ".map(($1) => ($2))");
  s = s.replace(/\.select\s*\{\s*\|(\w+)\|\s*([^}]+)\}/g, ".filter(($1) => ($2))");
  s = s.replace(/\.join\(([^)]*)\)/g, ".join($1)");
  s = s.replace(/(\w+)\[:(\w+)\]/g, "$1.$2");
  s = s.replace(/(\w+):\s+"/g, '"$1": "');
  s = s.replace(/(\w+):\s+`/g, '"$1": `');
  s = s.replace(/==/g, "===");
  s = s.replace(/puts\s+(.+)$/gm, "puts($1)");
  const lines = s.split("\n").map((line) => line.trimEnd());
  const meaningful = lines.filter((line) => line.trim().length > 0);
  if (meaningful.length) {
    const last = meaningful[meaningful.length - 1] ?? "";
    if (
      !/^(puts\(|for |if |return |let |const |var )/.test(last.trim()) &&
      !last.trim().endsWith(";") &&
      !last.trim().endsWith("{") &&
      !last.trim().endsWith("}")
    ) {
      const idx = lines.lastIndexOf(last);
      lines[idx] = `__result = (${last.trim()});`;
    }
  }
  return `let __result = undefined;\n${lines.join("\n")}\nreturn __result;`;
}

export function runRubyLite(source: string): LiteResult {
  try {
    const logs: string[] = [];
    const puts = (value: unknown) => {
      logs.push(value == null ? "" : String(value));
    };
    const body = transpileRubyLite(source);
    const fn = new Function("puts", body);
    const result = fn(puts);
    if (result !== undefined) logs.push(inspect(result));
    return { ok: true, stdout: logs.join("\n") };
  } catch {
    return { ok: false };
  }
}
