# css-gum

[![Test](https://github.com/jzovvo/css-gum/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/jzovvo/css-gum/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/jzovvo/css-gum/branch/master/graph/badge.svg)](https://codecov.io/gh/jzovvo/css-gum)
[![npm version](https://badge.fury.io/js/css-gum.svg)](https://www.npmjs.com/package/css-gum)

Make your responsive designs stretch like gum – seamlessly elastic across all screen sizes. This toolkit transforms complex viewport calculations into simple, intuitive functions, glueing together effortless responsive workflows.

[繁體中文](./README.zh-TW.md)

## Features

- 🖥️ **Viewport Units**: Convert pixels to responsive `vw`/`vh` units
- 🔒 **Clamped Units**: Limit max/min values with `vwc`/`vhc`
- 📏 **Extended Scaling**: Adaptive scaling for screens larger than design draft

## Installation

```bash
npm install css-gum
```

## Quick Start

```typescript
import { Core } from "css-gum";

// Basic viewport units
Core.vw(
  20,
  1440,
); // '1.39vw' - 20px on 1440px design
Core.vh(
  30,
  1080,
); // '2.78vh' - 30px on 1080px design

// Clamped units (prevent scaling beyond design size)
Core.vwc(
  20,
  1440,
); // 'min(20px, 1.39vw)'
Core.vhc(
  30,
  1080,
); // 'min(30px, 2.78vh)'

// Extended scaling (for larger screens)
Core.vwe(
  20,
  1440,
); // 'calc((100vw - 1440px) * 0.5 + 20px)'
Core.vhe(
  30,
  1080,
); // 'calc((100vh - 1080px) * 0.5 + 30px)'

// Other utilities
Core.percent(
  10,
  100,
); // '10%'
Core.em(
  24,
  16,
); // '1.5em'
Core.lh(
  24,
  16,
); // '1.5'
```

## Core API

### Viewport Units

#### `vw(pixel, designDraft)`

Converts pixels to viewport width units.

```typescript
Core.vw(
  20,
  1440,
); // '1.39vw'
```

#### `vh(pixel, designDraft)`

Converts pixels to viewport height units.

```typescript
Core.vh(
  30,
  1080,
); // '2.78vh'
```

#### `vwc(pixel, designDraft)`

Clamped viewport width (prevents scaling beyond original size).

```typescript
Core.vwc(
  20,
  1440,
); // 'min(20px, 1.39vw)'
```

#### `vhc(pixel, designDraft)`

Clamped viewport height.

```typescript
Core.vhc(
  30,
  1080,
); // 'min(30px, 2.78vh)'
```

#### `vwe(pixel, designDraft, percent?)`

Extended viewport width for screens larger than design draft.

```typescript
Core.vwe(
  20,
  1440,
  0.5,
); // 'calc((100vw - 1440px) * 0.5 + 20px)'
```

#### `vhe(pixel, designDraft, percent?)`

Extended viewport height for screens larger than design draft.

```typescript
Core.vhe(
  30,
  1080,
  0.5,
); // 'calc((100vh - 1080px) * 0.5 + 30px)'
```

### Utility Functions

#### `percent(child, parent)`

Calculates percentage value.

```typescript
Core.percent(
  10,
  100,
); // '10%'
```

#### `em(lineSize, fontSize)`

Converts to em units.

```typescript
Core.em(
  24,
  16,
); // '1.5em'
```

#### `lh(lineHeight, fontSize)`

Converts to line-height ratio.

```typescript
Core.lh(
  24,
  16,
); // '1.5'
```

## Utils Module

### CSS Conversion Functions

#### `cssPxToVw(designDraft)(pixel)`

Curried function to convert pixels to CSS vw strings.

```typescript
import { Utils } from "css-gum";

const toVw =
  Utils.cssPxToVw(
    1440,
  );
toVw(
  20,
); // '1.39vw'
toVw(
  0,
); // '0'
```

#### `cssPxToVh(designDraft)(pixel)`

Curried function to convert pixels to CSS vh strings.

```typescript
const toVh =
  Utils.cssPxToVh(
    1080,
  );
toVh(
  30,
); // '2.78vh'
```

#### `cssPxToVwc(designDraft)(pixel)`

Curried function to convert pixels to clamped vw.

```typescript
const toVwc =
  Utils.cssPxToVwc(
    1440,
  );
toVwc(
  20,
); // 'min(20px, 1.39vw)'
toVwc(
  -20,
); // 'max(-20px, -1.39vw)'
```

#### `cssPxToVhc(designDraft)(pixel)`

Curried function to convert pixels to clamped vh.

```typescript
const toVhc =
  Utils.cssPxToVhc(
    1080,
  );
toVhc(
  30,
); // 'min(30px, 2.78vh)'
```

#### `cssPxToVwe(designDraft)(percent)(pixel)`

Curried function to convert pixels to extended vw.

```typescript
const toVwe =
  Utils.cssPxToVwe(
    1440,
  )(
    0.5,
  );
toVwe(
  20,
); // 'calc((100vw - 1440px) * 0.5 + 20px)'
```

#### `cssPxToVhe(designDraft)(percent)(pixel)`

Curried function to convert pixels to extended vh.

```typescript
const toVhe =
  Utils.cssPxToVhe(
    1080,
  )(
    0.5,
  );
toVhe(
  30,
); // 'calc((100vh - 1080px) * 0.5 + 30px)'
```

### Basic Calculation Functions

#### `percent(denominator)(numerator)`

Curried function to calculate percentage.

```typescript
const getPercent =
  Utils.percent(
    100,
  );
getPercent(
  25,
); // 25 (number)
```

#### `cssPercent(parent)(child)`

Curried function to calculate CSS percentage strings.

```typescript
const toCssPercent =
  Utils.cssPercent(
    100,
  );
toCssPercent(
  25,
); // '25%'
```

#### `cssEm(lineSize, fontSize)`

Calculates CSS em values.

```typescript
Utils.cssEm(
  24,
  16,
); // '1.5em'
```

#### `cssLh(lineHeight, fontSize)`

Calculates CSS line-height ratios.

```typescript
Utils.cssLh(
  24,
  16,
); // '1.5'
```

## Generator Functions

### `genDraftWidthFuncs(options)`

Generates width conversion functions for multiple design draft breakpoints.

**Parameters:**

- `points` - Array of design draft widths (pixels)
- `firstIndex` - Starting index number (default: 1)
- `nameVw`, `nameVwc`, `nameVwe` - Custom function name prefixes

```typescript
import { Gen } from "css-gum";

const widthFuncs =
  Gen.genDraftWidthFuncs(
    {
      points:
        [
          375,
          768,
          1440,
          1920,
        ],
      firstIndex: 1,
    },
  );

widthFuncs.vw1(
  20,
); // 20px on 375px design
widthFuncs.vwc2(
  20,
); // Clamped 20px on 768px design
widthFuncs.vwe3(
  20,
); // Extended 20px on 1440px design
```

### `genDraftHeightFuncs(options)`

Generates height conversion functions for multiple design draft breakpoints.

**Parameters:**

- `points` - Array of design draft heights (pixels)
- `firstIndex` - Starting index number (default: 1)
- `nameVh`, `nameVhc`, `nameVhe` - Custom function name prefixes

```typescript
const heightFuncs =
  Gen.genDraftHeightFuncs(
    {
      points:
        [
          667,
          1080,
          1440,
        ],
    },
  );

heightFuncs.vh1(
  30,
); // 30px on 667px design
heightFuncs.vhc2(
  30,
); // Clamped 30px on 1080px design
```

### `genCoreFuncs(options)`

Generates core function collection with custom names.

**Parameters:**

- `nameVw`, `nameVh`, `nameVwc`, `nameVhc`, `nameVwe`, `nameVhe` - Viewport function names
- `nameEm`, `nameLh`, `namePercent` - Utility function names

```typescript
const customCore =
  Gen.genCoreFuncs(
    {
      nameVw:
        "toVw",
      namePercent:
        "toPercent",
    },
  );

customCore.toVw(
  20,
  1440,
); // Same as Core.vw(20, 1440)
customCore.toPercent(
  10,
  100,
); // Same as Core.percent(10, 100)
```

## Error Handling

All functions include built-in validation and will return an empty string with console error for invalid inputs:

```typescript
Core.vw(
  "invalid",
  1440,
); // Returns '', logs error
Core.vw(
  20,
  "invalid",
); // Returns '', logs error
Core.vw(
  20,
  1440,
); // Returns '1.39vw'
```

## Browser Support

Works in all modern browsers that support:

- Viewport units (`vw`, `vh`)
- CSS `calc()` function
- CSS `min()`/`max()` functions

## License

MIT © [jzovvo](https://github.com/jzovvo)
