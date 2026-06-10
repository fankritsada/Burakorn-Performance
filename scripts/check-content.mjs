import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const scanDirs = ["app", "components", "content", "lib", "public"];
const banned = [
  "Buy Now",
  "Shop",
  "cart",
  "checkout",
  "full warranty",
  "no risk",
  "like-new",
  "zero mileage",
  "fake press",
  "fake reviews",
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      return walk(path);
    }

    return path;
  });
}

const files = scanDirs.flatMap((dir) => walk(join(root, dir)));
const failures = [];

for (const file of files) {
  if (!/\.(ts|tsx|css|txt|md)$/.test(file)) {
    continue;
  }

  const text = readFileSync(file, "utf8");
  for (const phrase of banned) {
    if (text.includes(phrase)) {
      failures.push(`${file}: contains banned phrase "${phrase}"`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Content boundary check passed.");
