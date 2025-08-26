# css-gum

[![Test](https://github.com/jzovvo/css-gum/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/jzovvo/css-gum/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/jzovvo/css-gum/branch/master/graph/badge.svg)](https://codecov.io/gh/jzovvo/css-gum)
[![npm version](https://badge.fury.io/js/css-gum.svg)](https://www.npmjs.com/package/css-gum)

Make your responsive designs stretch like gum – seamlessly elastic across all screen sizes. This toolkit transforms complex viewport calculations into simple, intuitive functions, and automatically generates VSCode Snippets, allowing you to effortlessly integrate efficient responsive workflows.

[繁體中文](./README.zh-TW.md)

## Features

- 🖥️ **viewport units**: Convert pixels to responsive `vw`/`vh` units
- 🔒 **Clamped units**: Use `vwc`/`vhc` to limit max/min values
- 📏 **Extended scaling**: Adaptive scaling for screens larger than design draft
- ⚡ **Batch generation**: Batch generate functions for multiple design draft breakpoints
- 🎯 **Snippets**: Auto-generate Snippets to boost development efficiency

## Installation

```bash
npm install css-gum
```

## Quick Start

```typescript
import { Core } from "css-gum";

// Basic viewport units (no trailing space by default)
Core.vw(20, 1440); // '1.39vw' - 20px on 1440px design draft
Core.vh(30, 1080); // '2.78vh' - 30px on 1080px design draft

// Control space parameter (for different use cases)
Core.vw(20, 1440, 0); // '1.39vw'  - specify no space (default)
Core.vw(20, 1440, 1); // '1.39vw ' - specify with space

// Clamped units
Core.vwc(20, 1440); // 'min(20px, 1.39vw)'
Core.vhc(30, 1080); // 'min(30px, 2.78vh)'

// Extended scaling
Core.vwe(20, 1440); // 'calc((100vw - 1440px) * 0.5 + 20px)'
Core.vhe(30, 1080); // 'calc((100vh - 1080px) * 0.5 + 30px)'

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

#### `vw(pixel, designDraft, space?)`

Convert pixels to viewport width units.

**Parameters**

- `pixel`
  - Pixel value to convert
- `designDraft`
  - Design draft width in pixels
- `space`
  - Whether to add trailing space for Tailwind multi-value syntax
  - `1` = with space, `0` = no space, default: `0`

```typescript
Core.vw(20, 1440); // '1.39vw' (no space by default)
Core.vw(20, 1440, 0); // '1.39vw' (specify no space)
Core.vw(20, 1440, 1); // '1.39vw ' (specify with space)
```

#### `vh(pixel, designDraft, space?)`

Convert pixels to viewport height units.

**Parameters**

- `pixel`
  - Pixel value to convert
- `designDraft`
  - Design draft height in pixels
- `space`
  - Whether to add trailing space for Tailwind multi-value syntax
  - `1` = with space, `0` = no space, default: `0`

```typescript
Core.vh(30, 1080); // '2.78vh' (no space by default)
Core.vh(30, 1080, 0); // '2.78vh'  (specify no space)
Core.vh(30, 1080, 1); // '2.78vh ' (specify with space)
```

#### `vwc(pixel, designDraft)`

Clamped viewport width.

**Parameters**

- `pixel`
  - Pixel value to convert
- `designDraft`
  - Design draft width in pixels

```typescript
Core.vwc(20, 1440); // 'min(20px, 1.39vw)'
```

#### `vhc(pixel, designDraft)`

Clamped viewport height.

**Parameters**

- `pixel`
  - Pixel value to convert
- `designDraft`
  - Design draft height in pixels

```typescript
Core.vhc(30, 1080); // 'min(30px, 2.78vh)'
```

#### `vwe(pixel, designDraft, percent?)`

Extended viewport width.

**Parameters**

- `pixel`
  - Pixel value to convert
- `designDraft`
  - Design draft width in pixels
- `percent`
  - Scaling factor
  - Default: 0.5

```typescript
Core.vwe(20, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5 + 20px)'
Core.vwe(20, 1440); // Same as above, using default value 0.5
```

#### `vhe(pixel, designDraft, percent?)`

Extended viewport height.

**Parameters**

- `pixel`
  - Pixel value to convert
- `designDraft`
  - Design draft height in pixels
- `percent`
  - Scaling factor
  - Default: 0.5

```typescript
Core.vhe(30, 1080, 0.5); // 'calc((100vh - 1080px) * 0.5 + 30px)'
Core.vhe(30, 1080); // Same as above, using default value 0.5
```

#### `percent(child, parent)`

Calculate percentage values.

**Parameters**

- `child`
  - Numerator
- `parent`
  - Denominator

```typescript
Core.percent(10, 100); // '10%'
Core.percent(0, 100); // '0' (zero returns '0')
```

#### `em(lineSize, fontSize)`

Convert to em units.

**Parameters**

- `lineSize`
  - Target size in pixels
- `fontSize`
  - Base font size in pixels

```typescript
Core.em(24, 16); // '1.5em'
```

#### `lh(lineHeight, fontSize)`

Convert to line height ratio.

**Parameters**

- `lineHeight`
  - Target line height in pixels
- `fontSize`
  - Base font size in pixels

```typescript
Core.lh(24, 16); // '1.5'
```

### Util Module

#### `cssPxToVw(designDraft)(pixel)`

Curried function to convert pixels to CSS vw strings.

**Parameters**

- `designDraft`
  - Design draft width in pixels
- `pixel`
  - Pixel value to convert

```typescript
import { Util } from "css-gum";

const toVw = Util.cssPxToVw(1440);
toVw(20); // '1.39vw'
toVw(0); // '0'
```

#### `cssPxToVh(designDraft)(pixel)`

Curried function to convert pixels to CSS vh strings.

**Parameters**

- `designDraft`
  - Design draft height in pixels
- `pixel`
  - Pixel value to convert

```typescript
const toVh = Util.cssPxToVh(1080);
toVh(30); // '2.78vh'
```

#### `cssPxToVwc(designDraft)(pixel)`

Curried function to convert pixels to clamped vw.

**Parameters**

- `designDraft`
  - Design draft width in pixels
- `pixel`
  - Pixel value to convert

```typescript
const toVwc = Util.cssPxToVwc(1440);
toVwc(20); // 'min(20px, 1.39vw)'
toVwc(-20); // 'max(-20px, -1.39vw)'
```

#### `cssPxToVhc(designDraft)(pixel)`

Curried function to convert pixels to clamped vh.

**Parameters**

- `designDraft`
  - Design draft height in pixels
- `pixel`
  - Pixel value to convert

```typescript
const toVhc = Util.cssPxToVhc(1080);
toVhc(30); // 'min(30px, 2.78vh)'
```

#### `cssPxToVwe(designDraft)(percent)(pixel)`

Curried function to convert pixels to extended vw.

**Parameters**

- `designDraft`
  - Design draft width in pixels
- `percent`
  - Scaling factor
- `pixel`
  - Pixel value to convert

```typescript
const toVwe = Util.cssPxToVwe(1440)(0.5);
toVwe(20); // 'calc((100vw - 1440px) * 0.5 + 20px)'
```

#### `cssPxToVhe(designDraft)(percent)(pixel)`

Curried function to convert pixels to extended vh.

**Parameters**

- `designDraft`
  - Design draft height in pixels
- `percent`
  - Scaling factor
- `pixel`
  - Pixel value to convert

```typescript
const toVhe = Util.cssPxToVhe(1080)(0.5);
toVhe(30); // 'calc((100vh - 1080px) * 0.5 + 30px)'
```

#### `percent(denominator)(numerator)`

Curried function to calculate percentages.

**Parameters**

- `denominator` - Denominator value
- `numerator` - Numerator value

```typescript
const getPercent = Util.percent(100);
getPercent(25); // 25 (numeric value)
```

#### `cssPercent(parent)(child)`

Curried function to calculate CSS percentage strings.

**Parameters**

- `parent`
  - Denominator
- `child`
  - Numerator

```typescript
const toCssPercent = Util.cssPercent(100);
toCssPercent(25); // '25%'
toCssPercent(0); // '0' (zero returns '0')
```

#### `cssEm(lineSize, fontSize)`

Calculate CSS em values.

**Parameters**

- `lineSize`
  - Target size in pixels
- `fontSize`
  - Base font size in pixels

```typescript
Util.cssEm(24, 16); // '1.5em'
```

#### `cssLh(lineHeight, fontSize)`

Calculate CSS line height ratios.

**Parameters**

- `lineHeight`
  - Target line height in pixels
- `fontSize`
  - Base font size in pixels

```typescript
Util.cssLh(24, 16); // '1.5'
```

### Gen Module

The generator module provides the following functionality:

- ⚡ **Batch function generation**: Rapidly generate corresponding conversion functions for multiple design draft breakpoints
- 🏷️ **Function renaming**: Support custom function name prefixes, or skip generation of specific function types
- 🎛️ **Space parameter configuration**: Specify default `space` parameter values for generated functions (solves Tailwind CSS multi-value compilation issues)
- 🎯 **VSCode Snippet generation**: Automatically generate VSCode Snippet files

#### `genFuncsDraftWidth(options)`

Generate width conversion functions for multiple design draft breakpoints.

**Parameters**

- `options`
  - `points`
    - Array of design draft widths in pixels
    - Invalid values (≤ 0) are automatically filtered
  - `firstIndex`
    - Starting index number (default: 1)
  - `space`
    - Default space value for generated functions (default: 0)
  - `nameVw`, `nameVwc`, `nameVwe`
    - Custom function name prefixes
    - Use empty string `''` to skip that type

```typescript
import { Gen } from "css-gum";

const widthFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440, 1920],
  firstIndex: 1,
});

widthFuncs.core.vw1(20); // '5.33vw' - 20px on 375px design draft
widthFuncs.core.vw1(20, 1); // '5.33vw ' - with space
widthFuncs.core.vwc2(20); // 'min(20px, 2.60vw)' - 768px clamped
widthFuncs.core.vwe3(20); // 'calc((100vw - 1440px) * 0.5 + 20px)' - 1440px extended

// Configure default behavior with space parameter
const spacedFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  space: 1, // Set default with space
});

spacedFuncs.core.vw1(20); // '5.33vw ' - default with space
spacedFuncs.core.vw1(20, 0); // '5.33vw' - specify no space

// Invalid breakpoints are automatically filtered (≤ 0 values ignored)
const filteredFuncs = Gen.genFuncsDraftWidth({
  points: [0, -100, 375, 768, -50], // Only 375 and 768 are valid
});
// Result: Only generates core.vw1, core.vw2, core.vwc1, core.vwc2, core.vwe1, core.vwe2

// Use empty strings to skip specific function types
const partialFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768],
  nameVw: "vw", // Generate vw
  nameVwc: "", // Skip vwc
  nameVwe: "extend", // Custom name
});

// Result: Only generates core.vw1, core.vw2, core.extend1, core.extend2
```

#### `genFuncsDraftHeight(options)`

Generate height conversion functions for multiple design draft breakpoints.

**Parameters**

- `options`
  - `points`
    - Array of design draft heights in pixels
    - Invalid values (≤ 0) are automatically filtered
  - `firstIndex`
    - Starting index number (default: 1)
  - `space`
    - Default space value for generated functions (default: 0)
  - `nameVh`, `nameVhc`, `nameVhe`
    - Custom function name prefixes
    - Use empty string `''` to skip that type

```typescript
const heightFuncs = Gen.genFuncsDraftHeight({
  points: [667, 1080, 1440],
});

heightFuncs.core.vh1(30); // '4.50vh' - 30px on 667px design draft
heightFuncs.core.vh1(30, 1); // '4.50vh ' - with space
heightFuncs.core.vhc2(30); // 'min(30px, 2.78vh)' - 1080px clamped

// Configure default with space for height functions
const spacedHeightFuncs = Gen.genFuncsDraftHeight({
  points: [667, 1080],
  space: 1, // All generated functions default with space
});

spacedHeightFuncs.core.vh1(30); // '4.50vh ' - default with space
spacedHeightFuncs.core.vh2(30, 0); // '2.78vh' - specify no space

// Invalid breakpoints are automatically filtered (≤ 0 values ignored)
const filteredHeightFuncs = Gen.genFuncsDraftHeight({
  points: [0, -200, 667, 1080, -100], // Only 667 and 1080 are valid
});
// Result: Only generates core.vh1, core.vh2, core.vhc1, core.vhc2, core.vhe1, core.vhe2

// Skip specific function types (keep only basic functionality)
const onlyVhFuncs = Gen.genFuncsDraftHeight({
  points: [667, 1080],
  nameVh: "vh",
  nameVhc: "", // Skip vhc
  nameVhe: "", // Skip vhe
});

// Result: Only generates core.vh1, core.vh2
```

#### `genFuncsCore(options)`

Generate core function collections with custom names.

**Parameters**

- `options`
  - `space`
    - Default space value for generated functions (default: 0)
  - `nameVw`, `nameVh`, `nameVwc`, `nameVhc`, `nameVwe`, `nameVhe`, `nameEm`, `nameLh`, `namePercent`
    - Custom function name prefixes
    - Use empty string `''` to exclude

```typescript
const customCore = Gen.genFuncsCore({
  nameVw: "toVw",
  namePercent: "toPercent",
});

customCore.core.toVw(20, 1440); // Equivalent to Core.vw(20, 1440)
customCore.core.toVw(20, 1440, 1); // With space
customCore.core.toPercent(10, 100); // Equivalent to Core.percent(10, 100)

// Configure default behavior with space parameter
const spacedCore = Gen.genFuncsCore({
  space: 1, // All vw/vh functions default with space
  nameVw: "vw",
  nameVh: "vh",
});

spacedCore.core.vw(20, 1440); // '1.39vw ' - default with space
spacedCore.core.vh(30, 1080, 0); // '2.78vh' - specify no space

// Exclude specific functions (create minimal core functionality)
const minimalCore = Gen.genFuncsCore({
  nameVw: "vw",
  nameVh: "vh",
  nameVwc: "", // Exclude vwc
  nameVhc: "", // Exclude vhc
  nameVwe: "", // Exclude vwe
  nameVhe: "", // Exclude vhe
  nameEm: "", // Exclude em
  nameLh: "", // Exclude lh
  namePercent: "", // Exclude percent
});

// Result: Only generates core.vw, core.vh functions
```

### Snippet Module

![](./examples/postcss/_assets/snippet.gif)

The Snippet module can automatically generate [VSCode Snippets](https://code.visualstudio.com/docs/editing/userdefinedsnippets) files, allowing you to quickly input css-gum functions in your editor.

- 🔄 **Auto merge**: New Snippets merge with existing files without overwriting other Snippets
- 🛡️ **Safe backup**: Automatically creates backups if existing files have format errors
- 📁 **Create directories**: Automatically creates output directories if they don't exist

**Usage Workflow**

The Snippet module usage is divided into two steps:

1. **Generate Snippets**: Use various generation functions to obtain `SnippetConfig` objects
2. **Write to files**: Use `writeSnippetsToFiles` to write Snippets to VSCode files

#### `writeSnippetsToFiles(snippets, output)`

- Write Snippets to VSCode snippets files.
- Not available in browser environments because browsers cannot access the file system

**Parameters**

- `snippets`
  - Snippet object (`SnippetConfig`)
- `output`
  - Array of output file paths

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

There are two ways to generate Snippet objects:

**Using Gen Module**

All generator functions include a `VSCodeSnippet` property to get corresponding Snippet objects.

```typescript
import { Gen, Snippet } from "css-gum";

const VSCodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// Generate core function Snippets
const coreGen = Gen.genFuncsCore();
const coreSnippets = coreGen.VSCodeSnippet;
Snippet.writeSnippetsToFiles(coreSnippets, VSCodeSnippetsPath);

// Generate width function Snippets
const widthGen = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  firstIndex: 1,
});
const widthSnippets = widthGen.VSCodeSnippet;
Snippet.writeSnippetsToFiles(widthSnippets, VSCodeSnippetsPath);

// Generate height function Snippets
const heightGen = Gen.genFuncsDraftHeight({
  points: [667, 1080, 1440],
});
const heightSnippets = heightGen.VSCodeSnippet;
Snippet.writeSnippetsToFiles(heightSnippets, VSCodeSnippetsPath);
```

**Using Snippet Module**

##### `genVSCodeSnippetCore(options)`

Generate core function Snippets.

**Parameters**

- `options`
  - `nameVw`, `nameVh`, `nameVwc`, `nameVhc`, `nameVwe`, `nameVhe`, `nameEm`, `nameLh`, `namePercent`
    - Custom function name prefixes
    - Use empty string `''` to skip that type

##### `genVSCodeSnippetDraftWidth(options)`

Generate width function Snippets.

**Parameters**

- `options`
  - `pointsSize`
    - Number of breakpoints to generate
  - `firstIndex`
    - Starting index number (default: 1)
  - `nameVw`, `nameVwc`, `nameVwe`
    - Custom function name prefixes
    - Use empty string `''` to skip that type

##### `genVSCodeSnippetDraftHeight(options)`

Generate height function Snippets.

**Parameters**

- `options`
  - `pointsSize`
    - Number of breakpoints to generate
  - `firstIndex`
    - Starting index number (default: 1)
  - `nameVh`, `nameVhc`, `nameVhe`
    - Custom function name prefixes
    - Use empty string `''` to skip that type

```typescript
import { Snippet } from "css-gum";

const VSCodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// Generate core function Snippets
const coreSnippets = Snippet.genVSCodeSnippetCore({
  nameVw: "vw",
  nameVh: "vh",
  namePercent: "percent",
});
Snippet.writeSnippetsToFiles(coreSnippets, VSCodeSnippetsPath);

// Generate width function Snippets
const widthSnippets = Snippet.genVSCodeSnippetDraftWidth({
  pointsSize: 3,
  firstIndex: 1,
  nameVw: "vw",
  nameVwc: "vwc",
  nameVwe: "vwe",
});
Snippet.writeSnippetsToFiles(widthSnippets, VSCodeSnippetsPath);

// Generate height function Snippets
const heightSnippets = Snippet.genVSCodeSnippetDraftHeight({
  pointsSize: 3,
  firstIndex: 1,
  nameVh: "vh",
  nameVhc: "vhc",
  nameVhe: "vhe",
});
Snippet.writeSnippetsToFiles(heightSnippets, VSCodeSnippetsPath);
```

##### Custom Snippet Names

You can use empty strings to skip unwanted Snippet types.

```typescript
// Only generate vw-related Snippets (minimal version)
const minimalSnippets = Snippet.genVSCodeSnippetDraftWidth({
  pointsSize: 2, // Generate Snippets for 2 breakpoints
  nameVw: "vw", // Keep vw
  nameVwc: "", // Skip vwc
  nameVwe: "", // Skip vwe
});
// Write minimal Snippets to specified file
Snippet.writeSnippetsToFiles(minimalSnippets, ["/path/to/.vscode/minimal.code-snippets"]);
```

## Error Handling

All functions include built-in validation and return empty strings for invalid inputs.

```typescript
Core.vw("invalid", 1440); // Returns ''
Core.vw(20, "invalid"); // Returns ''
Core.vw(20, 0); // Returns '' (zero/negative values rejected)
Core.vw(20, -100); // Returns '' (zero/negative values rejected)
Core.vw(20, 1440); // Returns '1.39vw'

// Error messages include detailed stack traces
Core.vw("invalid", 1000);
// Console output example:
// [error] pixel expected number, received invalid
//         designDraft expected number, received 1000
//         Error: <complete stack trace message>
```

## Browser Support

Supports modern browsers with:

- Viewport units (`vw`, `vh`)
- CSS `calc()` functions
- CSS `min()`/`max()` functions

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
