import {describe, it, expect} from 'vitest'
import {Util} from '../../src/index.node'

describe('Util Module', () => {
  describe('Basic conversion functions', () => {
    it('percent should calculate correctly', () => {
      const result = Util.percent(100)(10)

      expect(result).toBe(10)
    })

    it('pxToVw should be alias of percent', () => {
      expect(Util.pxToVw).toBe(Util.percent)
    })

    it('pxToVh should be alias of percent', () => {
      expect(Util.pxToVh).toBe(Util.percent)
    })
  })

  describe('CSS conversion functions', () => {
    it('cssPxToVw should return vw string', () => {
      const result = Util.cssPxToVw(100)(10)

      expect(result).toBe('10vw')
    })

    it('cssPxToVh should return vh string', () => {
      const result = Util.cssPxToVh(100)(10)

      expect(result).toBe('10vh')
    })

    it('cssPercent should return percentage string', () => {
      const result = Util.cssPercent(100)(10)

      expect(result).toBe('10%')
    })
  })

  describe('CSS clamp functions', () => {
    it('cssPxToVwc should return min for positive values', () => {
      const result = Util.cssPxToVwc(100)(10)

      expect(result).toBe('min(10px, 10vw)')
    })

    it('cssPxToVwc should return max for negative values', () => {
      const result = Util.cssPxToVwc(100)(-10)

      expect(result).toBe('max(-10px, -10vw)')
    })

    it('cssPxToVhc should return min for positive values', () => {
      const result = Util.cssPxToVhc(100)(10)

      expect(result).toBe('min(10px, 10vh)')
    })

    it('cssPxToVhc should return max for negative values', () => {
      const result = Util.cssPxToVhc(100)(-10)

      expect(result).toBe('max(-10px, -10vh)')
    })
  })

  describe('Design draft scaling functions', () => {
    it('cssPxToVwe should generate calc expression', () => {
      const result = Util.cssPxToVwe(100)(0.5)(10)

      expect(result).toBe('calc((100vw - 100px) * 0.5 + 10px)')
    })

    it('cssPxToVhe should generate calc expression', () => {
      const result = Util.cssPxToVhe(100)(0.8)(50)

      expect(result).toBe('calc((100vh - 100px) * 0.8 + 50px)')
    })

    it('should handle zero scaling for vwe', () => {
      const result = Util.cssPxToVwe(100)(0)(10)

      expect(result).toBe('10px')
    })

    it('should handle zero scaling for vhe', () => {
      const result = Util.cssPxToVhe(100)(0)(10)

      expect(result).toBe('10px')
    })

    it('should handle zero pixel with zero percent for vwe', () => {
      const result = Util.cssPxToVwe(100)(0)(0)

      expect(result).toBe('0')
    })

    it('should handle zero pixel with zero percent for vhe', () => {
      const result = Util.cssPxToVhe(100)(0)(0)

      expect(result).toBe('0')
    })

    it('cssPxToVwe should handle negative pixel values', () => {
      const result = Util.cssPxToVwe(100)(0.5)(-20)

      expect(result).toBe('calc((100vw - 100px) * 0.5 - 20px)')
    })

    it('cssPxToVhe should handle negative pixel values', () => {
      const result = Util.cssPxToVhe(100)(0.5)(-30)

      expect(result).toBe('calc((100vh - 100px) * 0.5 - 30px)')
    })

    it('cssPxToVwe should not add + 0px when pixel is zero', () => {
      const result = Util.cssPxToVwe(100)(0.5)(0)

      expect(result).toBe('calc((100vw - 100px) * 0.5)')
    })

    it('cssPxToVhe should not add + 0px when pixel is zero', () => {
      const result = Util.cssPxToVhe(100)(0.5)(0)

      expect(result).toBe('calc((100vh - 100px) * 0.5)')
    })

    it('cssPxToVwe with zero percent and negative pixel', () => {
      const result = Util.cssPxToVwe(100)(0)(-10)

      expect(result).toBe('-10px')
    })

    it('cssPxToVhe with zero percent and negative pixel', () => {
      const result = Util.cssPxToVhe(100)(0)(-15)

      expect(result).toBe('-15px')
    })

    it('cssPxToVwe should reject zero design width', () => {
      const result = Util.cssPxToVwe(0)(0.5)(10)

      expect(result).toBe('')
    })

    it('cssPxToVhe should reject zero design height', () => {
      const result = Util.cssPxToVhe(0)(0.5)(10)

      expect(result).toBe('')
    })

    it('cssPxToVwe should reject negative design width', () => {
      const result = Util.cssPxToVwe(-100)(0.5)(10)

      expect(result).toBe('')
    })

    it('cssPxToVhe should reject negative design height', () => {
      const result = Util.cssPxToVhe(-100)(0.5)(10)

      expect(result).toBe('')
    })
  })

  describe('Typography functions', () => {
    it('cssEm should calculate em values', () => {
      const result = Util.cssEm(24, 16)

      expect(result).toBe('1.5em')
    })

    it('cssEm should return 0 for zero line size', () => {
      const result = Util.cssEm(0, 16)

      expect(result).toBe('0')
    })

    it('cssLh should calculate line height ratio', () => {
      const result = Util.cssLh(24, 16)

      expect(result).toBe('1.5')
    })

    it('cssLh should return 0 for zero line height', () => {
      const result = Util.cssLh(0, 16)

      expect(result).toBe('0')
    })

    it('cssPercent should return percentage string', () => {
      const result = Util.cssPercent(100)(25)

      expect(result).toBe('25%')
    })

    it('cssPercent should return 0 for zero child value', () => {
      const result = Util.cssPercent(100)(0)

      expect(result).toBe('0')
    })
  })

  describe('Special number handling', () => {
    it('should reject zero design width', () => {
      const result = Util.cssPxToVw(0)(100)

      expect(result).toBe('')
    })

    it('should reject negative design width', () => {
      const result = Util.cssPxToVw(-100)(100)

      expect(result).toBe('')
    })

    it('should handle zero values', () => {
      const result = Util.cssPxToVw(100)(0)

      expect(result).toBe('0')
    })

    it('should handle normal values correctly', () => {
      const result = Util.cssPxToVw(100)(10)

      expect(result).toBe('10vw')
    })
  })

  describe('Clamp functions with special values', () => {
    it('should handle zero pixel values in clamp functions', () => {
      const result = Util.cssPxToVwc(100)(0)

      expect(result).toBe('0')
    })

    it('should reject zero design width in clamp functions', () => {
      const result = Util.cssPxToVwc(0)(100)

      expect(result).toBe('')
    })

    it('should reject negative design width in clamp functions', () => {
      const result = Util.cssPxToVwc(-100)(100)

      expect(result).toBe('')
    })
  })

  describe('Other edge cases', () => {
    it('should handle very small design values', () => {
      const result = Util.cssPxToVw(1)(1)

      expect(result).toBe('100vw')
    })

    it('should reject negative design values', () => {
      const result = Util.cssPxToVw(-100)(10)

      expect(result).toBe('')
    })

    it('cssPercent should handle division by zero', () => {
      const result = Util.cssPercent(0)(100)

      expect(result).toBe('Infinity%')
    })

    it('cssEm should handle division by zero', () => {
      const result = Util.cssEm(24, 0)

      expect(result).toBe('infinity')
    })

    it('cssLh should handle division by zero', () => {
      const result = Util.cssLh(24, 0)

      expect(result).toBe('infinity')
    })
  })
})
