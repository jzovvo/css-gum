import {describe, it, expect} from 'vitest'
import {genFuncsDraftWidth} from '../../../src/modules/generator-functions/draft-width-functions'

describe('modules/generator-functions/draft-width-functions', () => {
  describe('genFuncsDraftWidth', () => {
    it('should generate width functions with correct calculations', () => {
      const result = genFuncsDraftWidth({
        points: [1440, 1800],
      })

      expect(result.core.vw0(144)).toBe('10vw')
      expect(result.core.vw1(180)).toBe('10vw')
      expect(result.core.dvw0(144)).toBe('10dvw')
    })

    it('should handle all viewport width variants', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
      })

      expect(result.core.vw0(144)).toBe('10vw')
      expect(result.core.dvw0(144)).toBe('10dvw')
      expect(result.core.lvw0(144)).toBe('10lvw')
      expect(result.core.svw0(144)).toBe('10svw')
    })

    it('should handle advanced functions', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
      })

      expect(result.core.vwc0(144)).toBe('min(144px, 10vw)')
      expect(result.core.vwe0(144)).toBe('calc((100vw - 1440px) * 0.5 + 144px)')
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

      expect(result.core.vw0(144)).toBe('10vw') // 1440px
      expect(result.core.vw1(180)).toBe('10vw') // 1800px
    })

    it('should generate VSCode snippets', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
      })

      expect(result.VSCodeSnippet.vw0).toHaveProperty('prefix', 'vw0')
      expect(result.VSCodeSnippet.vw0).toHaveProperty('body', 'vw0($1)$0')
    })

    it('should handle custom snippet prefixes', () => {
      const result = genFuncsDraftWidth({
        points: [1440, 1800],
        nameVw: 'vw',
        snippetPrefixVw: 'v',
        nameVwc: 'vwc',
        snippetPrefixVwc: 'vc',
      })

      expect(result.VSCodeSnippet.vw0.prefix).toBe('v0')
      expect(result.VSCodeSnippet.vw1.prefix).toBe('v1')
      expect(result.VSCodeSnippet.vwc0.prefix).toBe('vc0')
      expect(result.VSCodeSnippet.vwc1.prefix).toBe('vc1')
    })

    it('should use function name as default snippet prefix', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
        nameVw: 'customVw',
      })

      expect(result.VSCodeSnippet.customVw0.prefix).toBe('customVw0')
    })

  })

  describe('spaceOverride functionality', () => {
    it('should support spaceOverride parameter for viewport functions', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
        space: 0,
      })

      expect(result.core.vw0(144)).toBe('10vw')
      expect(result.core.vw0(144, 1)).toBe('10vw ')
      expect(result.core.dvw0(144, 1)).toBe('10dvw ')
      expect(result.core.lvw0(144, 1)).toBe('10lvw ')
      expect(result.core.svw0(144, 1)).toBe('10svw ')
    })

    it('should support spaceOverride parameter for clamp functions', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
        space: 0,
      })

      expect(result.core.vwc0(144)).toBe('min(144px, 10vw)')
      expect(result.core.vwc0(144, 1)).toBe('min(144px, 10vw) ')
      expect(result.core.dvwc0(144, 1)).toBe('min(144px, 10dvw) ')
      expect(result.core.lvwc0(144, 1)).toBe('min(144px, 10lvw) ')
      expect(result.core.svwc0(144, 1)).toBe('min(144px, 10svw) ')
    })

    it('should support spaceOverride parameter for extend functions', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
        space: 0,
      })

      expect(result.core.vwe0(144)).toBe('calc((100vw - 1440px) * 0.5 + 144px)')
      expect((result.core.vwe0 as any)(144, 0.5, 1)).toBe('calc((100vw - 1440px) * 0.5 + 144px) ')
      expect((result.core.dvwe0 as any)(144, 0.5, 1)).toBe('calc((100dvw - 1440px) * 0.5 + 144px) ')
      expect((result.core.lvwe0 as any)(144, 0.5, 1)).toBe('calc((100lvw - 1440px) * 0.5 + 144px) ')
      expect((result.core.svwe0 as any)(144, 0.5, 1)).toBe('calc((100svw - 1440px) * 0.5 + 144px) ')
    })

    it('should override global space setting with spaceOverride', () => {
      const result = genFuncsDraftWidth({
        points: [1440],
        space: 1,
      })

      expect(result.core.vw0(144)).toBe('10vw ')
      expect(result.core.vwc0(144)).toBe('min(144px, 10vw) ')

      expect(result.core.vw0(144, 0)).toBe('10vw')
      expect(result.core.vwc0(144, 0)).toBe('min(144px, 10vw)')
      expect((result.core.vwe0 as any)(144, 0.5, 0)).toBe('calc((100vw - 1440px) * 0.5 + 144px)')
    })

    it('should handle spaceOverride for multiple points', () => {
      const result = genFuncsDraftWidth({
        points: [1440, 1920],
        space: 0,
      })

      expect(result.core.vw0(144, 1)).toBe('10vw ')
      expect(result.core.vwc0(144, 1)).toBe('min(144px, 10vw) ')

      expect(result.core.vw1(192, 1)).toBe('10vw ')
      expect(result.core.vwc1(192, 1)).toBe('min(192px, 10vw) ')
    })
  })
})
