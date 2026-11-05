/**
 * Vanilla-JS sibling of components/Components/ViewportSync/ViewportSync.jsx --
 * same breakpoints, same single job (keep `data-viewport` on `<html>` in
 * sync with the real browser width), for pages with no React runtime to
 * mount that component in (a plain static HTML site, e.g.).
 *
 * Every responsive token in this package (Tier 1 font sizes/line heights,
 * the Tier 2 composite typography styles, etc.) is scoped entirely by
 * `[data-theme][data-viewport]` attribute selectors in the compiled CSS --
 * there is no `@media` query doing the switching. Without something
 * setting `data-viewport` at runtime, it just sits on whatever value the
 * markup gave it (commonly hardcoded to "desktop") no matter how the
 * window is resized afterward.
 *
 * Usage -- include this script, nothing else required:
 *
 *   <script src="https://cdn.jsdelivr.net/npm/ap-ds-storybook@<version>/styles/viewport-sync.js"></script>
 *
 * It runs once immediately (IIFE -- no DOMContentLoaded wait needed since
 * it only ever touches `<html>`, which already exists by the time any
 * <script> tag executes) and again on every `resize`. It does NOT touch
 * `data-theme` -- theme selection is a deliberate choice for the consuming
 * page to make, not something to infer from viewport width, same as the
 * React version.
 *
 * `mobileMax`/`tabletMax` default to 767/991 -- the same values
 * ViewportSync.jsx defaults to. Keep the two in sync if either ever
 * changes. Override by setting `window.apViewportSyncConfig =
 * { mobileMax, tabletMax }` in an inline <script> BEFORE this one loads.
 */
(function () {
	var config = window.apViewportSyncConfig || {};
	var mobileMax = typeof config.mobileMax === "number" ? config.mobileMax : 767;
	var tabletMax = typeof config.tabletMax === "number" ? config.tabletMax : 991;

	function update() {
		var width = window.innerWidth;
		var viewport = width <= mobileMax ? "mobile" : width <= tabletMax ? "tablet" : "desktop";
		document.documentElement.setAttribute("data-viewport", viewport);
	}

	update();
	window.addEventListener("resize", update);
})();
