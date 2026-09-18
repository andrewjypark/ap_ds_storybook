import React from "react";
import { TextInputVariations } from "./TextInputVariations.jsx";

/**
 * Text Input has no Core/Green/Gold theming yet either (see the project
 * doc's Text Input audit) -- one page covers every theme, same as Button.
 *
 * See Button.stories.jsx's comment on the shared bare
 * "Tier 3: Components/Components" title + tags: ["!autodocs"] -- this
 * makes "Text Input" a flat page inside the "Components" folder (which
 * keeps "Tier 3: Components" itself a real root, matching Tier 1/Tier 2),
 * no further sub-group, no Docs tab. The export name is camelCase
 * ("TextInput") because "Text Input" isn't a valid JS identifier --
 * Storybook renders the sidebar name in Title Case regardless.
 */
export default {
	title: "Tier 3: Components/Components",
	tags: ["!autodocs"],
};

export const TextInput = { render: () => <TextInputVariations /> };
