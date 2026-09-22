import React from "react";
import { Intro } from "./Intro.jsx";

/**
 * Bare, single-segment title ("Getting Started", no "/") -- deliberately
 * NOT nested under a longer path. Per .storybook/preview.jsx's own
 * storySort comment (see the "Tier 3: Components" note there), a bare
 * title becomes a root that Storybook always renders above every
 * storySort-ordered group, regardless of sort order -- so this needs no
 * storySort entry to land above Tier 1/2/3, and it's the first story
 * Storybook auto-selects when the site loads with no path, which is the
 * whole point of a landing page. tags: ["!autodocs"] cancels the
 * project-wide autodocs tag (set in preview.jsx) so there's no separate
 * auto-generated "Docs" entry alongside this one page -- same reasoning
 * Tier 3 components use.
 */
export default {
	title: "Getting Started",
	tags: ["!autodocs"],
};

export const Overview = { render: () => <Intro /> };
