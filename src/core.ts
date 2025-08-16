import type { DesignDraft, Percent, Pixel } from "./types"
import { cssDesignDraftVhScaling, cssDesignDraftVwScaling, cssEm, cssLh, cssPercent, cssPxToVh, cssPxToVhClamp, cssPxToVw, cssPxToVwClamp } from "./utils"
import { checkDesignDraftScalingParams, checkPercentParams, checkViewportParams, } from './validate'


export const vw = (pixelData: Pixel, designDraftData: DesignDraft) => {
  const result = checkViewportParams(pixelData, designDraftData)
  return result ? cssPxToVw(result[1])(result[0]) : ''
}

export const lvw = (pixel: Pixel, designDraftData: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraftData)
  return result ? cssPxToVwClamp(result[1])(result[0]) : ''
}

export const vh = (pixel: Pixel, designDraftData: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraftData)
  return result ? cssPxToVh(result[1])(result[0]) : ''
}

export const lvh = (pixel: Pixel, designDraftData: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraftData)
  return result ? cssPxToVhClamp(result[1])(result[0]) : ''
}

export const percent = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)
  return result ? cssPercent(result[1])(result[0]) : ''
}

export const ddws = (pixel: Pixel, designDraftData: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraftData, percent)
  return result ? cssDesignDraftVwScaling(result[1])(result[2])(result[0]) : ''
}

export const ddhs = (pixel: Pixel, designDraftData: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraftData, percent)
  return result ? cssDesignDraftVhScaling(result[1])(result[2])(result[0]) : ''
}

export const em = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)
  return result ? cssEm(result[0], result[1]) : ''
}

export const lh = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)
  return result ? cssLh(result[0], result[1]) : ''
}
