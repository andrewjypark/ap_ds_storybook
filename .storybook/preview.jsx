import React from "react";
import "../assets/fonts/novela/novela.css";
import "../assets/fonts/twk-lausanne/twk-lausanne.css";
import "../assets/fonts/twk-continental/twk-continental.css";
import "../assets/fonts/basier-circle/basier-circle.css";
import "../assets/fonts/basier-square/basier-square.css";
import "../assets/fonts/basier-square-mono/basier-square-mono.css";
import "../assets/fonts/nudica/nudica.css";
import "../assets/fonts/quablo/quablo.css";
import "../assets/fonts/bricolage-grotesque/bricolage-grotesque.css";
// tier_1_storybook_ds's font1/font2/font3 -- internal-only theme (see
// internal/StorybookDS/*.stories.jsx), imported globally here same as
// every other font so it's available wherever `--ap-font-families-*`
// resolves to it, not just on the internal pages themselves.
import "../assets/fonts/inter/inter.css";
import "../assets/fonts/ibm-plex-mono/ibm-plex-mono.css";
import "../assets/fonts/archivo-semiexpanded/archivo-semiexpanded.css";
import "../build/all-combinations/css/variables.css";
import "./preview.css";
import { TokenPreviewContext } from "../components/TokenPreviewContext.jsx";

/**
 * ap_ui_kit has TWO independent toggleable dimensions (ap_ds_storybook only
 * has one, Theme) -- see build-tokens.js. build/all-combinations/css/
 * variables.css has one block per (theme, viewport) pair -- 9 total --
 * each scoped by a COMPOUND selector (`[data-theme="green"][data-viewport
 * ="mobile"]`, etc.), so an element matches exactly one block whenever
 * BOTH attributes are present on it. Every token in the project (color,
 * border, typography, everything) lives inside one of these 9 blocks now
 * -- there's no more single-axis `[data-theme="green"]`-only or
 * `[data-viewport="mobile"]`-only fallback -- so `data-viewport` must
 * always be present wherever `data-theme` is, or NOTHING resolves there.
 *
 * NOTE: Theme's toolbar dropdown is deliberately NOT exposed -- its
 * Green/Gold options are redundant with the dedicated "Tier 1 - Green"/
 * "Tier 1 - Gold"/"Tier 2 - Green"/"Tier 2 - Gold" sidebar pages (each pins
 * its own `globals: {theme}` on the story object, which works with or
 * without a toolbar UI for it).
 *
 * There is deliberately NO toolbar/global for viewport at all. An earlier
 * version of this file exposed one (as a `deviceScale` global, named to
 * avoid colliding with Storybook's own reserved "viewport" global/addon --
 * see git history if that collision needs revisiting for something else
 * later). It was removed because a Storybook-wide toolbar control is the
 * wrong shape for this: viewport only ever affects Font Size and Line
 * Height -- Color, Border, Letter Spacing, Font Weight, and Font Family
 * never read a viewport-scoped token -- so a global toggle would show up
 * doing nothing on every other page in the project. Font Size and Line
 * Height now carry their OWN local Mobile/Tablet/Desktop toggle instead
 * (see ViewportPreviewPanel.jsx), scoped to exactly the two pages where it
 * matters. `data-viewport` below is fixed at "desktop" -- every OTHER
 * token type resolves identically no matter which viewport is active (the
 * viewport sets only ever redirect fontSize/lineHeights' headingScale/
 * bodyTextScale aliases), so "desktop" here is just a stable default for
 * everything outside those two pages; ViewportPreviewPanel overrides it
 * locally for its own subtree via a nested TokenPreviewContext.Provider,
 * independent of this fixed value.
 */
const withTokenAttributes = (Story, context) => {
	const { theme } = context.globals;
	const viewport = "desktop";
	return (
		<TokenPreviewContext.Provider value={{ theme, viewport }}>
			{/* .ap-storybook-canvas (./preview.css) carries this wrapper's
			    padding -- 1.5rem by default, 0.5rem at <=768px via a media
			    query -- as a real class instead of an inline style, since an
			    inline style can't be narrowed by a media query. */}
			<div data-theme={theme} data-viewport={viewport} className="ap-storybook-canvas">
				<Story />
			</div>
		</TokenPreviewContext.Provider>
	);
};

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
	// Project-wide "autodocs" tag -- same as ap_ds_storybook's
	// .storybook/preview.jsx. main.js's default docs.autodocs setting
	// ("tag") only auto-generates a "Docs" sidebar entry for stories
	// carrying this tag; setting it once here at the top level applies it
	// to every story in the project (current and future) instead of
	// adding it file by file.
	tags: ["autodocs"],
	decorators: [withTokenAttributes],
	globalTypes: {
		theme: {
			name: "Theme",
			description: "Color theme (tier_1_core / tier_1_green / tier_1_gold)",
		},
	},
	initialGlobals: {
		theme: "core",
	},
	parameters: {
		// Hides Storybook's own built-in device-preview toolbar tool (the
		// "Small mobile" / W x H control) -- a core Storybook feature,
		// unrelated to anything of ours, present in ap_ds_storybook too
		// (neither project installs @storybook/addon-viewport or otherwise
		// configures it beyond this). Disabling it here removes the whole
		// control from the toolbar so its selection can't drift from
		// browser to browser via localStorage.
		viewport: {
			disable: true,
		},
		options: {
			storySort: {
				// Needed so the Tier 3 sibling order below actually works: every
				// Tier 3 component now shares the exact same bare title ("Tier 3:
				// Components"), so without includeNames the array-based sort
				// algorithm treats their titles as identical and falls straight
				// through to a stable/no-op comparison (raw file-discovery order,
				// which happens to look alphabetical) -- it never even looks at
				// each story's own name. includeNames appends each story's name
				// as one more path segment before comparing, which is what makes
				// the ["Button", "Icon", ...] list under "Tier 3: Components"
				// below actually apply. Confirmed against Storybook's own
				// storySort source (node_modules/storybook/dist/_browser-chunks
				// -- search "STORY_KIND_PATH_SEPARATOR"); harmless for Tier 1/
				// Tier 2 since their titles already fully disambiguate before
				// name comparison would ever matter.
				includeNames: true,
				// Tier 1 and Tier 2 were originally nested under a shared
				// "Tokens" group; ungrouped so each tier is its own top-level
				// sidebar entry, a peer of Tier 3 rather than a child of a
				// wrapper group. Mirrors Tier 1's own tree: Core first, then
				// the two themes as their own pinned-theme pages -- for BOTH
				// Tier 1: Global Tokens and Tier 2: Semantic Tokens. Tier 2
				// originally had no "Core" entry (only Green Tier 2/Gold Tier 2
				// existed, mirroring ap_ds_storybook not having a "Core Tier
				// 2"), but that left the full, undiffed semantic list with
				// nowhere to render -- Core is the base every theme diffs
				// against, so it needs a page here just like Tier 1's does.
				order: [
					"Tier 1: Global Tokens",
					[
						// Pin Tier 1 - Core's own children too: without this, Color/
						// Typography/Border fall back to alphabetical order (Border,
						// Color, Typography), which is why Border used to show up first.
						"Tier 1 - Core",
						["Color", "Typography", "Border"],
						// Green/Gold live under a "Themes" subgroup, sibling to Core
						// (and to Storybook DS - Internal, unpinned below) -- keeps the
						// two theme variants visually grouped instead of loose peers of
						// Core. Names here must match each story's actual title segment
						// exactly (underscore, not space -- "Green_Theme"/"Gold_Theme")
						// or storySort silently falls back to alphabetical for that node.
						"Themes",
						[
							"Tier 1 - Green_Theme",
							["Color", "Typography"],
							"Tier 1 - Gold_Theme",
							["Color", "Typography"],
						],
					],
					"Tier 2: Semantic Tokens",
					[
						"Tier 2 - Core",
						"Themes",
						[
							"Tier 2 - Green_Theme",
							["Color", "Typography"],
							"Tier 2 - Gold_Theme",
							["Color", "Typography"],
						],
					],
					// Tier 3: real, usable components (not token-definition pages) --
					// see Button.stories.jsx. "Tier 3: Components" is a real root
					// here (bold, same level/position as Tier 1/Tier 2) because no
					// story's title is ever just that bare string -- every
					// component's .stories.jsx instead shares the title
					// "Tier 3: Components/Components" one level deeper (tags:
					// ["!autodocs"] cancels the project-wide autodocs tag for that
					// file, so no separate "Docs" entry is generated either) and
					// exports one story named after itself -- that's what puts
					// each component directly inside the one "Components" folder
					// as its own flat, clickable page (no further sub-group, no
					// Docs tab, no twisty of its own). Costs one extra click to
					// open "Components" itself, in exchange for "Tier 3:
					// Components" behaving like a proper root instead of an
					// ordinary top-level item Storybook always renders above named
					// roots regardless of storySort. Since every component shares
					// one title, the ["Button", "Icon", ...] order below only
					// takes effect because of includeNames: true above -- without
					// it, storySort never even looks at each story's own name once
					// their titles already match.
					"Tier 3: Components",
					[
						"Components",
						["Button", "Icon", "Segment Group", "Dropdown", "Text Input", "Modal", "Checkbox", "Table", "Tooltip"],
					],
				],
			},
		},
	},
};

export default preview;
