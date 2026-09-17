path = "components/Components/Icon/IconVariations.jsx"
with open(path) as f:
    content = f.read()

old = '''						<li>
							<strong>Button</strong> — its default left/right icon slot renders <code>FaCirclePlus</code>{" "}
							(Solid — no Regular cut exists for circle-plus), matching the real Figma component's own icon
							(see <a href="?path=/docs/tier-3-components-button-variations--docs">Button → Variations</a>).
						</li>'''

new = '''						<li>
							<strong>Button</strong> — its default left/right icon slot renders <code>FaPlus</code>, a
							bare plus mark. The real Figma component's icon slot was originally documented as
							circle-plus, but Font Awesome Free has no Regular cut of circle-plus or square-plus, so we
							moved to the bare plus mark instead -- it has no background shape to fill or outline, so it
							reads as outline-weight without needing a <code>FaReg</code> variant at all
							(see <a href="?path=/docs/tier-3-components-button-variations--docs">Button → Variations</a>).
						</li>'''

assert content.count(old) == 1, "bullet not found, count=%d" % content.count(old)
content = content.replace(old, new)

old2 = '<IconSwatch swatchLabel="Button (default)" icon={FaCirclePlus} size="medium" />'
new2 = '<IconSwatch swatchLabel="Button (default)" icon={FaPlus} size="medium" />'
assert content.count(old2) == 1, "swatch not found, count=%d" % content.count(old2)
content = content.replace(old2, new2)

with open(path, "w") as f:
    f.write(content)

print("done")
