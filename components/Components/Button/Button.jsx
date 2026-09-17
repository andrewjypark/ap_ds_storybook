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
 *   leftIcon / rightIcon                     -> override the rendered icon
 *                                                node (defaults to the
 *                                                placeholder <Icon/>) --
 *                                                matches Figma's real
 *                                                instance-swap icon slot
 *                                                (see the Figma button
 *                                                audit: "two nested icon
 *                                                slots... instance-swap");
 *                                                added so CodeBlock.jsx's
 *                                                Copy/Show-code buttons
 *                                                could use their own icons
 *                                                while still being real
 *                                                <Button>s, not a one-off
 *                                                CodeBlock-only prop.
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
		leftIcon,
		rightIcon,
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
				// Figma's root frame pads all four sides equally with the
				// SAME value (see the button layer-structure audit) -- the
				// old code split this into paddingBlock/paddingInline using
				// two DIFFERENT tokens, which conflated the root's own
				// padding with button_text_container's separate inner
				// padding. Uniform padding here; the text container below
				// now owns its own horizontal inset.
				padding: `var(${buttonVar.padding(size)})`,
				font: `var(${buttonVar.text(size)})`,
			}}
			{...rest}
		>
			{/* left_button_icon_container / right_button_icon_container from
			    Figma -- previously collapsed into a bare <Icon>, so the
			    fixed per-size icon slot (width/height, independent of the
			    icon glyph's own drawn size) had nowhere to live. */}
			{showLeftIcon && (
				<span
					className="ap-button-icon-container"
					style={{
						width: `var(${buttonVar.iconWidth(size)})`,
						height: `var(${buttonVar.iconHeight(size)})`,
					}}
				>
					{leftIcon || <Icon />}
				</span>
			)}
			{/* button_text_container from Figma -- a fixed-height row with
			    its own horizontal padding, independent from the button's
			    outer padding above. Previously collapsed into a bare
			    <span className="ap-button-label">. */}
			{showText && (
				<span
					className="ap-button-text-container"
					style={{
						height: `var(${buttonVar.textContainerHeight(size)})`,
						paddingInline: `var(${buttonVar.textPaddingHorizontal(size)})`,
					}}
				>
					<span className="ap-button-label">{children}</span>
				</span>
			)}
			{showRightIcon && (
				<span
					className="ap-button-icon-container"
					style={{
						width: `var(${buttonVar.iconWidth(size)})`,
						height: `var(${buttonVar.iconHeight(size)})`,
					}}
				>
					{rightIcon || <Icon />}
				</span>
			)}
		</button>
	);
});
