import {describe, it, expect} from 'vitest'
import {genVSCodeSnippetPicture} from '../../../src/modules/build-snippets/rwd-picture'

describe('modules/build-snippets/rwd-picture', () => {
  describe('genVSCodeSnippetPicture', () => {
    it('should generate HTML and React variants', () => {
      const result = genVSCodeSnippetPicture({
        points: [768, 1024],
        scope: ['html', 'typescriptreact'],
      })

      expect(result).toHaveProperty('pictureNormal')
      expect(result).toHaveProperty('pictureReact')

      expect(result.pictureNormal.prefix).toBe('pic')
      expect(result.pictureNormal.scope).toBe('html')
      expect(result.pictureNormal.body).toEqual([
        '<picture$1>',
        '  <source media="(max-width: 768px)" srcset="$2"/>',
        '  <img src="$3" alt="$4"/>',
        '</picture>$0',
      ])

      expect(result.pictureReact.prefix).toBe('pic')
      expect(result.pictureReact.scope).toBe('typescriptreact')
      expect(result.pictureReact.body).toEqual([
        '<picture$1>',
        '  <source media="(max-width: 768px)" srcSet="$2"/>',
        '  <img src="$3" alt="$4"/>',
        '</picture>$0',
      ])
    })

    it('should handle custom parameters', () => {
      const result = genVSCodeSnippetPicture({
        points: [768],
        namePic: 'image',
        pointOffset: -1,
        scope: ['html'],
      })

      expect(result.pictureNormal.prefix).toBe('image')
      expect(result.pictureNormal.body).toEqual([
        '<picture$1>',
        '  <img src="$2" alt="$3"/>',
        '</picture>$0',
      ])
    })

    it('should handle edge cases', () => {
      const result = genVSCodeSnippetPicture({
        points: [-100, 1024, 0, 768],
        pointOffset: -1,
        scope: ['html'],
      })

      expect(result.pictureNormal.body).toEqual([
        '<picture$1>',
        '  <source media="(max-width: 767px)" srcset="$2"/>',
        '  <img src="$3" alt="$4"/>',
        '</picture>$0',
      ])
    })

    it('should handle empty scope arrays', () => {
      const result = genVSCodeSnippetPicture({
        points: [768],
        scope: [],
      })

      expect(Object.keys(result)).toHaveLength(0)
    })

    it('should handle order parameter', () => {
      const result = genVSCodeSnippetPicture({
        points: [1024, 768],
        order: 'desc',
        scope: ['html'],
      })

      expect(result.pictureNormal.body).toEqual([
        '<picture$1>',
        '  <source media="(max-width: 1024px)" srcset="$2"/>',
        '  <img src="$3" alt="$4"/>',
        '</picture>$0',
      ])
    })

    it('should apply pointOffset consistently across HTML and React variants', () => {
      const result = genVSCodeSnippetPicture({
        points: [768, 1024],
        pointOffset: 50,
        scope: ['html', 'typescriptreact'],
      })

      expect(result.pictureNormal.body).toEqual([
        '<picture$1>',
        '  <source media="(max-width: 818px)" srcset="$2"/>',
        '  <img src="$3" alt="$4"/>',
        '</picture>$0',
      ])

      expect(result.pictureReact.body).toEqual([
        '<picture$1>',
        '  <source media="(max-width: 818px)" srcSet="$2"/>',
        '  <img src="$3" alt="$4"/>',
        '</picture>$0',
      ])
    })

    it('should handle extreme pointOffset values consistently', () => {
      const result = genVSCodeSnippetPicture({
        points: [768],
        pointOffset: -1000,
        scope: ['html', 'typescriptreact'],
      })

      expect(result.pictureNormal.body).toEqual([
        '<picture$1>',
        '  <img src="$2" alt="$3"/>',
        '</picture>$0',
      ])

      expect(result.pictureReact.body).toEqual([
        '<picture$1>',
        '  <img src="$2" alt="$3"/>',
        '</picture>$0',
      ])
    })
  })
})