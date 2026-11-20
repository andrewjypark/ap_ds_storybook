"use client";

import { useEffect, useLayoutEffect } from "react";
import { ViewportSync } from "../ViewportSync/ViewportSync.jsx";

// Every --ap-* token, scoped to [data-theme][data-viewport] selector blocks.
import "../../../build/all-combinations/css/variables.css";

// @font-face declarations for every theme's fonts. Browsers only download a
// font file when text on the page actually uses that family, so importing
// all of them is cheap: the active theme's fonts load, the rest never do.
// This means switching themes never needs a matching font import.
import "../../../assets/fonts/archivo-semiexpanded/archivo-semiexpanded.css";
import "../../../assets/fonts/basier-circle/basier-circle.css";
import "../../../assets/fonts/basier-square/basier-square.css";
import "../../../assets/fonts/basier-square-mono/basier-square-mono.css";
import "../../../assets/fonts/bricolage-grotesque/bricolage-grotesque.css";
import "../../../assets/fonts/ibm-plex-mono/ibm-plex-mono.css";
import "../../../assets/fonts/inter/inter.css";
import "../../../assets/fonts/novela/novela.css";
import "../../../assets/fonts/nudica/nudica.css";
import "../../../assets/fonts/quablo/quablo.css";
import "../../../assets/fonts/twk-continental/twk-continental.css";
import "../../../assets/fonts/twk-lausanne/twk-lausanne.css";

// useLayoutEffect sets the theme before the browser paints; fall back to
// useEffect during server rendering, where there's no DOM.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * One-stop setup for a consuming app. Wrap the app's content in this once
 * (the root layout's <body> is the usual spot) and it:
 *
 *   1. imports the token CSS and every theme's font files,
 *   2. sets `data-theme` on <html>,
 *   3. mounts <ViewportSync /> to keep `data-viewport` on <html> correct.
 *
 * Both attributes go on <html> (not a wrapper div) because the compiled CSS
 * needs `data-theme` and `data-viewport` on the SAME element, and
 * ViewportSync writes `data-viewport` to <html>. Putting them there also
 * means tokens work on <body> itself (background, default font, etc.).
 *
 *   <body>
 *     <ApProvider theme="core_dark">{children}</ApProvider>
 *   </body>
 *
 * `theme`: core, basil, molasses, or any of their _dark / _dark_bg_neutral
 * variants. Changing the prop at runtime switches the theme live.
 *
 * `mobileMax` / `tabletMax` are passed straight through to ViewportSync.
 *
 * base.css is NOT imported here on purpose -- it stays opt-in:
 *   import "ap-ds-storybook/styles/base.css";
 */
export function ApProvider({ theme = "core", mobileMax, tabletMax, children }) {
	useIsomorphicLayoutEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<>
			<ViewportSync mobileMax={mobileMax} tabletMax={tabletMax} />
			{children}
		</>
	);
}
