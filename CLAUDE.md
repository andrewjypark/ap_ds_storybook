# CLAUDE.md

Agent-access notes for this repo. Read this before touching Figma or composing components, so you start from what a previous session already learned instead of re-deriving it.

## VS Code autocomplete for --ap-* tokens in a consuming project

Installing `ap-ds-storybook` does not give consumers `var(--ap-*)` autocomplete for free -- see "Set up autocomplete" in the `install-ap-design-system` skill for the full install flow. Things that actually matter once that's wired up:

1. **No third-party extension works for this.** `vunguyentuan.vscode-css-variables` and VS Code's built-in `css.customData` were both tried and dropped -- the extension has an unreliable caching bug, and `css.customData` doesn't support `var(...)` completions at all. The only approach that's worked reliably is generating a native VS Code snippets file from `node_modules/ap-ds-storybook/build/tier_1_core/css/variables.css`. As of 2026-10-28, this is shipped as `scripts/generate-vscode-snippets.js`, runnable from a consuming project via `npx ap-ds-storybook-snippets`.

2. **The generated `.vscode/*.code-snippets` file must sit at the VS Code WORKSPACE ROOT, not wherever `node_modules`/`package.json` happen to live.** Hit this directly in a multi-folder repo where the open VS Code workspace root was one level above the actual Next.js app folder (`codevolution_next_js_15/hello-world`): the snippets file wasn't picked up at all -- no suggestions, no error -- until it was moved up to `codevolution_next_js_15/.vscode/`. If a consumer reports autocomplete "just doesn't work" after following every other step correctly, check this before suspecting a word-separator or caching issue.

3. **The generated snippets are deliberately scoped to `css,scss,less,postcss` only** -- so `var(--ap-...)` autocomplete does not work inside a `.js`/`.jsx` file by default, including inside a React inline `style={{ }}` object (that's plain JS, not real CSS; VS Code's CSS tooling never reaches it). To extend it, rewrite every entry's `"scope"` field in the project's `.vscode/*.code-snippets` to also include `javascript,javascriptreact,typescript,typescriptreact`, and add matching `[javascript]`/`[javascriptreact]`/`[typescript]`/`[typescriptreact]` blocks with `"editor.snippetSuggestions": "bottom"` to `settings.json` (same reason as the existing `[css]`/`[scss]`/`[less]` blocks: otherwise ~1,500 real snippets crowd out normal JS/TS completions). Full script in the project's `install-guide-for-new-repos.md`.

4. **Before debugging "wrong" `--ap-*` suggestions appearing somewhere they shouldn't (e.g. inside a plain `.js` file even with scope correctly restricted), check VS Code's word-based suggestions first.** That's a generic, language-agnostic fallback that offers any plain-text word from *other currently open tabs*, with zero awareness of scope, class names, or CSS variables. If a `.css` file with `--ap-*` tokens is open in a nearby tab, its tokens can leak into a completely unrelated file's suggestions and look exactly like a real (and wrongly-scoped) snippet firing. Confirm by closing the other tab and re-checking before assuming the scope restriction itself is broken. `"editor.wordBasedSuggestions": "off"` under `[javascript]`/`[javascriptreact]` kills this source without touching real CSS files at all.

## `styles/base.css` (added v1.2.0, trimmed v1.2.1)

A small, hand-maintained (not generated) stylesheet of project-agnostic layout primitives, published alongside the token CSS. Import order matters -- it references `var(--ap-...)` tokens that must already be defined:

```js
import "ap-ds-storybook/build/all-combinations/css/variables.css";
import "ap-ds-storybook/styles/base.css";
```

As shipped in v1.2.0 it also included `body` defaults and global `a`/`a:hover`/`a:active` link-color rules. Those were **commented out in v1.2.1** after installing into multiple sibling Next.js projects made the collision risk concrete: they're bare, un-layered element selectors, so importing them into any project with its own existing body/link styling silently wins everywhere -- no specificity contest, no way to opt out short of overriding every rule individually. What's left in v1.2.1 (the 12-column grid system and section-padding helpers) is all scoped to `.ap_*` classes, so a consumer only gets it where they actually use those classes. **General lesson for anything added to this file in the future: a bare element selector (`body`, `a`, `h1`, etc.) is much riskier to ship as a default here than something scoped to a class** -- prefer the latter, or leave the former commented-out/opt-in like the current `body`/`a` rules.

## Shell-tool binding drift (generalizes point 2 above, now confirmed a third time)

The VS Code MCP bridge's `execute_shell_command_code` tool is not reliably bound to this repo's own window for the duration of a session -- it follows whichever VS Code window/terminal last had focus, and that can change between tool calls with no warning or error. This has now caused a real misdirected write: a first draft of `styles/base.css` was sent via this tool with a correct relative path and a success response, but actually landed in an entirely unrelated sibling repo (`ap_codegrid/styles/base.css`), discovered only because the destination was independently verified afterward with `ls`/`cat` on the real absolute path.

**Mitigation that actually works: use a full absolute path for every write AND every verification read with this tool -- never a relative path, and never trust a `cd` to have "stuck" from a previous call.** Before writing, confirm the destination directory exists first (`ls -la "<absolute dir>"`). After writing, read the same absolute path back. If something still lands in the wrong place despite this, the content is still fine to recover from -- `cp` it to the real destination rather than retyping it, and leave the stray copy in place (file deletion on the user's machine isn't something to do unilaterally from this tool) rather than trying to clean it up automatically.

## Connecting to Figma

There is no dedicated MCP server for this design system — what's available is a generic Figma bridge that reads whatever file happens to be open in Figma Desktop, not a curated surface scoped to this repo's components/tokens.

To connect the Figma Console MCP (Desktop Bridge):

1. Open the file in **Figma Desktop** (not the browser).
2. Go to **Plugins → Development → Figma Desktop Bridge** and run it.
3. The bridge stays connected only while that plugin is running and the file is open — it does not persist across sessions, and nothing reconnects it automatically. If `figma-console` tools fail or return stale data, this is the first thing to check.

The official Figma MCP (`figma` plugin server) is a separate, OAuth-based connector. If it's not authorized, its tools are unavailable — authorize it via `claude mcp` or `/mcp` in an interactive session; this session cannot complete that flow itself.

Neither surface has a Code Connect mapping, so a Figma node and its React component (e.g. `<Button>`) aren't linked — treat anything generated from the Figma side as a lookalike to verify against the real component in `components/Components/`, not as a guaranteed match.

## `onChange` convention

Components are inconsistent about what `onChange`/`onSelect` hands back, and it splits cleanly along one line:

- **Components that wrap a native form element** (`TextInput`) pass a real DOM event, because the handler is spread onto an actual `<input>`/`<textarea>`. Use `onChange={e => setValue(e.target.value)}`.
- **Custom controls** (`Checkbox`, `Radio`, `Dropdown`, `SegmentGroup`) call `onChange`/`onSelect` with the **raw new value directly** — `onChange?.(!checked)`, `onChange?.(v)`. There is no event object; `e.target.value` will throw or silently break here.

Don't generalize "onChange takes an event" from `TextInput` to the custom controls — this exact mistake is the one traceable failure mode found when composing a form from these APIs. `Table`, `Icon`, and `Tooltip`'s event-handler conventions haven't been checked against this split yet.

## Source

Both notes above come from the 2026-10-18 design-system inspection, Stations 9 and 10 ([full report](https://github.com/andrewjypark/ap_ds_storybook/blob/ds-inspection/2026-10-18/ds-inspection/reports/2026-10-18-inspection.md)).
