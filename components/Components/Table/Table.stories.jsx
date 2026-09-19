import React from "react";
import { TableVariations } from "./TableVariations.jsx";

/**
 * See Button.stories.jsx's comment on the shared bare
 * "Tier 3: Components/Components" title + tags: ["!autodocs"] -- this
 * makes "Table" a flat page inside the "Components" folder, same as
 * every other Tier 3 component.
 */
export default {
	title: "Tier 3: Components/Components",
	tags: ["!autodocs"],
};

export const Table = { render: () => <TableVariations /> };
