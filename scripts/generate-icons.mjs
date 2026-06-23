import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public", "icon.svg"));

const sizes = [192, 512];

for (const size of sizes) {
  const png = await sharp(svg).resize(size, size).png().toBuffer();
  writeFileSync(join(root, "public", `pwa-${size}x${size}.png`), png);
}

console.log("Icons generated:", sizes.map((s) => `pwa-${s}x${s}.png`).join(", "));
