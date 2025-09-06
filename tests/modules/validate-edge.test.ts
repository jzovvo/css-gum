import {describe, it, expect} from 'vitest'
import {
  checkViewportParams,
  checkPercentParams,
  checkDesignDraftScalingParams,
} from '../../src/modules/validate'

describe('validate module - edge case branch coverage', () => {
  describe('checkViewportParams symbol handling', () => {
    it('should handle symbol pixel input with correct string representation', () => {
      const result = checkViewportParams(Symbol('test'), 1000)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(test)')
      expect(result.error).toContain('pixel expected number, received Symbol(test)')
      expect(result.error).toContain('designDraft expected number, received 1000')
    })

    it('should handle symbol designDraft input with correct string representation', () => {
      const result = checkViewportParams(100, Symbol('test'))

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(test)')
      expect(result.error).toContain('pixel expected number, received 100')
      expect(result.error).toContain('designDraft expected number, received Symbol(test)')
    })

    it('should handle both parameters as symbols', () => {
      const sym1 = Symbol('pixel')
      const sym2 = Symbol('design')
      const result = checkViewportParams(sym1, sym2)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(pixel)')
      expect(result.error).toContain('Symbol(design)')
      expect(result.error).toContain('pixel expected number, received Symbol(pixel)')
      expect(result.error).toContain('designDraft expected number, received Symbol(design)')
    })
  })

  describe('checkPercentParams symbol handling', () => {
    it('should handle symbol child with correct error format', () => {
      const result = checkPercentParams(Symbol('child'), 100)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(child)')
      expect(result.error).toContain('child expected number, received Symbol(child)')
      expect(result.error).toContain('parent expected number, received 100')
    })

    it('should handle symbol parent with correct error format', () => {
      const result = checkPercentParams(25, Symbol('parent'))

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(parent)')
      expect(result.error).toContain('child expected number, received 25')
      expect(result.error).toContain('parent expected number, received Symbol(parent)')
    })

    it('should handle both parameters as symbols', () => {
      const childSym = Symbol('child')
      const parentSym = Symbol('parent')
      const result = checkPercentParams(childSym, parentSym)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(child)')
      expect(result.error).toContain('Symbol(parent)')
    })
  })

  describe('checkDesignDraftScalingParams single parameter failures', () => {
    it('should handle edge case where only pixel fails', () => {
      const result = checkDesignDraftScalingParams(Symbol('pixel'), 1000, 0.5)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(pixel)')
      expect(result.error).toContain('pixel expected number, received Symbol(pixel)')
    })

    it('should handle edge case where only designDraft fails', () => {
      const result = checkDesignDraftScalingParams(100, Symbol('design'), 0.5)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(design)')
      expect(result.error).toContain('designDraft expected number, received Symbol(design)')
    })

    it('should handle edge case where only percent fails', () => {
      const result = checkDesignDraftScalingParams(100, 1000, Symbol('percent'))

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(percent)')
      expect(result.error).toContain('percent expected number, received Symbol(percent)')
    })

    it('should handle mixed symbol inputs', () => {
      const pixelSym = Symbol('px')
      const percentSym = Symbol('pct')
      const result = checkDesignDraftScalingParams(pixelSym, 1000, percentSym)

      expect(result.data).toBeNull()
      expect(result.error).toContain('Symbol(px)')
      expect(result.error).toContain('Symbol(pct)')
      expect(result.error).toContain('pixel expected number')
      expect(result.error).toContain('percent expected number')
    })
  })

  describe('Type coercion edge cases', () => {
    it('should handle function inputs', () => {
      const fn = () => 42
      const result = checkViewportParams(fn, 1000)

      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number')
      expect(result.error).toContain('() => 42')
    })

    it('should handle Date objects that coerce to numbers', () => {
      const date = new Date('2024-01-01')
      const result = checkPercentParams(date, 100)

      // Date objects coerce to numbers (timestamp), so they pass validation
      expect(result.data).toEqual([1704067200000, 100])
      expect(result.error).toBeNull()
    })

    it('should handle RegExp objects', () => {
      const regex = /test/g
      const result = checkDesignDraftScalingParams(100, regex, 0.5)

      expect(result.data).toBeNull()
      expect(result.error).toContain('designDraft expected number')
      expect(result.error).toContain('/test/g')
    })
  })

  describe('Stack trace validation', () => {
    it('should include stack trace in all error responses', () => {
      const result1 = checkViewportParams('invalid', 1000)
      const result2 = checkPercentParams('invalid', 100)
      const result3 = checkDesignDraftScalingParams('invalid', 1000, 0.5)

      expect(result1.error).toContain('at checkViewportParams')
      expect(result2.error).toContain('at checkPercentParams')
      expect(result3.error).toContain('at checkDesignDraftScalingParams')
    })
  })
})
