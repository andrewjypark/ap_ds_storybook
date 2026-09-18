import React from "react";
import { DropdownVariations } from "./DropdownVariations.jsx";

/**
 * See Button.stories.jsx's comment on the shared bare
 * "Tier 3: Components/Components" title + tags: ["!autodocs"] -- this
 * makes "Dropdown" a flat page inside the "Components" folder (which
 * keeps "Tier 3: Components" itself a real root, matching Tier 1/
 * Tier 2), no further sub-group, no Docs tab.
 */
export default {
	title: "Tier 3: Components/Components",
	tags: ["!autodocs"],
};

export const Dropdown = { render: () => <DropdownVariations /> };
