import {designDraftSchema, percentSchema, pixelSchema} from './types'

/**
 * Validates viewport conversion parameters (pixel and design draft values).
 * Uses Zod schemas to ensure inputs are valid numbers with proper constraints.
 *
 * @param pixel - The pixel value to validate (any type, will be coerced to number)
 * @param designDraft - The design draft value to validate (any type, will be coerced to positive number)
 * @returns Validation result with either validated data or error message
 *
 * @example
 * ```typescript
 * const result = checkViewportParams(20, 1440)
 * if (result.data) {
 *   const [validPixel, validDesignDraft] = result.data
 * } else {
 *   console.error(result.error)
 * }
 * ```
 */
export const checkViewportParams = (pixel: unknown, designDraft: unknown) => {
  const pixelResult = pixelSchema.safeParse(pixel)
  const designDraftResult = designDraftSchema.safeParse(designDraft)

  if (pixelResult.success && designDraftResult.success) {
    return {
      data: [pixelResult.data, designDraftResult.data],
      error: null,
    }
  }

  return {
    data: null,
    error: [
      `pixel expected number, received ${pixel}`,
      `designDraft expected number, received ${designDraft}`,
      new Error().stack ?? '',
    ].join('\n'),
  }
}

/**
 * Validates percentage calculation parameters (child and parent values).
 * Uses Zod schemas to ensure inputs are valid finite numbers.
 *
 * @param child - The child value to validate (numerator)
 * @param parent - The parent value to validate (denominator)
 * @returns Validation result with either validated data or error message
 *
 * @example
 * ```typescript
 * const result = checkPercentParams(25, 100)
 * if (result.data) {
 *   const [validChild, validParent] = result.data
 *   // Calculate: validChild / validParent * 100 = 25%
 * }
 * ```
 */
export const checkPercentParams = (child: unknown, parent: unknown) => {
  const childResult = percentSchema.safeParse(child)
  const parentResult = percentSchema.safeParse(parent)

  if (childResult.success && parentResult.success) {
    return {
      data: [childResult.data, parentResult.data],
      error: null,
    }
  }

  return {
    data: null,
    error: [
      `child expected number, received ${child}`,
      `parent expected number, received ${parent}`,
      new Error().stack ?? '',
    ].join('\n'),
  }
}

/**
 * Validates parameters for design draft scaling functions (vwe/vhe).
 * Ensures pixel, design draft, and scaling percentage are all valid numbers.
 *
 * @param pixel - The pixel value to validate
 * @param designDraft - The design draft value to validate (must be positive)
 * @param percent - The scaling percentage to validate (typically 0-1)
 * @returns Validation result with either validated data array or error message
 *
 * @example
 * ```typescript
 * const result = checkDesignDraftScalingParams(20, 1440, 0.5)
 * if (result.data) {
 *   const [validPixel, validDesignDraft, validPercent] = result.data
 *   // Use for calc((100vw - validDesignDraft px) * validPercent + validPixel px)
 * }
 * ```
 */
export const checkDesignDraftScalingParams = (pixel: unknown, designDraft: unknown, percent: unknown) => {
  const pixelResult = pixelSchema.safeParse(pixel)
  const designDraftResult = designDraftSchema.safeParse(designDraft)
  const percentResult = percentSchema.safeParse(percent)

  if (pixelResult.success && designDraftResult.success && percentResult.success) {
    return {
      data: [pixelResult.data, designDraftResult.data, percentResult.data],
      error: null,
    }
  }

  return {
    data: null,
    error: [
      `pixel expected number, received ${pixel}`,
      `designDraft expected number, received ${designDraft}`,
      `percent expected number, received ${percent}`,
      new Error().stack ?? '',
    ].join('\n'),
  }
}
