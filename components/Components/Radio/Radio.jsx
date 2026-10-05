import React, { forwardRef } from "react";
import "./Radio.css";

/**
 * Tier 3 Radio -- a single radio button, built the same way Checkbox.jsx
 * is: a real `role="radio"` button (ARIA radio pattern -- `aria-checked`,
 * click/Space/Enter all select it) rather than a wrapped native
 * `<input type="radio">`, so its visuals are driven entirely by
 * tokens.json rather than browser default form-control styling, same as
 * every other interactive Tier 3 control in this codebase.
 *
 * Controlled, and deliberately NOT grouped -- this component only knows
 * its own checked/disabled/onChange; which radios in a set are mutually
 * exclusive is the CALLER's job (see
 * ../../ThemingPlayground/ThemingPlaygroundControls.jsx), same division
 * of responsibility Checkbox leaves to its own callers.
 *
 * forwardRef so a parent can read live-resolved custom property values
 * straight off this exact DOM node, same as every other Tier 3 component.
 */
export const Radio = forwardRef(function Radio(
	{ checked = false, onChange, disabled = false, "aria-label": ariaLabel, ...rest },
	ref,
) {
	return (
		<button
			ref={ref}
			type="button"
			role="radio"
			aria-checked={checked}
			aria-label={ariaLabel}
			disabled={disabled}
			className="ap-radio"
			onClick={() => !disabled && onChange?.(true)}
			{...rest}
		>
			<span className="ap-radio-circle">{checked && <span className="ap-radio-dot" />}</span>
		</button>
	);
});
