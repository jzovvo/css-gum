import {describe, it, expect} from 'vitest'
import {Gen} from '../../src/index'

describe('Gen Module', () => {
  describe('genDraftWidthFuncs', () => {
    it('should generate functions for width conversions', () => {
      const funcs = Gen.genDraftWidthFuncs({
        points: [100, 1000],
      })

      expect(funcs).toHaveProperty('vw1')
      expect(funcs).toHaveProperty('vw2')
      expect(funcs).toHaveProperty('lvw1')
      expect(funcs).toHaveProperty('lvw2')
      expect(funcs).toHaveProperty('ddws1')
      expect(funcs).toHaveProperty('ddws2')
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
        nameVw: 'mobile',
        nameLvw: 'clampWidth',
        nameDdws: 'scaleWidth',
      })

      expect(funcs).toHaveProperty('mobile1')
      expect(funcs).toHaveProperty('mobile2')
      expect(funcs).toHaveProperty('clampWidth1')
      expect(funcs).toHaveProperty('clampWidth2')
      expect(funcs).toHaveProperty('scaleWidth1')
      expect(funcs).toHaveProperty('scaleWidth2')
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
  })

  describe('genDraftHeightFuncs', () => {
    it('should generate functions for width conversions', () => {
      const funcs = Gen.genDraftHeightFuncs({
        points: [100, 1000],
      })

      expect(funcs).toHaveProperty('vh1')
      expect(funcs).toHaveProperty('vh2')
      expect(funcs).toHaveProperty('lvh1')
      expect(funcs).toHaveProperty('lvh2')
      expect(funcs).toHaveProperty('ddhs1')
      expect(funcs).toHaveProperty('ddhs2')
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
        nameVh: 'mobile',
        nameLvh: 'clampHeight',
        nameDdhs: 'scaleHeight',
      })

      expect(funcs).toHaveProperty('mobile1')
      expect(funcs).toHaveProperty('mobile2')
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
  })

  describe('Generated function behavior', () => {
    it('should return valid CSS values', () => {
      const widthFuncs = Gen.genDraftWidthFuncs({
        points: [100, 1000],
        firstIndex: 1,
      })

      const result1 = widthFuncs.vw1(100)
      const result2 = widthFuncs.lvw1(100)
      const result3 = widthFuncs.ddws1(100)

      expect(result1).toMatch(/^\d+(\.\d+)?vw$/)
      expect(result2).toMatch(/^(min|max)\(\d+px,\s*-?\d+(\.\d+)?vw\)$/)
      expect(result3).toMatch(/^calc\(.+\)$/)
    })
  })
})
