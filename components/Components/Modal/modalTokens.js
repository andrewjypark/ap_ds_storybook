/**
 * Central place for the Tier 3 Modal's CSS custom property names build-
 * tokens.js generates from tokens.json's "tier_3/modal" set (see
 * tokens/sets/tier_3/modal.json and the generated build output) -- same
 * pattern as Button/buttonTokens.js: keeps every "--ap-modal-..." var
 * name construction in one spot instead of hand-typing strings across
 * Modal.jsx / ModalVariations.jsx / TokenReadout.jsx.
 *
 * Values were pulled from the real Figma "Modal" frame (Storybook
 * Planning file, node 38:3371, captured 2026-09-18) and mapped onto the
 * closest EXISTING tier_2 semantic tokens rather than hand-typed hex --
 * same reasoning as Button's own token audit:
 *   - modal surface / divider / body-text colors matched tier_2's
 *     background.base_weak / border.subtle / content.default almost
 *     exactly (#ffffff, #e1e4e7, #23272b vs Figma's unlinked #fcfdff,
 *     #e2e4e8, #272a30).
 *   - the drop shadow matched core token elevation-05 -- literally
 *     annotated "Use for: Modals" in tokens.json -- rather than Figma's
 *     unlinked one-layer shadow.
 *   - the warning banner ("Add to Section" example / emailer_section_
 *     settings_modal_content) mapped to the utility.warning color triad
 *     (background / content-as-border / background-knockout-as-text),
 *     matching the knockout pattern used elsewhere in tier_2 for text
 *     drawn on a colored surface.
 *   - Figma's modal corner radius (10px) and banner corner radius (6px)
 *     are unlinked one-off values with no exact match in the border-
 *     radius scale (0/4/8/16/32) -- snapped to the nearest step (8px /
 *     4px respectively, tier_2 "md" / "small") rather than introducing a
 *     new scale value for one component.
 */

export const modalVar = {
	color: (part) => `--ap-modal-color-${part}`,
	borderRadius: () => `--ap-modal-border-radius`,
	boxShadow: () => `--ap-modal-box-shadow`,
	width: () => `--ap-modal-width`,
	header: (part) => `--ap-modal-header-section-${part}`,
	body: (part) => `--ap-modal-body-section-${part}`,
	footer: (part) => `--ap-modal-footer-section-${part}`,
	banner: (part) => `--ap-modal-banner-${part}`,
};
