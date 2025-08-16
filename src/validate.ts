import { designDraftSchema, percentSchema, pixelSchema, type DesignDraft, type Percent, type Pixel } from "./types"
import { fromError } from 'zod-validation-error'


export const checkViewportParams = (pixel: unknown, designDraftData: unknown): [Pixel, DesignDraft] | null => {
  const pixelDataResult = pixelSchema.safeParse(pixel)

  if (!pixelDataResult.success) {
    console.error(new Error(`pixel 接收到 ${pixel} designDraftData 接收到 ${designDraftData},` + fromError(pixelDataResult.error).toString()))
    return null
  }

  const designDraftDataResult = designDraftSchema.safeParse(designDraftData)
  if (!designDraftDataResult.success) {
    console.error(new Error(`pixel 接收到 ${pixel} designDraftData 接收到 ${designDraftData},` + fromError(designDraftDataResult.error).toString()))
    return null
  }

  return [pixelDataResult.data, designDraftDataResult.data]
}

export const checkPercentParams = (child: unknown, parent: unknown): [Percent, Percent] | null => {
  const childResult = percentSchema.safeParse(child)
  if (!childResult.success) {
    console.error(new Error(fromError(childResult.error).toString()))
    return null
  }

  const parentResult = percentSchema.safeParse(parent)
  if (!parentResult.success) {
    console.error(new Error(fromError(parentResult.error).toString()))
    return null
  }

  return [childResult.data, parentResult.data]
}

export const checkDesignDraftScalingParams = (pixel: unknown, designDraftData: unknown, percent: unknown): [Pixel, DesignDraft, Percent] | null => {
  const pixelDataResult = pixelSchema.safeParse(pixel)
  if (!pixelDataResult.success) {
    console.error(new Error(fromError(pixelDataResult.error).toString()))
    return null
  }

  const designDraftDataResult = designDraftSchema.safeParse(designDraftData)
  if (!designDraftDataResult.success) {
    console.error(new Error(fromError(designDraftDataResult.error).toString()))
    return null
  }

  const percentResult = percentSchema.safeParse(percent)
  if (!percentResult.success) {
    console.error(new Error(fromError(percentResult.error).toString()))
    return null
  }

  return [pixelDataResult.data, designDraftDataResult.data, percentResult.data]
}
