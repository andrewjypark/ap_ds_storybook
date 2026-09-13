import React from "react";
import { buttonVar } from "./buttonTokens.js";
import { Icon } from "./Icon.jsx";
import "./Button.css";

/**
 * Tier 3 Button. Props map directly onto the real Figma component's
 * variant/boolean properties (see the project doc's Figma button audit):
 *   priority                                 -> Type ("Text Only" == "ghost")
 *   size                                     -> Size
 *   radius                                   -> Border-Radius
 *   showLeftIcon / showRightIcon / showText  -> the three boolean props
 *   disabled                                 -> real HTML disabled (drives
 *                                                the Disabled state)
 *   forceState                               -> DOCS-ONLY escape hatch to
 *                                                render a static Hover/
 *                                                Clicked swatch without a
 *                                                real mouse interaction
 *                                                (see Button.css) -- never
 *                                                pass this in real product
 *                                                usage; real interaction
 *                                                (:hover/:active/:disabled)
 *                                                already works without it.
 *
 * Colors/padding/radius/min-width/font all come from the real
 * "--ap-button-*" custom properties build-tokens.js generates from
 * tokens.json's "tier_3/buttons" set -- nothing here is a hand-typed
 * value. Each priority's four states are wired as CSS custom properties
 * on the instance itself (--btn-bg-default/-hover/-active/-disabled etc.)
 * -- Button.css's :hover/:active/:disabled/[data-force-state] rules just
 * select the right one, so the SAME component is both a real interactive
 * button (today, in this Storybook, and later wherever it's actually
 * used) and, via forceState, a static state swatch for documentation.
 *
 * forwardRef so a parent (e.g. ButtonVariations.jsx's swatch wrapper) can
 * read the real, live-resolved custom property values straight off this
 * exact DOM node for a token readout -- see TokenReadout.jsx.
 */
export const Button = React.forwardRef(function Button(
	{
		priority = "primary",
		size = "medium",
		radius = "sm",
		showLeftIcon = false,
		showRightIcon = false,
		showText = true,
		disabled = false,
		forceState,
		children = "Button",
		...rest
	},
	ref,
) {
	const stateVars = {};
	for (const state of ["default", "hover", "active", "disabled"]) {
		stateVars[`--btn-bg-${state}`] = `var(${buttonVar.color(priority, state, "background")})`;
		stateVars[`--btn-border-${state}`] = `var(${buttonVar.color(priority, state, "border")})`;
		stateVars[`--btn-text-${state}`] = `var(${buttonVar.color(priority, state, "text")})`;
	}

	return (
		<button
			ref={ref}
			type="button"
			className="ap-button"
			disabled={disabled}
			data-force-state={forceState}
			style={{
				...stateVars,
				borderRadius: `var(${buttonVar.radius(radius)})`,
				borderWidth: `var(${buttonVar.borderWidth(1)})`,
				minWidth: `var(${buttonVar.minWidth(size)})`,
				paddingBlock: `var(${buttonVar.padding(size)})`,
				paddingInline: `var(${buttonVar.textPaddingHorizontal(size)})`,
				font: `var(${buttonVar.text(size)})`,
			}}
			{...rest}
		>
			{showLeftIcon && <Icon size={14} />}
			{showText && <span className="ap-button-label">{children}</span>}
			{showRightIcon && <Icon size={14} />}
		</button>
	);
});
