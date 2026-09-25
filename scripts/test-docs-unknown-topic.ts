import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { unknownTopicNextSteps } from "../packages/cli/src/commands/docsUnknownTopic.ts";

const here = dirname(fileURLToPath(import.meta.url));
const docsSource = readFileSync(join(here, "../packages/cli/src/commands/docs.ts"), "utf8");
const firstTopic = docsSource.match(/^\s+"([a-z0-9-]+)": \{/m)?.[1];

test("catalog first topic is a real docs slug", () => {
  assert.equal(firstTopic, "data-attributes");
});

test("unknown topic points at the first real topic and the list command", () => {
  const next = unknownTopicNextSteps("gsapp", firstTopic);
  assert.equal(next.unknown, "Unknown topic: gsapp");
  assert.equal(next.tryCmd, "Try: hyperframes docs data-attributes");
  assert.equal(next.listCmd, "Run hyperframes docs to list topics.");
});

test("unknown topic without a catalog still says to list topics", () => {
  const next = unknownTopicNextSteps("gsapp");
  assert.equal(next.unknown, "Unknown topic: gsapp");
  assert.equal(next.tryCmd, undefined);
  assert.equal(next.listCmd, "Run hyperframes docs to list topics.");
});

test("docs command prints the helper lines instead of a name-only dump", () => {
  const unknownBranch = docsSource
    .split("const entry = TOPICS[topic];", 2)[1]
    ?.split("const filePath", 1)[0];
  assert.ok(unknownBranch);
  assert.match(unknownBranch, /unknownTopicNextSteps\(topic, FIRST_TOPIC\)/);
  assert.match(unknownBranch, /next\.tryCmd/);
  assert.match(unknownBranch, /next\.listCmd/);
  assert.match(unknownBranch, /failCommand\(\)/);
  assert.doesNotMatch(unknownBranch, /Available topics:/);
});
