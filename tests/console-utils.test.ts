import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import {consoleError, consoleWarn} from '../src/utils/console'

describe('Console Utils', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
    consoleWarnSpy.mockRestore()
  })

  describe('consoleError', () => {
    it('should log error messages with color formatting', () => {
      const errorMessage = 'Test error message'

      consoleError(errorMessage)

      expect(consoleErrorSpy).toHaveBeenCalledWith('\x1b[31m[error]\x1b[0m Test error message')
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle empty error messages', () => {
      consoleError('')

      expect(consoleErrorSpy).toHaveBeenCalledWith('\x1b[31m[error]\x1b[0m ')
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle multiline error messages', () => {
      const multilineError = 'Error:\n  Line 1\n  Line 2'

      consoleError(multilineError)

      expect(consoleErrorSpy).toHaveBeenCalledWith('\x1b[31m[error]\x1b[0m Error:\n  Line 1\n  Line 2')
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle special characters in error messages', () => {
      const specialCharsMessage = 'Error: 特殊字符 ñáéíóú 🚨'

      consoleError(specialCharsMessage)

      expect(consoleErrorSpy).toHaveBeenCalledWith('\x1b[31m[error]\x1b[0m Error: 特殊字符 ñáéíóú 🚨')
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('consoleWarn', () => {
    it('should log warning messages with color formatting', () => {
      const warningMessage = 'Test warning message'

      consoleWarn(warningMessage)

      expect(consoleWarnSpy).toHaveBeenCalledWith('\x1b[33m[warn]\x1b[0m Test warning message')
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle empty warning messages', () => {
      consoleWarn('')

      expect(consoleWarnSpy).toHaveBeenCalledWith('\x1b[33m[warn]\x1b[0m ')
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
    })
  })
})