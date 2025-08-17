import {designDraftSchema, percentSchema, pixelSchema} from './types'


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
    error:
      `pixel expected number, received ${pixel}\n` +
      `designDraft expected number, received ${designDraft}`,
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

  return {
    data: null,
    error:
      `child expected number, received ${child}\n` +
      `parent expected number, received ${parent}`,
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

  return {
    data: null,
    error:
      `pixel expected number, received ${pixel}\n` +
      `designDraft expected number, received ${designDraft}\n` +
      `percent expected number, received ${percent}`,
  }
}
