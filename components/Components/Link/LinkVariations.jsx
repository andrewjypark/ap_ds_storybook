import React, { useRef } from "react";
import { Link } from "./Link.jsx";
import { TokenReadout } from "./TokenReadout.jsx";
import { CodeBlock } from "../CodeBlock.jsx";
import { STATES, linkVar } from "./linkTokens.js";
import "./Link.css";

/**
 * One example link + its live token readout. Holds its own ref so
 * TokenReadout can read the resolved custom-property value straight off
 * this exact <a> DOM node (see TokenReadout.jsx), same reasoning as
 * Button's own ButtonSwatch.
 */
function LinkSwatch({ swatchLabel, knockout, labelClassName, forceState }) {
	const ref = useRef(null);
	const variant = knockout ? "knockout" : "content";
	const state = forceState || "default";
	return (
		<div className="ap-link-swatch">
			<div className="ap-link-swatch-example">
				<Link ref={ref} knockout={knockout} forceState={forceState} href="#" onClick={(e) => e.preventDefault()}>
					Link text
				</Link>
			</div>
			{swatchLabel && (
				<div className={`ap-link-swatch-label${labelClassName ? ` ${labelClassName}` : ""}`}>
					{swatchLabel}
				</div>
			)}
			<TokenReadout targetRef={ref} rows={[{ label: "color", cssVar: linkVar.color(variant, state) }]} />
		</div>
	);
}

function Section({ title, children }) {
	return (
		<section className="ap-link-section">
			<h3 className="ap-link-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-link-section-body">{children}</div>
		</section>
	);
}

/**
 * The link's "Variations" page -- same documentation-first pattern as
 * ButtonVariations.jsx, trimmed to what Link actually has: States
 * (Default/Hover/Active/Visited via forceState, same docs-only escape
 * hatch Button uses) and Knockout (the dark-background variant, shown
 * against the "surface_inverse_primary" semantic token so the light-
 * tinted knockout colors are actually legible -- see Link.css).
 */
export function LinkVariations() {
	return (
		<div>
			<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Link
			</h3>
			<Section title="States">
				<div className="ap-link-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Default, hover, and active are the real <code>:hover</code>/<code>:active</code> pseudo-classes --
						no prop needed. Visited uses the browser's own <code>:visited</code> tracking based on the
						link's real <code>href</code> and the reader's navigation history.
					</p>
					<p className="ap-link-note">
						The swatches below use <code>forceState</code> to show each state as a static example -- that
						prop is docs-only and shouldn't be used in real product code (see the code sample).
					</p>
				</div>
				<div className="ap-link-section-example">
					<div className="ap-link-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{STATES.map((state) => (
							<LinkSwatch
								key={state.key}
								swatchLabel={state.label}
								forceState={state.key === "default" ? undefined : state.key}
							/>
						))}
					</div>
					<CodeBlock code={'<Link href="/pricing">Link text</Link>'} />
				</div>
			</Section>

			<Section title="Knockout">
				<div className="ap-link-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Pass <code>knockout</code> for a link placed on a dark or image background, where the default
						brand-colored text wouldn't have enough contrast.
					</p>
				</div>
				<div className="ap-link-section-example">
					<div
						className="ap-link-swatch-group ap-link-swatch-group--knockout"
						data-theme="storybook_ds"
						data-viewport="desktop"
					>
						{STATES.map((state) => (
							<LinkSwatch
								key={state.key}
								swatchLabel={state.label}
								labelClassName="ap-link-swatch-label--knockout"
								knockout
								forceState={state.key === "default" ? undefined : state.key}
							/>
						))}
					</div>
					<CodeBlock code={'<Link knockout href="/pricing">Link text</Link>'} />
				</div>
			</Section>
		</div>
	);
}
