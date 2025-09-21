import {describe, it, expect, vi, beforeEach} from 'vitest'
import {consoleError, consoleWarn} from '../../src/utils/console'

describe('utils/console', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  describe('consoleError', () => {
    it('should log error messages', () => {
      consoleError('Test error')
      expect(console.error).toHaveBeenCalledWith('\x1b[31m[css-gum error]\x1b[0m Test error')
    })
  })

  describe('consoleWarn', () => {
    it('should log warning messages', () => {
      consoleWarn('Test warning')
      expect(console.warn).toHaveBeenCalledWith('\x1b[33m[css-gum warn]\x1b[0m Test warning')
    })
  })
})