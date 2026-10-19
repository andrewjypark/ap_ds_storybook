/**
 * Runs via `npm run test-storybook` (see package.json). For every story,
 * injects axe into the page and checks the rendered root for a11y
 * violations -- fails the test-runner (and CI) if any are found.
 */
import { injectAxe, checkA11y } from "axe-playwright";

export default {
	async preVisit(page) {
		await injectAxe(page);
	},
	async postVisit(page) {
		await checkA11y(page, "#storybook-root", {
			detailedReport: true,
			detailedReportOptions: { html: true },
		});
	},
};
