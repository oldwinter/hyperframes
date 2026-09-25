import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const SKILLS_ADD = /npx skills add \S*\/hyperframes[^\n`]*/g;

function skillsAddCommands(source) {
  return source.match(SKILLS_ADD) ?? [];
}

test("README skills add commands include --full-depth", () => {
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const commands = skillsAddCommands(readme);
  assert.ok(commands.length > 0, "README should document npx skills add …/hyperframes");
  assert.match(readme, /npx skills add oldwinter\/hyperframes --full-depth/);
  assert.match(readme, /npx skills add heygen-com\/hyperframes --full-depth/);
  for (const command of commands) {
    assert.match(
      command,
      /--full-depth/,
      `nested skills/ install needs --full-depth: ${command}`,
    );
  }
});

test("Chinese install profile uses --full-depth", () => {
  const profile = readFileSync(join(root, "docs/translation-profile.zh-CN.md"), "utf8");
  const commands = skillsAddCommands(profile);
  assert.equal(commands.length, 1);
  assert.equal(commands[0], "npx skills add oldwinter/hyperframes --full-depth");
});
