# CSS Gum + Vite Example

This example demonstrates how to use css-gum with [PostCSS Functions](https://www.npmjs.com/package/postcss-functions) plugin in a Vite project to implement responsive design calculations.

## Example Overview

This example includes comparisons of three scaling modes:

1. **SCALE** - Pure scaling, elements scale infinitely with viewport size
2. **CLAMP** - Limited scaling, scales only within breakpoint ranges
3. **CLAMP+EXTEND** - Combines clamp and extend for more precise control

Each example shows both Tailwind CSS and CSS implementations.

## Running the Example

```bash
pnpm install
pnpm dev
```

![Demo](./assets/demo.gif)

## Core Concepts

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
        ...Gen.genDraftWidthFuncs({ points: [375, 1440] }),
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

## Usage

### Using in Tailwind CSS

```html
<div class="text-[length:vw2(100)] max-[768px]:text-[length:vw1(100)]">TEXT</div>
```

### Using in CSS

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
