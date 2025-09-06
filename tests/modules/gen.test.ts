import {describe, it, expect} from 'vitest'
import {
  DEFAULT,
  genFuncsDraftWidth,
  genFuncsDraftHeight,
  genFuncsCore,
} from '../../src/modules/gen'

describe('gen module', () => {
  describe('DEFAULT constants', () => {
    it('should have correct default values', () => {
      expect(DEFAULT.space).toBe(0)
      expect(DEFAULT.firstIndex).toBe(1)
      expect(DEFAULT.nameVw).toBe('vw')
      expect(DEFAULT.nameDvw).toBe('dvw')
      expect(DEFAULT.nameEm).toBe('em')
      expect(DEFAULT.namePercent).toBe('percent')
    })

    it('should have all required properties', () => {
      const requiredKeys = [
        'space', 'firstIndex',
        'nameEm', 'nameLh', 'namePercent',
        'nameVw', 'nameDvw', 'nameLvw', 'nameSvw',
        'nameVwc', 'nameDvwc', 'nameLvwc', 'nameSvwc',
        'nameVwe', 'nameDvwe', 'nameLvwe', 'nameSvwe',
        'nameVh', 'nameDvh', 'nameLvh', 'nameSvh',
        'nameVhc', 'nameDvhc', 'nameLvhc', 'nameSvhc',
        'nameVhe', 'nameDvhe', 'nameLvhe', 'nameSvhe',
      ]

      requiredKeys.forEach(key => {
        expect(DEFAULT).toHaveProperty(key)
      })
    })
  })

  describe('genFuncsDraftWidth', () => {
    it('should generate functions for valid points', () => {
      const result = genFuncsDraftWidth({
        points: [1000, 800, 1200],
        firstIndex: 1,
      })

      expect(result.core).toHaveProperty('vw1')
      expect(result.core).toHaveProperty('vw2')
      expect(result.core).toHaveProperty('vw3')
      expect(result.core).toHaveProperty('dvw1')
      expect(result.core).toHaveProperty('vwc1')
      expect(result.core).toHaveProperty('vwe1')
    })

    it('should filter out non-positive points', () => {
      const result = genFuncsDraftWidth({
        points: [1000, 0, -800, 1200],
        firstIndex: 1,
      })

      // Should only have functions for 1000 and 1200 (index 1 and 2)
      expect(result.core).toHaveProperty('vw1')
      expect(result.core).toHaveProperty('vw2')
      expect(result.core).not.toHaveProperty('vw3')
      expect(result.core).not.toHaveProperty('vw4')
    })

    it('should sort points in ascending order', () => {
      const result = genFuncsDraftWidth({
        points: [1200, 800, 1000],
        firstIndex: 1,
      })

      // Points should be sorted: 800(vw1), 1000(vw2), 1200(vw3)
      expect(typeof result.core.vw1).toBe('function')
      expect(typeof result.core.vw2).toBe('function')
      expect(typeof result.core.vw3).toBe('function')

      // Test that functions use correct design draft values
      expect(result.core.vw1(80)).toBe('10vw') // 80/800 * 100 = 10vw
      expect(result.core.vw2(100)).toBe('10vw') // 100/1000 * 100 = 10vw
      expect(result.core.vw3(120)).toBe('10vw') // 120/1200 * 100 = 10vw
    })

    it('should respect custom firstIndex', () => {
      const result = genFuncsDraftWidth({
        points: [1000, 800],
        firstIndex: 5,
      })

      expect(result.core).toHaveProperty('vw5')
      expect(result.core).toHaveProperty('vw6')
      expect(result.core).not.toHaveProperty('vw1')
    })

    it('should handle custom function names', () => {
      const result = genFuncsDraftWidth({
        points: [1000],
        nameVw: 'customVw',
        nameDvw: 'customDvw',
        nameVwc: '',
        nameVwe: 'customVwe',
      })

      expect(result.core).toHaveProperty('customVw1')
      expect(result.core).toHaveProperty('customDvw1')
      expect(result.core).not.toHaveProperty('vwc1') // Empty name should be skipped
      expect(result.core).toHaveProperty('customVwe1')
    })

    it('should generate functions with correct behavior', () => {
      const result = genFuncsDraftWidth({
        points: [1000],
        space: 1,
      })

      // Test vw function with space override
      expect(result.core.vw1(100)).toBe('10vw ') // Default space = 1
      expect(result.core.vw1(100, 0)).toBe('10vw') // Space override = 0

      // Test vwc function (no space parameter)
      expect(result.core.vwc1(100)).toBe('min(100px, 10vw)')

      // Test vwe function (no space parameter)
      expect(result.core.vwe1(100)).toBe('calc((100vw - 1000px) * 0.5 + 100px)')
    })

    it('should generate VSCode snippets', () => {
      const result = genFuncsDraftWidth({
        points: [1000, 800],
        firstIndex: 1,
        scope: ['css'],
        nameVw: 'vw',
        nameDvw: 'dvw',
      })

      expect(result.VSCodeSnippet).toBeDefined()
      expect(typeof result.VSCodeSnippet).toBe('object')
    })

    it('should handle empty points array', () => {
      const result = genFuncsDraftWidth({
        points: [],
      })

      expect(Object.keys(result.core)).toHaveLength(0)
      expect(result.VSCodeSnippet).toBeDefined()
    })
  })

  describe('genFuncsDraftHeight', () => {
    it('should generate functions for height variants', () => {
      const result = genFuncsDraftHeight({
        points: [800, 600],
        firstIndex: 1,
      })

      expect(result.core).toHaveProperty('vh1')
      expect(result.core).toHaveProperty('vh2')
      expect(result.core).toHaveProperty('dvh1')
      expect(result.core).toHaveProperty('vhc1')
      expect(result.core).toHaveProperty('vhe1')
    })

    it('should generate functions with correct behavior', () => {
      const result = genFuncsDraftHeight({
        points: [800],
      })

      // Test vh function
      expect(result.core.vh1(100)).toBe('12.5vh') // 100/800 * 100 = 12.5vh

      // Test vhc function
      expect(result.core.vhc1(100)).toBe('min(100px, 12.5vh)')

      // Test vhe function
      expect(result.core.vhe1(100)).toBe('calc((100vh - 800px) * 0.5 + 100px)')
    })

    it('should handle space flag for height functions', () => {
      const result = genFuncsDraftHeight({
        points: [800],
        space: 1,
      })

      expect(result.core.vh1(100)).toBe('12.5vh ')
      expect(result.core.vh1(100, 0)).toBe('12.5vh')
    })
  })

  describe('genFuncsCore', () => {
    it('should generate core functions with default names', () => {
      const result = genFuncsCore()

      expect(result.core).toHaveProperty('vw')
      expect(result.core).toHaveProperty('dvw')
      expect(result.core).toHaveProperty('vh')
      expect(result.core).toHaveProperty('vwc')
      expect(result.core).toHaveProperty('vwe')
      expect(result.core).toHaveProperty('em')
      expect(result.core).toHaveProperty('lh')
      expect(result.core).toHaveProperty('percent')
    })

    it('should handle custom function names', () => {
      const result = genFuncsCore({
        nameVw: 'customVw',
        nameEm: 'customEm',
        namePercent: 'customPercent',
      })

      expect(result.core).toHaveProperty('customVw')
      expect(result.core).toHaveProperty('customEm')
      expect(result.core).toHaveProperty('customPercent')
      expect(result.core).not.toHaveProperty('vw')
      expect(result.core).not.toHaveProperty('em')
      expect(result.core).not.toHaveProperty('percent')
    })

    it('should remove empty name functions', () => {
      const result = genFuncsCore({
        nameVw: '',
        nameEm: '',
      })

      expect(result.core).not.toHaveProperty('vw')
      expect(result.core).not.toHaveProperty('em')
      // Empty string key should not exist
      expect(Object.keys(result.core)).not.toContain('')
    })

    it('should generate functions with correct behavior', () => {
      const result = genFuncsCore({space: 1})

      // Test viewport functions with space
      expect(result.core.vw(100, 1000)).toBe('10vw ')
      expect(result.core.vw(100, 1000, 0)).toBe('10vw') // Space override

      // Test clamp functions
      expect(result.core.vwc(100, 1000)).toBe('min(100px, 10vw)')
      expect(result.core.vhc(100, 800)).toBe('min(100px, 12.5vh)')

      // Test extend functions
      expect(result.core.vwe(100, 1000)).toBe('calc((100vw - 1000px) * 0.5 + 100px)')

      // Test font functions
      expect(result.core.em(16, 16)).toBe('1em')
      expect(result.core.lh(24, 16)).toBe('1.5')

      // Test percent function
      expect(result.core.percent(25, 100)).toBe('25%')
    })

    it('should generate VSCode snippets with custom scope', () => {
      const result = genFuncsCore({
        scope: ['scss', 'css'],
        nameVw: 'vw',
      })

      expect(result.VSCodeSnippet).toBeDefined()
      expect(typeof result.VSCodeSnippet).toBe('object')
    })
  })

  describe('integration and edge cases', () => {
    it('should handle all parameters together', () => {
      const result = genFuncsDraftWidth({
        points: [1000, 800],
        firstIndex: 2,
        space: 1,
        scope: ['css', 'scss'],
        nameVw: 'w',
        nameDvw: 'dw',
        nameVwc: 'wc',
        nameVwe: 'we',
        nameLvw: '',
        nameSvw: 'sw',
      })

      expect(result.core).toHaveProperty('w2') // First index 2, first point
      expect(result.core).toHaveProperty('w3') // First index 2, second point
      expect(result.core).toHaveProperty('dw2')
      expect(result.core).toHaveProperty('wc2')
      expect(result.core).toHaveProperty('we2')
      expect(result.core).toHaveProperty('sw2')
      expect(result.core).not.toHaveProperty('lvw2') // Empty name
    })

    it('should handle large point arrays efficiently', () => {
      const points = Array.from({length: 100}, (_, i) => (i + 1) * 100)
      const result = genFuncsDraftWidth({points})

      expect(Object.keys(result.core)).toHaveLength(100 * 12) // 100 points * 12 function types
      expect(result.core).toHaveProperty('vw1')
      expect(result.core).toHaveProperty('vw100')
    })

    it('should maintain function consistency', () => {
      const coreResult = genFuncsCore()
      const draftResult = genFuncsDraftWidth({points: [1000]})

      // Core vw and draft vw1 should behave the same for same inputs
      expect(coreResult.core.vw(100, 1000)).toBe('10vw')
      expect(draftResult.core.vw1(100)).toBe('10vw')
    })
  })
})
