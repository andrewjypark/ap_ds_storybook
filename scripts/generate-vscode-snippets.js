#!/usr/bin/env node
/**
 * ============================================================================
 * scripts/generate-vscode-snippets.js
 * ============================================================================
 * Generates a VS Code snippets file (.vscode/ap-ds-tokens.code-snippets)
 * from this package's tier_1_core reference CSS, so every --ap-* custom
 * property name shows up as an autocomplete suggestion in VS Code.
 *
 * WHY THIS EXISTS: VS Code has no built-in way to surface var(--ap-*)
 * completions from a file sitting inside node_modules, and the third-party
 * CSS-variables-autocomplete extensions tried for this had an unreliable
 * caching bug (see this repo's CLAUDE.md). A generated native snippets
 * file is the approach that actually works reliably.
 *
 * TWO WAYS THIS RUNS:
 *
 *   1. Automatically, as this package's `postinstall` script (`--auto`).
 *      `npm install ap-ds-storybook` generates the file with no extra step.
 *      In this mode the script never fails the install: any problem is
 *      printed and skipped, and it always exits 0. It also skips itself when:
 *        - npm is installing THIS repo's own dependencies (developing the
 *          package, not consuming it),
 *        - running in CI (process.env.CI is set),
 *        - the consumer opts out with AP_DS_SKIP_SNIPPETS=1.
 *      Note: npm 7+ hides postinstall output unless the script fails, so
 *      the "wrote N snippets" line usually won't appear in the terminal.
 *
 *   2. Manually, any time: `npx ap-ds-storybook-snippets` from the project.
 *      Useful if install scripts were skipped (pnpm blocks dependency
 *      install scripts by default; `npm install --ignore-scripts` skips them).
 *
 * WHERE THE FILE GOES: VS Code only reads snippets from the .vscode folder
 * at the WORKSPACE ROOT -- not wherever package.json/node_modules live.
 * This bit us in multi-folder repos where the app lived a level or more
 * below the folder open in VS Code. The script approximates the workspace
 * root as the nearest folder (walking up from the project) that contains
 * .git, and falls back to the project folder itself if there's no Git repo.
 * Override with `--out <dir>` (manual mode only).
 *
 * Re-runs automatically on every install/upgrade, so token names/values
 * stay current with the installed version.
 * ============================================================================
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const auto = args.includes("--auto");

// This package's own root (scripts/ lives one level below it). Reading the
// source CSS relative to the script, not the cwd, works the same whether
// the script runs from npx, from postinstall, or from a nested zone.
const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(pkgRoot, "build/tier_1_core/css/variables.css");

// npm sets INIT_CWD to the folder `npm install` was run from -- the
// consuming project. postinstall itself runs with cwd = this package's
// folder inside node_modules, so cwd is useless in auto mode.
const projectDir = auto ? process.env.INIT_CWD || process.cwd() : process.cwd();

function log(msg) {
  console.log(`[ap-ds-storybook] ${msg}`);
}

function stop(msg) {
  if (auto) {
    log(`skipped snippets: ${msg}`);
    process.exit(0);
  }
  console.error(msg);
  process.exit(1);
}

function realpath(p) {
  try {
    return fs.realpathSync(p);
  } catch {
    return path.resolve(p);
  }
}

function findWorkspaceRoot(start) {
  let dir = path.resolve(start);
  while (true) {
    if (fs.existsSync(path.join(dir, ".git"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return path.resolve(start);
    dir = parent;
  }
}

try {
  if (auto) {
    if (process.env.AP_DS_SKIP_SNIPPETS) stop("AP_DS_SKIP_SNIPPETS is set");
    if (process.env.CI) stop("running in CI");
    // Installing this repo's own devDependencies, not consuming the package.
    if (realpath(projectDir) === realpath(pkgRoot)) process.exit(0);
  }

  if (!fs.existsSync(src)) stop(`could not find ${src}`);

  const outFlag = args.indexOf("--out");
  const outRoot =
    !auto && outFlag !== -1 && args[outFlag + 1]
      ? path.resolve(args[outFlag + 1])
      : findWorkspaceRoot(projectDir);
  const outPath = path.join(outRoot, ".vscode/ap-ds-tokens.code-snippets");

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

  log(`wrote ${Object.keys(snippets).length} snippets to ${outPath}`);
  log(`Reload VS Code ("Developer: Reload Window") to pick them up.`);
} catch (err) {
  stop(err && err.message ? err.message : String(err));
}
