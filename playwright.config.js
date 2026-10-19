import { defineConfig } from "@playwright/test";

/**
 * Drives the a11y checks in tests/a11y.spec.js against a built Storybook
 * (storybook-static/, produced by `npm run build-storybook`). The
 * webServer block starts/stops that static server automatically, so
 * `npx playwright test` is the only command needed locally or in CI.
 */
export default defineConfig({
	testDir: "tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: "list",
	use: {
		baseURL: "http://localhost:6006",
	},
	webServer: {
		command: "npm run serve-storybook",
		url: "http://localhost:6006",
		reuseExistingServer: !process.env.CI,
		timeout: 30_000,
	},
});
