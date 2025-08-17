# CSS Gum + Vite 範例

這個範例展示如何在 Vite 專案中使用 css-gum 搭配 [PostCSS Functions](https://www.npmjs.com/package/postcss-functions) 插件，實現響應式設計的數值計算。

## 範例說明

本範例包含三種縮放模式的對比：

1. **SCALE** - 純縮放，元素會無限制地根據視窗大小變化
2. **CLAMP** - 限制縮放，在斷點範圍內才會縮放
3. **CLAMP+EXTEND** - 結合 clamp 和 extend，提供更精細的控制

每個範例都同時展示了 Tailwind CSS 和 CSS 的寫法。

## 運行範例

```bash
pnpm install
pnpm dev
```

<video src="./assets/demo.mp4" width="100%" controls></video>

## 核心說明

- 藉由 `postcss-functions` 可以執行函數並將返回值替換的特性，將需要使用的函數都寫入 `postcss-functions` 配置中來攔截，以達成將攔截函數並替換成 css value
- 在 `postcss.config.js` 中設定 css-gum 函數：

```js
import { Gen } from "css-gum";

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-functions": {
      functions: {
        // 將會使用到的函數都塞入，讓 postcss-functions 攔截來執行並替換
        // 假設有兩張設計稿，分別是 375px 與 1440px 的大小
        ...Gen.genDraftWidthFuncs({ points: [375, 1440] }),
      },
    },
  },
};
```

這個配置會生成以下函數：

- 🖥️ **Scale 純縮放**: `vw1()`, `vw2()`
  - 元素會根據視窗寬度等比例縮放，沒有上下限。

- 🔒 **Clamp 限制縮放**: `vwc1()`, `vwc2()`
  - 元素會根據視窗寬度縮放，但有最大值 / 最小值限制。

- 📏 **Extend 延伸縮放**: `vwe1()`, `vwe2()`
  - 當視窗寬度超出斷點範圍時，元素會保持固定的計算值
  - 適合處理負邊距等需要精確控制的場景

數字後綴對應設計稿大小：

- `1` = 375px 設計稿
- `2` = 1440px 設計稿

## 使用方式

### 在 Tailwind CSS 中使用

```html
<div class="text-[length:vw2(100)] max-[768px]:text-[length:vw1(100)]">TEXT</div>
```

### 在 CSS 中使用

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
