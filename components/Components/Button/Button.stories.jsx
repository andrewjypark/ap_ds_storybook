import React from "react";
import { ButtonVariations } from "./ButtonVariations.jsx";

/**
 * Button colors have no Core/Green/Gold theming yet (see the project
 * doc's Figma button audit) -- one page covers every theme, same as
 * Tier 1's Border page.
 *
 * Title has no "Button" segment of its own -- every Tier 3 component
 * shares the bare "Tier 3: Components/Components" title now, and each
 * one's own story export name (below) is what puts it directly under
 * that "Components" folder as its own flat, clickable page -- no
 * per-component sub-group, no twisty. This is what keeps "Tier 3:
 * Components" itself a real root (bold, same level/position as Tier 1/
 * Tier 2) -- since no story's title is ever just "Tier 3: Components"
 * on its own anymore, only "Tier 3: Components/Components", Storybook
 * has nothing forcing it to be treated as an ordinary top-level
 * component instead of a root. tags: ["!autodocs"] cancels the
 * project-wide autodocs tag (preview.jsx) for this file so no separate
 * "Docs" entry is generated either -- just this one page.
 */
export default {
	title: "Tier 3: Components/Components",
	tags: ["!autodocs"],
};

export const Button = { render: () => <ButtonVariations /> };
