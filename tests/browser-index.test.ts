import {describe, it, expect} from 'vitest'
import {Core, Gen, Util, Snippet} from '../src/index.browser'

describe('Browser Entry Point', () => {
  describe('Module Exports', () => {
    it('should export Core module with all functions', () => {
      expect(Core.vw).toBeTypeOf('function')
      expect(Core.vh).toBeTypeOf('function')
      expect(Core.vwc).toBeTypeOf('function')
      expect(Core.vhc).toBeTypeOf('function')
      expect(Core.vwe).toBeTypeOf('function')
      expect(Core.vhe).toBeTypeOf('function')
      expect(Core.percent).toBeTypeOf('function')
      expect(Core.em).toBeTypeOf('function')
      expect(Core.lh).toBeTypeOf('function')
    })

    it('should export Gen module with generation functions', () => {
      expect(Gen.genFuncsDraftWidth).toBeTypeOf('function')
      expect(Gen.genFuncsDraftHeight).toBeTypeOf('function')
      expect(Gen.genFuncsCore).toBeTypeOf('function')
    })

    it('should export Util module with utility functions', () => {
      expect(Util.percent).toBeTypeOf('function')
      expect(Util.pxToVw).toBeTypeOf('function')
      expect(Util.pxToVh).toBeTypeOf('function')
      expect(Util.cssPxToVw).toBeTypeOf('function')
      expect(Util.cssPxToVh).toBeTypeOf('function')
      expect(Util.cssPercent).toBeTypeOf('function')
      expect(Util.cssPxToVwc).toBeTypeOf('function')
      expect(Util.cssPxToVhc).toBeTypeOf('function')
      expect(Util.cssPxToVwe).toBeTypeOf('function')
      expect(Util.cssPxToVhe).toBeTypeOf('function')
      expect(Util.cssEm).toBeTypeOf('function')
      expect(Util.cssLh).toBeTypeOf('function')
    })

    it('should export Snippet module with snippet functions', () => {
      expect(Snippet.genVSCodeSnippetCore).toBeTypeOf('function')
      expect(Snippet.genVSCodeSnippetDraftWidth).toBeTypeOf('function')
      expect(Snippet.genVSCodeSnippetDraftHeight).toBeTypeOf('function')
    })
  })

  describe('Browser Compatibility', () => {
    it('should work with browser-compatible Core functions', () => {
      expect(Core.vw(10, 1000)).toBe('1vw')
      expect(Core.vh(10, 1000)).toBe('1vh')
      expect(Core.percent(10, 100)).toBe('10%')
    })

    it('should work with browser-compatible Gen functions', () => {
      const funcs = Gen.genFuncsDraftWidth({points: [500, 1000]})

      expect(funcs.core).toHaveProperty('vw1')
      expect(funcs.core).toHaveProperty('vw2')
      expect(funcs.core.vw1(10)).toBe('2vw')
    })

    it('should work with browser-compatible Util functions', () => {
      const toVw = Util.cssPxToVw(1000)

      expect(toVw(10)).toBe('1vw')
      expect(Util.percent(100)(10)).toBe(10)
    })

    it('should work with browser-compatible Snippet functions', () => {
      const snippets = Snippet.genVSCodeSnippetCore()

      expect(snippets).toHaveProperty('vw')
      expect(snippets.vw).toEqual({
        prefix: 'vw',
        body: 'vw($1,$2)$0',
        scope: 'html,css,sass,scss,less,stylus',
      })
    })
  })

  describe('API Consistency', () => {
    it('should provide same API as Node.js version for core functions', () => {
      // Test that all core functions produce consistent results
      expect(Core.vw(20, 1000)).toBe('2vw')
      expect(Core.vwc(20, 1000)).toBe('min(20px, 2vw)')
      expect(Core.vwe(20, 1000, 0.5)).toBe('calc((100vw - 1000px) * 0.5 + 20px)')
    })

    it('should handle space parameter correctly in browser environment', () => {
      expect(Core.vw(10, 1000, 0)).toBe('1vw')
      expect(Core.vw(10, 1000, 1)).toBe('1vw ')
      expect(Core.vh(10, 1000, 0)).toBe('1vh')
      expect(Core.vh(10, 1000, 1)).toBe('1vh ')
    })

    it('should handle error cases gracefully in browser environment', () => {
      expect(Core.vw(10, 0)).toBe('')
      expect(Core.vh('invalid' as any, 1000)).toBe('')
      expect(Core.percent('invalid' as any, 100)).toBe('')
    })
  })
})