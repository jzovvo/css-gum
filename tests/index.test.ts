import {describe, it, expect} from 'vitest'
import * as cssGum from '../src/index.browser'
import * as cssGumNode from '../src/index.node'

describe('index.browser', () => {
  it('should export all browser modules', () => {
    expect(cssGum).toHaveProperty('Core')
    expect(cssGum).toHaveProperty('Gen')
    expect(cssGum).toHaveProperty('Util')
    expect(cssGum).toHaveProperty('Snippet')
    expect(cssGum).toHaveProperty('Config')
  })

  it('should have working vw function in Core module', () => {
    expect(cssGum.Core.vw(120, 1200)).toBe('10vw')
    expect(cssGum.Core.vw(375, 1200)).toBe('31.25vw')
  })

  it('should have working vh function in Core module', () => {
    expect(cssGum.Core.vh(100, 800)).toBe('12.5vh')
    expect(cssGum.Core.vh(300, 800)).toBe('37.5vh')
  })

  it('should have working percent function in Core module', () => {
    expect(cssGum.Core.percent(120, 1200)).toBe('10%')
    expect(cssGum.Core.percent(375, 1200)).toBe('31.25%')
  })
})

describe('index.node', () => {
  it('should export all node modules', () => {
    expect(cssGumNode).toHaveProperty('Core')
    expect(cssGumNode).toHaveProperty('Gen')
    expect(cssGumNode).toHaveProperty('Util')
    expect(cssGumNode).toHaveProperty('Snippet')
    expect(cssGumNode).toHaveProperty('Config')
  })

  it('should have working build config functions', () => {
    const config = cssGumNode.Config.genTailwindBreakpointConfig({
      points: [768, 1024],
    })
    expect(config).toContain('--breakpoint-p0: 768px')
    expect(config).toContain('--breakpoint-p1: 1024px')
  })

  it('should have working snippet generation functions', () => {
    const snippets = cssGumNode.Snippet.genVSCodeSnippetCore()
    expect(snippets).toHaveProperty('vw')
    expect(snippets.vw.prefix).toBe('vw')
    expect(snippets.vw.body).toBe('vw($1,$2)$0')
  })

  it('should have writeSnippetsToFiles function', () => {
    expect(cssGumNode.Snippet).toHaveProperty('writeSnippetsToFiles')
    expect(typeof cssGumNode.Snippet.writeSnippetsToFiles).toBe('function')
  })

  it('should have writeConfigToFiles function', () => {
    expect(cssGumNode.Config).toHaveProperty('writeConfigToFiles')
    expect(typeof cssGumNode.Config.writeConfigToFiles).toBe('function')
  })
})