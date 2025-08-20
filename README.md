# css-gum

[![Test](https://github.com/jzovvo/css-gum/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/jzovvo/css-gum/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/jzovvo/css-gum/branch/master/graph/badge.svg)](https://codecov.io/gh/jzovvo/css-gum)
[![npm version](https://badge.fury.io/js/css-gum.svg)](https://www.npmjs.com/package/css-gum)

Make your responsive designs stretch like gum – seamlessly elastic across all screen sizes. This toolkit transforms complex viewport calculations into simple, intuitive functions, and automatically generates VS Code snippets, allowing you to effortlessly integrate efficient responsive workflows.

[繁體中文](./README.zh-TW.md)

## Features

- 🖥️ **Viewport Units**: Convert pixels to responsive `vw`/`vh` units
- 🔒 **Clamped Units**: Limit max/min values with `vwc`/`vhc`
- 📏 **Extended Scaling**: Adaptive scaling for screens larger than design draft
- ⚡ **Batch Generation**: Generate functions for multiple design draft breakpoints
- 🎯 **Snippets**: Auto-generate code snippets for improved development efficiency

## Installation

```bash
npm install css-gum
```

## Quick Start

```typescript
import { Core } from "css-gum";

// Basic viewport units
Core.vw(20, 1440); // '1.39vw' - 20px on 1440px design
Core.vh(30, 1080); // '2.78vh' - 30px on 1080px design

// Clamped units (prevent scaling beyond design size)
Core.vwc(20, 1440); // 'min(20px, 1.39vw)'
Core.vhc(30, 1080); // 'min(30px, 2.78vh)'

// Extended scaling (for larger screens)
Core.vwe(20, 1440); // 'calc((100vw - 1440px) * 0.5 + 20px)'
Core.vhe(30, 1080); // 'calc((100vh - 1080px) * 0.5 + 30px)'

// Other utilities
Core.percent(10, 100); // '10%'
Core.percent(0, 100); // '0' (zero values return '0' not '0%')
Core.em(24, 16); // '1.5em'
Core.lh(24, 16); // '1.5'
```

## Example Use Cases

### With [PostCSS Functions](https://www.npmjs.com/package/postcss-functions)

![Demo](./examples/vite/assets/demo.gif)

[View Complete Example →](./examples/vite/README.md)

## API

### Core Module

#### `vw(pixel, designDraft)`

Converts pixels to viewport width units.

```typescript
Core.vw(20, 1440); // '1.39vw'
```

#### `vh(pixel, designDraft)`

Converts pixels to viewport height units.

```typescript
Core.vh(30, 1080); // '2.78vh'
```

#### `vwc(pixel, designDraft)`

Clamped viewport width (prevents scaling beyond original size).

```typescript
Core.vwc(20, 1440); // 'min(20px, 1.39vw)'
```

#### `vhc(pixel, designDraft)`

Clamped viewport height.

```typescript
Core.vhc(30, 1080); // 'min(30px, 2.78vh)'
```

#### `vwe(pixel, designDraft, percent?)`

Extended viewport width for screens larger than design draft.

```typescript
Core.vwe(20, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5 + 20px)'
```

#### `vhe(pixel, designDraft, percent?)`

Extended viewport height for screens larger than design draft.

```typescript
Core.vhe(30, 1080, 0.5); // 'calc((100vh - 1080px) * 0.5 + 30px)'
```

#### `percent(child, parent)`

Calculates percentage value.

```typescript
Core.percent(10, 100); // '10%'
Core.percent(0, 100); // '0' (zero values return '0')
```

#### `em(lineSize, fontSize)`

Converts to em units.

```typescript
Core.em(24, 16); // '1.5em'
```

#### `lh(lineHeight, fontSize)`

Converts to line-height ratio.

```typescript
Core.lh(24, 16); // '1.5'
```

### Utils Module

#### `cssPxToVw(designDraft)(pixel)`

Curried function to convert pixels to CSS vw strings.

```typescript
import { Utils } from "css-gum";

const toVw = Utils.cssPxToVw(1440);
toVw(20); // '1.39vw'
toVw(0); // '0'
```

#### `cssPxToVh(designDraft)(pixel)`

Curried function to convert pixels to CSS vh strings.

```typescript
const toVh = Utils.cssPxToVh(1080);
toVh(30); // '2.78vh'
```

#### `cssPxToVwc(designDraft)(pixel)`

Curried function to convert pixels to clamped vw.

```typescript
const toVwc = Utils.cssPxToVwc(1440);
toVwc(20); // 'min(20px, 1.39vw)'
toVwc(-20); // 'max(-20px, -1.39vw)'
```

#### `cssPxToVhc(designDraft)(pixel)`

Curried function to convert pixels to clamped vh.

```typescript
const toVhc = Utils.cssPxToVhc(1080);
toVhc(30); // 'min(30px, 2.78vh)'
```

#### `cssPxToVwe(designDraft)(percent)(pixel)`

Curried function to convert pixels to extended vw.

```typescript
const toVwe = Utils.cssPxToVwe(1440)(0.5);
toVwe(20); // 'calc((100vw - 1440px) * 0.5 + 20px)'
```

#### `cssPxToVhe(designDraft)(percent)(pixel)`

Curried function to convert pixels to extended vh.

```typescript
const toVhe = Utils.cssPxToVhe(1080)(0.5);
toVhe(30); // 'calc((100vh - 1080px) * 0.5 + 30px)'
```

#### `percent(denominator)(numerator)`

Curried function to calculate percentage.

```typescript
const getPercent = Utils.percent(100);
getPercent(25); // 25 (number)
```

#### `cssPercent(parent)(child)`

Curried function to calculate CSS percentage strings.

```typescript
const toCssPercent = Utils.cssPercent(100);
toCssPercent(25); // '25%'
toCssPercent(0); // '0' (zero values return '0')
```

#### `cssEm(lineSize, fontSize)`

Calculates CSS em values.

```typescript
Utils.cssEm(24, 16); // '1.5em'
```

#### `cssLh(lineHeight, fontSize)`

Calculates CSS line-height ratios.

```typescript
Utils.cssLh(24, 16); // '1.5'
```

### Gen Module

The Generator module provides bulk creation of functions and VS Code snippets, allowing you to quickly generate corresponding functions for multiple design draft breakpoints.

#### `genFuncsDraftWidth(options)`

Generates width conversion functions for multiple design draft breakpoints.

**options**

- `points` - Array of design draft widths (pixels) - invalid values (≤ 0) are automatically filtered out
- `firstIndex` - Starting index number (default: 1)
- `nameVw`, `nameVwc`, `nameVwe` - Custom function name prefixes (use empty string `''` to skip generating that type)

```typescript
import { Gen } from "css-gum";

const widthFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440, 1920],
  firstIndex: 1,
});

widthFuncs.core.vw1(20); // 20px on 375px design
widthFuncs.core.vwc2(20); // Clamped 20px on 768px design
widthFuncs.core.vwe3(20); // Extended 20px on 1440px design

// Invalid points are automatically filtered out
const filteredFuncs = Gen.genFuncsDraftWidth({
  points: [0, -100, 375, 768, -50], // Only 375 and 768 are valid
});
// Only generates: core.vw1, core.vw2, core.vwc1, core.vwc2, core.vwe1, core.vwe2

// Skip specific function types by using empty string
const partialFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768],
  nameVw: "vw", // Generate vw functions
  nameVwc: "", // Skip vwc functions
  nameVwe: "extend", // Generate extend functions
});

// Only generates: core.vw1, core.vw2, core.extend1, core.extend2
```

#### `genFuncsDraftHeight(options)`

Generates height conversion functions for multiple design draft breakpoints.

**options**

- `points` - Array of design draft heights (pixels) - invalid values (≤ 0) are automatically filtered out
- `firstIndex` - Starting index number (default: 1)
- `nameVh`, `nameVhc`, `nameVhe` - Custom function name prefixes (use empty string `''` to skip generating that type)

```typescript
const heightFuncs = Gen.genFuncsDraftHeight({
  points: [667, 1080, 1440],
});

heightFuncs.core.vh1(30); // 30px on 667px design
heightFuncs.core.vhc2(30); // Clamped 30px on 1080px design

// Invalid points are automatically filtered out
const filteredHeightFuncs = Gen.genFuncsDraftHeight({
  points: [0, -200, 667, 1080, -100], // Only 667 and 1080 are valid
});
// Only generates: core.vh1, core.vh2, core.vhc1, core.vhc2, core.vhe1, core.vhe2

// Skip specific function types
const onlyVhFuncs = Gen.genFuncsDraftHeight({
  points: [667, 1080],
  nameVh: "vh",
  nameVhc: "", // Skip clamped functions
  nameVhe: "", // Skip extended functions
});

// Only generates: core.vh1, core.vh2
```

#### `genFuncsCore(options)`

Generates core function collection with custom names.

**options**

- `nameVw`, `nameVh`, `nameVwc`, `nameVhc`, `nameVwe`, `nameVhe`, `nameEm`, `nameLh`, `namePercent` - Custom function name prefixes (use empty string `''` to exclude)

```typescript
const customCore = Gen.genFuncsCore({
  nameVw: "toVw",
  namePercent: "toPercent",
});

customCore.core.toVw(20, 1440); // Same as Core.vw(20, 1440)
customCore.core.toPercent(10, 100); // Same as Core.percent(10, 100)

// Exclude specific functions
const minimalCore = Gen.genFuncsCore({
  nameVw: "vw",
  nameVh: "vh",
  nameVwc: "", // Exclude clamped width
  nameVhc: "", // Exclude clamped height
  nameVwe: "", // Exclude extended width
  nameVhe: "", // Exclude extended height
  nameEm: "", // Exclude em function
  nameLh: "", // Exclude line-height function
  namePercent: "", // Exclude percent function
});

// Only generates: core.vw, core.vh functions
```

### Snippet Module

![](./assets/snippet.gif)

The Snippet module can automatically generate [VSCode Snippet](https://code.visualstudio.com/docs/editing/userdefinedsnippets) files, allowing you to quickly input css-gum functions in your editor.

- 🔄 **Auto Merge**: New snippets merge with existing files, won't overwrite other snippets
- 🛡️ **Safe Backup**: Automatically creates backup if existing file has format errors
- 📁 **Auto Directory**: Creates output directories automatically if they don't exist

#### Gen

All generator functions include a `genVscodeSnippet()` method that can generate corresponding VS Code snippets:

```typescript
import { Gen } from "css-gum";

const VscodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// Generate snippets for core functions
const coreGen = Gen.genFuncsCore();
coreGen.genVscodeSnippet(VscodeSnippetsPath);

// Generate snippets for width functions
const widthGen = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  firstIndex: 1,
});
widthGen.genVscodeSnippet(VscodeSnippetsPath);

// Generate snippets for height functions
const heightGen = Gen.genFuncsDraftHeight({
  points: [667, 1080, 1440],
});
heightGen.genVscodeSnippet(VscodeSnippetsPath);
```

#### Snippet

You can also use the Snippet module functions directly to generate snippets:

```typescript
import { Snippet } from "css-gum";

const VscodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// Generate core function snippets
Snippet.genVscodeSnippetCore({
  nameVw: "vw",
  nameVh: "vh",
  namePercent: "percent",
  output: VscodeSnippetsPath,
});

// Generate width function snippets
Snippet.genVscodeSnippetDraftWidth({
  pointsSize: 3,
  firstIndex: 1,
  nameVw: "vw",
  nameVwc: "vwc",
  nameVwe: "vwe",
  output: VscodeSnippetsPath,
});

// Generate height function snippets
Snippet.genVscodeSnippetDraftHeight({
  pointsSize: 3,
  firstIndex: 1,
  nameVh: "vh",
  nameVhc: "vhc",
  nameVhe: "vhe",
  output: VscodeSnippetsPath,
});
```

#### Generated Snippet Example

```json
{
  "vw1": {
    "prefix": "vw1",
    "body": "vw1($1,$2)"
  },
  "vwc1": {
    "prefix": "vwc1",
    "body": "vwc1($1,$2)"
  },
  "percent": {
    "prefix": "percent",
    "body": "percent($1,$2)"
  }
}
```

#### Custom Snippet Names

You can skip unnecessary snippet types by using empty strings:

```typescript
// Only generate vw-related snippets, skip vwc and vwe
Snippet.genVscodeSnippetDraftWidth({
  pointsSize: 2,
  nameVw: "vw",
  nameVwc: "", // Skip vwc snippets
  nameVwe: "", // Skip vwe snippets
  output: ["/path/to/.vscode/minimal.code-snippets"],
});
```

## Error Handling

All functions include built-in validation with colored error messages and will return an empty string for invalid inputs:

```typescript
Core.vw("invalid", 1440); // Returns '', logs red error message
Core.vw(20, "invalid"); // Returns '', logs red error message
Core.vw(20, 0); // Returns '' (zero/negative design draft rejected)
Core.vw(20, -100); // Returns '' (zero/negative design draft rejected)
Core.vw(20, 1440); // Returns '1.39vw'

// Error messages include stack traces for debugging
Core.vw("invalid", 1920);
// Output: [error] pixel expected number, received invalid
//         designDraft expected number, received 1920
//         Error: <stack trace>
```

## Browser Support

Works in all modern browsers that support:

- Viewport units (`vw`, `vh`)
- CSS `calc()` function
- CSS `min()`/`max()` functions

## License

MIT © [jzovvo](https://github.com/jzovvo)
