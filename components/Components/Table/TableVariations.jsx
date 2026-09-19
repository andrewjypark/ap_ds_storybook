import React, { useRef, useState } from "react";
import { TableRow } from "./TableRow.jsx";
import { TableCell } from "./TableCell.jsx";
import { Icon } from "../Icon/Icon.jsx";
import { Button } from "../Button/Button.jsx";
import { FaSort, FaCaretDown, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { TokenReadout } from "./TokenReadout.jsx";
import { ROW_VARIANTS, tableRowVar, tableCellVar } from "./tableTokens.js";
import { CodeBlock } from "../CodeBlock.jsx";
import "./Table.css";

function Section({ title, children }) {
	return (
		<section className="ap-table-section">
			<h3 className="ap-table-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-table-section-body">{children}</div>
		</section>
	);
}

/**
 * The Table's "Variations" page -- documentation-first, same format as
 * every other Tier 3 component's own Variations page. No Playground
 * page, matching Text Input's/Segment Group's/Dropdown's precedent.
 *
 * Sourced from the real "table_row_072426"/"table_row_cell_container"
 * Figma component sets via the Desktop Bridge plugin -- see
 * tableTokens.js for the full audit. Scoped to the row + cell
 * PRIMITIVES only (per the scoping conversation that preceded this
 * build) -- no status-badge/split-button/sorting-state components,
 * just the structural building blocks shown composed into a real
 * example table at the end.
 */
export function TableVariations() {
	const [checked, setChecked] = useState({ a: false, b: true });
	const defaultRowRef = useRef(null);
	const altRowRef = useRef(null);
	const headerCellRef = useRef(null);
	const bodyCellRef = useRef(null);

	return (
		<div>
			<h3 className="ap-color-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Table
			</h3>

			<Section title="Row">
				<div className="ap-table-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						<code>&lt;TableRow&gt;</code> is a plain container -- Figma's real component has no properties
						beyond its own <code>Type</code> variant. A row's cells are just however many{" "}
						<code>&lt;TableCell&gt;</code> children you give it, the same "no properties, real composition"
						shape as <code>&lt;DropdownMenu&gt;</code> holding <code>&lt;DropdownMenuRow&gt;</code>s.
					</p>
					<ul>
						<li>
							<code>header</code> -- the header row.
						</li>
						<li>
							<code>body</code> -- a standard body row.
						</li>
						<li>
							<code>body-alt</code> -- Figma's "body_row_alt_bg_color" -- a body row with the alternate
							(striped) background.
						</li>
					</ul>
				</div>
				<div className="ap-table-section-example">
					<div className="ap-table-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{ROW_VARIANTS.map((v) => (
							<div className="ap-table-swatch" key={v.key}>
								<div className="ap-table-demo" data-theme="core" data-viewport="desktop">
									<TableRow
										variant={v.key}
										ref={v.key === "body" ? defaultRowRef : v.key === "body-alt" ? altRowRef : undefined}
									>
										<TableCell type={v.key === "header" ? "header" : "body"} text="Table row text" />
										<TableCell type={v.key === "header" ? "header" : "body"} text="Table row text" />
									</TableRow>
								</div>
								<div className="ap-table-swatch-label">{v.label}</div>
								{v.key === "body" && (
									<TokenReadout targetRef={defaultRowRef} rows={[{ label: "bg", cssVar: tableRowVar.background("default") }]} />
								)}
								{v.key === "body-alt" && (
									<TokenReadout targetRef={altRowRef} rows={[{ label: "bg", cssVar: tableRowVar.background("alt") }]} />
								)}
							</div>
						))}
					</div>
					<CodeBlock
						code={[
							'<TableRow variant="header">',
							'  <TableCell type="header" text="Name" />',
							"</TableRow>",
							"",
							'<TableRow variant="body-alt">',
							'  <TableCell type="body" text="Table row text" />',
							"</TableRow>",
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Cell Types">
				<div className="ap-table-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Figma's real "table_row_cell_container" has five real <code>Type</code> variants, mapped onto{" "}
						<code>&lt;TableCell type="..."&gt;</code>: <strong>header</strong> (bold label + optional
						sort/filter icon), <strong>body</strong> (text, an optional icon, and an optional second line --
						e.g. a subject line under a name), <strong>slot</strong> (arbitrary content -- Figma's own
						example drops in two action-icon buttons), <strong>empty</strong> (a spacer), and{" "}
						<strong>checkbox</strong> (a real <code>&lt;Checkbox&gt;</code>).
					</p>
				</div>
				<div className="ap-table-section-example">
					<div className="ap-table-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<div className="ap-table-swatch">
							<div className="ap-table-demo" data-theme="core" data-viewport="desktop">
								<TableRow variant="header">
									<TableCell
										ref={headerCellRef}
										type="header"
										text="Name"
										showIcon
										icon={<Icon icon={FaSort} size="xs" />}
									/>
								</TableRow>
							</div>
							<div className="ap-table-swatch-label">Header Title</div>
							<TokenReadout targetRef={headerCellRef} rows={[{ label: "text", cssVar: tableCellVar.headerFont() }]} />
						</div>
						<div className="ap-table-swatch">
							<div className="ap-table-demo" data-theme="core" data-viewport="desktop">
								<TableRow>
									<TableCell
										ref={bodyCellRef}
										type="body"
										text="Email Internal Name"
										secondaryText="Subj: Subject Line"
									/>
								</TableRow>
							</div>
							<div className="ap-table-swatch-label">Body Text (two lines)</div>
							<TokenReadout targetRef={bodyCellRef} rows={[{ label: "text", cssVar: tableCellVar.bodyFont() }]} />
						</div>
						<div className="ap-table-swatch">
							<div className="ap-table-demo" data-theme="core" data-viewport="desktop">
								<TableRow>
									<TableCell type="slot">
										<Button
											priority="ghost"
											size="small"
											showText={false}
											showLeftIcon={false}
											showRightIcon
											rightIcon={<Icon icon={FaRegPenToSquare} size="small" />}
											aria-label="Edit"
										/>
										<Button
											priority="ghost"
											size="small"
											showText={false}
											showLeftIcon={false}
											showRightIcon
											rightIcon={<Icon icon={FaRegTrashCan} size="small" />}
											aria-label="Delete"
										/>
									</TableCell>
								</TableRow>
							</div>
							<div className="ap-table-swatch-label">Slot (actions)</div>
						</div>
						<div className="ap-table-swatch">
							<div className="ap-table-demo" data-theme="core" data-viewport="desktop">
								<TableRow>
									<TableCell type="empty" />
								</TableRow>
							</div>
							<div className="ap-table-swatch-label">Empty Slot</div>
						</div>
						<div className="ap-table-swatch">
							<div className="ap-table-demo" data-theme="core" data-viewport="desktop">
								<TableRow>
									<TableCell
										type="checkbox"
										checked={checked.a}
										onChange={(v) => setChecked((c) => ({ ...c, a: v }))}
									/>
								</TableRow>
							</div>
							<div className="ap-table-swatch-label">Checkbox</div>
						</div>
					</div>
					<CodeBlock
						code={[
							'<TableCell type="header" text="Name" showIcon icon={<Icon icon={FaSort} size="xs" />} />',
							"",
							'<TableCell type="body" text="Email Internal Name" secondaryText="Subj: Subject Line" />',
							"",
							'<TableCell type="slot">',
							'  <Button priority="ghost" size="small" showText={false} showLeftIcon={false}',
							'    showRightIcon rightIcon={<Icon icon={FaRegPenToSquare} size="small" />} aria-label="Edit" />',
							'  <Button priority="ghost" size="small" showText={false} showLeftIcon={false}',
							'    showRightIcon rightIcon={<Icon icon={FaRegTrashCan} size="small" />} aria-label="Delete" />',
							"</TableCell>",
							"",
							'<TableCell type="checkbox" checked={checked} onChange={setChecked} />',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Example">
				<div className="ap-table-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						A real table, built entirely from the primitives above -- a <code>header</code>{" "}
						<code>&lt;TableRow&gt;</code> followed by alternating <code>body</code>/<code>body-alt</code>{" "}
						rows, each holding a mix of cell types. This is the composition pattern Figma's own
						"notifications_dashboard" example uses -- rows placed one after another, no separate table
						container component.
					</p>
				</div>
				<div className="ap-table-section-example">
					<div className="ap-table-demo" data-theme="core" data-viewport="desktop">
						<TableRow variant="header">
							<TableCell type="checkbox" checked={false} />
							<TableCell type="header" text="Name" showIcon icon={<Icon icon={FaSort} size="xs" />} />
							<TableCell
								type="header"
								text="Notification Type"
								showIcon
								icon={<Icon icon={FaCaretDown} size="xs" />}
							/>
							<TableCell type="header" text="Updated At" showIcon icon={<Icon icon={FaSort} size="xs" />} />
							<TableCell type="empty" className="ap-table-cell--actions" />
						</TableRow>
						<TableRow variant="body">
							<TableCell type="checkbox" checked={checked.a} onChange={(v) => setChecked((c) => ({ ...c, a: v }))} />
							<TableCell type="body" text="Email Internal Name" secondaryText="Subj: Subject Line" />
							<TableCell type="body" text="Email" />
							<TableCell type="body" text="7/9/2026" />
							<TableCell type="slot" className="ap-table-cell--actions">
								<Button
									priority="ghost"
									size="small"
									showText={false}
									showLeftIcon={false}
									showRightIcon
									rightIcon={<Icon icon={FaRegPenToSquare} size="small" />}
									aria-label="Edit"
								/>
								<Button
									priority="ghost"
									size="small"
									showText={false}
									showLeftIcon={false}
									showRightIcon
									rightIcon={<Icon icon={FaRegTrashCan} size="small" />}
									aria-label="Delete"
								/>
							</TableCell>
						</TableRow>
						<TableRow variant="body-alt">
							<TableCell type="checkbox" checked={checked.b} onChange={(v) => setChecked((c) => ({ ...c, b: v }))} />
							<TableCell type="body" text="Email Internal Name" secondaryText="Subj: Subject Line" />
							<TableCell type="body" text="Email" />
							<TableCell type="body" text="7/9/2026" />
							<TableCell type="slot" className="ap-table-cell--actions">
								<Button
									priority="ghost"
									size="small"
									showText={false}
									showLeftIcon={false}
									showRightIcon
									rightIcon={<Icon icon={FaRegPenToSquare} size="small" />}
									aria-label="Edit"
								/>
								<Button
									priority="ghost"
									size="small"
									showText={false}
									showLeftIcon={false}
									showRightIcon
									rightIcon={<Icon icon={FaRegTrashCan} size="small" />}
									aria-label="Delete"
								/>
							</TableCell>
						</TableRow>
					</div>
				</div>
			</Section>
		</div>
	);
}
