import React, { useRef } from "react";
import { TextInput } from "./TextInput.jsx";
import { TokenReadout } from "./TokenReadout.jsx";
import { CodeBlock } from "../CodeBlock.jsx";
import { TYPES, STATES, textInputVar } from "./textInputTokens.js";
import "./TextInput.css";

/**
 * One example text input + its live token readout. Holds its own ref so
 * TokenReadout can read the resolved custom-property values straight off
 * this exact DOM node (same reasoning as Button/ButtonVariations.jsx's
 * ButtonSwatch).
 */
function TextInputSwatch({ swatchLabel, rows, ...inputProps }) {
	const ref = useRef(null);
	return (
		<div className="ap-text-input-swatch">
			<div data-theme="core" data-viewport="desktop">
				<TextInput ref={ref} {...inputProps} />
			</div>
			{swatchLabel && <div className="ap-text-input-swatch-label">{swatchLabel}</div>}
			<TokenReadout targetRef={ref} rows={rows} />
		</div>
	);
}

function Section({ title, children }) {
	return (
		<section className="ap-text-input-section">
			<h3 className="ap-text-input-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-text-input-section-body">{children}</div>
		</section>
	);
}

/**
 * The Text Input's "Variations" page -- documentation-first, same format
 * as ButtonVariations.jsx (grouped by property, each property's options
 * shown side by side with the reasoning for each). No Playground/Controls
 * page here either, per Andrew.
 *
 * Unlike Button, this component has no Size axis -- just two real variant
 * dimensions (State, Type) plus six booleans that compose which parts of
 * the field are present. Sourced from the real "Text Input Field_062526"
 * Figma component set (node 49:5631, "Storybook Planning" file) via the
 * Desktop Bridge plugin -- see the project doc's Text Input audit for the
 * full property list, the bound-variable trace, and Andrew's own Wix
 * screenshot used as the format reference (not a feature reference -- see
 * the "Suggestions" section's note below on how much smaller this
 * component's surface area is today).
 *
 * Each section's swatch group is followed by a CodeBlock (see
 * ../CodeBlock.jsx) -- same Copy / Show-code treatment as
 * ButtonVariations.jsx. The States section again deliberately omits
 * `forceState` from its copyable snippet, since it's a docs-only escape
 * hatch (see TextInput.jsx) and never meant for real usage -- the real
 * story is that Active and Filled both apply automatically, and Error is
 * the only state you set directly.
 */
export function TextInputVariations() {
	return (
		<div>
			<h3 className="ap-color-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Text Input
			</h3>
			<Section title="Type">
				<div className="ap-text-input-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Control what kind of value the field collects with the <code>type</code> prop.
					</p>
					<ul>
						<li>
							<code>text</code> — the default. A single line of free text.
						</li>
						<li>
							<code>textarea</code> — a multi-line field for longer values (notes, addresses). Resizes
							vertically.
						</li>
						<li>
							<code>url</code> — a single line prefixed with <code>https://</code>, for links.
						</li>
					</ul>
				</div>
				<div className="ap-text-input-section-example">
					<div className="ap-text-input-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{TYPES.map((t) => (
							<TextInputSwatch
								key={t.key}
								swatchLabel={t.label}
								type={t.key}
								fieldTitleText="Field Title"
								rows={[{ label: "font", cssVar: textInputVar.font() }]}
							/>
						))}
					</div>
					<CodeBlock
						code={[
							'<TextInput type="text" />',
							'<TextInput type="textarea" />',
							'<TextInput type="url" />',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Field Title Section">
				<div className="ap-text-input-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						The label row above the field is controlled by three independent booleans, so it can be a
						bare label, a label with a hint icon, a label with a right-aligned slot, or all three at once.
					</p>
					<ul>
						<li>
							<code>showFieldTitleSection</code> — shows or hides the whole row. Off by default only
							when a field is self-explanatory without one.
						</li>
						<li>
							<code>showFieldTitleLeftIcon</code> — adds an info icon next to the label, for a field
							that needs a tooltip-style hint.
						</li>
						<li>
							<code>showFieldTitleRightSlot</code> — reserves a right-aligned slot in the row (e.g. a
							"required" tag or a character counter) via the <code>fieldTitleRightSlot</code> prop.
						</li>
					</ul>
				</div>
				<div className="ap-text-input-section-example">
					<div className="ap-text-input-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<TextInputSwatch
							swatchLabel="Title only"
							showFieldTitleSection
							fieldTitleText="Field Title"
							rows={[{ label: "label", cssVar: textInputVar.label() }]}
						/>
						<TextInputSwatch
							swatchLabel="Title + left icon"
							showFieldTitleSection
							showFieldTitleLeftIcon
							fieldTitleText="Field Title"
							rows={[{ label: "label", cssVar: textInputVar.label() }]}
						/>
						<TextInputSwatch
							swatchLabel="Title + right slot"
							showFieldTitleSection
							showFieldTitleRightSlot
							fieldTitleRightSlot="Required"
							fieldTitleText="Field Title"
							rows={[{ label: "label", cssVar: textInputVar.label() }]}
						/>
						<TextInputSwatch
							swatchLabel="No title"
							showFieldTitleSection={false}
							rows={[{ label: "label", cssVar: textInputVar.label() }]}
						/>
					</div>
					<CodeBlock
						code={[
							'<TextInput showFieldTitleSection fieldTitleText="Field Title" />',
							'<TextInput showFieldTitleSection showFieldTitleLeftIcon fieldTitleText="Field Title" />',
							'<TextInput',
							'  showFieldTitleSection',
							'  showFieldTitleRightSlot',
							'  fieldTitleRightSlot="Required"',
							'  fieldTitleText="Field Title"',
							'/>',
							'<TextInput showFieldTitleSection={false} />',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Description Below Input">
				<div className="ap-text-input-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Add helper text beneath the field with <code>showDescriptionBelowInput</code> and{" "}
						<code>descriptionText</code>. Wired to the field via <code>aria-describedby</code>, so it's
						also where a validation message belongs when <code>error</code> is set.
					</p>
				</div>
				<div className="ap-text-input-section-example">
					<div className="ap-text-input-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<TextInputSwatch
							swatchLabel="Without description"
							showDescriptionBelowInput={false}
							rows={[{ label: "text", cssVar: textInputVar.labelFont() }]}
						/>
						<TextInputSwatch
							swatchLabel="With description"
							showDescriptionBelowInput
							descriptionText="Description below input"
							rows={[{ label: "color", cssVar: textInputVar.description() }]}
						/>
					</div>
					<CodeBlock
						code={[
							"<TextInput showDescriptionBelowInput={false} />",
							'<TextInput showDescriptionBelowInput descriptionText="Description below input" />',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Left &amp; Right Slots">
				<div className="ap-text-input-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						<code>showLeftSlot</code> and <code>showRightSlot</code> add an icon button inside the field
						itself, independent of each other. Figma's own example content is a clear (trash) icon on the
						left and an edit (pen) icon on the right — swap either via <code>leftSlotIcon</code> /{" "}
						<code>rightSlotIcon</code> for what the real action needs (e.g. a real clear-value button).
					</p>
				</div>
				<div className="ap-text-input-section-example">
					<div className="ap-text-input-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<TextInputSwatch
							swatchLabel="No slots"
							rows={[{ label: "icon size", cssVar: textInputVar.iconSlot("width") }]}
						/>
						<TextInputSwatch
							swatchLabel="Left slot"
							showLeftSlot
							rows={[{ label: "icon size", cssVar: textInputVar.iconSlot("width") }]}
						/>
						<TextInputSwatch
							swatchLabel="Right slot"
							showRightSlot
							rows={[{ label: "icon size", cssVar: textInputVar.iconSlot("width") }]}
						/>
						<TextInputSwatch
							swatchLabel="Both slots"
							showLeftSlot
							showRightSlot
							rows={[{ label: "icon size", cssVar: textInputVar.iconSlot("width") }]}
						/>
					</div>
					<CodeBlock
						code={[
							"<TextInput />",
							"<TextInput showLeftSlot />",
							"<TextInput showRightSlot />",
							"<TextInput showLeftSlot showRightSlot />",
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="State">
				<div className="ap-text-input-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Not a prop a user picks directly — each state is reached through real interaction instead:{" "}
						<strong>Active</strong> is real focus, <strong>Filled</strong> is a real value being present,
						and <strong>Error</strong> is the <code>error</code> prop (set from validation). Shown here
						with a docs-only <code>forceState</code> escape hatch so every state is visible without
						needing to click in or type — never pass that prop in real usage.
					</p>
				</div>
				<div className="ap-text-input-section-example">
					<div className="ap-text-input-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{STATES.map((state) => (
							<TextInputSwatch
								key={state.key}
								swatchLabel={state.label}
								forceState={state.key === "default" ? undefined : state.key}
								error={state.key === "error"}
								rows={[
									{ label: "border", cssVar: textInputVar.border(state.key) },
									{ label: "width", cssVar: textInputVar.borderWidth(state.key) },
								]}
							/>
						))}
					</div>
					<CodeBlock
						code={[
							"// Default and Active apply automatically -- Active is just :focus-within",
							"<TextInput />",
							"",
							"// Filled applies automatically once the field has a real value",
							'<TextInput defaultValue="Some value" />',
							"",
							"// Error is the only state you set directly",
							"<TextInput error />",
						].join("\n")}
					/>
				</div>
			</Section>
		</div>
	);
}
