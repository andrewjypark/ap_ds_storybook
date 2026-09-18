/**
 * Real property value lists + the CSS custom property names build-tokens.js
 * generates for them (see tokens.json's "tier_3/dropdown" set and
 * build/tier_1_core/css/variables.css) -- same pattern as buttonTokens.js /
 * textInputTokens.js / segmentGroupTokens.js.
 *
 * Sourced from the real "emailer_drowdown_menu_row" / "emailer_dropdown_menu"
 * / "Dropdown_Field_070326" Figma components ("Storybook Planning" file,
 * "Components from GT" page) via the Desktop Bridge plugin -- see the
 * project doc's Dropdown Menu section for the full audit and the Figma
 * variable-assignment pass that preceded this build (the menu row's Hover/
 * Selected backgrounds and the divider line were bound to a wrong remote
 * "ColorBox Colors" library, same trap as Segment Group's first pass --
 * corrected to the real tokens.json-backed tier_2 tokens applied via Tokens
 * Studio before any of this was built).
 *
 * Three real variant axes across the three sub-components:
 *   emailer_drowdown_menu_row -- State: Default/Hover/Selected/
 *     menu_row_divider, Content: "Text and Icon"/"Slot"
 *   emailer_dropdown_menu -- no properties (a plain list container)
 *   Dropdown_Field_070326 -- State: Default/Active, plus Show Field Title
 *     Section / Show Slot Container - Left / Show Slot Container - Right
 *     booleans
 *
 * dropdown_menu's `box-shadow` (elevation-04, tier_1_core's "Use for:
 * Menus" step) was added once the composed <Dropdown> switched from
 * rendering the menu in normal flow to a real floating overlay -- see
 * Dropdown.jsx's/Dropdown.css's own doc comments for that change. Not
 * something the original Figma audit called out (the "Components from
 * GT" nesting had the menu in-flow under the field, no shadow needed
 * there), so this is a real, deliberate design-system addition rather
 * than a value carried over from Figma.
 *
 * Row icon size and the field's slot icon sizes were not measured off
 * Figma this round (the audit focused on color/radius/typography, not
 * icon pixel dimensions) -- rather than invent one-off sizing tokens,
 * those render through the shared <Icon> wrapper (../Icon/Icon.jsx) and
 * its xs/small/medium/large scale, the same "flag the assumption, use
 * the closest real thing" approach the Text Input audit used for its own
 * unconfirmed color mappings.
 *
 * The field title icon briefly had its own dedicated 14px one-off
 * tokens here (mirroring Text Input's own dedicated field-title icon
 * size), but that got folded into the shared Icon scale as a new "xs"
 * (12px) step instead once it became clear "smaller than small" wasn't
 * a Dropdown-only need -- see Icon/iconTokens.js and DropdownField.jsx
 * (`<Icon icon={FaCircleInfo} size="xs" />`).
 */

export const ROW_STATES = [
	{ key: "default", label: "Default" },
	{ key: "hover", label: "Hover" },
	{ key: "selected", label: "Selected" },
];

export const FIELD_STATES = [
	{ key: "default", label: "Default" },
	{ key: "active", label: "Active" },
];

export const dropdownMenuRowVar = {
	background: (state) => `--ap-dropdown-menu-row-color-background-${state}`, // default | hover | selected
	divider: () => `--ap-dropdown-menu-row-color-divider`,
	text: () => `--ap-dropdown-menu-row-color-text`,
	paddingHorizontal: () => `--ap-dropdown-menu-row-padding-horizontal`,
	paddingVertical: () => `--ap-dropdown-menu-row-padding-vertical`,
	gap: () => `--ap-dropdown-menu-row-gap`,
	font: () => `--ap-dropdown-menu-row-text`,
};

export const dropdownMenuVar = {
	background: () => `--ap-dropdown-menu-color-background`,
	borderRadius: () => `--ap-dropdown-menu-border-radius`,
	paddingVertical: () => `--ap-dropdown-menu-padding-vertical`,
	boxShadow: () => `--ap-dropdown-menu-box-shadow`,
};

export const dropdownFieldVar = {
	background: () => `--ap-dropdown-field-color-background`,
	border: (state) => `--ap-dropdown-field-color-border-${state}`, // default | active
	borderWidth: () => `--ap-dropdown-field-border-width`,
	borderRadius: () => `--ap-dropdown-field-border-radius`,
	text: () => `--ap-dropdown-field-color-text`,
	label: () => `--ap-dropdown-field-color-label`,
	description: () => `--ap-dropdown-field-color-description`,
	paddingHorizontal: () => `--ap-dropdown-field-padding-horizontal`,
	paddingVertical: () => `--ap-dropdown-field-padding-vertical`,
	gap: () => `--ap-dropdown-field-gap`,
	fieldTitleGap: () => `--ap-dropdown-field-field-title-gap`,
	font: () => `--ap-dropdown-field-text`,
	labelFont: () => `--ap-dropdown-field-label-text`,
};
