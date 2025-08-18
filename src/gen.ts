import {vw, vwc, vwe, vh, vhc, vhe, em, lh, percent} from './core'
import type {Pixel} from './types'


interface PropsDraftFuncs {
  points?: number[]
  firstIndex?: number
}

interface PropsNameCustomWidth {
  nameVw?: string
  nameVwc?: string
  nameVwe?: string
}

interface PropsNameCustomHeight {
  nameVh?: string
  nameVhc?: string
  nameVhe?: string
}

interface PropsNameCustomOther {
  nameEm?: string
  nameLh?: string
  namePercent?: string
}

/**
 * Generates width conversion functions for multiple design draft breakpoints.
 * Creates vw, vwc, and vwe functions for each breakpoint with indexed names.
 * Automatically filters out invalid design draft widths (≤ 0).
 *
 * @param params - Configuration object
 * @param params.points - Array of design draft widths in pixels (invalid values ≤ 0 are automatically filtered out)
 * @param params.firstIndex - Starting index for generated function names (default: 1)
 * @param params.nameVw - Prefix for vw functions (default: 'vw')
 * @param params.nameVwc - Prefix for vwc functions (default: 'vwc')
 * @param params.nameVwe - Prefix for vwe functions (default: 'vwe')
 * @returns Object with generated functions
 *
 * @example
 * ```typescript
 * const funcs = genDraftWidthFuncs({
 *   points: [375, 768, 1440],
 *   firstIndex: 1
 * })
 *
 * funcs.vw1(20)   // 20px on 375px design
 * funcs.vwc2(20)  // Clamped 20px on 768px design
 * funcs.vwe3(20)  // Extended 20px on 1440px design
 *
 * // Invalid points are automatically filtered out
 * const filteredFuncs = genDraftWidthFuncs({
 *   points: [0, -100, 375, 768, -50] // Only 375 and 768 are valid
 * })
 * // Only generates: vw1, vw2, vwc1, vwc2, vwe1, vwe2
 * ```
 */
export const genDraftWidthFuncs = ({
  points = [],
  firstIndex = 1,
  nameVw = 'vw',
  nameVwc = 'vwc',
  nameVwe = 'vwe',
}: PropsDraftFuncs & PropsNameCustomWidth) => {
  const validPoints = points.filter(point => point > 0)

  validPoints.sort((a, b) => a - b)

  const temp: Record<string, (pixel: Pixel) => string> = {}

  for (let i = 0; i < validPoints.length; i++) {
    const idx = i + firstIndex
    const point = validPoints[i]

    nameVw !== '' && (temp[nameVw + idx] = (pixel: Pixel) => vw(pixel, point))
    nameVwc !== '' && (temp[nameVwc + idx] = (pixel: Pixel) => vwc(pixel, point))
    nameVwe !== '' && (temp[nameVwe + idx] = (pixel: Pixel) => vwe(pixel, point))
  }

  return temp
}

/**
 * Generates height conversion functions for multiple design draft breakpoints.
 * Creates vh, vhc, and vhe functions for each breakpoint with indexed names.
 * Automatically filters out invalid design draft heights (≤ 0).
 *
 * @param params - Configuration object
 * @param params.points - Array of design draft heights in pixels (invalid values ≤ 0 are automatically filtered out)
 * @param params.firstIndex - Starting index for generated function names (default: 1)
 * @param params.nameVh - Prefix for vh functions (default: 'vh')
 * @param params.nameVhc - Prefix for vhc functions (default: 'vhc')
 * @param params.nameVhe - Prefix for vhe functions (default: 'vhe')
 * @returns Object with generated functions
 *
 * @example
 * ```typescript
 * const funcs = genDraftHeightFuncs({
 *   points: [667, 1080, 1440],
 *   firstIndex: 1
 * })
 *
 * funcs.vh1(30)   // 30px on 667px design
 * funcs.vhc2(30)  // Clamped 30px on 1080px design
 * funcs.vhe3(30)  // Extended 30px on 1440px design
 *
 * // Invalid points are automatically filtered out
 * const filteredFuncs = genDraftHeightFuncs({
 *   points: [0, -200, 667, 1080, -100] // Only 667 and 1080 are valid
 * })
 * // Only generates: vh1, vh2, vhc1, vhc2, vhe1, vhe2
 * ```
 */
export const genDraftHeightFuncs = ({
  points = [],
  firstIndex = 1,
  nameVh = 'vh',
  nameVhc = 'vhc',
  nameVhe = 'vhe',
}: PropsDraftFuncs & PropsNameCustomHeight) => {
  const validPoints = points.filter(point => point > 0)

  validPoints.sort((a, b) => a - b)

  const temp: Record<string, (pixel: Pixel) => string> = {}

  for (let i = 0; i < validPoints.length; i++) {
    const idx = i + firstIndex
    const point = validPoints[i]

    nameVh !== '' && (temp[nameVh + idx] = (pixel: Pixel) => vh(pixel, point))
    nameVhc !== '' && (temp[nameVhc + idx] = (pixel: Pixel) => vhc(pixel, point))
    nameVhe !== '' && (temp[nameVhe + idx] = (pixel: Pixel) => vhe(pixel, point))
  }

  return temp
}

/**
 * Generates core conversion functions with custom names.
 * Returns all core functions (vw, vh, vwc, vhc, vwe, vhe, em, lh, percent) with customizable names.
 *
 * @param params - Configuration object with optional custom function names
 * @param params.nameVw - Custom name for vw function (default: 'vw')
 * @param params.nameVh - Custom name for vh function (default: 'vh')
 * @param params.nameVwc - Custom name for vwc function (default: 'vwc')
 * @param params.nameVhc - Custom name for vhc function (default: 'vhc')
 * @param params.nameVwe - Custom name for vwe function (default: 'vwe')
 * @param params.nameVhe - Custom name for vhe function (default: 'vhe')
 * @param params.nameEm - Custom name for em function (default: 'em')
 * @param params.nameLh - Custom name for lh function (default: 'lh')
 * @param params.namePercent - Custom name for percent function (default: 'percent')
 * @returns Object with all core functions using specified names
 *
 * @example
 * ```typescript
 * const funcs = genCoreFuncs({
 *   nameVw: 'toVw',
 *   namePercent: 'toPercent'
 * })
 *
 * funcs.toVw(20, 1440)      // Same as Core.vw
 * funcs.toPercent(10, 100)  // Same as Core.percent
 * funcs.vh(30, 1080)        // Uses default name
 * ```
 */
export const genCoreFuncs = ({
  nameEm = 'em',
  nameLh = 'lh',
  nameVh = 'vh',
  nameVhc = 'vhc',
  nameVhe = 'vhe',
  nameVw = 'vw',
  nameVwc = 'vwc',
  nameVwe = 'vwe',
  namePercent = 'percent',
}: PropsNameCustomWidth & PropsNameCustomHeight & PropsNameCustomOther = {}) => {
  const temp = {
    [nameEm]: em,
    [nameLh]: lh,
    [nameVh]: vh,
    [nameVhc]: vhc,
    [nameVhe]: vhe,
    [nameVw]: vw,
    [nameVwc]: vwc,
    [nameVwe]: vwe,
    [namePercent]: percent,
  }

  delete temp['']

  return temp
}
