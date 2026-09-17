import React, { useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { SegmentGroup } from "./SegmentGroup.jsx";
import { Segment } from "./Segment.jsx";
import { Icon } from "../Icon/Icon.jsx";
import { TokenReadout } from "./TokenReadout.jsx";
import { STATES, segmentGroupVar, segmentVar } from "./segmentGroupTokens.js";
import { CodeBlock } from "../CodeBlock.jsx";
import "./SegmentGroup.css";

function Section({ title, children }) {
	return (
		<section className="ap-segment-group-section">
			<h3 className="ap-segment-group-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-segment-group-section-body">{children}</div>
		</section>
	);
}

/**
 * The Segment Group's "Variations" page -- documentation-first, same
 * format as Button/TextInput's own Variations pages. No Playground page
 * for this one either, matching Text Input's precedent (a small
 * component with few real properties doesn't need one).
 *
 * Sourced from the real "Segment" / "Segment Group" / "Segment Group with
 * Field Title" / "Segment Content" Figma components via the Desktop
 * Bridge plugin -- see the project doc's Segment Group section for the
 * full audit and the semantic-variable rebind story (first bound to an
 * unrelated Figma library that happened to share the name "Tier 2",
 * corrected the same session to the real tokens.json-backed tier_2
 * tokens applied via Tokens Studio).
 *
 * Three sections, matching the component's actual (small) real property
 * surface: Content (the live, click-to-select demo -- this IS the real
 * component, not a static mockup), State (informational -- Default/
 * Selected happen through real interaction, Hover is real :hover, shown
 * here with the docs-only forceState escape hatch so every state is
 * visible without a live mouse or a controlling parent), and Field Title
 * (the optional label Figma keeps as a separate "with Field Title"
 * component, folded into this one as a single prop).
 */
export function SegmentGroupVariations() {
	const [textValue, setTextValue] = useState("a");
	const [iconValue, setIconValue] = useState("star");
	const groupRef = useRef(null);
	const hoverRef = useRef(null);
	const selectedRef = useRef(null);

	return (
		<div>
			<Section title="Content">
				<div className="ap-segment-group-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						A segment's content is either a plain text label, or an icon stacked above a short caption
						(Figma's own "Image Text Wrapper" content type) -- pass one or the other via <code>children</code>{" "}
						or <code>icon</code>/<code>caption</code> on each <code>&lt;Segment&gt;</code>.
					</p>
					<p>
						This is the real, working component -- click a segment below and watch{" "}
						<code>SegmentGroup</code>'s controlled <code>value</code>/<code>onChange</code> actually update
						which one is selected.
					</p>
				</div>
				<div className="ap-segment-group-section-example">
					<div className="ap-segment-group-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<div className="ap-segment-group-swatch">
							<div data-theme="core" data-viewport="desktop">
								<SegmentGroup ref={groupRef} value={textValue} onChange={setTextValue}>
									<Segment value="a">Segment Text</Segment>
									<Segment value="b">Segment Text</Segment>
									<Segment value="c">Segment Text</Segment>
								</SegmentGroup>
							</div>
							<div className="ap-segment-group-swatch-label">Text</div>
							<TokenReadout targetRef={groupRef} rows={[{ label: "font", cssVar: segmentVar.font() }]} />
						</div>
						<div className="ap-segment-group-swatch">
							<div data-theme="core" data-viewport="desktop">
								<SegmentGroup value={iconValue} onChange={setIconValue}>
									<Segment value="star" icon={<Icon icon={FaRegStar} size="medium" />} caption="Filled" />
									<Segment value="star2" icon={<Icon icon={FaRegStar} size="medium" />} caption="Filled" />
									<Segment value="star3" icon={<Icon icon={FaRegStar} size="medium" />} caption="Filled" />
								</SegmentGroup>
							</div>
							<div className="ap-segment-group-swatch-label">Icon + Caption</div>
							<TokenReadout
								targetRef={groupRef}
								rows={[
									{ label: "gap", cssVar: segmentVar.iconCaptionGap() },
									{ label: "caption", cssVar: segmentVar.captionFont() },
								]}
							/>
						</div>
					</div>
					<CodeBlock
						code={[
							'const [value, setValue] = useState("a");',
							"",
							'<SegmentGroup value={value} onChange={setValue}>',
							'  <Segment value="a">Segment Text</Segment>',
							'  <Segment value="b">Segment Text</Segment>',
							'  <Segment value="c">Segment Text</Segment>',
							"</SegmentGroup>",
							"",
							"// Icon + caption content",
							'<Segment value="a" icon={<Icon icon={FaRegStar} size="medium" />} caption="Filled" />',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="State">
				<div className="ap-segment-group-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Not a prop you set directly on a real segment -- <strong>Default</strong> is a segment with
						nothing selected and no pointer over it (it visually recesses into the group's own track by
						having no background of its own), <strong>Hover</strong> is real <code>:hover</code>, and{" "}
						<strong>Selected</strong> happens when a segment's own <code>value</code> matches the group's
						controlled <code>value</code>. Shown here with a docs-only <code>forceState</code> escape hatch
						so every state is visible without a live mouse or a controlling parent -- never pass it in real
						usage.
					</p>
				</div>
				<div className="ap-segment-group-section-example">
					<div className="ap-segment-group-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{STATES.map((state) => (
							<div className="ap-segment-group-swatch" key={state.key}>
								<div data-theme="core" data-viewport="desktop">
									<SegmentGroup>
										<Segment
											value={state.key}
											forceState={state.key === "default" ? undefined : state.key}
											ref={state.key === "hover" ? hoverRef : state.key === "selected" ? selectedRef : undefined}
										>
											Segment Text
										</Segment>
									</SegmentGroup>
								</div>
								<div className="ap-segment-group-swatch-label">{state.label}</div>
								{state.key === "default" && (
									<TokenReadout
										targetRef={groupRef}
										rows={[{ label: "bg (track)", cssVar: segmentGroupVar.background() }]}
									/>
								)}
								{state.key === "hover" && (
									<TokenReadout targetRef={hoverRef} rows={[{ label: "bg", cssVar: segmentVar.backgroundHover() }]} />
								)}
								{state.key === "selected" && (
									<TokenReadout
										targetRef={selectedRef}
										rows={[{ label: "bg", cssVar: segmentVar.backgroundSelected() }]}
									/>
								)}
							</div>
						))}
					</div>
					<CodeBlock
						code={[
							"// Default and Selected apply automatically from value/onChange -- no prop needed",
							'<SegmentGroup value={value} onChange={setValue}>',
							'  <Segment value="a">Segment Text</Segment>',
							"</SegmentGroup>",
							"",
							"// Hover is real :hover -- nothing to set either",
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Field Title">
				<div className="ap-segment-group-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Figma keeps this as a separate "Segment Group with Field Title" component -- here it's just the
						optional <code>fieldTitle</code> prop, rendered as a label above the group.
					</p>
				</div>
				<div className="ap-segment-group-section-example">
					<div className="ap-segment-group-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<div className="ap-segment-group-swatch">
							<div data-theme="core" data-viewport="desktop">
								<SegmentGroup fieldTitle="Field Title" value="a" onChange={() => {}}>
									<Segment value="a">Segment Text</Segment>
									<Segment value="b">Segment Text</Segment>
									<Segment value="c">Segment Text</Segment>
								</SegmentGroup>
							</div>
							<div className="ap-segment-group-swatch-label">With field title</div>
							<TokenReadout
								targetRef={groupRef}
								rows={[{ label: "label font", cssVar: segmentGroupVar.fieldTitleText() }]}
							/>
						</div>
						<div className="ap-segment-group-swatch">
							<div data-theme="core" data-viewport="desktop">
								<SegmentGroup value="a" onChange={() => {}}>
									<Segment value="a">Segment Text</Segment>
									<Segment value="b">Segment Text</Segment>
									<Segment value="c">Segment Text</Segment>
								</SegmentGroup>
							</div>
							<div className="ap-segment-group-swatch-label">Without field title</div>
						</div>
					</div>
					<CodeBlock
						code={[
							'<SegmentGroup fieldTitle="Field Title" value={value} onChange={setValue}>',
							'  <Segment value="a">Segment Text</Segment>',
							"</SegmentGroup>",
						].join("\n")}
					/>
				</div>
			</Section>
		</div>
	);
}
