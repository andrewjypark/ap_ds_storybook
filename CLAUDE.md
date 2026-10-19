# CLAUDE.md

Agent-access notes for this repo. Read this before touching Figma or composing components, so you start from what a previous session already learned instead of re-deriving it.

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
