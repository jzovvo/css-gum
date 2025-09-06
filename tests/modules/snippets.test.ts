import {describe, it, expect} from 'vitest'
import {
  DEFAULT_SNIPPET,
  genVSCodeSnippetCore,
  genVSCodeSnippetDraftWidth,
  genVSCodeSnippetDraftHeight,
  genVSCodeSnippetPicture,
  genVSCodeSnippetMediaQuery,
} from '../../src/modules/snippets'

describe('snippets module', () => {
  describe('DEFAULT_SNIPPET', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_SNIPPET.args).toBe('$1')
      expect(DEFAULT_SNIPPET.scope).toEqual(['html','css','sass','scss','less','stylus'])
    })
  })

  describe('genVSCodeSnippetCore', () => {
    it('should generate snippets with correct structure', () => {
      const result = genVSCodeSnippetCore()

      // Test basic functionality
      expect(result.vw).toEqual({
        prefix: 'vw',
        body: 'vw($1,$2)$0',
        scope: DEFAULT_SNIPPET.scope.join(','),
      })

      // Ensure all main variants exist
      const expectedKeys = ['vw', 'dvw', 'lvw', 'svw', 'vwc', 'vwe', 'vh', 'vhe', 'em', 'lh', 'percent']
      expectedKeys.forEach(key => expect(result).toHaveProperty(key))
    })

    it('should handle custom names and empty names', () => {
      const result = genVSCodeSnippetCore({
        nameVw: 'customVw',
        nameEm: '', // Should be skipped
        scope: ['css'],
      })

      expect(result.customVw).toBeDefined()
      expect(result.customVw.scope).toBe('css')
      expect(result).not.toHaveProperty('vw')
      expect(result).not.toHaveProperty('em')
    })
  })

  describe('genVSCodeSnippetDraftWidth', () => {
    it('should generate correct number of snippets', () => {
      const result = genVSCodeSnippetDraftWidth({pointsSize: 3})

      // Should have 3 points × 12 function types
      expect(Object.keys(result)).toHaveLength(36)
      expect(result.vw1).toEqual({
        prefix: 'vw1',
        body: 'vw1($1)$0',
        scope: DEFAULT_SNIPPET.scope.join(','),
      })
    })

    it('should handle custom parameters', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
        firstIndex: 5,
        nameVw: 'w',
        nameVwc: '', // Should be skipped
        scope: ['css'],
      })

      expect(result.w5).toBeDefined()
      expect(result.w5.scope).toBe('css')
      expect(result).not.toHaveProperty('vwc5')
      expect(result).not.toHaveProperty('vw5')
    })

    it('should handle zero pointsSize', () => {
      const result = genVSCodeSnippetDraftWidth({pointsSize: 0})
      expect(Object.keys(result)).toHaveLength(0)
    })
  })

  describe('genVSCodeSnippetDraftHeight', () => {
    it('should generate height variants', () => {
      const result = genVSCodeSnippetDraftHeight({pointsSize: 1})

      expect(result.vh1).toEqual({
        prefix: 'vh1',
        body: 'vh1($1)$0',
        scope: DEFAULT_SNIPPET.scope.join(','),
      })

      // Ensure main height variants exist
      const expectedKeys = ['vh1', 'dvh1', 'vhc1', 'vhe1']
      expectedKeys.forEach(key => expect(result).toHaveProperty(key))
    })
  })

  describe('genVSCodeSnippetPicture', () => {
    it('should generate HTML and React variants', () => {
      const result = genVSCodeSnippetPicture({
        points: [768, 1024],
        scope: ['html', 'typescriptreact'],
      })

      expect(result.pictureNormal).toEqual({
        prefix: 'pic',
        body: [
          '<picture$1>',
          '  <source media="(max-width: 768px)" srcset="$2"/>',
          '  <img src="$3" alt="$4"/>',
          '</picture>$0',
        ],
        scope: 'html',
      })

      expect(result.pictureReact).toEqual({
        prefix: 'pic',
        body: [
          '<picture$1>',
          '  <source media="(max-width: 768px)" srcSet="$2"/>',
          '  <img src="$3" alt="$4"/>',
          '</picture>$0',
        ],
        scope: 'typescriptreact',
      })
    })

    it('should handle edge cases', () => {
      // Point offset and filtering
      const result = genVSCodeSnippetPicture({
        points: [-100, 1024, 0, 768],
        pointOffset: -1,
        scope: ['html'],
      })

      const body = result.pictureNormal?.body as string[]
      expect(body[1]).toContain('767px') // 768 - 1 (offset applied)
      expect(body[2]).toContain('src="$3"') // Last element should be img tag
    })
  })

  describe('genVSCodeSnippetMediaQuery', () => {
    it('should generate min and max media queries', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768, 1024],
        scope: ['css'],
      })

      expect(result.minP0).toEqual({
        prefix: 'min-p0',
        body: [
          '@media (width >= 768px) {',
          '  $1',
          '}$0',
        ],
        scope: 'css',
      })

      expect(result.maxP0).toEqual({
        prefix: 'max-p0',
        body: [
          '@media (width < 768px) {',
          '  $1',
          '}$0',
        ],
        scope: 'css',
      })

      // Should have 2 points × 2 types = 4 snippets
      expect(Object.keys(result)).toHaveLength(4)
    })

    it('should handle custom parameters', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        firstIndex: 2,
        pointOffset: 1,
        nameMin: 'mobile-up',
        nameMax: 'mobile-down',
        scope: ['scss'],
      })

      expect(result.minP2?.prefix).toBe('mobile-up2')
      expect(result.maxP2?.prefix).toBe('mobile-down2')
      expect(result.minP2?.body[0]).toContain('769px') // 768 + 1
      expect(result.minP2?.scope).toBe('scss')
    })
  })

  describe('edge cases and integration', () => {
    it('should handle extreme values consistently', () => {
      // Test negative firstIndex
      const result1 = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
        firstIndex: -5,
      })
      expect(result1).toHaveProperty('vw-5')

      // Test large values
      const result2 = genVSCodeSnippetDraftWidth({
        pointsSize: 1,
        firstIndex: 1000,
      })
      expect(result2).toHaveProperty('vw1000')
    })

    it('should filter invalid points correctly', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [-100, 0, 768, 1024],
      })

      // Only positive points should be used: 768, 1024
      expect(Object.keys(result)).toHaveLength(4) // 2 valid points × 2 types
    })

    it('should maintain consistent snippet structure', () => {
      const core = genVSCodeSnippetCore()
      const width = genVSCodeSnippetDraftWidth({pointsSize: 1})
      const height = genVSCodeSnippetDraftHeight({pointsSize: 1})

      // All should follow the same structure pattern
      expect(core.vw).toHaveProperty('prefix')
      expect(core.vw).toHaveProperty('body')
      expect(core.vw).toHaveProperty('scope')

      expect(width.vw1).toHaveProperty('prefix')
      expect(width.vw1).toHaveProperty('body')
      expect(width.vw1).toHaveProperty('scope')

      expect(height.vh1).toHaveProperty('prefix')
      expect(height.vh1).toHaveProperty('body')
      expect(height.vh1).toHaveProperty('scope')
    })
  })
})