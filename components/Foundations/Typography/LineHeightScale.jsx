import React from "react";
import manifest from "../../../tokens/generated/typography-manifest.json";
import { LineHeightFontGroup } from "./LineHeightFontGroup.jsx";
import { PageTitle } from "./PageTitle.jsx";
import { ViewportPreviewPanel } from "./ViewportPreviewPanel.jsx";
import "./Typography.css";

/**
 * Explainer for how the line height scale is built. Lives here (not in
 * ViewportPreviewPanel.jsx) because that panel is shared with Font Size
 * and Composite Styles, and this copy is specific to Line Height. Mirrors
 * the Font Size guide in FontSizeScale.jsx.
 */
function ScaleGuide() {
	return (
		<div className="ap-type-scale-guide">
			<p>
				<strong>How the line height scale works.</strong> Line height follows the same structure as
				font size. There are three font family slots (<strong>font1</strong>, <strong>font2</strong>,{" "}
				<strong>font3</strong>), and each has its own full set of values. Every value is calculated
				from a <strong>base line height</strong> (24px) and a scale ratio:{" "}
				<code>base × scale^step</code>. The result is a modular scale, where each step is a constant
				multiple of the one before it. Because it&apos;s exponential, values grow faster toward H1.
			</p>
			<p>Line heights are named by role, matching the font size names:</p>
			<ul>
				<li>
					<strong>Headings:</strong> H1, H2, H3, H4, H5, H6. These use the{" "}
					<strong>heading scale</strong>, with H5 at the base line height.
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
				Each line height is meant to be paired with the font size of the same name (for example,{" "}
				<code>h2</code> line height with <code>h2</code> font size). The base line height, heading
				scale and body text scale are also tokens, so you can change the whole scale in one place.
			</p>
		</div>
	);
}

/**
 * Line Height page -- one collapsible group per font, same shape as
 * FontSizeScale.jsx, wrapped in the same local Mobile/Tablet/Desktop
 * toggle (see ViewportPreviewPanel.jsx).
 */
export function LineHeightScale() {
	return (
		<>
			<PageTitle>Line Height</PageTitle>
			<ScaleGuide />
			<ViewportPreviewPanel>
				<div className="ap-type-font-groups">
					<LineHeightFontGroup font="font1" items={manifest.lineHeight.font1} />
					<LineHeightFontGroup font="font2" items={manifest.lineHeight.font2} />
					<LineHeightFontGroup font="font3" items={manifest.lineHeight.font3} />
				</div>
			</ViewportPreviewPanel>
		</>
	);
}
