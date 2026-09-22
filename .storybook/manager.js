import { addons } from "storybook/manager-api";

/**
 * Hides the bottom addon panel (Controls / Actions / Interactions /
 * Accessibility tabs) entirely. None of those had anything to show here --
 * see the `features` and `addons` notes in main.js -- so the panel was just
 * an empty strip under every page. layoutCustomisations.showPanel (rather
 * than layout.showPanel) is used so this wins over any panel state a
 * browser may have remembered from before.
 *
 * To bring the panel back (e.g. for a Button Playground page that uses
 * Controls), delete the showPanel line below and re-enable the matching
 * addon/feature in main.js.
 */
addons.setConfig({
	layoutCustomisations: {
		showPanel: () => false,
	},
});
