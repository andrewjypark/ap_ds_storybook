import React, { forwardRef } from "react";

/**
 * The real Tier 3 Dropdown Menu -- a plain list container (Figma's
 * "emailer_dropdown_menu" component has no properties of its own; how
 * many rows it holds is just however many <DropdownMenuRow> children
 * you give it, same "no properties, real composition" shape Segment
 * Group's own outer track has). forwardRef so TokenReadout can read
 * live-resolved CSS custom properties off the real DOM node (same
 * reasoning as Button/Text Input/Segment Group).
 */
export const DropdownMenu = forwardRef(function DropdownMenu(
	{ children, "aria-label": ariaLabel = "Dropdown menu", ...rest },
	ref,
) {
	// role="listbox" makes this an ARIA input field, which axe's
	// aria-input-field-name rule (rightly) requires a name for -- Dropdown.jsx
	// passes its own fieldTitleText here; this default covers every other
	// standalone usage (docs swatches, etc.) that doesn't.
	return (
		<div className="ap-dropdown-menu" role="listbox" aria-label={ariaLabel} ref={ref} {...rest}>
			{children}
		</div>
	);
});
