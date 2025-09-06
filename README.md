# css-gum

[![Test](https://github.com/jzovvo/css-gum/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/jzovvo/css-gum/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/jzovvo/css-gum/branch/master/graph/badge.svg)](https://codecov.io/gh/jzovvo/css-gum)
[![npm version](https://badge.fury.io/js/css-gum.svg)](https://www.npmjs.com/package/css-gum)

Make your responsive designs stretch like gum—perfectly elastic across all screen sizes. This toolkit transforms complex viewport calculations into simple, intuitive functions, and automatically generates VSCode Snippets, letting you effortlessly stick to efficient responsive development workflows.

[繁體中文](./README.zh-TW.md)

## Features

- 🖥️ **viewport units**: Support `vw`/`vh`, `dvw`/`dvh`, `lvw`/`lvh`, `svw`/`svh`
- 🔒 **Clamped units**: Use `vwc`/`vhc` to limit max/min values
- 📏 **Extended scaling**: Adapt to screens larger than design draft
- ⚡ **Batch generation**: Batch generate functions for multiple design draft breakpoints
- 🎯 **VSCode Snippet**: Auto-generate CSS functions, responsive images, media query snippets

## Installation

```bash
npm install css-gum
```

## Quick Start

```typescript
import { Core } from "css-gum";

// Basic (no trailing space by default)
Core.vw(20, 1440); // '1.39vw' - 20px on 1440px design draft
Core.vh(30, 1080); // '2.78vh' - 30px on 1080px design draft

// viewport variants
Core.dvw(20, 1440); // '1.39dvw'
Core.dvh(30, 1080); // '2.78dvh'
Core.lvw(20, 1440); // '1.39lvw'
Core.lvh(30, 1080); // '2.78lvh'
Core.svw(20, 1440); // '1.39svw'
Core.svh(30, 1080); // '2.78svh'

// Control space parameter (for different use cases)
Core.vw(20, 1440, 0); // '1.39vw'  - specify no space (default)
Core.vw(20, 1440, 1); // '1.39vw ' - specify with space

// Clamped units
Core.vwc(20, 1440); // 'min(20px, 1.39vw)'
Core.dvwc(20, 1440); // 'min(20px, 1.39dvw)'
Core.vhc(30, 1080); // 'min(30px, 2.78vh)'
Core.dvhc(30, 1080); // 'min(30px, 2.78dvh)'

// Extended scaling (default scaling factor 0.5)
Core.vwe(20, 1440); // 'calc((100vw - 1440px) * 0.5 + 20px)'
Core.dvwe(20, 1440); // 'calc((100dvw - 1440px) * 0.5 + 20px)'
Core.vhe(30, 1080); // 'calc((100vh - 1080px) * 0.5 + 30px)'
Core.dvhe(30, 1080); // 'calc((100dvh - 1080px) * 0.5 + 30px)'

// Other utilities
Core.percent(10, 100); // '10%'
Core.percent(0, 100); // '0' (zero returns '0' instead of '0%')
Core.em(24, 16); // '1.5em'
Core.lh(24, 16); // '1.5'
```

## Usage Examples

### With [PostCSS Functions](https://www.npmjs.com/package/postcss-functions)

![Demo](./examples/postcss/_assets/demo.gif)

[View full example →](./examples/postcss/postcss-functions/README.md)

## API

### Core Module

#### Viewport Unit Functions

**Basic:** `vw()`, `vh()`, `dvw()`, `dvh()`, `lvw()`, `lvh()`, `svw()`, `svh()`
**Clamped:** `vwc()`, `vhc()`, `dvwc()`, `dvhc()`, `lvwc()`, `lvhc()`, `svwc()`, `svhc()`
**Extended:** `vwe()`, `vhe()`, `dvwe()`, `dvhe()`, `lvwe()`, `lvhe()`, `svwe()`, `svhe()`

**Common Parameters**

- `pixel` - Pixel value to convert
- `designDraft` - Design draft pixel value
- `space` - Whether to add trailing space (`1` = with space, `0` = no space, default: `0`) _(Basic viewport units only)_
- `percent` - Extended scaling factor (default: 0.5) _(Extended vwe/vhe series only)_

```typescript
// For detailed usage, refer to Quick Start section
Core.vw(20, 1440); // '1.39vw' - Basic
Core.vwc(20, 1440); // 'min(20px, 1.39vw)' - Clamped
Core.vwe(20, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5 + 20px)' - Extended
```

#### Other Utility Functions

**`percent(child, parent)`** - Calculate percentage values  
**`em(lineSize, fontSize)`** - Convert to em units  
**`lh(lineHeight, fontSize)`** - Convert to line height ratio

```typescript
Core.percent(10, 100); // '10%' - Calculate percentage values
Core.percent(0, 100); // '0' (zero returns '0')

Core.em(24, 16); // '1.5em' - Convert to em units
Core.lh(24, 16); // '1.5' - Convert to line height ratio
```

### Util Module

The Util module is the lowest-level computational core, designed for runtime JS calculations. For performance optimization, it doesn't include parameter validation (relies on TypeScript type hints), reducing runtime performance overhead.

```typescript
import { Util } from "css-gum";

// Basic viewport units
const toVw = Util.cssPxToVw(1440);
const toVh = Util.cssPxToVh(1080);
const toDvw = Util.cssPxToDvw(1440);
const toDvh = Util.cssPxToDvh(1080);
const toLvw = Util.cssPxToLvw(1440);
const toLvh = Util.cssPxToLvh(1080);
const toSvw = Util.cssPxToSvw(1440);
const toSvh = Util.cssPxToSvh(1080);

toVw(20); // '1.39vw'
toVh(30); // '2.78vh'
toDvw(20); // '1.39dvw'
toDvh(30); // '2.78dvh'
toLvw(20); // '1.39lvw'
toLvh(30); // '2.78lvh'
toSvw(20); // '1.39svw'
toSvh(30); // '2.78svh'

// Clamped
const toVwc = Util.cssPxToVwc(1440);
const toVhc = Util.cssPxToVhc(1080);
const toDvwc = Util.cssPxToDvwc(1440);
const toDvhc = Util.cssPxToDvhc(1080);
const toLvwc = Util.cssPxToLvwc(1440);
const toLvhc = Util.cssPxToLvhc(1080);
const toSvwc = Util.cssPxToSvwc(1440);
const toSvhc = Util.cssPxToSvhc(1080);

toVwc(20); // 'min(20px, 1.39vw)'
toVhc(30); // 'min(30px, 2.78vh)'
toDvwc(20); // 'min(20px, 1.39dvw)'
toDvhc(30); // 'min(30px, 2.78dvh)'
toLvwc(20); // 'min(20px, 1.39lvw)'
toLvhc(30); // 'min(30px, 2.78lvh)'
toSvwc(20); // 'min(20px, 1.39svw)'
toSvhc(30); // 'min(30px, 2.78svh)'

// Extended
const toVwe = Util.cssPxToVwe(1440)(0.5);
const toVhe = Util.cssPxToVhe(1080)(0.5);
const toDvwe = Util.cssPxToDvwe(1440)(0.5);
const toDvhe = Util.cssPxToDvhe(1080)(0.5);
const toLvwe = Util.cssPxToLvwe(1440)(0.5);
const toLvhe = Util.cssPxToLvhe(1080)(0.5);
const toSvwe = Util.cssPxToSvwe(1440)(0.5);
const toSvhe = Util.cssPxToSvhe(1080)(0.5);

toVwe(20); // 'calc((100vw - 1440px) * 0.5 + 20px)'
toVhe(30); // 'calc((100vh - 1080px) * 0.5 + 30px)'
toDvwe(20); // 'calc((100dvw - 1440px) * 0.5 + 20px)'
toDvhe(30); // 'calc((100dvh - 1080px) * 0.5 + 30px)'
toLvwe(20); // 'calc((100lvw - 1440px) * 0.5 + 20px)'
toLvhe(30); // 'calc((100lvh - 1080px) * 0.5 + 30px)'
toSvwe(20); // 'calc((100svw - 1440px) * 0.5 + 20px)'
toSvhe(30); // 'calc((100svh - 1080px) * 0.5 + 30px)'

// Other utilities
const toCssPercent = Util.cssPercent(100);
toCssPercent(25); // '25%'

Util.cssEm(24, 16); // '1.5em'
Util.cssLh(24, 16); // '1.5'
```

### Gen Module

Generator module for batch generating functions for multiple design draft breakpoints, supporting custom names and space parameter configuration.

**Common Parameter Rules**

- `points` _(required)_ - Design draft pixel value array, invalid values (≤ 0) are automatically filtered
- `firstIndex` - Starting index number (default: 1)
- `space` - Default space value for generated functions (default: 0)
- Function name prefix parameters - Use empty string `''` to skip that type (see each function's specific parameters)
- `scope` - VSCode Snippet file type scope (default: `['html','css','sass','scss','less','stylus']`)

#### `genFuncsDraftWidth(options)`

Generate width conversion functions for multiple design draft breakpoints.

**Specific Parameters**

- `nameVw`, `nameDvw`, `nameLvw`, `nameSvw` - Basic viewport width function name prefixes
- `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc` - Clamped width function name prefixes
- `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe` - Extended width function name prefixes

```typescript
import { Gen } from "css-gum";

const widthFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440, 1920],
  firstIndex: 1,
});

// Custom Snippet scope range
const cssOnlyFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  scope: ["css", "scss"], // Only show in CSS and SCSS files
});

widthFuncs.core.vw1(20); // '5.33vw' - 20px on 375px design draft
widthFuncs.core.vw1(20, 1); // '5.33vw ' - with space
widthFuncs.core.dvw1(20); // '5.33dvw'
widthFuncs.core.vwc2(20); // 'min(20px, 2.60vw)' - 768px
widthFuncs.core.vwe3(20); // 'calc((100vw - 1440px) * 0.5 + 20px)' - 1440px

// Set default space parameter
const spacedFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768],
  space: 1, // Default with space
});
spacedFuncs.core.vw1(20); // '5.33vw ' - default with space
spacedFuncs.core.vw1(20, 0); // '5.33vw' - specify no space

// Skip specific types or custom names
const customFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768],
  nameVw: "custom", // Custom name
  nameDvw: "", // Skip dvw
  nameVwc: "", // Skip clamped
});
// Result: Only generates core.custom1, core.custom2, core.vwe1, core.vwe2
```

#### `genFuncsDraftHeight(options)`

Generate height conversion functions for multiple design draft breakpoints.

**Specific Parameters**

- `nameVh`, `nameDvh`, `nameLvh`, `nameSvh` - Basic viewport height function name prefixes
- `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc` - Clamped height function name prefixes
- `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe` - Extended height function name prefixes

```typescript
const heightFuncs = Gen.genFuncsDraftHeight({
  points: [667, 1080, 1440],
});

heightFuncs.core.vh1(30); // '4.50vh' - 30px on 667px design draft
heightFuncs.core.dvh1(30); // '4.50dvh'
heightFuncs.core.vhc2(30); // 'min(30px, 2.78vh)' - 1080px
```

#### `genFuncsCore(options)`

Generate core function collections with custom names.

**Specific Parameters**

- `nameVw`, `nameDvw`, `nameLvw`, `nameSvw` - Basic viewport width function name prefixes
- `nameVh`, `nameDvh`, `nameLvh`, `nameSvh` - Basic viewport height function name prefixes
- `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc` - Clamped width function name prefixes
- `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc` - Clamped height function name prefixes
- `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe` - Extended width function name prefixes
- `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe` - Extended height function name prefixes
- `nameEm`, `nameLh`, `namePercent` - Other utility function name prefixes

```typescript
const customCore = Gen.genFuncsCore({
  nameVw: "toVw", // Custom name
  nameDvw: "", // Skip dvw
  namePercent: "toPercent",
});

customCore.core.toVw(20, 1440); // Equivalent to Core.vw(20, 1440)
customCore.core.toPercent(10, 100); // Equivalent to Core.percent(10, 100)

// Set default space parameter
const spacedCore = Gen.genFuncsCore({
  space: 1, // Default with space
  nameVw: "vw",
});
spacedCore.core.vw(20, 1440); // '1.39vw ' - default with space
spacedCore.core.vw(20, 1440, 0); // '1.39vw' - specify no space
```

### Snippet Module

![](./examples/postcss/_assets/snippet.gif)

Auto-generate [VSCode Snippets](https://code.visualstudio.com/docs/editing/userdefinedsnippets) files. Features auto-merge, safe backup, and directory creation, only available in Node.js environments.

**Usage Flow:** Generate `SnippetConfig` via generation functions → Use `writeSnippetsToFiles` to write files

#### `writeSnippetsToFiles(snippets, output)`

Write Snippets to VSCode snippets files. Parameters: `snippets` (SnippetConfig object), `output` (file path array).

```typescript
import { Snippet } from "css-gum";

const snippets = {
  vw1: {
    prefix: "vw1",
    body: "vw1($1)",
  },
  vwc1: {
    prefix: "vwc1",
    body: "vwc1($1)",
  },
  percent: {
    prefix: "percent",
    body: "percent($1)",
  },
};
const outputPaths = ["/path/to/.vscode/css.code-snippets"];

Snippet.writeSnippetsToFiles(snippets, outputPaths);
```

#### Generate SnippetConfig

```typescript
import { Gen, Snippet } from "css-gum";

const VSCodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// Get Snippets from Gen module
const coreGen = Gen.genFuncsCore();
Snippet.writeSnippetsToFiles(coreGen.VSCodeSnippet, VSCodeSnippetsPath);

// Or use Snippet module directly
const coreSnippets = Snippet.genVSCodeSnippetCore();
Snippet.writeSnippetsToFiles(coreSnippets, VSCodeSnippetsPath);
```

##### `genVSCodeSnippetCore(options)`

Generate core function Snippets.

**Specific Parameters**

- `nameVw`, `nameDvw`, `nameLvw`, `nameSvw` - Basic viewport width function name prefixes
- `nameVh`, `nameDvh`, `nameLvh`, `nameSvh` - Basic viewport height function name prefixes
- `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc` - Clamped width function name prefixes
- `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc` - Clamped height function name prefixes
- `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe` - Extended width function name prefixes
- `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe` - Extended height function name prefixes
- `nameEm`, `nameLh`, `namePercent` - Other utility function name prefixes

##### `genVSCodeSnippetDraftWidth(options)`

Generate width function Snippets.

**Specific Parameters**

- `pointsSize` - Number of generated breakpoints
- `nameVw`, `nameDvw`, `nameLvw`, `nameSvw` - Basic viewport width function name prefixes
- `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc` - Clamped width function name prefixes
- `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe` - Extended width function name prefixes

##### `genVSCodeSnippetDraftHeight(options)`

Generate height function Snippets.

**Specific Parameters**

- `pointsSize` - Number of generated breakpoints
- `nameVh`, `nameDvh`, `nameLvh`, `nameSvh` - Basic viewport height function name prefixes
- `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc` - Clamped height function name prefixes
- `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe` - Extended height function name prefixes

##### `genVSCodeSnippetPicture(options)`

Generate responsive image VS Code snippets.

**Specific Parameters**

- `pointOffset` - Breakpoint offset (default: 0)
- `namePic` - Snippet prefix (default: `'pic'`)
- `scope` - Default: `['html', 'vue', 'javascriptreact', 'typescriptreact']`

```typescript
const pictureSnippets = Snippet.genVSCodeSnippetPicture({
  points: [768, 1024, 1440],
  pointOffset: -1, // Optional: breakpoint offset
  scope: ["html"], // Optional: specify scope
});
```

Generated snippets automatically distinguish between HTML and React syntax:

```html
<!-- HTML version (uses srcset) -->
<picture>
  <source media="(max-width: 768px)" srcset="" />
  <img src="" alt="" />
</picture>

<!-- React version (uses srcSet) -->
<picture>
  <source media="(max-width: 768px)" srcset="" />
  <img src="" alt="" />
</picture>
```

##### `genVSCodeSnippetMediaQuery(options)`

Generate media query VS Code snippets.

**Specific Parameters**

- `pointOffset` - Breakpoint offset (default: 0)
- `firstIndex` - Starting index number (default: 0)
- `nameMin` - Min width snippet prefix (default: `'min-p'`)
- `nameMax` - Max width snippet prefix (default: `'max-p'`)

```typescript
const mediaQuerySnippets = Snippet.genVSCodeSnippetMediaQuery({
  points: [768, 1024, 1440],
  nameMin: "mobile-up", // Optional: custom name
  nameMax: "mobile-down",
});
```

Generated snippets include both min and max types:

```css
/* min-p1 snippet */
@media (width >= 768px) {
  /* content */
}

/* max-p1 snippet */
@media (width < 768px) {
  /* content */
}
```

##### Custom Snippet Names

You can use empty strings to skip unwanted Snippet types.

```typescript
// Minimal Snippets
const minimalSnippets = Snippet.genVSCodeSnippetDraftWidth({
  pointsSize: 2,
  nameVw: "vw", // Keep only vw
  nameDvw: "", // Skip dvw
  nameVwc: "", // Skip vwc
});
Snippet.writeSnippetsToFiles(minimalSnippets, ["/path/to/.vscode/minimal.code-snippets"]);
```

## Error Handling

**Core Module** - Includes complete parameter validation, returns empty strings for invalid input  
**Util Module** - No validation for performance, relies on TypeScript type hints  
**Gen/Snippet Module** - Includes parameter validation and error handling

```typescript
// Core Module - has validation
Core.vw("invalid", 1440); // Returns ''
Core.vw(20, "invalid"); // Returns ''
Core.vw(20, 0); // Returns '' (zero/negative values rejected)
Core.vw(20, 1440); // Returns '1.39vw'

// Util Module - no validation, direct computation
Util.cssPxToVw(1440)(20); // Direct computation, assumes correct parameters

// Error messages include detailed stack traces
Core.vw("invalid", 1000);
// Console output example:
// [error] pixel expected number, received invalid
//         designDraft expected number, received 1000
//         Error: <complete stack trace message>
```

## Browser Support

Supports modern browsers:

- viewport units: `vw`/`vh` (legacy), `dvw`/`dvh`, `lvw`/`lvh`, `svw`/`svh`
- CSS `calc()` functions
- CSS `min()`/`max()` functions

**viewport variant support:**

- `dvw`/`dvh`, `lvw`/`lvh`, `svw`/`svh`: Chrome 108+, Firefox 101+, Safari 16.0+

## Support

If `css-gum` makes your designs stretch like gum with elastic flexibility, consider buying me a coffee ☕
Your support keeps this project sticky and helps it become even more elastic 🍬

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-orange)](https://ko-fi.com/jzovvo)

## Not Stretching Smoothly?

Is `css-gum` not stretching smoothly in your hands? Or is something getting stuck? Don't worry, let's work together to make it more elastic 🍬

- 🐛 [Issues](https://github.com/jzovvo/css-gum/issues)
- 💭 [Discussions](https://github.com/jzovvo/css-gum/discussions)
- 📮 [Mail](mailto:jzovvo@gmail.com)
- 💻 [Site](https://jzovvo.dev)

## License

MIT © [jzovvo](https://github.com/jzovvo)

## Q&A

### Why do we need the space parameter?

When using `Tailwind CSS` multi-value syntax, if CSS function return values don't have trailing spaces, the compiled values sometimes get concatenated together after build, for unknown reasons.

```html
<!-- ❌ Compilation result might be padding: 1.39vw2.08vw; -->
<div class="p-[vw(20,1440)_vw(30,1440)]"></div>
```

To solve this problem, you can manually specify functions with spaces when needed:

```html
<!-- ✅ Compilation result: padding: 1.39vw 2.08vw ; -->
<div class="p-[vw(20,1440,1)_vw(30,1440,1)]"></div>
```

Or only use spaces in middle functions, not the last one:

```html
<!-- ✅ Compilation result: padding: 1.39vw 2.08vw; -->
<div class="p-[vw(20,1440,1)_vw(30,1440)]"></div>
```

### What is the scope parameter?

The `scope` parameter controls which file types VSCode Snippets trigger in. For details, see [VSCode Snippet Documentation](https://code.visualstudio.com/docs/editing/userdefinedsnippets) and [Language Identifiers](https://code.visualstudio.com/docs/languages/identifiers).
