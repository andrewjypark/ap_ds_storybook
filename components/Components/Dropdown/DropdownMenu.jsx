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
export const DropdownMenu = forwardRef(function DropdownMenu({ children, ...rest }, ref) {
	return (
		<div className="ap-dropdown-menu" role="listbox" ref={ref} {...rest}>
			{children}
		</div>
	);
});
