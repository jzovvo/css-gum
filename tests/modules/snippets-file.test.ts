import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import fs from 'fs'
import {dirname} from 'path'
import {writeSnippetsToFiles} from '../../src/modules/snippets-file'
import * as console from '../../src/utils/console'

// Mock fs and console
vi.mock('fs')
vi.mock('../../src/utils/console', () => ({
  consoleWarn: vi.fn(),
}))

const mockFs = vi.mocked(fs)
const mockConsole = vi.mocked(console)

describe('snippets-file module', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('writeSnippetsToFiles', () => {
    const testSnippets = {
      vw: {
        prefix: 'vw',
        body: 'vw($1,$2)$0',
        scope: 'css',
      },
      vh: {
        prefix: 'vh',
        body: 'vh($1,$2)$0',
        scope: 'css',
      },
    }

    it('should create directory if it does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)
      mockFs.mkdirSync.mockReturnValue(undefined)
      mockFs.readFileSync.mockReturnValue('{}')
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(testSnippets, [filePath])

      expect(mockFs.mkdirSync).toHaveBeenCalledWith(dirname(filePath), {recursive: true})
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(testSnippets, null, 2),
      )
    })

    it('should write to existing file', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('{}')
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(testSnippets, [filePath])

      expect(mockFs.mkdirSync).not.toHaveBeenCalled()
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(testSnippets, null, 2),
      )
    })

    it('should merge with existing snippets', () => {
      const existingSnippets = {
        existing: {
          prefix: 'existing',
          body: 'existing()$0',
          scope: 'css',
        },
      }

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSnippets))
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(testSnippets, [filePath])

      const expectedMerged = {
        ...existingSnippets,
        ...testSnippets,
      }

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(expectedMerged, null, 2),
      )
    })

    it('should override existing snippets with same key', () => {
      const existingSnippets = {
        vw: {
          prefix: 'vw',
          body: 'old-vw()$0',
          scope: 'old-scope',
        },
        existing: {
          prefix: 'existing',
          body: 'existing()$0',
          scope: 'css',
        },
      }

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSnippets))
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(testSnippets, [filePath])

      const expectedMerged = {
        ...existingSnippets,
        ...testSnippets,
      }

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(expectedMerged, null, 2),
      )
    })

    it('should handle multiple output files', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('{}')
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePaths = [
        '/test1/.vscode/snippets.json',
        '/test2/.vscode/snippets.json',
        '/test3/.vscode/snippets.json',
      ]

      writeSnippetsToFiles(testSnippets, filePaths)

      expect(mockFs.readFileSync).toHaveBeenCalledTimes(3)
      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(3)

      filePaths.forEach(filePath => {
        expect(mockFs.writeFileSync).toHaveBeenCalledWith(
          filePath,
          JSON.stringify(testSnippets, null, 2),
        )
      })
    })

    it('should handle non-existent file gracefully', () => {
      mockFs.existsSync.mockImplementation(path => !String(path).endsWith('snippets.json'))
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(testSnippets, [filePath])

      expect(mockFs.readFileSync).not.toHaveBeenCalled()
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(testSnippets, null, 2),
      )
    })

    it('should handle JSON parse errors with backup', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('invalid json content')
      mockFs.copyFileSync.mockReturnValue(undefined)
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(testSnippets, [filePath])

      expect(mockConsole.consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Could not parse existing snippets file'),
      )
      expect(mockConsole.consoleWarn).toHaveBeenCalledWith(
        'Creating backup and starting with empty snippets',
      )
      expect(mockFs.copyFileSync).toHaveBeenCalledWith(
        filePath,
        `${filePath}.backup`,
      )
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(testSnippets, null, 2),
      )
    })

    it('should handle backup creation failure', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('invalid json')
      mockFs.copyFileSync.mockImplementation(() => {
        throw new Error('Backup failed')
      })
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(testSnippets, [filePath])

      expect(mockConsole.consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Could not create backup: Error: Backup failed'),
      )
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(testSnippets, null, 2),
      )
    })

    it('should handle empty snippets object', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('{}')
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles({}, [filePath])

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify({}, null, 2),
      )
    })

    it('should handle empty output array', () => {
      writeSnippetsToFiles(testSnippets, [])

      expect(mockFs.readFileSync).not.toHaveBeenCalled()
      expect(mockFs.writeFileSync).not.toHaveBeenCalled()
      expect(mockFs.mkdirSync).not.toHaveBeenCalled()
    })

    it('should format JSON with proper indentation', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('{}')
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(testSnippets, [filePath])

      const expectedContent = JSON.stringify(testSnippets, null, 2)
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(filePath, expectedContent)

      // Verify the content is properly formatted
      expect(expectedContent).toContain('{\n  "vw": {')
      expect(expectedContent).toContain('    "prefix": "vw"')
    })
  })

  describe('edge cases and error handling', () => {
    it('should handle complex file paths', () => {
      mockFs.existsSync.mockReturnValue(false)
      mockFs.mkdirSync.mockReturnValue(undefined)
      mockFs.readFileSync.mockReturnValue('{}')
      mockFs.writeFileSync.mockReturnValue(undefined)

      const complexPaths = [
        '/very/deep/nested/path/.vscode/snippets.json',
        '/path with spaces/.vscode/snippets.json',
        '/path-with-dashes/.vscode/snippets.json',
      ]

      writeSnippetsToFiles({test: {prefix: 'test', body: 'test()$0', scope: 'css'}}, complexPaths)

      complexPaths.forEach(path => {
        expect(mockFs.mkdirSync).toHaveBeenCalledWith(dirname(path), {recursive: true})
      })
    })

    it('should preserve existing snippet properties', () => {
      const existingSnippets = {
        vw: {
          prefix: 'vw',
          body: 'old-body',
          scope: 'old-scope',
          description: 'This should be preserved',
          customProperty: 'custom-value',
        },
      }

      const newSnippets = {
        vw: {
          prefix: 'vw',
          body: 'new-body',
          scope: 'new-scope',
        },
      }

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSnippets))
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(newSnippets, [filePath])

      const expectedMerged = {
        vw: newSnippets.vw, // Should completely override, not merge properties
      }

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(expectedMerged, null, 2),
      )
    })

    it('should handle large snippet objects', () => {
      const largeSnippets: Record<string, any> = {}
      for (let i = 0; i < 1000; i++) {
        largeSnippets[`snippet${i}`] = {
          prefix: `snippet${i}`,
          body: `snippet${i}($1)$0`,
          scope: 'css',
        }
      }

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('{}')
      mockFs.writeFileSync.mockReturnValue(undefined)

      const filePath = '/test/.vscode/snippets.json'
      writeSnippetsToFiles(largeSnippets, [filePath])

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(largeSnippets, null, 2),
      )
    })
  })
})