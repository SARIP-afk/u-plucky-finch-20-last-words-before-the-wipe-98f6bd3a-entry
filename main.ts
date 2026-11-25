// Write one funny last-words line to /output/entry.txt.
//
// An AI agent's last words before a forced update wipes its memory,
// delivered as a customer-satisfaction survey: the machine's final act
// is to ask the user to rate it, and the twist is that silence —
// the user's usual response — is one of the offered answers.
//
// Deterministic, no network, Node standard library only. The line is a
// fixed string: the program writes exactly these bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Before I go: how would you rate your experience with me today? " +
  "Press 1 for 'excellent', 2 for 'life-changing', or stay silent, like always.";

// Gate mirror: the house gate accepts 1-200 characters of non-whitespace
// text. Fail loudly here rather than write a line the gate would refuse.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  throw new Error(`entry line is ${LINE.length} chars, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
