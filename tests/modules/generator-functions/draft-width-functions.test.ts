import {describe, it, expect} from 'vitest'
import {genFuncsDraftWidth} from '../../../src/modules/generator-functions/draft-width-functions'

describe('modules/generator-functions/draft-width-functions', () => {
  describe('genFuncsDraftWidth', () => {
    it('should generate width functions with correct calculations', () => {
      const result = genFuncsDraftWidth({
        points: [1440, 1800],
      })

      expect(result.core.vw1(144)).toBe('10vw')
      expect(result.core.vw2(180)).toBe('10vw')
      expect(result.core.dvw1(144)).toBe('10dvw')
    })

    it('should handle all viewport width variants', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
      })

      expect(result.core.vw1(144)).toBe('10vw')
      expect(result.core.dvw1(144)).toBe('10dvw')
      expect(result.core.lvw1(144)).toBe('10lvw')
      expect(result.core.svw1(144)).toBe('10svw')
    })

    it('should handle advanced functions', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
      })

      expect(result.core.vwc1(144)).toBe('min(144px, 10vw)')
      expect(result.core.vwe1(144)).toBe('calc((100vw - 1440px) * 0.5 + 144px)')
    })

    it('should handle custom configuration', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
        nameVw: 'customVw',
        nameDvw: '',
        firstIndex: 5,
        space: 1,
      })

      expect(result.core.customVw5(144)).toBe('10vw ')
      expect(result.core.dvw5).toBeUndefined()
    })

    it('should filter and sort points correctly', () => {
      const result = genFuncsDraftWidth({
        points: [1800, 0, 1440, -100],
      })

      expect(result.core.vw1(144)).toBe('10vw') // 1440px
      expect(result.core.vw2(180)).toBe('10vw') // 1800px
    })

    it('should generate VSCode snippets', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
      })

      expect(result.VSCodeSnippet.vw1).toHaveProperty('prefix', 'vw1')
      expect(result.VSCodeSnippet.vw1).toHaveProperty('body', 'vw1($1)$0')
    })
  })
})