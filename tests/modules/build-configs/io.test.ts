import {describe, it, expect, vi, beforeEach} from 'vitest'
import fs from 'fs'
import {writeConfigToFiles} from '../../../src/modules/build-configs/io'
import * as console from '../../../src/utils/console'

vi.mock('fs')
vi.mock('../../../src/utils/console', () => ({
  consoleWarn: vi.fn(),
}))

const mockFs = vi.mocked(fs)

describe('modules/build-configs/io', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFs.existsSync.mockReturnValue(false)
    mockFs.readFileSync.mockReturnValue('')
    mockFs.writeFileSync.mockImplementation(() => {})
    mockFs.mkdirSync.mockImplementation(() => undefined)
  })

  describe('writeConfigToFiles', () => {
    const testConfig = '@theme {\n  --breakpoint-p0: 375px;\n}'
    const testPaths = ['/path/to/config.css']

    it('should handle basic file operations', () => {
      writeConfigToFiles(testConfig, testPaths)

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('/path/to', {recursive: true})
      expect(mockFs.writeFileSync).toHaveBeenCalledWith('/path/to/config.css', testConfig)
    })

    it('should skip writing when content is unchanged', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(testConfig)

      writeConfigToFiles(testConfig, testPaths)

      expect(mockFs.writeFileSync).not.toHaveBeenCalled()
    })

    it('should create backup when overwriting', () => {
      const oldConfig = '@theme {\n  --breakpoint-p0: 320px;\n}'
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(oldConfig)

      writeConfigToFiles(testConfig, testPaths)

      expect(mockFs.writeFileSync).toHaveBeenCalledWith('/path/to/config.css.backup', oldConfig)
      expect(mockFs.writeFileSync).toHaveBeenCalledWith('/path/to/config.css', testConfig)
      expect(console.consoleWarn).toHaveBeenCalledWith('Backup created at: /path/to/config.css.backup')
    })

    it('should handle multiple output paths', () => {
      const multiplePaths = ['/path/to/config1.css', '/path/to/config2.css']

      writeConfigToFiles(testConfig, multiplePaths)

      expect(mockFs.writeFileSync).toHaveBeenCalledWith('/path/to/config1.css', testConfig)
      expect(mockFs.writeFileSync).toHaveBeenCalledWith('/path/to/config2.css', testConfig)
      expect(mockFs.mkdirSync).toHaveBeenCalledTimes(2)
    })

    it('should skip empty content', () => {
      writeConfigToFiles('', testPaths)
      writeConfigToFiles('   \n\t  ', testPaths)

      expect(mockFs.writeFileSync).not.toHaveBeenCalled()
      expect(console.consoleWarn).toHaveBeenCalledWith('Config content is empty, skipping write operation')
    })

    it('should handle errors gracefully', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Permission denied')
      })

      writeConfigToFiles(testConfig, testPaths)

      expect(console.consoleWarn).toHaveBeenCalledWith('Could not read existing config file /path/to/config.css: Error: Permission denied')
      expect(mockFs.writeFileSync).toHaveBeenCalledWith('/path/to/config.css', testConfig)
    })

    it('should handle backup errors', () => {
      const oldConfig = '@theme {\n  --breakpoint-p0: 320px;\n}'
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(oldConfig)
      mockFs.writeFileSync.mockImplementationOnce(() => {
        throw new Error('Backup failed')
      })

      writeConfigToFiles(testConfig, testPaths)

      expect(console.consoleWarn).toHaveBeenCalledWith('Could not create backup: Error: Backup failed')
      expect(mockFs.writeFileSync).toHaveBeenCalledWith('/path/to/config.css', testConfig)
    })

    it('should handle directory operations', () => {
      const newPath = ['/new/path/config.css']
      writeConfigToFiles(testConfig, newPath)
      expect(mockFs.mkdirSync).toHaveBeenCalledWith('/new/path', {recursive: true})
    })

    it('should trim content before processing', () => {
      const paddedConfig = '\n\n  @theme {\n  --breakpoint-p0: 375px;\n}  \n\n'
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(testConfig.trim())

      writeConfigToFiles(paddedConfig, testPaths)

      expect(mockFs.writeFileSync).not.toHaveBeenCalledWith('/path/to/config.css', expect.any(String))
    })
  })
})