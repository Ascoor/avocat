import fs from "node:fs";
import path from "node:path";

const ROOT = process.argv[2] || "src";
const exts = new Set([".js", ".jsx", ".ts", ".tsx"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (exts.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

// يلتقط: var(--token) + أي ظهور مباشر لـ --token
const RE = /var\(\s*(--[a-zA-Z0-9-_]+)\s*\)|(--[a-zA-Z0-9-_]+)/g;

const files = walk(ROOT);
const vars = new Map(); // var -> Set(files)

for (const file of files) {
  const txt = fs.readFileSync(file, "utf8");
  let m;
  while ((m = RE.exec(txt))) {
    const v = (m[1] || m[2]).trim();
    if (!vars.has(v)) vars.set(v, new Set());
    vars.get(v).add(file);
  }
}

const sorted = [...vars.entries()].sort((a, b) => a[0].localeCompare(b[0]));

console.log(`Found ${sorted.length} CSS vars:\n`);
for (const [v, where] of sorted) {
  console.log(v);
  for (const f of [...where].sort()) console.log("  -", f);
}
