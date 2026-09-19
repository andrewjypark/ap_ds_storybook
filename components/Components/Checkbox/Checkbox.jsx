import React, { forwardRef } from "react";
import "./Checkbox.css";

/**
 * The real Tier 3 Checkbox -- Figma's "Checkbox" component (`State`:
 * `Empty`/`Filled`) built as a genuinely toggleable control, same
 * real-interaction bar as Segment Group/Dropdown rather than a static
 * mockup. Built as a `role="checkbox"` button (native ARIA checkbox
 * pattern -- `aria-checked`, spacebar/click both toggle) rather than a
 * wrapped native `<input type="checkbox">`, matching how DropdownField's
 * own trigger is a `role="button"` div rather than a native element --
 * this codebase's established way of building an interactive control
 * whose visuals are driven entirely by tokens.json rather than browser
 * default form-control styling.
 *
 * `checked`/`onChange` make this a controlled component (pass your own
 * state, same shape as Dropdown's `value`/`onChange`) -- there's no
 * internal state here, so an uncontrolled usage just won't visually
 * toggle, by design.
 *
 * See checkboxTokens.js for exactly how each Figma value (or its
 * closest existing token-system equivalent) maps onto this component's
 * "--ap-checkbox-*" custom properties. There is no `indeterminate` prop
 * -- Figma's real component only has two states (`Empty`/`Filled`), and
 * this only builds what's actually there.
 *
 * forwardRef targets the checkbox button itself, so TokenReadout can
 * read live-resolved custom properties off exactly the node they're set
 * on, same as every other Tier 3 component.
 */
export const Checkbox = forwardRef(function Checkbox(
	{ checked = false, onChange, disabled = false, "aria-label": ariaLabel, ...rest },
	ref,
) {
	return (
		<button
			ref={ref}
			type="button"
			role="checkbox"
			aria-checked={checked}
			aria-label={ariaLabel}
			disabled={disabled}
			className="ap-checkbox"
			onClick={() => !disabled && onChange?.(!checked)}
			{...rest}
		>
			<span className="ap-checkbox-box">
				{checked && (
					<svg className="ap-checkbox-checkmark" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<path
							d="M3 8.5L6.2 11.5L13 4.5"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</span>
		</button>
	);
});
