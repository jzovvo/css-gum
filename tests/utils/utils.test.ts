import {describe, it, expect} from 'vitest'
import {Utils} from '../../src/index'

describe('Utils Module', () => {
  describe('Basic conversion functions', () => {
    it('percent should calculate correctly', () => {
      const result = Utils.percent(100)(10)
      expect(result).toBe(10)
    })

    it('pxToVw should be alias of percent', () => {
      expect(Utils.pxToVw).toBe(Utils.percent)
    })

    it('pxToVh should be alias of percent', () => {
      expect(Utils.pxToVh).toBe(Utils.percent)
    })
  })

  describe('CSS conversion functions', () => {
    it('cssPxToVw should return vw string', () => {
      const result = Utils.cssPxToVw(100)(10)
      expect(result).toBe('10vw')
    })

    it('cssPxToVh should return vh string', () => {
      const result = Utils.cssPxToVh(100)(10)
      expect(result).toBe('10vh')
    })

    it('cssPercent should return percentage string', () => {
      const result = Utils.cssPercent(100)(10)
      expect(result).toBe('10%')
    })
  })

  describe('CSS clamp functions', () => {
    it('cssPxToVwc should return min for positive values', () => {
      const result = Utils.cssPxToVwc(100)(10)
      expect(result).toBe('min(10px, 10vw)')
    })

    it('cssPxToVwc should return max for negative values', () => {
      const result = Utils.cssPxToVwc(100)(-10)
      expect(result).toBe('max(-10px, -10vw)')
    })

    it('cssPxToVhc should return min for positive values', () => {
      const result = Utils.cssPxToVhc(100)(10)
      expect(result).toBe('min(10px, 10vh)')
    })

    it('cssPxToVhc should return max for negative values', () => {
      const result = Utils.cssPxToVhc(100)(-10)
      expect(result).toBe('max(-10px, -10vh)')
    })
  })

  describe('Design draft scaling functions', () => {
    it('cssPxToVwe should generate calc expression', () => {
      const result = Utils.cssPxToVwe(100)(0.5)(10)
      expect(result).toBe('calc((100vw - 100px) * 0.5 + 10px)')
    })

    it('cssPxToVhe should generate calc expression', () => {
      const result = Utils.cssPxToVhe(100)(0.8)(50)
      expect(result).toBe('calc((100vh - 100px) * 0.8 + 50px)')
    })

    it('should handle zero scaling for vwe', () => {
      const result = Utils.cssPxToVwe(100)(0)(10)
      expect(result).toBe('calc((100vw - 100px) * 0 + 10px)')
    })

    it('should handle zero scaling for vhe', () => {
      const result = Utils.cssPxToVhe(100)(0)(10)
      expect(result).toBe('calc((100vh - 100px) * 0 + 10px)')
    })
  })

  describe('Typography functions', () => {
    it('cssEm should calculate em values', () => {
      const result = Utils.cssEm(24, 16)
      expect(result).toBe('1.5em')
    })

    it('cssLh should calculate line height ratio', () => {
      const result = Utils.cssLh(24, 16)
      expect(result).toBe('1.5')
    })
  })

  describe('Special number handling with classifyNumber', () => {
    it('should handle positive infinity (zero design width)', () => {
      const result = Utils.cssPxToVw(0)(100)
      expect(result).toBe('infinity')
    })

    it('should handle negative infinity (zero design width, negative pixel)', () => {
      const result = Utils.cssPxToVw(0)(-100)
      expect(result).toBe('-infinity')
    })

    it('should handle zero values', () => {
      const result = Utils.cssPxToVw(100)(0)
      expect(result).toBe('0')
    })

    it('should handle normal values correctly', () => {
      const result = Utils.cssPxToVw(100)(10)
      expect(result).toBe('10vw')
    })
  })

  describe('Clamp functions with special values', () => {
    it('should handle zero pixel values in clamp functions', () => {
      const result = Utils.cssPxToVwc(100)(0)
      expect(result).toBe('0')
    })

    it('should handle infinity in clamp functions', () => {
      const result = Utils.cssPxToVwc(0)(100)
      expect(result).toBe('min(100px, infinity)')
    })

    it('should handle negative infinity in clamp functions', () => {
      const result = Utils.cssPxToVwc(0)(-100)
      expect(result).toBe('max(-100px, -infinity)')
    })
  })

  describe('Other edge cases', () => {
    it('should handle very small design values', () => {
      const result = Utils.cssPxToVw(1)(1)
      expect(result).toBe('100vw')
    })

    it('should handle negative design values', () => {
      const result = Utils.cssPxToVw(-100)(10)
      expect(result).toBe('-10vw')
    })
  })
})
