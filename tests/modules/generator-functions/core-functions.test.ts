import {describe, it, expect} from 'vitest'
import {genFuncsCore} from '../../../src/modules/generator-functions/core-functions'

describe('modules/generator-functions/core-functions', () => {
  describe('genFuncsCore', () => {
    it('should generate core functions with correct behavior', () => {
      const result = genFuncsCore()

      expect(result.core.vw(144, 1440)).toBe('10vw')
      expect(result.core.vh(108, 1080)).toBe('10vh')
      expect(result.core.percent(25, 100)).toBe('25%')
      expect(result.core.em(24, 16)).toBe('1.5em')
      expect(result.core.lh(24, 16)).toBe('1.5')
    })

    it('should handle custom function names', () => {
      const result = genFuncsCore({
        nameVw: 'customVw',
        nameVh: 'customVh',
        namePercent: 'customPercent',
      })

      expect(result.core.customVw).toBeTypeOf('function')
      expect(result.core.customVh).toBeTypeOf('function')
      expect(result.core.customPercent).toBeTypeOf('function')
    })

    it('should skip functions with empty names', () => {
      const result = genFuncsCore({
        nameVw: '',
        nameVh: '',
        namePercent: 'percent',
      })

      expect(result.core.vw).toBeUndefined()
      expect(result.core.vh).toBeUndefined()
      expect(result.core.percent).toBeTypeOf('function')
    })

    it('should handle configuration options', () => {
      const result = genFuncsCore({
        scope: ['css', 'scss'],
        space: 1,
      })

      expect(result.VSCodeSnippet.vw.scope).toBe('css,scss')
      expect(result.core.vw(144, 1440)).toBe('10vw ')
    })

    it('should provide all viewport width variants', () => {
      const result = genFuncsCore()

      expect(result.core.vw(100, 1000)).toBe('10vw')
      expect(result.core.dvw(100, 1000)).toBe('10dvw')
      expect(result.core.lvw(100, 1000)).toBe('10lvw')
      expect(result.core.svw(100, 1000)).toBe('10svw')
    })

    it('should provide all viewport height variants', () => {
      const result = genFuncsCore()

      expect(result.core.vh(100, 1000)).toBe('10vh')
      expect(result.core.dvh(100, 1000)).toBe('10dvh')
      expect(result.core.lvh(100, 1000)).toBe('10lvh')
      expect(result.core.svh(100, 1000)).toBe('10svh')
    })

    it('should provide clamp and expand functions', () => {
      const result = genFuncsCore()

      expect(result.core.vwc(100, 1000)).toBe('min(100px, 10vw)')
      expect(result.core.vhe(100, 1000)).toBe('calc((100vh - 1000px) * 0.5 + 100px)')
      expect(result.core.dvwc(100, 1000)).toBe('min(100px, 10dvw)')
      expect(result.core.svwe(100, 1000)).toBe('calc((100svw - 1000px) * 0.5 + 100px)')
    })

    it('should override space parameter per function call', () => {
      const result = genFuncsCore({
        space: 0,
      })

      expect(result.core.vw(144, 1440, 1)).toBe('10vw ')
      expect(result.core.vh(144, 1440, 0)).toBe('10vh')
    })

    it('should handle custom snippet prefixes', () => {
      const result = genFuncsCore({
        nameVw: 'vw',
        snippetPrefixVw: 'v',
        namePercent: 'percent',
        snippetPrefixPercent: 'pct',
      })

      expect(result.VSCodeSnippet.vw.prefix).toBe('v')
      expect(result.VSCodeSnippet.percent.prefix).toBe('pct')
    })

    it('should use function name as default snippet prefix', () => {
      const result = genFuncsCore({
        nameVw: 'customVw',
        namePercent: 'customPercent',
      })

      expect(result.VSCodeSnippet.customVw.prefix).toBe('customVw')
      expect(result.VSCodeSnippet.customPercent.prefix).toBe('customPercent')
    })
  })

  describe('spaceOverride functionality', () => {
    it('should support spaceOverride parameter for all function types', () => {
      const result = genFuncsCore({
        space: 0,
      })

      expect(result.core.vw(144, 1440)).toBe('10vw')
      expect(result.core.vw(144, 1440, 1)).toBe('10vw ')
      expect(result.core.vh(108, 1080, 1)).toBe('10vh ')

      expect(result.core.vwc(144, 1440)).toBe('min(144px, 10vw)')
      expect(result.core.vwc(144, 1440, 1)).toBe('min(144px, 10vw) ')

      expect(result.core.vwe(144, 1440)).toBe('calc((100vw - 1440px) * 0.5 + 144px)')
      expect((result.core.vwe as any)(144, 1440, 0.5, 1)).toBe('calc((100vw - 1440px) * 0.5 + 144px) ')

      expect(result.core.percent(25, 100)).toBe('25%')
      expect(result.core.percent(25, 100, 1)).toBe('25% ')
      expect(result.core.em(24, 16, 1)).toBe('1.5em ')
      expect(result.core.lh(24, 16, 1)).toBe('1.5 ')
    })

    it('should override global space setting with spaceOverride', () => {
      const result = genFuncsCore({
        space: 1,
      })

      expect(result.core.vw(144, 1440)).toBe('10vw ')
      expect(result.core.percent(25, 100)).toBe('25% ')

      expect(result.core.vw(144, 1440, 0)).toBe('10vw')
      expect(result.core.percent(25, 100, 0)).toBe('25%')

      expect(result.core.vw(144, 1440, 1)).toBe('10vw ')
      expect((result.core.vwe as any)(144, 1440, 0.5, 1)).toBe('calc((100vw - 1440px) * 0.5 + 144px) ')
    })

    it('should handle spaceOverride for all viewport variants', () => {
      const result = genFuncsCore({space: 0})

      expect(result.core.dvw(144, 1440, 1)).toBe('10dvw ')
      expect(result.core.lvw(144, 1440, 1)).toBe('10lvw ')
      expect(result.core.svw(144, 1440, 1)).toBe('10svw ')

      expect(result.core.dvwc(144, 1440, 1)).toBe('min(144px, 10dvw) ')
      expect(result.core.lvwc(144, 1440, 1)).toBe('min(144px, 10lvw) ')
      expect(result.core.svwc(144, 1440, 1)).toBe('min(144px, 10svw) ')

      expect((result.core.dvwe as any)(144, 1440, 0.5, 0)).toBe('calc((100dvw - 1440px) * 0.5 + 144px)')
      expect((result.core.lvwe as any)(144, 1440, 0.5, 0)).toBe('calc((100lvw - 1440px) * 0.5 + 144px)')
      expect((result.core.svwe as any)(144, 1440, 0.5, 0)).toBe('calc((100svw - 1440px) * 0.5 + 144px)')
    })
  })
})