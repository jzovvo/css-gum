import {Gen, Snippet, Config} from 'css-gum'
import {join} from 'path'
import type {Config as PostcssLoadConfig} from 'postcss-load-config'

const draftWidthPoints = [375, 1440]
const mediaQueryPoints = [375, 768, 1440]
const snippetOutput = [
  join(import.meta.dirname, '.vscode/css-gum.code-snippets'),
]

const tailwindConfigOutput = [
  join(import.meta.dirname, 'css/tailwind/_config.css'),
]

const {core, VSCodeSnippet} = Gen.genFuncsDraftWidth({points: draftWidthPoints, space: 1})

Snippet.writeSnippetsToFiles({
  ...VSCodeSnippet,
  ...Snippet.genVSCodeSnippetMediaQuery({points: mediaQueryPoints}),
  ...Snippet.genVSCodeSnippetPicture({points: mediaQueryPoints, pointOffset: -1}),
}, snippetOutput)

Config.writeConfigToFiles(Config.genTailwindBreakpointConfig({points: mediaQueryPoints}), tailwindConfigOutput)

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-functions': {
      functions: {
        ...core,
      },
    },
  },
} satisfies PostcssLoadConfig
