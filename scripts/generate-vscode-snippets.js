#!/usr/bin/env node
/**
 * ============================================================================
 * scripts/generate-vscode-snippets.js
 * ============================================================================
 * Generates a project-level VS Code snippets file
 * (.vscode/ap-ds-tokens.code-snippets) from this package's tier_1_core
 * reference CSS, so every --ap-* custom property name shows up as an
 * autocomplete suggestion in VS Code.
 *
 * WHY THIS EXISTS: VS Code has no built-in way to surface var(--ap-*)
 * completions from a file sitting inside node_modules, and the third-party
 * CSS-variables-autocomplete extensions tried for this had an unreliable
 * caching bug (see this repo's CLAUDE.md). A generated native snippets
 * file is the approach that actually works reliably.
 *
 * USAGE (run from the root of a project that has ap-ds-storybook installed):
 *   npx ap-ds-storybook-snippets
 *
 * Re-run this any time you upgrade ap-ds-storybook, since token
 * names/values can change between versions.
 *
 * IMPORTANT GOTCHA: the generated .vscode/*.code-snippets file only takes
 * effect if it sits at your VS Code WORKSPACE ROOT, not in a subfolder --
 * even if that subfolder is where your package.json/node_modules actually
 * live. This bit us in a multi-folder repo where the open VS Code
 * workspace root was one level ABOVE the actual Next.js app folder: the
 * snippets file wasn't picked up at all until it was moved up to sit
 * alongside the real workspace root's own .vscode/ folder. If autocomplete
 * doesn't show up after reloading the window, check this before anything
 * else -- it's not a word-separator or caching problem, it's just the
 * wrong folder.
 * ============================================================================
 */

import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const src = path.resolve(
  cwd,
  "node_modules/ap-ds-storybook/build/tier_1_core/css/variables.css"
);
const outPath = path.resolve(cwd, ".vscode/ap-ds-tokens.code-snippets");

if (!fs.existsSync(src)) {
  console.error(
    `Could not find ${src}\n` +
      `Run this from the root of a project that has "ap-ds-storybook" installed in node_modules.`
  );
  process.exit(1);
}

const content = fs.readFileSync(src, "utf8");
const pattern = /^\s*(--[a-zA-Z0-9-]+):\s*(.+?);\s*$/gm;

const snippets = {};
let match;
while ((match = pattern.exec(content)) !== null) {
  const [, name, value] = match;
  snippets[name] = {
    prefix: name,
    body: `var(${name})`,
    description: value.trim(),
    scope: "css,scss,less,postcss",
  };
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(snippets, null, 2));

console.log(
  `wrote ${Object.keys(snippets).length} snippets to ${path.relative(cwd, outPath)}`
);
console.log(
  `Note: that file must live at your VS Code workspace ROOT to take effect -- move it up if your workspace root isn't this folder.`
);
console.log(`Reload VS Code ("Developer: Reload Window") to pick them up.`);
