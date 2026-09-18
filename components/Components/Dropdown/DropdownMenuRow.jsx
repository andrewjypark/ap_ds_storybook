import React, { forwardRef } from "react";

/**
 * One real, clickable row inside a <DropdownMenu> (see DropdownMenu.jsx).
 * Mirrors Segment.jsx's own shape: `selected`/`onSelect` are meant to be
 * injected by a controlling parent (see Dropdown.jsx) rather than set
 * directly by a consumer -- Default/Selected happen through real
 * interaction, Hover is real CSS `:hover`.
 *
 * `content` maps onto the real Figma "Content" variant:
 *   "text"    -- Content=Text and Icon (icon optional via `showIcon`/`icon`)
 *   "slot"    -- Content=Slot -- pass arbitrary children (Figma's own
 *                example drops a whole Button instance in here)
 *   "divider" -- State=menu_row_divider -- renders just the divider line,
 *                not a clickable option (role="separator", no onSelect)
 *
 * Pass `icon` as an already-sized element -- the shared <Icon> component
 * (see ../Icon/Icon.jsx), e.g. `<Icon icon={FaRegBookmark} size="small" />`
 * -- same convention Segment.jsx already uses for its own icon prop.
 *
 * `forceState` is a docs-only escape hatch (same pattern as Segment.jsx/
 * Button.jsx) so the Variations page can render static Hover/Selected
 * swatches without a real mouse or a real controlling parent -- never
 * pass it in real usage.
 */
export const DropdownMenuRow = forwardRef(function DropdownMenuRow(
	{ value, children, icon, showIcon = true, content = "text", selected, onSelect, forceState, ...rest },
	ref,
) {
	if (content === "divider") {
		return (
			<div className="ap-dropdown-menu-row ap-dropdown-menu-row--divider" role="separator" ref={ref} {...rest}>
				<span className="ap-dropdown-menu-row-divider-line" />
			</div>
		);
	}

	const isSelected = forceState ? forceState === "selected" : selected;

	return (
		<button
			ref={ref}
			type="button"
			role="option"
			aria-selected={isSelected}
			className="ap-dropdown-menu-row"
			data-selected={isSelected ? "" : undefined}
			data-force-state={forceState}
			onClick={() => onSelect?.(value)}
			{...rest}
		>
			{content === "slot" ? (
				children
			) : (
				<>
					{showIcon && icon && <span className="ap-dropdown-menu-row-icon">{icon}</span>}
					<span className="ap-dropdown-menu-row-text">{children}</span>
				</>
			)}
		</button>
	);
});
