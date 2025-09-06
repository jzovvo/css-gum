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
- 🎯 **Snippets**: Auto-generate Snippets to boost development efficiency

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

CSS-Gum supports all viewport units: `vw`, `vh`, `dvw`, `dvh`, `lvw`, `lvh`, `svw`, `svh`

#### `vw(pixel, designDraft, space?)`, `dvw()`, `lvw()`, `svw()`

Convert pixels to viewport width units.

**Parameters**

- `pixel` - Pixel value to convert
- `designDraft` - Design draft width in pixels
- `space` - Whether to add trailing space for Tailwind multi-value syntax (`1` = with space, `0` = no space, default: `0`)

```typescript
Core.vw(20, 1440); // '1.39vw'
Core.vw(20, 1440, 1); // '1.39vw ' (with space)
Core.dvw(20, 1440); // '1.39dvw'
Core.lvw(20, 1440); // '1.39lvw'
Core.svw(20, 1440); // '1.39svw'
```

#### `vh(pixel, designDraft, space?)`, `dvh()`, `lvh()`, `svh()`

Convert pixels to viewport height units.

**Parameters**

- `pixel` - Pixel value to convert
- `designDraft` - Design draft height in pixels
- `space` - Whether to add trailing space for Tailwind multi-value syntax (`1` = with space, `0` = no space, default: `0`)

```typescript
Core.vh(30, 1080); // '2.78vh'
Core.vh(30, 1080, 1); // '2.78vh ' (with space)
Core.dvh(30, 1080); // '2.78dvh'
Core.lvh(30, 1080); // '2.78lvh'
Core.svh(30, 1080); // '2.78svh'
```

#### `vwc(pixel, designDraft)`, `dvwc()`, `lvwc()`, `svwc()`

Clamped viewport width.

**Parameters**

- `pixel` - Pixel value to convert
- `designDraft` - Design draft width in pixels

```typescript
Core.vwc(20, 1440); // 'min(20px, 1.39vw)'
Core.vwc(-20, 1440); // 'max(-20px, -1.39vw)'
Core.dvwc(20, 1440); // 'min(20px, 1.39dvw)'
Core.lvwc(20, 1440); // 'min(20px, 1.39lvw)'
Core.svwc(20, 1440); // 'min(20px, 1.39svw)'
```

#### `vhc(pixel, designDraft)`, `dvhc()`, `lvhc()`, `svhc()`

Clamped viewport height.

**Parameters**

- `pixel` - Pixel value to convert
- `designDraft` - Design draft height in pixels

```typescript
Core.vhc(30, 1080); // 'min(30px, 2.78vh)'
Core.vhc(-30, 1080); // 'max(-30px, -2.78vh)'
Core.dvhc(30, 1080); // 'min(30px, 2.78dvh)'
Core.lvhc(30, 1080); // 'min(30px, 2.78lvh)'
Core.svhc(30, 1080); // 'min(30px, 2.78svh)'
```

#### `vwe(pixel, designDraft, percent?)`, `dvwe()`, `lvwe()`, `svwe()`

Extended viewport width.

**Parameters**

- `pixel` - Pixel value to convert
- `designDraft` - Design draft width in pixels
- `percent` - Scaling factor (default: 0.5)

```typescript
Core.vwe(20, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5 + 20px)'
Core.vwe(20, 1440); // Same as above, using default value 0.5
Core.vwe(0, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5)'
Core.vwe(-20, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5 - 20px)'
Core.dvwe(20, 1440, 0.8); // 'calc((100dvw - 1440px) * 0.8 + 20px)'
Core.lvwe(20, 1440); // 'calc((100lvw - 1440px) * 0.5 + 20px)'
Core.svwe(20, 1440); // 'calc((100svw - 1440px) * 0.5 + 20px)'
```

#### `vhe(pixel, designDraft, percent?)`, `dvhe()`, `lvhe()`, `svhe()`

Extended viewport height.

**Parameters**

- `pixel` - Pixel value to convert
- `designDraft` - Design draft height in pixels
- `percent` - Scaling factor (default: 0.5)

```typescript
Core.vhe(30, 1080, 0.5); // 'calc((100vh - 1080px) * 0.5 + 30px)'
Core.vhe(30, 1080); // Same as above, using default value 0.5
Core.vhe(0, 1080, 0.5); // 'calc((100vh - 1080px) * 0.5)'
Core.vhe(-30, 1080, 0.5); // 'calc((100vh - 1080px) * 0.5 - 30px)'
Core.dvhe(30, 1080, 0.8); // 'calc((100dvh - 1080px) * 0.8 + 30px)'
Core.lvhe(30, 1080); // 'calc((100lvh - 1080px) * 0.5 + 30px)'
Core.svhe(30, 1080); // 'calc((100svh - 1080px) * 0.5 + 30px)'
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

The Util module provides curried functions.

#### Viewport Width Utility Functions

##### `cssPxToVw(designDraft)(pixel)`, `cssPxToDvw()`, `cssPxToLvw()`, `cssPxToSvw()`

Curried function to convert pixels to CSS viewport width strings.

**Parameters**

- `designDraft` - Design draft width in pixels
- `pixel` - Pixel value to convert

```typescript
import { Util } from "css-gum";

const toVw = Util.cssPxToVw(1440);
toVw(20); // '1.39vw'
toVw(0); // '0'

const toDvw = Util.cssPxToDvw(1440);
toDvw(20); // '1.39dvw'

const toLvw = Util.cssPxToLvw(1440);
const toSvw = Util.cssPxToSvw(1440);
toLvw(20); // '1.39lvw'
toSvw(20); // '1.39svw'
```

#### Viewport Height Utility Functions

##### `cssPxToVh(designDraft)(pixel)`, `cssPxToDvh()`, `cssPxToLvh()`, `cssPxToSvh()`

Curried function to convert pixels to CSS viewport height strings.

**Parameters**

- `designDraft` - Design draft height in pixels
- `pixel` - Pixel value to convert

```typescript
const toVh = Util.cssPxToVh(1080);
toVh(30); // '2.78vh'

const toDvh = Util.cssPxToDvh(1080);
toDvh(30); // '2.78dvh'

const toLvh = Util.cssPxToLvh(1080);
const toSvh = Util.cssPxToSvh(1080);
toLvh(30); // '2.78lvh'
toSvh(30); // '2.78svh'
```

#### Clamped Viewport Utility Functions

##### `cssPxToVwc(designDraft)(pixel)`, `cssPxToDvwc()`, `cssPxToLvwc()`, `cssPxToSvwc()`

Curried function to convert pixels to clamped viewport width.

**Parameters**

- `designDraft` - Design draft width in pixels
- `pixel` - Pixel value to convert

```typescript
const toVwc = Util.cssPxToVwc(1440);
toVwc(20); // 'min(20px, 1.39vw)'
toVwc(-20); // 'max(-20px, -1.39vw)'

const toDvwc = Util.cssPxToDvwc(1440);
toDvwc(20); // 'min(20px, 1.39dvw)'

const toLvwc = Util.cssPxToLvwc(1440);
const toSvwc = Util.cssPxToSvwc(1440);
toLvwc(20); // 'min(20px, 1.39lvw)'
toSvwc(20); // 'min(20px, 1.39svw)'
```

##### `cssPxToVhc(designDraft)(pixel)`, `cssPxToDvhc()`, `cssPxToLvhc()`, `cssPxToSvhc()`

Curried function to convert pixels to clamped viewport height.

**Parameters**

- `designDraft` - Design draft height in pixels
- `pixel` - Pixel value to convert

```typescript
const toVhc = Util.cssPxToVhc(1080);
toVhc(30); // 'min(30px, 2.78vh)'

const toDvhc = Util.cssPxToDvhc(1080);
toDvhc(30); // 'min(30px, 2.78dvh)'

const toLvhc = Util.cssPxToLvhc(1080);
const toSvhc = Util.cssPxToSvhc(1080);
toLvhc(30); // 'min(30px, 2.78lvh)'
toSvhc(30); // 'min(30px, 2.78svh)'
```

#### Extended Viewport Utility Functions

##### `cssPxToVwe(designDraft)(percent)(pixel)`, `cssPxToDvwe()`, `cssPxToLvwe()`, `cssPxToSvwe()`

Curried function to convert pixels to extended viewport width.

**Parameters**

- `designDraft` - Design draft width in pixels
- `percent` - Scaling factor
- `pixel` - Pixel value to convert

```typescript
const toVwe = Util.cssPxToVwe(1440)(0.5);
toVwe(20); // 'calc((100vw - 1440px) * 0.5 + 20px)'
toVwe(0); // 'calc((100vw - 1440px) * 0.5)'
toVwe(-20); // 'calc((100vw - 1440px) * 0.5 - 20px)'

const toDvwe = Util.cssPxToDvwe(1440)(0.8);
toDvwe(20); // 'calc((100dvw - 1440px) * 0.8 + 20px)'

const toLvwe = Util.cssPxToLvwe(1440)(0.5);
const toSvwe = Util.cssPxToSvwe(1440)(0.5);
toLvwe(20); // 'calc((100lvw - 1440px) * 0.5 + 20px)'
toSvwe(20); // 'calc((100svw - 1440px) * 0.5 + 20px)'
```

##### `cssPxToVhe(designDraft)(percent)(pixel)`, `cssPxToDvhe()`, `cssPxToLvhe()`, `cssPxToSvhe()`

Curried function to convert pixels to extended viewport height.

**Parameters**

- `designDraft` - Design draft height in pixels
- `percent` - Scaling factor
- `pixel` - Pixel value to convert

```typescript
const toVhe = Util.cssPxToVhe(1080)(0.5);
toVhe(30); // 'calc((100vh - 1080px) * 0.5 + 30px)'

const toDvhe = Util.cssPxToDvhe(1080)(0.8);
toDvhe(30); // 'calc((100dvh - 1080px) * 0.8 + 30px)'

const toLvhe = Util.cssPxToLvhe(1080)(0.5);
const toSvhe = Util.cssPxToSvhe(1080)(0.5);
toLvhe(30); // 'calc((100lvh - 1080px) * 0.5 + 30px)'
toSvhe(30); // 'calc((100svh - 1080px) * 0.5 + 30px)'
```

#### Other Utility Functions

##### `percent(denominator)(numerator)`

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
  - `nameVw`, `nameDvw`, `nameLvw`, `nameSvw`, `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc`, `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe`
    - Custom name prefixes
    - Use empty string `''` to skip that type
  - `scope`
    - VSCode Snippet file type scope (default: `'html,css,sass,scss,less,stylus'`)

```typescript
import { Gen } from "css-gum";

const widthFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440, 1920],
  firstIndex: 1,
});

// Custom Snippet scope range
const cssOnlyFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  scope: "css,scss", // Only show in CSS and SCSS files
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

**Parameters**

- `options`
  - `points`
    - Array of design draft heights in pixels
    - Invalid values (≤ 0) are automatically filtered
  - `firstIndex`
    - Starting index number (default: 1)
  - `space`
    - Default space value for generated functions (default: 0)
  - `nameVh`, `nameDvh`, `nameLvh`, `nameSvh`, `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc`, `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe`
    - Custom name prefixes
    - Use empty string `''` to skip that type
  - `scope`
    - VSCode Snippet file type scope (default: `'html,css,sass,scss,less,stylus'`)

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

**Parameters**

- `options`
  - `space`
    - Default space value for generated functions (default: 0)
  - `nameVw`, `nameDvw`, `nameLvw`, `nameSvw`, `nameVh`, `nameDvh`, `nameLvh`, `nameSvh`, `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc`, `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc`, `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe`, `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe`, `nameEm`, `nameLh`, `namePercent`
    - Custom name prefixes
    - Use empty string `''` to skip that type
  - `scope`
    - VSCode Snippet file type scope (default: `'html,css,sass,scss,less,stylus'`)

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

// Get Snippets from generators
const coreGen = Gen.genFuncsCore();
Snippet.writeSnippetsToFiles(coreGen.VSCodeSnippet, VSCodeSnippetsPath);

const widthGen = Gen.genFuncsDraftWidth({ points: [375, 768, 1440] });
Snippet.writeSnippetsToFiles(widthGen.VSCodeSnippet, VSCodeSnippetsPath);
```

**Using Snippet Module**

##### `genVSCodeSnippetCore(options)`

Generate core function Snippets.

**Parameters**

- `options`
  - `nameVw`, `nameDvw`, `nameLvw`, `nameSvw`, `nameVh`, `nameDvh`, `nameLvh`, `nameSvh`, `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc`, `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc`, `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe`, `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe`, `nameEm`, `nameLh`, `namePercent`
    - Custom name prefixes
    - Use empty string `''` to skip that type
  - `scope`
    - VSCode Snippet file type scope (default: `'html,css,sass,scss,less,stylus'`)

##### `genVSCodeSnippetDraftWidth(options)`

Generate width function Snippets.

**Parameters**

- `options`
  - `pointsSize`
    - Number of generated breakpoints
  - `firstIndex`
    - Starting index number (default: 1)
  - `nameVw`, `nameDvw`, `nameLvw`, `nameSvw`, `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc`, `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe`
    - Custom name prefixes
    - Use empty string `''` to skip that type
  - `scope`
    - VSCode Snippet file type scope (default: `'html,css,sass,scss,less,stylus'`)

##### `genVSCodeSnippetDraftHeight(options)`

Generate height function Snippets.

**Parameters**

- `options`
  - `pointsSize`
    - Number of generated breakpoints
  - `firstIndex`
    - Starting index number (default: 1)
  - `nameVh`, `nameDvh`, `nameLvh`, `nameSvh`, `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc`, `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe`
    - Custom name prefixes
    - Use empty string `''` to skip that type
  - `scope`
    - VSCode Snippet file type scope (default: `'html,css,sass,scss,less,stylus'`)

```typescript
import { Snippet } from "css-gum";

const VSCodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// Generate core function Snippets
const coreSnippets = Snippet.genVSCodeSnippetCore({
  nameVw: "vw",
  nameDvw: "dvw", // Include dvw
  namePercent: "percent",
});
Snippet.writeSnippetsToFiles(coreSnippets, VSCodeSnippetsPath);

// Custom scope range
const cssOnlySnippets = Snippet.genVSCodeSnippetCore({
  nameVw: "vw",
  scope: "css,scss", // Only trigger in CSS/SCSS
});
Snippet.writeSnippetsToFiles(cssOnlySnippets, VSCodeSnippetsPath);
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

The `scope` parameter is used to control which file types VSCode Snippets can be triggered in. This allows you to:

- 🎯 **Precise control**: Only show relevant Snippets in the file types you need
- 🗂️ **Avoid interference**: Prevent useless Snippet suggestions in unrelated files
- 🎨 **Categorized management**: Create dedicated Snippets for different file types

**Common scope values**:

```typescript
scope: "css"; // Only show in CSS files
scope: "scss,sass"; // Only show in SCSS and Sass files
scope: "css,scss,less"; // Show in CSS, SCSS, Less files
scope: "html"; // Only show in HTML files (suitable for Tailwind CSS)
```

**Default value** `'html,css,sass,scss,less,stylus'` covers most style-related file types, see [official documentation](https://code.visualstudio.com/docs/editing/userdefinedsnippets) for details.
