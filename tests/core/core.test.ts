import {describe, it, expect, vi} from 'vitest'
import {Core} from '../../src/index'

describe('Core Module', () => {
  describe('vw function', () => {
    it('should convert pixels to vw correctly', () => {
      const result = Core.vw(10, 100)

      expect(result).toBe('10vw')
    })

    it('should handle zero pixel value', () => {
      const result = Core.vw(0, 100)

      expect(result).toBe('0')
    })

    it('should handle infinity values (zero design width)', () => {
      const result = Core.vw(100, 0)

      expect(result).toBe('infinity')
    })

    it('should handle negative infinity', () => {
      const result = Core.vw(-100, 0)

      expect(result).toBe('-infinity')
    })

    it('should handle invalid input and return empty string', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const result = Core.vw('not-a-number' as any, 1920)

      expect(result).toBe('')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('vh function', () => {
    it('should convert pixels to vh correctly', () => {
      const result = Core.vh(10, 100)

      expect(result).toBe('10vh')
    })

    it('should handle zero pixel value', () => {
      const result = Core.vh(0, 100)

      expect(result).toBe('0')
    })

    it('should handle infinity values (zero design height)', () => {
      const result = Core.vh(100, 0)

      expect(result).toBe('infinity')
    })

    it('should handle negative infinity', () => {
      const result = Core.vh(-100, 0)

      expect(result).toBe('-infinity')
    })
  })

  describe('vwc function (viewport width clamped)', () => {
    it('should return min function for positive values', () => {
      const result = Core.vwc(10, 100)

      expect(result).toContain('min')
      expect(result).toContain('10px')
      expect(result).toContain('10vw')
    })

    it('should return max function for negative values', () => {
      const result = Core.vwc(-10, 100)

      expect(result).toContain('max')
      expect(result).toContain('-10px')
      expect(result).toContain('-10vw')
    })

    it('should handle zero pixel values', () => {
      const result = Core.vwc(0, 100)

      expect(result).toBe('0')
    })

    it('should handle infinity values', () => {
      const result = Core.vwc(10, 0)

      expect(result).toBe('min(10px, infinity)')
    })
  })

  describe('vhc function (viewport height clamped)', () => {
    it('should return min function for positive values', () => {
      const result = Core.vhc(10, 100)

      expect(result).toContain('min')
      expect(result).toContain('10px')
      expect(result).toContain('10vh')
    })

    it('should handle zero pixel values', () => {
      const result = Core.vhc(0, 100)

      expect(result).toBe('0')
    })

    it('should handle infinity values', () => {
      const result = Core.vhc(10, 0)

      expect(result).toBe('min(10px, infinity)')
    })
  })

  describe('percent function', () => {
    it('should calculate percentage correctly', () => {
      const result = Core.percent(10, 100)

      expect(result).toBe('10%')
    })

    it('should handle zero values', () => {
      const result = Core.percent(0, 100)

      expect(result).toBe('0%')
    })
  })

  describe('vwe function (viewport width extended)', () => {
    it('should generate calc expression with default scaling', () => {
      const result = Core.vwe(10, 100)

      expect(result).toBe('calc((100vw - 100px) * 0.5 + 10px)')
    })

    it('should generate calc expression with custom scaling', () => {
      const result = Core.vwe(10, 100, 0.8)

      expect(result).toBe('calc((100vw - 100px) * 0.8 + 10px)')
    })
  })

  describe('vhe function (viewport height extended)', () => {
    it('should generate calc expression with default scaling', () => {
      const result = Core.vhe(10, 100)

      expect(result).toBe('calc((100vh - 100px) * 0.5 + 10px)')
    })
  })

  describe('em function', () => {
    it('should calculate em value correctly', () => {
      const result = Core.em(24, 16)

      expect(result).toBe('1.5em')
    })
  })

  describe('lh function (line height)', () => {
    it('should calculate line height ratio correctly', () => {
      const result = Core.lh(24, 16)

      expect(result).toBe('1.5')
    })
  })
})
