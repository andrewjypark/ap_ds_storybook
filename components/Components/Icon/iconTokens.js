/**
 * Central place for the shared <Icon>'s real property values and the CSS
 * custom property names build-tokens.js generates for them (see
 * tokens.json's "tier_3/icon" set and build/tier_1_core/css/variables.css)
 * -- same pattern as buttonTokens.js / textInputTokens.js.
 *
 * This is a general-purpose small/medium/large icon-size scale, separate
 * from Button's own per-size icon width/height tokens and Text Input's
 * field-title/slot icon tokens -- those stay bound to their own specific
 * fixed container slots (see Button.css/.ap-button-icon-container and
 * TextInput.css/.ap-text-input-title-icon,.ap-text-input-slot-icon).
 * This scale is for any OTHER place an icon shows up on its own, sized
 * off one shared step instead of a one-off value. "medium" (20px)
 * intentionally matches Button's own medium icon width, so an icon
 * dropped next to a medium button lines up without extra thought.
 *
 * Icons have no Core/Green/Gold theming (single mode, same reasoning as
 * tier_3/buttons and tier_3/text-input) -- see build-tokens.js's
 * BASE_SOURCE.
 */

export const SIZES = [
	{ key: "small", label: "Small" },
	{ key: "medium", label: "Medium" },
	{ key: "large", label: "Large" },
];

export const iconVar = {
	size: (size) => `--ap-icon-size-${size}`,
};
