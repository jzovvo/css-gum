import {describe, it, expect} from 'vitest'
import {
  percent,
  cssPercent,
  cssPxToVw,
  cssPxToDvw,
  cssPxToLvw,
  cssPxToSvw,
  cssPxToVwc,
  cssPxToDvwc,
  cssPxToLvwc,
  cssPxToSvwc,
  cssPxToVwe,
  cssPxToDvwe,
  cssPxToLvwe,
  cssPxToSvwe,
  cssPxToVh,
  cssPxToDvh,
  cssPxToLvh,
  cssPxToSvh,
  cssPxToVhc,
  cssPxToDvhc,
  cssPxToVhe,
  cssPxToDvhe,
  cssPxToLvhe,
  cssPxToSvhe,
  cssEm,
  cssLh,
} from '../../src/modules/utils'

describe('utils module', () => {
  describe('percent calculation', () => {
    it('should calculate percentage correctly', () => {
      expect(percent(100)(25)).toBe(25)
      expect(percent(1000)(1)).toBe(0.1)
      expect(percent(4)(1)).toBe(25)
    })

    it('should handle zero values', () => {
      expect(percent(100)(0)).toBe(0)
      expect(percent(1)(0)).toBe(0)
    })

    it('should handle negative values', () => {
      expect(percent(100)(-25)).toBe(-25)
      expect(percent(100)(50)).toBe(50)
    })
  })

  describe('cssPercent', () => {
    it('should generate CSS percentage values', () => {
      expect(cssPercent(100)(25)).toBe('25%')
      expect(cssPercent(4)(1)).toBe('25%')
      expect(cssPercent(1000)(1)).toBe('0.1%')
    })

    it('should handle zero values', () => {
      expect(cssPercent(100)(0)).toBe('0')
      expect(cssPercent(1)(0)).toBe('0')
    })

    it('should handle zero denominator', () => {
      expect(cssPercent(0)(100)).toBe('infinity')
      expect(cssPercent(0)(0)).toBe('0') // 0/0 special case returns '0' not 'infinity'
    })

    it('should handle negative values', () => {
      expect(cssPercent(100)(-25)).toBe('-25%')
    })
  })

  describe('viewport width units', () => {
    const designDraft = 1000

    describe('cssPxToVw and variants', () => {
      it('should generate vw units correctly', () => {
        expect(cssPxToVw(designDraft)(100)).toBe('10vw')
        expect(cssPxToDvw(designDraft)(100)).toBe('10dvw')
        expect(cssPxToLvw(designDraft)(100)).toBe('10lvw')
        expect(cssPxToSvw(designDraft)(100)).toBe('10svw')
      })

      it('should handle zero pixel values', () => {
        expect(cssPxToVw(designDraft)(0)).toBe('0')
        expect(cssPxToDvw(designDraft)(0)).toBe('0')
      })

      it('should handle negative pixel values', () => {
        expect(cssPxToVw(designDraft)(-100)).toBe('-10vw')
        expect(cssPxToDvw(designDraft)(-100)).toBe('-10dvw')
      })

      it('should return empty string for invalid design draft', () => {
        expect(cssPxToVw(0)(100)).toBe('')
        expect(cssPxToVw(-100)(100)).toBe('')
      })
    })

    describe('cssPxToVwc and variants (clamp)', () => {
      it('should generate clamp for positive values', () => {
        expect(cssPxToVwc(designDraft)(100)).toBe('min(100px, 10vw)')
        expect(cssPxToDvwc(designDraft)(100)).toBe('min(100px, 10dvw)')
        expect(cssPxToLvwc(designDraft)(100)).toBe('min(100px, 10lvw)')
        expect(cssPxToSvwc(designDraft)(100)).toBe('min(100px, 10svw)')
      })

      it('should generate clamp for negative values', () => {
        expect(cssPxToVwc(designDraft)(-100)).toBe('max(-100px, -10vw)')
        expect(cssPxToDvwc(designDraft)(-100)).toBe('max(-100px, -10dvw)')
      })

      it('should handle zero pixel values', () => {
        expect(cssPxToVwc(designDraft)(0)).toBe('0')
        expect(cssPxToDvwc(designDraft)(0)).toBe('0')
      })

      it('should return empty string for invalid design draft', () => {
        expect(cssPxToVwc(0)(100)).toBe('')
        expect(cssPxToVwc(-100)(100)).toBe('')
      })
    })

    describe('cssPxToVwe and variants (extend)', () => {
      it('should generate calc for basic cases', () => {
        expect(cssPxToVwe(designDraft)(0.5)(100)).toBe('calc((100vw - 1000px) * 0.5 + 100px)')
        expect(cssPxToDvwe(designDraft)(0.5)(100)).toBe('calc((100dvw - 1000px) * 0.5 + 100px)')
        expect(cssPxToLvwe(designDraft)(0.5)(100)).toBe('calc((100lvw - 1000px) * 0.5 + 100px)')
        expect(cssPxToSvwe(designDraft)(0.5)(100)).toBe('calc((100svw - 1000px) * 0.5 + 100px)')
      })

      it('should handle zero percent', () => {
        expect(cssPxToVwe(designDraft)(0)(100)).toBe('100px')
        expect(cssPxToVwe(designDraft)(0)(0)).toBe('0')
      })

      it('should handle zero pixel values', () => {
        expect(cssPxToVwe(designDraft)(0.5)(0)).toBe('calc((100vw - 1000px) * 0.5)')
      })

      it('should handle negative pixel values', () => {
        expect(cssPxToVwe(designDraft)(0.5)(-100)).toBe('calc((100vw - 1000px) * 0.5 - 100px)')
      })

      it('should return empty string for invalid design draft', () => {
        expect(cssPxToVwe(0)(0.5)(100)).toBe('')
        expect(cssPxToVwe(-100)(0.5)(100)).toBe('')
      })
    })
  })

  describe('viewport height units', () => {
    const designDraft = 800

    describe('cssPxToVh and variants', () => {
      it('should generate vh units correctly', () => {
        expect(cssPxToVh(designDraft)(100)).toBe('12.5vh')
        expect(cssPxToDvh(designDraft)(100)).toBe('12.5dvh')
        expect(cssPxToLvh(designDraft)(100)).toBe('12.5lvh')
        expect(cssPxToSvh(designDraft)(100)).toBe('12.5svh')
      })

      it('should handle zero and negative values', () => {
        expect(cssPxToVh(designDraft)(0)).toBe('0')
        expect(cssPxToVh(designDraft)(-100)).toBe('-12.5vh')
      })
    })

    describe('cssPxToVhc and variants (clamp)', () => {
      it('should generate clamp correctly', () => {
        expect(cssPxToVhc(designDraft)(100)).toBe('min(100px, 12.5vh)')
        expect(cssPxToDvhc(designDraft)(100)).toBe('min(100px, 12.5dvh)')
        expect(cssPxToVhc(designDraft)(-100)).toBe('max(-100px, -12.5vh)')
      })
    })

    describe('cssPxToVhe and variants (extend)', () => {
      it('should generate calc correctly', () => {
        expect(cssPxToVhe(designDraft)(0.5)(100)).toBe('calc((100vh - 800px) * 0.5 + 100px)')
        expect(cssPxToDvhe(designDraft)(0.5)(100)).toBe('calc((100dvh - 800px) * 0.5 + 100px)')
        expect(cssPxToLvhe(designDraft)(0.5)(100)).toBe('calc((100lvh - 800px) * 0.5 + 100px)')
        expect(cssPxToSvhe(designDraft)(0.5)(100)).toBe('calc((100svh - 800px) * 0.5 + 100px)')
      })
    })
  })

  describe('font units', () => {
    describe('cssEm', () => {
      it('should convert to em units correctly', () => {
        expect(cssEm(16, 16)).toBe('1em')
        expect(cssEm(32, 16)).toBe('2em')
        expect(cssEm(8, 16)).toBe('0.5em')
      })

      it('should handle zero line spacing', () => {
        expect(cssEm(0, 16)).toBe('0')
      })

      it('should handle zero font size', () => {
        expect(cssEm(16, 0)).toBe('infinity')
      })
    })

    describe('cssLh', () => {
      it('should convert to unitless values correctly', () => {
        expect(cssLh(24, 16)).toBe('1.5')
        expect(cssLh(32, 16)).toBe('2')
        expect(cssLh(16, 16)).toBe('1')
      })

      it('should handle zero line height', () => {
        expect(cssLh(0, 16)).toBe('0')
      })

      it('should handle zero font size', () => {
        expect(cssLh(24, 0)).toBe('infinity')
      })
    })
  })

  describe('edge cases and boundary conditions', () => {
    it('should handle very small numbers', () => {
      expect(cssPercent(1000)(0.1)).toBe('0.01%')
      expect(cssPxToVw(10000)(1)).toBe('0.01vw')
    })

    it('should handle large numbers', () => {
      expect(cssPercent(1)(10000)).toBe('1000000%')
      expect(cssPxToVw(1)(10000)).toBe('1000000vw')
    })

    it('should maintain function consistency across variants', () => {
      const designDraft = 1200
      const pixel = 240

      // All vw variants should produce the same percentage calculation
      const expectedPercent = pixel / designDraft * 100

      expect(cssPxToVw(designDraft)(pixel)).toBe(`${expectedPercent}vw`)
      expect(cssPxToDvw(designDraft)(pixel)).toBe(`${expectedPercent}dvw`)
      expect(cssPxToLvw(designDraft)(pixel)).toBe(`${expectedPercent}lvw`)
      expect(cssPxToSvw(designDraft)(pixel)).toBe(`${expectedPercent}svw`)
    })
  })
})
