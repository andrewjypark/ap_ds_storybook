import React, { forwardRef } from "react";
import "./Table.css";

/**
 * The real Tier 3 Table Row -- Figma's "table_row_072426" component set.
 * `Type` variant maps onto `variant`:
 *   "header"    -> Type=header_row
 *   "body"      -> Type=body_row
 *   "body-alt"  -> Type=body_row_alt_bg_color
 *
 * Figma's own component has no properties beyond `Type` -- a row's
 * cells are just however many <TableCell> children you give it (the
 * `cell_container` SLOT), the same "no properties, real composition"
 * shape as DropdownMenu holding <DropdownMenuRow>s. Stack multiple
 * <TableRow>s to build a real table -- there's no separate "Table"
 * container component in Figma either, just rows placed one after
 * another (see the "notifications_dashboard" example the Table audit
 * found).
 *
 * Divider correction: Figma draws exactly ONE divider line, between the
 * header row and the first body row -- not a border under every row.
 * The first pass here put a `border-bottom` on the shared base rule,
 * which reads as a stray line/shadow under every individual row swatch
 * (flagged in review). `isHeader` now scopes that border to only the
 * header row via `ap-table-row--header`, matching Figma's real
 * placement.
 *
 * forwardRef so TokenReadout can read live-resolved custom properties
 * off the real DOM node, same as every other Tier 3 component.
 */
export const TableRow = forwardRef(function TableRow({ variant = "body", children, className = "", ...rest }, ref) {
	const isHeader = variant === "header";
	const isAlt = variant === "body-alt";
	return (
		<div
			ref={ref}
			role="row"
			className={[
				"ap-table-row",
				isHeader ? "ap-table-row--header" : "",
				isAlt ? "ap-table-row--alt" : "",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			{...rest}
		>
			{children}
		</div>
	);
});
