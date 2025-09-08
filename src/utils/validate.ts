import {designDraftSchema, percentSchema, pixelSchema, spaceFlagSchema} from './types'

export const checkViewportParams = (pixel: unknown, designDraft: unknown) => {
  const pixelResult = pixelSchema.safeParse(pixel)
  const designDraftResult = designDraftSchema.safeParse(designDraft)

  if (pixelResult.success && designDraftResult.success) {
    return {
      data: [pixelResult.data, designDraftResult.data],
      error: null,
    }
  }

  const safePixelStr = typeof pixel === 'symbol' ? pixel.toString() : String(pixel)
  const safeDesignDraftStr = typeof designDraft === 'symbol' ? designDraft.toString() : String(designDraft)

  return {
    data: null,
    error: [
      `pixel expected number, received ${safePixelStr}`,
      `designDraft expected number, received ${safeDesignDraftStr}`,
      new Error().stack ?? '',
    ].join('\n'),
  }
}

export const checkPercentParams = (child: unknown, parent: unknown) => {
  const childResult = percentSchema.safeParse(child)
  const parentResult = percentSchema.safeParse(parent)

  if (childResult.success && parentResult.success) {
    return {
      data: [childResult.data, parentResult.data],
      error: null,
    }
  }

  const safeChildStr = typeof child === 'symbol' ? child.toString() : String(child)
  const safeParentStr = typeof parent === 'symbol' ? parent.toString() : String(parent)

  return {
    data: null,
    error: [
      `child expected number, received ${safeChildStr}`,
      `parent expected number, received ${safeParentStr}`,
      new Error().stack ?? '',
    ].join('\n'),
  }
}

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

  const safePixelStr = typeof pixel === 'symbol' ? pixel.toString() : String(pixel)
  const safeDesignDraftStr = typeof designDraft === 'symbol' ? designDraft.toString() : String(designDraft)
  const safePercentStr = typeof percent === 'symbol' ? percent.toString() : String(percent)

  return {
    data: null,
    error: [
      `pixel expected number, received ${safePixelStr}`,
      `designDraft expected number, received ${safeDesignDraftStr}`,
      `percent expected number, received ${safePercentStr}`,
      new Error().stack ?? '',
    ].join('\n'),
  }
}

export const checkSpaceFlag = (space: unknown) => {
  const spaceResult = spaceFlagSchema.safeParse(space)

  if (spaceResult.success) {
    return {
      data: spaceResult.data,
      error: null,
    }
  }

  const safeSpaceStr = typeof space === 'symbol' ? space.toString() : String(space)

  return {
    data: null,
    error: [
      `space expected 1 | 0, received ${safeSpaceStr}`,
      new Error().stack ?? '',
    ].join('\n'),
  }
}
