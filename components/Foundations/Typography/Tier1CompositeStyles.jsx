import React, { useState } from "react";
import manifest from "../../../tokens/generated/typography-manifest.json";
import { CompositeStyleGroup } from "./CompositeStyleGroup.jsx";
import "./Typography.css";

const { weights, fonts } = manifest.tier1CompositeStyles;
const FONT_NAMES = Object.keys(fonts);

// Same "words separated by hyphens" -> "Title Case" treatment for the
// group headers as CompositeStyleGroup's own titleCase(), but for
// multi-word names ("heading-2" -> "Heading 2", "body-text" -> "Body Text").
function groupTitle(name) {
	return name
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

/**
 * One row of the same segmented buttons ViewportPreviewPanel.jsx uses for
 * Desktop/Tablet/Mobile (same classes, same markup) -- here reused for
 * font1/font2/font3 and for the font weights.
 */
function ButtonToggle({ label, options, value, onChange }) {
	return (
		<div className="ap-type-viewport-toggle" role="group" aria-label={label}>
			{options.map((option) => (
				<button
					key={option}
					type="button"
					className={`ap-type-viewport-toggle-button${
						value === option ? " ap-type-viewport-toggle-button--active" : ""
					}`}
					aria-pressed={value === option}
					onClick={() => onChange(option)}
				>
					{option}
				</button>
			))}
		</div>
	);
}

/**
 * Tier 1 Core's composite styles -- the large set Tier 2's composite
 * styles (Display/Headline/Title/Label/Body/Meta) are chosen from. Every
 * heading level (1-6, with sm/lg variants) and every body text size exists
 * once per font (font1/font2/font3) and once per weight (light/regular/
 * semibold/bold); each one is a single CSS `font` shorthand custom
 * property, e.g. `--ap-font1-heading-4-sm-bold: 600 18px/26px 'Basier
 * Circle'`. The two rows of buttons pick which font and which weight the
 * cards below show (font1 + regular by default).
 *
 * Reuses Tier 2's CompositeStyleGroup/CompositeStyleCard as-is. Unlike
 * Tier 2's composites, these have no letter-spacing/text-transform/
 * text-decoration companion custom properties, so the cards are told not to
 * apply/expect them (`withCompanions={false}`). Font size and line height
 * are the desktop values -- the decorator in .storybook/preview.jsx pins
 * data-viewport to "desktop" for every page outside Font Size/Line Height.
 */
export function Tier1CompositeStyles() {
	const [font, setFont] = useState(FONT_NAMES[0]);
	const [weight, setWeight] = useState(weights.includes("regular") ? "regular" : weights[0]);

	return (
		<div>
			<div className="ap-type-viewport-panel">
				<p className="ap-type-responsive-note">
					Every composite style below bundles font family, weight, size, and line height into one CSS{" "}
					<strong>font</strong> shorthand. Pick a <strong>font</strong> and a <strong>weight</strong> to
					browse all of them. Sizes shown are the Desktop values.
				</p>
				<ButtonToggle label="Font" options={FONT_NAMES} value={font} onChange={setFont} />
				<ButtonToggle label="Font weight" options={weights} value={weight} onChange={setWeight} />
			</div>
			<div className="ap-type-font-groups">
				{fonts[font].map((group) => (
					<CompositeStyleGroup
						key={group.groupName}
						groupName={group.groupName}
						title={groupTitle(group.groupName)}
						items={group.items
							.filter((item) => item.cssVars[weight])
							.map((item) => ({ key: item.key, cssVar: item.cssVars[weight] }))}
						withCompanions={false}
					/>
				))}
			</div>
		</div>
	);
}
