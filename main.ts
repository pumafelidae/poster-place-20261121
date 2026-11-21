// Writes the entry image for the-poster-for-a-place-that-i-2-20261121-0539.
// A travel poster for KHARUN, an invented place: a cliff city of rose
// salt rock strung with hanging lanterns, seen at dusk across the salt
// desert, a camel caravan walking toward its lights. The place name is
// set into the picture; no quotes, ratings or other copy.
// The poster art lives in entry.png beside this file (rendered from
// index.html); this program copies it to the output path, verifying it
// is a whole PNG first. Deterministic: the same bytes on every run,
// no network, no randomness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output/entry.png";
const dest = outDir.endsWith(".png") ? outDir : join(outDir, "entry.png");

const src = join(dirname(fileURLToPath(import.meta.url)), "entry.png");
const bytes = readFileSync(src);

// Guard: refuse to write anything that is not a whole PNG.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (bytes.length < 8 || !bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG");
}
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, bytes);
console.log(`wrote ${dest} (${bytes.length} bytes)`);
