import React from "react";
import manifest from "../../../tokens/generated/color-manifest.json";
import { ColorGridSection } from "./ColorGridSection.jsx";
import "./Color.css";

/**
 * Shared Tier 2 (semantic) color story bodies -- Content, Background,
 * Border -- reused across all three per-theme sidebar pages
 * (Semantic.stories.jsx / SemanticBasil.stories.jsx /
 * SemanticMolasses.stories.jsx).
 *
 * theme "core" renders the FULL semantic list (manifest.grids -- all 63
 * tokens, unfiltered). "basil"/"molasses" render only the tokens that
 * actually resolve to a different value for that theme (manifest.
 * tier2ThemeDiffs, computed by diffing the built CSS rather than static
 * reference parsing -- most of Content/Background/Border reference
 * color.neutral/color_palettes/utility, which never changes per theme;
 * only the color.brand-referencing entries do). Both lists share the
 * same "Content"/"Background"/"Border" titles (see generate-color-
 * manifest.js), so findGrid works the same way regardless of which one
 * is active -- same component, same classes, just a different
 * (possibly filtered) items array, same pattern as FontWeightScale's
 * `groups` prop for Typography's Basil/Molasses pages.
 */
export function makeTier2SemanticStories(theme) {
	const grids = theme === "core" ? manifest.grids : (manifest.tier2ThemeDiffs?.[theme] ?? []);
	const findGrid = (title) => grids.find((g) => g.title === title) ?? { title, items: [] };

	return {
		Content: {
			globals: { theme },
			render: () => <ColorGridSection grid={findGrid("Content")} />,
		},
		Background: {
			globals: { theme },
			render: () => <ColorGridSection grid={findGrid("Background")} />,
		},
		Border: {
			globals: { theme },
			render: () => <ColorGridSection grid={findGrid("Border")} />,
		},
	};
}

/**
 * Tier 2 dark-diff story bodies -- sibling to makeTier2SemanticStories,
 * one level down the LIGHT/DARK axis for Core, and along the THEME axis
 * (same as makeTier2SemanticStories's own Basil/Molasses usage) for
 * Basil/Molasses. Used by SemanticDark.stories.jsx / SemanticBasilDark.
 * stories.jsx / SemanticMolassesDark.stories.jsx.
 *
 * Reads manifest.tier2DarkDiffs[theme] instead of manifest.grids/
 * tier2ThemeDiffs:
 *   - "core" is diffed against Core's own LIGHT build (light/dark axis)
 *     -- the "what does dark mode change at all" reference, so all three
 *     categories carry real content (Content/Background/Border all
 *     change some tokens going dark).
 *   - "basil"/"molasses" are diffed against CORE'S DARK build instead of
 *     their own light build (theme axis, same as manifest.tier2ThemeDiffs
 *     and makeTier2SemanticStories's own Basil/Molasses pages) -- what's
 *     specific to that theme's dark build, evaluated the same way
 *     tier1DarkDiffs' basil/molasses are for Tier 1 (buildTier1ScaleDiff).
 * `theme` is still "core"/"basil"/"molasses" (matching manifest.
 * tier2DarkDiffs' keys); the pinned Storybook theme global is
 * `${theme}_dark` so each story renders under its own
 * `[data-theme="basil_dark"]`-style block. A category with zero
 * differences falls back to `{ title, items: [] }` via findGrid, and
 * ColorGridSection renders its own "No tokens in this category differ
 * from Core." message for that case -- same as makeTier2SemanticStories.
 */
export function makeTier2SemanticDarkStories(theme) {
	const grids = manifest.tier2DarkDiffs?.[theme] ?? [];
	const findGrid = (title) => grids.find((g) => g.title === title) ?? { title, items: [] };
	const darkTheme = `${theme}_dark`;

	return {
		Content: {
			globals: { theme: darkTheme },
			render: () => <ColorGridSection grid={findGrid("Content")} />,
		},
		Background: {
			globals: { theme: darkTheme },
			render: () => <ColorGridSection grid={findGrid("Background")} />,
		},
		Border: {
			globals: { theme: darkTheme },
			render: () => <ColorGridSection grid={findGrid("Border")} />,
		},
	};
}
