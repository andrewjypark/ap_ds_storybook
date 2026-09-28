import React from "react";
import manifest from "../../../tokens/generated/color-manifest.json";
import { ColorScaleSection } from "./ColorScaleSection.jsx";
import "./Color.css";

const findScale = (title) => manifest.scales.find((s) => s.title === title);

/**
 * Shared Tier 1 (primitive) color story bodies -- Color Palettes, Data
 * Viz, Utility, Brand, Neutral, Transparent. Every swatch reads its value
 * live via getComputedStyle at render time (see ColorPalette.jsx), so the
 * exact same component works for every theme -- only the pinned `theme`
 * global differs between "1. Core" / "2. Basil Tier 1" / "3. Molasses Tier 1"
 * in the sidebar (see Color.stories.jsx / ColorBasil.stories.jsx /
 * ColorMolasses.stories.jsx, which just call this with a different theme and
 * re-export the results).
 *
 * All six render through ColorScaleSection -> ColorPalette (tile column +
 * label column, matching ap_ds_storybook's structure exactly) -- including
 * Transparent, which is just a single-family scale (transparent-1/2/3),
 * same as ap_ds_storybook's TransparentColors.jsx.
 *
 * Data Viz used to be a handful of families mixed into "Color Palettes"
 * (Dataviz Orange/Purple/Pale Red Subtle/Pale Red) -- generate-color-
 * manifest.js now splits those into their own "Data Viz" scale entry, so
 * this is just one more findScale() lookup, same rendering path as
 * everything else here.
 *
 * `globals: { theme }` on each story pins that story to render with this
 * theme regardless of the toolbar's current Theme dropdown value -- so
 * "2. Basil Tier 1 / Color" always shows basil even if you arrived on
 * "core". The Viewport global is left alone (not pinned): color tokens
 * don't vary by viewport, so there's nothing to pin.
 */
export function makeTier1ColorStories(theme) {
	return {
		ColorPalettes: {
			globals: { theme },
			render: () => <ColorScaleSection scale={findScale("Color Palettes")} />,
		},
		DataViz: {
			globals: { theme },
			render: () => <ColorScaleSection scale={findScale("Data Viz")} />,
		},
		Utility: {
			globals: { theme },
			render: () => <ColorScaleSection scale={findScale("Utility")} />,
		},
		Brand: {
			globals: { theme },
			render: () => <ColorScaleSection scale={findScale("Brand")} />,
		},
		Neutral: {
			globals: { theme },
			render: () => <ColorScaleSection scale={findScale("Neutral")} />,
		},
		Transparent: {
			globals: { theme },
			render: () => <ColorScaleSection scale={findScale("Transparent")} />,
		},
	};
}

/**
 * Tier 1 dark-diff story bodies -- sibling to makeTier1ColorStories, one
 * level down the LIGHT/DARK axis for Core, and along the THEME axis (same
 * as makeTier1ColorStories's own Basil/Molasses usage) for Basil/Molasses.
 * `theme` here is still "core" / "basil" / "molasses" (matching manifest.
 * tier1DarkDiffs' keys); the actual pinned Storybook theme global is
 * `${theme}_dark` (e.g. "basil_dark") so each story renders under its own
 * `[data-theme="basil_dark"]` block (see build-tokens.js's THEMES cascade)
 * instead of the light theme.
 *
 * Reads manifest.tier1DarkDiffs[theme] instead of manifest.scales:
 *   - "core" is diffed against Core's own LIGHT build (light/dark axis) --
 *     it's the "what does dark mode change at all" reference, so it's the
 *     only one with real content across multiple categories (Color
 *     Palettes/Data Viz/Utility/Brand); Neutral/Transparent turn out
 *     unchanged.
 *   - "basil"/"molasses" are diffed against CORE'S DARK build instead of
 *     their own light build (theme axis, same as manifest.tier2ThemeDiffs
 *     and makeTier1ColorStories's own Basil/Molasses pages) -- since
 *     Color Palettes/Data Viz/Utility/Neutral/Transparent are only ever
 *     touched by tier_1_core_dark (layered identically into every theme's
 *     _dark build), Basil Dark and Molasses Dark resolve those
 *     categories IDENTICALLY to Core Dark, and only "Brand" (the one
 *     category each theme's own _dark set overrides) ever shows up as a
 *     diff -- see generate-color-manifest.js's buildTier1ScaleDiff.
 * ColorBasilDark.stories.jsx / ColorMolassesDark.stories.jsx only export
 * "Brand" from this factory (mirroring ColorBasil.stories.jsx /
 * ColorMolasses.stories.jsx's own Brand-only light pages) rather than
 * exporting all six -- there's no "no differences" page to show for the
 * other five here, since they're never expected to differ, structurally,
 * the same reason those five never appear on Basil/Molasses's light
 * Color - Default page either. ColorDark.stories.jsx (Core) still exports
 * all six, since Core's diff genuinely can and does vary by category.
 */
export function makeTier1ColorDarkStories(theme) {
	const darkScales = manifest.tier1DarkDiffs?.[theme] ?? [];
	const findDarkScale = (title) => darkScales.find((s) => s.title === title) ?? { title, families: [] };
	const darkTheme = `${theme}_dark`;

	return {
		ColorPalettes: {
			globals: { theme: darkTheme },
			render: () => <ColorScaleSection scale={findDarkScale("Color Palettes")} />,
		},
		DataViz: {
			globals: { theme: darkTheme },
			render: () => <ColorScaleSection scale={findDarkScale("Data Viz")} />,
		},
		Utility: {
			globals: { theme: darkTheme },
			render: () => <ColorScaleSection scale={findDarkScale("Utility")} />,
		},
		Brand: {
			globals: { theme: darkTheme },
			render: () => <ColorScaleSection scale={findDarkScale("Brand")} />,
		},
		Neutral: {
			globals: { theme: darkTheme },
			render: () => <ColorScaleSection scale={findDarkScale("Neutral")} />,
		},
		Transparent: {
			globals: { theme: darkTheme },
			render: () => <ColorScaleSection scale={findDarkScale("Transparent")} />,
		},
	};
}
