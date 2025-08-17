import type {DesignDraft, Percent, Pixel} from './types'
import {cssDesignDraftVhScaling, cssDesignDraftVwScaling, cssEm, cssLh, cssPercent, cssPxToVh, cssPxToVhClamp, cssPxToVw, cssPxToVwClamp} from './utils'
import {checkDesignDraftScalingParams, checkPercentParams, checkViewportParams} from './validate'


export const vw = (pixelData: Pixel, designDraftData: DesignDraft) => {
  const result = checkViewportParams(pixelData, designDraftData)
  if (result.data) {
    return cssPxToVw(result.data[1])(result.data[0])
  }
  console.error(new Error('[ vw error ]\n' + result.error))
  return ''
}

export const lvw = (pixel: Pixel, designDraftData: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraftData)
  if (result.data) {
    return cssPxToVwClamp(result.data[1])(result.data[0])
  }
  console.error(new Error('[ lvw error ]\n' + result.error))
  return ''
}

export const vh = (pixel: Pixel, designDraftData: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraftData)
  if (result.data) {
    return cssPxToVh(result.data[1])(result.data[0])
  }
  console.error(new Error('[ vh error ]\n' + result.error))
  return ''
}

export const lvh = (pixel: Pixel, designDraftData: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraftData)
  if (result.data) {
    return cssPxToVhClamp(result.data[1])(result.data[0])
  }
  console.error(new Error('[ lvh error ]\n' + result.error))
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

export const ddws = (pixel: Pixel, designDraftData: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraftData, percent)
  if (result.data) {
    return cssDesignDraftVwScaling(result.data[1])(result.data[2])(result.data[0])
  }
  console.error(new Error('[ ddws error ]\n' + result.error))
  return ''
}

export const ddhs = (pixel: Pixel, designDraftData: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraftData, percent)
  if (result.data) {
    return cssDesignDraftVhScaling(result.data[1])(result.data[2])(result.data[0])
  }
  console.error(new Error('[ ddhs error ]\n' + result.error))
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
