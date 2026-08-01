import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "content", "sources.json");
const sources = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const allowed = new Set(["draft", "approved", "published", "blocked"]);
const errors = [];

for (const source of sources) {
  if (!source.slug || !source.title || !source.sourceUrl || !source.localPath) errors.push(`${source.slug ?? "unknown"}: required field missing`);
  if (!allowed.has(source.status)) errors.push(`${source.slug}: invalid status ${source.status}`);
  if (!fs.existsSync(path.join(root, source.localPath))) errors.push(`${source.slug}: missing ${source.localPath}`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Content manifest OK: ${sources.length} sources, local-only review queue.`);
  console.log(`Approved for publishing: ${sources.filter((source) => source.status === "approved").length}`);
}
