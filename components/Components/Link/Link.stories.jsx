import React from "react";
import { LinkVariations } from "./LinkVariations.jsx";

/**
 * No Core/Basil/Molasses theming yet (single mode, same as Button/
 * Checkbox/etc.) -- one page covers every theme. Same bare "Tier 3:
 * Components/Components" title convention as every other tier-3
 * component -- see Button.stories.jsx's comment for why.
 */
export default {
	title: "Tier 3: Components/Components",
	tags: ["!autodocs"],
};

export const Link = { render: () => <LinkVariations /> };
