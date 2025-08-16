import type { DesignDraft, Percent, Pixel } from "./types"

export const percent = (denominator: number) => (numerator: number) => numerator / denominator * 100
export const pxToVw = percent
export const pxToVh = percent

export const cssPxToVw = (designDraftWidth: DesignDraft) => (pixel: Pixel) => `${pxToVw(designDraftWidth)(pixel)}vw`
export const cssPxToVh = (designDraftHeight: DesignDraft) => (pixel: Pixel) => `${pxToVh(designDraftHeight)(pixel)}vh`
export const cssPxToVwClamp = (designDraftWidth: DesignDraft) => (pixel: Pixel) => pixel >= 0 ? `min(${pixel}px, ${cssPxToVw(designDraftWidth)(pixel)})` : `max(${pixel}px, ${cssPxToVw(designDraftWidth)(pixel)})`
export const cssPxToVhClamp = (designDraftHeight: DesignDraft) => (pixel: Pixel) => pixel >= 0 ? `min(${pixel}px, ${cssPxToVh(designDraftHeight)(pixel)})` : `max(${pixel}px, ${cssPxToVh(designDraftHeight)(pixel)})`
export const cssDesignDraftVwScaling = (designDraftWidth: DesignDraft) => (percent: Percent) => (pixel: Pixel) => `calc((100vw - ${designDraftWidth}px) * ${percent} + ${pixel}px)`
export const cssDesignDraftVhScaling = (designDraftHeight: DesignDraft) => (percent: Percent) => (pixel: Pixel) => `calc((100vh - ${designDraftHeight}px) * ${percent} + ${pixel}px)`
export const cssPercent = (parent: number) => (child: number) => `${percent(parent)(child)}%`

export const cssEm = (ls: number, fontSize: number) => `${ls / fontSize}em`
export const cssLh = (lh: number, fontSize: number) => `${lh / fontSize}`
