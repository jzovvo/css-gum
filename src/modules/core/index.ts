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

const genCssViewport = (callerName: string, utilsFunction: typeof cssPxToVw) => (pixel: Pixel, designDraft: DesignDraft, space: SpaceFlag = 0) => {
  const caller = `${callerName}(${pixel},${designDraft},${space})`

  return exec(
    checkViewportParams(caller, pixel, designDraft),
    checkSpaceFlag(caller, space),
    (data) => utilsFunction(data[1])(data[0]),
  )
}

const genCssClamp = (callerName: string, utilsFunction: typeof cssPxToVwc) => (pixel: Pixel, designDraft: DesignDraft, space: SpaceFlag = 0) => {
  const caller = `${callerName}(${pixel},${designDraft},${space})`

  return exec(
    checkViewportParams(caller, pixel, designDraft),
    checkSpaceFlag(caller, space),
    (data) => utilsFunction(data[1])(data[0]),
  )
}

const genCssExtend = (callerName: string, utilsFunction: typeof cssPxToVwe) => (pixel: Pixel, designDraft: DesignDraft, percent: Percent = 0.5, space: SpaceFlag = 0) => {
  const caller = `${callerName}(${pixel},${designDraft},${percent},${space})`

  return exec(
    checkDesignDraftScalingParams(caller, pixel, designDraft, percent),
    checkSpaceFlag(caller, space),
    (data) => utilsFunction(data[1])(data[2])(data[0]),
  )
}

const genCssPercent = (callerName: string, utilsFunction: typeof cssPercent) => (child: Percent, parent: Percent, space: SpaceFlag = 0) => {
  const caller = `${callerName}(${child},${parent},${space})`

  return exec(
    checkPercentParams(caller, child, parent),
    checkSpaceFlag(caller, space),
    (data) => utilsFunction(data[1])(data[0]),
  )
}

const genCssFont = (callerName: string, utilsFunction: typeof cssEm) => (child: Percent, parent: Percent, space: SpaceFlag = 0) => {
  const caller = `${callerName}(${child},${parent},${space})`

  return exec(
    checkPercentParams(caller, child, parent),
    checkSpaceFlag(caller, space),
    (data) => utilsFunction(data[0], data[1]),
  )
}

export const vw = genCssViewport('vw', cssPxToVw)
export const dvw = genCssViewport('dvw', cssPxToDvw)
export const lvw = genCssViewport('lvw', cssPxToLvw)
export const svw = genCssViewport('svw', cssPxToSvw)

export const vwc = genCssClamp('vwc', cssPxToVwc)
export const dvwc = genCssClamp('dvwc', cssPxToDvwc)
export const lvwc = genCssClamp('lvwc', cssPxToLvwc)
export const svwc = genCssClamp('svwc', cssPxToSvwc)

export const vwe = genCssExtend('vwe', cssPxToVwe)
export const dvwe = genCssExtend('dvwe', cssPxToDvwe)
export const lvwe = genCssExtend('lvwe', cssPxToLvwe)
export const svwe = genCssExtend('svwe', cssPxToSvwe)

export const vh = genCssViewport('vh', cssPxToVh)
export const dvh = genCssViewport('dvh', cssPxToDvh)
export const lvh = genCssViewport('lvh', cssPxToLvh)
export const svh = genCssViewport('svh', cssPxToSvh)

export const vhc = genCssClamp('vhc', cssPxToVhc)
export const dvhc = genCssClamp('dvhc', cssPxToDvhc)
export const lvhc = genCssClamp('lvhc', cssPxToLvhc)
export const svhc = genCssClamp('svhc', cssPxToSvhc)

export const vhe = genCssExtend('vhe', cssPxToVhe)
export const dvhe = genCssExtend('dvhe', cssPxToDvhe)
export const lvhe = genCssExtend('lvhe', cssPxToLvhe)
export const svhe = genCssExtend('svhe', cssPxToSvhe)

export const percent = genCssPercent('percent', cssPercent)
export const em = genCssFont('em', cssEm)
export const lh = genCssFont('lh', cssLh)
