<p align="center">
  <picture>
    <img alt="css-gum" src="./logo.png" width="350" style="max-width: 100%;">
  </picture>
</p>

<h1 align="center">css-gum</h1>

<p align="center">
  <a href="https://github.com/jzovvo/css-gum/actions/workflows/test.yml">
    <img src="https://github.com/jzovvo/css-gum/actions/workflows/test.yml/badge.svg?branch=master" alt="Test"/>
  </a>
  <a href="https://codecov.io/gh/jzovvo/css-gum">
    <img src="https://codecov.io/gh/jzovvo/css-gum/branch/master/graph/badge.svg" alt="codecov"/>
  </a>
  <a href="https://www.npmjs.com/package/css-gum">
    <img src="https://badge.fury.io/js/css-gum.svg" alt="npm version"/>
  </a>
</p>

---

Make your responsive designs stretch like gum—perfectly elastic across all screen sizes. This toolkit transforms complex viewport calculations into simple, intuitive functions, and automatically generates VSCode Snippets, letting you effortlessly stick to efficient responsive development workflows.

[繁體中文](./README.zh-TW.md)

## Features

- 🖥️ **viewport units**: Support `vw`/`vh`, `dvw`/`dvh`, `lvw`/`lvh`, `svw`/`svh`
- 🔒 **Clamped units**: Use `vwc`/`vhc` to limit max/min values
- 📏 **Extended scaling**: Adapt to screens larger than design draft
- ⚡ **Batch generation**: Batch generate functions for multiple design draft breakpoints
- 🎯 **VSCode Snippet**: Auto-generate CSS functions, responsive images, media query snippets
- ⚙️ **Config generation**: Generate Tailwind CSS breakpoint configuration files

## Installation

```bash
npm install css-gum
```

## Quick Start

```typescript
import { Core } from "css-gum";

// Basic usage
Core.vw(20, 1440); // '1.39vw'
Core.vh(30, 1080); // '2.78vh'

// viewport variants
Core.dvw(20, 1440); // '1.39dvw' - dynamic viewport
Core.svw(20, 1440); // '1.39svw' - small viewport

// Clamped and extended
Core.vwc(20, 1440); // 'min(20px, 1.39vw)' - limit max value
Core.vwe(20, 1440, 0.8); // 'calc((100vw - 1440px) * 0.8 + 20px)' - extended scaling

// Other utilities
Core.percent(10, 100); // '10%'
Core.em(24, 16); // '1.5em'
Core.lh(24, 16); // '1.5'
```

## Usage Examples

### With [PostCSS Functions](https://www.npmjs.com/package/postcss-functions)

![Demo](./examples/postcss/_assets/demo.gif)

[View full example →](./examples/postcss/postcss-functions/README.zh-TW.md)

## API

### Core Module

```typescript
Core.vw(pixel, designDraft, space?); // space: 0=no space(default), 1=with space
Core.vwc(pixel, designDraft, space?); // Clamped: min() or max()
Core.vwe(pixel, designDraft, percent?, space?); // Extended: calc() expression
Core.percent(child, parent, space?); // Percentage calculation
Core.em(child, parent, space?); // em units
Core.lh(child, parent, space?); // Line height ratio
```

### Util Module

Computational core without parameter validation.

```typescript
import { Util } from "css-gum";

const toVw = Util.cssPxToVw(1440);
toVw(20); // '1.39vw'

const toVwe = Util.cssPxToVwe(1440)(0.5);
toVwe(20); // 'calc((100vw - 1440px) * 0.5 + 20px)'

Util.percent(100)(25); // 25
Util.pxToVw(1440)(20); // 1.39 - equivalent to percent
Util.pxToVh(1080)(20); // 1.85 - equivalent to percent
Util.cssPercent(100)(25); // '25%'
Util.cssEm(24, 16); // '1.5em'
Util.cssLh(24, 16); // '1.5'

// Supports all viewport variants: vw/dvw/lvw/svw/vh/dvh/lvh/svh
// Clamped: cssPxToVwc/cssPxToDvwc/cssPxToVhc/cssPxToDvhc etc.
// Extended: cssPxToVwe/cssPxToDvwe/cssPxToVhe/cssPxToDvhe etc.
```

### Gen Module

Batch generate functions for multiple design draft breakpoints.

#### Common Parameters

- `points` _(required)_ - Design draft value array, ≤0 values are automatically filtered
- `firstIndex` - Starting index (default: 0)
- `space` - Default space setting (default: 0, no space)
- `order` - Sort order: `'asc'` ascending | `'desc'` descending (default: `'asc'`)
- `scope` - VSCode Snippet applicable file types (default: `['html','css','sass','scss','less','stylus']`)
- Function name parameters - Custom function names, use empty string `''` to skip that type
- Snippet prefix parameters - Custom VSCode snippet prefixes, independent of function names (defaults to function name)

#### `genFuncsDraftWidth(options)` / `genFuncsDraftHeight(options)`

```typescript
import { Gen } from "css-gum";

const funcs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  nameVw: "mobile", // Custom name
  nameDvw: "", // Skip dvw
  snippetPrefixVw: "m", // Custom snippet prefix
  space: 1, // Default with space
});

funcs.core.mobile0(20); // '5.33vw ' - 375px breakpoint
funcs.VSCodeSnippet; // VSCode Snippet object
// Supports all width-related function names and snippet prefix customization: vw/dvw/lvw/svw, vwc/dvwc/lvwc/svwc, vwe/dvwe/lvwe/svwe
```

#### `genFuncsCore(options)`

```typescript
const customCore = Gen.genFuncsCore({
  nameVw: "toVw",
  namePercent: "toPercent",
  snippetPrefixVw: "v", // Custom snippet prefix
  snippetPrefixPercent: "pct", // Custom snippet prefix
  space: 1, // Default with space
});
customCore.VSCodeSnippet; // VSCode Snippet object
// Supports all core function names and snippet prefix customization:
// viewport: vw/dvw/lvw/svw, vh/dvh/lvh/svh, vwc/vhc series, vwe/vhe series
// others: percent, em, lh
```

### Config Module

Generate Tailwind CSS breakpoint configuration, Node.js environment only.

#### `genTailwindBreakpointConfig(options)`

```typescript
import { Config } from "css-gum";

const config = Config.genTailwindBreakpointConfig({
  points: [375, 768, 1440],
  prefix: "breakpoint-p", // CSS variable prefix (default)
  firstIndex: 0, // Starting index (default)
  unit: "px", // Unit (default)
  wrapper: "theme", // CSS rule wrapper (default)
  order: "asc", // Sort order (default)
});

Config.writeConfigToFiles(config, ["./src/styles/config.css"]);

// writeConfigToFiles - automatically create directories, backup files
```

### Snippet Module

Auto-generate VSCode Snippets, write function is Node.js only.

![](./examples/postcss/_assets/snippet.gif)

#### Basic Usage

```typescript
import { Gen, Snippet } from "css-gum";

// Method 1: Get from Gen
const funcs = Gen.genFuncsCore();
Snippet.writeSnippetsToFiles(funcs.VSCodeSnippet, [".vscode/css.code-snippets"]);

// Method 2: Direct generation
const snippets = Snippet.genVSCodeSnippetCore();
Snippet.writeSnippetsToFiles(snippets, [".vscode/css.code-snippets"]);

// writeSnippetsToFiles - Node.js only
// Auto-merge existing snippets, create backups, build directories
```

#### Generation Functions

**Basic Snippets**

- `genVSCodeSnippetCore(options)` - Core function snippets
- `genVSCodeSnippetDraftWidth/Height(options)` - Breakpoint function snippets

Draft series parameter: `pointsSize` - Number of breakpoints generated

**Responsive Snippets**

```typescript
// Responsive images (default scope: html, vue, javascriptreact, typescriptreact)
const pictureSnippets = Snippet.genVSCodeSnippetPicture({
  points: [768, 1024], // Required: breakpoint array
  pointOffset: -1, // Breakpoint offset (default: 0)
  snippetPrefixPic: "pic", // snippet prefix (default: "pic")
});

// Media queries (default scope: html, css, sass, scss, less, stylus)
const mediaSnippets = Snippet.genVSCodeSnippetMediaQuery({
  points: [768, 1024], // Required: breakpoint array
  firstIndex: 0, // Starting index (default: 0)
  snippetPrefixMin: "min-p", // Min width prefix (default)
  snippetPrefixMax: "max-p", // Max width prefix (default)
  pointOffset: 0, // Breakpoint offset (default)
  order: "asc", // Sort order (default)
  scope: ["css", "sass"], // Custom scope (optional)
});
// Generates bracket (css, scss, less) and indent (sass, stylus) syntax
```

## Error Handling

- **Core Module** - Includes complete parameter validation
- **Util Module** - No validation, relies on TypeScript type hints
- **Gen/Snippet/Config Module** - Includes parameter validation

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

When using Tailwind CSS multi-value syntax, if CSS function return values don't have trailing spaces, the compiled values after build might get concatenated together:

```html
<!-- ❌ Might become: padding: 1.39vw2.08vw; -->
<div class="p-[vw(20,1440)_vw(30,1440)]"></div>

<!-- ✅ Using space parameter: padding: 1.39vw 2.08vw; -->
<div class="p-[vw(20,1440,1)_vw(30,1440)]"></div>
```

### What is the scope parameter?

The `scope` parameter controls which file types VSCode Snippets trigger in. For details, see [VSCode Snippet Official Documentation](https://code.visualstudio.com/docs/editing/userdefinedsnippets) and [Language Identifiers](https://code.visualstudio.com/docs/languages/identifiers).
