import type {DesignDraft, Percent, Pixel, SpaceFlag} from '../../utils/types'
import {cssPxToVhe, cssPxToVwe, cssEm, cssLh, cssPercent, cssPxToVh, cssPxToVhc, cssPxToVw, cssPxToVwc, cssPxToDvw, cssPxToLvw, cssPxToSvw, cssPxToDvh, cssPxToLvh, cssPxToSvh, cssPxToDvwc, cssPxToLvwc, cssPxToSvwc, cssPxToDvhc, cssPxToLvhc, cssPxToSvhc, cssPxToDvwe, cssPxToLvwe, cssPxToSvwe, cssPxToDvhe, cssPxToLvhe, cssPxToSvhe} from '../utils'
import {checkDesignDraftScalingParams, checkPercentParams, checkSpaceFlag, checkViewportParams} from '../../utils/validate'
import {consoleError} from '../../utils/console'

const exec = <T>(
  paramsResult: {data: T | null; error: string | null},
  spaceResult: {data: SpaceFlag | null; error: string | null},
  executor: (data: T) => string,
) => {
  if (paramsResult.data && spaceResult.data !== null) {
    const baseResult = executor(paramsResult.data)
    return baseResult === '' ? '' : baseResult + (spaceResult.data === 1 ? ' ' : '')
  }

  paramsResult.error && consoleError(paramsResult.error)
  spaceResult.error && consoleError(spaceResult.error)

  return ''
}

const genCssViewport = (utilsFunction: typeof cssPxToVw) => (pixel: Pixel, designDraft: DesignDraft, space: SpaceFlag = 0) => {
  return exec(
    checkViewportParams(pixel, designDraft),
    checkSpaceFlag(space),
    (data) => utilsFunction(data[1])(data[0]),
  )
}

const genCssClamp = (utilsFunction: typeof cssPxToVwc) => (pixel: Pixel, designDraft: DesignDraft, space: SpaceFlag = 0) => {
  return exec(
    checkViewportParams(pixel, designDraft),
    checkSpaceFlag(space),
    (data) => utilsFunction(data[1])(data[0]),
  )
}

const genCssExtend = (utilsFunction: typeof cssPxToVwe) => (pixel: Pixel, designDraft: DesignDraft, percent: Percent = 0.5, space: SpaceFlag = 0) => {
  return exec(
    checkDesignDraftScalingParams(pixel, designDraft, percent),
    checkSpaceFlag(space),
    (data) => utilsFunction(data[1])(data[2])(data[0]),
  )
}

const genCssPercent = (utilsFunction: typeof cssPercent) => (child: Percent, parent: Percent, space: SpaceFlag = 0) => {
  return exec(
    checkPercentParams(child, parent),
    checkSpaceFlag(space),
    (data) => utilsFunction(data[1])(data[0]),
  )
}

const genCssFont = (utilsFunction: typeof cssEm) => (child: Percent, parent: Percent, space: SpaceFlag = 0) => {
  return exec(
    checkPercentParams(child, parent),
    checkSpaceFlag(space),
    (data) => utilsFunction(data[0], data[1]),
  )
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
