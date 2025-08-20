import type {DesignDraft, Percent, Pixel} from './types'

/**
 * Calculates percentage from numerator and denominator.
 * Returns a curried function for reusable percentage calculations.
 *
 * @param denominator - The denominator (parent value)
 * @returns A function that takes numerator and returns percentage
 *
 * @example
 * ```typescript
 * const getPercent = percent(100)
 * getPercent(25) // Returns 25
 * ```
 */
export const percent = (denominator: number) => (numerator: number) => numerator / denominator * 100

/**
 * Alias for percent function, specifically for pixel to viewport width conversion.
 * Calculates the viewport width percentage for a given pixel value.
 */
export const pxToVw = percent

/**
 * Alias for percent function, specifically for pixel to viewport height conversion.
 * Calculates the viewport height percentage for a given pixel value.
 */
export const pxToVh = percent

/**
 * Converts pixel values to CSS viewport width (vw) units.
 * Returns a curried function for reusable conversion with a fixed design draft width.
 *
 * @param designDraftWidth - The design draft width in pixels
 * @returns A function that converts pixel values to vw CSS strings
 *
 * @example
 * ```typescript
 * const toVw = cssPxToVw(1440)
 * toVw(20) // Returns '1.39vw'
 * toVw(0)  // Returns '0'
 * ```
 */
export const cssPxToVw = (designDraftWidth: DesignDraft) => (pixel: Pixel) => {
  if (designDraftWidth <= 0) {
    return ''
  }

  if (pixel === 0) {
    return '0'
  }

  return `${pxToVw(designDraftWidth)(pixel)}vw`
}

/**
 * Converts pixel values to CSS viewport height (vh) units.
 * Returns a curried function for reusable conversion with a fixed design draft height.
 *
 * @param designDraftHeight - The design draft height in pixels
 * @returns A function that converts pixel values to vh CSS strings
 *
 * @example
 * ```typescript
 * const toVh = cssPxToVh(1080)
 * toVh(30) // Returns '2.78vh'
 * toVh(0)  // Returns '0'
 * ```
 */
export const cssPxToVh = (designDraftHeight: DesignDraft) => (pixel: Pixel) => {
  if (designDraftHeight <= 0) {
    return ''
  }

  if (pixel === 0) {
    return '0'
  }

  return `${pxToVh(designDraftHeight)(pixel)}vh`
}

/**
 * Converts pixel values to clamped viewport width units using CSS min/max functions.
 * Prevents scaling beyond the original pixel size, useful for responsive elements that shouldn't grow too large.
 *
 * @param designDraftWidth - The design draft width in pixels
 * @returns A function that converts pixel values to clamped vw CSS expressions
 *
 * @example
 * ```typescript
 * const toVwc = cssPxToVwc(1440)
 * toVwc(20)  // Returns 'min(20px, 1.39vw)'
 * toVwc(-20) // Returns 'max(-20px, -1.39vw)'
 * toVwc(0)   // Returns '0'
 * ```
 */
export const cssPxToVwc = (designDraftWidth: DesignDraft) => (pixel: Pixel) => {
  if (designDraftWidth <= 0) {
    return ''
  }

  if (pixel === 0) {
    return '0'
  }

  return pixel > 0 ? `min(${pixel}px, ${cssPxToVw(designDraftWidth)(pixel)})` : `max(${pixel}px, ${cssPxToVw(designDraftWidth)(pixel)})`
}

/**
 * Converts pixel values to clamped viewport height units using CSS min/max functions.
 * Prevents scaling beyond the original pixel size, useful for responsive elements that shouldn't grow too large.
 *
 * @param designDraftHeight - The design draft height in pixels
 * @returns A function that converts pixel values to clamped vh CSS expressions
 *
 * @example
 * ```typescript
 * const toVhc = cssPxToVhc(1080)
 * toVhc(30)  // Returns 'min(30px, 2.78vh)'
 * toVhc(-30) // Returns 'max(-30px, -2.78vh)'
 * toVhc(0)   // Returns '0'
 * ```
 */
export const cssPxToVhc = (designDraftHeight: DesignDraft) => (pixel: Pixel) => {
  if (designDraftHeight <= 0) {
    return ''
  }

  if (pixel === 0) {
    return '0'
  }

  return pixel > 0 ? `min(${pixel}px, ${cssPxToVh(designDraftHeight)(pixel)})` : `max(${pixel}px, ${cssPxToVh(designDraftHeight)(pixel)})`
}

/**
 * Converts pixel values to extended viewport width units for screens larger than design draft.
 * Uses CSS calc() to add proportional spacing based on excess viewport width.
 *
 * @param designDraftWidth - The design draft width in pixels
 * @returns A curried function that takes percent scaling and pixel value
 *
 * @example
 * ```typescript
 * const toVwe = cssPxToVwe(1440)
 * const withHalfScaling = toVwe(0.5)
 * withHalfScaling(20) // Returns 'calc((100vw - 1440px) * 0.5 + 20px)'
 * ```
 */
export const cssPxToVwe = (designDraftWidth: DesignDraft) => (percent: Percent) => (pixel: Pixel) => {
  if (designDraftWidth <= 0) {
    return ''
  }

  if (percent === 0) {
    return pixel === 0 ? '0' : `${pixel}px`
  }

  const ratioString = `(100vw - ${designDraftWidth}px) * ${percent}`
  const pixelString = pixel === 0 ? '' : pixel > 0 ? ` + ${pixel}px` : ` - ${pixel * -1}px`

  return `calc(${ratioString}${pixelString})`
}

/**
 * Converts pixel values to extended viewport height units for screens larger than design draft.
 * Uses CSS calc() to add proportional spacing based on excess viewport height.
 *
 * @param designDraftHeight - The design draft height in pixels
 * @returns A curried function that takes percent scaling and pixel value
 *
 * @example
 * ```typescript
 * const toVhe = cssPxToVhe(1080)
 * const withHalfScaling = toVhe(0.5)
 * withHalfScaling(30) // Returns 'calc((100vh - 1080px) * 0.5 + 30px)'
 * ```
 */
export const cssPxToVhe = (designDraftHeight: DesignDraft) => (percent: Percent) => (pixel: Pixel) => {
  if (designDraftHeight <= 0) {
    return ''
  }

  if (percent === 0) {
    return pixel === 0 ? '0' : `${pixel}px`
  }

  const ratioString = `(100vh - ${designDraftHeight}px) * ${percent}`
  const pixelString = pixel === 0 ? '' : pixel > 0 ? ` + ${pixel}px` : ` - ${pixel * -1}px`

  return `calc(${ratioString}${pixelString})`
}

/**
 * Converts child and parent values to CSS percentage string.
 * Returns a curried function for reusable percentage calculations.
 *
 * @param parent - The parent value (denominator)
 * @returns A function that takes child value and returns CSS percentage string
 *
 * @example
 * ```typescript
 * const getPercentOfWidth = cssPercent(100)
 * getPercentOfWidth(25) // Returns '25%'
 * getPercentOfWidth(0)  // Returns '0' (zero values return '0' not '0%')
 * ```
 */
export const cssPercent = (parent: number) => (child: number) => {
  if (child === 0) {
    return '0'
  }

  if (parent === 0) {
    return 'Infinity%'
  }

  return `${percent(parent)(child)}%`
}

/**
 * Converts line size and font size to CSS em units.
 *
 * @param ls - The line size value
 * @param fontSize - The font size value
 * @returns CSS em value as string
 *
 * @example
 * ```typescript
 * cssEm(24, 16) // Returns '1.5em'
 * cssEm(18, 12) // Returns '1.5em'
 * ```
 */
export const cssEm = (ls: number, fontSize: number) => {
  if (ls === 0) {
    return '0'
  }

  if (fontSize === 0) {
    return 'infinity'
  }

  return `${ls / fontSize}em`
}

/**
 * Converts line height and font size to CSS line-height ratio (unit-less).
 *
 * @param lh - The line height value
 * @param fontSize - The font size value
 * @returns CSS line-height ratio as string (unit-less)
 *
 * @example
 * ```typescript
 * cssLh(24, 16) // Returns '1.5'
 * cssLh(20, 16) // Returns '1.25'
 * ```
 */
export const cssLh = (lh: number, fontSize: number) => {
  if (lh === 0) {
    return '0'
  }

  if (fontSize === 0) {
    return 'infinity'
  }

  return `${lh / fontSize}`
}
