import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {Gen, Core, Snippet} from '../../src/index.node'
import fs from 'fs'
import path from 'path'
import {tmpdir} from 'os'

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

    it('should return the exact same functions as core imports', () => {
      const funcs = Gen.genFuncsCore()

      expect(funcs.core.vw).toBe(Core.vw)
      expect(funcs.core.vh).toBe(Core.vh)
      expect(funcs.core.vwc).toBe(Core.vwc)
      expect(funcs.core.vhc).toBe(Core.vhc)
      expect(funcs.core.vwe).toBe(Core.vwe)
      expect(funcs.core.vhe).toBe(Core.vhe)
      expect(funcs.core.em).toBe(Core.em)
      expect(funcs.core.lh).toBe(Core.lh)
      expect(funcs.core.percent).toBe(Core.percent)
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

  describe('genVSCodeSnippet functionality', () => {
    let tempDir: string
    let testFile: string

    beforeEach(() => {
      tempDir = path.join(tmpdir(), '.vscode-test-gen')
      testFile = path.join(tempDir, 'css.code-snippets')

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, {recursive: true})
      }
    })

    afterEach(() => {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, {recursive: true, force: true})
      }
    })

    it('should generate and write VSCode snippets for width functions', () => {
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: [375, 768],
        firstIndex: 1,
      })
      const result = widthFuncs.VSCodeSnippet

      expect(result).toBeDefined()

      Snippet.writeSnippetsToFiles(result, [testFile])
      expect(fs.existsSync(testFile)).toBe(true)

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('vw1')
      expect(content).toHaveProperty('vw2')
      expect(content).toHaveProperty('vwc1')
      expect(content).toHaveProperty('vwc2')
      expect(content).toHaveProperty('vwe1')
      expect(content).toHaveProperty('vwe2')


      expect(content.vw1).toHaveProperty('prefix')
      expect(content.vw1).toHaveProperty('body')
      expect(content.vw1.prefix).toBe('vw1')
      expect(content.vw1.body).toBe('vw1($1)')
    })

    it('should generate and write VSCode snippets for height functions', () => {
      const heightFuncs = Gen.genFuncsDraftHeight({
        points: [667, 1080],
        firstIndex: 1,
      })
      const result = heightFuncs.VSCodeSnippet

      expect(result).toBeDefined()

      Snippet.writeSnippetsToFiles(result, [testFile])
      expect(fs.existsSync(testFile)).toBe(true)

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('vh1')
      expect(content).toHaveProperty('vh2')
      expect(content).toHaveProperty('vhc1')
      expect(content).toHaveProperty('vhc2')
      expect(content).toHaveProperty('vhe1')
      expect(content).toHaveProperty('vhe2')


      expect(content.vh1).toHaveProperty('prefix')
      expect(content.vh1).toHaveProperty('body')
      expect(content.vh1.prefix).toBe('vh1')
      expect(content.vh1.body).toBe('vh1($1)')
    })

    it('should generate and write VSCode snippets for core functions', () => {
      const coreFuncs = Gen.genFuncsCore()
      const result = coreFuncs.VSCodeSnippet

      expect(result).toBeDefined()

      Snippet.writeSnippetsToFiles(result, [testFile])
      expect(fs.existsSync(testFile)).toBe(true)

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('vw')
      expect(content).toHaveProperty('vh')
      expect(content).toHaveProperty('em')
      expect(content).toHaveProperty('percent')


      expect(content.vw).toHaveProperty('prefix')
      expect(content.vw).toHaveProperty('body')
      expect(content.vw.prefix).toBe('vw')
      expect(content.vw.body).toBe('vw($1,$2)')
      expect(content.em.body).toBe('em($1,$2)')
      expect(content.percent.body).toBe('percent($1,$2)')
    })

    it('should handle custom names when generating snippets', () => {
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: [375],
        nameVw: 'customVw',
        nameVwc: 'customVwc',
        nameVwe: 'customVwe',
      })
      const result = widthFuncs.VSCodeSnippet

      expect(result).toBeDefined()

      Snippet.writeSnippetsToFiles(result, [testFile])
      expect(fs.existsSync(testFile)).toBe(true)

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('customVw1')
      expect(content).toHaveProperty('customVwc1')
      expect(content).toHaveProperty('customVwe1')

      expect(content.customVw1.prefix).toBe('customVw1')
      expect(content.customVwc1.prefix).toBe('customVwc1')
      expect(content.customVwe1.prefix).toBe('customVwe1')

      expect(content.customVw1.body).toBe('customVw1($1)')
      expect(content.customVwc1.body).toBe('customVwc1($1)')
      expect(content.customVwe1.body).toBe('customVwe1($1)')
    })

    it('should handle multiple output files', () => {
      const file1 = path.join(tempDir, 'file1.code-snippets')
      const file2 = path.join(tempDir, 'file2.code-snippets')
      const coreFuncs = Gen.genFuncsCore()
      const result = coreFuncs.VSCodeSnippet

      expect(result).toBeDefined()

      Snippet.writeSnippetsToFiles(result, [file1, file2])
      expect(fs.existsSync(file1)).toBe(true)
      expect(fs.existsSync(file2)).toBe(true)

      const content1 = JSON.parse(fs.readFileSync(file1, 'utf-8'))
      const content2 = JSON.parse(fs.readFileSync(file2, 'utf-8'))

      expect(content1).toHaveProperty('vw')
      expect(content2).toHaveProperty('vw')
    })

    it('should merge with existing snippets in file', () => {

      const existingSnippets = {
        customSnippet: {
          prefix: 'custom',
          body: 'custom()',
        },
      }

      fs.writeFileSync(testFile, JSON.stringify(existingSnippets, null, 2))

      const coreFuncs = Gen.genFuncsCore()
      const result = coreFuncs.VSCodeSnippet

      Snippet.writeSnippetsToFiles(result, [testFile])

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))


      expect(content).toHaveProperty('customSnippet')
      expect(content).toHaveProperty('vw')
      expect(content).toHaveProperty('vh')
      expect(content.customSnippet.body).toBe('custom()')
    })

    it('should handle empty output array gracefully', () => {
      const coreFuncs = Gen.genFuncsCore()
      const result = coreFuncs.VSCodeSnippet

      expect(() => {
        Snippet.writeSnippetsToFiles(result, [])
      }).not.toThrow()
    })

    it('should skip functions with empty string names', () => {
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: [375],
        nameVw: '',
        nameVwe: '',
      })
      const result = widthFuncs.VSCodeSnippet

      expect(result).toBeDefined()

      Snippet.writeSnippetsToFiles(result, [testFile])
      expect(fs.existsSync(testFile)).toBe(true)

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('vwc1')
      expect(content).not.toHaveProperty('vw1')
      expect(content).not.toHaveProperty('vwe1')
    })
  })
})
