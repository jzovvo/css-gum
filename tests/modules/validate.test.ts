import {describe, it, expect} from 'vitest'
import {
  checkViewportParams,
  checkPercentParams,
  checkDesignDraftScalingParams,
} from '../../src/modules/validate'

describe('validate module', () => {
  describe('checkViewportParams', () => {
    it('should validate correct number inputs', () => {
      const result = checkViewportParams(100, 1000)

      expect(result.data).toEqual([100, 1000])
      expect(result.error).toBeNull()
    })

    it('should coerce string numbers to numbers', () => {
      const result = checkViewportParams('100', '1000')

      expect(result.data).toEqual([100, 1000])
      expect(result.error).toBeNull()
    })

    it('should handle mixed types', () => {
      const result = checkViewportParams(100, '1000')

      expect(result.data).toEqual([100, 1000])
      expect(result.error).toBeNull()
    })

    it('should handle zero values', () => {
      const result = checkViewportParams(0, 100)

      expect(result.data).toEqual([0, 100])
      expect(result.error).toBeNull()
    })

    it('should handle negative values', () => {
      const result = checkViewportParams(-100, 1000)

      expect(result.data).toEqual([-100, 1000])
      expect(result.error).toBeNull()
    })

    it('should reject invalid pixel input', () => {
      const result = checkViewportParams('invalid', 1000)

      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received invalid')
    })

    it('should reject invalid design draft input', () => {
      const result = checkViewportParams(100, 'invalid')

      expect(result.data).toBeNull()
      expect(result.error).toContain('designDraft expected number, received invalid')
    })

    it('should reject both invalid inputs', () => {
      const result = checkViewportParams('invalid1', 'invalid2')

      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received invalid1')
      expect(result.error).toContain('designDraft expected number, received invalid2')
    })

    it('should handle null and undefined inputs', () => {
      const result1 = checkViewportParams(null, 1000)
      const result2 = checkViewportParams(100, undefined)

      expect(result1.data).toEqual([0, 1000]) // null coerces to 0
      expect(result2.data).toBeNull() // undefined fails validation
      expect(result2.error).toContain('designDraft expected number, received undefined')
    })

    it('should handle symbol inputs safely', () => {
      const sym = Symbol('test')
      const result = checkViewportParams(sym, 1000)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(test)')
    })

    it('should include stack trace in error', () => {
      const result = checkViewportParams('invalid', 1000)

      expect(result.error).toContain('\n') // Stack trace adds newlines
    })
  })

  describe('checkPercentParams', () => {
    it('should validate correct number inputs', () => {
      const result = checkPercentParams(25, 100)

      expect(result.data).toEqual([25, 100])
      expect(result.error).toBeNull()
    })

    it('should handle zero values', () => {
      const result = checkPercentParams(0, 100)

      expect(result.data).toEqual([0, 100])
      expect(result.error).toBeNull()
    })

    it('should handle negative values', () => {
      const result = checkPercentParams(-25, 100)

      expect(result.data).toEqual([-25, 100])
      expect(result.error).toBeNull()
    })

    it('should coerce string numbers', () => {
      const result = checkPercentParams('25', '100')

      expect(result.data).toEqual([25, 100])
      expect(result.error).toBeNull()
    })

    it('should reject invalid child input', () => {
      const result = checkPercentParams('invalid', 100)

      expect(result.data).toBeNull()
      expect(result.error).toContain('child expected number, received invalid')
    })

    it('should reject invalid parent input', () => {
      const result = checkPercentParams(25, 'invalid')

      expect(result.data).toBeNull()
      expect(result.error).toContain('parent expected number, received invalid')
    })

    it('should handle symbol inputs safely', () => {
      const sym = Symbol('test')
      const result = checkPercentParams(25, sym)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(test)')
    })
  })

  describe('checkDesignDraftScalingParams', () => {
    it('should validate correct three-parameter inputs', () => {
      const result = checkDesignDraftScalingParams(100, 1000, 0.5)

      expect(result.data).toEqual([100, 1000, 0.5])
      expect(result.error).toBeNull()
    })

    it('should coerce string numbers', () => {
      const result = checkDesignDraftScalingParams('100', '1000', '0.5')

      expect(result.data).toEqual([100, 1000, 0.5])
      expect(result.error).toBeNull()
    })

    it('should handle zero values', () => {
      const result = checkDesignDraftScalingParams(0, 1000, 0)

      expect(result.data).toEqual([0, 1000, 0])
      expect(result.error).toBeNull()
    })

    it('should handle negative values', () => {
      const result = checkDesignDraftScalingParams(-100, 1000, -0.5)

      expect(result.data).toEqual([-100, 1000, -0.5])
      expect(result.error).toBeNull()
    })

    it('should reject invalid pixel input', () => {
      const result = checkDesignDraftScalingParams('invalid', 1000, 0.5)

      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received invalid')
    })

    it('should reject invalid design draft input', () => {
      const result = checkDesignDraftScalingParams(100, 'invalid', 0.5)

      expect(result.data).toBeNull()
      expect(result.error).toContain('designDraft expected number, received invalid')
    })

    it('should reject invalid percent input', () => {
      const result = checkDesignDraftScalingParams(100, 1000, 'invalid')

      expect(result.data).toBeNull()
      expect(result.error).toContain('percent expected number, received invalid')
    })

    it('should reject multiple invalid inputs', () => {
      const result = checkDesignDraftScalingParams('invalid1', 'invalid2', 'invalid3')

      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received invalid1')
      expect(result.error).toContain('designDraft expected number, received invalid2')
      expect(result.error).toContain('percent expected number, received invalid3')
    })

    it('should handle edge case numeric values', () => {
      // Test with very small numbers
      const result1 = checkDesignDraftScalingParams(0.1, 0.1, 0.1)
      expect(result1.data).toEqual([0.1, 0.1, 0.1])

      // Test with very large numbers
      const result2 = checkDesignDraftScalingParams(10000, 10000, 100)
      expect(result2.data).toEqual([10000, 10000, 100])
    })

    it('should include stack trace in error', () => {
      const result = checkDesignDraftScalingParams('invalid', 1000, 0.5)

      expect(result.error).toContain('\n') // Stack trace adds newlines
    })
  })

  describe('edge cases and type safety', () => {
    const testCases = [
      {input: [], expected: 'coerces to 0'},
      {input: {}, expected: '[object Object]'},
      {input: true, expected: '1'},
      {input: false, expected: '0'},
    ]

    testCases.forEach(({input, expected}) => {
      it(`should handle ${typeof input} input: ${JSON.stringify(input)}`, () => {
        const result = checkViewportParams(input, 1000)

        if (typeof input === 'boolean') {
          // Booleans coerce to numbers (true -> 1, false -> 0)
          expect(result.data).toEqual([input ? 1 : 0, 1000])
        } else if (Array.isArray(input) && input.length === 0) {
          // Empty arrays coerce to 0
          expect(result.data).toEqual([0, 1000])
        } else {
          expect(result.data).toBeNull()
          expect(result.error).toContain(`pixel expected number, received ${expected}`)
        }
      })
    })

    it('should handle Infinity and NaN', () => {
      // Infinity and NaN are not finite numbers, so Zod rejects them
      const result1 = checkViewportParams(Infinity, 1000)
      expect(result1.data).toBeNull()
      expect(result1.error).toContain('pixel expected number')

      const result2 = checkViewportParams(NaN, 1000)
      expect(result2.data).toBeNull()
      expect(result2.error).toContain('pixel expected number')
    })
  })
})