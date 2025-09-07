import {describe, it, expect} from 'vitest'
import {
  cssPxToVw, cssPxToDvw, cssPxToLvw, cssPxToSvw,
  cssPxToVh, cssPxToDvh, cssPxToLvh, cssPxToSvh,
  cssPxToVwc, cssPxToDvwc,
  cssPxToVhc, cssPxToDvhc,
  cssPxToVwe, cssPxToDvwe,
  cssPxToVhe, cssPxToDvhe,
  cssPercent, cssEm, cssLh,
} from '../../../src/modules/utils'

describe('modules/utils', () => {
  describe('viewport width utilities', () => {
    const designDraft = 1440

    it('should generate correct vw values', () => {
      expect(cssPxToVw(designDraft)(144)).toBe('10vw')
      expect(cssPxToDvw(designDraft)(144)).toBe('10dvw')
      expect(cssPxToLvw(designDraft)(144)).toBe('10lvw')
      expect(cssPxToSvw(designDraft)(144)).toBe('10svw')
    })

    it('should handle zero values', () => {
      expect(cssPxToVw(designDraft)(0)).toBe('0')
      expect(cssPxToDvw(designDraft)(0)).toBe('0')
    })
  })

  describe('viewport height utilities', () => {
    const designDraft = 1080

    it('should generate correct vh values', () => {
      expect(cssPxToVh(designDraft)(108)).toBe('10vh')
      expect(cssPxToDvh(designDraft)(108)).toBe('10dvh')
      expect(cssPxToLvh(designDraft)(108)).toBe('10lvh')
      expect(cssPxToSvh(designDraft)(108)).toBe('10svh')
    })
  })

  describe('clamped utilities', () => {
    it('should generate correct clamp values', () => {
      expect(cssPxToVwc(1440)(144)).toBe('min(144px, 10vw)')
      expect(cssPxToDvwc(1440)(144)).toBe('min(144px, 10dvw)')
      expect(cssPxToVhc(1080)(108)).toBe('min(108px, 10vh)')
      expect(cssPxToDvhc(1080)(108)).toBe('min(108px, 10dvh)')
    })

    it('should handle negative values', () => {
      expect(cssPxToVwc(1440)(-144)).toBe('max(-144px, -10vw)')
      expect(cssPxToVhc(1080)(-108)).toBe('max(-108px, -10vh)')
    })

    it('should handle zero values', () => {
      expect(cssPxToVwc(1440)(0)).toBe('0')
      expect(cssPxToVhc(1080)(0)).toBe('0')
    })
  })

  describe('extended utilities', () => {
    it('should generate correct extended values', () => {
      expect(cssPxToVwe(1440)(0.5)(144)).toBe('calc((100vw - 1440px) * 0.5 + 144px)')
      expect(cssPxToDvwe(1440)(0.5)(144)).toBe('calc((100dvw - 1440px) * 0.5 + 144px)')
      expect(cssPxToVhe(1080)(0.5)(108)).toBe('calc((100vh - 1080px) * 0.5 + 108px)')
      expect(cssPxToDvhe(1080)(0.5)(108)).toBe('calc((100dvh - 1080px) * 0.5 + 108px)')
    })

    it('should handle zero percent', () => {
      expect(cssPxToVwe(1440)(0)(144)).toBe('144px')
      expect(cssPxToVhe(1080)(0)(108)).toBe('108px')
    })

    it('should handle zero pixel', () => {
      expect(cssPxToVwe(1440)(0.5)(0)).toBe('calc((100vw - 1440px) * 0.5)')
      expect(cssPxToVhe(1080)(0.5)(0)).toBe('calc((100vh - 1080px) * 0.5)')
    })
  })

  describe('other utilities', () => {
    it('should calculate percentage correctly', () => {
      expect(cssPercent(100)(25)).toBe('25%')
      expect(cssPercent(400)(100)).toBe('25%')
      expect(cssPercent(100)(0)).toBe('0')
    })

    it('should calculate em correctly', () => {
      expect(cssEm(24, 16)).toBe('1.5em')
      expect(cssEm(32, 16)).toBe('2em')
      expect(cssEm(0, 16)).toBe('0')
    })

    it('should calculate line height correctly', () => {
      expect(cssLh(24, 16)).toBe('1.5')
      expect(cssLh(32, 16)).toBe('2')
      expect(cssLh(0, 16)).toBe('0')
    })
  })
})