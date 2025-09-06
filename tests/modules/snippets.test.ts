import {describe, it, expect} from 'vitest'
import {
  DEFAULT_SNIPPET,
  genVSCodeSnippetCore,
  genVSCodeSnippetDraftWidth,
  genVSCodeSnippetDraftHeight,
} from '../../src/modules/snippets'

describe('snippets module', () => {
  describe('DEFAULT_SNIPPET constants', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_SNIPPET.ARGS).toBe('$1')
      expect(DEFAULT_SNIPPET.SCOPE).toBe('html,css,sass,scss,less,stylus')
    })
  })

  describe('genVSCodeSnippetCore', () => {
    it('should generate snippets with default names', () => {
      const result = genVSCodeSnippetCore()

      expect(result).toHaveProperty('vw')
      expect(result).toHaveProperty('dvw')
      expect(result).toHaveProperty('vh')
      expect(result).toHaveProperty('vwc')
      expect(result).toHaveProperty('vwe')
      expect(result).toHaveProperty('em')
      expect(result).toHaveProperty('lh')
      expect(result).toHaveProperty('percent')
    })

    it('should generate correct snippet structure', () => {
      const result = genVSCodeSnippetCore()

      expect(result.vw).toEqual({
        prefix: 'vw',
        body: 'vw($1,$2)$0',
        scope: DEFAULT_SNIPPET.SCOPE,
      })

      expect(result.em).toEqual({
        prefix: 'em',
        body: 'em($1,$2)$0',
        scope: DEFAULT_SNIPPET.SCOPE,
      })
    })

    it('should handle custom function names', () => {
      const result = genVSCodeSnippetCore({
        nameVw: 'customVw',
        nameEm: 'customEm',
        namePercent: 'customPercent',
      })

      expect(result).toHaveProperty('customVw')
      expect(result).toHaveProperty('customEm')
      expect(result).toHaveProperty('customPercent')
      expect(result).not.toHaveProperty('vw')
      expect(result).not.toHaveProperty('em')
      expect(result).not.toHaveProperty('percent')

      expect(result.customVw).toEqual({
        prefix: 'customVw',
        body: 'customVw($1,$2)$0',
        scope: DEFAULT_SNIPPET.SCOPE,
      })
    })

    it('should skip empty function names', () => {
      const result = genVSCodeSnippetCore({
        nameVw: '',
        nameEm: '',
        nameDvw: 'dvw',
      })

      expect(result).not.toHaveProperty('vw')
      expect(result).not.toHaveProperty('em')
      expect(Object.keys(result)).not.toContain('')
      expect(result).toHaveProperty('dvw')
    })

    it('should handle custom scope', () => {
      const result = genVSCodeSnippetCore({
        scope: 'css,scss',
      })

      expect(result.vw.scope).toBe('css,scss')
      expect(result.em.scope).toBe('css,scss')
    })

    it('should generate all viewport variants', () => {
      const result = genVSCodeSnippetCore()

      // Width variants
      expect(result).toHaveProperty('vw')
      expect(result).toHaveProperty('dvw')
      expect(result).toHaveProperty('lvw')
      expect(result).toHaveProperty('svw')

      // Width clamp variants
      expect(result).toHaveProperty('vwc')
      expect(result).toHaveProperty('dvwc')
      expect(result).toHaveProperty('lvwc')
      expect(result).toHaveProperty('svwc')

      // Width extend variants
      expect(result).toHaveProperty('vwe')
      expect(result).toHaveProperty('dvwe')
      expect(result).toHaveProperty('lvwe')
      expect(result).toHaveProperty('svwe')

      // Height variants
      expect(result).toHaveProperty('vh')
      expect(result).toHaveProperty('dvh')
      expect(result).toHaveProperty('lvh')
      expect(result).toHaveProperty('svh')

      // Height clamp variants
      expect(result).toHaveProperty('vhc')
      expect(result).toHaveProperty('dvhc')
      expect(result).toHaveProperty('lvhc')
      expect(result).toHaveProperty('svhc')

      // Height extend variants
      expect(result).toHaveProperty('vhe')
      expect(result).toHaveProperty('dvhe')
      expect(result).toHaveProperty('lvhe')
      expect(result).toHaveProperty('svhe')
    })
  })

  describe('genVSCodeSnippetDraftWidth', () => {
    it('should generate snippets for multiple points', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 3,
        firstIndex: 1,
      })

      expect(result).toHaveProperty('vw1')
      expect(result).toHaveProperty('vw2')
      expect(result).toHaveProperty('vw3')
      expect(result).toHaveProperty('dvw1')
      expect(result).toHaveProperty('vwc1')
      expect(result).toHaveProperty('vwe1')
    })

    it('should respect custom firstIndex', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 2,
        firstIndex: 5,
      })

      expect(result).toHaveProperty('vw5')
      expect(result).toHaveProperty('vw6')
      expect(result).not.toHaveProperty('vw1')
      expect(result).not.toHaveProperty('vw7')
    })

    it('should handle custom function names', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
        nameVw: 'w',
        nameDvw: 'dw',
        nameVwc: 'wc',
        nameVwe: '',
      })

      expect(result).toHaveProperty('w1')
      expect(result).toHaveProperty('dw1')
      expect(result).toHaveProperty('wc1')
      expect(result).not.toHaveProperty('vwe1')
      expect(result).not.toHaveProperty('vw1')
    })

    it('should generate correct snippet structure', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
        scope: 'css',
      })

      expect(result.vw1).toEqual({
        prefix: 'vw1',
        body: 'vw1($1)$0',
        scope: 'css',
      })

      expect(result.vwc1).toEqual({
        prefix: 'vwc1',
        body: 'vwc1($1)$0',
        scope: 'css',
      })
    })

    it('should handle zero pointsSize', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 0,
      })

      expect(Object.keys(result)).toHaveLength(0)
    })

    it('should generate all width function variants', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
      })

      // Basic variants
      expect(result).toHaveProperty('vw1')
      expect(result).toHaveProperty('dvw1')
      expect(result).toHaveProperty('lvw1')
      expect(result).toHaveProperty('svw1')

      // Clamp variants
      expect(result).toHaveProperty('vwc1')
      expect(result).toHaveProperty('dvwc1')
      expect(result).toHaveProperty('lvwc1')
      expect(result).toHaveProperty('svwc1')

      // Extend variants
      expect(result).toHaveProperty('vwe1')
      expect(result).toHaveProperty('dvwe1')
      expect(result).toHaveProperty('lvwe1')
      expect(result).toHaveProperty('svwe1')
    })
  })

  describe('genVSCodeSnippetDraftHeight', () => {
    it('should generate snippets for height variants', () => {
      const result = genVSCodeSnippetDraftHeight({
        pointsSize: 2,
        firstIndex: 1,
      })

      expect(result).toHaveProperty('vh1')
      expect(result).toHaveProperty('vh2')
      expect(result).toHaveProperty('dvh1')
      expect(result).toHaveProperty('vhc1')
      expect(result).toHaveProperty('vhe1')
    })

    it('should handle custom function names', () => {
      const result = genVSCodeSnippetDraftHeight({
        pointsSize: 1,
        nameVh: 'h',
        nameDvh: 'dh',
        nameVhc: '',
        nameVhe: 'he',
      })

      expect(result).toHaveProperty('h1')
      expect(result).toHaveProperty('dh1')
      expect(result).toHaveProperty('he1')
      expect(result).not.toHaveProperty('vhc1')
      expect(result).not.toHaveProperty('vh1')
    })

    it('should generate correct snippet structure', () => {
      const result = genVSCodeSnippetDraftHeight({
        pointsSize: 1,
        scope: 'scss',
      })

      expect(result.vh1).toEqual({
        prefix: 'vh1',
        body: 'vh1($1)$0',
        scope: 'scss',
      })
    })

    it('should generate all height function variants', () => {
      const result = genVSCodeSnippetDraftHeight({
        pointsSize: 1,
      })

      // Basic variants
      expect(result).toHaveProperty('vh1')
      expect(result).toHaveProperty('dvh1')
      expect(result).toHaveProperty('lvh1')
      expect(result).toHaveProperty('svh1')

      // Clamp variants
      expect(result).toHaveProperty('vhc1')
      expect(result).toHaveProperty('dvhc1')
      expect(result).toHaveProperty('lvhc1')
      expect(result).toHaveProperty('svhc1')

      // Extend variants
      expect(result).toHaveProperty('vhe1')
      expect(result).toHaveProperty('dvhe1')
      expect(result).toHaveProperty('lvhe1')
      expect(result).toHaveProperty('svhe1')
    })
  })

  describe('integration and edge cases', () => {
    it('should handle all parameters together', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 2,
        firstIndex: 3,
        scope: 'css,scss,sass',
        nameVw: 'width',
        nameDvw: 'dwidth',
        nameVwc: '',
        nameVwe: 'wextend',
      })

      expect(result).toHaveProperty('width3')
      expect(result).toHaveProperty('width4')
      expect(result).toHaveProperty('dwidth3')
      expect(result).toHaveProperty('wextend3')
      expect(result).not.toHaveProperty('vwc3')

      expect(result.width3.scope).toBe('css,scss,sass')
      expect(result.width3.prefix).toBe('width3')
      expect(result.width3.body).toBe('width3($1)$0')
    })

    it('should handle large pointsSize efficiently', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 50,
      })

      expect(Object.keys(result)).toHaveLength(50 * 12) // 50 points * 12 function types
      expect(result).toHaveProperty('vw1')
      expect(result).toHaveProperty('vw50')
      expect(result).toHaveProperty('svwe50')
    })

    it('should maintain consistent snippet structure across generators', () => {
      const coreResult = genVSCodeSnippetCore()
      const widthResult = genVSCodeSnippetDraftWidth({pointsSize: 1})
      const heightResult = genVSCodeSnippetDraftHeight({pointsSize: 1})

      // All should have the same structure
      expect(coreResult.vw.prefix).toBe('vw')
      expect(coreResult.vw.body).toBe('vw($1,$2)$0')
      expect(coreResult.vw.scope).toBe(DEFAULT_SNIPPET.SCOPE)

      expect(widthResult.vw1.prefix).toBe('vw1')
      expect(widthResult.vw1.body).toBe('vw1($1)$0')
      expect(widthResult.vw1.scope).toBe(DEFAULT_SNIPPET.SCOPE)

      expect(heightResult.vh1.prefix).toBe('vh1')
      expect(heightResult.vh1.body).toBe('vh1($1)$0')
      expect(heightResult.vh1.scope).toBe(DEFAULT_SNIPPET.SCOPE)
    })

    it('should handle extreme edge cases', () => {
      // Very large firstIndex
      const result1 = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
        firstIndex: 1000,
      })
      expect(result1).toHaveProperty('vw1000')

      // Zero firstIndex
      const result2 = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
        firstIndex: 0,
      })
      expect(result2).toHaveProperty('vw0')

      // Negative firstIndex
      const result3 = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
        firstIndex: -5,
      })
      expect(result3).toHaveProperty('vw-5')
    })

    it('should skip functions with empty names consistently', () => {
      const coreConfig = genVSCodeSnippetCore({nameVw: '', nameEm: ''})
      const widthConfig = genVSCodeSnippetDraftWidth({pointsSize: 1, nameVw: ''})
      const heightConfig = genVSCodeSnippetDraftHeight({pointsSize: 1, nameVh: ''})

      expect(Object.keys(coreConfig)).not.toContain('')
      expect(coreConfig).not.toHaveProperty('vw')
      expect(coreConfig).not.toHaveProperty('em')
      expect(coreConfig).toHaveProperty('dvw') // Other functions should still be there

      expect(Object.keys(widthConfig)).not.toContain('')
      expect(widthConfig).not.toHaveProperty('vw1')
      expect(widthConfig).toHaveProperty('dvw1')

      expect(Object.keys(heightConfig)).not.toContain('')
      expect(heightConfig).not.toHaveProperty('vh1')
      expect(heightConfig).toHaveProperty('dvh1')
    })
  })
})