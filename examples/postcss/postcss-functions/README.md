# CSS Gum + Vite Example

This example demonstrates how to use css-gum with [PostCSS Functions](https://www.npmjs.com/package/postcss-functions) in a Vite project to implement responsive design calculations.

## Running the Example

```bash
npm install
npm run dev
```

## Example Overview

![Demo](../_assets/demo.gif)

- This example includes comparisons of three scaling modes:
  1. **SCALE** - Pure scaling, elements scale infinitely with viewport size
  2. **CLAMP** - Limited scaling, scales only within breakpoint ranges
  3. **CLAMP+EXTEND** - Combines clamp and extend for more precise control
- Each example shows both Tailwind CSS and CSS implementations.

## Core

- By leveraging `postcss-functions`' ability to execute functions and replace their return values, we add the functions to the `postcss-functions` configuration to intercept and replace them with CSS values
- Configure css-gum functions in `postcss.config.ts`:

```ts
import { Gen } from "css-gum";
import type { Config } from "postcss-load-config";

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-functions": {
      functions: {
        // Add all functions to be used for postcss-functions to intercept and replace
        // Assuming two design drafts at 375px and 1440px sizes
        ...Gen.genFuncsDraftWidth({ points: [375, 1440] }).core,
      },
    },
  },
} satisfies Config;
```

This configuration generates the following functions:

- 🖥️ **Scale - Pure Scaling**: `vw0()`, `vw1()`
  - Elements scale proportionally with viewport width, no limits.

- 🔒 **Clamp - Limited Scaling**: `vwc0()`, `vwc1()`
  - Elements scale with viewport width but have max/min value limits.

- 📏 **Extend - Extended Scaling**: `vwe0()`, `vwe1()`
  - When viewport width exceeds design draft range, elements continue to scale according to set proportions
  - Ideal for handling large screen extension effects and precise control scenarios

Number suffixes correspond to design draft sizes:

- `0` = 375px design draft
- `1` = 1440px design draft

### Usage

#### Using in Tailwind CSS

```html
<div class="text-[length:vw2(100)] max-[768px]:text-[length:vw1(100)]">TEXT</div>
```

#### Using in CSS

```html
<div class="text">TEXT</div>
```

```css
.text {
  font-size: vw1(100);
  @media screen and (max-width: 767px) {
    font-size: vw0(100);
  }
}
```

## Snippet

- `genFuncsDraftWidth` returns an object containing the `VSCodeSnippet` property
- `Snippet.genVSCodeSnippetMediaQuery` returns snippet configuration for `@media (width ? ?px) {...}`
- `Snippet.genVSCodeSnippetPicture` returns snippet configuration for `<picture/>` tags
- Use `Snippet.writeSnippetsToFiles` to write all snippet configurations to specified files

```ts
import { Gen, Snippet } from "css-gum";
import { join } from "path";

const draftWidthPoints = [375, 1440];
const mediaQueryPoints = [375, 768, 1440];
const snippetOutput = [join(import.meta.dirname, ".vscode/css-gum.code-snippets")];

Snippet.writeSnippetsToFiles(
  {
    ...Gen.genFuncsDraftWidth({ points: draftWidthPoints, space: 1 }).VSCodeSnippet,
    ...Snippet.genVSCodeSnippetMediaQuery({ points: mediaQueryPoints }),
    ...Snippet.genVSCodeSnippetPicture({ points: mediaQueryPoints, pointOffset: -1 }),
  },
  snippetOutput,
);
```

![](../_assets/snippet.gif)

## Config

Currently provides functionality to write `tailwindcss` configuration files, with a process similar to Snippet.

```js
import { Config } from "css-gum";
import { join } from "path";

const mediaQueryPoints = [375, 768, 1440];
const tailwindConfigOutput = [join(import.meta.dirname, "css/tailwind/_config.css")];

Config.writeConfigToFiles(Config.genTailwindBreakpointConfig({ points: mediaQueryPoints }), tailwindConfigOutput);
```

`Config.genTailwindBreakpointConfig` generates configuration similar to the following, then uses `Config.writeConfigToFiles` to write it to specified file paths.

```css
@theme {
  --breakpoint-p0: 375px;
  --breakpoint-p1: 768px;
  --breakpoint-p2: 1440px;
}
```
