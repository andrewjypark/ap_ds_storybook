import React from "react";
import { iconVar } from "./iconTokens.js";
import "./Icon.css";

/**
 * Shared, token-sized icon wrapper. This is the ONE place in the project
 * that should ever import an icon component directly from "react-icons/
 * fa6" and hand it to consumers -- everywhere else, pass the icon
 * component in via the `icon` prop, e.g.:
 *
 *   import { FaRegCirclePlus } from "react-icons/fa6";
 *   <Icon icon={FaRegCirclePlus} size="medium" />
 *
 * Keeping react-icons behind this one prop (rather than every component
 * importing straight from "react-icons/fa6" itself) means swapping icon
 * sets later, or adding a second one alongside fa6, only ever touches
 * call sites' `icon` prop values, not this component's own logic.
 *
 * STYLE CONVENTION -- Regular by default, Solid as the fallback: Font
 * Awesome 6 ships several visual styles (Solid, Regular, Light, Thin,
 * Duotone, ...), but react-icons/fa6 only includes what Font Awesome
 * FREE ships, which is Solid (the full-fill default -- every icon has
 * one, exported as plain `Fa<Name>`) and Regular (the outline style --
 * only ~164 icons have one, exported as `FaReg<Name>`; Light/Thin/Duotone
 * are Pro-only and aren't in this package at all). Regular's coverage
 * skews toward "content" glyphs (star, heart, user, envelope, calendar,
 * clock, file, folder, circle-check, trash-can, pen-to-square, ...) --
 * most UI-chrome icons (chevrons, arrows, plus/minus, gear, bars,
 * magnifying-glass, lock, filter) have NO Regular cut and are Solid-only.
 *
 * This project's convention: default to `FaReg<Name>` (Regular/outline)
 * whenever it exists; fall back to the plain `Fa<Name>` (Solid) only when
 * it doesn't. There's no single runtime "style" prop that switches this
 * for you -- Solid and Regular are different react-icons components, so
 * the choice is made at the import site. Before adding a new icon,
 * check whether `FaReg<Name>` exists (see the fa6 gallery linked from
 * this component's Storybook "About" section) and prefer it; note in a
 * comment when a glyph is Solid out of necessity rather than choice
 * (see Button/Icon.jsx, TextInput/Icon.jsx, and CodeBlock.jsx for
 * examples of both cases).
 *
 * Sizing: `size` selects one of the small/medium/large steps in
 * tokens.json's "tier_3/icon" set (see iconTokens.js) -- NOT react-icons'
 * own `size`/`font-size`-based sizing convention, which this component
 * deliberately overrides via Icon.css's `.ap-icon svg { width: 100%;
 * height: 100% }` rule. That's what keeps every icon rendered through
 * this component at a consistent, container-driven size regardless of
 * the underlying glyph's own internal viewBox proportions (see Icon.css
 * for the full explanation) -- pass a raw react-icons component directly
 * elsewhere and you lose that guarantee.
 *
 * Accessibility: an icon is decorative by default (aria-hidden, and the
 * underlying svg already carries focusable="false"/aria-hidden via
 * react-icons). Pass `aria-label` when the icon is the ONLY content of an
 * interactive control (e.g. an icon-only button) and needs an accessible
 * name -- this switches the wrapper to `role="img"` with that label
 * instead of hiding it.
 */
export const Icon = React.forwardRef(function Icon(
	{ icon: IconComponent, size = "medium", className, style, "aria-label": ariaLabel, ...rest },
	ref,
) {
	if (!IconComponent) return null;
	const isDecorative = !ariaLabel;

	return (
		<span
			ref={ref}
			className={className ? `ap-icon ${className}` : "ap-icon"}
			style={{
				width: `var(${iconVar.size(size)})`,
				height: `var(${iconVar.size(size)})`,
				...style,
			}}
			role={isDecorative ? undefined : "img"}
			aria-label={ariaLabel}
			aria-hidden={isDecorative || undefined}
			{...rest}
		>
			<IconComponent aria-hidden="true" focusable="false" />
		</span>
	);
});
