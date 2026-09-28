/**
 * ============================================================================
 * scripts/generate-color-manifest.js
 * ============================================================================
 * Produces tokens/generated/color-manifest.json -- the list of color CSS
 * custom properties the Storybook "Foundations / Color" pages render.
 *
 * WHY THIS EXISTS: ap_ds_storybook's Foundations pages hand-type every
 * token's hex value into a JS array (see BrandColors.jsx there). That does
 * not scale to ap_ui_kit's token set (3 themes x a much larger palette,
 * still growing), and hand-typed values drift from the real tokens the
 * moment someone edits Token Studio. So this project takes the opposite
 * approach end to end:
 *   1. This script extracts ONLY the token names (the --ap-color-* /
 *      --ap-tier-2-color-* custom property names) from the already-built
 *      "core" CSS output -- never a value.
 *   2. The Storybook components import this manifest for the list of
 *      swatches to render, then read each swatch's ACTUAL value at render
 *      time via getComputedStyle(), so whatever the active theme/viewport
 *      globals are, the displayed value is always the real resolved one.
 * This script never re-implements Style Dictionary's own name/kebab
 * transform -- it parses names straight out of Style Dictionary's own
 * output, so there is no way for the manifest's variable names to drift
 * from what build-tokens.js actually generates.
 *
 * Reads build/tier_1_core/css/variables.css (the "core" theme's standalone
 * build) purely as a name source -- tier_2 (semantic) tokens are present in
 * every theme/viewport build because build-tokens.js's BASE_SOURCE includes
 * tier_2.json in all of them, so "core" is as good a source of names as any.
 *
 * manifest.grids is the FULL tier_2 semantic list (Content/Background/
 * Border, all 63 tokens) -- this is what the Core Tier 2 Color page
 * (Semantic.stories.jsx) renders.
 *
 * manifest.tier2ThemeDiffs.{basil,molasses} is the subset of those same tier_2
 * semantic vars whose RESOLVED VALUE actually differs from core for that
 * theme. Most of Content/Background/Border only ever reference
 * color.neutral / color_palettes / utility, which never change per theme
 * -- only entries that ultimately reference color.brand.* do. This is
 * computed by diffing the already-built CSS for each theme against core's,
 * rather than static reference-path parsing, since a value diff is correct
 * regardless of how many levels of {alias} indirection a token goes
 * through. Used by the "Basil Tier 2"/"Molasses Tier 2" sidebar pages so they
 * only show what's actually theme-specific instead of duplicating Core's
 * full semantic list (mirrors the same reasoning already applied to Tier 1,
 * where Basil/Molasses only show "Brand" -- confirmed via tokens/sets/
 * tier_1_basil.json / tier_1_molasses.json that "brand" is the only key their
 * `color` object overrides at all).
 *
 * grids and tier2ThemeDiffs share the exact same TIER2_PREFIXES list (and
 * so the same "Content"/"Background"/"Border" titles) so
 * tier2SemanticStories.jsx can look a grid up by title regardless of
 * whether it's rendering the full Core list or a theme-diffed one --
 * same component, same label, just a different, possibly-filtered items
 * array.
 *
 * manifest.tier1DarkDiffs.{core,basil,molasses} is the Tier 1 (primitive)
 * dark-mode equivalent, but it diffs along TWO DIFFERENT axes depending on
 * the theme, mirroring how manifest.scales (Core, full list) vs
 * tier2ThemeDiffs (Basil/Molasses, diffed against Core) already relate:
 *   - core: diffed along the LIGHT/DARK axis -- Core's own dark build
 *     against Core's own light build. This is the "what does dark mode
 *     change at all" reference page; Core has no other theme to diff
 *     against here.
 *   - basil / molasses: diffed along the THEME axis, same as
 *     tier2ThemeDiffs -- that theme's DARK build against CORE's DARK
 *     build (never against its own light build). Color Palettes/Data
 *     Viz/Utility/Neutral/Transparent are never touched by any theme's
 *     own token set (light or dark) -- only tier_1_core_dark overrides
 *     them, and every `_dark` build layers that same set on top (see
 *     build-tokens.js's THEMES cascade) -- so Basil Dark and Molasses
 *     Dark resolve those categories IDENTICALLY to Core Dark, and only
 *     "Brand" (the one category each theme's own _dark set overrides)
 *     ever shows up as a diff. Confirmed empirically. This is exactly
 *     the same reasoning that already limits Basil/Molasses's light
 *     "Color - Default" page to Brand only -- Color - Dark mirrors it
 *     one axis over instead of inventing a different rule.
 * Reuses the exact same `scales` shape (Color Palettes/Data Viz/Utility/
 * Brand/Neutral/Transparent) as manifest.scales -- the swatch NAMES never
 * change between light and dark or between themes, only which named
 * swatches actually resolve to a different value -- so one shared
 * scales-shaped template, filtered per diff, serves all three. Powers the
 * "Color - Dark" sidebar pages (sibling to "Color - Default" under Tier 1
 * - Core, and under each theme's own Tier 1 page) via
 * makeTier1ColorDarkStories(theme) in tier1ColorStories.jsx.
 *
 * Run after build-tokens.js (see package.json's "build" script). Output is
 * regenerated every time, same as tokens/sets/ and build/ -- not tracked in
 * git (see .gitignore).
 * ============================================================================
 */

import fs from "node:fs";

const CORE_CSS_PATH = "build/tier_1_core/css/variables.css";
const CORE_DARK_CSS_PATH = "build/tier_1_core_dark/css/variables.css";
const THEME_CSS_PATHS = {
	basil: "build/tier_1_basil/css/variables.css",
	molasses: "build/tier_1_molasses/css/variables.css",
	// Internal-only Storybook chrome theme -- see build-tokens.js's THEMES
	// entry and internal/StorybookDS/*.stories.jsx.
	storybook_ds: "build/tier_1_storybook_ds/css/variables.css",
};
const THEME_DARK_CSS_PATHS = {
	basil: "build/tier_1_basil_dark/css/variables.css",
	molasses: "build/tier_1_molasses_dark/css/variables.css",
};
const OUT_DIR = "tokens/generated";
const OUT_PATH = `${OUT_DIR}/color-manifest.json`;

if (!fs.existsSync(CORE_CSS_PATH)) {
	console.error(`\n✘ ${CORE_CSS_PATH} not found -- run "node build-tokens.js" first.\n`);
	process.exit(1);
}

// Matches lines like `  --ap-color-color-palettes-pale-red-0: #fff5f5;`
const varRe = /^\s*(--ap-[a-z0-9-]+):\s*([^;]+);\s*$/gm;

function parseCssVars(cssText) {
	const map = new Map();
	varRe.lastIndex = 0;
	let match;
	while ((match = varRe.exec(cssText))) {
		map.set(match[1], match[2].trim());
	}
	return map;
}

const coreVarsMap = parseCssVars(fs.readFileSync(CORE_CSS_PATH, "utf-8"));
const all = Array.from(coreVarsMap.entries()).map(([cssVar, value]) => ({ cssVar, value }));

const colorVars = all.filter(
	(v) => v.cssVar.startsWith("--ap-color-") || v.cssVar.startsWith("--ap-tier-2-color-"),
);

function titleCase(str) {
	return str
		.split("-")
		.filter(Boolean)
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join(" ");
}

function stripPrefix(cssVar, prefix) {
	return cssVar.slice(prefix.length);
}

// For categories that fan out into named sub-scales (e.g. "Color Palettes"
// contains "Pale Red", "Orange", ... each with its own 0-900 step run).
// The step is always the trailing numeric segment Style Dictionary kept
// from Token Studio (0, 100, 200, ... 900) -- everything before the last
// "-<digits>" is the family name.
function buildFamilyScale(prefix, label) {
	const items = colorVars.filter((v) => v.cssVar.startsWith(prefix));
	const families = new Map();
	for (const item of items) {
		const remainder = stripPrefix(item.cssVar, prefix);
		const match = remainder.match(/^(.+)-(\d+)$/);
		// A family with a numeric step (e.g. "pale-red-500") gets grouped
		// under its family name with that number as the step label. A
		// family with no numeric step (e.g. a standalone "dataviz-orange"
		// token) is its own one-swatch family -- `step: null` tells the
		// component to render it without a redundant step label.
		const familyKey = match ? match[1] : remainder;
		const step = match ? match[2] : null;
		if (!families.has(familyKey)) families.set(familyKey, []);
		families.get(familyKey).push({ step, cssVar: item.cssVar });
	}
	return {
		title: label,
		families: Array.from(families.entries()).map(([key, steps]) => ({
			name: titleCase(key),
			items: steps,
		})),
	};
}

// For categories that are already one flat scale -- rendered as a SINGLE
// ColorPalette (one tile column + one label column), e.g. Neutral (just
// 100-900 plus white/black, no family sub-split) and Transparent (just
// transparent-1/2/3, same layout as ap_ds_storybook's TransparentColors.jsx
// -- ColorPalette doesn't care whether the values are opaque or alpha).
function buildFlatScale(prefix, label) {
	const items = colorVars.filter((v) => v.cssVar.startsWith(prefix));
	return {
		title: label,
		families: [
			{
				name: label,
				items: items.map((item) => ({
					step: titleCase(stripPrefix(item.cssVar, prefix)),
					cssVar: item.cssVar,
				})),
			},
		],
	};
}

// For categories that are a flat list of distinctly-named tokens rendered
// as individual cards rather than a ColorPalette tile/label column pair --
// currently just the tier_2 semantic content/background/border layers.
// `only` (optional) restricts to a specific set of cssVar names -- used
// for the per-theme diff-only grids below.
function buildGrid(prefix, label, only) {
	let items = colorVars.filter((v) => v.cssVar.startsWith(prefix));
	if (only) items = items.filter((v) => only.has(v.cssVar));
	return {
		title: label,
		items: items.map((item) => ({
			label: titleCase(stripPrefix(item.cssVar, prefix)),
			cssVar: item.cssVar,
		})),
	};
}

// Shared by both the full (Core) grids below and the per-theme diffs --
// same prefixes, same titles, so a story can look a grid up by title
// ("Content"/"Background"/"Border") regardless of which list it's reading
// from.
const TIER2_PREFIXES = [
	["--ap-tier-2-color-content-", "Content"],
	["--ap-tier-2-color-background-", "Background"],
	["--ap-tier-2-color-border-", "Border"],
];

// For each non-core theme, diff its build's tier_2 vars against core's and
// keep only the ones whose value actually changed.
function buildTier2ThemeDiff(themeCssPath) {
	if (!fs.existsSync(themeCssPath)) {
		console.warn(`  (skipping theme diff -- ${themeCssPath} not found)`);
		return null;
	}
	const themeVarsMap = parseCssVars(fs.readFileSync(themeCssPath, "utf-8"));
	const changedVars = new Set();
	for (const [cssVar, value] of themeVarsMap) {
		if (cssVar.startsWith("--ap-tier-2-color-") && coreVarsMap.get(cssVar) !== value) {
			changedVars.add(cssVar);
		}
	}
	return TIER2_PREFIXES.map(([prefix, label]) => buildGrid(prefix, label, changedVars)).filter(
		(grid) => grid.items.length > 0,
	);
}

// Tier 1 dark-mode diff: same `scales` shape as manifest.scales (families
// of {step, cssVar} items), filtered down to only the items whose value
// actually changed. Keeps every family/scale TITLE even when it ends up
// empty (rather than dropping it) so the sidebar page still exists and can
// show ColorScaleSection's "no differences" message -- same precedent as
// ColorGridSection's tier_2 empty state.
function filterScaleByDiff(scale, changedVars) {
	return {
		title: scale.title,
		families: scale.families
			.map((family) => ({
				name: family.name,
				items: family.items.filter((item) => changedVars.has(item.cssVar)),
			}))
			.filter((family) => family.items.length > 0),
	};
}

// Diffs `compareCssPath` against `baselineCssPath` and applies
// filterScaleByDiff to every scale in `scalesTemplate`. Which two builds
// to pass depends on which axis this diff is along (see the
// tier1DarkDiffs doc comment up top):
//   - Core's own dark diff: baseline = Core light, compare = Core dark
//     (the light/dark axis -- what changes when Core itself goes dark).
//   - Basil/Molasses's dark diff: baseline = Core dark, compare = that
//     theme's own dark build (the theme axis, same shape as
//     buildTier2ThemeDiff -- what's specific to this theme, evaluated on
//     the dark builds instead of the light ones).
// Returns null (with a console warning, same as buildTier2ThemeDiff) if
// the compare build doesn't exist yet.
function buildTier1ScaleDiff(baselineCssPath, compareCssPath, scalesTemplate) {
	if (!fs.existsSync(compareCssPath)) {
		console.warn(`  (skipping Tier 1 dark diff -- ${compareCssPath} not found)`);
		return null;
	}
	const baselineVarsMap =
		baselineCssPath === CORE_CSS_PATH ? coreVarsMap : parseCssVars(fs.readFileSync(baselineCssPath, "utf-8"));
	const compareVarsMap = parseCssVars(fs.readFileSync(compareCssPath, "utf-8"));
	const changedVars = new Set();
	for (const [cssVar, value] of compareVarsMap) {
		if (
			(cssVar.startsWith("--ap-color-") || cssVar.startsWith("--ap-tier-2-color-")) &&
			baselineVarsMap.get(cssVar) !== value
		) {
			changedVars.add(cssVar);
		}
	}
	return scalesTemplate.map((scale) => filterScaleByDiff(scale, changedVars));
}

// "Data Viz" used to live inside "Color Palettes" as a handful of
// single-swatch families (Dataviz Orange/Purple/Pale Red Subtle/Pale Red
// -- no numeric step, so buildFamilyScale already treats each as its own
// one-swatch family). Split those out into their own scale/page instead
// of teaching buildFamilyScale a "dataviz" special case -- same
// rendering path (ColorScaleSection -> ColorPalette), just a different
// `scales` entry. Family names come out of buildFamilyScale already
// title-cased ("Dataviz Orange", ...), so the split matches on that
// prefix. Confirmed identical across all three themes (core/basil/molasses),
// same as everything else "Color Palettes" carries -- so, like Utility/
// Neutral/Transparent, this only needs to appear on the Core Color page,
// not duplicated onto Basil/Molasses Tier 1's pages.
const colorPalettesScale = buildFamilyScale("--ap-color-color-palettes-", "Color Palettes");
const dataVizFamilies = colorPalettesScale.families.filter((f) => f.name.startsWith("Dataviz"));
colorPalettesScale.families = colorPalettesScale.families.filter((f) => !f.name.startsWith("Dataviz"));
const dataVizScale = { title: "Data Viz", families: dataVizFamilies };

// Shared by manifest.scales AND every Tier 1 dark diff below -- swatch
// NAMES never change between light/dark or between themes, only which
// ones resolve to a different value, so one scales-shaped template
// suffices as the diff input for Core/Basil/Molasses alike.
const scales = [
	colorPalettesScale,
	dataVizScale,
	buildFamilyScale("--ap-color-utility-", "Utility"),
	buildFamilyScale("--ap-color-brand-", "Brand"),
	buildFlatScale("--ap-color-neutral-", "Neutral"),
	// Renders as a ColorPalette (tile column + label column), same as
	// ap_ds_storybook's TransparentColors.jsx -- not a "grid" card.
	buildFlatScale("--ap-color-transparent-", "Transparent"),
];

const manifest = {
	generatedFrom: CORE_CSS_PATH,
	scales,
	grids: TIER2_PREFIXES.map(([prefix, label]) => buildGrid(prefix, label)),
	tier2ThemeDiffs: {
		basil: buildTier2ThemeDiff(THEME_CSS_PATHS.basil),
		molasses: buildTier2ThemeDiff(THEME_CSS_PATHS.molasses),
		storybook_ds: buildTier2ThemeDiff(THEME_CSS_PATHS.storybook_ds),
	},
	tier1DarkDiffs: {
		// Light/dark axis: what changes when Core itself goes dark.
		core: buildTier1ScaleDiff(CORE_CSS_PATH, CORE_DARK_CSS_PATH, scales),
		// Theme axis (against Core DARK, not against their own light
		// build): what's specific to this theme's dark build. Comes out to
		// Brand only, in practice -- same as their light Color - Default.
		basil: buildTier1ScaleDiff(CORE_DARK_CSS_PATH, THEME_DARK_CSS_PATHS.basil, scales),
		molasses: buildTier1ScaleDiff(CORE_DARK_CSS_PATH, THEME_DARK_CSS_PATHS.molasses, scales),
	},
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(manifest, null, 2) + "\n");
const diffCounts = Object.entries(manifest.tier2ThemeDiffs)
	.map(([theme, grids]) => `${theme}=${grids ? grids.reduce((n, g) => n + g.items.length, 0) : "n/a"}`)
	.join(", ");
const darkDiffCounts = Object.entries(manifest.tier1DarkDiffs)
	.map(
		([theme, scaleList]) =>
			`${theme}=${scaleList ? scaleList.reduce((n, s) => n + s.families.reduce((m, f) => m + f.items.length, 0), 0) : "n/a"}`,
	)
	.join(", ");
console.log(
	`✔︎ ${OUT_PATH} (${colorVars.length} color tokens; Color Palettes families: ${colorPalettesScale.families.length}, Data Viz families: ${dataVizScale.families.length}; ` +
		`tier_2 full grids -- ${manifest.grids.map((g) => `${g.title}: ${g.items.length}`).join(", ")}; ` +
		`tier_2 diffs: ${diffCounts}; tier_1 dark diffs: ${darkDiffCounts})`,
);
