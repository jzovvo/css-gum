import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import {Core} from '../src/index.node'

describe('Error Handling', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    errorSpy.mockRestore()
    warnSpy.mockRestore()
  })

  describe('Parameter Validation Errors', () => {
    describe('Invalid pixel parameter', () => {
      it('should handle non-numeric strings', () => {
        const result = Core.vw('invalid-pixel' as any, 1920)

        expect(result).toBe('')
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('pixel expected number, received invalid-pixel'),
        )
      })

      it('should handle objects', () => {
        const result = Core.vh({key: 'value'} as any, 1080)

        expect(result).toBe('')
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('pixel expected number, received [object Object]'),
        )
      })

      it('should handle functions', () => {
        const testFunc = function namedFunc() { return 42 }
        const result = Core.vwc(testFunc as any, 1440)

        expect(result).toBe('')
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('pixel expected number, received function namedFunc()'),
        )
      })

      it('should handle symbols', () => {
        const testSymbol = Symbol('test')

        expect(() => Core.vhc(testSymbol as any, 1080)).toThrow('Cannot convert a Symbol value to a string')
      })
    })

    describe('Invalid designDraft parameter', () => {
      it('should handle non-numeric strings', () => {
        const result = Core.vw(100, 'invalid-design-draft' as any)

        expect(result).toBe('')
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('designDraft expected number, received invalid-design-draft'),
        )
      })

      it('should handle arrays that coerce to zero', () => {
        const result = Core.vh(30, [] as any)

        expect(result).toBe('')
        expect(errorSpy).not.toHaveBeenCalled()
      })
    })

    describe('Invalid percent parameter (for vwe/vhe)', () => {
      it('should handle invalid percent values', () => {
        const result = Core.vwe(100, 1920, 'invalid-percent' as any)

        expect(result).toBe('')
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('percent expected number, received invalid-percent'),
        )
      })
    })

    describe('Invalid percentage calculation parameters', () => {
      it('should handle invalid child parameter', () => {
        const result = Core.percent('invalid-child' as any, 100)

        expect(result).toBe('')
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('child expected number, received invalid-child'),
        )
      })

      it('should handle invalid parent parameter', () => {
        const result = Core.em(24, 'invalid-parent' as any)

        expect(result).toBe('')
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('parent expected number, received invalid-parent'),
        )
      })

      it('should handle both invalid parameters', () => {
        const result = Core.lh('invalid-child' as any, 'invalid-parent' as any)

        expect(result).toBe('')
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('child expected number, received invalid-child'),
        )
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('parent expected number, received invalid-parent'),
        )
      })
    })
  })

  describe('Function Coverage - All Core Functions', () => {
    const invalidInput = 'invalid-input'
    const validPixel = 100
    const validDesignDraft = 1920
    const validPercent = 0.5

    it('should handle errors in vw function', () => {
      Core.vw(invalidInput as any, validDesignDraft)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))
    })

    it('should handle errors in vwc function', () => {
      Core.vwc(validPixel, invalidInput as any)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('designDraft expected number'))
    })

    it('should handle errors in vh function', () => {
      Core.vh(invalidInput as any, validDesignDraft)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))
    })

    it('should handle errors in vhc function', () => {
      Core.vhc(validPixel, invalidInput as any)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('designDraft expected number'))
    })

    it('should handle errors in vwe function', () => {
      Core.vwe(invalidInput as any, validDesignDraft, validPercent)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))

      errorSpy.mockClear()
      Core.vwe(validPixel, invalidInput as any, validPercent)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('designDraft expected number'))

      errorSpy.mockClear()
      Core.vwe(validPixel, validDesignDraft, invalidInput as any)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('percent expected number'))
    })

    it('should handle errors in vhe function', () => {
      Core.vhe(invalidInput as any, validDesignDraft, validPercent)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))

      errorSpy.mockClear()
      Core.vhe(validPixel, invalidInput as any, validPercent)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('designDraft expected number'))

      errorSpy.mockClear()
      Core.vhe(validPixel, validDesignDraft, invalidInput as any)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('percent expected number'))
    })

    it('should handle errors in percent function', () => {
      Core.percent(invalidInput as any, 100)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('child expected number'))

      errorSpy.mockClear()
      Core.percent(50, invalidInput as any)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('parent expected number'))
    })

    it('should handle errors in em function', () => {
      Core.em(invalidInput as any, 16)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('child expected number'))

      errorSpy.mockClear()
      Core.em(24, invalidInput as any)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('parent expected number'))
    })

    it('should handle errors in lh function', () => {
      Core.lh(invalidInput as any, 16)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('child expected number'))

      errorSpy.mockClear()
      Core.lh(24, invalidInput as any)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('parent expected number'))
    })
  })

  describe('Valid Edge Cases - No Errors Expected', () => {
    beforeEach(() => {
      errorSpy.mockClear()
      warnSpy.mockClear()
    })

    it('should handle numeric strings (auto-conversion)', () => {
      const result1 = Core.vw('100' as any, 1920)
      const result2 = Core.vh(50, '1080' as any)
      const result3 = Core.percent('25' as any, '100' as any)

      expect(result1).toContain('vw')
      expect(result2).toContain('vh')
      expect(result3).toBe('25%')
      expect(errorSpy).not.toHaveBeenCalled()
    })

    it('should handle null and undefined', () => {
      const result1 = Core.vw(null as any, 1920)
      const result2 = Core.vh(undefined as any, 1080)

      expect(result1).toBe('0')
      expect(result2).toBe('')
      expect(errorSpy).toHaveBeenCalled()
    })

    it('should handle zero values', () => {
      const result1 = Core.vw(0, 1920)
      const result2 = Core.percent(0, 100)

      expect(result1).toBe('0')
      expect(result2).toBe('0')
      expect(errorSpy).not.toHaveBeenCalled()
    })

    it('should handle negative pixel values', () => {
      const result1 = Core.vw(-100, 1920)
      const result2 = Core.vwc(-50, 1440)

      expect(result1).toContain('vw')
      expect(result2).toContain('px')
      expect(errorSpy).not.toHaveBeenCalled()
    })

    it('should handle arrays that coerce to numbers', () => {
      const result1 = Core.percent([] as any, 100)

      expect(result1).toBe('0')
      expect(errorSpy).not.toHaveBeenCalled()
    })
  })

  describe('Stack Trace Information', () => {
    it('should include stack trace in error messages', () => {
      Core.vw('invalid' as any, 1920)

      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Error:/),
      )
    })
  })
})
