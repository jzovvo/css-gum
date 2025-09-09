import {describe, it, expect} from 'vitest'
import {genVSCodeSnippetMediaQuery} from '../../../src/modules/build-snippets/rwd-media-query'

describe('modules/build-snippets/rwd-media-query', () => {
  describe('genVSCodeSnippetMediaQuery', () => {
    it('should generate bracket syntax media queries', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768, 1024],
        scope: ['css'],
      })

      expect(result).toHaveProperty('cssBracketMinP0')
      expect(result).toHaveProperty('cssBracketMaxP0')
      expect(result).toHaveProperty('cssBracketMinP1')
      expect(result).toHaveProperty('cssBracketMaxP1')

      expect(result.cssBracketMinP0.prefix).toBe('min-p0')
      expect(result.cssBracketMinP0.body).toEqual([
        '@media (width >= 768px) {',
        '  $1',
        '}',
      ])
      expect(result.cssBracketMinP0.scope).toBe('css')

      expect(result.cssBracketMaxP0.prefix).toBe('max-p0')
      expect(result.cssBracketMaxP0.body).toEqual([
        '@media (width < 768px) {',
        '  $1',
        '}',
      ])
    })

    it('should generate indent syntax media queries', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        scope: ['sass'],
      })

      expect(result).toHaveProperty('cssIndentMinP0')
      expect(result).toHaveProperty('cssIndentMaxP0')

      expect(result.cssIndentMinP0.prefix).toBe('min-p0')
      expect(result.cssIndentMinP0.body).toEqual([
        '@media (width >= 768px)',
        '  $1',
      ])
      expect(result.cssIndentMinP0.scope).toBe('sass')

      expect(result.cssIndentMaxP0.prefix).toBe('max-p0')
      expect(result.cssIndentMaxP0.body).toEqual([
        '@media (width < 768px)',
        '  $1',
      ])
    })

    it('should generate both bracket and indent syntax for mixed scope', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        scope: ['css', 'sass'],
      })

      expect(result).toHaveProperty('cssBracketMinP0')
      expect(result).toHaveProperty('cssBracketMaxP0')
      expect(result).toHaveProperty('cssIndentMinP0')
      expect(result).toHaveProperty('cssIndentMaxP0')

      expect(result.cssBracketMinP0.scope).toBe('css')
      expect(result.cssIndentMinP0.scope).toBe('sass')
    })

    it('should handle custom parameters', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        firstIndex: 2,
        snippetPrefixMin: 'mobile-up',
        snippetPrefixMax: 'mobile-down',
        pointOffset: -1,
        scope: ['scss'],
      })

      expect(result).toHaveProperty('cssBracketMinP2')
      expect(result).toHaveProperty('cssBracketMaxP2')

      expect(result.cssBracketMinP2.prefix).toBe('mobile-up2')
      expect(result.cssBracketMinP2.body).toEqual([
        '@media (width >= 767px) {',
        '  $1',
        '}',
      ])
      expect(result.cssBracketMinP2.scope).toBe('scss')

      expect(result.cssBracketMaxP2.prefix).toBe('mobile-down2')
      expect(result.cssBracketMaxP2.body).toEqual([
        '@media (width < 767px) {',
        '  $1',
        '}',
      ])
    })

    it('should filter invalid points correctly', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [-100, 0, 768, 1024],
        scope: ['css'],
      })

      expect(result).toHaveProperty('cssBracketMinP0')
      expect(result).toHaveProperty('cssBracketMinP1')
      expect(result).not.toHaveProperty('cssBracketMinP2')

      expect(result.cssBracketMinP0.body[0]).toBe('@media (width >= 768px) {')
      expect(result.cssBracketMinP1.body[0]).toBe('@media (width >= 1024px) {')
    })

    it('should handle empty points array', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [],
      })

      expect(Object.keys(result)).toHaveLength(0)
    })

    it('should handle order parameter', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [1024, 768],
        order: 'desc',
        scope: ['css'],
      })

      expect(result.cssBracketMinP0.body[0]).toBe('@media (width >= 1024px) {')
      expect(result.cssBracketMinP1.body[0]).toBe('@media (width >= 768px) {')
    })

    it('should handle single point', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        scope: ['css'],
      })

      expect(result).toHaveProperty('cssBracketMinP0')
      expect(result).toHaveProperty('cssBracketMaxP0')
      expect(result).not.toHaveProperty('cssBracketMinP1')
    })

    it('should handle multiple languages in same syntax category', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        scope: ['css', 'scss', 'less'],
      })

      expect(result).toHaveProperty('cssBracketMinP0')
      expect(result.cssBracketMinP0.scope).toBe('css,scss,less')
    })

    it('should skip empty scope categories', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        scope: ['html'], // not in bracket or indent categories
      })

      expect(Object.keys(result)).toHaveLength(0)
    })

    it('should handle custom snippet prefixes independently', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768, 1024],
        snippetPrefixMin: 'up',
        snippetPrefixMax: 'down',
        scope: ['css'],
      })

      expect(result.cssBracketMinP0.prefix).toBe('up0')
      expect(result.cssBracketMaxP0.prefix).toBe('down0')
      expect(result.cssBracketMinP1.prefix).toBe('up1')
      expect(result.cssBracketMaxP1.prefix).toBe('down1')
    })

    it('should use default prefixes when not specified', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        scope: ['css'],
      })

      expect(result.cssBracketMinP0.prefix).toBe('min-p0')
      expect(result.cssBracketMaxP0.prefix).toBe('max-p0')
    })
  })
})