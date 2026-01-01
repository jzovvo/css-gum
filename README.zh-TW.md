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

讓你的響應式設計像口香糖一樣伸縮自如——在各種螢幕尺寸間完美彈性適應。這個工具包將複雜的 viewport 計算轉化為簡單直觀的 function，並自動生成 VSCode Snippet，讓你輕鬆黏合到高效的響應式開發 workflow 中。

[English](./README.md)

## 功能特色

- 🖥️ **viewport 單位**: 支援 `vw`/`vh`、`dvw`/`dvh`、`lvw`/`lvh`、`svw`/`svh`
- 🔒 **限制單位**: 使用 `vwc`/`vhc` 限制最大/最小值
- 📏 **延伸縮放**: 適應比 design draft 更大螢幕
- ⚡ **批量生成**: 為多個 design draft breakpoint 批量生成 function
- 🎯 **VSCode Snippet**: 自動生成 CSS function、響應式圖片、媒體查詢 snippet
- ⚙️ **配置生成**: 生成 Tailwind CSS 斷點配置文件

## 安裝

```bash
npm install css-gum
```

## 快速開始

```typescript
import { Core } from "css-gum";

// 基本用法
Core.vw(20, 1440); // '1.39vw'
Core.vh(30, 1080); // '2.78vh'

// viewport 變體
Core.dvw(20, 1440); // '1.39dvw' - dynamic viewport
Core.svw(20, 1440); // '1.39svw' - small viewport

// 限制和延伸
Core.vwc(20, 1440); // 'min(20px, 1.39vw)' - 限制最大值
Core.vwe(20, 1440, 0.8); // 'calc((100vw - 1440px) * 0.8 + 20px)' - 延伸縮放

// 其他工具
Core.percent(10, 100); // '10%'
Core.em(24, 16); // '1.5em'
Core.lh(24, 16); // '1.5'
```

## 使用場景範例

### 搭配 [PostCSS Functions](https://www.npmjs.com/package/postcss-functions)

![Demo](./examples/postcss/_assets/demo.gif)

[查看完整範例 →](./examples/postcss/postcss-functions/README.zh-TW.md)

## API

### Core Module

```typescript
Core.vw(pixel, designDraft, space?); // space: 0=不帶空格(預設), 1=帶空格
Core.vwc(pixel, designDraft, space?); // 限制型: min() 或 max()
Core.vwe(pixel, designDraft, percent?, space?); // 延伸型: calc() 表達式
Core.percent(child, parent, space?); // 百分比計算
Core.em(child, parent, space?); // em 單位
Core.lh(child, parent, space?); // 行高比例
```

### Util Module

運算核心，不含參數驗證。

```typescript
import { Util } from "css-gum";

const toVw = Util.cssPxToVw(1440);
toVw(20); // '1.39vw'

const toVwe = Util.cssPxToVwe(1440)(0.5);
toVwe(20); // 'calc((100vw - 1440px) * 0.5 + 20px)'

Util.percent(100)(25); // 25
Util.pxToVw(1440)(20); // 1.39 - 等同 percent
Util.pxToVh(1080)(20); // 1.85 - 等同 percent
Util.cssPercent(100)(25); // '25%'
Util.cssEm(24, 16); // '1.5em'
Util.cssLh(24, 16); // '1.5'

// 支援所有 viewport 變體：vw/dvw/lvw/svw/vh/dvh/lvh/svh
// 限制型：cssPxToVwc/cssPxToDvwc/cssPxToVhc/cssPxToDvhc 等
// 延伸型：cssPxToVwe/cssPxToDvwe/cssPxToVhe/cssPxToDvhe 等
```

### Gen Module

為多個 design draft breakpoint 批量生成 function。

#### 共通參數

- `points: number[]` **必需** - design draft 值陣列，≤0 的值會被自動過濾
- `firstIndex: number` - 起始索引（預設: 0）
- `space: 1 | 0` - 預設空格設定（預設: 0，不帶空格）
- `order: 'asc' | 'desc'` - 排序方式：`'asc'` 升序 | `'desc'` 降序（預設: `'asc'`）
- `scope` - VSCode Snippet 適用的檔案類型（預設: `['html','css','sass','scss','less','stylus']`）
- 函數名稱參數 - 自訂函數名稱，使用空字串 `''` 可跳過該類型
- Snippet 前綴參數 - 自訂 VSCode 代碼片段前綴，獨立於函數名稱（預設使用函數名稱）

#### `genFuncsDraftWidth(options)` / `genFuncsDraftHeight(options)`

```typescript
import { Gen } from "css-gum";

const funcs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  nameVw: "mobile", // 自訂名稱
  nameDvw: "", // 跳過 dvw
  snippetPrefixVw: "m", // 自訂 snippet 前綴
  space: 1, // 預設帶空格
});

funcs.core.mobile0(20); // '5.33vw ' - 375px breakpoint
funcs.VSCodeSnippet; // VSCode Snippet 物件
// 支援所有寬度相關函數的名稱和 snippet 前綴自訂：vw/dvw/lvw/svw、vwc/dvwc/lvwc/svwc、vwe/dvwe/lvwe/svwe
```

#### `genFuncsCore(options)`

```typescript
const customCore = Gen.genFuncsCore({
  nameVw: "toVw",
  namePercent: "toPercent",
  snippetPrefixVw: "v", // 自訂 snippet 前綴
  snippetPrefixPercent: "pct", // 自訂 snippet 前綴
  space: 1, // 預設帶空格
});
customCore.VSCodeSnippet; // VSCode Snippet 物件
// 支援所有核心函數的名稱和 snippet 前綴自訂：
// viewport: vw/dvw/lvw/svw、vh/dvh/lvh/svh、vwc/vhc系列、vwe/vhe系列
// 其他: percent、em、lh
```

### Config Module

生成 Tailwind CSS 斷點配置，只能在 Node.js 環境使用。

#### `genTailwindBreakpointConfig(options)`

```typescript
// 瀏覽器環境 - 僅生成配置
// import { Config } from "css-gum";

// Node.js 環境 - 包含檔案寫入功能
import { Config } from "css-gum/node";

const config = Config.genTailwindBreakpointConfig({
  points: [375, 768, 1440],
  prefix: "breakpoint-p", // CSS 變數前綴（預設）
  firstIndex: 0, // 起始索引（預設）
  unit: "px", // 單位（預設）
  wrapper: "theme", // CSS 規則包裝器（預設）
  order: "asc", // 排序方式（預設）
});

// writeConfigToFiles - Node.js 環境專用，自動創建目錄、備份檔案
Config.writeConfigToFiles(config, ["./src/styles/config.css"]);
```

### Snippet Module

自動生成 VSCode Snippets，寫入功能只能在 Node.js 使用。

![](./examples/postcss/_assets/snippet.gif)

#### 基本用法

```typescript
// 瀏覽器環境 - 僅生成 Snippet 物件
// import { Gen, Snippet } from "css-gum";

// Node.js 環境 - 包含檔案寫入功能
import { Gen, Snippet } from "css-gum/node";

// 方式 1: 從 Gen 取得
const funcs = Gen.genFuncsCore();
Snippet.writeSnippetsToFiles(funcs.VSCodeSnippet, [".vscode/css.code-snippets"]);

// 方式 2: 直接生成
const snippets = Snippet.genVSCodeSnippetCore();
Snippet.writeSnippetsToFiles(snippets, [".vscode/css.code-snippets"]);

// writeSnippetsToFiles - Node.js 環境專用
// 自動合併現有 snippet、創建備份、建立目錄
```

#### 生成函數

**基本 Snippet**

- `genVSCodeSnippetCore(options)` - 核心 function snippets
- `genVSCodeSnippetDraftWidth/Height(options)` - breakpoint function snippets

Draft 系列參數：`pointsSize` - 生成的 breakpoint 數量

**響應式 Snippet**

```typescript
// 響應式圖片 (預設 scope: html, vue, javascriptreact, typescriptreact)
const pictureSnippets = Snippet.genVSCodeSnippetPicture({
  points: [768, 1024], // 必需：斷點陣列
  pointOffset: -1, // 斷點偏移（預設: 0）
  snippetPrefixPic: "pic", // snippet 前綴（預設: "pic"）
});

// 媒體查詢 (預設 scope: html, css, sass, scss, less, stylus)
const mediaSnippets = Snippet.genVSCodeSnippetMediaQuery({
  points: [768, 1024], // 必需：斷點陣列
  firstIndex: 0, // 起始索引（預設: 0）
  snippetPrefixMin: "min-p", // 最小寬度前綴（預設）
  snippetPrefixMax: "max-p", // 最大寬度前綴（預設）
  pointOffset: 0, // 斷點偏移（預設）
  order: "asc", // 排序方式（預設）
  scope: ["css", "sass"], // 自訂 scope（可選）
});
// 生成 bracket (css, scss, less) 和 indent (sass, stylus) 語法
```

## 錯誤處理

- **Core Module** - 包含完整參數驗證
- **Util Module** - 不含驗證，依賴 TypeScript 類型提示
- **Gen/Snippet/Config Module** - 包含參數驗證

## 支持

如果 `css-gum` 讓你的設計像口香糖一樣有彈性地延展，考慮請我喝杯咖啡吧☕
你的支持讓這個專案保持黏性，並幫助它變得更有彈性🍬

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-FF5A16)](https://ko-fi.com/jzovvo)
[![Portaly](https://img.shields.io/badge/Portaly-請我吃一頓愛珍食-862983)](https://portaly.cc/jzovvo/support)

## 拉得不夠順？

`css-gum` 在你手上拉得不夠順嗎？還是有什麼地方卡卡的？別擔心，我們一起來把它拉得更彈性 🍬

- 🐛 [Issues](https://github.com/jzovvo/css-gum/issues)
- 📮 [Mail](mailto:jzovvo@gmail.com)
- 💻 [Site](https://jzovvo.dev)

## 授權

MIT © [jzovvo](https://github.com/jzovvo)

## Q&A

### 為什麼需要空格參數？

在使用 Tailwind CSS 的多值語法時，如果 CSS function 返回值沒有尾隨空格，build 後編譯出來的值可能會連接在一起：

```html
<!-- ❌ 可能變成：padding: 1.39vw2.08vw; -->
<div class="p-[vw(20,1440)_vw(30,1440)]"></div>

<!-- ✅ 使用空格參數：padding: 1.39vw 2.08vw; -->
<div class="p-[vw(20,1440,1)_vw(30,1440)]"></div>
```

### 什麼是 scope 參數？

`scope` 參數控制 VSCode Snippet 在哪些檔案類型中觸發。詳情請看 [VSCode Snippet 官方文件](https://code.visualstudio.com/docs/editing/userdefinedsnippets) 與 [Language Identifiers](https://code.visualstudio.com/docs/languages/identifiers)。
