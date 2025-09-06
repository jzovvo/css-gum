import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import {consoleError, consoleWarn} from '../../src/utils/console'

describe('console utilities', () => {
  // Mock console methods
  const mockError = vi.fn()
  const mockWarn = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    console.error = mockError
    console.warn = mockWarn
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('consoleError', () => {
    it('should log error message with red color formatting', () => {
      const message = 'Test error message'
      consoleError(message)

      expect(mockError).toHaveBeenCalledWith('\x1b[31m[error]\x1b[0m Test error message')
    })

    it('should handle empty message', () => {
      consoleError('')

      expect(mockError).toHaveBeenCalledWith('\x1b[31m[error]\x1b[0m ')
    })

    it('should handle multiline messages', () => {
      const message = 'Line 1\nLine 2\nLine 3'
      consoleError(message)

      expect(mockError).toHaveBeenCalledWith('\x1b[31m[error]\x1b[0m Line 1\nLine 2\nLine 3')
    })

    it('should handle special characters', () => {
      const message = 'Special chars: @#$%^&*()_+{}|:"<>?'
      consoleError(message)

      expect(mockError).toHaveBeenCalledWith('\x1b[31m[error]\x1b[0m Special chars: @#$%^&*()_+{}|:"<>?')
    })

    it('should be called only once per invocation', () => {
      consoleError('test')

      expect(mockError).toHaveBeenCalledTimes(1)
    })
  })

  describe('consoleWarn', () => {
    it('should log warning message with yellow color formatting', () => {
      const message = 'Test warning message'
      consoleWarn(message)

      expect(mockWarn).toHaveBeenCalledWith('\x1b[33m[warn]\x1b[0m Test warning message')
    })

    it('should handle empty message', () => {
      consoleWarn('')

      expect(mockWarn).toHaveBeenCalledWith('\x1b[33m[warn]\x1b[0m ')
    })

    it('should handle multiline messages', () => {
      const message = 'Warning line 1\nWarning line 2'
      consoleWarn(message)

      expect(mockWarn).toHaveBeenCalledWith('\x1b[33m[warn]\x1b[0m Warning line 1\nWarning line 2')
    })

    it('should handle long messages', () => {
      const message = 'A'.repeat(1000)
      consoleWarn(message)

      expect(mockWarn).toHaveBeenCalledWith(`\x1b[33m[warn]\x1b[0m ${message}`)
    })

    it('should be called only once per invocation', () => {
      consoleWarn('test')

      expect(mockWarn).toHaveBeenCalledTimes(1)
    })
  })

  describe('color formatting', () => {
    it('should use correct ANSI color codes', () => {
      consoleError('error')
      consoleWarn('warn')

      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('\x1b[31m')) // Red
      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('\x1b[0m'))  // Reset

      expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('\x1b[33m'))  // Yellow
      expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('\x1b[0m'))   // Reset
    })

    it('should have proper label formatting', () => {
      consoleError('test')
      consoleWarn('test')

      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('[error]'))
      expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('[warn]'))
    })
  })

  describe('integration with actual usage patterns', () => {
    it('should work with validation error messages', () => {
      const validationError = 'pixel expected number, received invalid\ndesignDraft expected number, received invalid\nError: ...'

      consoleError(validationError)

      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('pixel expected number'))
      expect(mockError).toHaveBeenCalledWith(expect.stringContaining('\x1b[31m[error]\x1b[0m'))
    })

    it('should work with file operation warnings', () => {
      const fileWarning = 'Could not parse existing snippets file /path/to/file: SyntaxError: Unexpected token'

      consoleWarn(fileWarning)

      expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('Could not parse existing snippets file'))
      expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('\x1b[33m[warn]\x1b[0m'))
    })
  })
})