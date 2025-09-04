import {describe, it, expect} from 'vitest'
import {Gen, Core} from '../../src/index.node'

describe('Gen Module', () => {
  describe('genFuncsDraftWidth', () => {
    it('should generate functions for width conversions', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [100, 1000],
      })

      expect(funcs.core).toHaveProperty('vw1')
      expect(funcs.core).toHaveProperty('vw2')
      expect(funcs.core).toHaveProperty('vwc1')
      expect(funcs.core).toHaveProperty('vwc2')
      expect(funcs.core).toHaveProperty('vwe1')
      expect(funcs.core).toHaveProperty('vwe2')
    })

    it('should generate correct vw conversions for different breakpoints', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [100, 1000],
      })

      expect(funcs.core.vw1(10)).toContain('10vw')
      expect(funcs.core.vw2(10)).toContain('1vw')
    })

    it('should sort points automatically', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [100, 10000, 1000],
      })


      expect(funcs.core.vw1(10)).toContain('10vw')
      expect(funcs.core.vw2(10)).toContain('1vw')
      expect(funcs.core.vw3(10)).toContain('0.1vw')
    })

    it('should respect custom function names', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [100, 1000],
        nameVw: 'vwNormal',
        nameVwc: 'vwClamp',
        nameVwe: 'vwExtend',
      })

      expect(funcs.core).toHaveProperty('vwNormal1')
      expect(funcs.core).toHaveProperty('vwNormal2')
      expect(funcs.core).toHaveProperty('vwClamp1')
      expect(funcs.core).toHaveProperty('vwClamp2')
      expect(funcs.core).toHaveProperty('vwExtend1')
      expect(funcs.core).toHaveProperty('vwExtend2')
    })

    it('should return empty object when all points are invalid', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [0, -100, -50],
      })

      expect(Object.keys(funcs.core)).toHaveLength(0)
    })

    it('should respect custom firstIndex', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [100, 1000],
        firstIndex: 0,
      })

      expect(funcs.core).toHaveProperty('vw0')
      expect(funcs.core).toHaveProperty('vw1')
      expect(funcs.core).not.toHaveProperty('vw2')
    })

    it('should handle empty points array', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [],
      })

      expect(Object.keys(funcs.core)).toHaveLength(0)
    })

    it('should skip functions with empty string names', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [100, 1000],
        nameVw: '',
        nameVwc: 'vwClamp',
        nameVwe: '',
      })

      expect(funcs.core).toHaveProperty('vwClamp1')
      expect(funcs.core).toHaveProperty('vwClamp2')
      expect(Object.keys(funcs.core)).toHaveLength(2)
    })
  })

  describe('genFuncsDraftHeight', () => {
    it('should generate functions for width conversions', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [100, 1000],
      })

      expect(funcs.core).toHaveProperty('vh1')
      expect(funcs.core).toHaveProperty('vh2')
      expect(funcs.core).toHaveProperty('vhc1')
      expect(funcs.core).toHaveProperty('vhc2')
      expect(funcs.core).toHaveProperty('vhe1')
      expect(funcs.core).toHaveProperty('vhe2')
    })

    it('should generate correct vh conversions for different breakpoints', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [100, 1000],
      })

      expect(funcs.core.vh1(10)).toContain('10vh')
      expect(funcs.core.vh2(10)).toContain('1vh')
    })

    it('should sort points automatically', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [100, 10000, 1000],
      })


      expect(funcs.core.vh1(10)).toContain('10vh')
      expect(funcs.core.vh2(10)).toContain('1vh')
      expect(funcs.core.vh3(10)).toContain('0.1vh')
    })

    it('should respect custom function names', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [100, 1000],
        nameVh: 'vwNormal',
        nameVhc: 'clampHeight',
        nameVhe: 'scaleHeight',
      })

      expect(funcs.core).toHaveProperty('vwNormal1')
      expect(funcs.core).toHaveProperty('vwNormal2')
      expect(funcs.core).toHaveProperty('clampHeight1')
      expect(funcs.core).toHaveProperty('clampHeight2')
      expect(funcs.core).toHaveProperty('scaleHeight1')
      expect(funcs.core).toHaveProperty('scaleHeight2')
    })

    it('should respect custom firstIndex', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [100, 1000],
        firstIndex: 0,
      })

      expect(funcs.core).toHaveProperty('vh0')
      expect(funcs.core).toHaveProperty('vh1')
      expect(funcs.core).not.toHaveProperty('vh2')
    })

    it('should handle empty points array', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [],
      })

      expect(Object.keys(funcs.core)).toHaveLength(0)
    })

    it('should skip functions with empty string names', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [100, 1000],
        nameVh: '',
        nameVhc: 'vhClamp',
        nameVhe: '',
      })

      expect(funcs.core).toHaveProperty('vhClamp1')
      expect(funcs.core).toHaveProperty('vhClamp2')
      expect(Object.keys(funcs.core)).toHaveLength(2)
    })

    it('should return empty object when all height points are invalid', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [0, -100, -50],
      })

      expect(Object.keys(funcs.core)).toHaveLength(0)
    })
  })

  describe('genFuncsCore', () => {
    it('should generate all core functions with default names', () => {
      const funcs = Gen.genFuncsCore()

      expect(funcs.core).toHaveProperty('em')
      expect(funcs.core).toHaveProperty('lh')
      expect(funcs.core).toHaveProperty('vh')
      expect(funcs.core).toHaveProperty('vhc')
      expect(funcs.core).toHaveProperty('vhe')
      expect(funcs.core).toHaveProperty('vw')
      expect(funcs.core).toHaveProperty('vwc')
      expect(funcs.core).toHaveProperty('vwe')
      expect(funcs.core).toHaveProperty('percent')
    })

    it('should respect partial custom names and use defaults for others', () => {
      const funcs = Gen.genFuncsCore({
        nameVw: 'customVw',
        namePercent: 'customPercent',
      })

      expect(funcs.core).toHaveProperty('customVw')
      expect(funcs.core).toHaveProperty('customPercent')
      expect(funcs.core).toHaveProperty('em')
      expect(funcs.core).toHaveProperty('lh')
      expect(funcs.core).toHaveProperty('vh')
      expect(funcs.core).toHaveProperty('vhc')
      expect(funcs.core).toHaveProperty('vhe')
      expect(funcs.core).toHaveProperty('vwc')
      expect(funcs.core).toHaveProperty('vwe')
    })

    it('should return working core functions', () => {
      const funcs = Gen.genFuncsCore()


      expect(funcs.core.vw(10, 100)).toBe('10vw')
      expect(funcs.core.vh(10, 100)).toBe('10vh')
      expect(funcs.core.vwc(10, 100)).toBe('min(10px, 10vw)')
      expect(funcs.core.vhc(10, 100)).toBe('min(10px, 10vh)')
      expect(funcs.core.vwe(10, 100)).toBe('calc((100vw - 100px) * 0.5 + 10px)')
      expect(funcs.core.vhe(10, 100)).toBe('calc((100vh - 100px) * 0.5 + 10px)')


      expect(funcs.core.em(24, 16)).toBe('1.5em')
      expect(funcs.core.lh(24, 16)).toBe('1.5')
      expect(funcs.core.percent(10, 100)).toBe('10%')
    })

    it('should have same functionality as core imports', () => {
      const funcs = Gen.genFuncsCore()

      expect(funcs.core.vw(10, 100)).toBe(Core.vw(10, 100))
      expect(funcs.core.vh(10, 100)).toBe(Core.vh(10, 100))
      expect(funcs.core.vwc(10, 100)).toBe(Core.vwc(10, 100))
      expect(funcs.core.vhc(10, 100)).toBe(Core.vhc(10, 100))
      expect(funcs.core.vwe(10, 100)).toBe(Core.vwe(10, 100))
      expect(funcs.core.vhe(10, 100)).toBe(Core.vhe(10, 100))
      expect(funcs.core.em(24, 16)).toBe(Core.em(24, 16))
      expect(funcs.core.lh(24, 16)).toBe(Core.lh(24, 16))
      expect(funcs.core.percent(10, 100)).toBe(Core.percent(10, 100))
    })

    it('should remove empty string keys', () => {
      const funcs = Gen.genFuncsCore({
        nameVw: '',
        nameVh: 'vhh',
        namePercent: '',
      })

      expect(funcs.core).toEqual(expect.not.objectContaining({'': expect.anything()}))
      expect(funcs.core).toHaveProperty('vhh')
      expect(funcs.core).toHaveProperty('vwc')
      expect(funcs.core).toHaveProperty('vhc')
      expect(funcs.core).toHaveProperty('vwe')
      expect(funcs.core).toHaveProperty('vhe')
      expect(funcs.core).toHaveProperty('em')
      expect(funcs.core).toHaveProperty('lh')
      expect(Object.keys(funcs.core)).toHaveLength(7)
    })
  })

  describe('Generated function behavior', () => {
    it('should return valid CSS values', () => {
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: [100, 1000],
        firstIndex: 1,
      })
      const result1 = widthFuncs.core.vw1(100)
      const result2 = widthFuncs.core.vwc1(100)
      const result3 = widthFuncs.core.vwe1(100)

      expect(result1).toMatch(/^\d+(\.\d+)?vw$/)
      expect(result2).toMatch(/^(min|max)\(\d+px,\s*-?\d+(\.\d+)?vw\)$/)
      expect(result3).toMatch(/^calc\(.+\)$/)
    })
  })

  describe('Space parameter in generation functions', () => {
    it('should use space parameter in genFuncsDraftWidth', () => {
      const funcsWithSpace = Gen.genFuncsDraftWidth({
        points: [100],
        space: 1,
      })
      const funcsWithoutSpace = Gen.genFuncsDraftWidth({
        points: [100],
        space: 0,
      })

      expect(funcsWithSpace.core.vw1(10)).toBe('10vw ')
      expect(funcsWithoutSpace.core.vw1(10)).toBe('10vw')
    })

    it('should allow space override in generated width functions', () => {
      const funcs = Gen.genFuncsDraftWidth({
        points: [100],
        space: 1,
      })

      expect(funcs.core.vw1(10)).toBe('10vw ')
      expect(funcs.core.vw1(10, 0)).toBe('10vw')
      expect(funcs.core.vw1(10, 1)).toBe('10vw ')
    })

    it('should use space parameter in genFuncsDraftHeight', () => {
      const funcsWithSpace = Gen.genFuncsDraftHeight({
        points: [100],
        space: 1,
      })
      const funcsWithoutSpace = Gen.genFuncsDraftHeight({
        points: [100],
        space: 0,
      })

      expect(funcsWithSpace.core.vh1(10)).toBe('10vh ')
      expect(funcsWithoutSpace.core.vh1(10)).toBe('10vh')
    })

    it('should allow space override in generated height functions', () => {
      const funcs = Gen.genFuncsDraftHeight({
        points: [100],
        space: 1,
      })

      expect(funcs.core.vh1(10)).toBe('10vh ')
      expect(funcs.core.vh1(10, 0)).toBe('10vh')
      expect(funcs.core.vh1(10, 1)).toBe('10vh ')
    })

    it('should use space parameter in genFuncsCore', () => {
      const funcsWithSpace = Gen.genFuncsCore({space: 1})
      const funcsWithoutSpace = Gen.genFuncsCore({space: 0})

      expect(funcsWithSpace.core.vw(10, 100)).toBe('10vw ')
      expect(funcsWithoutSpace.core.vw(10, 100)).toBe('10vw')
      expect(funcsWithSpace.core.vh(10, 100)).toBe('10vh ')
      expect(funcsWithoutSpace.core.vh(10, 100)).toBe('10vh')
    })

    it('should allow space override in core wrapper functions', () => {
      const funcs = Gen.genFuncsCore({space: 0})

      expect(funcs.core.vw(10, 100)).toBe('10vw')
      expect(funcs.core.vw(10, 100, 1)).toBe('10vw ')
      expect(funcs.core.vh(10, 100, 1)).toBe('10vh ')
    })
  })

  describe('VSCode Snippet Generation', () => {
    it('should generate snippet objects for width functions', () => {
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: [400, 800],
        firstIndex: 1,
      })
      const result = widthFuncs.VSCodeSnippet

      expect(result).toBeDefined()
      expect(result).toHaveProperty('vw1')
      expect(result).toHaveProperty('vw2')
      expect(result).toHaveProperty('vwc1')
      expect(result).toHaveProperty('vwc2')
      expect(result).toHaveProperty('vwe1')
      expect(result).toHaveProperty('vwe2')

      expect(result.vw1).toHaveProperty('prefix', 'vw1')
      expect(result.vw1).toHaveProperty('body', 'vw1($1)$0')
      expect(result.vw1).toHaveProperty('scope', 'html,css,sass,scss,less,stylus')
    })

    it('should generate snippet objects for height functions', () => {
      const heightFuncs = Gen.genFuncsDraftHeight({
        points: [500, 1000],
        firstIndex: 1,
      })
      const result = heightFuncs.VSCodeSnippet

      expect(result).toBeDefined()
      expect(result).toHaveProperty('vh1')
      expect(result).toHaveProperty('vh2')
      expect(result).toHaveProperty('vhc1')
      expect(result).toHaveProperty('vhc2')
      expect(result).toHaveProperty('vhe1')
      expect(result).toHaveProperty('vhe2')

      expect(result.vh1).toHaveProperty('prefix', 'vh1')
      expect(result.vh1).toHaveProperty('body', 'vh1($1)$0')
      expect(result.vh1).toHaveProperty('scope', 'html,css,sass,scss,less,stylus')
    })

    it('should generate snippet objects for core functions', () => {
      const coreFuncs = Gen.genFuncsCore()
      const result = coreFuncs.VSCodeSnippet

      expect(result).toBeDefined()
      expect(result).toHaveProperty('vw')
      expect(result).toHaveProperty('vh')
      expect(result).toHaveProperty('em')
      expect(result).toHaveProperty('percent')

      expect(result.vw).toHaveProperty('prefix', 'vw')
      expect(result.vw).toHaveProperty('body', 'vw($1,$2)$0')
      expect(result.vw).toHaveProperty('scope', 'html,css,sass,scss,less,stylus')
      expect(result.em).toHaveProperty('body', 'em($1,$2)$0')
      expect(result.em).toHaveProperty('scope', 'html,css,sass,scss,less,stylus')
      expect(result.percent).toHaveProperty('body', 'percent($1,$2)$0')
      expect(result.percent).toHaveProperty('scope', 'html,css,sass,scss,less,stylus')
    })

    it('should handle custom names in snippet generation', () => {
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: [400],
        nameVw: 'customVw',
        nameVwc: 'customVwc',
        nameVwe: 'customVwe',
      })
      const result = widthFuncs.VSCodeSnippet

      expect(result).toHaveProperty('customVw1')
      expect(result).toHaveProperty('customVwc1')
      expect(result).toHaveProperty('customVwe1')

      expect(result.customVw1.prefix).toBe('customVw1')
      expect(result.customVwc1.prefix).toBe('customVwc1')
      expect(result.customVwe1.prefix).toBe('customVwe1')

      expect(result.customVw1.body).toBe('customVw1($1)$0')
      expect(result.customVw1.scope).toBe('html,css,sass,scss,less,stylus')
      expect(result.customVwc1.body).toBe('customVwc1($1)$0')
      expect(result.customVwc1.scope).toBe('html,css,sass,scss,less,stylus')
      expect(result.customVwe1.body).toBe('customVwe1($1)$0')
      expect(result.customVwe1.scope).toBe('html,css,sass,scss,less,stylus')
    })

    it('should skip functions with empty string names', () => {
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: [400],
        nameVw: '',
        nameVwe: '',
      })
      const result = widthFuncs.VSCodeSnippet

      expect(result).toHaveProperty('vwc1')
      expect(result).not.toHaveProperty('vw1')
      expect(result).not.toHaveProperty('vwe1')
    })

    it('should use custom scope in gen functions', () => {
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: [400],
        scope: 'css,scss',
      })
      const heightFuncs = Gen.genFuncsDraftHeight({
        points: [800],
        scope: 'less',
      })
      const coreFuncs = Gen.genFuncsCore({
        scope: 'stylus',
      })

      expect(widthFuncs.VSCodeSnippet.vw1.scope).toBe('css,scss')
      expect(heightFuncs.VSCodeSnippet.vh1.scope).toBe('less')
      expect(coreFuncs.VSCodeSnippet.vw.scope).toBe('stylus')
    })
  })
})
