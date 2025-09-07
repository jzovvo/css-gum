import {describe, it, expect} from 'vitest'
import {
  DEFAULT_SNIPPET,
  genVSCodeSnippetCore,
  genVSCodeSnippetDraftWidth,
  genVSCodeSnippetDraftHeight,
} from '../../../src/modules/build-snippets/generator-functions'

describe('modules/build-snippets/generator-functions', () => {
  describe('DEFAULT_SNIPPET', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_SNIPPET.args).toBe('$1')
      expect(DEFAULT_SNIPPET.scope).toEqual(['html','css','sass','scss','less','stylus'])
      expect(DEFAULT_SNIPPET.scopePictureNormal).toEqual(['html', 'vue'])
      expect(DEFAULT_SNIPPET.scopePictureReact).toEqual(['javascriptreact', 'typescriptreact'])
    })
  })

  describe('genVSCodeSnippetCore', () => {
    it('should generate snippets with correct structure', () => {
      const result = genVSCodeSnippetCore()

      expect(result).toHaveProperty('vw')
      expect(result.vw).toHaveProperty('prefix', 'vw')
      expect(result.vw).toHaveProperty('body', 'vw($1,$2)$0')
      expect(result.vw).toHaveProperty('scope', 'html,css,sass,scss,less,stylus')
    })

    it('should handle custom names and empty names', () => {
      const result = genVSCodeSnippetCore({
        nameVw: 'customVw',
        nameDvw: '',
        namePercent: 'customPercent',
      })

      expect(result).toHaveProperty('customVw')
      expect(result).not.toHaveProperty('dvw')
      expect(result).toHaveProperty('customPercent')
    })

    it('should handle custom scope', () => {
      const result = genVSCodeSnippetCore({
        scope: ['css', 'scss'],
      })

      expect(result.vw).toHaveProperty('scope', 'css,scss')
    })
  })

  describe('genVSCodeSnippetDraftWidth', () => {
    it('should generate correct number of snippets', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 3,
      })

      expect(result).toHaveProperty('vw1')
      expect(result).toHaveProperty('vw2')
      expect(result).toHaveProperty('vw3')
      expect(result).not.toHaveProperty('vw4')
    })

    it('should handle custom parameters', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 2,
        firstIndex: 0,
        nameVw: 'custom',
        nameDvw: '',
        scope: ['css'],
      })

      expect(result).toHaveProperty('custom0')
      expect(result).toHaveProperty('custom1')
      expect(result).not.toHaveProperty('dvw0')
      expect(result.custom0).toHaveProperty('scope', 'css')
    })

    it('should handle zero pointsSize', () => {
      const result = genVSCodeSnippetDraftWidth({
        pointsSize: 0,
      })

      expect(Object.keys(result)).toHaveLength(0)
    })
  })

  describe('genVSCodeSnippetDraftHeight', () => {
    it('should generate height variants', () => {
      const result = genVSCodeSnippetDraftHeight({
        pointsSize: 2,
      })

      expect(result).toHaveProperty('vh1')
      expect(result).toHaveProperty('vh2')
      expect(result).toHaveProperty('dvh1')
      expect(result).toHaveProperty('vhc1')
      expect(result).toHaveProperty('vhe1')
    })

    it('should handle custom names', () => {
      const result = genVSCodeSnippetDraftHeight({
        pointsSize: 1,
        nameVh: 'customVh',
        nameDvh: '',
        firstIndex: 5,
      })

      expect(result).toHaveProperty('customVh5')
      expect(result).not.toHaveProperty('dvh5')
    })
  })
})