# CSS Gum + Vite Example

This example demonstrates how to use css-gum with [PostCSS Functions](https://www.npmjs.com/package/postcss-functions) plugin in a Vite project to implement responsive design calculations.

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
- Configure css-gum functions in `postcss.config.js`:

```js
import { Gen } from "css-gum";

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
};
```

This configuration generates the following functions:

- 🖥️ **Scale - Pure Scaling**: `vw1()`, `vw2()`
  - Elements scale proportionally with viewport width, no limits.

- 🔒 **Clamp - Limited Scaling**: `vwc1()`, `vwc2()`
  - Elements scale with viewport width but have max/min value limits.

- 📏 **Extend - Extended Scaling**: `vwe1()`, `vwe2()`
  - When viewport width exceeds breakpoint range, elements maintain fixed calculated values
  - Ideal for handling scenarios requiring precise control like negative margins

Number suffixes correspond to design draft sizes:

- `1` = 375px design draft
- `2` = 1440px design draft

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
  font-size: vw2(100);
  @media screen and (max-width: 767px) {
    font-size: vw1(100);
  }
}
```

## Snippet

- `genFuncsDraftWidth` returns an object containing the `VSCodeSnippet` property
- Use `Snippet.writeSnippetsToFiles` to write the `VSCodeSnippet` to the specified file

```ts
import { Gen, Snippet } from "css-gum";
import { join } from "path";

const draftWidthPoints = [375, 1440];
const snippetOutput = [join(import.meta.dirname, ".vscode/css.code-snippets")];
const { core, VSCodeSnippet } = Gen.genFuncsDraftWidth({ points: draftWidthPoints });

Snippet.writeSnippetsToFiles(VSCodeSnippet, snippetOutput);
```

### Usage Instructions

- Depending on the snippet file type you specify, the effective file scope will vary. For details, see [VSCode Snippet Documentation](https://code.visualstudio.com/docs/editing/userdefinedsnippets)
- Using `css.code-snippets` as an example, after generation, you'll have suggestions in CSS files. Press Tab to auto-complete function calls, and the cursor will automatically position to the parameter location.

![](../_assets/snippet.gif)

- After running `npm run dev`, the following snippets will be automatically generated in `.vscode/css.code-snippets`:

```json
{
  "vw1": {
    "prefix": "vw1",
    "body": "vw1($1)"
  },
  "vwc1": {
    "prefix": "vwc1",
    "body": "vwc1($1)"
  },
  "vwe1": {
    "prefix": "vwe1",
    "body": "vwe1($1)"
  },
  "vw2": {
    "prefix": "vw2",
    "body": "vw2($1)"
  },
  "vwc2": {
    "prefix": "vwc2",
    "body": "vwc2($1)"
  },
  "vwe2": {
    "prefix": "vwe2",
    "body": "vwe2($1)"
  }
}
```
