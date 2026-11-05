import React from "react";
import { linkVar } from "./linkTokens.js";
import "./Link.css";

/**
 * Tier 3 Link. Colors come from the real "--ap-link-color-*" custom
 * properties build-tokens.js generates from tokens.json's "tier_3/link"
 * set -- default/hover/active map onto the real :hover/:active pseudo-
 * classes, and visited uses the browser-native :visited pseudo-class
 * (not a prop) so real navigation history drives it, same as any plain
 * <a> -- see the note below on why that's still privacy-safe. This
 * mirrors Button.jsx's own approach: state vars get computed once and
 * set on the instance, Link.css's selectors just pick the right one.
 *
 * knockout -> swap to the "knockout" variant's token set (the generated
 * "--ap-link-color-knockout-*" vars, meant for dark/image backgrounds)
 * instead of the default "content" variant. Andrew's call (2026-11-04):
 * visited currently resolves to the SAME value as default in both
 * variants -- tokens.json's tier_3/link set is the place to change that
 * later if he wants visited links to look different.
 *
 * forceState -> DOCS-ONLY escape hatch to render a static Hover/Active/
 * Visited swatch without a real mouse interaction or an actually-
 * visited href -- never pass this in real product usage (same
 * convention as Button.jsx's forceState).
 *
 * Note on :visited -- browsers deliberately restrict what CSS can read
 * back from a visited link for privacy reasons (and JS can't read it at
 * all), but a small allow-list of properties -- color among them -- can
 * still be SET via :visited, which is all this component's tokens do.
 */
export const Link = React.forwardRef(function Link(
	{ knockout = false, forceState, children, ...rest },
	ref,
) {
	const variant = knockout ? "knockout" : "content";
	const stateVars = {};
	for (const state of ["default", "hover", "active", "visited"]) {
		stateVars[`--link-color-${state}`] = `var(${linkVar.color(variant, state)})`;
	}

	return (
		<a
			ref={ref}
			className="ap-link"
			data-knockout={knockout || undefined}
			data-force-state={forceState}
			style={stateVars}
			{...rest}
		>
			{children}
		</a>
	);
});
