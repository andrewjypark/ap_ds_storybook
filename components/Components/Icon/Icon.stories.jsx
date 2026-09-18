import React from "react";
import { IconVariations } from "./IconVariations.jsx";

/**
 * Icons have no Core/Green/Gold theming yet (single mode, same as
 * Button/Text Input) -- one page covers every theme.
 *
 * See Button.stories.jsx's comment on the shared bare
 * "Tier 3: Components/Components" title + tags: ["!autodocs"] -- this
 * makes "Icon" a flat page inside the "Components" folder (which keeps
 * "Tier 3: Components" itself a real root, matching Tier 1/Tier 2), no
 * further sub-group, no Docs tab.
 */
export default {
	title: "Tier 3: Components/Components",
	tags: ["!autodocs"],
};

export const Icon = { render: () => <IconVariations /> };
