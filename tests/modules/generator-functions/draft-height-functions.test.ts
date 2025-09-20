import {describe, it, expect} from 'vitest'
import {genFuncsDraftHeight} from '../../../src/modules/generator-functions/draft-height-functions'

describe('modules/generator-functions/draft-height-functions', () => {
  describe('genFuncsDraftHeight', () => {
    it('should generate height functions with correct calculations', () => {
      const result = genFuncsDraftHeight({
        points: [600, 800, 1080],
      })

      expect(result.core.vh0(60)).toBe('10vh')  // 600px
      expect(result.core.vh1(80)).toBe('10vh')  // 800px
      expect(result.core.vh2(108)).toBe('10vh') // 1080px
    })

    it('should handle all viewport height variants', () => {
      const result = genFuncsDraftHeight({
        points: [500],
      })

      expect(result.core.vh0(50)).toBe('10vh')
      expect(result.core.dvh0(50)).toBe('10dvh')
      expect(result.core.lvh0(50)).toBe('10lvh')
      expect(result.core.svh0(50)).toBe('10svh')
    })

    it('should handle advanced functions', () => {
      const result = genFuncsDraftHeight({
        points: [500],
      })

      expect(result.core.vhc0(50)).toBe('min(50px, 10vh)')
      expect(result.core.vhe0(50)).toBe('calc((100vh - 500px) * 0.5 + 50px)')
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

      expect(result.core.vh0(60)).toBe('10vh')   // 600px
      expect(result.core.vh1(80)).toBe('10vh')   // 800px
      expect(result.core.vh2(108)).toBe('10vh')  // 1080px
    })

    it('should generate VSCode snippets', () => {
      const result = genFuncsDraftHeight({
        points: [600, 800],
      })

      expect(result.VSCodeSnippet.vh0).toHaveProperty('prefix', 'vh0')
      expect(result.VSCodeSnippet.vh0).toHaveProperty('body', 'vh0($1)$0')
    })

    it('should handle custom snippet prefixes', () => {
      const result = genFuncsDraftHeight({
        points: [600, 800],
        nameVh: 'vh',
        snippetPrefixVh: 'h',
        nameVhc: 'vhc',
        snippetPrefixVhc: 'hc',
      })

      expect(result.VSCodeSnippet.vh0.prefix).toBe('h0')
      expect(result.VSCodeSnippet.vh1.prefix).toBe('h1')
      expect(result.VSCodeSnippet.vhc0.prefix).toBe('hc0')
      expect(result.VSCodeSnippet.vhc1.prefix).toBe('hc1')
    })

    it('should use function name as default snippet prefix', () => {
      const result = genFuncsDraftHeight({
        points: [600],
        nameVh: 'customVh',
      })

      expect(result.VSCodeSnippet.customVh0.prefix).toBe('customVh0')
    })

  })

  describe('spaceOverride functionality', () => {
    it('should support spaceOverride parameter for viewport functions', () => {
      const result = genFuncsDraftHeight({
        points: [1080],
        space: 0,
      })

      expect(result.core.vh0(108)).toBe('10vh')
      expect(result.core.vh0(108, 1)).toBe('10vh ')
      expect(result.core.dvh0(108, 1)).toBe('10dvh ')
      expect(result.core.lvh0(108, 1)).toBe('10lvh ')
      expect(result.core.svh0(108, 1)).toBe('10svh ')
    })

    it('should support spaceOverride parameter for clamp functions', () => {
      const result = genFuncsDraftHeight({
        points: [1080],
        space: 0,
      })

      expect(result.core.vhc0(108)).toBe('min(108px, 10vh)')
      expect(result.core.vhc0(108, 1)).toBe('min(108px, 10vh) ')
      expect(result.core.dvhc0(108, 1)).toBe('min(108px, 10dvh) ')
      expect(result.core.lvhc0(108, 1)).toBe('min(108px, 10lvh) ')
      expect(result.core.svhc0(108, 1)).toBe('min(108px, 10svh) ')
    })

    it('should support spaceOverride parameter for extend functions', () => {
      const result = genFuncsDraftHeight({
        points: [1080],
        space: 0,
      })

      expect(result.core.vhe0(108)).toBe('calc((100vh - 1080px) * 0.5 + 108px)')
      expect((result.core.vhe0 as any)(108, 0.5, 1)).toBe('calc((100vh - 1080px) * 0.5 + 108px) ')
      expect((result.core.dvhe0 as any)(108, 0.5, 1)).toBe('calc((100dvh - 1080px) * 0.5 + 108px) ')
      expect((result.core.lvhe0 as any)(108, 0.5, 1)).toBe('calc((100lvh - 1080px) * 0.5 + 108px) ')
      expect((result.core.svhe0 as any)(108, 0.5, 1)).toBe('calc((100svh - 1080px) * 0.5 + 108px) ')
    })

    it('should override global space setting with spaceOverride', () => {
      const result = genFuncsDraftHeight({
        points: [1080],
        space: 1,
      })

      expect(result.core.vh0(108)).toBe('10vh ')
      expect(result.core.vhc0(108)).toBe('min(108px, 10vh) ')

      expect(result.core.vh0(108, 0)).toBe('10vh')
      expect(result.core.vhc0(108, 0)).toBe('min(108px, 10vh)')
      expect((result.core.vhe0 as any)(108, 0.5, 0)).toBe('calc((100vh - 1080px) * 0.5 + 108px)')
    })

    it('should handle spaceOverride for multiple points', () => {
      const result = genFuncsDraftHeight({
        points: [720, 1080],
        space: 0,
      })

      expect(result.core.vh0(72, 1)).toBe('10vh ')
      expect(result.core.vhc0(72, 1)).toBe('min(72px, 10vh) ')

      expect(result.core.vh1(108, 1)).toBe('10vh ')
      expect(result.core.vhc1(108, 1)).toBe('min(108px, 10vh) ')
    })
  })
})