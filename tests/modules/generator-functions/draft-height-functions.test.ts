import {describe, it, expect} from 'vitest'
import {genFuncsDraftHeight} from '../../../src/modules/generator-functions/draft-height-functions'

describe('modules/generator-functions/draft-height-functions', () => {
  describe('genFuncsDraftHeight', () => {
    it('should generate height functions with correct calculations', () => {
      const result = genFuncsDraftHeight({
        points: [600, 800, 1080],
      })

      expect(result.core.vh1(60)).toBe('10vh')  // 600px
      expect(result.core.vh2(80)).toBe('10vh')  // 800px
      expect(result.core.vh3(108)).toBe('10vh') // 1080px
    })

    it('should handle all viewport height variants', () => {
      const result = genFuncsDraftHeight({
        points: [500],
      })

      expect(result.core.vh1(50)).toBe('10vh')
      expect(result.core.dvh1(50)).toBe('10dvh')
      expect(result.core.lvh1(50)).toBe('10lvh')
      expect(result.core.svh1(50)).toBe('10svh')
    })

    it('should handle advanced functions', () => {
      const result = genFuncsDraftHeight({
        points: [500],
      })

      expect(result.core.vhc1(50)).toBe('min(50px, 10vh)')
      expect(result.core.vhe1(50)).toBe('calc((100vh - 500px) * 0.5 + 50px)')
    })

    it('should handle custom configuration', () => {
      const result = genFuncsDraftHeight({
        points: [500],
        nameVh: 'customVh',
        nameDvh: '',
        firstIndex: 2,
        space: 1,
      })

      expect(result.core.customVh2(50)).toBe('10vh ')
      expect(result.core.dvh2).toBeUndefined()
    })

    it('should filter and sort points correctly', () => {
      const result = genFuncsDraftHeight({
        points: [1080, 0, 600, -100, 800],
      })

      expect(result.core.vh1(60)).toBe('10vh')   // 600px
      expect(result.core.vh2(80)).toBe('10vh')   // 800px
      expect(result.core.vh3(108)).toBe('10vh')  // 1080px
    })

    it('should generate VSCode snippets', () => {
      const result = genFuncsDraftHeight({
        points: [600, 800],
      })

      expect(result.VSCodeSnippet.vh1).toHaveProperty('prefix', 'vh1')
      expect(result.VSCodeSnippet.vh1).toHaveProperty('body', 'vh1($1)$0')
    })

    it('should handle custom snippet prefixes', () => {
      const result = genFuncsDraftHeight({
        points: [600, 800],
        nameVh: 'vh',
        snippetPrefixVh: 'h',
        nameVhc: 'vhc',
        snippetPrefixVhc: 'hc',
      })

      expect(result.VSCodeSnippet.vh1.prefix).toBe('h1')
      expect(result.VSCodeSnippet.vh2.prefix).toBe('h2')
      expect(result.VSCodeSnippet.vhc1.prefix).toBe('hc1')
      expect(result.VSCodeSnippet.vhc2.prefix).toBe('hc2')
    })

    it('should use function name as default snippet prefix', () => {
      const result = genFuncsDraftHeight({
        points: [600],
        nameVh: 'customVh',
      })

      expect(result.VSCodeSnippet.customVh1.prefix).toBe('customVh1')
    })
  })
})