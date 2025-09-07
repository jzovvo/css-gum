import {describe, it, expect} from 'vitest'
import {genTailwindBreakpointConfig} from '../../../src/modules/build-configs/generator'

describe('modules/build-configs/generator', () => {
  describe('genTailwindBreakpointConfig', () => {
    it('should generate basic tailwind breakpoint config', () => {
      const result = genTailwindBreakpointConfig({
        points: [375, 768, 1440],
      })

      expect(result).toBe('@theme {\n  --breakpoint-p0: 375px;\n  --breakpoint-p1: 768px;\n  --breakpoint-p2: 1440px;\n}')
    })

    it('should handle edge cases', () => {
      expect(genTailwindBreakpointConfig({points: []})).toBe('')
      expect(genTailwindBreakpointConfig({points: [0, -100, 375, 768]})).toBe(
        '@theme {\n  --breakpoint-p0: 375px;\n  --breakpoint-p1: 768px;\n}',
      )
      expect(genTailwindBreakpointConfig({points: [1440, 375, 768]})).toBe(
        '@theme {\n  --breakpoint-p0: 375px;\n  --breakpoint-p1: 768px;\n  --breakpoint-p2: 1440px;\n}',
      )
    })

    it('should handle custom options', () => {
      expect(genTailwindBreakpointConfig({
        points: [375, 768],
        prefix: 'screen-',
      })).toBe('@theme {\n  --screen-0: 375px;\n  --screen-1: 768px;\n}')

      expect(genTailwindBreakpointConfig({
        points: [375, 768],
        firstIndex: 1,
      })).toBe('@theme {\n  --breakpoint-p1: 375px;\n  --breakpoint-p2: 768px;\n}')

      expect(genTailwindBreakpointConfig({
        points: [24, 48],
        unit: 'rem',
      })).toBe('@theme {\n  --breakpoint-p0: 24rem;\n  --breakpoint-p1: 48rem;\n}')

      expect(genTailwindBreakpointConfig({
        points: [375, 768],
        wrapper: 'media',
      })).toBe('@media {\n  --breakpoint-p0: 375px;\n  --breakpoint-p1: 768px;\n}')
    })

    it('should handle complex scenarios', () => {
      expect(genTailwindBreakpointConfig({
        points: [1440, 375, 768],
        prefix: 'bp-',
        firstIndex: 5,
        unit: 'em',
        wrapper: 'container',
      })).toBe('@container {\n  --bp-5: 375em;\n  --bp-6: 768em;\n  --bp-7: 1440em;\n}')

      expect(genTailwindBreakpointConfig({points: [768]})).toBe('@theme {\n  --breakpoint-p0: 768px;\n}')

      expect(genTailwindBreakpointConfig({points: [375.5, 768.25]})).toBe(
        '@theme {\n  --breakpoint-p0: 375.5px;\n  --breakpoint-p1: 768.25px;\n}',
      )

      expect(genTailwindBreakpointConfig({points: [375, 768, 375]})).toBe(
        '@theme {\n  --breakpoint-p0: 375px;\n  --breakpoint-p1: 375px;\n  --breakpoint-p2: 768px;\n}',
      )
    })

    it('should handle order parameter', () => {
      expect(genTailwindBreakpointConfig({
        points: [1440, 375, 768],
        order: 'desc',
      })).toBe('@theme {\n  --breakpoint-p0: 1440px;\n  --breakpoint-p1: 768px;\n  --breakpoint-p2: 375px;\n}')

      expect(genTailwindBreakpointConfig({
        points: [375, 768, 1440],
        order: 'asc',
      })).toBe('@theme {\n  --breakpoint-p0: 375px;\n  --breakpoint-p1: 768px;\n  --breakpoint-p2: 1440px;\n}')
    })
  })
})