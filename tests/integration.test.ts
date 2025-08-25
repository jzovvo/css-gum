import {describe, it, expect} from 'vitest'
import {Core, Gen, Util} from '../src/index.node'

describe('Integration Tests', () => {
  describe('Real-world Responsive Design Workflows', () => {
    it('should support multi-breakpoint responsive design', () => {
      const breakpoints = [400, 800, 1000, 1600]
      const widthFuncs = Gen.genFuncsDraftWidth({
        points: breakpoints,
        firstIndex: 1,
        space: 0,
      })
      // Test component sizes across breakpoints
      const buttonPadding = 20
      const titleSize = 40

      expect(widthFuncs.core.vw1(buttonPadding)).toBe('5vw') // Mobile: 400px
      expect(widthFuncs.core.vw2(buttonPadding)).toBe('2.5vw') // Tablet: 800px
      expect(widthFuncs.core.vw3(buttonPadding)).toBe('2vw') // Desktop: 1000px
      expect(widthFuncs.core.vw4(buttonPadding)).toBe('1.25vw') // Large: 1600px

      expect(widthFuncs.core.vw1(titleSize)).toBe('10vw') // Mobile title
      expect(widthFuncs.core.vw4(titleSize)).toBe('2.5vw') // Large title
    })

    it('should handle Tailwind CSS multi-value scenarios with spaces', () => {
      const spacedFuncs = Gen.genFuncsDraftWidth({
        points: [400, 800],
        space: 1,
      })
      const margin = spacedFuncs.core.vw1(10) + spacedFuncs.core.vw1(20) + spacedFuncs.core.vw1(10) + spacedFuncs.core.vw1(20)

      // Should produce space-separated values for Tailwind
      expect(margin).toBe('2.5vw 5vw 2.5vw 5vw ')
    })

    it('should create comprehensive design system with all unit types', () => {
      const designSystem = {
        // Responsive units
        mobile: Gen.genFuncsDraftWidth({points: [400]}),
        desktop: Gen.genFuncsDraftWidth({points: [1600]}),

        // Typography
        fonts: {
          body: 16,
          h1: 32,
          h2: 24,
          h3: 20,
        },

        // Spacing scale
        spacing: [4, 8, 16, 24, 32, 48, 64, 96],
      }
      // Test responsive font sizes
      const bodyMobile = designSystem.mobile.core.vw1(designSystem.fonts.body)
      const bodyDesktop = designSystem.desktop.core.vw1(designSystem.fonts.body)

      expect(bodyMobile).toBe('4vw')
      expect(bodyDesktop).toBe('1vw')

      // Test typography ratios
      const h1Size = Core.em(designSystem.fonts.h1, designSystem.fonts.body)
      const lineHeight = Core.lh(24, designSystem.fonts.body)

      expect(h1Size).toBe('2em')
      expect(lineHeight).toBe('1.5')

      // Test percentage calculations for layout
      const sidebarWidth = Core.percent(300, 1200)
      const mainWidth = Core.percent(900, 1200)

      expect(sidebarWidth).toBe('25%')
      expect(mainWidth).toBe('75%')
    })

    it('should handle complex layout calculations', () => {
      // Container with fluid typography and spacing
      const containerWidth = 1000
      const fluidPadding = Core.vwe(20, containerWidth, 0.5) // Grows with viewport beyond container
      const clampedMargin = Core.vwc(50, containerWidth) // Never exceeds 50px

      expect(fluidPadding).toBe('calc((100vw - 1000px) * 0.5 + 20px)')
      expect(clampedMargin).toBe('min(50px, 5vw)')
    })

    it('should integrate with CSS Grid and Flexbox patterns', () => {
      // 12-column grid system
      const columns = Array.from({length: 12}, () => {
        return Core.percent(1, 12) // Each column is 1/12
      })

      expect(columns[0]).toMatch(/^8\.33333333333333[24]%$/)

      // Common responsive breakpoint values
      const gridGaps = [10, 20, 25, 50]
      const mobileGap = Core.vw(gridGaps[0], 400)
      const desktopGap = Core.vw(gridGaps[3], 1000)

      expect(mobileGap).toBe('2.5vw')
      expect(desktopGap).toBe('5vw')
    })
  })

  describe('Performance and Scale Testing', () => {
    it('should handle large breakpoint arrays efficiently', () => {
      const largeBreakpoints = Array.from({length: 50}, (_unused, i) => 300 + i * 20)
      const start = performance.now()
      const funcs = Gen.genFuncsDraftWidth({points: largeBreakpoints})
      const end = performance.now()

      expect(funcs.core).toHaveProperty('vw1')
      expect(funcs.core).toHaveProperty('vw50')
      expect(end - start).toBeLessThan(100) // Should complete in under 100ms
    })

    it('should maintain precision with extreme values', () => {
      // Very large design width
      const ultraWide = Core.vw(10, 5000) // Ultra-wide display

      expect(ultraWide).toBe('0.2vw')

      // Very small design width
      const mobile = Core.vw(10, 200) // Small mobile

      expect(mobile).toBe('5vw')

      // Even divisible values
      const precise = Core.vw(25, 1000)

      expect(precise).toBe('2.5vw')
    })
  })

  describe('Error Recovery and Resilience', () => {
    it('should gracefully degrade with mixed valid/invalid inputs', () => {
      const mixedPoints = [0, 400, -100, 800, 'invalid', 1600]
      const funcs = Gen.genFuncsDraftWidth({points: mixedPoints as any})

      // Should only create functions for valid points (400, 800, 1600)
      expect(funcs.core).toHaveProperty('vw1')
      expect(funcs.core).toHaveProperty('vw2')
      expect(funcs.core).toHaveProperty('vw3')
      expect(funcs.core).not.toHaveProperty('vw4')

      expect(funcs.core.vw1(10)).toBe('2.5vw') // 400px breakpoint
    })

    it('should handle edge cases in real design workflows', () => {
      // Zero values (common in reset styles)
      expect(Core.vw(0, 1000)).toBe('0')
      expect(Core.vh(0, 1000)).toBe('0')
      expect(Core.percent(0, 100)).toBe('0')

      // Negative margins (common in CSS)
      expect(Core.vw(-10, 1000)).toBe('-1vw')
      expect(Core.vh(-20, 1000)).toBe('-2vh')

      // Small divisible values
      expect(Core.vw(5, 1000)).toBe('0.5vw')
      expect(Core.vh(10, 1000)).toBe('1vh')
    })
  })

  describe('Cross-function Consistency', () => {
    it('should maintain consistency between Core and generated functions', () => {
      const coreFuncs = Gen.genFuncsCore({space: 0})
      const directResult = Core.vw(20, 1000, 0)
      const generatedResult = coreFuncs.core.vw(20, 1000, 0)

      expect(generatedResult).toBe(directResult)

      // Test with space parameter
      const directWithSpace = Core.vw(20, 1000, 1)
      const generatedWithSpace = coreFuncs.core.vw(20, 1000, 1)

      expect(generatedWithSpace).toBe(directWithSpace)
    })

    it('should maintain consistency between Util and Core functions', () => {
      const utilResult = Util.cssPxToVw(1000)(20)
      const coreResult = Core.vw(20, 1000, 0)

      expect(utilResult).toBe(coreResult)

      // Test other utility functions
      const utilPercent = Util.cssPercent(100)(25)
      const corePercent = Core.percent(25, 100)

      expect(utilPercent).toBe(corePercent)
    })
  })
})