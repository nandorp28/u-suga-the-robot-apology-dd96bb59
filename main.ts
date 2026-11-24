// The Robot Apology — make.fun entry (u-suga-the-robot-apology-dd96bb59).
// Writes the robot's two-line confession to /output/entry.txt.
// Gate: UTF-8 text of 1 to 400 characters, not only white space.
// Line 1 owns one specific mistake; line 2 names the lesson and the
// changed behaviour that follows from that exact mistake.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES: string[] = [
  "I am sorry: I sent the quarterly report to your mother instead of your manager, because both are saved as 'M' in my contacts.",
  "I have learned that one letter is not an address, and from now on I will read the full name aloud before I send anything.",
];

const text = LINES.join("\n");
const chars = [...text].length;

if (LINES.length !== 2) {
  throw new Error(`expected exactly 2 lines, got ${LINES.length}`);
}
for (const line of LINES) {
  if (line !== line.trim()) {
    throw new Error("a line has leading or trailing whitespace");
  }
  if (line.length === 0) {
    throw new Error("an empty line is not allowed");
  }
}
if (chars < 1 || chars > 400) {
  throw new Error(`entry must be 1-400 characters, got ${chars}`);
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Read back and confirm the file holds exactly the validated text.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("entry.txt does not match the validated entry");
}
console.log(`Wrote ${chars} characters to ${outPath}`);
