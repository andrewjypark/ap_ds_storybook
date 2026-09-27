import React from "react";
import { ColorPalette } from "./ColorPalette.jsx";

/**
 * Renders one manifest "scale" entry (e.g. "Color Palettes") as a wrapping
 * row of families -- structurally identical to ap_ds_storybook's
 * UtilityColors.jsx (a `.color-token-group` of `<ColorPalette>`s), except
 * every value is live-computed rather than hand-typed. See ColorPalette.jsx
 * and Color.css for the actual tile/label layout.
 */
export function ColorScaleSection({ scale }) {
	if (!scale) return null;
	return (
		<section className="ap-color-section">
			{/* Test run: force this heading to resolve storybook_ds's Tier 2
			    Title composite specifically, regardless of which theme this
			    page/story is otherwise pinned to. CSS custom properties
			    inherit down the tree, but a rule matching an element
			    directly (this [data-theme][data-viewport] pair) wins over
			    whatever it would've inherited from an ancestor -- so only
			    this title switches to storybook_ds; the color swatches
			    below still correctly show the ambient page's own theme. */}
			<h3
				className="ap-section__title"
				data-theme="storybook_ds"
				data-viewport="desktop"
			>
				{scale.title}
			</h3>
			{/* Dark-diff pages (see tier1ColorStories.jsx's
			    makeTier1ColorDarkStories) pass a scale that's already been
			    filtered down to only the families/items whose value differs
			    from that same theme's light build -- a category with zero
			    differences (e.g. Transparent) still gets a page, it just has
			    no families left. Same precedent as ColorGridSection's tier_2
			    empty state: render the page, show a message, don't omit it. */}
			{scale.families.length === 0 ? (
				<p className="ap-color-section__empty">No tokens in this category differ between light and dark.</p>
			) : (
				<div className="ap-color-token-group">
					{scale.families.map((family) => (
						<ColorPalette key={family.name} label={family.name} items={family.items} />
					))}
				</div>
			)}
		</section>
	);
}
