import {describe, it, expect} from 'vitest'
import {Gen, Core} from '../../src/index'

describe('Gen Module', () => {
  describe('genDraftWidthFuncs', () => {
    it('should generate functions for width conversions', () => {
      const funcs = Gen.genDraftWidthFuncs({
        points: [100, 1000],
      })

      expect(funcs).toHaveProperty('vw1')
      expect(funcs).toHaveProperty('vw2')
      expect(funcs).toHaveProperty('vwc1')
      expect(funcs).toHaveProperty('vwc2')
      expect(funcs).toHaveProperty('vwe1')
      expect(funcs).toHaveProperty('vwe2')
    })

    it('should generate correct vw conversions for different breakpoints', () => {
      const funcs = Gen.genDraftWidthFuncs({
        points: [100, 1000],
      })

      expect(funcs.vw1(10)).toContain('10vw')
      expect(funcs.vw2(10)).toContain('1vw')
    })

    it('should sort points automatically', () => {
      const funcs = Gen.genDraftWidthFuncs({
        points: [100, 10000, 1000],
      })

      // Should be sorted as [100, 1000, 10000]
      expect(funcs.vw1(10)).toContain('10vw')   // 100px
      expect(funcs.vw2(10)).toContain('1vw')    // 1000px
      expect(funcs.vw3(10)).toContain('0.1vw')  // 10000px
    })

    it('should respect custom function names', () => {
      const funcs = Gen.genDraftWidthFuncs({
        points: [100, 1000],
        nameVw: 'vwNormal',
        nameVwc: 'vwClamp',
        nameVwe: 'vwExtend',
      })

      expect(funcs).toHaveProperty('vwNormal1')
      expect(funcs).toHaveProperty('vwNormal2')
      expect(funcs).toHaveProperty('vwClamp1')
      expect(funcs).toHaveProperty('vwClamp2')
      expect(funcs).toHaveProperty('vwExtend1')
      expect(funcs).toHaveProperty('vwExtend2')
    })

    it('should respect custom firstIndex', () => {
      const funcs = Gen.genDraftWidthFuncs({
        points: [100, 1000],
        firstIndex: 0,
      })

      expect(funcs).toHaveProperty('vw0')
      expect(funcs).toHaveProperty('vw1')
      expect(funcs).not.toHaveProperty('vw2')
    })

    it('should handle empty points array', () => {
      const funcs = Gen.genDraftWidthFuncs({
        points: [],
      })

      expect(Object.keys(funcs)).toHaveLength(0)
    })

    it('should skip functions with empty string names', () => {
      const funcs = Gen.genDraftWidthFuncs({
        points: [100, 1000],
        nameVw: '',
        nameVwc: 'vwClamp',
        nameVwe: '',
      })

      expect(funcs).toHaveProperty('vwClamp1')
      expect(funcs).toHaveProperty('vwClamp2')
      expect(Object.keys(funcs)).toHaveLength(2)
    })
  })

  describe('genDraftHeightFuncs', () => {
    it('should generate functions for width conversions', () => {
      const funcs = Gen.genDraftHeightFuncs({
        points: [100, 1000],
      })

      expect(funcs).toHaveProperty('vh1')
      expect(funcs).toHaveProperty('vh2')
      expect(funcs).toHaveProperty('vhc1')
      expect(funcs).toHaveProperty('vhc2')
      expect(funcs).toHaveProperty('vhe1')
      expect(funcs).toHaveProperty('vhe2')
    })

    it('should generate correct vh conversions for different breakpoints', () => {
      const funcs = Gen.genDraftHeightFuncs({
        points: [100, 1000],
      })

      expect(funcs.vh1(10)).toContain('10vh')
      expect(funcs.vh2(10)).toContain('1vh')
    })

    it('should sort points automatically', () => {
      const funcs = Gen.genDraftHeightFuncs({
        points: [100, 10000, 1000],
      })

      // Should be sorted as [100, 1000, 10000]
      expect(funcs.vh1(10)).toContain('10vh')   // 100px
      expect(funcs.vh2(10)).toContain('1vh')    // 1000px
      expect(funcs.vh3(10)).toContain('0.1vh')  // 10000px
    })

    it('should respect custom function names', () => {
      const funcs = Gen.genDraftHeightFuncs({
        points: [100, 1000],
        nameVh: 'vwNormal',
        nameVhc: 'clampHeight',
        nameVhe: 'scaleHeight',
      })

      expect(funcs).toHaveProperty('vwNormal1')
      expect(funcs).toHaveProperty('vwNormal2')
      expect(funcs).toHaveProperty('clampHeight1')
      expect(funcs).toHaveProperty('clampHeight2')
      expect(funcs).toHaveProperty('scaleHeight1')
      expect(funcs).toHaveProperty('scaleHeight2')
    })

    it('should respect custom firstIndex', () => {
      const funcs = Gen.genDraftHeightFuncs({
        points: [100, 1000],
        firstIndex: 0,
      })

      expect(funcs).toHaveProperty('vh0')
      expect(funcs).toHaveProperty('vh1')
      expect(funcs).not.toHaveProperty('vh2')
    })

    it('should handle empty points array', () => {
      const funcs = Gen.genDraftHeightFuncs({
        points: [],
      })

      expect(Object.keys(funcs)).toHaveLength(0)
    })

    it('should skip functions with empty string names', () => {
      const funcs = Gen.genDraftHeightFuncs({
        points: [100, 1000],
        nameVh: '',
        nameVhc: 'vhClamp',
        nameVhe: '',
      })

      expect(funcs).toHaveProperty('vhClamp1')
      expect(funcs).toHaveProperty('vhClamp2')
      expect(Object.keys(funcs)).toHaveLength(2)
    })
  })

  describe('genCoreFuncs', () => {
    it('should generate all core functions with default names', () => {
      const funcs = Gen.genCoreFuncs()

      expect(funcs).toHaveProperty('em')
      expect(funcs).toHaveProperty('lh')
      expect(funcs).toHaveProperty('vh')
      expect(funcs).toHaveProperty('vhc')
      expect(funcs).toHaveProperty('vhe')
      expect(funcs).toHaveProperty('vw')
      expect(funcs).toHaveProperty('vwc')
      expect(funcs).toHaveProperty('vwe')
      expect(funcs).toHaveProperty('percent')
    })

    it('should respect partial custom names and use defaults for others', () => {
      const funcs = Gen.genCoreFuncs({
        nameVw: 'customVw',
        namePercent: 'customPercent',
      })

      expect(funcs).toHaveProperty('customVw')
      expect(funcs).toHaveProperty('customPercent')
      expect(funcs).toHaveProperty('em')     // default
      expect(funcs).toHaveProperty('lh')     // default
      expect(funcs).toHaveProperty('vh')     // default
      expect(funcs).toHaveProperty('vhc')    // default
      expect(funcs).toHaveProperty('vhe')    // default
      expect(funcs).toHaveProperty('vwc')    // default
      expect(funcs).toHaveProperty('vwe')    // default
    })

    it('should return working core functions', () => {
      const funcs = Gen.genCoreFuncs()

      // Test viewport functions
      expect(funcs.vw(10, 100)).toBe('10vw')
      expect(funcs.vh(10, 100)).toBe('10vh')
      expect(funcs.vwc(10, 100)).toBe('min(10px, 10vw)')
      expect(funcs.vhc(10, 100)).toBe('min(10px, 10vh)')
      expect(funcs.vwe(10, 100)).toBe('calc((100vw - 100px) * 0.5 + 10px)')
      expect(funcs.vhe(10, 100)).toBe('calc((100vh - 100px) * 0.5 + 10px)')

      // Test utility functions
      expect(funcs.em(24, 16)).toBe('1.5em')
      expect(funcs.lh(24, 16)).toBe('1.5')
      expect(funcs.percent(10, 100)).toBe('10%')
    })

    it('should return the exact same functions as core imports', () => {
      const funcs = Gen.genCoreFuncs()

      expect(funcs.vw).toBe(Core.vw)
      expect(funcs.vh).toBe(Core.vh)
      expect(funcs.vwc).toBe(Core.vwc)
      expect(funcs.vhc).toBe(Core.vhc)
      expect(funcs.vwe).toBe(Core.vwe)
      expect(funcs.vhe).toBe(Core.vhe)
      expect(funcs.em).toBe(Core.em)
      expect(funcs.lh).toBe(Core.lh)
      expect(funcs.percent).toBe(Core.percent)
    })

    it('should remove empty string keys', () => {
      const funcs = Gen.genCoreFuncs({
        nameVw: '',
        nameVh: 'vhh',
        namePercent: '',
      })

      expect(funcs).toEqual(expect.not.objectContaining({'': expect.anything()}))
      expect(funcs).toHaveProperty('vhh')
      expect(funcs).toHaveProperty('vwc')  // default
      expect(funcs).toHaveProperty('vhc')  // default
      expect(funcs).toHaveProperty('vwe')  // default
      expect(funcs).toHaveProperty('vhe')  // default
      expect(funcs).toHaveProperty('em')   // default
      expect(funcs).toHaveProperty('lh')   // default
      expect(Object.keys(funcs)).toHaveLength(7)  // 9 total - 2 empty = 7
    })
  })

  describe('Generated function behavior', () => {
    it('should return valid CSS values', () => {
      const widthFuncs = Gen.genDraftWidthFuncs({
        points: [100, 1000],
        firstIndex: 1,
      })
      const result1 = widthFuncs.vw1(100)
      const result2 = widthFuncs.vwc1(100)
      const result3 = widthFuncs.vwe1(100)

      expect(result1).toMatch(/^\d+(\.\d+)?vw$/)
      expect(result2).toMatch(/^(min|max)\(\d+px,\s*-?\d+(\.\d+)?vw\)$/)
      expect(result3).toMatch(/^calc\(.+\)$/)
    })
  })
})
