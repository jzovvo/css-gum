import { z } from 'zod'

export const pixelSchema = z.coerce.number()
export const designDraftSchema = z.coerce.number()
export const percentSchema = z.coerce.number()

export type Pixel = z.infer<typeof pixelSchema>
export type DesignDraft = z.infer<typeof designDraftSchema>
export type Percent = z.infer<typeof percentSchema>
