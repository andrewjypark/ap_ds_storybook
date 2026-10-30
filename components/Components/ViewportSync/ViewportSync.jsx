"use client";

import { useEffect } from "react";

/**
 * Keeps `data-viewport` on `<html>` in sync with the real browser width.
 *
 * Every responsive token in this package (Tier 1 font sizes/line heights,
 * the Tier 2 composite typography styles, etc.) is scoped entirely by
 * `[data-theme][data-viewport]` attribute selectors in the compiled CSS --
 * there is no `@media` query doing the switching. That means `data-viewport`
 * has to be kept correct by something at runtime, or it just sits on
 * whatever value it was given once (commonly hardcoded to "desktop" per
 * the install guide) no matter how the window is resized afterward.
 *
 * Mount this once, anywhere in the tree (root layout is the usual spot).
 * It renders nothing -- it only ever writes the `data-viewport` attribute
 * onto `document.documentElement` on mount and on every resize. It does
 * NOT touch `data-theme`; theme selection is a deliberate choice for the
 * consuming app to make, not something to infer from viewport width.
 *
 * `mobileMax`/`tabletMax` are the upper-bound widths (inclusive, in px)
 * for the "mobile" and "tablet" buckets -- anything above `tabletMax`
 * resolves to "desktop". Defaults are the common web convention (also
 * what Storybook's own Mobile/Tablet/Desktop viewport button uses to
 * preview these tokens); override them per project if needed.
 */
export function ViewportSync({ mobileMax = 767, tabletMax = 991 } = {}) {
	useEffect(() => {
		const update = () => {
			const width = window.innerWidth;
			const viewport = width <= mobileMax ? "mobile" : width <= tabletMax ? "tablet" : "desktop";
			document.documentElement.setAttribute("data-viewport", viewport);
		};

		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, [mobileMax, tabletMax]);

	return null;
}
