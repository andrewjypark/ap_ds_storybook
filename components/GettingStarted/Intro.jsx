import React from "react";
import "./Intro.css";

function Section({ title, children }) {
	return (
		<section className="ap-intro-section">
			<h3 className="ap-intro-section-title">{title}</h3>
			<div className="ap-intro-section-body">{children}</div>
		</section>
	);
}

function FindRow({ term, children }) {
	return (
		<div className="ap-intro-find-row">
			<div className="ap-intro-find-term">{term}</div>
			<div className="ap-intro-find-desc">{children}</div>
		</div>
	);
}

/**
 * The storybook's landing page. Title is deliberately a bare, single-segment
 * story title ("Getting Started", see GettingStarted.stories.jsx) -- per
 * .storybook/preview.jsx's own storySort comment, a bare title becomes a
 * root that Storybook always renders above every storySort-ordered group,
 * regardless of sort order -- so this lands above Tier 1/2/3 with no
 * storySort changes needed, and is the first story Storybook auto-selects
 * when the site loads with no path.
 *
 * All docs text is pinned to the internal-only storybook_ds theme on the
 * root wrapper (inherited by every child below, no need to repeat it) --
 * same convention every other page's headings/docs-copy already uses
 * (PageTitle.jsx, Icon's ap-icon-section-copy, Color's ColorScaleSection),
 * since there's no token-driven "live specimen" content here that needs to
 * track the ambient Core/Green/Gold theme.
 */
export function Intro() {
	return (
		<div className="ap-intro" data-theme="storybook_ds" data-viewport="desktop">
			<h3 className="ap-section__title">Getting Started</h3>
			<p className="ap-intro-lede">
				This storybook documents this project's design tokens and the components built on top of them —
				from raw values in Figma down to what actually ships in code. Start here if you're new.
			</p>

			<Section title="How this storybook is organized">
				<p>Everything here follows a three-tier model, and the sidebar mirrors it exactly:</p>
				<ul>
					<li>
						<strong>Tier 1: Global Tokens</strong> — the raw values: color, typography, and border scales.
						Each theme — Core, Green, Gold — has its own complete set.
					</li>
					<li>
						<strong>Tier 2: Semantic Tokens</strong> — Tier 1 values given a purpose: content color,
						background, border, and composite type styles like Title or Body. Components should reference
						this layer, not Tier 1 directly.
					</li>
					<li>
						<strong>Tier 3: Components</strong> — real, usable components (Button, Checkbox, Dropdown,
						Icon, Modal, Segment Group, Table, Text Input, Tooltip), each with a Variations page covering
						its states and options.
					</li>
				</ul>
				<p className="ap-intro-note">
					Use the Theme control in the toolbar to preview Core, Green, or Gold anywhere in the storybook.
					Font Size and Line Height are the one exception — they have their own Desktop / Tablet / Mobile
					toggle on the page itself, since viewport only ever affects those two token types.
				</p>
			</Section>

			<Section title="Where to find things">
				<FindRow term="A raw token value">Tier 1: Global Tokens, under the relevant theme.</FindRow>
				<FindRow term="How a token is used in context">Tier 2: Semantic Tokens.</FindRow>
				<FindRow term="A component">Tier 3: Components, in the sidebar.</FindRow>
				<FindRow term="The CSS variable behind something on screen">
					Every swatch and component example has a small readout underneath it — label, variable name, and
					live value.
				</FindRow>
			</Section>
		</div>
	);
}
