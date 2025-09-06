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
- 🎯 **Snippet**: 自動生成 Snippet，提升開發效率

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

CSS-Gum 支援所有 viewport 單位：`vw`, `vh`, `dvw`, `dvh`, `lvw`, `lvh`, `svw`, `svh`

#### `vw(pixel, designDraft, space?)`, `dvw()`, `lvw()`, `svw()`

將 pixel 轉換為 viewport 寬度單位。

**Parameters**

- `pixel` - 要轉換的 pixel 值
- `designDraft` - design draft 寬度 pixel 值
- `space` - 是否添加尾隨空格以支援 Tailwind 多值語法 (`1` = 帶空格, `0` = 不帶空格, 預設: `0`)

```typescript
Core.vw(20, 1440); // '1.39vw'
Core.vw(20, 1440, 1); // '1.39vw ' (帶空格)
Core.dvw(20, 1440); // '1.39dvw'
Core.lvw(20, 1440); // '1.39lvw'
Core.svw(20, 1440); // '1.39svw'
```

#### `vh(pixel, designDraft, space?)`, `dvh()`, `lvh()`, `svh()`

將 pixel 轉換為 viewport 高度單位。

**Parameters**

- `pixel` - 要轉換的 pixel 值
- `designDraft` - design draft 高度 pixel 值
- `space` - 是否添加尾隨空格以支援 Tailwind 多值語法 (`1` = 帶空格, `0` = 不帶空格, 預設: `0`)

```typescript
Core.vh(30, 1080); // '2.78vh'
Core.vh(30, 1080, 1); // '2.78vh ' (帶空格)
Core.dvh(30, 1080); // '2.78dvh'
Core.lvh(30, 1080); // '2.78lvh'
Core.svh(30, 1080); // '2.78svh'
```

#### `vwc(pixel, designDraft)`, `dvwc()`, `lvwc()`, `svwc()`

限制型 viewport 寬度。

**Parameters**

- `pixel` - 要轉換的 pixel 值
- `designDraft` - design draft 寬度 pixel 值

```typescript
Core.vwc(20, 1440); // 'min(20px, 1.39vw)'
Core.vwc(-20, 1440); // 'max(-20px, -1.39vw)'
Core.dvwc(20, 1440); // 'min(20px, 1.39dvw)'
Core.lvwc(20, 1440); // 'min(20px, 1.39lvw)'
Core.svwc(20, 1440); // 'min(20px, 1.39svw)'
```

#### `vhc(pixel, designDraft)`, `dvhc()`, `lvhc()`, `svhc()`

限制型 viewport 高度。

**Parameters**

- `pixel` - 要轉換的 pixel 值
- `designDraft` - design draft 高度 pixel 值

```typescript
Core.vhc(30, 1080); // 'min(30px, 2.78vh)'
Core.vhc(-30, 1080); // 'max(-30px, -2.78vh)'
Core.dvhc(30, 1080); // 'min(30px, 2.78dvh)'
Core.lvhc(30, 1080); // 'min(30px, 2.78lvh)'
Core.svhc(30, 1080); // 'min(30px, 2.78svh)'
```

#### `vwe(pixel, designDraft, percent?)`, `dvwe()`, `lvwe()`, `svwe()`

延伸型 viewport 寬度。

**Parameters**

- `pixel` - 要轉換的 pixel 值
- `designDraft` - design draft 寬度 pixel 值
- `percent` - 縮放係數（預設: 0.5）

```typescript
Core.vwe(20, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5 + 20px)'
Core.vwe(20, 1440); // 與上面相同，使用預設值 0.5
Core.vwe(0, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5)'
Core.vwe(-20, 1440, 0.5); // 'calc((100vw - 1440px) * 0.5 - 20px)'
Core.dvwe(20, 1440, 0.8); // 'calc((100dvw - 1440px) * 0.8 + 20px)'
Core.lvwe(20, 1440); // 'calc((100lvw - 1440px) * 0.5 + 20px)'
Core.svwe(20, 1440); // 'calc((100svw - 1440px) * 0.5 + 20px)'
```

#### `vhe(pixel, designDraft, percent?)`, `dvhe()`, `lvhe()`, `svhe()`

延伸型 viewport 高度。

**Parameters**

- `pixel` - 要轉換的 pixel 值
- `designDraft` - design draft 高度 pixel 值
- `percent` - 縮放係數（預設: 0.5）

```typescript
Core.vhe(30, 1080, 0.5); // 'calc((100vh - 1080px) * 0.5 + 30px)'
Core.vhe(30, 1080); // 與上面相同，使用預設值 0.5
Core.vhe(0, 1080, 0.5); // 'calc((100vh - 1080px) * 0.5)'
Core.vhe(-30, 1080, 0.5); // 'calc((100vh - 1080px) * 0.5 - 30px)'
Core.dvhe(30, 1080, 0.8); // 'calc((100dvh - 1080px) * 0.8 + 30px)'
Core.lvhe(30, 1080); // 'calc((100lvh - 1080px) * 0.5 + 30px)'
Core.svhe(30, 1080); // 'calc((100svh - 1080px) * 0.5 + 30px)'
```

#### `percent(child, parent)`

計算百分比值。

**Parameters**

- `child`
  - 分子
- `parent`
  - 分母

```typescript
Core.percent(10, 100); // '10%'
Core.percent(0, 100); // '0'（零值返回 '0'）
```

#### `em(lineSize, fontSize)`

轉換為 em 單位。

**Parameters**

- `lineSize`
  - 目標尺寸 pixel 值
- `fontSize`
  - 基礎 font size pixel 值

```typescript
Core.em(24, 16); // '1.5em'
```

#### `lh(lineHeight, fontSize)`

轉換為行高比例。

**Parameters**

- `lineHeight`
  - 目標 line height pixel 值
- `fontSize`
  - 基礎 font size pixel 值

```typescript
Core.lh(24, 16); // '1.5'
```

### Util Module

Util 模組提供 curried function。

#### Viewport 寬度工具函數

##### `cssPxToVw(designDraft)(pixel)`, `cssPxToDvw()`, `cssPxToLvw()`, `cssPxToSvw()`

pixel 轉 CSS viewport 寬度字串的 curried function。

**Parameters**

- `designDraft` - design draft 寬度 pixel 值
- `pixel` - 要轉換的 pixel 值

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

#### Viewport 高度工具函數

##### `cssPxToVh(designDraft)(pixel)`, `cssPxToDvh()`, `cssPxToLvh()`, `cssPxToSvh()`

pixel 轉 CSS viewport 高度字串的 curried function。

**Parameters**

- `designDraft` - design draft 高度 pixel 值
- `pixel` - 要轉換的 pixel 值

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

#### 限制型 Viewport 工具函數

##### `cssPxToVwc(designDraft)(pixel)`, `cssPxToDvwc()`, `cssPxToLvwc()`, `cssPxToSvwc()`

pixel 轉限制型 viewport 寬度的 curried function。

**Parameters**

- `designDraft` - design draft 寬度 pixel 值
- `pixel` - 要轉換的 pixel 值

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

pixel 轉限制型 viewport 高度的 curried function。

**Parameters**

- `designDraft` - design draft 高度 pixel 值
- `pixel` - 要轉換的 pixel 值

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

#### 延伸型 Viewport 工具函數

##### `cssPxToVwe(designDraft)(percent)(pixel)`, `cssPxToDvwe()`, `cssPxToLvwe()`, `cssPxToSvwe()`

pixel 轉延伸型 viewport 寬度的 curried function。

**Parameters**

- `designDraft` - design draft 寬度 pixel 值
- `percent` - 縮放係數
- `pixel` - 要轉換的 pixel 值

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

pixel 轉延伸型 viewport 高度的 curried function。

**Parameters**

- `designDraft` - design draft 高度 pixel 值
- `percent` - 縮放係數
- `pixel` - 要轉換的 pixel 值

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

#### 其他工具函數

##### `percent(denominator)(numerator)`

計算百分比的 curried function。

**Parameters**

- `denominator` - 分母值
- `numerator` - 分子值

```typescript
const getPercent = Util.percent(100);
getPercent(25); // 25 (數值)
```

#### `cssPercent(parent)(child)`

計算 CSS 百分比字串的 curried function。

**Parameters**

- `parent`
  - 分母
- `child`
  - 分子

```typescript
const toCssPercent = Util.cssPercent(100);
toCssPercent(25); // '25%'
toCssPercent(0); // '0'（零值返回 '0'）
```

#### `cssEm(lineSize, fontSize)`

計算 CSS em 值。

**Parameters**

- `lineSize`
  - 目標尺寸 pixel 值
- `fontSize`
  - 基礎 font size pixel 值

```typescript
Util.cssEm(24, 16); // '1.5em'
```

#### `cssLh(lineHeight, fontSize)`

計算 CSS 行高比例。

**Parameters**

- `lineHeight`
  - 目標 line height pixel 值
- `fontSize`
  - 基礎 font size pixel 值

```typescript
Util.cssLh(24, 16); // '1.5'
```

### Gen Module

生成器模組提供以下功能：

- ⚡ **批量生成 function**：為多個 design draft breakpoint 快速生成對應的轉換 function
- 🏷️ **function 重命名**：支援自訂 function 名稱前綴，或跳過特定類型 function 的生成
- 🎛️ **空格參數配置**：指定生成 function 的預設 `space` parameter 值（解決 Tailwind CSS 多值編譯問題）
- 🎯 **VSCode Snippet 生成**：自動產生 VSCode Snippet 檔案

#### `genFuncsDraftWidth(options)`

為多個 design draft breakpoint 生成寬度轉換 function。

**Parameters**

- `options`
  - `points`
    - design draft 寬度陣列 pixel 值
    - 無效值（≤ 0）自動過濾
  - `firstIndex`
    - 起始索引號（預設: 1）
  - `space`
    - 生成 function 的預設 space 值（預設: 0）
  - `nameVw`, `nameDvw`, `nameLvw`, `nameSvw`, `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc`, `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe`
    - 自定義名稱前綴
    - 使用空字串 `''` 跳過該類型
  - `scope`
    - VSCode Snippet 的檔案類型範圍（預設: `'html,css,sass,scss,less,stylus'`）

```typescript
import { Gen } from "css-gum";

const widthFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440, 1920],
  firstIndex: 1,
});

// 自訂 Snippet scope 範圍
const cssOnlyFuncs = Gen.genFuncsDraftWidth({
  points: [375, 768, 1440],
  scope: "css,scss", // 只在 CSS 和 SCSS 檔案中顯示
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

**Parameters**

- `options`
  - `points`
    - design draft 高度陣列 pixel 值
    - 無效值（≤ 0）自動過濾
  - `firstIndex`
    - 起始索引號（預設: 1）
  - `space`
    - 生成 function 的預設 space 值（預設: 0）
  - `nameVh`, `nameDvh`, `nameLvh`, `nameSvh`, `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc`, `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe`
    - 自定義名稱前綴
    - 使用空字串 `''` 跳過該類型
  - `scope`
    - VSCode Snippet 的檔案類型範圍（預設: `'html,css,sass,scss,less,stylus'`）

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

**Parameters**

- `options`
  - `space`
    - 生成 function 的預設 space 值（預設: 0）
  - `nameVw`, `nameDvw`, `nameLvw`, `nameSvw`, `nameVh`, `nameDvh`, `nameLvh`, `nameSvh`, `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc`, `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc`, `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe`, `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe`, `nameEm`, `nameLh`, `namePercent`
    - 自定義名稱前綴
    - 使用空字串 `''` 跳過該類型
  - `scope`
    - VSCode Snippet 的檔案類型範圍（預設: `'html,css,sass,scss,less,stylus'`）

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

Snippet 模組可以自動生成 [VSCode Snippets](https://code.visualstudio.com/docs/editing/userdefinedsnippets) 文件，讓你在編輯器中快速輸入 css-gum function。

- 🔄 **自動合併**: 新 Snippet 會與現有檔案合併，不會覆蓋其他 Snippet
- 🛡️ **安全備份**: 如果現有檔案格式錯誤，會自動創建備份
- 📁 **創建目錄**: 如果輸出目錄不存在，會自動創建

**使用流程**

Snippet 模組的使用分為兩個步驟：

1. **生成 Snippet**：透過各種生成 function 取得 `SnippetConfig` 物件
2. **寫入檔案**：使用 `writeSnippetsToFiles` 將 Snippet 寫入 VSCode 檔案

#### `writeSnippetsToFiles(snippets, output)`

- 將 Snippet 寫入 VSCode snippets 檔案。
- browser 環境不可使用，因為 browser 環境無法訪問 file system

**Parameters**

- `snippets`
  - Snippet 物件 (`SnippetConfig`)
- `output`
  - 輸出檔案路徑陣列

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

有兩種方式可以生成 Snippet 物件：

**使用 Gen 模組**

所有生成器 function 都包含 `VSCodeSnippet` 屬性，可以取得對應的 Snippet 物件。

```typescript
import { Gen, Snippet } from "css-gum";

const VSCodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// 從生成器取得 Snippet
const coreGen = Gen.genFuncsCore();
Snippet.writeSnippetsToFiles(coreGen.VSCodeSnippet, VSCodeSnippetsPath);

const widthGen = Gen.genFuncsDraftWidth({ points: [375, 768, 1440] });
Snippet.writeSnippetsToFiles(widthGen.VSCodeSnippet, VSCodeSnippetsPath);
```

**使用 Snippet 模組**

##### `genVSCodeSnippetCore(options)`

生成核心 function Snippet。

**Parameters**

- `options`
  - `nameVw`, `nameDvw`, `nameLvw`, `nameSvw`, `nameVh`, `nameDvh`, `nameLvh`, `nameSvh`, `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc`, `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc`, `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe`, `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe`, `nameEm`, `nameLh`, `namePercent`
    - 自定義名稱前綴
    - 使用空字串 `''` 跳過該類型
  - `scope`
    - VSCode Snippet 的檔案類型範圍（預設: `'html,css,sass,scss,less,stylus'`）

##### `genVSCodeSnippetDraftWidth(options)`

生成寬度 function Snippet。

**Parameters**

- `options`
  - `pointsSize`
    - 生成的 breakpoint 數量
  - `firstIndex`
    - 起始索引號（預設: 1）
  - `nameVw`, `nameDvw`, `nameLvw`, `nameSvw`, `nameVwc`, `nameDvwc`, `nameLvwc`, `nameSvwc`, `nameVwe`, `nameDvwe`, `nameLvwe`, `nameSvwe`
    - 自定義名稱前綴
    - 使用空字串 `''` 跳過該類型
  - `scope`
    - VSCode Snippet 的檔案類型範圍（預設: `'html,css,sass,scss,less,stylus'`）

##### `genVSCodeSnippetDraftHeight(options)`

生成高度 function Snippet。

**Parameters**

- `options`
  - `pointsSize`
    - 生成的 breakpoint 數量
  - `firstIndex`
    - 起始索引號（預設: 1）
  - `nameVh`, `nameDvh`, `nameLvh`, `nameSvh`, `nameVhc`, `nameDvhc`, `nameLvhc`, `nameSvhc`, `nameVhe`, `nameDvhe`, `nameLvhe`, `nameSvhe`
    - 自定義名稱前綴
    - 使用空字串 `''` 跳過該類型
  - `scope`
    - VSCode Snippet 的檔案類型範圍（預設: `'html,css,sass,scss,less,stylus'`）

```typescript
import { Snippet } from "css-gum";

const VSCodeSnippetsPath = ["/path/to/.vscode/css.code-snippets"];

// 生成核心 function Snippet
const coreSnippets = Snippet.genVSCodeSnippetCore({
  nameVw: "vw",
  nameDvw: "dvw", // 包含 dvw
  namePercent: "percent",
});
Snippet.writeSnippetsToFiles(coreSnippets, VSCodeSnippetsPath);

// 自訂 scope 範圍
const cssOnlySnippets = Snippet.genVSCodeSnippetCore({
  nameVw: "vw",
  scope: "css,scss", // 只在 CSS/SCSS 中觸發
});
Snippet.writeSnippetsToFiles(cssOnlySnippets, VSCodeSnippetsPath);
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

所有 function 都包含內建驗證，無效輸入返回空字串。

```typescript
Core.vw("invalid", 1440); // 返回 ''
Core.vw(20, "invalid"); // 返回 ''
Core.vw(20, 0); // 返回 ''（零/負數被拒絕）
Core.vw(20, -100); // 返回 ''（零/負數被拒絕）
Core.vw(20, 1440); // 返回 '1.39vw'

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

`scope` 參數用於控制 VSCode Snippet 在哪些檔案類型中可以觸發。這讓你能夠：

- 🎯 **精準控制**：只在需要的檔案類型中顯示相關 Snippet
- 🗂️ **避免干擾**：防止在不相關的檔案中出現無用的 Snippet 提示
- 🎨 **分類管理**：為不同的檔案類型創建專門的 Snippet

**常用的 scope 值**：

```typescript
scope: "css"; // 只在 CSS 檔案中顯示
scope: "scss,sass"; // 只在 SCSS 和 Sass 檔案中顯示
scope: "css,scss,less"; // 在 CSS、SCSS、Less 檔案中顯示
scope: "html"; // 只在 HTML 檔案中顯示（適用於 Tailwind CSS）
```

**預設值** `'html,css,sass,scss,less,stylus'` 涵蓋了大部分樣式相關的檔案類型，詳情請看[官方文件](https://code.visualstudio.com/docs/editing/userdefinedsnippets)。
