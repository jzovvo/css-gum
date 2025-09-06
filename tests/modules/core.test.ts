import {describe, it, expect, vi, beforeEach} from 'vitest'
import {
  vw, dvw, lvw, svw,
  vwc, dvwc, lvwc, svwc,
  vwe, dvwe, lvwe, svwe,
  vh, dvh, lvh, svh,
  vhc, dvhc, lvhc, svhc,
  vhe, dvhe, lvhe, svhe,
  percent, em, lh,
} from '../../src/modules/core'
import * as console from '../../src/utils/console'

// Mock console functions to test error handling
vi.mock('../../src/utils/console', () => ({
  consoleError: vi.fn(),
}))

describe('core module', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('viewport width functions', () => {
    describe('basic viewport units (vw, dvw, lvw, svw)', () => {
      it('should generate correct vw values', () => {
        expect(vw(100, 1000)).toBe('10vw')
        expect(dvw(100, 1000)).toBe('10dvw')
        expect(lvw(100, 1000)).toBe('10lvw')
        expect(svw(100, 1000)).toBe('10svw')
      })

      it('should handle zero pixel values', () => {
        expect(vw(0, 1000)).toBe('0')
        expect(dvw(0, 1000)).toBe('0')
      })

      it('should handle space flag', () => {
        expect(vw(100, 1000, 0)).toBe('10vw')
        expect(vw(100, 1000, 1)).toBe('10vw ')
        expect(dvw(100, 1000, 1)).toBe('10dvw ')
      })

      it('should handle zero design draft gracefully', () => {
        expect(vw(100, 0)).toBe('')
        // Zero is valid number but produces empty result due to division by zero check
        expect(console.consoleError).not.toHaveBeenCalled()
      })

      it('should handle invalid inputs', () => {
        expect(vw('invalid' as any, 1000)).toBe('')
        expect(console.consoleError).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))
      })
    })

    describe('clamp viewport units (vwc, dvwc, lvwc, svwc)', () => {
      it('should generate correct clamp values', () => {
        expect(vwc(100, 1000)).toBe('min(100px, 10vw)')
        expect(dvwc(100, 1000)).toBe('min(100px, 10dvw)')
        expect(lvwc(100, 1000)).toBe('min(100px, 10lvw)')
        expect(svwc(100, 1000)).toBe('min(100px, 10svw)')
      })

      it('should handle negative values', () => {
        expect(vwc(-100, 1000)).toBe('max(-100px, -10vw)')
        expect(dvwc(-100, 1000)).toBe('max(-100px, -10dvw)')
      })

      it('should handle zero pixel values', () => {
        expect(vwc(0, 1000)).toBe('0')
        expect(dvwc(0, 1000)).toBe('0')
      })

      it('should handle invalid inputs', () => {
        expect(vwc('invalid' as any, 1000)).toBe('')
        expect(console.consoleError).toHaveBeenCalled()
      })
    })

    describe('extend viewport units (vwe, dvwe, lvwe, svwe)', () => {
      it('should generate correct calc values with default percent', () => {
        expect(vwe(100, 1000)).toBe('calc((100vw - 1000px) * 0.5 + 100px)')
        expect(dvwe(100, 1000)).toBe('calc((100dvw - 1000px) * 0.5 + 100px)')
        expect(lvwe(100, 1000)).toBe('calc((100lvw - 1000px) * 0.5 + 100px)')
        expect(svwe(100, 1000)).toBe('calc((100svw - 1000px) * 0.5 + 100px)')
      })

      it('should generate correct calc values with custom percent', () => {
        expect(vwe(100, 1000, 0.8)).toBe('calc((100vw - 1000px) * 0.8 + 100px)')
        expect(dvwe(100, 1000, 0.2)).toBe('calc((100dvw - 1000px) * 0.2 + 100px)')
      })

      it('should handle zero percent', () => {
        expect(vwe(100, 1000, 0)).toBe('100px')
        expect(dvwe(0, 1000, 0)).toBe('0')
      })

      it('should handle zero pixel values', () => {
        expect(vwe(0, 1000, 0.5)).toBe('calc((100vw - 1000px) * 0.5)')
      })

      it('should handle negative pixel values', () => {
        expect(vwe(-100, 1000, 0.5)).toBe('calc((100vw - 1000px) * 0.5 - 100px)')
      })

      it('should handle invalid inputs', () => {
        expect(vwe('invalid' as any, 1000, 0.5)).toBe('')
        expect(console.consoleError).toHaveBeenCalled()
      })
    })
  })

  describe('viewport height functions', () => {
    describe('basic viewport units (vh, dvh, lvh, svh)', () => {
      it('should generate correct vh values', () => {
        expect(vh(100, 800)).toBe('12.5vh')
        expect(dvh(100, 800)).toBe('12.5dvh')
        expect(lvh(100, 800)).toBe('12.5lvh')
        expect(svh(100, 800)).toBe('12.5svh')
      })

      it('should handle space flag', () => {
        expect(vh(100, 800, 0)).toBe('12.5vh')
        expect(vh(100, 800, 1)).toBe('12.5vh ')
      })
    })

    describe('clamp viewport units (vhc, dvhc, lvhc, svhc)', () => {
      it('should generate correct clamp values', () => {
        expect(vhc(100, 800)).toBe('min(100px, 12.5vh)')
        expect(dvhc(100, 800)).toBe('min(100px, 12.5dvh)')
        expect(lvhc(100, 800)).toBe('min(100px, 12.5lvh)')
        expect(svhc(100, 800)).toBe('min(100px, 12.5svh)')
      })
    })

    describe('extend viewport units (vhe, dvhe, lvhe, svhe)', () => {
      it('should generate correct calc values', () => {
        expect(vhe(100, 800)).toBe('calc((100vh - 800px) * 0.5 + 100px)')
        expect(dvhe(100, 800)).toBe('calc((100dvh - 800px) * 0.5 + 100px)')
        expect(lvhe(100, 800)).toBe('calc((100lvh - 800px) * 0.5 + 100px)')
        expect(svhe(100, 800)).toBe('calc((100svh - 800px) * 0.5 + 100px)')
      })

      it('should handle custom percent', () => {
        expect(vhe(100, 800, 0.8)).toBe('calc((100vh - 800px) * 0.8 + 100px)')
      })
    })
  })

  describe('percentage function', () => {
    it('should generate correct percentage values', () => {
      expect(percent(25, 100)).toBe('25%')
      expect(percent(1, 4)).toBe('25%')
      expect(percent(100, 400)).toBe('25%')
    })

    it('should handle zero values', () => {
      expect(percent(0, 100)).toBe('0')
      expect(percent(25, 0)).toBe('infinity')
      expect(console.consoleError).not.toHaveBeenCalled() // No error for valid inputs
    })

    it('should handle negative values', () => {
      expect(percent(-25, 100)).toBe('-25%')
    })

    it('should handle invalid inputs', () => {
      expect(percent('invalid' as any, 100)).toBe('')
      expect(console.consoleError).toHaveBeenCalled()
    })
  })

  describe('font functions', () => {
    describe('em function', () => {
      it('should generate correct em values', () => {
        expect(em(16, 16)).toBe('1em')
        expect(em(32, 16)).toBe('2em')
        expect(em(8, 16)).toBe('0.5em')
      })

      it('should handle zero values', () => {
        expect(em(0, 16)).toBe('0')
        expect(em(16, 0)).toBe('infinity')
        expect(console.consoleError).not.toHaveBeenCalled() // No error for valid inputs
      })

      it('should handle invalid inputs', () => {
        expect(em('invalid' as any, 16)).toBe('')
        expect(console.consoleError).toHaveBeenCalled()
      })
    })

    describe('lh function', () => {
      it('should generate correct line height values', () => {
        expect(lh(24, 16)).toBe('1.5')
        expect(lh(32, 16)).toBe('2')
        expect(lh(16, 16)).toBe('1')
      })

      it('should handle zero values', () => {
        expect(lh(0, 16)).toBe('0')
        expect(lh(24, 0)).toBe('infinity')
        expect(console.consoleError).not.toHaveBeenCalled() // No error for valid inputs
      })
    })
  })

  describe('integration and consistency', () => {
    it('should maintain consistent behavior across width variants', () => {
      const pixel = 200
      const designDraft = 1000

      // All should produce 20% calculation
      expect(vw(pixel, designDraft)).toBe('20vw')
      expect(dvw(pixel, designDraft)).toBe('20dvw')
      expect(lvw(pixel, designDraft)).toBe('20lvw')
      expect(svw(pixel, designDraft)).toBe('20svw')
    })

    it('should maintain consistent behavior across height variants', () => {
      const pixel = 200
      const designDraft = 800

      // All should produce 25% calculation
      expect(vh(pixel, designDraft)).toBe('25vh')
      expect(dvh(pixel, designDraft)).toBe('25dvh')
      expect(lvh(pixel, designDraft)).toBe('25lvh')
      expect(svh(pixel, designDraft)).toBe('25svh')
    })

    it('should handle edge case values consistently', () => {
      // Very small values
      expect(vw(1, 10000)).toBe('0.01vw')
      expect(vwc(1, 10000)).toBe('min(1px, 0.01vw)')

      // Large values
      expect(vw(5000, 1000)).toBe('500vw')
      expect(vwc(5000, 1000)).toBe('min(5000px, 500vw)')
    })

    it('should handle space flag consistently across width functions', () => {
      const pixel = 100
      const designDraft = 1000

      // Without space
      expect(vw(pixel, designDraft, 0)).toBe('10vw')
      expect(dvw(pixel, designDraft, 0)).toBe('10dvw')

      // With space
      expect(vw(pixel, designDraft, 1)).toBe('10vw ')
      expect(dvw(pixel, designDraft, 1)).toBe('10dvw ')
    })

    it('should handle zero pixel with space flag', () => {
      expect(vw(0, 1000, 1)).toBe('0 ') // Space is added even for zero when flag is 1
      expect(dvw(0, 1000, 1)).toBe('0 ')
    })
  })

  describe('error handling', () => {
    it('should call consoleError for validation failures', () => {
      vw('invalid' as any, 1000)
      expect(console.consoleError).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))

      vwc(100, 'invalid' as any)
      expect(console.consoleError).toHaveBeenCalledWith(expect.stringContaining('designDraft expected number'))

      vwe('invalid' as any, 1000, 'invalid' as any)
      expect(console.consoleError).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))
    })

    it('should return empty string on validation failure', () => {
      expect(vw('invalid' as any, 1000)).toBe('')
      expect(vwc(100, 'invalid' as any)).toBe('')
      expect(vwe('invalid' as any, 'invalid' as any, 'invalid' as any)).toBe('')
      expect(percent('invalid' as any, 'invalid' as any)).toBe('')
      expect(em('invalid' as any, 'invalid' as any)).toBe('')
    })
  })
})
