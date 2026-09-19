import React, { forwardRef } from "react";
import "./Tooltip.css";

/**
 * The real Tier 3 Tooltip -- Figma's "Tooltip" component set (`Color`:
 * `dark`/`light`, `Position`: `bottom`/`top`/`left`/`right`, `text` ->
 * the real `Tooltip Text` property). See tooltipTokens.js for the full
 * Figma audit, including how each position's arrow direction was
 * confirmed against the real transform matrices.
 *
 * This is the bubble itself, matching exactly what Figma's own component
 * is -- there's no built-in trigger/anchor-positioning system here
 * (Figma doesn't define one either), so a real usage wraps this in a
 * `position: relative` container next to whatever it's labeling and
 * shows/hides it however that context needs to (see
 * TooltipVariations.jsx's "Interactive" section for a real hover-driven
 * example built entirely from this component -- no extra positioning
 * component was invented for it).
 *
 * `position` controls both which edge the arrow sits on AND which
 * direction it points (always toward whatever the tooltip is attached
 * to) -- `bottom` puts the arrow on the bubble's top edge pointing up
 * (the tooltip sits below its target), `top` puts it on the bottom edge
 * pointing down, `left`/`right` put it on the near-side edge pointing
 * toward the target. `role="tooltip"` is a real ARIA role, not just a
 * className -- pass `aria-hidden` from the consuming context if it's
 * mounted but not currently shown.
 *
 * forwardRef targets the outer element, so TokenReadout can read
 * live-resolved custom properties off it, same as every other Tier 3
 * component.
 */
export const Tooltip = forwardRef(function Tooltip(
	{ color = "dark", position = "bottom", text = "Tooltip Text", className = "", ...rest },
	ref,
) {
	const arrow = <span className="ap-tooltip-arrow" aria-hidden="true" />;
	const bubble = <span className="ap-tooltip-bubble">{text}</span>;
	// Arrow comes first in the DOM (sits before the bubble) for
	// bottom/right -- see tooltipTokens.js's audit for why each position
	// orders its two children the way it does.
	const arrowFirst = position === "bottom" || position === "right";

	return (
		<div
			ref={ref}
			role="tooltip"
			className={["ap-tooltip", `ap-tooltip--${color}`, `ap-tooltip--${position}`, className]
				.filter(Boolean)
				.join(" ")}
			{...rest}
		>
			{arrowFirst ? arrow : bubble}
			{arrowFirst ? bubble : arrow}
		</div>
	);
});
