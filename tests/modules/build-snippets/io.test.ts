import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import {writeSnippetsToFiles} from '../../../src/modules/build-snippets/io'
import fs from 'fs'
import * as console from '../../../src/utils/console'

vi.mock('fs')
vi.mock('../../../src/utils/console', () => ({
  consoleWarn: vi.fn(),
}))

const mockFs = vi.mocked(fs)
const mockConsole = vi.mocked(console)

describe('modules/build-snippets/io', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('writeSnippetsToFiles', () => {
    const mockSnippets = {
      'test-snippet': {
        prefix: 'test',
        body: ['test body'],
        scope: 'html',
      },
    }

    it('should write snippets to new file when directory exists', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('{}')

      writeSnippetsToFiles(mockSnippets, ['/test/snippets.json'])

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        '/test/snippets.json',
        JSON.stringify(mockSnippets, null, 2),
      )
    })

    it('should create directory if it does not exist', () => {
      mockFs.existsSync.mockImplementation((p) => p !== '/test')
      mockFs.readFileSync.mockReturnValue('{}')

      writeSnippetsToFiles(mockSnippets, ['/test/snippets.json'])

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('/test', {recursive: true})
    })

    it('should merge with existing snippets', () => {
      const existingSnippets = {
        'existing-snippet': {
          prefix: 'existing',
          body: ['existing body'],
        },
      }

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSnippets))

      writeSnippetsToFiles(mockSnippets, ['/test/snippets.json'])

      const expectedMerged = {...existingSnippets, ...mockSnippets}
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        '/test/snippets.json',
        JSON.stringify(expectedMerged, null, 2),
      )
    })

    it('should handle corrupted existing file with backup', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('invalid json')
      mockFs.copyFileSync.mockReturnValue(undefined)

      writeSnippetsToFiles(mockSnippets, ['/test/snippets.json'])

      expect(mockConsole.consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Could not parse existing snippets file'),
      )
      expect(mockConsole.consoleWarn).toHaveBeenCalledWith(
        'Creating backup and starting with empty snippets',
      )
      expect(mockFs.copyFileSync).toHaveBeenCalledWith(
        '/test/snippets.json',
        '/test/snippets.json.backup',
      )
    })

    it('should handle backup failure gracefully', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('invalid json')
      mockFs.copyFileSync.mockImplementation(() => {
        throw new Error('Backup failed')
      })

      writeSnippetsToFiles(mockSnippets, ['/test/snippets.json'])

      expect(mockConsole.consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Could not create backup'),
      )
    })

    it('should write to multiple output files', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('{}')

      const outputs = ['/test/snippets1.json', '/test/snippets2.json']
      writeSnippetsToFiles(mockSnippets, outputs)

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(2)
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        '/test/snippets1.json',
        JSON.stringify(mockSnippets, null, 2),
      )
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        '/test/snippets2.json',
        JSON.stringify(mockSnippets, null, 2),
      )
    })

    it('should handle non-existent file without error', () => {
      mockFs.existsSync.mockReturnValue(false)

      writeSnippetsToFiles(mockSnippets, ['/test/snippets.json'])

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        '/test/snippets.json',
        JSON.stringify(mockSnippets, null, 2),
      )
    })

    it('should handle write errors', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('{}')
      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error('Write failed')
      })

      writeSnippetsToFiles(mockSnippets, ['/test/snippets.json'])

      expect(mockConsole.consoleWarn).toHaveBeenCalledWith('Could not write snippets to /test/snippets.json: Error: Write failed')
    })
  })
})