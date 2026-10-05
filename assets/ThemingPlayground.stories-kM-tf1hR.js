import{R as e,r as c}from"./iframe-ZXh55nCV.js";import{a1 as N,B as x}from"./Button-CjhsGp_1.js";import{I as S}from"./Icon-Pr57Oxzl.js";import"./preload-helper-Dp1pzeXC.js";function E({buttonType:t}){return e.createElement("div",{className:"ap-theming-playground-example-card"},e.createElement("div",{className:"ap-theming-playground-example-card-icon"},e.createElement(S,{icon:N,style:{width:"30px",height:"30px"}})),e.createElement("div",{className:"ap-theming-playground-example-card-info"},e.createElement("h3",{className:"ap-theming-playground-example-card-title"},"Card Title"),e.createElement("div",{className:"ap-theming-playground-example-card-description-and-button"},e.createElement("p",{className:"ap-theming-playground-example-card-description"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed porta gravida et gravida egestas tortor. Metus, nulla mattis purus ac, vulputate."),e.createElement(x,{priority:t,size:"medium",radius:"lg"},"GET DETAILS"))))}E.__docgenInfo={description:`The card rendered in the Theming Playground's canvas -- mirrors the
Figma "Storybook Planning" file's "example card" component (node
131:8169) that Andrew pointed at directly for this build. That
component is actually TWO layers: an outer 495x503 wrapper (fill
tier2_color/background/base) and an inner 350x387 "Card" frame (fill
tier2_color/background/surface_primary, 1px tier2_color/border/default
stroke, 16px radius) centered inside it. Per Andrew, the OUTER wrapper
is what the playground's own canvas already represents -- so only the
inner Card is built here; the canvas itself picks up
background/base (see ThemingPlayground.jsx/.css).

Figma's own icon is a custom decorative vector (an abstract bracket
shape behind a glyph), not something meant to be pixel-matched. Per
Andrew: use Font Awesome's "fa-square-list" -- which doesn't exist in
this project's react-icons/fa6 package (no FaSquareList export at any
weight) -- falling back to a note icon, FaRegNoteSticky (Regular,
matching Icon.jsx's own "prefer Regular when it exists" convention).

Size is a one-off 30x30 override via the \`style\` prop (Icon.jsx merges
\`style\` in after its default width/height), per Andrew -- 30px isn't
one of the shared tier_3/icon scale's steps (xs/small/medium/large top
out at 24px, see iconTokens.js) and isn't a generalizable step either,
just what this one card wants, so it isn't added as a new named size.

The button is the SAME real <Button>, driven by the \`buttonType\` prop
the Theme Playground's own Button Type radio group already controls
(see ThemingPlaygroundControls.jsx) -- so picking Primary/Secondary/
Ghost there changes this exact button, per Andrew. \`radius="lg"\`
matches the Figma instance's own 999px (fully pill) corner radius --
the earlier bare canvas Button used "sm" before this card replaced it.
Title/description copy is Figma's own literal placeholder text.`,methods:[],displayName:"ExampleCard"};const f=c.forwardRef(function({checked:n=!1,onChange:r,disabled:o=!1,"aria-label":i,...l},s){return e.createElement("button",{ref:s,type:"button",role:"radio","aria-checked":n,"aria-label":i,disabled:o,className:"ap-radio",onClick:()=>!o&&(r==null?void 0:r(!0)),...l},e.createElement("span",{className:"ap-radio-circle"},n&&e.createElement("span",{className:"ap-radio-dot"})))});f.__docgenInfo={description:`Tier 3 Radio -- a single radio button, built the same way Checkbox.jsx
is: a real \`role="radio"\` button (ARIA radio pattern -- \`aria-checked\`,
click/Space/Enter all select it) rather than a wrapped native
\`<input type="radio">\`, so its visuals are driven entirely by
tokens.json rather than browser default form-control styling, same as
every other interactive Tier 3 control in this codebase.

Controlled, and deliberately NOT grouped -- this component only knows
its own checked/disabled/onChange; which radios in a set are mutually
exclusive is the CALLER's job (see
../../ThemingPlayground/ThemingPlaygroundControls.jsx), same division
of responsibility Checkbox leaves to its own callers.

forwardRef so a parent can read live-resolved custom property values
straight off this exact DOM node, same as every other Tier 3 component.`,methods:[],displayName:"Radio",props:{checked:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const _=[{key:"core",label:"Core"},{key:"basil",label:"Basil"},{key:"molasses",label:"Molasses"}],g=[{key:"light",label:"Light"},{key:"dark",label:"Dark"}],P=[{key:"neutral",label:"Neutral BG"},{key:"brand",label:"Branded BG"}],B=[{key:"primary",label:"Primary"},{key:"secondary",label:"Secondary"},{key:"ghost",label:"Ghost"}],R={core:"TWK Lausanne",basil:"Basier Circle",molasses:"Nudica"},y="--ap-tier-2-color-content-brand";function C({themeKey:t}){return e.createElement("div",{className:"ap-theming-playground-option-description","data-theme":"storybook_ds","data-viewport":"desktop"},e.createElement("span",{className:"ap-theming-playground-option-description-line"},"Font Family: ",R[t]),e.createElement("span",{className:"ap-theming-playground-option-description-line ap-theming-playground-option-description-brand"},e.createElement("span",{className:"ap-theming-playground-option-description-brand-text"},"Brand Color: ",y),e.createElement("span",{className:"ap-theming-playground-brand-swatch","data-theme":t,"data-viewport":"desktop",style:{background:`var(${y})`}})))}function d({name:t,option:n,checked:r,disabled:o,sub:i,extra:l,onSelect:s}){return e.createElement("label",{className:o?"ap-theming-playground-option-row ap-theming-playground-option-row--disabled":"ap-theming-playground-option-row"},e.createElement(f,{name:t,checked:r,disabled:o,onChange:()=>s(n.key)}),e.createElement("span",{className:"ap-theming-playground-option-row-content"},e.createElement("span",{className:i?"ap-theming-playground-option-label ap-theming-playground-option-label--sub":"ap-theming-playground-option-label"},n.label),l))}function T({theme:t,mode:n,bgStyle:r,buttonType:o,onThemeChange:i,onModeChange:l,onBgStyleChange:s,onButtonTypeChange:u}){const p=n==="dark";function m(a){l(a),a==="dark"&&s("neutral")}return e.createElement("div",{className:"ap-theming-playground-card"},e.createElement("div",{className:"ap-theming-playground-group"},e.createElement("h4",{className:"ap-theming-playground-group-title"},"THEME"),e.createElement("div",{className:"ap-theming-playground-option-list"},_.map(a=>e.createElement(d,{key:a.key,name:"theming-playground-theme",option:a,checked:t===a.key,disabled:!1,extra:e.createElement(C,{themeKey:a.key}),onSelect:i})))),e.createElement("div",{className:"ap-theming-playground-group"},e.createElement("h4",{className:"ap-theming-playground-group-title"},"LIGHT/DARK MODE"),e.createElement("div",{className:"ap-theming-playground-option-list"},e.createElement(d,{name:"theming-playground-mode",option:g[0],checked:n==="light",disabled:!1,onSelect:m}),e.createElement("div",null,e.createElement(d,{name:"theming-playground-mode",option:g[1],checked:n==="dark",disabled:!1,onSelect:m}),e.createElement("div",{className:"ap-theming-playground-sub-option-list"},P.map(a=>e.createElement(d,{key:a.key,name:"theming-playground-bg-style",option:a,checked:r===a.key,disabled:!p,sub:!0,onSelect:s})))))),e.createElement("div",{className:"ap-theming-playground-group"},e.createElement("h4",{className:"ap-theming-playground-group-title"},"BUTTON TYPE"),e.createElement("div",{className:"ap-theming-playground-option-list"},B.map(a=>e.createElement(d,{key:a.key,name:"theming-playground-button-type",option:a,checked:o===a.key,disabled:!1,onSelect:u})))))}T.__docgenInfo={description:`The Theming Playground's control card -- mirrors the Figma "Storybook
Planning" file's playground_options_container frame (THEME /
LIGHT/DARK MODE radio groups, Button Type=Radio variants) which Andrew
pointed at directly for this build. Button Type (Primary/Secondary/
Ghost) is a third group added on top of the Figma selection, wired
straight to Button.jsx's own \`priority\` prop values.

Theme and Light/Dark Mode are two independent radio groups. Neutral BG /
Branded BG is a THIRD choice nested directly under the Dark row (not a
separate group, not hidden) -- same nesting the Figma frame itself uses
(its sub_bg_options_container sits inside the "Dark" playground_option
instance). Both sub-radios stay disabled until Dark is actually
selected; selecting Dark lands the sub-choice on Neutral BG by default,
per Andrew's stated behavior, every time (the control's value is
invisible/inert while Light is selected, so there's no "remembered"
prior choice to preserve).`,methods:[],displayName:"ThemingPlaygroundControls"};function w(){const[t,n]=c.useState("core"),[r,o]=c.useState("light"),[i,l]=c.useState("neutral"),[s,u]=c.useState("primary"),p=r==="dark",m=p?`${t}_dark`:t,a=p&&i==="neutral"?"neutral":void 0;return e.createElement("div",null,e.createElement("h3",{className:"ap-section__title","data-theme":"storybook_ds","data-viewport":"desktop"},"Theming Playground"),e.createElement("p",{className:"ap-theming-playground-intro","data-theme":"storybook_ds","data-viewport":"desktop"},"Pick a Theme, a Light/Dark Mode, and -- once Dark is selected -- a background style. The canvas below updates live to match."),e.createElement("div",{className:"ap-theming-playground-layout"},e.createElement("div",{className:"ap-theming-playground-canvas","data-theme":m,"data-viewport":"desktop","data-bg-style":a},e.createElement(E,{buttonType:s})),e.createElement(T,{theme:t,mode:r,bgStyle:i,buttonType:s,onThemeChange:n,onModeChange:o,onBgStyleChange:l,onButtonTypeChange:u})))}w.__docgenInfo={description:`A page with a canvas where a component renders live under whichever
theme the card's radio controls pick (see the Figma "Storybook
Planning" file's playground_options_container frame, which Andrew
pointed at directly for this build -- and ThemingPlaygroundControls.jsx
for the controls themselves).

Defaults: Theme=Core, Mode=Light, Button Type=Primary, matching
Andrew's stated defaults. data-theme/data-bg-style on the canvas follow
build-tokens.js's own attribute scheme exactly (its THEMES/BG_STYLES
arrays): a dark mode is "<theme>_dark", and [data-bg-style="neutral"]
is only ever set for a dark theme on the neutral sub-choice -- "brand"
(the default) omits the attribute entirely, same as the generated CSS
expects.

The canvas renders Figma's "example card" component (node 131:8169 in
the "Storybook Planning" file, which Andrew pointed at directly). Per
Andrew, that component's OUTER wrapper (fill tier2_color/background/
base) is conceptually the canvas itself -- see the canvas's own
background-color in ThemingPlayground.css -- so only the INNER "Card"
is built as a component (ExampleCard.jsx); the card's own Button is
the same real <Button priority={buttonType}>, so picking a Button Type
below updates the button rendered inside the card.`,methods:[],displayName:"ThemingPlayground"};const M={title:"Theming Playground",tags:["!autodocs"],parameters:{docs:{description:{component:`Bare, single-segment title ("Theming Playground", no "/") -- same
convention as GettingStarted.stories.jsx: per .storybook/preview.jsx's
storySort comment, a bare title becomes a root Storybook always renders
above every storySort-ordered group, so this needs no storySort entry.
tags: ["!autodocs"] cancels the project-wide autodocs tag (preview.jsx)
so there's no separate auto-generated "Docs" entry, same as every other
hand-authored page in this project.`}}}},h={render:()=>e.createElement(w,null)},F=["Overview"];var b,k,v;h.parameters={...h.parameters,docs:{...(b=h.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <ThemingPlayground />
}`,...(v=(k=h.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};export{h as Overview,F as __namedExportsOrder,M as default};
