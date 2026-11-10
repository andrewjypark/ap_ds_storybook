import React, { useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { Button } from "../Components/Button/Button.jsx";
import pkg from "../../package.json";
import "./Intro.css";
import "./Installing.css";

/**
 * "Getting Started / Installing AP Design System" -- the consumer-facing
 * install guide, sitting right under Overview (export order in
 * GettingStarted.stories.jsx decides that; "Getting Started" isn't in
 * preview.jsx's storySort list, so its stories keep file order).
 *
 * Reuses Intro.css's page/section classes so the two Getting Started pages
 * read as one set, pinned to the internal storybook_ds theme the same way
 * Intro.jsx is. Code samples are always visible here (unlike CodeBlock.jsx's
 * collapsed "Show code" pattern on Variations pages) since on an install
 * guide the code IS the content.
 *
 * Version numbers in the CDN examples come from package.json, so they stay
 * current every time the version is bumped -- no hand-edits needed here.
 */

const VERSION = pkg.version;

function Section({ title, id, children }) {
	return (
		<section className="ap-intro-section" id={id}>
			<h3 className="ap-intro-section-title">{title}</h3>
			<div className="ap-intro-section-body">{children}</div>
		</section>
	);
}

function Step({ n, title, children }) {
	return (
		<div className="ap-install-step">
			<div className="ap-install-step-num" aria-hidden="true">
				{n}
			</div>
			<div className="ap-install-step-body">
				<h4 className="ap-install-step-title">
					<span className="ap-install-visually-hidden">Step {n}: </span>
					{title}
				</h4>
				{children}
			</div>
		</div>
	);
}

function Snippet({ code, label }) {
	const [state, setState] = useState("idle");
	const timer = useRef(null);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setState("copied");
		} catch {
			setState("failed");
		}
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setState("idle"), 2000);
	};
	return (
		<div className="ap-install-snippet">
			<div className="ap-install-snippet-bar">
				<span className="ap-install-snippet-label">{label}</span>
				<Button
					size="small"
					priority="ghost"
					radius="sm"
					showLeftIcon
					leftIcon={<FaRegCopy aria-hidden="true" focusable="false" />}
					onClick={copy}
				>
					{state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
				</Button>
			</div>
			<pre className="ap-install-snippet-pre">
				<code>{code}</code>
			</pre>
		</div>
	);
}

function Callout({ title, children }) {
	return (
		<div className="ap-install-callout">
			<div className="ap-install-callout-title">{title}</div>
			<div>{children}</div>
		</div>
	);
}

function Table({ head, rows }) {
	return (
		<div className="ap-install-table-wrap">
			<table className="ap-install-table">
				<thead>
					<tr>
						{head.map((h) => (
							<th key={h} scope="col">
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((r, i) => (
						<tr key={i}>
							{r.map((c, j) => (
								<td key={j}>{c}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

const C = ({ children }) => <code className="ap-install-inline-code">{children}</code>;

export function Installing() {
	return (
		<div className="ap-intro ap-install" data-theme="storybook_ds" data-viewport="desktop">
			<h3 className="ap-section__title">Installing AP Design System</h3>
			<p className="ap-intro-lede">
				AP Design System is published on npm as <C>ap-ds-storybook</C>. This page walks through adding it to a project, and wiring it into your app.
			</p>

			<Section title="Before you start">
				<ul>
					<li>
						<strong>React 18 or newer.</strong> React is a peer dependency, so the package uses your project's
						own copy.
					</li>
					<li>
						<strong>A bundler that compiles JSX.</strong> The package ships its components as JSX source, not a
						pre-built bundle. Next.js and Vite both work; Next.js needs one config line (Step 2).
					</li>
					<li>
						<strong>Run commands from your project's root</strong> — the folder with your{" "}
						<C>package.json</C>.
					</li>
				</ul>
			</Section>

			<Section title="Install and set up">
				<Step n={1} title="Install the package">
					<Snippet label="Terminal" code={`npm install ap-ds-storybook@latest`} />
					<p>
						This adds <C>ap-ds-storybook</C> to your <C>package.json</C> dependencies and downloads it into{" "}
						<C>node_modules</C>.
					</p>
				</Step>

				<Step n={2} title="Let your bundler compile it">
					<p>
						In Next.js, add the package to <C>transpilePackages</C> in <C>next.config.mjs</C> (or{" "}
						<C>next.config.ts</C>). Without this, Next.js won't compile JSX coming from <C>node_modules</C>{" "}
						and the build fails with a syntax error.
					</p>
					<Snippet
						label="next.config.mjs"
						code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["ap-ds-storybook"],
};

export default nextConfig;`}
					/>
					<p>
						With Vite or another bundler, make sure it processes JSX/ESM from{" "}
						<C>node_modules/ap-ds-storybook</C>.
					</p>
				</Step>

				<Step n={3} title="Import the styles and set a theme in your root layout">
					<p>
						Import the token CSS once, put <C>data-theme</C> on <C>&lt;html&gt;</C>, and mount{" "}
						<C>&lt;ViewportSync /&gt;</C> once. In the Next.js App Router that's <C>app/layout.js</C>:
					</p>
					<Snippet
						label="app/layout.js"
						code={`import "ap-ds-storybook/build/all-combinations/css/variables.css";
import "ap-ds-storybook/styles/base.css";
import { ViewportSync } from "ap-ds-storybook";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="core">
      <body>
        <ViewportSync />
        {children}
      </body>
    </html>
  );
}`}
					/>
					<p>
						<C>variables.css</C> must load before <C>base.css</C>, because <C>base.css</C> uses the{" "}
						<C>--ap-*</C> tokens it defines. <C>&lt;ViewportSync /&gt;</C> sets <C>data-viewport</C> on{" "}
						<C>&lt;html&gt;</C> to <C>desktop</C>, <C>tablet</C> or <C>mobile</C> and updates it as the
						window resizes.
					</p>
				</Step>

				<Step n={4} title="Load the fonts for your theme">
					<p>
						<C>variables.css</C> names font families but doesn't load them. Import the <C>@font-face</C> file
						for each family your theme uses, next to the other imports:
					</p>
					<Table
						head={["Theme", "Fonts to import"]}
						rows={[
							[<C>core</C>, "twk-lausanne, twk-continental, novela"],
							[<C>basil</C>, "basier-circle, basier-square, basier-square-mono"],
							[<C>molasses</C>, "nudica, quablo, bricolage-grotesque"],
						]}
					/>
					<Snippet
						label="app/layout.js (core theme)"
						code={`import "ap-ds-storybook/assets/fonts/twk-lausanne/twk-lausanne.css";
import "ap-ds-storybook/assets/fonts/twk-continental/twk-continental.css";
import "ap-ds-storybook/assets/fonts/novela/novela.css";`}
					/>
					<p>
						Dark variants use the same fonts as their base theme. If your app switches themes at runtime, load
						the fonts for every theme it can switch to.
					</p>
				</Step>

				<Step n={5} title="Use the components and tokens in your files">
					<p>Import components from the package root:</p>
					<Snippet
						label="app/page.js"
						code={`"use client";

import { useState } from "react";
import { Button, Checkbox, TextInput } from "ap-ds-storybook";

export default function Page() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <form>
      <TextInput
        fieldTitleText="Email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Checkbox checked={agreed} onChange={setAgreed} aria-label="I agree" />
      <Button priority="primary" disabled={!agreed}>
        Sign up
      </Button>
    </form>
  );
}`}
					/>
					<p>
						Each component brings its own CSS, so there's nothing extra to import per component. In your own
						stylesheets, use the tokens with <C>var()</C>:
					</p>
					<Snippet
						label="app/page.module.css"
						code={`.card {
  background: var(--ap-tier-2-color-background-surface-secondary);
  color: var(--ap-tier-2-color-content-default);
  font: var(--ap-tier-2-typography-body-sm);
}`}
					/>
				</Step>
			</Section>

			<Section title="Things to look out for">
				<Callout title={<>Put <C>data-theme</C> on <C>&lt;html&gt;</C>, not a wrapper <C>&lt;div&gt;</C></>}>
					Every token is scoped to a compound selector like <C>[data-theme="core"][data-viewport="desktop"]</C>,
					so both attributes have to be on the same element. <C>&lt;ViewportSync /&gt;</C> always writes{" "}
					<C>data-viewport</C> onto <C>&lt;html&gt;</C>, so a theme set anywhere else never matches. There's
					no error: every <C>--ap-*</C> value just resolves to nothing and the page looks unstyled.
				</Callout>
				<Callout title={<>Don't hardcode <C>data-viewport</C></>}>
					Responsive tokens (font sizes, line heights) switch on the <C>data-viewport</C> attribute, not on
					media queries. A hardcoded <C>data-viewport="desktop"</C> never changes when the window resizes. Leave
					it off and let <C>&lt;ViewportSync /&gt;</C> manage it.
				</Callout>
				<Callout title="Missing fonts fall back silently">
					If you skip Step 4, the browser uses whatever copy of the font is installed locally, or a system
					fallback. Locally installed copies can be broken and render as empty boxes, so always import the
					package's own font files.
				</Callout>
				<Callout title={<>A plain <C>npm install</C> won't upgrade you</>}>
					If <C>package-lock.json</C> already has a version that fits your range, <C>npm install</C> keeps it.
					To get a newer release, name the package: <C>npm install ap-ds-storybook@latest</C> or{" "}
					<C>npm update ap-ds-storybook</C>. Check what you have with <C>npm ls ap-ds-storybook</C>.
				</Callout>
				<Callout title={<>Not every <C>onChange</C> gives you an event</>}>
					<C>TextInput</C> wraps a real <C>&lt;input&gt;</C>, so its <C>onChange</C> receives an event (
					<C>e.target.value</C>). <C>Checkbox</C>, <C>Radio</C>, <C>Dropdown</C> and <C>SegmentGroup</C> call{" "}
					<C>onChange</C>/<C>onSelect</C> with the new value directly. Using <C>e.target.value</C> with
					those will break.
				</Callout>
				<Callout title="Next.js: interactive components need a client component">
					Components with state or event handlers have to be used inside a file marked{" "}
					<C>"use client"</C> (or a child of one). <C>&lt;ViewportSync /&gt;</C> already handles this
					itself, so it's safe to drop into a server layout.
				</Callout>
			</Section>

			<Section title="What's included">
				<Table
					head={["What", "Where", "What it's for"]}
					rows={[
						[
							"React components",
							<C>ap-ds-storybook</C>,
							"Button, Checkbox, Dropdown, Icon, Link, Modal / ModalBanner, Radio, SegmentGroup, TableCell / TableRow, TextInput, Tooltip, ViewportSync",
						],
						[
							"Design tokens (all themes)",
							<C>build/all-combinations/css/variables.css</C>,
							"Every Tier 1, 2 and 3 token as a CSS custom property, for every theme and viewport",
						],
						[
							"Base styles",
							<C>styles/base.css</C>,
							"A 12-column responsive grid (.ap_grid_container, .ap_grid_1), section padding helpers, and the global underline offset",
						],
						["Fonts", <C>assets/fonts/</C>, "Webfont files and @font-face CSS for every theme"],
						[
							"Viewport script (no React)",
							<C>styles/viewport-sync.js</C>,
							"The plain-JS version of <ViewportSync /> for static HTML pages",
						],
						[
							"Single-theme reference",
							<C>build/tier_1_core/css/variables.css</C>,
							"A smaller, Core-only token file, used to generate editor autocomplete",
						],
						[
							"Autocomplete generator",
							<C>npx ap-ds-storybook-snippets</C>,
							"Writes a VS Code snippets file so var(--ap-…) autocompletes",
						],
					]}
				/>
				<p>
					Themes you can set with <C>data-theme</C>: <C>core</C>, <C>basil</C>, <C>molasses</C>, and their dark
					versions <C>core_dark</C>, <C>basil_dark</C>, <C>molasses_dark</C>.
				</p>
			</Section>

			<Section title="Getting the most out of it">
				<ul>
					<li>
						<strong>Style with Tier 2 tokens.</strong> Use semantic tokens like{" "}
						<C>--ap-tier-2-color-content-default</C> rather than Tier 1 raw values. They're the layer that
						changes correctly when the theme or mode changes, so your own UI stays consistent with the
						components.
					</li>
					<li>
						<strong>Use the composite type styles.</strong> Tier 2 typography tokens are full{" "}
						<C>font</C> shorthands (size, weight, line height and family in one), so one line like{" "}
						<C>font: var(--ap-tier-2-typography-title-default)</C> gives you the right responsive type for
						each viewport.
					</li>
					<li>
						<strong>Switch themes and dark mode at runtime.</strong> Change the <C>data-theme</C> value on{" "}
						<C>&lt;html&gt;</C> (for example <C>document.documentElement.dataset.theme = "basil_dark"</C>).
						In dark mode, add <C>data-bg-style="neutral"</C> to <C>&lt;html&gt;</C> for neutral gray
						backgrounds instead of brand-tinted ones.
					</li>
					<li>
						<strong>Style plain links without the component.</strong> Add <C>ap_link_with_underline</C> or{" "}
						<C>ap_link_without_underline</C> to any <C>&lt;a&gt;</C> to get the Link colors and states.
					</li>
					<li>
						<strong>Lay out pages with the grid.</strong> Wrap content in <C>.ap_grid_container</C> &gt;{" "}
						<C>.ap_grid_1</C>; it collapses from 12 columns to 6 on tablet and mobile.
					</li>
					<li>
						<strong>Turn on token autocomplete.</strong> Run <C>npx ap-ds-storybook-snippets</C> from your
						project root, then reload VS Code. Typing <C>var(--ap-</C> in a CSS file then lists every token
						with its value. Re-run it after upgrading the package. The snippets file needs to sit in the{" "}
						<C>.vscode</C> folder at the root of the folder VS Code has open.
					</li>
					<li>
						<strong>Look up anything here first.</strong> Every swatch and component example in this
						storybook shows the exact CSS variable behind it, so you can copy the name straight into your
						code.
					</li>
				</ul>
			</Section>

			<Section title="Using it without a build step">
				<p>
					For a plain HTML page, link the files from jsDelivr, which serves the same npm package. Pin the version
					so an update can't change your site unexpectedly:
				</p>
				<Snippet
					label="index.html"
					code={`<html lang="en" data-theme="core">
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ap-ds-storybook@${VERSION}/build/all-combinations/css/variables.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ap-ds-storybook@${VERSION}/styles/base.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ap-ds-storybook@${VERSION}/assets/fonts/twk-lausanne/twk-lausanne.css" />
    <script src="https://cdn.jsdelivr.net/npm/ap-ds-storybook@${VERSION}/styles/viewport-sync.js"></script>
  </head>
  ...
</html>`}
				/>
				<p>
					The React components need a bundler, so on a static page you get the tokens, base styles, fonts and
					link classes, but not the components.
				</p>
			</Section>
		</div>
	);
}
