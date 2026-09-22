import React, { useRef, useState } from "react";
import { Dropdown } from "./Dropdown.jsx";
import { DropdownField } from "./DropdownField.jsx";
import { DropdownMenu } from "./DropdownMenu.jsx";
import { DropdownMenuRow } from "./DropdownMenuRow.jsx";
import { Icon } from "../Icon/Icon.jsx";
import { ChevronDownIcon } from "./Icon.jsx";
import { FaRegBookmark, FaRegTrashCan } from "react-icons/fa6";
import { TokenReadout } from "./TokenReadout.jsx";
import { ROW_STATES, dropdownMenuRowVar, dropdownMenuVar, dropdownFieldVar } from "./dropdownTokens.js";
import { CodeBlock } from "../CodeBlock.jsx";
import "./Dropdown.css";

function Section({ title, children }) {
	return (
		<section className="ap-dropdown-section">
			<h3 className="ap-dropdown-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-dropdown-section-body">{children}</div>
		</section>
	);
}

const DEMO_OPTIONS = [
	{ value: "row-1", label: "Dropdown Row" },
	{ value: "row-2", label: "Dropdown Row" },
	{ value: "row-3", label: "Dropdown Row" },
];

/**
 * The Dropdown's "Variations" page -- documentation-first, same format
 * as Button/Text Input/Segment Group's own Variations pages. No
 * Playground page for this one either, matching Text Input's/Segment
 * Group's precedent.
 *
 * Sourced from the real "emailer_drowdown_menu_row" / "emailer_dropdown_
 * menu" / "Dropdown_Field_070326" Figma components via the Desktop
 * Bridge plugin -- see the project doc's Dropdown Menu section for the
 * full audit and the Figma variable-assignment pass that preceded this
 * build.
 *
 * Five sections, matching the three real sub-components' actual property
 * surface: Content (the live, click-to-open-and-select demo -- this IS
 * the real composed <Dropdown>, not a static mockup), Menu Row State
 * (Default/Hover/Selected, informational via the docs-only forceState
 * hatch), Menu Row Content (the real "Text and Icon" / "Slot" / divider
 * Content variants), Field State (Default/Active), and Field Title &
 * Slots (the field's own booleans shown together).
 */
export function DropdownVariations() {
	const [value, setValue] = useState("row-1");
	const menuRef = useRef(null);
	const hoverRef = useRef(null);
	const selectedRef = useRef(null);
	const fieldDefaultRef = useRef(null);
	const fieldActiveRef = useRef(null);

	return (
		<div>
			<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Dropdown
			</h3>
			<Section title="Content">
				<div className="ap-dropdown-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						This is the real, working component -- click the field below to open the menu, then click a row
						to select it. <code>&lt;Dropdown&gt;</code> composes <code>&lt;DropdownField&gt;</code> and{" "}
						<code>&lt;DropdownMenu&gt;</code>/<code>&lt;DropdownMenuRow&gt;</code> into a controlled combobox
						(<code>value</code>/<code>onChange</code>), the same real-interaction bar as Segment Group.
					</p>
					<p>Pass an optional icon per option for a "Text and Icon" row (Figma's own Content variant).</p>
				</div>
				<div className="ap-dropdown-section-example">
					<div className="ap-dropdown-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<div className="ap-dropdown-swatch">
							<div data-theme="core" data-viewport="desktop">
								<Dropdown options={DEMO_OPTIONS} value={value} onChange={setValue} fieldTitleText="Field Title" />
							</div>
							<div className="ap-dropdown-swatch-label">Dropdown</div>
						</div>
					</div>
					<CodeBlock
						code={[
							'const [value, setValue] = useState("row-1");',
							"",
							"<Dropdown",
							'  fieldTitleText="Field Title"',
							"  options={[",
							'    { value: "row-1", label: "Dropdown Row" },',
							'    { value: "row-2", label: "Dropdown Row" },',
							"  ]}",
							"  value={value}",
							"  onChange={setValue}",
							"/>",
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Menu Row State">
				<div className="ap-dropdown-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Not a prop set directly on a real row -- <strong>Default</strong> and <strong>Selected</strong>{" "}
						happen through the composed <code>Dropdown</code>'s <code>value</code>/<code>onChange</code>, and{" "}
						<strong>Hover</strong> is real <code>:hover</code>. Shown here with a docs-only{" "}
						<code>forceState</code> escape hatch so every state is visible without a live mouse or a
						controlling parent -- never pass it in real usage.
					</p>
				</div>
				<div className="ap-dropdown-section-example">
					<div className="ap-dropdown-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{ROW_STATES.map((state) => (
							<div className="ap-dropdown-swatch" key={state.key}>
								<div className="ap-dropdown-menu-demo" data-theme="core" data-viewport="desktop">
									<DropdownMenu ref={state.key === "default" ? menuRef : undefined}>
										<DropdownMenuRow
											value={state.key}
											forceState={state.key === "default" ? undefined : state.key}
											ref={state.key === "hover" ? hoverRef : state.key === "selected" ? selectedRef : undefined}
										>
											Dropdown Row
										</DropdownMenuRow>
									</DropdownMenu>
								</div>
								<div className="ap-dropdown-swatch-label">{state.label}</div>
								{state.key === "default" && (
									<TokenReadout
										targetRef={menuRef}
										rows={[{ label: "bg", cssVar: dropdownMenuRowVar.background("default") }]}
									/>
								)}
								{state.key === "hover" && (
									<TokenReadout targetRef={hoverRef} rows={[{ label: "bg", cssVar: dropdownMenuRowVar.background("hover") }]} />
								)}
								{state.key === "selected" && (
									<TokenReadout
										targetRef={selectedRef}
										rows={[{ label: "bg", cssVar: dropdownMenuRowVar.background("selected") }]}
									/>
								)}
							</div>
						))}
					</div>
				</div>
			</Section>

			<Section title="Menu Row Content">
				<div className="ap-dropdown-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						A row's content is either a text label (with an optional leading icon), or arbitrary{" "}
						<code>children</code> dropped into a <code>content="slot"</code> row -- Figma's own real example
						drops a whole Button instance in there. A <code>content="divider"</code> row renders just the
						divider line (Figma's "menu_row_divider" State) and isn't selectable.
					</p>
				</div>
				<div className="ap-dropdown-section-example">
					<div className="ap-dropdown-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<div className="ap-dropdown-swatch">
							<div className="ap-dropdown-menu-demo" data-theme="core" data-viewport="desktop">
								<DropdownMenu>
									<DropdownMenuRow value="a" icon={<Icon icon={FaRegBookmark} size="small" />}>
										Dropdown Row
									</DropdownMenuRow>
								</DropdownMenu>
							</div>
							<div className="ap-dropdown-swatch-label">Text and Icon</div>
						</div>
						<div className="ap-dropdown-swatch">
							<div className="ap-dropdown-menu-demo" data-theme="core" data-viewport="desktop">
								<DropdownMenu>
									<DropdownMenuRow value="b" content="slot">
										<span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
											<Icon icon={FaRegTrashCan} size="small" />
											Custom slot content
										</span>
									</DropdownMenuRow>
								</DropdownMenu>
							</div>
							<div className="ap-dropdown-swatch-label">Slot (custom content)</div>
						</div>
						<div className="ap-dropdown-swatch">
							<div className="ap-dropdown-menu-demo" data-theme="core" data-viewport="desktop">
								<DropdownMenu>
									<DropdownMenuRow value="c">Dropdown Row</DropdownMenuRow>
									<DropdownMenuRow content="divider" />
									<DropdownMenuRow value="d">Dropdown Row</DropdownMenuRow>
								</DropdownMenu>
							</div>
							<div className="ap-dropdown-swatch-label">Divider</div>
							<TokenReadout rows={[{ label: "line", cssVar: dropdownMenuRowVar.divider() }]} targetRef={menuRef} />
						</div>
					</div>
					<CodeBlock
						code={[
							'<DropdownMenuRow value="a" icon={<Icon icon={FaRegBookmark} size="small" />}>',
							"  Dropdown Row",
							"</DropdownMenuRow>",
							"",
							'<DropdownMenuRow value="b" content="slot">',
							"  {/* any custom content, e.g. a <Button> instance */}",
							"</DropdownMenuRow>",
							"",
							'<DropdownMenuRow content="divider" />',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Field">
				<div className="ap-dropdown-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Unlike Text Input's Active (real focus) or Filled (a real value present), the field's{" "}
						<strong>Active</strong> state is genuinely external -- whether the menu is open is state a parent
						has to own anyway to decide whether to render the menu at all. The composed{" "}
						<code>&lt;Dropdown&gt;</code> above owns that state for you; <code>&lt;DropdownField&gt;</code> on
						its own takes a real <code>active</code> prop.
					</p>
				</div>
				<div className="ap-dropdown-section-example">
					<div className="ap-dropdown-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<div className="ap-dropdown-swatch">
							<div data-theme="core" data-viewport="desktop">
								<DropdownField ref={fieldDefaultRef} valueText="Text" rightSlotIcon={<ChevronDownIcon />} />
							</div>
							<div className="ap-dropdown-swatch-label">Default</div>
							<TokenReadout targetRef={fieldDefaultRef} rows={[{ label: "border", cssVar: dropdownFieldVar.border("default") }]} />
						</div>
						<div className="ap-dropdown-swatch">
							<div data-theme="core" data-viewport="desktop">
								<DropdownField ref={fieldActiveRef} valueText="Text" active rightSlotIcon={<ChevronDownIcon />} />
							</div>
							<div className="ap-dropdown-swatch-label">Active</div>
							<TokenReadout targetRef={fieldActiveRef} rows={[{ label: "border", cssVar: dropdownFieldVar.border("active") }]} />
						</div>
					</div>
				</div>
			</Section>

			<Section title="Field Title & Slots">
				<div className="ap-dropdown-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						<code>showFieldTitleSection</code> shows the label row above the field (its own info icon is
						always present in Figma when the section is shown -- there's no separate toggle for it, unlike
						Text Input's field title icon). <code>showLeftSlot</code>/<code>showRightSlot</code> add an icon
						inside the field itself; <code>showDescriptionBelowInput</code> adds helper text underneath.
					</p>
				</div>
				<div className="ap-dropdown-section-example">
					<div className="ap-dropdown-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<div className="ap-dropdown-swatch">
							<div data-theme="core" data-viewport="desktop">
								<DropdownField valueText="Text" rightSlotIcon={<ChevronDownIcon />} />
							</div>
							<div className="ap-dropdown-swatch-label">With field title</div>
						</div>
						<div className="ap-dropdown-swatch">
							<div data-theme="core" data-viewport="desktop">
								<DropdownField valueText="Text" showFieldTitleSection={false} rightSlotIcon={<ChevronDownIcon />} />
							</div>
							<div className="ap-dropdown-swatch-label">Without field title</div>
						</div>
						<div className="ap-dropdown-swatch">
							<div data-theme="core" data-viewport="desktop">
								<DropdownField
									valueText="Text"
									showLeftSlot
									leftSlotIcon={<Icon icon={FaRegTrashCan} size="small" />}
									rightSlotIcon={<ChevronDownIcon />}
								/>
							</div>
							<div className="ap-dropdown-swatch-label">With left slot</div>
						</div>
						<div className="ap-dropdown-swatch">
							<div data-theme="core" data-viewport="desktop">
								<DropdownField valueText="Text" showDescriptionBelowInput rightSlotIcon={<ChevronDownIcon />} />
							</div>
							<div className="ap-dropdown-swatch-label">With description</div>
						</div>
					</div>
					<CodeBlock
						code={[
							"<DropdownField",
							'  valueText="Text"',
							"  showLeftSlot",
							"  leftSlotIcon={<Icon icon={FaRegTrashCan} size=\"small\" />}",
							"  showDescriptionBelowInput",
							'  descriptionText="Description Text"',
							"/>",
						].join("\n")}
					/>
				</div>
			</Section>
		</div>
	);
}
