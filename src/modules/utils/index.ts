import type {DesignDraft, Percent, Pixel, ViewportHeightUnit, ViewportWidthUnit} from '../../utils/types'

export const percent = (denominator: number) => (numerator: number) => numerator / denominator * 100
export const pxToVw = percent
export const pxToVh = percent

const genCssPercentUnit = (parent: number) => (unit: string) => (child: number) => {
  if (child === 0) {
    return '0'
  }

  if (parent === 0) {
    return 'infinity'
  }

  return `${percent(parent)(child)}${unit}`
}

const genCssViewport = (designDraftWidth: DesignDraft) => (unit: ViewportWidthUnit | ViewportHeightUnit) => (pixel: Pixel) => {
  if (designDraftWidth <= 0) {
    return ''
  }

  return genCssPercentUnit(designDraftWidth)(unit)(pixel)
}

const genCssClamp = (designDraftWidth: DesignDraft) => (unit: ViewportWidthUnit | ViewportHeightUnit) => (pixel: Pixel) => {
  if (designDraftWidth <= 0) {
    return ''
  }

  if (pixel === 0) {
    return '0'
  }

  return pixel > 0 ? `min(${pixel}px, ${genCssViewport(designDraftWidth)(unit)(pixel)})` : `max(${pixel}px, ${genCssViewport(designDraftWidth)(unit)(pixel)})`
}

const genCssExtend = (designDraftWidth: DesignDraft) => (unit: ViewportWidthUnit | ViewportHeightUnit) => (percent: Percent) => (pixel: Pixel) => {
  if (designDraftWidth <= 0) {
    return ''
  }

  if (percent === 0) {
    return pixel === 0 ? '0' : `${pixel}px`
  }

  const ratioString = `(100${unit} - ${designDraftWidth}px) * ${percent}`
  const pixelString = pixel === 0 ? '' : pixel > 0 ? ` + ${pixel}px` : ` - ${pixel * -1}px`

  return `calc(${ratioString}${pixelString})`
}

const genCssFont = (fontSize: number) => (unit: '' | 'em') => (value: number) => {
  if (value === 0) {
    return '0'
  }

  if (fontSize === 0) {
    return 'infinity'
  }

  return `${value / fontSize}${unit}`
}

export const cssPercent = (parent: number) => (child: number) => genCssPercentUnit(parent)('%')(child)

export const cssPxToVw = (designDraftWidth: DesignDraft) => (pixel: Pixel) => genCssViewport(designDraftWidth)('vw')(pixel)
export const cssPxToDvw = (designDraftWidth: DesignDraft) => (pixel: Pixel) => genCssViewport(designDraftWidth)('dvw')(pixel)
export const cssPxToLvw = (designDraftWidth: DesignDraft) => (pixel: Pixel) => genCssViewport(designDraftWidth)('lvw')(pixel)
export const cssPxToSvw = (designDraftWidth: DesignDraft) => (pixel: Pixel) => genCssViewport(designDraftWidth)('svw')(pixel)

export const cssPxToVwc = (designDraftWidth: DesignDraft) => (pixel: Pixel) => genCssClamp(designDraftWidth)('vw')(pixel)
export const cssPxToDvwc = (designDraftWidth: DesignDraft) => (pixel: Pixel) => genCssClamp(designDraftWidth)('dvw')(pixel)
export const cssPxToLvwc = (designDraftWidth: DesignDraft) => (pixel: Pixel) => genCssClamp(designDraftWidth)('lvw')(pixel)
export const cssPxToSvwc = (designDraftWidth: DesignDraft) => (pixel: Pixel) => genCssClamp(designDraftWidth)('svw')(pixel)

export const cssPxToVwe = (designDraftWidth: DesignDraft) => (percent: Percent) => (pixel: Pixel) => genCssExtend(designDraftWidth)('vw')(percent)(pixel)
export const cssPxToDvwe = (designDraftWidth: DesignDraft) => (percent: Percent) => (pixel: Pixel) => genCssExtend(designDraftWidth)('dvw')(percent)(pixel)
export const cssPxToLvwe = (designDraftWidth: DesignDraft) => (percent: Percent) => (pixel: Pixel) => genCssExtend(designDraftWidth)('lvw')(percent)(pixel)
export const cssPxToSvwe = (designDraftWidth: DesignDraft) => (percent: Percent) => (pixel: Pixel) => genCssExtend(designDraftWidth)('svw')(percent)(pixel)

export const cssPxToVh = (designDraftHeight: DesignDraft) => (pixel: Pixel) => genCssViewport(designDraftHeight)('vh')(pixel)
export const cssPxToDvh = (designDraftHeight: DesignDraft) => (pixel: Pixel) => genCssViewport(designDraftHeight)('dvh')(pixel)
export const cssPxToLvh = (designDraftHeight: DesignDraft) => (pixel: Pixel) => genCssViewport(designDraftHeight)('lvh')(pixel)
export const cssPxToSvh = (designDraftHeight: DesignDraft) => (pixel: Pixel) => genCssViewport(designDraftHeight)('svh')(pixel)

export const cssPxToVhc = (designDraftHeight: DesignDraft) => (pixel: Pixel) => genCssClamp(designDraftHeight)('vh')(pixel)
export const cssPxToDvhc = (designDraftHeight: DesignDraft) => (pixel: Pixel) => genCssClamp(designDraftHeight)('dvh')(pixel)
export const cssPxToLvhc = (designDraftHeight: DesignDraft) => (pixel: Pixel) => genCssClamp(designDraftHeight)('lvh')(pixel)
export const cssPxToSvhc = (designDraftHeight: DesignDraft) => (pixel: Pixel) => genCssClamp(designDraftHeight)('svh')(pixel)

export const cssPxToVhe = (designDraftHeight: DesignDraft) => (percent: Percent) => (pixel: Pixel) => genCssExtend(designDraftHeight)('vh')(percent)(pixel)
export const cssPxToDvhe = (designDraftHeight: DesignDraft) => (percent: Percent) => (pixel: Pixel) => genCssExtend(designDraftHeight)('dvh')(percent)(pixel)
export const cssPxToLvhe = (designDraftHeight: DesignDraft) => (percent: Percent) => (pixel: Pixel) => genCssExtend(designDraftHeight)('lvh')(percent)(pixel)
export const cssPxToSvhe = (designDraftHeight: DesignDraft) => (percent: Percent) => (pixel: Pixel) => genCssExtend(designDraftHeight)('svh')(percent)(pixel)

export const cssEm = (ls: number, fontSize: number) => genCssFont(fontSize)('em')(ls)
export const cssLh = (lh: number, fontSize: number) => genCssFont(fontSize)('')(lh)
