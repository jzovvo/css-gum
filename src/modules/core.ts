import type {DesignDraft, Percent, Pixel} from './types'
import {cssPxToVhe, cssPxToVwe, cssEm, cssLh, cssPercent, cssPxToVh, cssPxToVhc, cssPxToVw, cssPxToVwc} from './utils'
import {checkDesignDraftScalingParams, checkPercentParams, checkViewportParams} from './validate'
import {consoleError} from '../utils/console'

/**
 * Converts pixel values to viewport width (vw) units based on design draft width.
 *
 * @param pixel - The pixel value to convert
 * @param designDraft - The design draft width in pixels
 * @returns CSS vw value as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * vw(20, 1440) // Returns '1.39vw'
 * vw(0, 1440)  // Returns '0'
 * ```
 */
export const vw = (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return cssPxToVw(result.data[1])(result.data[0])
  }

  consoleError(result.error)

  return ''
}

/**
 * Converts pixel values to clamped viewport width units that won't scale beyond the original pixel size.
 *
 * @param pixel - The pixel value to convert
 * @param designDraft - The design draft width in pixels
 * @returns CSS min/max expression as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * vwc(20, 1440)  // Returns 'min(20px, 1.39vw)'
 * vwc(-20, 1440) // Returns 'max(-20px, -1.39vw)'
 * vwc(0, 1440)   // Returns '0'
 * ```
 */
export const vwc = (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return cssPxToVwc(result.data[1])(result.data[0])
  }

  consoleError(result.error)

  return ''
}

/**
 * Converts pixel values to viewport height (vh) units based on design draft height.
 *
 * @param pixel - The pixel value to convert
 * @param designDraft - The design draft height in pixels
 * @returns CSS vh value as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * vh(30, 1080) // Returns '2.78vh'
 * vh(0, 1080)  // Returns '0'
 * ```
 */
export const vh = (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return cssPxToVh(result.data[1])(result.data[0])
  }

  consoleError(result.error)

  return ''
}

/**
 * Converts pixel values to clamped viewport height units that won't scale beyond the original pixel size.
 *
 * @param pixel - The pixel value to convert
 * @param designDraft - The design draft height in pixels
 * @returns CSS min/max expression as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * vhc(30, 1080)  // Returns 'min(30px, 2.78vh)'
 * vhc(-30, 1080) // Returns 'max(-30px, -2.78vh)'
 * vhc(0, 1080)   // Returns '0'
 * ```
 */
export const vhc = (pixel: Pixel, designDraft: DesignDraft) => {
  const result = checkViewportParams(pixel, designDraft)

  if (result.data) {
    return cssPxToVhc(result.data[1])(result.data[0])
  }

  consoleError(result.error)

  return ''
}

/**
 * Calculates percentage value from child and parent values.
 *
 * @param child - The child value (numerator)
 * @param parent - The parent value (denominator)
 * @returns CSS percentage value as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * percent(10, 100) // Returns '10%'
 * percent(25, 200) // Returns '12.5%'
 * ```
 */
export const percent = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)

  if (result.data) {
    return cssPercent(result.data[1])(result.data[0])
  }

  consoleError(result.error)

  return ''
}

/**
 * Converts pixel values to extended viewport width units for screens larger than design draft.
 * Uses calc() to add proportional spacing based on excess viewport width.
 *
 * @param pixel - The pixel value to convert
 * @param designDraft - The design draft width in pixels
 * @param percent - The scaling factor for excess width (default: 0.5)
 * @returns CSS calc expression as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * vwe(20, 1440, 0.5) // Returns 'calc((100vw - 1440px) * 0.5 + 20px)'
 * vwe(20, 1440, 0.3) // Returns 'calc((100vw - 1440px) * 0.3 + 20px)'
 * ```
 */
export const vwe = (pixel: Pixel, designDraft: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraft, percent)

  if (result.data) {
    return cssPxToVwe(result.data[1])(result.data[2])(result.data[0])
  }

  consoleError(result.error)

  return ''
}

/**
 * Converts pixel values to extended viewport height units for screens larger than design draft.
 * Uses calc() to add proportional spacing based on excess viewport height.
 *
 * @param pixel - The pixel value to convert
 * @param designDraft - The design draft height in pixels
 * @param percent - The scaling factor for excess height (default: 0.5)
 * @returns CSS calc expression as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * vhe(30, 1080, 0.5) // Returns 'calc((100vh - 1080px) * 0.5 + 30px)'
 * vhe(30, 1080, 0.3) // Returns 'calc((100vh - 1080px) * 0.3 + 30px)'
 * ```
 */
export const vhe = (pixel: Pixel, designDraft: DesignDraft, percent: Percent = 0.5) => {
  const result = checkDesignDraftScalingParams(pixel, designDraft, percent)

  if (result.data) {
    return cssPxToVhe(result.data[1])(result.data[2])(result.data[0])
  }

  consoleError(result.error)

  return ''
}

/**
 * Converts line size and font size to em units.
 *
 * @param child - The line size value
 * @param parent - The font size value
 * @returns CSS em value as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * em(24, 16) // Returns '1.5em'
 * em(18, 12) // Returns '1.5em'
 * ```
 */
export const em = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)

  if (result.data) {
    return cssEm(result.data[0], result.data[1])
  }

  consoleError(result.error)

  return ''
}

/**
 * Converts line height and font size to unit-less line-height ratio.
 *
 * @param child - The line height value
 * @param parent - The font size value
 * @returns CSS line-height ratio as string, or empty string if validation fails
 *
 * @example
 * ```typescript
 * lh(24, 16) // Returns '1.5'
 * lh(20, 16) // Returns '1.25'
 * ```
 */
export const lh = (child: Percent, parent: Percent) => {
  const result = checkPercentParams(child, parent)

  if (result.data) {
    return cssLh(result.data[0], result.data[1])
  }

  consoleError(result.error)

  return ''
}
