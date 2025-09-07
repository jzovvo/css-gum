import {describe, it, expect} from 'vitest'
import {genVSCodeSnippetMediaQuery} from '../../../src/modules/build-snippets/rwd-media-query'

describe('modules/build-snippets/rwd-media-query', () => {
  describe('genVSCodeSnippetMediaQuery', () => {
    it('should generate min and max media queries', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768, 1024],
        scope: ['css'],
      })

      expect(result).toHaveProperty('minP0')
      expect(result).toHaveProperty('maxP0')
      expect(result).toHaveProperty('minP1')
      expect(result).toHaveProperty('maxP1')

      expect(result.minP0.prefix).toBe('min-p0')
      expect(result.minP0.body).toEqual([
        '@media (width >= 768px) {',
        '  $1',
        '}$0',
      ])
      expect(result.minP0.scope).toBe('css')

      expect(result.maxP0.prefix).toBe('max-p0')
      expect(result.maxP0.body).toEqual([
        '@media (width < 768px) {',
        '  $1',
        '}$0',
      ])
    })

    it('should handle custom parameters', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
        firstIndex: 2,
        nameMin: 'mobile-up',
        nameMax: 'mobile-down',
        pointOffset: -1,
        scope: ['scss'],
      })

      expect(result).toHaveProperty('minP2')
      expect(result).toHaveProperty('maxP2')

      expect(result.minP2.prefix).toBe('mobile-up2')
      expect(result.minP2.body).toEqual([
        '@media (width >= 767px) {',
        '  $1',
        '}$0',
      ])
      expect(result.minP2.scope).toBe('scss')

      expect(result.maxP2.prefix).toBe('mobile-down2')
      expect(result.maxP2.body).toEqual([
        '@media (width < 767px) {',
        '  $1',
        '}$0',
      ])
    })

    it('should filter invalid points correctly', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [-100, 0, 768, 1024],
      })

      expect(result).toHaveProperty('minP0')
      expect(result).toHaveProperty('minP1')
      expect(result).not.toHaveProperty('minP2')

      expect(result.minP0.body[0]).toBe('@media (width >= 768px) {')
      expect(result.minP1.body[0]).toBe('@media (width >= 1024px) {')
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
      })

      expect(result.minP0.body[0]).toBe('@media (width >= 1024px) {')
      expect(result.minP1.body[0]).toBe('@media (width >= 768px) {')
    })

    it('should handle single point', () => {
      const result = genVSCodeSnippetMediaQuery({
        points: [768],
      })

      expect(result).toHaveProperty('minP0')
      expect(result).toHaveProperty('maxP0')
      expect(result).not.toHaveProperty('minP1')
    })
  })
})