import {describe, it, expect} from 'vitest'
import {DEFAULT} from '../../../src/modules/generator-functions/const'

describe('modules/generator-functions/const', () => {
  describe('DEFAULT constants', () => {
    it('should have correct default values', () => {
      expect(DEFAULT.space).toBe(0)
      expect(DEFAULT.firstIndex).toBe(0)
      expect(DEFAULT.order).toBe('asc')
    })

    it('should have all viewport width function names', () => {
      expect(DEFAULT.nameVw).toBe('vw')
      expect(DEFAULT.nameDvw).toBe('dvw')
      expect(DEFAULT.nameLvw).toBe('lvw')
      expect(DEFAULT.nameSvw).toBe('svw')
    })

    it('should have all clamped width function names', () => {
      expect(DEFAULT.nameVwc).toBe('vwc')
      expect(DEFAULT.nameDvwc).toBe('dvwc')
      expect(DEFAULT.nameLvwc).toBe('lvwc')
      expect(DEFAULT.nameSvwc).toBe('svwc')
    })

    it('should have all extended width function names', () => {
      expect(DEFAULT.nameVwe).toBe('vwe')
      expect(DEFAULT.nameDvwe).toBe('dvwe')
      expect(DEFAULT.nameLvwe).toBe('lvwe')
      expect(DEFAULT.nameSvwe).toBe('svwe')
    })

    it('should have all viewport height function names', () => {
      expect(DEFAULT.nameVh).toBe('vh')
      expect(DEFAULT.nameDvh).toBe('dvh')
      expect(DEFAULT.nameLvh).toBe('lvh')
      expect(DEFAULT.nameSvh).toBe('svh')
    })

    it('should have all clamped height function names', () => {
      expect(DEFAULT.nameVhc).toBe('vhc')
      expect(DEFAULT.nameDvhc).toBe('dvhc')
      expect(DEFAULT.nameLvhc).toBe('lvhc')
      expect(DEFAULT.nameSvhc).toBe('svhc')
    })

    it('should have all extended height function names', () => {
      expect(DEFAULT.nameVhe).toBe('vhe')
      expect(DEFAULT.nameDvhe).toBe('dvhe')
      expect(DEFAULT.nameLvhe).toBe('lvhe')
      expect(DEFAULT.nameSvhe).toBe('svhe')
    })

    it('should have utility function names', () => {
      expect(DEFAULT.nameEm).toBe('em')
      expect(DEFAULT.nameLh).toBe('lh')
      expect(DEFAULT.namePercent).toBe('percent')
    })

    it('should have all required properties', () => {
      const requiredKeys = [
        'space', 'firstIndex', 'order',
        'nameVw', 'nameDvw', 'nameLvw', 'nameSvw',
        'nameVwc', 'nameDvwc', 'nameLvwc', 'nameSvwc',
        'nameVwe', 'nameDvwe', 'nameLvwe', 'nameSvwe',
        'nameVh', 'nameDvh', 'nameLvh', 'nameSvh',
        'nameVhc', 'nameDvhc', 'nameLvhc', 'nameSvhc',
        'nameVhe', 'nameDvhe', 'nameLvhe', 'nameSvhe',
        'nameEm', 'nameLh', 'namePercent',
      ]

      requiredKeys.forEach(key => {
        expect(DEFAULT).toHaveProperty(key)
      })
    })
  })
})