/**
 * Real property value lists + the CSS custom property names build-tokens.js
 * generates for them (see tokens.json's "tier_3/table" set and
 * build/tier_1_core/css/variables.css) -- same pattern as
 * dropdownTokens.js / modalTokens.js.
 *
 * Sourced from the real "table_row_072426" and "table_row_cell_container"
 * Figma component sets (Storybook Planning file, "Components from GT"
 * page, node 38:3652's "Table Row" section) via the Desktop Bridge
 * plugin. Two real component sets, matching the composition shape
 * DropdownMenu/SegmentGroup's own track already established ("no
 * properties on the outer container beyond a variant axis, real
 * composition via a SLOT"):
 *
 *   table_row_072426 -- `Type`: header_row / body_row /
 *     body_row_alt_bg_color, each wrapping one `cell_container` SLOT.
 *     A row's cells are just however many <TableCell> children you give
 *     it, exactly like DropdownMenu holding <DropdownMenuRow>s.
 *
 *   table_row_cell_container -- `Type`: table_header_row_title /
 *     table_body_row_text / slot / empty slot / checkbox. See
 *     TableCell.jsx's own doc comment for how each variant maps onto
 *     this component's `type` prop.
 *
 * The big "Table Example"/"notifications_dashboard" instance in Figma
 * also shows a status-badge pill and a "View Report" split button
 * dropped into body cells -- per the scoping conversation, those are
 * just example CONTENT someone put into the generic `slot` cell type,
 * not part of the row/cell anatomy itself, so this build doesn't ship
 * bespoke Badge/SplitButton components for them. (The split button, for
 * the record, is literally two `Button w Icon_052126` instances side by
 * side -- buildable later from this project's existing <Button>
 * whenever that's actually needed.)
 *
 * Row values:
 *   - header_row / body_row: no fill (transparent) in Figma -- background
 *     here still gets a real token (`background.default`,
 *     `tier_2_color.background.surface_primary`) rather than staying
 *     literally transparent, so a row reads correctly over any page
 *     background, not just the "Components from GT" canvas's own.
 *   - body_row_alt_bg_color: a real fill, `#f3f3f3` -- NOT bound to a
 *     Figma variable (same "hardcoded, not a real token binding"
 *     situation flagged throughout this audit). Mapped to
 *     `tier_2_color.background.surface_secondary`
 *     (`{color.neutral.200}`, `#e1e4e7`) -- the semantically correct
 *     "alternate/secondary surface" token, and numerically close to
 *     Figma's raw value.
 *   - The divider line Figma draws between the header row and the first
 *     body row (a separate "divider_line" node, not a border on the row
 *     itself) was bound to a "ColorBox Colors" library variable -- the
 *     same wrong/stale remote-library trap already documented in
 *     dropdownTokens.js's own comment (re: Segment Group's first pass).
 *     Mapped instead to `tier_2_color.border.default`
 *     (`{color.neutral.300}`), the same semantic divider token Dropdown's
 *     own menu-row divider uses, applied here as a real `border-bottom`
 *     on every row rather than a separate divider element.
 *
 * Cell values (table_row_cell, the padded wrapper inside every
 * table_row_cell_container variant): 10px padding on all sides, 4px gap
 * between an icon and its text (measured consistently across the
 * header wrapper, the body wrapper, and the action-button `slot`
 * variant). Header text: Figma's demo renders it 12px/700 in "Lexend"
 * -- a font from this specific Figma file's own demo content, not this
 * project's real typography scale. First pass mapped it to the closest
 * SEMANTIC guess, `tier_2_typography.label.xs`; per explicit direction
 * it's now `tier_2_typography.label.xxs` instead, which is exactly
 * `--ap-font1-body-text-small-semibold` (`{font1.body_text_small.semibold}`)
 * one alias down -- same underlying primitive, reached through the
 * semantic layer like every other typography token in this file. Body
 * text: Figma's demo renders it 14px/300 -- maps onto
 * `tier_2_typography.body.sm` (`--ap-tier-2-typography-body-sm`),
 * confirmed against explicit direction too.
 *
 * The header cell's icon (sort ascending/descending vs. a filter
 * caret-down, depending on the column) and the row-action icons in the
 * `slot` cell type render through the shared <Icon> wrapper
 * (../Icon/Icon.jsx) and its small/medium/large/xs scale -- exact icon
 * pixel sizing wasn't measured off Figma this round, same "not
 * measured, use the shared scale" note Dropdown's own audit made for
 * its row/field icons.
 */

export const ROW_VARIANTS = [
	{ key: "header", label: "Header Row" },
	{ key: "body", label: "Body Row" },
	{ key: "body-alt", label: "Body Row (Alt)" },
];

export const CELL_TYPES = [
	{ key: "header", label: "Header Title" },
	{ key: "body", label: "Body Text" },
	{ key: "slot", label: "Slot" },
	{ key: "empty", label: "Empty Slot" },
	{ key: "checkbox", label: "Checkbox" },
];

export const tableRowVar = {
	background: (variant) => `--ap-table-row-color-background-${variant}`, // default | alt
	border: () => `--ap-table-row-color-border`,
	borderWidth: () => `--ap-table-row-border-width`,
};

export const tableCellVar = {
	padding: () => `--ap-table-cell-padding`,
	gap: () => `--ap-table-cell-gap`,
	headerText: () => `--ap-table-cell-color-header-text`,
	bodyText: () => `--ap-table-cell-color-body-text`,
	bodyTextSecondary: () => `--ap-table-cell-color-body-text-secondary`,
	headerFont: () => `--ap-table-cell-header-text`,
	bodyFont: () => `--ap-table-cell-body-text`,
};
