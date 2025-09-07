import {describe, it, expect, vi, beforeEach} from 'vitest'
import {
  vw, dvw, lvw, svw,
  vwc, dvwc,
  vwe, dvwe,
  vh, dvh, lvh, svh,
  vhc, dvhc,
  vhe, dvhe,
  percent, em, lh,
} from '../../../src/modules/core'
import * as console from '../../../src/utils/console'

vi.mock('../../../src/utils/console', () => ({
  consoleError: vi.fn(),
}))

describe('modules/core', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('viewport functions integration', () => {
    it('should provide working viewport width functions', () => {
      expect(vw(144, 1440)).toBe('10vw')
      expect(dvw(144, 1440)).toBe('10dvw')
      expect(lvw(144, 1440)).toBe('10lvw')
      expect(svw(144, 1440)).toBe('10svw')
    })

    it('should provide working viewport height functions', () => {
      expect(vh(108, 1080)).toBe('10vh')
      expect(dvh(108, 1080)).toBe('10dvh')
      expect(lvh(108, 1080)).toBe('10lvh')
      expect(svh(108, 1080)).toBe('10svh')
    })
  })

  describe('advanced functions', () => {
    it('should handle clamped functions', () => {
      expect(vwc(144, 1440)).toBe('min(144px, 10vw)')
      expect(dvwc(144, 1440)).toBe('min(144px, 10dvw)')
      expect(vhc(108, 1080)).toBe('min(108px, 10vh)')
      expect(dvhc(108, 1080)).toBe('min(108px, 10dvh)')
    })

    it('should handle negative clamp values', () => {
      expect(vwc(-144, 1440)).toBe('max(-144px, -10vw)')
      expect(vhc(-108, 1080)).toBe('max(-108px, -10vh)')
    })

    it('should handle extended functions', () => {
      expect(vwe(144, 1440)).toBe('calc((100vw - 1440px) * 0.5 + 144px)')
      expect(dvwe(144, 1440)).toBe('calc((100dvw - 1440px) * 0.5 + 144px)')
      expect(vhe(108, 1080)).toBe('calc((100vh - 1080px) * 0.5 + 108px)')
      expect(dvhe(108, 1080)).toBe('calc((100dvh - 1080px) * 0.5 + 108px)')
    })

    it('should handle custom percent in extended functions', () => {
      expect(vwe(144, 1440, 0.8)).toBe('calc((100vw - 1440px) * 0.8 + 144px)')
      expect(vhe(108, 1080, 0.2)).toBe('calc((100vh - 1080px) * 0.2 + 108px)')
    })
  })

  describe('utility functions', () => {
    it('should provide working utility functions', () => {
      expect(percent(25, 100)).toBe('25%')
      expect(em(24, 16)).toBe('1.5em')
      expect(lh(24, 16)).toBe('1.5')
    })
  })

  describe('special cases', () => {
    it('should handle space flag', () => {
      expect(vw(144, 1440, 0)).toBe('10vw')
      expect(vw(144, 1440, 1)).toBe('10vw ')
    })

    it('should handle zero values', () => {
      expect(vw(0, 1440)).toBe('0')
      expect(vwc(0, 1440)).toBe('0')
      expect(percent(0, 100)).toBe('0')
    })

    it('should handle invalid inputs with error reporting', () => {
      expect(vw('invalid' as any, 1440)).toBe('')
      expect(console.consoleError).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))
    })

    it('should handle division by zero gracefully', () => {
      expect(vw(144, 0)).toBe('')
      expect(percent(25, 0)).toBe('infinity')
      expect(em(24, 0)).toBe('infinity')
    })
  })
})