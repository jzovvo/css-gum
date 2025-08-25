import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import {Core} from '../src/index.node'

describe('Error Handling', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    errorSpy.mockRestore()
  })

  describe('Invalid Input Types', () => {
    it('should handle non-numeric strings and log errors', () => {
      const result = Core.vw('invalid-pixel' as any, 1000)

      expect(result).toBe('')
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('pixel expected number, received invalid-pixel'),
      )
    })

    it('should handle objects and log errors', () => {
      const result = Core.vh({key: 'value'} as any, 1000)

      expect(result).toBe('')
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('pixel expected number, received [object Object]'),
      )
    })

    it('should handle functions and log errors', () => {
      const testFunc = function namedFunc() { return 42 }
      const result = Core.vwc(testFunc as any, 1000)

      expect(result).toBe('')
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('pixel expected number, received function namedFunc()'),
      )
    })

    it('should handle symbols and log errors', () => {
      const testSymbol = Symbol('test')
      const result = Core.vhc(testSymbol as any, 1000)

      expect(result).toBe('')
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('pixel expected number, received'),
      )
    })
  })

  describe('Boundary Conditions', () => {
    it('should handle extremely large numbers', () => {
      const result = Core.vw(Number.MAX_SAFE_INTEGER, 1000)

      expect(result).toContain('vw')
      expect(errorSpy).not.toHaveBeenCalled()
    })

    it('should handle very small decimal numbers', () => {
      const result = Core.vh(0.0001, 1000)

      expect(result).toContain('vh')
      expect(errorSpy).not.toHaveBeenCalled()
    })

    it('should handle NaN values', () => {
      const result = Core.percent(NaN, 100)

      expect(result).toBe('')
      expect(errorSpy).toHaveBeenCalled()
    })

    it('should handle Infinity values', () => {
      const result = Core.em(Infinity, 16)

      expect(result).toBe('')
      expect(errorSpy).toHaveBeenCalled()
    })
  })

  describe('Error Message Quality', () => {
    it('should include stack trace in error messages', () => {
      Core.vw('invalid' as any, 1000)

      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Error.*\n.*at.*/),
      )
    })

    it('should provide clear parameter identification in errors', () => {
      Core.percent('invalid-child' as any, 'invalid-parent' as any)

      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('child'),
      )
    })
  })

  describe('Auto-coercion Edge Cases', () => {
    it('should handle null and undefined gracefully', () => {
      const result1 = Core.vw(null as any, 1000)
      const result2 = Core.vh(undefined as any, 1000)

      expect(result1).toBe('0')
      expect(result2).toBe('')
      expect(errorSpy).toHaveBeenCalled()
    })

    it('should handle arrays that coerce to numbers', () => {
      const result1 = Core.vw([10] as any, 1000)
      const result2 = Core.vh([10, 20] as any, 1000)
      const result3 = Core.percent([25] as any, [100] as any)

      expect(result1).toBe('1vw')
      expect(result2).toBe('')
      expect(result3).toBe('25%')
      expect(errorSpy).toHaveBeenCalledTimes(1) // Only the [10, 20] case should error
    })
  })
})