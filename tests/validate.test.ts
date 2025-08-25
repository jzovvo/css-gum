import {describe, it, expect} from 'vitest'
import {checkViewportParams, checkPercentParams, checkDesignDraftScalingParams} from '../src/modules/validate'

describe('Validation Module', () => {
  describe('checkViewportParams', () => {
    it('should validate correct parameters', () => {
      const result = checkViewportParams(10, 1000)

      expect(result.data).toEqual([10, 1000])
      expect(result.error).toBeNull()
    })

    it('should handle zero pixel value', () => {
      const result = checkViewportParams(0, 1000)

      expect(result.data).toEqual([0, 1000])
      expect(result.error).toBeNull()
    })

    it('should accept zero design draft (business validation happens elsewhere)', () => {
      const result = checkViewportParams(10, 0)

      expect(result.data).toEqual([10, 0])
      expect(result.error).toBeNull()
    })

    it('should accept negative design draft (business validation happens elsewhere)', () => {
      const result = checkViewportParams(10, -100)

      expect(result.data).toEqual([10, -100])
      expect(result.error).toBeNull()
    })

    it('should coerce string numbers', () => {
      const result = checkViewportParams('10' as any, '1000' as any)

      expect(result.data).toEqual([10, 1000])
      expect(result.error).toBeNull()
    })

    it('should reject invalid pixel parameter', () => {
      const result = checkViewportParams('invalid' as any, 1000)

      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel')
    })

    it('should reject invalid design draft parameter', () => {
      const result = checkViewportParams(10, 'invalid' as any)

      expect(result.data).toBeNull()
      expect(result.error).toContain('designDraft')
    })
  })

  describe('checkPercentParams', () => {
    it('should validate correct parameters', () => {
      const result = checkPercentParams(10, 100)

      expect(result.data).toEqual([10, 100])
      expect(result.error).toBeNull()
    })

    it('should handle zero values', () => {
      const result = checkPercentParams(0, 100)

      expect(result.data).toEqual([0, 100])
      expect(result.error).toBeNull()
    })

    it('should handle negative values', () => {
      const result = checkPercentParams(-10, 100)

      expect(result.data).toEqual([-10, 100])
      expect(result.error).toBeNull()
    })

    it('should coerce string numbers', () => {
      const result = checkPercentParams('10' as any, '100' as any)

      expect(result.data).toEqual([10, 100])
      expect(result.error).toBeNull()
    })

    it('should reject invalid child parameter', () => {
      const result = checkPercentParams('invalid' as any, 100)

      expect(result.data).toBeNull()
      expect(result.error).toContain('child')
    })

    it('should reject invalid parent parameter', () => {
      const result = checkPercentParams(10, 'invalid' as any)

      expect(result.data).toBeNull()
      expect(result.error).toContain('parent')
    })
  })

  describe('checkDesignDraftScalingParams', () => {
    it('should validate correct parameters', () => {
      const result = checkDesignDraftScalingParams(10, 1000, 0.5)

      expect(result.data).toEqual([10, 1000, 0.5])
      expect(result.error).toBeNull()
    })

    it('should handle zero pixel value', () => {
      const result = checkDesignDraftScalingParams(0, 1000, 0.5)

      expect(result.data).toEqual([0, 1000, 0.5])
      expect(result.error).toBeNull()
    })

    it('should accept zero design draft (business validation happens elsewhere)', () => {
      const result = checkDesignDraftScalingParams(10, 0, 0.5)

      expect(result.data).toEqual([10, 0, 0.5])
      expect(result.error).toBeNull()
    })

    it('should reject invalid percent parameter', () => {
      const result = checkDesignDraftScalingParams(10, 1000, 'invalid' as any)

      expect(result.data).toBeNull()
      expect(result.error).toContain('percent')
    })

    it('should coerce string numbers', () => {
      const result = checkDesignDraftScalingParams('10' as any, '1000' as any, '0.5' as any)

      expect(result.data).toEqual([10, 1000, 0.5])
      expect(result.error).toBeNull()
    })

    it('should handle edge case percentages', () => {
      const result1 = checkDesignDraftScalingParams(10, 1000, 0)
      const result2 = checkDesignDraftScalingParams(10, 1000, 1)

      expect(result1.data).toEqual([10, 1000, 0])
      expect(result2.data).toEqual([10, 1000, 1])
    })
  })
})