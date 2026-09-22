import React, { useRef } from "react";
import { Button } from "./Button.jsx";
import { TokenReadout } from "./TokenReadout.jsx";
import { CodeBlock } from "../CodeBlock.jsx";
import { SIZES, PRIORITIES, RADII, STATES, buttonVar } from "./buttonTokens.js";
import "./Button.css";

/**
 * One example button + its live token readout. Holds its own ref so
 * TokenReadout can read the resolved custom-property values straight off
 * this exact <button> DOM node (see TokenReadout.jsx for why it can't
 * just read off a wrapper instead).
 */
function ButtonSwatch({ swatchLabel, rows, ...buttonProps }) {
	const ref = useRef(null);
	return (
		<div className="ap-button-swatch" >
			<div className="ap-button-swatch-example" data-theme="core" data-viewport="desktop">
				<Button ref={ref} {...buttonProps} />
			</div>
			{swatchLabel && <div className="ap-button-swatch-label">{swatchLabel}</div>}
			<TokenReadout targetRef={ref} rows={rows} />
		</div>
	);
}

function Section({ title, children }) {
	return (
		<section className="ap-button-section">
			<h3 className="ap-button-section-title" data-theme="storybook_ds" data-viewport="desktop">{title}</h3>
			<div className="ap-button-section-body">{children}</div>
		</section>
	);
}

/**
 * The button's "Variations" page -- documentation-first, grouped by
 * property, each property's options shown side by side with the reasoning
 * for each (matching the Wix Design System reference Andrew flagged in
 * his own Figma sticky notes -- see the project doc's "Storybook
 * presentation for Tier 3 buttons" section). A separate "Playground" page
 * (Storybook argTypes + Controls, per Andrew's other notes) is a follow-up,
 * not built here.
 *
 * Each section's swatch group is followed by a CodeBlock (see
 * ../CodeBlock.jsx) -- a Copy button plus a Show code/Hide code toggle
 * revealing the exact usage snippet for what's rendered above it, same
 * pattern as the Wix reference page. The States section is the one
 * exception: its code sample deliberately does NOT show the `forceState`
 * prop used to render those swatches, since forceState is a docs-only
 * escape hatch (see Button.jsx) and was never meant for real usage --
 * showing it as copyable "real" code would be actively misleading. The
 * real story for that section is that Hover/Clicked need no prop at all
 * (they're just :hover/:active) and Disabled is the only one you set.
 */
export function ButtonVariations() {
	return (
		<div>
			<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Button
			</h3>
			<Section title="Size">
				<div className="ap-button-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Control button size with the <code>size</code> prop.
					</p>
					<ul>
						<li>
							<code>large</code> — for the calls-to-action that need the most emphasis, like a primary action at
							the top of a page.
						</li>
						<li>
							<code>medium</code> — the default size for most page actions and common use cases.
						</li>
						<li>
							<code>small</code> — fits into tighter UI elements like cards, table rows, and toolbars.
						</li>
					</ul>
				</div>
				<div className="ap-button-section-example">
					<div className="ap-button-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{SIZES.map((size) => (
							<ButtonSwatch
								key={size.key}
								swatchLabel={size.label}
								priority="primary"
								size={size.key}
								radius="sm"
								rows={[
									{ label: "min-width", cssVar: buttonVar.minWidth(size.key) },
									{ label: "padding", cssVar: buttonVar.padding(size.key) },
									{ label: "font", cssVar: buttonVar.text(size.key) },
								]}
							/>
						))}
					</div>
					<CodeBlock
						code={[
							'<Button size="large">Button</Button>',
							'<Button size="medium">Button</Button>',
							'<Button size="small">Button</Button>',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Priority">
				<div className="ap-button-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Each button has a <code>priority</code> that signals its importance. Use it to create a clear visual
						hierarchy across the actions on a page.
					</p>
					<ul>
						<li>
							<code>primary</code> — the main call-to-action. There should only be one primary button per view.
						</li>
						<li>
							<code>secondary</code> — for supporting actions alongside a primary (e.g. Cancel, Back).
						</li>
						<li>
							<code>ghost</code> — for the lowest-emphasis actions, or when a secondary button would still feel
							too prominent — dense toolbars, table rows, repeated inline actions.
						</li>
					</ul>
				</div>
				<div className="ap-button-section-example">
					<div className="ap-button-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{PRIORITIES.map((priority) => (
							<ButtonSwatch
								key={priority.key}
								swatchLabel={priority.label}
								priority={priority.key}
								size="medium"
								radius="sm"
								rows={[
									{ label: "bg", cssVar: buttonVar.color(priority.key, "default", "background") },
									{ label: "border", cssVar: buttonVar.color(priority.key, "default", "border") },
									{ label: "text", cssVar: buttonVar.color(priority.key, "default", "text") },
								]}
							/>
						))}
					</div>
					<CodeBlock
						code={[
							'<Button priority="primary">Primary</Button>',
							'<Button priority="secondary">Secondary</Button>',
							'<Button priority="ghost">Ghost</Button>',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Border-Radius">
				<div className="ap-button-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Control the corner treatment with the <code>radius</code> prop.
					</p>
					<ul>
						<li>
							<code>none</code> — sharp corners; matches a squared-off, structured layout style.
						</li>
						<li>
							<code>sm</code> — a subtle rounding; the standard choice for most buttons.
						</li>
						<li>
							<code>lg</code> — fully rounded (pill-shaped); use for a softer, more casual brand moment.
						</li>
					</ul>
				</div>
				<div className="ap-button-section-example">
					<div className="ap-button-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{RADII.map((radius) => (
							<ButtonSwatch
								key={radius.key}
								swatchLabel={radius.label}
								priority="primary"
								size="medium"
								radius={radius.key}
								rows={[{ label: "radius", cssVar: buttonVar.radius(radius.key) }]}
							/>
						))}
					</div>
					<CodeBlock
						code={[
							'<Button radius="none">Button</Button>',
							'<Button radius="sm">Button</Button>',
							'<Button radius="lg">Button</Button>',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Icons">
				<div className="ap-button-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Buttons can show an icon on the left, right, both, or neither via the <code>showLeftIcon</code> /{" "}
						<code>showRightIcon</code> booleans, independent of <code>showText</code>.
					</p>
					<ul>
						<li>
							<strong>Text only</strong> — the default. Most buttons should look like this.
						</li>
						<li>
							<strong>Icon + text</strong> — one or both icons alongside the label; use to reinforce the
							action (e.g. a plus icon before "Add item").
						</li>
						<li>
							<strong>Icon only</strong> — text hidden, one icon shown; use in tight spaces (toolbars), and
							always pair with an accessible label under the hood even though it's visually hidden.
						</li>
					</ul>
				</div>
				<div className="ap-button-section-example">
					<div className="ap-button-swatch-group"  data-theme="storybook_ds" data-viewport="desktop">
						<ButtonSwatch
							swatchLabel="Text only"
							priority="primary"
							size="medium"
							radius="sm"
							showText
							rows={[
								{ label: "icon w", cssVar: buttonVar.iconWidth("medium") },
								{ label: "icon h", cssVar: buttonVar.iconHeight("medium") },
							]}
						/>
						<ButtonSwatch
							swatchLabel="Icon left + text"
							priority="primary"
							size="medium"
							radius="sm"
							showLeftIcon
							showText
							rows={[
								{ label: "icon w", cssVar: buttonVar.iconWidth("medium") },
								{ label: "icon h", cssVar: buttonVar.iconHeight("medium") },
							]}
						/>
						<ButtonSwatch
							swatchLabel="Icon right + text"
							priority="primary"
							size="medium"
							radius="sm"
							showRightIcon
							showText
							rows={[
								{ label: "icon w", cssVar: buttonVar.iconWidth("medium") },
								{ label: "icon h", cssVar: buttonVar.iconHeight("medium") },
							]}
						/>
						<ButtonSwatch
							swatchLabel="Icon only"
							priority="primary"
							size="medium"
							radius="sm"
							showLeftIcon
							showText={false}
							rows={[
								{ label: "icon w", cssVar: buttonVar.iconWidth("medium") },
								{ label: "icon h", cssVar: buttonVar.iconHeight("medium") },
							]}
						/>
					</div>
					<CodeBlock
						code={[
							"<Button showText>Button</Button>",
							"<Button showLeftIcon showText>Button</Button>",
							"<Button showRightIcon showText>Button</Button>",
							"<Button showLeftIcon showText={false}>Button</Button>",
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="States">
				<div className="ap-button-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Not a prop a user picks directly — shown here so it's clear Hover and Clicked have their own
						token values (not just a brightness tweak) and to confirm what Disabled looks like. Held on one
						representative button (Primary / Medium) rather than crossed with every other variant.
					</p>
				</div>
				<div className="ap-button-section-example">
					<div className="ap-button-swatch-group"  data-theme="storybook_ds" data-viewport="desktop">
						{STATES.map((state) => (
							<ButtonSwatch
								key={state.key}
								swatchLabel={state.label}
								priority="primary"
								size="medium"
								radius="sm"
								disabled={state.key === "disabled"}
								forceState={state.key === "default" || state.key === "disabled" ? undefined : state.key}
								rows={[
									{ label: "bg", cssVar: buttonVar.color("primary", state.key, "background") },
									{ label: "border", cssVar: buttonVar.color("primary", state.key, "border") },
									{ label: "text", cssVar: buttonVar.color("primary", state.key, "text") },
								]}
							/>
						))}
					</div>
					<CodeBlock
						code={[
							"// Default, Hover, and Clicked apply automatically -- no prop needed",
							'<Button priority="primary">Button</Button>',
							"",
							"// Disabled is the only state you set directly",
							'<Button priority="primary" disabled>Button</Button>',
						].join("\n")}
					/>
				</div>
			</Section>
		</div>
	);
}
