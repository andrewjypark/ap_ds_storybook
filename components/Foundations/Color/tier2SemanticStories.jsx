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
 * one level down the LIGHT/DARK axis instead of the theme axis. Currently
 * only wired up for "core" (SemanticDark.stories.jsx), same scope as the
 * user's ask -- Basil/Molasses Tier 2 Dark can reuse this exact factory
 * later the same way makeTier2SemanticStories already handles all three
 * themes, once manifest.tier2DarkDiffs grows a "basil"/"molasses" entry.
 *
 * Reads manifest.tier2DarkDiffs[theme] instead of manifest.grids/
 * tier2ThemeDiffs -- for "core" this is Core's own dark build diffed
 * against Core's own light build (generate-color-manifest.js reuses
 * buildTier2ThemeDiff for this -- passing Core's dark CSS path in place
 * of a different theme's light CSS path diffs it against coreVarsMap
 * exactly the same way). `theme` is still "core" (matching manifest.
 * tier2DarkDiffs' keys); the pinned Storybook theme global is
 * `${theme}_dark` so the story renders under `[data-theme="core_dark"]`.
 * A category with zero differences falls back to `{ title, items: [] }`
 * via findGrid, same as makeTier2SemanticStories, and ColorGridSection
 * renders its own "No tokens in this category differ from Core." message
 * for that case -- reused as-is even though this diff isn't against Core,
 * it's against this same theme's own light build; still accurate in
 * spirit ("no differences from the light version of this page").
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
