import React from "react";
import manifest from "../../../tokens/generated/typography-manifest.json";
import { FontSizeFontGroup } from "./FontSizeFontGroup.jsx";
import { PageTitle } from "./PageTitle.jsx";
import { ViewportPreviewPanel } from "./ViewportPreviewPanel.jsx";
import "./Typography.css";

/**
 * Explainer for how the font size scale is built. Lives here (not in
 * ViewportPreviewPanel.jsx) because that panel is shared with Line Height
 * and Composite Styles, and this copy is specific to Font Size.
 */
function ScaleGuide() {
	return (
		<div className="ap-type-scale-guide">
			<p>
				<strong>How the font size scale works.</strong> This system has three font family slots (
				<strong>font1</strong>, <strong>font2</strong>, <strong>font3</strong>), and each has its own
				full set of sizes. Every size is calculated from a <strong>base size</strong> (16px) and a
				scale ratio: <code>base × scale^step</code>. The result is a modular scale, where each step is
				a constant multiple of the one before it. Because it&apos;s exponential, sizes grow faster
				toward H1.
			</p>
			<p>Sizes are named by role:</p>
			<ul>
				<li>
					<strong>Headings:</strong> H1, H2, H3, H4, H5, H6. These use the{" "}
					<strong>heading scale</strong>, with H5 at the base size.
				</li>
				<li>
					<strong>Half steps:</strong> Between headings are large and small versions (<code>-lg</code>,{" "}
					<code>-sm</code>), such as <code>h2-lg</code>, <code>h2</code> and <code>h2-sm</code>. These
					sit half a step apart on the scale.
				</li>
				<li>
					<strong>Body:</strong> <code>body-lg</code>, <code>body</code>, <code>body-sm</code>,{" "}
					<code>body-xs</code> and <code>body-xxs</code>. These use a separate{" "}
					<strong>body text scale</strong>.
				</li>
			</ul>
			<p>
				The base size, heading scale and body text scale are also tokens, so you can change the whole
				scale in one place.
			</p>
		</div>
	);
}

/**
 * Font Size page -- one collapsible group per font, wrapped in its own
 * local Mobile/Tablet/Desktop toggle (see ViewportPreviewPanel.jsx).
 */
export function FontSizeScale() {
	return (
		<>
			<PageTitle>Font Size</PageTitle>
			<ScaleGuide />
			<ViewportPreviewPanel>
				<div className="ap-type-font-groups">
					<FontSizeFontGroup font="font1" items={manifest.fontSize.font1} />
					<FontSizeFontGroup font="font2" items={manifest.fontSize.font2} />
					<FontSizeFontGroup font="font3" items={manifest.fontSize.font3} />
				</div>
			</ViewportPreviewPanel>
		</>
	);
}
