import type {DesignDraft, Percent, Pixel} from './types'
import {cssPxToVhe, cssPxToVwe, cssEm, cssLh, cssPercent, cssPxToVh, cssPxToVhc, cssPxToVw, cssPxToVwc} from './utils'
import {checkDesignDraftScalingParams, checkPercentParams, checkViewportParams} from './validate'


export const vw = (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return cssPxToVw(result.data[1])(result.data[0])
  }

  console.error(new Error('[ vw error ]\n' + result.error))

  return ''
}
export const vwc = (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return cssPxToVwc(result.data[1])(result.data[0])
  }

  console.error(new Error('[ vwc error ]\n' + result.error))

  return ''
}
export const vh = (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return cssPxToVh(result.data[1])(result.data[0])
  }

  console.error(new Error('[ vh error ]\n' + result.error))

  return ''
}
export const vhc = (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return cssPxToVhc(result.data[1])(result.data[0])
  }

  console.error(new Error('[ vhc error ]\n' + result.error))

  return ''
}
export const percent = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)

  if (result.data) {
    return cssPercent(result.data[1])(result.data[0])
  }

  console.error(new Error('[ percent error ]\n' + result.error))

  return ''
}
export const vwe = (pixel: Pixel, designDraft: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraft, percent)

  if (result.data) {
    return cssPxToVwe(result.data[1])(result.data[2])(result.data[0])
  }

  console.error(new Error('[ vwe error ]\n' + result.error))

  return ''
}
export const vhe = (pixel: Pixel, designDraft: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraft, percent)

  if (result.data) {
    return cssPxToVhe(result.data[1])(result.data[2])(result.data[0])
  }

  console.error(new Error('[ vhe error ]\n' + result.error))

  return ''
}
export const em = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)

  if (result.data) {
    return cssEm(result.data[0], result.data[1])
  }

  console.error(new Error('[ em error ]\n' + result.error))

  return ''
}
export const lh = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)

  if (result.data) {
    return cssLh(result.data[0], result.data[1])
  }

  console.error(new Error('[ lh error ]\n' + result.error))

  return ''
}
