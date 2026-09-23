import React from "react";
import manifest from "../../../tokens/generated/typography-manifest.json";
import { CompositeStyleGroup } from "./CompositeStyleGroup.jsx";
import { PageTitle } from "./PageTitle.jsx";
import { ViewportPreviewPanel } from "./ViewportPreviewPanel.jsx";
import "./Typography.css";

/**
 * Explainer for how Tier 2's semantic composite styles are built. Lives
 * here (not in ViewportPreviewPanel.jsx) because that panel is shared with
 * Font Size and Line Height, and this copy is specific to this page.
 * Uses the same .ap-type-scale-guide styles as the Font Size and Line
 * Height guides.
 */
function ScaleGuide() {
	return (
		<div className="ap-type-scale-guide">
			<p>
				<strong>How Tier 2 composite styles work.</strong> Tier 2 is a semantic layer. Instead of
				picking a heading level like H2, you pick a role by purpose: <strong>Display</strong>,{" "}
				<strong>Headline</strong>, <strong>Title</strong>, <strong>Label</strong>,{" "}
				<strong>Body</strong> or <strong>Meta</strong>. Each role points to a Tier 1 composite style,
				which bundles font family, weight, size and line height. Tier 2 also chooses the weight for
				each role. Most roles have a <strong>default</strong> size plus <strong>large</strong> and{" "}
				<strong>small</strong> versions (<code>lg</code>, <code>sm</code>).
			</p>
			<ul>
				<li>
					<strong>Display:</strong> the largest text. Default is H1 (regular weight).
				</li>
				<li>
					<strong>Headline:</strong> default is H2 (semibold).
				</li>
				<li>
					<strong>Title:</strong> default is H3 (regular).
				</li>
				<li>
					<strong>Label:</strong> default is H4 (semibold). Its smallest sizes come from body text.
				</li>
				<li>
					<strong>Body:</strong> paragraph text, with a bold &quot;strong&quot; version of each size (
					<code>body-lg-strong</code>, and so on).
				</li>
				<li>
					<strong>Meta:</strong> captions and fine print, using the smallest body text styles
					(regular).
				</li>
			</ul>
			<p>
				Because they&apos;re built from the same Tier 1 sizes and line heights, these styles are
				responsive too. Use the toggle to preview each breakpoint.
			</p>
		</div>
	);
}

/**
 * Tier 2 Semantic Typography's composite styles (Display/Headline/Title/
 * Label/Body/Meta) -- the "one-liner" `font`-shorthand approach, not
 * ap_ds_storybook's SCSS mixins (see build-tokens.js and the project doc
 * for the full comparison). Each composite style's fontSize/lineHeight
 * are viewport-scaled the same way Tier 1's Font Size/Line Height pages
 * are (they're built from the exact same fontSize/lineHeights aliases --
 * see build-tokens.js's THEME x VIEWPORT CROSS-PRODUCT note), so this
 * page gets the same local Mobile/Tablet/Desktop toggle, reused
 * unchanged from ViewportPreviewPanel.jsx.
 */
export function CompositeStyles() {
	return (
		<>
			<PageTitle>Composite Styles</PageTitle>
			<ScaleGuide />
			<ViewportPreviewPanel>
				<div className="ap-type-font-groups">
					{manifest.compositeStyles.map((group) => (
						<CompositeStyleGroup key={group.groupName} groupName={group.groupName} items={group.items} />
					))}
				</div>
			</ViewportPreviewPanel>
		</>
	);
}
