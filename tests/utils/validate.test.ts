import {describe, it, expect, vi, beforeEach} from 'vitest'
import {checkViewportParams, checkPercentParams, checkDesignDraftScalingParams, checkSpaceFlag} from '../../src/utils/validate'

vi.mock('../../src/utils/console', () => ({
  consoleError: vi.fn(),
}))

describe('utils/validate', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('checkViewportParams', () => {
    it('should validate correct inputs', () => {
      expect(checkViewportParams('test', 20, 1440)).toEqual({
        data: [20, 1440],
        error: null,
      })
      expect(checkViewportParams('test', '20', '1440')).toEqual({
        data: [20, 1440],
        error: null,
      })
    })

    it('should return error for invalid inputs', () => {
      const result = checkViewportParams('test(invalid,1440)', 'invalid', 1440)
      expect(result.data).toBeNull()
      expect(result.error).toContain('test(invalid,1440)')
      expect(result.error).toContain('pixel expected number, received invalid (type: string)')
      expect(result.error).not.toContain('designDraft expected number, received 1440')
    })

    it('should handle symbol inputs safely', () => {
      const sym = Symbol('test')
      const result = checkViewportParams('test', sym, 1440)
      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received Symbol(test) (type: symbol)')
    })

    it('should handle null and undefined inputs', () => {
      const result1 = checkViewportParams('test', null, undefined)
      expect(result1.data).toBeNull()
      expect(result1.error).toContain('test')
      expect(result1.error).toContain('designDraft expected number, received undefined (type: undefined)')
      expect(result1.error).not.toContain('pixel expected number, received null')
    })

    it('should coerce boolean inputs to numbers', () => {
      const result = checkViewportParams('test', true, false)
      expect(result.data).toEqual([1, 0])
      expect(result.error).toBeNull()
    })

    it('should handle object inputs', () => {
      const result = checkViewportParams('test', {}, 'invalid')
      expect(result.data).toBeNull()
      expect(result.error).toContain('test')
      expect(result.error).toContain('pixel expected number, received [object Object] (type: object)')
      expect(result.error).toContain('designDraft expected number, received invalid (type: string)')
    })
  })

  describe('checkPercentParams', () => {
    it('should validate correct inputs', () => {
      expect(checkPercentParams('test', 10, 100)).toEqual({
        data: [10, 100],
        error: null,
      })
      expect(checkPercentParams('test', '25', '100')).toEqual({
        data: [25, 100],
        error: null,
      })
    })

    it('should return error for invalid inputs', () => {
      const result = checkPercentParams('test', 'invalid', 100)
      expect(result.data).toBeNull()
      expect(result.error).toContain('child expected number, received invalid (type: string)')
      expect(result.error).not.toContain('parent expected number, received 100')
    })
  })

  describe('checkDesignDraftScalingParams', () => {
    it('should validate correct inputs', () => {
      expect(checkDesignDraftScalingParams('test', 20, 1440, 0.5)).toEqual({
        data: [20, 1440, 0.5],
        error: null,
      })
      expect(checkDesignDraftScalingParams('test', '20', '1440', '0.5')).toEqual({
        data: [20, 1440, 0.5],
        error: null,
      })
    })

    it('should return error for invalid inputs', () => {
      const result = checkDesignDraftScalingParams('test', 'invalid', 1440, 0.5)
      expect(result.data).toBeNull()
      expect(result.error).toContain('pixel expected number, received invalid (type: string)')
      expect(result.error).not.toContain('designDraft expected number, received 1440')
      expect(result.error).not.toContain('percent expected number, received 0.5')
    })
  })

  describe('checkSpaceFlag', () => {
    it('should validate correct space flag inputs', () => {
      expect(checkSpaceFlag('test', 0)).toEqual({
        data: 0,
        error: null,
      })
      expect(checkSpaceFlag('test', 1)).toEqual({
        data: 1,
        error: null,
      })
      expect(checkSpaceFlag('test', '0')).toEqual({
        data: 0,
        error: null,
      })
      expect(checkSpaceFlag('test', '1')).toEqual({
        data: 1,
        error: null,
      })
    })

    it('should return error for invalid space flag inputs', () => {
      const result = checkSpaceFlag('test', 2)
      expect(result.data).toBeNull()
      expect(result.error).toContain('test')
      expect(result.error).toContain('space expected 1 | 0, received 2 (type: number)')
    })

    it('should return error for non-numeric inputs', () => {
      const result = checkSpaceFlag('test', 'invalid')
      expect(result.data).toBeNull()
      expect(result.error).toContain('space expected 1 | 0, received invalid (type: string)')
    })

    it('should handle symbol inputs safely', () => {
      const sym = Symbol('test')
      const result = checkSpaceFlag('test', sym)
      expect(result.data).toBeNull()
      expect(result.error).toContain('space expected 1 | 0, received Symbol(test) (type: symbol)')
    })

    it('should handle null inputs by coercing to 0', () => {
      expect(checkSpaceFlag('test', null)).toEqual({
        data: 0,
        error: null,
      })
    })

    it('should handle undefined inputs with error', () => {
      const result = checkSpaceFlag('test', undefined)
      expect(result.data).toBeNull()
      expect(result.error).toContain('space expected 1 | 0, received undefined (type: undefined)')
    })

    it('should handle array inputs by coercing to 0', () => {
      expect(checkSpaceFlag('test', [])).toEqual({
        data: 0,
        error: null,
      })
    })

    it('should handle object inputs that cannot be coerced', () => {
      const result = checkSpaceFlag('test', {})
      expect(result.data).toBeNull()
      expect(result.error).toContain('space expected 1 | 0, received [object Object] (type: object)')
    })

    it('should handle boolean inputs by coercing to numbers', () => {
      expect(checkSpaceFlag('test', true)).toEqual({
        data: 1,
        error: null,
      })
      expect(checkSpaceFlag('test', false)).toEqual({
        data: 0,
        error: null,
      })
    })
  })
})