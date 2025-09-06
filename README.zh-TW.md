# css-gum

[![Test](https://github.com/jzovvo/css-gum/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/jzovvo/css-gum/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/jzovvo/css-gum/branch/master/graph/badge.svg)](https://codecov.io/gh/jzovvo/css-gum)
[![npm version](https://badge.fury.io/js/css-gum.svg)](https://www.npmjs.com/package/css-gum)

讓你的響應式設計像口香糖一樣伸縮自如——在各種螢幕尺寸間完美彈性適應。這個工具包將複雜的 viewport 計算轉化為簡單直觀的 function，並自動生成 VSCode Snippet，讓你輕鬆黏合到高效的響應式開發 workflow 中。

[English](./README.md)

## 功能特色

- 🖥️ **viewport 單位**: 支援 `vw`/`vh`、`dvw`/`dvh`、`lvw`/`lvh`、`svw`/`svh`
- 🔒 **限制單位**: 使用 `vwc`/`vhc` 限制最大/最小值
- 📏 **延伸縮放**: 適應比 design draft 更大螢幕
- ⚡ **批量生成**: 為多個 design draft breakpoint 批量生成 function
- 🎯 **VSCode Snippet**: 自動生成 CSS function、響應式圖片、媒體查詢 snippet

## 安裝

```bash
npm install css-gum
```

## 快速開始

```typescript
import { Core } from "css-gum";

// 基本（預設不帶尾隨空格）
Core.vw(20, 1440); // '1.39vw' - 1440px design draft 的 20px
Core.vh(30, 1080); // '2.78vh' - 1080px design draft 的 30px

// viewport 變體
Core.dvw(20, 1440); // '1.39dvw'
Core.dvh(30, 1080); // '2.78dvh'
Core.lvw(20, 1440); // '1.39lvw'
Core.lvh(30, 1080); // '2.78lvh'
Core.svw(20, 1440); // '1.39svw'
Core.svh(30, 1080); // '2.78svh'

// 控制空格參數（適用於不同使用場景）
Core.vw(20, 1440, 0); // '1.39vw'  - 指定不帶空格（預設）
Core.vw(20, 1440, 1); // '1.39vw ' - 指定帶空格

// 限制單位
Core.vwc(20, 1440); // 'min(20px, 1.39vw)'
Core.dvwc(20, 1440); // 'min(20px, 1.39dvw)'
Core.vhc(30, 1080); // 'min(30px, 2.78vh)'
Core.dvhc(30, 1080); // 'min(30px, 2.78dvh)'

// 延伸縮放（預設縮放係數 0.5）
Core.vwe(20, 1440); // 'calc((100vw - 1440px) * 0.5 + 20px)'
Core.dvwe(20, 1440); // 'calc((100dvw - 1440px) * 0.5 + 20px)'
Core.vhe(30, 1080); // 'calc((100vh - 1080px) * 0.5 + 30px)'
Core.dvhe(30, 1080); // 'calc((100dvh - 1080px) * 0.5 + 30px)'

// 其他工具
Core.percent(10, 100); // '10%'
Core.percent(0, 100); // '0'（零值返回 '0' 而非 '0%'）
Core.em(24, 16); // '1.5em'
Core.lh(24, 16); // '1.5'
```

## 使用場景範例

### 搭配 [PostCSS Functions](https://www.npmjs.com/package/postcss-functions)

![Demo](./examples/postcss/_assets/demo.gif)

[查看完整範例 →](./examples/postcss/postcss-functions/README.zh-TW.md)

## API

### Core Module

#### Viewport 單位函數

**基本型：** `vw()`, `vh()`, `dvw()`, `dvh()`, `lvw()`, `lvh()`, `svw()`, `svh()`
**限制型：** `vwc()`, `vhc()`, `dvwc()`, `dvhc()`, `lvwc()`, `lvhc()`, `svwc()`, `svhc()`
**延伸型：** `vwe()`, `vhe()`, `dvwe()`, `dvhe()`, `lvwe()`, `lvhe()`, `svwe()`, `svhe()`

**共通參數**

- `pixel` - 要轉換的 pixel 值
- `designDraft` - design draft pixel 值
- `space` - 是否添加尾隨空格 (`1` = 帶空格, `0` = 不帶空格, 預設: `0`) _(僅基本 viewport 單位)_
- `percent` - 延伸型縮放係數（預設: 0.5） _(僅延伸型 vwe/vhe 系列)_

```typescript
// 詳細用法請參考快速開始章節
Core.vw(20, 1440); // '1.39vw' - 基本型
Core.vwc(20, 1440); // 'min(20px, 1.39vw)' - 限制型
Core.vwe(20, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5 + 20px)' - 延伸型
```

#### 其他工具函數

**`percent(child, parent)`** - 計算百分比值  
**`em(lineSize, fontSize)`** - 轉換為 em 單位  
**`lh(lineHeight, fontSize)`** - 轉換為行高比例

```typescript
Core.percent(10, 100); // '10%' - 計算百分比值
Core.percent(0, 100); // '0'（零值返回 '0'）
Core.em(24, 16); // '1.5em' - 轉換為 em 單位
Core.lh(24, 16); // '1.5' - 轉換為行高比例
```

### Util Module

Util 模組是最底層的運算核心，專為運行時 JS 計算設計。為了提高性能，不包含參數驗證（依賴 TypeScript 類型提示），以此減少運行時的性能負擔。

```typescript
import { Util } from "css-gum";

// 基本 viewport 單位
const toVw = Util.cssPxToVw(1440);
const toVh = Util.cssPxToVh(1080);
const toDvw = Util.cssPxToDvw(1440);
const toDvh = Util.cssPxToDvh(1080);
const toLvw = Util.cssPxToLvw(1440);
const toLvh = Util.cssPxToLvh(1080);
const toSvw = Util.cssPxToSvw(1440);
const toSvh = Util.cssPxToSvh(1080);

toVw(20); // '1.39vw'
toVh(30); // '2.78vh'
toDvw(20); // '1.39dvw'
toDvh(30); // '2.78dvh'
toLvw(20); // '1.39lvw'
toLvh(30); // '2.78lvh'
toSvw(20); // '1.39svw'
toSvh(30); // '2.78svh'

// 限制型
const toVwc = Util.cssPxToVwc(1440);
const toVhc = Util.cssPxToVhc(1080);
const toDvwc = Util.cssPxToDvwc(1440);
const toDvhc = Util.cssPxToDvhc(1080);
const toLvwc = Util.cssPxToLvwc(1440);
const toLvhc = Util.cssPxToLvhc(1080);
const toSvwc = Util.cssPxToSvwc(1440);
const toSvhc = Util.cssPxToSvhc(1080);

toVwc(20); // 'min(20px, 1.39vw)'
toVhc(30); // 'min(30px, 2.78vh)'
toDvwc(20); // 'min(20px, 1.39dvw)'
toDvhc(30); // 'min(30px, 2.78dvh)'
toLvwc(20); // 'min(20px, 1.39lvw)'
toLvhc(30); // 'min(30px, 2.78lvh)'
toSvwc(20); // 'min(20px, 1.39svw)'
toSvhc(30); // 'min(30px, 2.78svh)'

// 延伸型
const toVwe = Util.cssPxToVwe(1440)(0.5);
const toVhe = Util.cssPxToVhe(1080)(0.5);
const toDvwe = Util.cssPxToDvwe(1440)(0.5);
const toDvhe = Util.cssPxToDvhe(1080)(0.5);
const toLvwe = Util.cssPxToLvwe(1440)(0.5);
const toLvhe = Util.cssPxToLvhe(1080)(0.5);
const toSvwe = Util.cssPxToSvwe(1440)(0.5);
const toSvhe = Util.cssPxToSvhe(1080)(0.5);

toVwe(20); // 'calc((100vw - 1440px) * 0.5 + 20px)'
toVhe(30); // 'calc((100vh - 1080px) * 0.5 + 30px)'
toDvwe(20); // 'calc((100dvw - 1440px) * 0.5 + 20px)'
toDvhe(30); // 'calc((100dvh - 1080px) * 0.5 + 30px)'
toLvwe(20); // 'calc((100lvw - 1440px) * 0.5 + 20px)'
toLvhe(30); // 'calc((100lvh - 1080px) * 0.5 + 30px)'
toSvwe(20); // 'calc((100svw - 1440px) * 0.5 + 20px)'
toSvhe(30); // 'calc((100svh - 1080px) * 0.5 + 30px)'

// 其他工具
const toCssPercent = Util.cssPercent(100);
toCssPercent(25); // '25%'

Util.cssEm(24, 16); // '1.5em'
Util.cssLh(24, 16); // '1.5'
```

### Gen Module

生成器模組為多個 design draft breakpoint 批量生成 function，支援自訂名稱和空格參數配置。

**共通參數規則**

- `points` _(必需)_ - design draft pixel 值陣列，無效值（≤ 0）自動過濾
- `firstIndex` - 起始索引號（預設: 1）
- `space` - 生成 function 的預設 space 值（預設: 0）
- 函數名稱前綴參數 - 使用空字串 `''` 可跳過該類型（詳見各函數專用參數）
- `scope` - VSCode Snippet 檔案類型範圍（預設: `['html','css','sass','scss','less','stylus']`）

#### `genFuncsDraftWidth(options)`

為多個 design draft breakpoint 生成寬度轉換 function。

**專用參數**

- `nameVw`, `nameDvw`, `nameLvw`, `nameSvw` - 基本 viewport 寬度函數名稱前綴
- `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc` - 限制型寬度函數名稱前綴
- `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe` - 延伸型寬度函數名稱前綴

```typescript
import { Gen } from "css-gum";

const widthFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440, 1920],
  firstIndex: 1,
});

// 自訂 Snippet scope 範圍
const cssOnlyFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  scope: ["css", "scss"], // 只在 CSS 和 SCSS 檔案中顯示
});

widthFuncs.core.vw1(20); // '5.33vw' - 375px design draft 的 20px
widthFuncs.core.vw1(20, 1); // '5.33vw ' - 帶空格
widthFuncs.core.dvw1(20); // '5.33dvw'
widthFuncs.core.vwc2(20); // 'min(20px, 2.60vw)' - 768px
widthFuncs.core.vwe3(20); // 'calc((100vw - 1440px) * 0.5 + 20px)' - 1440px

// 設定預設 space 參數
const spacedFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768],
  space: 1, // 預設帶空格
});
spacedFuncs.core.vw1(20); // '5.33vw ' - 預設帶空格
spacedFuncs.core.vw1(20, 0); // '5.33vw' - 指定不帶空格

// 跳過特定類型或自訂名稱
const customFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768],
  nameVw: "custom", // 自訂名稱
  nameDvw: "", // 跳過 dvw
  nameVwc: "", // 跳過限制型
});
// 結果：只生成 core.custom1, core.custom2, core.vwe1, core.vwe2
```

#### `genFuncsDraftHeight(options)`

為多個 design draft breakpoint 生成高度轉換 function。

**專用參數**

- `nameVh`, `nameDvh`, `nameLvh`, `nameSvh` - 基本 viewport 高度函數名稱前綴
- `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc` - 限制型高度函數名稱前綴
- `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe` - 延伸型高度函數名稱前綴

```typescript
const heightFuncs = Gen.genFuncsDraftHeight({
  points: [667, 1080, 1440],
});

heightFuncs.core.vh1(30); // '4.50vh' - 667px design draft 的 30px
heightFuncs.core.dvh1(30); // '4.50dvh'
heightFuncs.core.vhc2(30); // 'min(30px, 2.78vh)' - 1080px
```

#### `genFuncsCore(options)`

生成具有自訂名稱的核心 function 集合。

**專用參數**

- `nameVw`, `nameDvw`, `nameLvw`, `nameSvw` - 基本 viewport 寬度函數名稱前綴
- `nameVh`, `nameDvh`, `nameLvh`, `nameSvh` - 基本 viewport 高度函數名稱前綴
- `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc` - 限制型寬度函數名稱前綴
- `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc` - 限制型高度函數名稱前綴
- `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe` - 延伸型寬度函數名稱前綴
- `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe` - 延伸型高度函數名稱前綴
- `nameEm`, `nameLh`, `namePercent` - 其他工具函數名稱前綴

```typescript
const customCore = Gen.genFuncsCore({
  nameVw: "toVw", // 自訂名稱
  nameDvw: "", // 跳過 dvw
  namePercent: "toPercent",
});

customCore.core.toVw(20, 1440); // 等同於 Core.vw(20, 1440)
customCore.core.toPercent(10, 100); // 等同於 Core.percent(10, 100)

// 設定預設 space 參數
const spacedCore = Gen.genFuncsCore({
  space: 1, // 預設帶空格
  nameVw: "vw",
});
spacedCore.core.vw(20, 1440); // '1.39vw ' - 預設帶空格
spacedCore.core.vw(20, 1440, 0); // '1.39vw' - 指定不帶空格
```

### Snippet Module

![](./examples/postcss/_assets/snippet.gif)

自動生成 [VSCode Snippets](https://code.visualstudio.com/docs/editing/userdefinedsnippets) 文件。具備自動合併、安全備份、目錄創建等功能，只能在 Node.js 環境使用。

**使用流程：** 透過生成函數取得 `SnippetConfig` → 使用 `writeSnippetsToFiles` 寫入檔案

#### `writeSnippetsToFiles(snippets, output)`

將 Snippet 寫入 VSCode snippets 檔案。參數：`snippets` (SnippetConfig 物件)、`output` (檔案路徑陣列)。

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

#### 生成 SnippetConfig

```typescript
import { Gen, Snippet } from "css-gum";

const VSCodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// 從 Gen 模組取得 Snippet
const coreGen = Gen.genFuncsCore();
Snippet.writeSnippetsToFiles(coreGen.VSCodeSnippet, VSCodeSnippetsPath);

// 或直接使用 Snippet 模組
const coreSnippets = Snippet.genVSCodeSnippetCore();
Snippet.writeSnippetsToFiles(coreSnippets, VSCodeSnippetsPath);
```

##### `genVSCodeSnippetCore(options)`

生成核心 function Snippet。

**專用參數**

- `nameVw`, `nameDvw`, `nameLvw`, `nameSvw` - 基本 viewport 寬度函數名稱前綴
- `nameVh`, `nameDvh`, `nameLvh`, `nameSvh` - 基本 viewport 高度函數名稱前綴
- `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc` - 限制型寬度函數名稱前綴
- `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc` - 限制型高度函數名稱前綴
- `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe` - 延伸型寬度函數名稱前綴
- `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe` - 延伸型高度函數名稱前綴
- `nameEm`, `nameLh`, `namePercent` - 其他工具函數名稱前綴

##### `genVSCodeSnippetDraftWidth(options)`

生成寬度 function Snippet。

**專用參數**

- `pointsSize` - 生成的 breakpoint 數量
- `nameVw`, `nameDvw`, `nameLvw`, `nameSvw` - 基本 viewport 寬度函數名稱前綴
- `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc` - 限制型寬度函數名稱前綴
- `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe` - 延伸型寬度函數名稱前綴

##### `genVSCodeSnippetDraftHeight(options)`

生成高度 function Snippet。

**專用參數**

- `pointsSize` - 生成的 breakpoint 數量
- `nameVh`, `nameDvh`, `nameLvh`, `nameSvh` - 基本 viewport 高度函數名稱前綴
- `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc` - 限制型高度函數名稱前綴
- `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe` - 延伸型高度函數名稱前綴

##### `genVSCodeSnippetPicture(options)`

生成響應式圖片的 VS Code snippet。

**專用參數**

- `pointOffset` - 斷點偏移量（預設: 0）
- `namePic` - snippet 前綴（預設: `'pic'`）
- `scope` - 預設: `['html', 'vue', 'javascriptreact', 'typescriptreact']`

```typescript
const pictureSnippets = Snippet.genVSCodeSnippetPicture({
  points: [768, 1024, 1440],
  pointOffset: -1, // 可選：斷點偏移
  scope: ["html"], // 可選：指定 scope
});
```

生成的 snippet 會自動區分 HTML 和 React 語法：

```html
<!-- HTML 版本 (使用 srcset) -->
<picture>
  <source media="(max-width: 768px)" srcset="" />
  <img src="" alt="" />
</picture>

<!-- React 版本 (使用 srcSet) -->
<picture>
  <source media="(max-width: 768px)" srcset="" />
  <img src="" alt="" />
</picture>
```

##### `genVSCodeSnippetMediaQuery(options)`

生成媒體查詢的 VS Code snippet。

**專用參數**

- `pointOffset` - 斷點偏移量（預設: 0）
- `firstIndex` - 起始索引號（預設: 0）
- `nameMin` - 最小寬度 snippet 前綴（預設: `'min-p'`）
- `nameMax` - 最大寬度 snippet 前綴（預設: `'max-p'`）

```typescript
const mediaQuerySnippets = Snippet.genVSCodeSnippetMediaQuery({
  points: [768, 1024, 1440],
  nameMin: "mobile-up", // 可選：自定義名稱
  nameMax: "mobile-down",
});
```

生成的 snippet 包含 min 和 max 兩種類型：

```css
/* min-p1 snippet */
@media (width >= 768px) {
  /* 內容 */
}

/* max-p1 snippet */
@media (width < 768px) {
  /* 內容 */
}
```

##### 自定義 Snippet 名稱

你可以通過空字串來跳過不需要的 Snippet 類型。

```typescript
// 精簡版 Snippet
const minimalSnippets = Snippet.genVSCodeSnippetDraftWidth({
  pointsSize: 2,
  nameVw: "vw", // 只保留 vw
  nameDvw: "", // 跳過 dvw
  nameVwc: "", // 跳過 vwc
});
Snippet.writeSnippetsToFiles(minimalSnippets, ["/path/to/.vscode/minimal.code-snippets"]);
```

## 錯誤處理

**Core Module** - 包含完整參數驗證，無效輸入返回空字串  
**Util Module** - 為了性能不含驗證，依賴 TypeScript 類型提示  
**Gen/Snippet Module** - 包含參數驗證和錯誤處理

```typescript
// Core Module - 有驗證
Core.vw("invalid", 1440); // 返回 ''
Core.vw(20, "invalid"); // 返回 ''
Core.vw(20, 0); // 返回 ''（零/負數被拒絕）
Core.vw(20, 1440); // 返回 '1.39vw'

// Util Module - 無驗證，直接運算
Util.cssPxToVw(1440)(20); // 直接運算，假設參數正確

// 錯誤訊息包含詳細 stack trace
Core.vw("invalid", 1000);
// 控制台輸出範例:
// [error] pixel expected number, received invalid
//         designDraft expected number, received 1000
//         Error: <完整的 stack trace 訊息>
```

## 瀏覽器支援

支援現代瀏覽器：

- viewport 單位：`vw`/`vh`（傳統）、`dvw`/`dvh`、`lvw`/`lvh`、`svw`/`svh`
- CSS `calc()` function
- CSS `min()`/`max()` function

**viewport 變體支援：**

- `dvw`/`dvh`、`lvw`/`lvh`、`svw`/`svh`: Chrome 108+, Firefox 101+, Safari 16.0+

## 支持

如果 `css-gum` 讓你的設計像口香糖一樣有彈性地延展，考慮請我喝杯咖啡吧☕
你的支持讓這個專案保持黏性，並幫助它變得更有彈性🍬

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-orange)](https://ko-fi.com/jzovvo)

## 拉得不夠順？

`css-gum` 在你手上拉得不夠順嗎？還是有什麼地方卡卡的？別擔心，我們一起來把它拉得更彈性 🍬

- 🐛 [Issues](https://github.com/jzovvo/css-gum/issues)
- 💭 [Discussions](https://github.com/jzovvo/css-gum/discussions)
- 📮 [Mail](mailto:jzovvo@gmail.com)
- 💻 [Site](https://jzovvo.dev)

## 授權

MIT © [jzovvo](https://github.com/jzovvo)

## Q&A

### 為什麼需要空格參數？

在使用 `Tailwind CSS` 的多值語法時，如果 CSS function 返回值沒有尾隨空格，build 後編譯出來的值有時候會連接在一起，原因不詳

```html
<!-- ❌ 編譯的結果可能會是 padding: 1.39vw2.08vw; -->
<div class="p-[vw(20,1440)_vw(30,1440)]"></div>
```

為了解決這個問題，你可以在需要時手動指定帶空格的 function：

```html
<!-- ✅ 編譯結果：padding: 1.39vw 2.08vw ; -->
<div class="p-[vw(20,1440,1)_vw(30,1440,1)]"></div>
```

或者只在中間的 function 使用空格，最後一個不用：

```html
<!-- ✅ 編譯結果：padding: 1.39vw 2.08vw; -->
<div class="p-[vw(20,1440,1)_vw(30,1440)]"></div>
```

### 什麼是 scope 參數？

`scope` 參數控制 VSCode Snippet 在哪些檔案類型中觸發。詳情請看 [VSCode Snippet 官方文件](https://code.visualstudio.com/docs/editing/userdefinedsnippets) 與 [Language Identifiers](https://code.visualstudio.com/docs/languages/identifiers)。
