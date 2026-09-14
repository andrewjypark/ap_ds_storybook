import React from "react";
import { useLiveCssValue } from "../Color/useLiveCssValue.js";

const SAMPLE_LINES = [
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	"abcdefghijklmnopqrstuvwxyz",
	"0123456789",
];

/**
 * One Font Size card: the heading-level name (e.g. "h1") on its own line,
 * then the live size value + CSS var name, then an alphabet-triplet
 * sample rendered at that live size, in that font's own live family.
 * Everything is read via useLiveCssValue -- never hand-typed.
 */
export function FontSizeCard({ font, headingName, cssVar }) {
	const [sizeRef, liveSize] = useLiveCssValue(cssVar);
	const fontFamilyVar = `--ap-font-families-${font}`;

	return (
		<div className="ap-type-token-swatch" ref={sizeRef}>
			{/* Readout text pinned to storybook_ds (not the ref-bearing root
			    above, and not the specimen below) -- see ColorPalette.jsx
			    for the same pattern. This only affects which theme's font
			    styling these two text nodes pick up later; liveSize/cssVar
			    are already-computed strings, so the numbers shown are
			    unaffected and still describe the specimen's real theme. */}
			<div className="ap-type-token-heading-name" data-theme="storybook_ds" data-viewport="desktop">
				{headingName}
			</div>
			<div className="ap-type-token-header" data-theme="storybook_ds" data-viewport="desktop">
				<span className="ap-type-token-label">{liveSize || "…"}</span>
				<span className="ap-type-token-var">{cssVar}</span>
			</div>
			<div
				className="ap-type-token-sample"
				style={{ fontFamily: `var(${fontFamilyVar}), sans-serif`, fontSize: `var(${cssVar})` }}
			>
				{SAMPLE_LINES.map((line) => (
					<div key={line}>{line}</div>
				))}
			</div>
		</div>
	);
}
