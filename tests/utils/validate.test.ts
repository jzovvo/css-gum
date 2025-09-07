import {describe, it, expect, vi, beforeEach} from 'vitest'
import {checkViewportParams, checkPercentParams, checkDesignDraftScalingParams} from '../../src/utils/validate'

vi.mock('../../src/utils/console', () => ({
  consoleError: vi.fn(),
}))

describe('utils/validate', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('checkViewportParams', () => {
    it('should validate correct inputs', () => {
      expect(checkViewportParams(20, 1440)).toEqual({
        data: [20, 1440],
        error: null,
      })
      expect(checkViewportParams('20', '1440')).toEqual({
        data: [20, 1440],
        error: null,
      })
    })

    it('should return error for invalid inputs', () => {
      const result = checkViewportParams('invalid', 1440)
      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received invalid')
      expect(result.error).toContain('designDraft expected number, received 1440')
    })

    it('should handle symbol inputs safely', () => {
      const sym = Symbol('test')
      const result = checkViewportParams(sym, 1440)
      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received Symbol(test)')
    })
  })

  describe('checkPercentParams', () => {
    it('should validate correct inputs', () => {
      expect(checkPercentParams(10, 100)).toEqual({
        data: [10, 100],
        error: null,
      })
      expect(checkPercentParams('25', '100')).toEqual({
        data: [25, 100],
        error: null,
      })
    })

    it('should return error for invalid inputs', () => {
      const result = checkPercentParams('invalid', 100)
      expect(result.data).toBeNull()
      expect(result.error).toContain('child expected number, received invalid')
      expect(result.error).toContain('parent expected number, received 100')
    })
  })

  describe('checkDesignDraftScalingParams', () => {
    it('should validate correct inputs', () => {
      expect(checkDesignDraftScalingParams(20, 1440, 0.5)).toEqual({
        data: [20, 1440, 0.5],
        error: null,
      })
      expect(checkDesignDraftScalingParams('20', '1440', '0.5')).toEqual({
        data: [20, 1440, 0.5],
        error: null,
      })
    })

    it('should return error for invalid inputs', () => {
      const result = checkDesignDraftScalingParams('invalid', 1440, 0.5)
      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received invalid')
      expect(result.error).toContain('designDraft expected number, received 1440')
      expect(result.error).toContain('percent expected number, received 0.5')
    })
  })
})