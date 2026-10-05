import React from "react";
import { ThemingPlayground } from "./ThemingPlayground.jsx";

/**
 * Bare, single-segment title ("Theming Playground", no "/") -- same
 * convention as GettingStarted.stories.jsx: per .storybook/preview.jsx's
 * storySort comment, a bare title becomes a root Storybook always renders
 * above every storySort-ordered group, so this needs no storySort entry.
 * tags: ["!autodocs"] cancels the project-wide autodocs tag (preview.jsx)
 * so there's no separate auto-generated "Docs" entry, same as every other
 * hand-authored page in this project.
 */
export default {
	title: "Theming Playground",
	tags: ["!autodocs"],
};

export const Overview = { render: () => <ThemingPlayground /> };
