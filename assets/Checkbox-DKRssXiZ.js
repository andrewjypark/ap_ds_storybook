import{r as l,R as e}from"./iframe-Bw0DDBwf.js";const c=l.forwardRef(function({checked:t=!1,onChange:a,disabled:o=!1,"aria-label":n,...r},s){return e.createElement("button",{ref:s,type:"button",role:"checkbox","aria-checked":t,"aria-label":n,disabled:o,className:"ap-checkbox",onClick:()=>!o&&(a==null?void 0:a(!t)),...r},e.createElement("span",{className:"ap-checkbox-box"},t&&e.createElement("svg",{className:"ap-checkbox-checkmark",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true"},e.createElement("path",{d:"M3 8.5L6.2 11.5L13 4.5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}))))});c.__docgenInfo={description:`The real Tier 3 Checkbox -- Figma's "Checkbox" component (\`State\`:
\`Empty\`/\`Filled\`) built as a genuinely toggleable control, same
real-interaction bar as Segment Group/Dropdown rather than a static
mockup. Built as a \`role="checkbox"\` button (native ARIA checkbox
pattern -- \`aria-checked\`, spacebar/click both toggle) rather than a
wrapped native \`<input type="checkbox">\`, matching how DropdownField's
own trigger is a \`role="button"\` div rather than a native element --
this codebase's established way of building an interactive control
whose visuals are driven entirely by tokens.json rather than browser
default form-control styling.

\`checked\`/\`onChange\` make this a controlled component (pass your own
state, same shape as Dropdown's \`value\`/\`onChange\`) -- there's no
internal state here, so an uncontrolled usage just won't visually
toggle, by design.

See checkboxTokens.js for exactly how each Figma value (or its
closest existing token-system equivalent) maps onto this component's
"--ap-checkbox-*" custom properties. There is no \`indeterminate\` prop
-- Figma's real component only has two states (\`Empty\`/\`Filled\`), and
this only builds what's actually there.

forwardRef targets the checkbox button itself, so TokenReadout can
read live-resolved custom properties off exactly the node they're set
on, same as every other Tier 3 component.`,methods:[],displayName:"Checkbox",props:{checked:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};export{c as C};
