import {describe, it, expect} from 'vitest'

describe('index files', () => {
  describe('browser index', () => {
    it('should export all required modules', async () => {
      const browserIndex = await import('../src/index.browser')

      expect(browserIndex).toHaveProperty('Core')
      expect(browserIndex).toHaveProperty('Gen')
      expect(browserIndex).toHaveProperty('Util')
      expect(browserIndex).toHaveProperty('Snippet')

      // Verify Core module
      expect(browserIndex.Core).toHaveProperty('vw')
      expect(browserIndex.Core).toHaveProperty('vh')
      expect(browserIndex.Core).toHaveProperty('percent')
      expect(browserIndex.Core).toHaveProperty('em')

      // Verify Gen module
      expect(browserIndex.Gen).toHaveProperty('genFuncsCore')
      expect(browserIndex.Gen).toHaveProperty('genFuncsDraftWidth')
      expect(browserIndex.Gen).toHaveProperty('genFuncsDraftHeight')

      // Verify Util module
      expect(browserIndex.Util).toHaveProperty('cssPercent')
      expect(browserIndex.Util).toHaveProperty('cssPxToVw')
      expect(browserIndex.Util).toHaveProperty('percent')

      // Verify Snippet module
      expect(browserIndex.Snippet).toHaveProperty('genVSCodeSnippetCore')
      expect(browserIndex.Snippet).toHaveProperty('genVSCodeSnippetDraftWidth')
      expect(browserIndex.Snippet).toHaveProperty('genVSCodeSnippetDraftHeight')
    })

    it('should have functional Core exports', async () => {
      const {Core} = await import('../src/index.browser')

      expect(typeof Core.vw).toBe('function')
      expect(typeof Core.vh).toBe('function')
      expect(typeof Core.percent).toBe('function')
      expect(typeof Core.em).toBe('function')

      // Test basic functionality
      expect(Core.vw(100, 1000)).toBe('10vw')
      expect(Core.vh(100, 800)).toBe('12.5vh')
      expect(Core.percent(25, 100)).toBe('25%')
      expect(Core.em(16, 16)).toBe('1em')
    })

    it('should have functional Gen exports', async () => {
      const {Gen} = await import('../src/index.browser')

      expect(typeof Gen.genFuncsCore).toBe('function')
      expect(typeof Gen.genFuncsDraftWidth).toBe('function')
      expect(typeof Gen.genFuncsDraftHeight).toBe('function')

      // Test basic functionality
      const coreResult = Gen.genFuncsCore()
      expect(coreResult).toHaveProperty('core')
      expect(coreResult).toHaveProperty('VSCodeSnippet')

      const widthResult = Gen.genFuncsDraftWidth({points: [1000]})
      expect(widthResult.core).toHaveProperty('vw1')
    })

    it('should have functional Util exports', async () => {
      const {Util} = await import('../src/index.browser')

      expect(typeof Util.percent).toBe('function')
      expect(typeof Util.cssPercent).toBe('function')
      expect(typeof Util.cssPxToVw).toBe('function')

      // Test basic functionality
      expect(Util.percent(100)(25)).toBe(25)
      expect(Util.cssPercent(100)(25)).toBe('25%')
      expect(Util.cssPxToVw(1000)(100)).toBe('10vw')
    })

    it('should have functional Snippet exports', async () => {
      const {Snippet} = await import('../src/index.browser')

      expect(typeof Snippet.genVSCodeSnippetCore).toBe('function')
      expect(typeof Snippet.genVSCodeSnippetDraftWidth).toBe('function')
      expect(typeof Snippet.genVSCodeSnippetDraftHeight).toBe('function')

      // Test basic functionality
      const coreSnippets = Snippet.genVSCodeSnippetCore()
      expect(coreSnippets).toHaveProperty('vw')
      expect(coreSnippets.vw).toEqual({
        prefix: 'vw',
        body: 'vw($1,$2)$0',
        scope: 'html,css,sass,scss,less,stylus',
      })
    })
  })

  describe('node index', () => {
    it('should export all required modules including file operations', async () => {
      const nodeIndex = await import('../src/index.node')

      expect(nodeIndex).toHaveProperty('Core')
      expect(nodeIndex).toHaveProperty('Gen')
      expect(nodeIndex).toHaveProperty('Util')
      expect(nodeIndex).toHaveProperty('Snippet')

      // Verify Snippet module includes file operations
      expect(nodeIndex.Snippet).toHaveProperty('writeSnippetsToFiles')
      expect(typeof (nodeIndex.Snippet as any).writeSnippetsToFiles).toBe('function')
    })

    it('should have same Core functionality as browser version', async () => {
      const {Core} = await import('../src/index.node')

      expect(Core.vw(100, 1000)).toBe('10vw')
      expect(Core.vh(100, 800)).toBe('12.5vh')
      expect(Core.percent(25, 100)).toBe('25%')
      expect(Core.em(16, 16)).toBe('1em')
    })

    it('should extend Snippet module with file operations', async () => {
      const {Snippet} = await import('../src/index.node')
      const browserModule = await import('../src/index.browser')

      // Should have all browser Snippet functionality
      expect(Snippet.genVSCodeSnippetCore).toBeDefined()
      expect(Snippet.genVSCodeSnippetDraftWidth).toBeDefined()
      expect(Snippet.genVSCodeSnippetDraftHeight).toBeDefined()

      // Plus additional file operations
      expect((Snippet as any).writeSnippetsToFiles).toBeDefined()
      expect((browserModule.Snippet as any).writeSnippetsToFiles).toBeUndefined()
    })

    it('should maintain consistent API across environments', async () => {
      const browserIndex = await import('../src/index.browser')
      const nodeIndex = await import('../src/index.node')

      // Core should be identical
      expect(Object.keys(browserIndex.Core).sort()).toEqual(Object.keys(nodeIndex.Core).sort())
      expect(Object.keys(browserIndex.Gen).sort()).toEqual(Object.keys(nodeIndex.Gen).sort())
      expect(Object.keys(browserIndex.Util).sort()).toEqual(Object.keys(nodeIndex.Util).sort())

      // Snippet should have all browser keys plus writeSnippetsToFiles
      const browserSnippetKeys = Object.keys(browserIndex.Snippet).sort()
      const nodeSnippetKeys = Object.keys(nodeIndex.Snippet).sort()

      expect(nodeSnippetKeys).toContain('writeSnippetsToFiles')
      expect(browserSnippetKeys.every(key => nodeSnippetKeys.includes(key))).toBe(true)
    })
  })

  describe('module integration', () => {
    it('should maintain consistent behavior across modules', async () => {
      const {Core, Gen, Util} = await import('../src/index.browser')

      // Core functions should use same utilities as Gen functions
      const coreVw = Core.vw(100, 1000)
      const genResult = Gen.genFuncsCore()
      const genVw = genResult.core.vw(100, 1000)

      expect(coreVw).toBe(genVw)

      // Utils should match internal calculations
      const utilVw = Util.cssPxToVw(1000)(100)
      expect(utilVw).toBe(coreVw)
    })

    it('should handle all viewport variants consistently', async () => {
      const {Core} = await import('../src/index.browser')

      const pixel = 120
      const designDraft = 1200

      // All should produce 10% calculation
      expect(Core.vw(pixel, designDraft)).toBe('10vw')
      expect(Core.dvw(pixel, designDraft)).toBe('10dvw')
      expect(Core.lvw(pixel, designDraft)).toBe('10lvw')
      expect(Core.svw(pixel, designDraft)).toBe('10svw')

      expect(Core.vwc(pixel, designDraft)).toBe('min(120px, 10vw)')
      expect(Core.dvwc(pixel, designDraft)).toBe('min(120px, 10dvw)')

      expect(Core.vwe(pixel, designDraft)).toBe('calc((100vw - 1200px) * 0.5 + 120px)')
      expect(Core.dvwe(pixel, designDraft)).toBe('calc((100dvw - 1200px) * 0.5 + 120px)')
    })

    it('should generate consistent snippets', async () => {
      const {Snippet, Gen} = await import('../src/index.browser')

      const coreSnippets = Snippet.genVSCodeSnippetCore()
      const genResult = Gen.genFuncsCore()

      // Should have matching keys
      const coreKeys = Object.keys(genResult.core).sort()
      const snippetKeys = Object.keys(coreSnippets).sort()

      expect(snippetKeys).toEqual(coreKeys)

      // Each snippet should match its function name
      Object.keys(coreSnippets).forEach(key => {
        expect(coreSnippets[key].prefix).toBe(key)
        expect(coreSnippets[key].body).toBe(`${key}($1,$2)$0`)
      })
    })
  })

  describe('TypeScript types', () => {
    it('should export proper types', async () => {
      const module = await import('../src/modules/types')

      // Types should be available for import
      expect(module.pixelSchema).toBeDefined()
      expect(module.designDraftSchema).toBeDefined()
      expect(module.percentSchema).toBeDefined()
    })
  })
})