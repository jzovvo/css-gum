# CSS Gum + Vite 範例

這個範例展示如何在 Vite 專案中使用 css-gum 搭配 [PostCSS Functions](https://www.npmjs.com/package/postcss-functions)，實作響應式設計的數值計算。

## 執行範例

```bash
npm install
npm run dev
```

## 範例說明

![Demo](../_assets/demo.gif)

- 本範例包含三種縮放模式的對比：
  1. **SCALE** - 純縮放，元素會無限制地根據視窗大小變化
  2. **CLAMP** - 限制縮放，在中斷點範圍內才會縮放
  3. **CLAMP+EXTEND** - 結合 clamp 和 extend，提供更精細的控制
- 每個範例都同時展示了 Tailwind CSS 和 CSS 的寫法。

## Core

- 藉由 `postcss-functions` 可以執行函式並將返回值替換的特性，將需要使用的函式都寫入 `postcss-functions` 配置中來攔截，以達成攔截函式並替換成 CSS 值
- 在 `postcss.config.ts` 中設定 css-gum 函數：

```ts
import { Gen } from "css-gum";
import type { Config } from "postcss-load-config";

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-functions": {
      functions: {
        // 將會使用到的函式都加入，讓 postcss-functions 攔截來執行並替換
        // 假設有兩張設計稿，分別是 375px 與 1440px 的大小
        ...Gen.genFuncsDraftWidth({ points: [375, 1440] }).core,
      },
    },
  },
} satisfies Config;
```

這個配置會產生以下函式：

- 🖥️ **Scale 純縮放**: `vw0()`, `vw1()`
  - 元素會根據視窗寬度等比例縮放，沒有上下限制。

- 🔒 **Clamp 限制縮放**: `vwc0()`, `vwc1()`
  - 元素會根據視窗寬度縮放，但有最大值／最小值限制。

- 📏 **Extend 延伸縮放**: `vwe0()`, `vwe1()`
  - 當視窗寬度超出設計稿範圍時，元素會根據設定的比例繼續縮放
  - 適合處理大螢幕延伸效果和精確控制的情境

數字後綴對應設計稿大小：

- `0` = 375px 設計稿
- `1` = 1440px 設計稿

### 使用方式

#### 在 Tailwind CSS 中使用

```html
<div class="text-[length:vw2(100)] max-[768px]:text-[length:vw1(100)]">TEXT</div>
```

#### 在 CSS 中使用

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

- `genFuncsDraftWidth` 會在返回物件中包含 `VSCodeSnippet` 屬性
- `Snippet.genVSCodeSnippetMediaQuery` 會返回 `@media (width ? ?px) {...}` 的 Snippet 配置
- `Snippet.genVSCodeSnippetPicture` 會返回 `<picture/>` 標籤的 Snippet 配置
- 可以使用 `Snippet.writeSnippetsToFiles` 將所有 Snippet 配置寫入到指定的檔案中

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

目前提供寫入 `tailwindcss` 配置文件的功能，流程跟 Snippet 差不多。

```js
import { Config } from "css-gum";
import { join } from "path";

const mediaQueryPoints = [375, 768, 1440];
const tailwindConfigOutput = [join(import.meta.dirname, "css/tailwind/_config.css")];

Config.writeConfigToFiles(Config.genTailwindBreakpointConfig({ points: mediaQueryPoints }), tailwindConfigOutput);
```

`Config.genTailwindBreakpointConfig` 會生成類似下面這種配置，然後再用 `Config.writeConfigToFiles` 寫入指定的文件路徑中。

```css
@theme {
  --breakpoint-p0: 375px;
  --breakpoint-p1: 768px;
  --breakpoint-p2: 1440px;
}
```
