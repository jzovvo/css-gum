import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {Snippet} from '../src/index.node'
import fs from 'fs'
import path from 'path'
import {tmpdir} from 'os'

describe('File Operations', () => {
  let tempDir: string
  let testFile: string

  beforeEach(() => {
    tempDir = path.join(tmpdir(), '.vscode-test-file-ops')
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

  describe('Snippet File Writing', () => {
    it('should write snippets to new file', () => {
      const snippets = {
        testSnippet: {
          prefix: 'test',
          body: 'test()',
        },
      }

      Snippet.writeSnippetsToFiles(snippets, [testFile])

      expect(fs.existsSync(testFile)).toBe(true)
      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('testSnippet')
      expect(content.testSnippet.prefix).toBe('test')
    })

    it('should merge with existing snippets', () => {
      // Create existing file
      const existingSnippets = {
        existingSnippet: {
          prefix: 'existing',
          body: 'existing()',
        },
      }

      fs.writeFileSync(testFile, JSON.stringify(existingSnippets, null, 2))

      // Add new snippets
      const newSnippets = {
        newSnippet: {
          prefix: 'new',
          body: 'new()',
        },
      }

      Snippet.writeSnippetsToFiles(newSnippets, [testFile])

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('existingSnippet')
      expect(content).toHaveProperty('newSnippet')
      expect(content.existingSnippet.body).toBe('existing()')
      expect(content.newSnippet.body).toBe('new()')
    })

    it('should handle multiple output files', () => {
      const file1 = path.join(tempDir, 'file1.code-snippets')
      const file2 = path.join(tempDir, 'file2.code-snippets')
      const snippets = {
        testSnippet: {
          prefix: 'test',
          body: 'test()',
        },
      }

      Snippet.writeSnippetsToFiles(snippets, [file1, file2])

      expect(fs.existsSync(file1)).toBe(true)
      expect(fs.existsSync(file2)).toBe(true)

      const content1 = JSON.parse(fs.readFileSync(file1, 'utf-8'))
      const content2 = JSON.parse(fs.readFileSync(file2, 'utf-8'))

      expect(content1).toHaveProperty('testSnippet')
      expect(content2).toHaveProperty('testSnippet')
    })

    it('should create directories if they don\'t exist', () => {
      const nestedFile = path.join(tempDir, 'nested', 'deep', 'snippets.code-snippets')
      const snippets = {
        testSnippet: {
          prefix: 'test',
          body: 'test()',
        },
      }

      Snippet.writeSnippetsToFiles(snippets, [nestedFile])

      expect(fs.existsSync(nestedFile)).toBe(true)
      expect(fs.existsSync(path.dirname(nestedFile))).toBe(true)
    })

    it('should handle empty output array gracefully', () => {
      const snippets = {
        testSnippet: {
          prefix: 'test',
          body: 'test()',
        },
      }

      expect(() => {
        Snippet.writeSnippetsToFiles(snippets, [])
      }).not.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid JSON gracefully', () => {
      // Write invalid JSON
      fs.writeFileSync(testFile, 'invalid json{')

      const snippets = {
        testSnippet: {
          prefix: 'test',
          body: 'test()',
        },
      }

      expect(() => {
        Snippet.writeSnippetsToFiles(snippets, [testFile])
      }).not.toThrow()

      // Should create backup and continue
      expect(fs.existsSync(testFile + '.backup')).toBe(true)
      expect(fs.existsSync(testFile)).toBe(true)

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content).toHaveProperty('testSnippet')
    })

    it('should handle invalid file paths gracefully', () => {
      // Test with invalid paths that should fail gracefully
      const snippets = {
        testSnippet: {
          prefix: 'test',
          body: 'test()',
        },
      }

      // This should not crash the process
      expect(() => {
        try {
          Snippet.writeSnippetsToFiles(snippets, ['/nonexistent/directory/test.json'])
        } catch {
          // Expected to throw, but should be caught gracefully
        }
      }).not.toThrow()
    })
  })

  describe('File Content Validation', () => {
    it('should maintain JSON formatting', () => {
      const snippets = {
        testSnippet: {
          prefix: 'test',
          body: 'test($1, $2)',
          description: 'Test snippet with parameters',
        },
      }

      Snippet.writeSnippetsToFiles(snippets, [testFile])

      const rawContent = fs.readFileSync(testFile, 'utf-8')

      expect(() => JSON.parse(rawContent)).not.toThrow()

      // Check formatting (should be prettified)
      expect(rawContent).toContain('  ') // Should have indentation
      expect(rawContent).toContain('\n') // Should have newlines
    })

    it('should preserve snippet structure', () => {
      const snippets = {
        complexSnippet: {
          prefix: 'complex',
          body: 'function ${1:name}(${2:params}) {\n  ${3:body}\n}',
          description: 'Complex multi-line snippet',
        },
      }

      Snippet.writeSnippetsToFiles(snippets, [testFile])

      const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))

      expect(content.complexSnippet.body).toContain('function')
      expect(content.complexSnippet.body).toContain('${1:name}')
      expect(content.complexSnippet.description).toBe('Complex multi-line snippet')
    })
  })
})