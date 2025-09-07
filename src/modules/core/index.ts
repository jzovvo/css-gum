import type {DesignDraft, Percent, Pixel, SpaceFlag} from '../../utils/types'
import {cssPxToVhe, cssPxToVwe, cssEm, cssLh, cssPercent, cssPxToVh, cssPxToVhc, cssPxToVw, cssPxToVwc, cssPxToDvw, cssPxToLvw, cssPxToSvw, cssPxToDvh, cssPxToLvh, cssPxToSvh, cssPxToDvwc, cssPxToLvwc, cssPxToSvwc, cssPxToDvhc, cssPxToLvhc, cssPxToSvhc, cssPxToDvwe, cssPxToLvwe, cssPxToSvwe, cssPxToDvhe, cssPxToLvhe, cssPxToSvhe} from '../utils'
import {checkDesignDraftScalingParams, checkPercentParams, checkViewportParams} from '../../utils/validate'
import {consoleError} from '../../utils/console'

const genCssViewport = (utilsFunction: typeof cssPxToVw) => (pixel: Pixel, designDraft: DesignDraft, space: SpaceFlag = 0) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    const baseResult = utilsFunction(result.data[1])(result.data[0])
    return baseResult === '' ? '' : baseResult + (space === 1 ? ' ' : '')
  }

  consoleError(result.error)
  return ''
}

const genCssClamp = (utilsFunction: typeof cssPxToVwc) => (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return utilsFunction(result.data[1])(result.data[0])
  }

  consoleError(result.error)
  return ''
}

const genCssExtend = (utilsFunction: typeof cssPxToVwe) => (pixel: Pixel, designDraft: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraft, percent)

  if (result.data) {
    return utilsFunction(result.data[1])(result.data[2])(result.data[0])
  }

  consoleError(result.error)
  return ''
}

const genCssPercent = (utilsFunction: typeof cssPercent) => (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)

  if (result.data) {
    return utilsFunction(result.data[1])(result.data[0])
  }

  consoleError(result.error)
  return ''
}

const genCssFont = (utilsFunction: typeof cssEm) => (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)

  if (result.data) {
    return utilsFunction(result.data[0], result.data[1])
  }

  consoleError(result.error)
  return ''
}

export const vw = genCssViewport(cssPxToVw)
export const dvw = genCssViewport(cssPxToDvw)
export const lvw = genCssViewport(cssPxToLvw)
export const svw = genCssViewport(cssPxToSvw)

export const vwc = genCssClamp(cssPxToVwc)
export const dvwc = genCssClamp(cssPxToDvwc)
export const lvwc = genCssClamp(cssPxToLvwc)
export const svwc = genCssClamp(cssPxToSvwc)

export const vwe = genCssExtend(cssPxToVwe)
export const dvwe = genCssExtend(cssPxToDvwe)
export const lvwe = genCssExtend(cssPxToLvwe)
export const svwe = genCssExtend(cssPxToSvwe)

export const vh = genCssViewport(cssPxToVh)
export const dvh = genCssViewport(cssPxToDvh)
export const lvh = genCssViewport(cssPxToLvh)
export const svh = genCssViewport(cssPxToSvh)

export const vhc = genCssClamp(cssPxToVhc)
export const dvhc = genCssClamp(cssPxToDvhc)
export const lvhc = genCssClamp(cssPxToLvhc)
export const svhc = genCssClamp(cssPxToSvhc)

export const vhe = genCssExtend(cssPxToVhe)
export const dvhe = genCssExtend(cssPxToDvhe)
export const lvhe = genCssExtend(cssPxToLvhe)
export const svhe = genCssExtend(cssPxToSvhe)

export const percent = genCssPercent(cssPercent)
export const em = genCssFont(cssEm)
export const lh = genCssFont(cssLh)
