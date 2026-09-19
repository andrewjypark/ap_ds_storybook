import React, { useRef, useState } from "react";
import { Checkbox } from "./Checkbox.jsx";
import { TokenReadout } from "./TokenReadout.jsx";
import { checkboxVar } from "./checkboxTokens.js";
import { CodeBlock } from "../CodeBlock.jsx";
import "./Checkbox.css";

function Section({ title, children }) {
	return (
		<section className="ap-checkbox-section">
			<h3 className="ap-checkbox-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-checkbox-section-body">{children}</div>
		</section>
	);
}

/**
 * The Checkbox's "Variations" page -- documentation-first, same format
 * as every other Tier 3 component's own Variations page. No Playground
 * page, matching Text Input's/Segment Group's/Dropdown's precedent.
 *
 * Sourced from the real "Checkbox" Figma component (Storybook Planning
 * file, "Components from GT" page) found while auditing the Table Row
 * component system -- see checkboxTokens.js for the full value mapping.
 * One section, matching the component's one real property: `State`
 * (Unchecked/Checked). Shown here as the real, click-to-toggle
 * component, not a static mockup.
 */
export function CheckboxVariations() {
	const [checked, setChecked] = useState(false);
	const uncheckedRef = useRef(null);
	const checkedRef = useRef(null);

	return (
		<div>
			<h3 className="ap-color-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Checkbox
			</h3>
			<Section title="Content">
				<div className="ap-checkbox-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						This is the real, working component -- click it to toggle. <code>&lt;Checkbox&gt;</code> takes a
						real <code>checked</code>/<code>onChange</code> pair (same controlled shape as{" "}
						<code>&lt;Dropdown&gt;</code>'s <code>value</code>/<code>onChange</code>), not an internal state
						of its own.
					</p>
					<p>
						Figma's real "Checkbox" component has exactly two states -- <strong>Empty</strong> and{" "}
						<strong>Filled</strong> -- shown below as <strong>Unchecked</strong>/<strong>Checked</strong>.
						There's no third indeterminate state in Figma, so this component doesn't invent one.
					</p>
				</div>
				<div className="ap-checkbox-section-example">
					<div className="ap-checkbox-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<div className="ap-checkbox-swatch">
							<div data-theme="core" data-viewport="desktop">
								<Checkbox checked={checked} onChange={setChecked} aria-label="Demo checkbox" />
							</div>
							<div className="ap-checkbox-swatch-label">Interactive</div>
						</div>
						<div className="ap-checkbox-swatch">
							<div data-theme="core" data-viewport="desktop">
								<Checkbox ref={uncheckedRef} checked={false} aria-label="Unchecked example" />
							</div>
							<div className="ap-checkbox-swatch-label">Unchecked</div>
							<TokenReadout targetRef={uncheckedRef} rows={[{ label: "border", cssVar: checkboxVar.border() }]} />
						</div>
						<div className="ap-checkbox-swatch">
							<div data-theme="core" data-viewport="desktop">
								<Checkbox ref={checkedRef} checked={true} aria-label="Checked example" />
							</div>
							<div className="ap-checkbox-swatch-label">Checked</div>
							<TokenReadout targetRef={checkedRef} rows={[{ label: "bg", cssVar: checkboxVar.background("checked") }]} />
						</div>
					</div>
					<CodeBlock
						code={[
							"const [checked, setChecked] = useState(false);",
							"",
							'<Checkbox checked={checked} onChange={setChecked} aria-label="..." />',
						].join("\n")}
					/>
				</div>
			</Section>
		</div>
	);
}
