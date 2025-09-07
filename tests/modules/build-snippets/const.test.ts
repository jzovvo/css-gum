import {describe, it, expect} from 'vitest'
import {
  CSS_SNIPPET_SCOPE_SYNTAX_INDENT,
  CSS_SNIPPET_SCOPE_SYNTAX_BRACKET,
  CSS_SNIPPET_SCOPE_REACT,
  DEFAULT_SNIPPET,
} from '../../../src/modules/build-snippets/const'

describe('modules/build-snippets/const', () => {
  describe('CSS scope constants', () => {
    it('should have correct indent syntax scopes', () => {
      expect(CSS_SNIPPET_SCOPE_SYNTAX_INDENT).toEqual(['sass', 'stylus'])
    })

    it('should have correct bracket syntax scopes', () => {
      expect(CSS_SNIPPET_SCOPE_SYNTAX_BRACKET).toEqual(['css', 'scss', 'less'])
    })

    it('should have correct React scopes', () => {
      expect(CSS_SNIPPET_SCOPE_REACT).toEqual(['javascriptreact', 'typescriptreact'])
    })
  })

  describe('DEFAULT_SNIPPET constants', () => {
    it('should have correct default args', () => {
      expect(DEFAULT_SNIPPET.args).toBe('$1')
    })

    it('should have correct CSS scope combining all CSS types', () => {
      expect(DEFAULT_SNIPPET.scopeCss).toEqual([
        'html',
        'sass', 'stylus', // indent syntax
        'css', 'scss', 'less', // bracket syntax
      ])
    })

    it('should have correct picture normal scope', () => {
      expect(DEFAULT_SNIPPET.scopePictureNormal).toEqual(['html', 'vue'])
    })

    it('should have correct picture React scope', () => {
      expect(DEFAULT_SNIPPET.scopePictureReact).toEqual(['javascriptreact', 'typescriptreact'])
    })
  })

  describe('scope composition', () => {
    it('should compose CSS scope from individual constants', () => {
      const expectedCssScope = [
        'html',
        ...CSS_SNIPPET_SCOPE_SYNTAX_INDENT,
        ...CSS_SNIPPET_SCOPE_SYNTAX_BRACKET,
      ]
      expect(DEFAULT_SNIPPET.scopeCss).toEqual(expectedCssScope)
    })

    it('should compose React scope from React constant', () => {
      expect(DEFAULT_SNIPPET.scopePictureReact).toEqual([...CSS_SNIPPET_SCOPE_REACT])
    })
  })
})