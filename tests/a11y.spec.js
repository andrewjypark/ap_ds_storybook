import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * One test per Storybook story, generated from storybook-static/index.json
 * (produced by `npm run build-storybook`, which playwright.config.js's
 * webServer also depends on). Each story's iframe is checked directly with
 * axe-core rather than going through Storybook's own test-runner -- that
 * package's Jest layer doesn't support this project's ESM Storybook config
 * (see README's CI section for the "module.register() is not supported in
 * Jest" failure this replaced).
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, "../storybook-static/index.json");
const { entries } = JSON.parse(readFileSync(indexPath, "utf-8"));

const stories = Object.values(entries).filter((entry) => entry.type === "story");

for (const story of stories) {
	test(`a11y: ${story.title} / ${story.name}`, async ({ page }) => {
		await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
		await page.locator("#storybook-root").waitFor({ state: "attached" });

		const results = await new AxeBuilder({ page })
			.include("#storybook-root")
			.analyze();

		expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
	});
}
