/**
 * Real property value lists + the CSS custom property names build-tokens.js
 * generates for them (see tokens.json's "tier_3/segment-group" set and
 * build/tier_1_core/css/variables.css) -- same pattern as buttonTokens.js /
 * textInputTokens.js / iconTokens.js.
 *
 * Sourced from the real "Segment" / "Segment Group" / "Segment Group with
 * Field Title" / "Segment Content" Figma components ("Storybook Planning"
 * file, "Components from GT" page) via the Desktop Bridge plugin -- see the
 * project doc's Segment Group section for the full audit, the semantic
 * variable rebind (first bound to the wrong Figma library, corrected to
 * the real tokens.json-backed tier_2 tokens the same session), and why
 * corner radius landed on 8px (tier_2's borderRadius.md, the closest real
 * scale step to Figma's original 10px) rather than staying raw.
 *
 * Unlike Button/Text Input, Segment/SegmentGroup have almost no formal
 * Figma variant surface -- just Segment's own State axis (Default/Hover/
 * Selected) and Segment Content's Content axis (plain text vs. an icon +
 * caption, "Image Text Wrapper" in Figma). Segment Group itself exposes no
 * properties at all; how many Segments it holds is just however many
 * children you give it, and "Segment Group with Field Title" is really
 * just Segment Group plus one optional label above it -- folded into this
 * same component as a `fieldTitle` prop rather than built as a second,
 * near-duplicate component.
 */

export const STATES = [
	{ key: "default", label: "Default" },
	{ key: "hover", label: "Hover" },
	{ key: "selected", label: "Selected" },
];

export const CONTENT_TYPES = [
	{ key: "text", label: "Text" },
	{ key: "icon", label: "Icon + Caption" },
];

export const segmentGroupVar = {
	background: () => "--ap-segment-group-color-background",
	fieldTitleColor: () => "--ap-segment-group-color-field-title",
	borderRadius: () => "--ap-segment-group-border-radius",
	padding: () => "--ap-segment-group-padding",
	gap: () => "--ap-segment-group-gap",
	fieldTitleGap: () => "--ap-segment-group-field-title-gap",
	fieldTitleText: () => "--ap-segment-group-field-title-text",
};

export const segmentVar = {
	backgroundHover: () => "--ap-segment-color-background-hover",
	backgroundSelected: () => "--ap-segment-color-background-selected",
	text: () => "--ap-segment-color-text",
	paddingHorizontal: () => "--ap-segment-padding-horizontal",
	paddingVertical: () => "--ap-segment-padding-vertical",
	font: () => "--ap-segment-text",
	captionFont: () => "--ap-segment-caption-text",
	iconCaptionGap: () => "--ap-segment-icon-caption-gap",
};
