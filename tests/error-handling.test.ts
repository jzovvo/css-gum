import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import {Core} from '../src/index'

describe('Error Handling', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  describe('Core functions error handling', () => {
    it('should handle non-convertible string inputs', () => {
      const result1 = Core.vw('not-a-number' as any, 1920)
      expect(result1).toBe('')
      expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('[ vw error ]'),
      }))

      consoleSpy.mockClear()

      const result2 = Core.vw(100, 'not-a-number' as any)
      expect(result2).toBe('')
      expect(consoleSpy).toHaveBeenCalled()
    })

    it('should handle object inputs', () => {
      const result1 = Core.vh({} as any, 1080)
      expect(result1).toBe('')
      expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('[ vh error ]'),
      }))

      consoleSpy.mockClear()

      const result2 = Core.vh(50, {} as any)
      expect(result2).toBe('')
      expect(consoleSpy).toHaveBeenCalled()
    })

    it('should handle array inputs', () => {
      // Empty array is coerced to 0
      const result1 = Core.percent([] as any, 1200)
      expect(result1).toBe('0%')
      expect(consoleSpy).not.toHaveBeenCalled()

      const result2 = Core.percent(300, [] as any)
      expect(result2).toContain('Infinity%')
      expect(consoleSpy).not.toHaveBeenCalled()
    })

    it('should handle function inputs', () => {
      const func = () => {}
      const result1 = Core.ddws(func as any, 1920, 0.5)
      expect(result1).toBe('')
      expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('[ ddws error ]'),
      }))

      consoleSpy.mockClear()

      const result2 = Core.ddws(100, func as any, 0.5)
      expect(result2).toBe('')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockClear()

      const result3 = Core.ddws(100, 1920, func as any)
      expect(result3).toBe('')
      expect(consoleSpy).toHaveBeenCalled()
    })
  })

  describe('Valid but edge case inputs', () => {
    it('should handle numeric strings correctly', () => {
      // Numeric strings should be converted and work
      const result1 = Core.vw('100' as any, 1920)
      expect(result1).toContain('vw')
      expect(consoleSpy).not.toHaveBeenCalled()

      const result2 = Core.vw(100, '1920' as any)
      expect(result2).toContain('vw')
      expect(consoleSpy).not.toHaveBeenCalled()
    })

    it('should handle negative values correctly', () => {
      // Negative values are mathematically valid
      const result1 = Core.vw(-100, 1920)
      expect(result1).toContain('vw')
      expect(consoleSpy).not.toHaveBeenCalled()

      const result2 = Core.vw(100, -1920)
      expect(result2).toContain('vw')
      expect(consoleSpy).not.toHaveBeenCalled()
    })

    it('should handle zero values correctly', () => {
      // Zero values should work
      const result1 = Core.vw(0, 1920)
      expect(result1).toBe('0')
      expect(consoleSpy).not.toHaveBeenCalled()

      // Zero design width creates division by zero -> Infinity
      const result2 = Core.vw(100, 0)
      expect(result2).toContain('infinity')
      expect(consoleSpy).not.toHaveBeenCalled()
    })

    it('should handle null and undefined correctly', () => {
      // null is converted to 0 by zod coerce
      const result1 = Core.vw(null as any, 1920)
      expect(result1).toBe('0')
      expect(consoleSpy).not.toHaveBeenCalled()

      // undefined may cause validation errors
      const result2 = Core.vw(undefined as any, 1920)
      // If it returns empty string, validation failed
      if (result2 === '') {
        expect(consoleSpy).toHaveBeenCalled()
      } else {
        expect(result2).toBe('0')
        expect(consoleSpy).not.toHaveBeenCalled()
      }
    })
  })
})
