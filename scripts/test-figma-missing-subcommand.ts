import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { missingFigmaSubcommand } from "../packages/cli/src/commands/figmaMissingSubcommand.ts";

const here = dirname(fileURLToPath(import.meta.url));
const figmaSource = readFileSync(join(here, "../packages/cli/src/commands/figma.ts"), "utf8");

test("missing figma subcommand is a usage error", () => {
  assert.deepEqual(missingFigmaSubcommand(), { kind: "usage_error", exitCode: 1 });
});

test("figma parent command prints help then failUsage", () => {
  const run = figmaSource.split("async run({ args }) {", 2)[1];
  assert.ok(run);
  assert.match(run, /console\.log\(HELP\)/);
  assert.match(run, /failUsage\(missingFigmaSubcommand\(\)\.exitCode\)/);
  assert.doesNotMatch(run, /if \(!args\._\?\.\[0\]\) console\.log\(HELP\)/);
});

test("figma parent command does not treat a missing subcommand as success", () => {
  const run = figmaSource.split("async run({ args }) {", 2)[1];
  assert.ok(run);
  assert.doesNotMatch(run, /setCommandExitCode\(0\)/);
  assert.doesNotMatch(run, /finishCommand\(\)/);
});
