import React from "react";
import { TooltipVariations } from "./TooltipVariations.jsx";

/**
 * See Button.stories.jsx's comment on the shared bare
 * "Tier 3: Components/Components" title + tags: ["!autodocs"] -- this
 * makes "Tooltip" a flat page inside the "Components" folder, same as
 * every other Tier 3 component.
 */
export default {
	title: "Tier 3: Components/Components",
	tags: ["!autodocs"],
};

export const Tooltip = { render: () => <TooltipVariations /> };
