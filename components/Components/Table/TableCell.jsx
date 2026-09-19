import React, { forwardRef } from "react";
import { Checkbox } from "../Checkbox/Checkbox.jsx";
import "./Table.css";

/**
 * The real Tier 3 Table Cell -- Figma's "table_row_cell_container"
 * component set. `Type` variant maps onto `type`:
 *   "header"   -> Type=table_header_row_title -- bold label text with an
 *                 optional trailing icon (`showIcon`/`icon`) -- Figma's
 *                 own real examples swap in either a "sort" glyph
 *                 (ascending/descending columns) or a "caret-down"
 *                 glyph (filterable columns); pass whichever fits via
 *                 the shared <Icon> wrapper, e.g.
 *                 `<Icon icon={FaSort} size="small" />`.
 *   "body"     -> Type=table_body_row_text -- Figma's real wrapper
 *                 stacks up to TWO lines (its own `show_second_row`
 *                 boolean), each an optional icon + text pair -- maps
 *                 onto `text`/`icon`/`showIcon` for the first line and
 *                 `secondaryText`/`secondaryIcon`/`showSecondaryIcon`
 *                 for the second (e.g. "Email Internal Name" /
 *                 "Subj: Subject Line" in Figma's own Table Example).
 *   "slot"     -> Type=slot -- arbitrary `children`. Figma's own default
 *                 example content is two icon-only action buttons --
 *                 shown here as two real small `ghost`-priority
 *                 `<Button>`s with `showText={false}`/
 *                 `showLeftIcon={false}`/`showRightIcon` (just the
 *                 icon slot on, no text, no left icon) -- drop in
 *                 whatever a real column's actions actually need (a
 *                 status badge, anything).
 *   "empty"    -> Type=empty slot -- literally nothing; a spacer cell.
 *   "checkbox" -> Type=checkbox -- a real <Checkbox> (`checked`/
 *                 `onChange`, forwarded straight through), for a
 *                 selection column.
 *
 * forwardRef so TokenReadout can read live-resolved custom properties
 * off the real DOM node, same as every other Tier 3 component.
 */
export const TableCell = forwardRef(function TableCell(
	{
		type = "body",
		text,
		icon,
		showIcon = false,
		secondaryText,
		secondaryIcon,
		showSecondaryIcon = false,
		checked,
		onChange,
		children,
		className = "",
		...rest
	},
	ref,
) {
	const classes = ["ap-table-cell", `ap-table-cell--${type}`, className].filter(Boolean).join(" ");

	if (type === "header") {
		return (
			<div ref={ref} role="columnheader" className={classes} {...rest}>
				<span className="ap-table-cell-text">{text}</span>
				{showIcon && icon && <span className="ap-table-cell-icon">{icon}</span>}
			</div>
		);
	}

	if (type === "body") {
		return (
			<div ref={ref} role="cell" className={classes} {...rest}>
				<span className="ap-table-cell-body-line">
					{showIcon && icon && <span className="ap-table-cell-icon">{icon}</span>}
					<span className="ap-table-cell-text">{text}</span>
				</span>
				{secondaryText && (
					<span className="ap-table-cell-body-line ap-table-cell-body-line--secondary">
						{showSecondaryIcon && secondaryIcon && <span className="ap-table-cell-icon">{secondaryIcon}</span>}
						<span className="ap-table-cell-text">{secondaryText}</span>
					</span>
				)}
			</div>
		);
	}

	if (type === "checkbox") {
		return (
			<div ref={ref} role="cell" className={classes} {...rest}>
				<Checkbox checked={checked} onChange={onChange} aria-label="Select row" />
			</div>
		);
	}

	if (type === "empty") {
		return <div ref={ref} role="cell" className={classes} {...rest} />;
	}

	// type === "slot"
	return (
		<div ref={ref} role="cell" className={classes} {...rest}>
			{children}
		</div>
	);
});
