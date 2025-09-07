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
  })
})