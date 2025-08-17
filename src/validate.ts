import {designDraftSchema, percentSchema, pixelSchema} from './types'


export const checkViewportParams = (pixel: unknown, designDraftData: unknown) => {
  const pixelDataResult = pixelSchema.safeParse(pixel)
  const designDraftDataResult = designDraftSchema.safeParse(designDraftData)

  if (pixelDataResult.success && designDraftDataResult.success) {
    return {
      data: [pixelDataResult.data, designDraftDataResult.data],
      error: null,
    }
  }

  return {
    data: null,
    error:
      `pixel expected number, received ${pixel}\n` +
      `designDraftData expected number, received ${designDraftData}`,
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
export const checkDesignDraftScalingParams = (pixel: unknown, designDraftData: unknown, percent: unknown) => {
  const pixelDataResult = pixelSchema.safeParse(pixel)
  const designDraftDataResult = designDraftSchema.safeParse(designDraftData)
  const percentResult = percentSchema.safeParse(percent)

  if (pixelDataResult.success && designDraftDataResult.success && percentResult.success) {
    return {
      data: [pixelDataResult.data, designDraftDataResult.data, percentResult.data],
      error: null,
    }
  }

  return {
    data: null,
    error:
      `pixel expected number, received ${pixel}\n` +
      `designDraftData expected number, received ${designDraftData}\n` +
      `percent expected number, received ${percent}`,
  }
}
