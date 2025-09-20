import {designDraftSchema, percentSchema, pixelSchema, spaceFlagSchema} from './types'
import type {z} from 'zod'

const safeStringify = (value: unknown): string => {
  return typeof value === 'symbol' ? value.toString() : String(value)
}

type ValidationConfig<T> = {
  schema: z.ZodSchema<T>
  paramName: string
  expectedType: string
}

const createValidator = <T extends readonly ValidationConfig<unknown>[]>(
  ...configs: T
) => {
  return (...values: unknown[]) => {
    const results = configs.map((config, index) => ({
      result: config.schema.safeParse(values[index]),
      config,
      value: values[index],
    }))

    const allSuccess = results.every(r => r.result.success)

    if (allSuccess) {
      return {
        data: results.map(r => r.result.data) as {
          [K in keyof T]: T[K] extends ValidationConfig<infer U> ? U : never
        },
        error: null,
      }
    }

    const errorMessages = results
      .map(r => `${r.config.paramName} expected ${r.config.expectedType}, received ${safeStringify(r.value)}`)

    return {
      data: null,
      error: [...errorMessages, new Error().stack ?? ''].join('\n'),
    }
  }
}

const createSingleValidator = <T>(config: ValidationConfig<T>) => {
  return (value: unknown) => {
    const result = config.schema.safeParse(value)

    if (result.success) {
      return {
        data: result.data,
        error: null,
      }
    }

    return {
      data: null,
      error: [
        `${config.paramName} expected ${config.expectedType}, received ${safeStringify(value)}`,
        new Error().stack ?? '',
      ].join('\n'),
    }
  }
}

export const checkViewportParams = createValidator(
  {schema: pixelSchema, paramName: 'pixel', expectedType: 'number'},
  {schema: designDraftSchema, paramName: 'designDraft', expectedType: 'number'},
)

export const checkPercentParams = createValidator(
  {schema: percentSchema, paramName: 'child', expectedType: 'number'},
  {schema: percentSchema, paramName: 'parent', expectedType: 'number'},
)

export const checkDesignDraftScalingParams = createValidator(
  {schema: pixelSchema, paramName: 'pixel', expectedType: 'number'},
  {schema: designDraftSchema, paramName: 'designDraft', expectedType: 'number'},
  {schema: percentSchema, paramName: 'percent', expectedType: 'number'},
)

export const checkSpaceFlag = createSingleValidator({
  schema: spaceFlagSchema,
  paramName: 'space',
  expectedType: '1 | 0',
})
