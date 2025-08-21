import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {Snippet} from '../../src/index'
import fs from 'fs'
import path from 'path'
import {tmpdir} from 'os'

describe('Snippets Module', () => {
  let tempDir: string
  let testFile: string

  beforeEach(() => {
    tempDir = path.join(tmpdir(), '.vscode')
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

  describe('genVSCodeSnippetCore', () => {
    it('should generate core function snippets', () => {
      const result = Snippet.genVSCodeSnippetCore({
        output: [testFile],
      })

      expect(result).toHaveProperty('em')
      expect(result).toHaveProperty('lh')
      expect(result).toHaveProperty('vh')
      expect(result).toHaveProperty('vhc')
      expect(result).toHaveProperty('vhe')
      expect(result).toHaveProperty('vw')
      expect(result).toHaveProperty('vwc')
      expect(result).toHaveProperty('vwe')
      expect(result).toHaveProperty('percent')
    })

    it('should create correct snippet structure', () => {
      const result = Snippet.genVSCodeSnippetCore({
        output: [testFile],
      })

      expect(result.vw).toEqual({
        prefix: 'vw',
        body: 'vw($1,$2)',
      })

      expect(result.em).toEqual({
        prefix: 'em',
        body: 'em($1,$2)',
      })
    })

    it('should write snippets to file', () => {
      Snippet.genVSCodeSnippetCore({
        output: [testFile],
      })

      expect(fs.existsSync(testFile)).toBe(true)

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('vw')
      expect(content).toHaveProperty('em')
    })

    it('should merge with existing snippets', () => {
      // Write initial snippets
      const existingSnippets = {
        custom: {
          prefix: 'custom',
          body: 'custom()',
        },
      }

      fs.writeFileSync(testFile, JSON.stringify(existingSnippets, null, 2))

      // Generate core snippets
      Snippet.genVSCodeSnippetCore({
        output: [testFile],
      })

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('custom') // Should preserve existing
      expect(content).toHaveProperty('vw') // Should add new
    })

    it('should override existing snippets with same key', () => {
      // Write initial snippets with conflicting key
      const existingSnippets = {
        vw: {
          prefix: 'vw',
          body: 'old-vw()',
        },
      }

      fs.writeFileSync(testFile, JSON.stringify(existingSnippets, null, 2))

      // Generate core snippets
      Snippet.genVSCodeSnippetCore({
        output: [testFile],
      })

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content.vw.body).toBe('vw($1,$2)') // Should use new value
    })

    it('should skip empty function names', () => {
      const result = Snippet.genVSCodeSnippetCore({
        nameVw: '', // Empty name should be skipped
        nameEm: 'customEm',
        output: [testFile],
      })

      expect(result).not.toHaveProperty('vw')
      expect(result).toHaveProperty('customEm')
      expect(Object.keys(result)).not.toContain('')
    })

    it('should use custom function names', () => {
      const result = Snippet.genVSCodeSnippetCore({
        nameVw: 'customVw',
        namePercent: 'pct',
        output: [testFile],
      })

      expect(result).toHaveProperty('customVw')
      expect(result).toHaveProperty('pct')
      expect(result.customVw.prefix).toBe('customVw')
      expect(result.customVw.body).toBe('customVw($1,$2)')
    })
  })

  describe('genVSCodeSnippetDraftWidth', () => {
    it('should generate width draft snippets', () => {
      const result = Snippet.genVSCodeSnippetDraftWidth({
        pointsSize: 3,
        output: [testFile],
      })

      expect(result).toHaveProperty('vw1')
      expect(result).toHaveProperty('vw2')
      expect(result).toHaveProperty('vw3')
      expect(result).toHaveProperty('vwc1')
      expect(result).toHaveProperty('vwc2')
      expect(result).toHaveProperty('vwc3')
      expect(result).toHaveProperty('vwe1')
      expect(result).toHaveProperty('vwe2')
      expect(result).toHaveProperty('vwe3')
    })

    it('should create correct snippet structure for width functions', () => {
      const result = Snippet.genVSCodeSnippetDraftWidth({
        pointsSize: 2,
        output: [testFile],
      })

      expect(result.vw1).toEqual({
        prefix: 'vw1',
        body: 'vw1($1)',
      })

      expect(result.vwc2).toEqual({
        prefix: 'vwc2',
        body: 'vwc2($1)',
      })
    })

    it('should respect firstIndex parameter', () => {
      const result = Snippet.genVSCodeSnippetDraftWidth({
        pointsSize: 2,
        firstIndex: 10,
        output: [testFile],
      })

      expect(result).toHaveProperty('vw10')
      expect(result).toHaveProperty('vw11')
      expect(result).not.toHaveProperty('vw1')
      expect(result).not.toHaveProperty('vw2')
    })

    it('should use custom function names', () => {
      const result = Snippet.genVSCodeSnippetDraftWidth({
        pointsSize: 2,
        nameVw: 'width',
        nameVwc: 'widthClamp',
        nameVwe: '', // Should be skipped
        output: [testFile],
      })

      expect(result).toHaveProperty('width1')
      expect(result).toHaveProperty('width2')
      expect(result).toHaveProperty('widthClamp1')
      expect(result).toHaveProperty('widthClamp2')
      expect(result).not.toHaveProperty('vwe1')
      expect(result).not.toHaveProperty('vwe2')
    })

    it('should generate zero snippets when pointsSize is 0', () => {
      const result = Snippet.genVSCodeSnippetDraftWidth({
        pointsSize: 0,
        output: [testFile],
      })

      expect(Object.keys(result)).toHaveLength(0)
    })
  })

  describe('genVSCodeSnippetDraftHeight', () => {
    it('should generate height draft snippets', () => {
      const result = Snippet.genVSCodeSnippetDraftHeight({
        pointsSize: 2,
        output: [testFile],
      })

      expect(result).toHaveProperty('vh1')
      expect(result).toHaveProperty('vh2')
      expect(result).toHaveProperty('vhc1')
      expect(result).toHaveProperty('vhc2')
      expect(result).toHaveProperty('vhe1')
      expect(result).toHaveProperty('vhe2')
    })

    it('should create correct snippet structure for height functions', () => {
      const result = Snippet.genVSCodeSnippetDraftHeight({
        pointsSize: 1,
        output: [testFile],
      })

      expect(result.vh1).toEqual({
        prefix: 'vh1',
        body: 'vh1($1)',
      })

      expect(result.vhc1).toEqual({
        prefix: 'vhc1',
        body: 'vhc1($1)',
      })
    })

    it('should respect firstIndex parameter', () => {
      const result = Snippet.genVSCodeSnippetDraftHeight({
        pointsSize: 1,
        firstIndex: 5,
        output: [testFile],
      })

      expect(result).toHaveProperty('vh5')
      expect(result).not.toHaveProperty('vh1')
    })

    it('should use custom function names', () => {
      const result = Snippet.genVSCodeSnippetDraftHeight({
        pointsSize: 1,
        nameVh: 'height',
        nameVhc: '',
        nameVhe: 'heightExtend',
        output: [testFile],
      })

      expect(result).toHaveProperty('height1')
      expect(result).toHaveProperty('heightExtend1')
      expect(result).not.toHaveProperty('vhc1')
    })
  })

  describe('File operations', () => {
    it('should create directory if it does not exist', () => {
      const deepFile = path.join(tempDir, 'deep', 'nested', 'test.code-snippets')

      Snippet.genVSCodeSnippetCore({
        output: [deepFile],
      })

      expect(fs.existsSync(deepFile)).toBe(true)
    })

    it('should handle multiple output files', () => {
      const file1 = path.join(tempDir, 'css.code-snippets')
      const file2 = path.join(tempDir, 'sass.code-snippets')

      Snippet.genVSCodeSnippetCore({
        output: [file1, file2],
      })

      expect(fs.existsSync(file1)).toBe(true)
      expect(fs.existsSync(file2)).toBe(true)

      const content1 = JSON.parse(fs.readFileSync(file1, 'utf-8'))
      const content2 = JSON.parse(fs.readFileSync(file2, 'utf-8'))

      expect(content1).toEqual(content2) // Should have same content
    })

    it('should handle invalid JSON gracefully', () => {
      // Write invalid JSON
      fs.writeFileSync(testFile, 'invalid json{')

      expect(() => {
        Snippet.genVSCodeSnippetCore({
          output: [testFile],
        })
      }).not.toThrow()

      // Should create valid JSON file
      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('vw')

      // Should create backup file
      const backupFile = testFile + '.backup'

      expect(fs.existsSync(backupFile)).toBe(true)
      expect(fs.readFileSync(backupFile, 'utf-8')).toBe('invalid json{')
    })

    it('should handle empty output array', () => {
      expect(() => {
        Snippet.genVSCodeSnippetCore({
          output: [],
        })
      }).not.toThrow()
    })
  })
})
