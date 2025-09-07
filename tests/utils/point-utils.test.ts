import {describe, it, expect} from 'vitest'
import {normalizePoints} from '../../src/utils/point-utils'

describe('utils/point-utils', () => {
  describe('normalizePoints', () => {
    it('should filter positive points and sort ascending', () => {
      expect(normalizePoints([0, -100, 768, 375, 1440], 'asc')).toEqual([375, 768, 1440])
      expect(normalizePoints([1440, 768, 375], 'asc')).toEqual([375, 768, 1440])
    })

    it('should filter positive points and sort descending', () => {
      expect(normalizePoints([375, 768, 1440], 'desc')).toEqual([1440, 768, 375])
      expect(normalizePoints([0, -50, 768, 375], 'desc')).toEqual([768, 375])
    })

    it('should handle empty arrays', () => {
      expect(normalizePoints([], 'asc')).toEqual([])
      expect(normalizePoints([], 'desc')).toEqual([])
    })

    it('should handle all invalid points', () => {
      expect(normalizePoints([0, -100, -50], 'asc')).toEqual([])
      expect(normalizePoints([-1, -2, -3], 'desc')).toEqual([])
    })

    it('should handle single valid point', () => {
      expect(normalizePoints([768], 'asc')).toEqual([768])
      expect(normalizePoints([768], 'desc')).toEqual([768])
    })

    it('should preserve duplicates', () => {
      expect(normalizePoints([768, 375, 768, 1440], 'asc')).toEqual([375, 768, 768, 1440])
      expect(normalizePoints([768, 375, 768, 1440], 'desc')).toEqual([1440, 768, 768, 375])
    })
  })
})