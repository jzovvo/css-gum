import type {DesignDraft, Percent, Pixel} from './types'

export const percent = (denominator: number) => (numerator: number) => numerator / denominator * 100
export const pxToVw = percent
export const pxToVh = percent


const classifyNumber = (result: number): { special: true; result: string } | { special: false; result: number } => {
  switch (result) {
    case Infinity:
      return {special: true, result: 'infinity'}
    case -Infinity:
      return {special: true, result: '-infinity'}
    case 0:
      return {special: true, result: '0'}
    default:
      return {special: false, result}
  }
}

export const cssPxToVw = (designDraftWidth: DesignDraft) => (pixel: Pixel) => {
  const result = classifyNumber(pxToVw(designDraftWidth)(pixel))
  return result.special ? result.result : `${result.result}vw`
}
export const cssPxToVh = (designDraftHeight: DesignDraft) => (pixel: Pixel) => {
  const result = classifyNumber(pxToVh(designDraftHeight)(pixel))
  return result.special ? result.result : `${result.result}vh`
}
export const cssPxToVwc = (designDraftWidth: DesignDraft) => (pixel: Pixel) => {
  if (pixel === 0) {
    return '0'
  }
  return pixel > 0 ? `min(${pixel}px, ${cssPxToVw(designDraftWidth)(pixel)})` : `max(${pixel}px, ${cssPxToVw(designDraftWidth)(pixel)})`
}
export const cssPxToVhc = (designDraftHeight: DesignDraft) => (pixel: Pixel) => {
  if (pixel === 0) {
    return '0'
  }
  return pixel > 0 ? `min(${pixel}px, ${cssPxToVh(designDraftHeight)(pixel)})` : `max(${pixel}px, ${cssPxToVh(designDraftHeight)(pixel)})`
}
export const cssPxToVwe = (designDraftWidth: DesignDraft) => (percent: Percent) => (pixel: Pixel) => `calc((100vw - ${designDraftWidth}px) * ${percent} + ${pixel}px)`
export const cssPxToVhe = (designDraftHeight: DesignDraft) => (percent: Percent) => (pixel: Pixel) => `calc((100vh - ${designDraftHeight}px) * ${percent} + ${pixel}px)`
export const cssPercent = (parent: number) => (child: number) => `${percent(parent)(child)}%`

export const cssEm = (ls: number, fontSize: number) => `${ls / fontSize}em`
export const cssLh = (lh: number, fontSize: number) => `${lh / fontSize}`
