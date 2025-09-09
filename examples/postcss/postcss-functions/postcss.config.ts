import {Gen, Snippet, Config} from 'css-gum'
import {join, dirname} from 'path'
import {fileURLToPath} from 'url'
import type {Config as PostcssLoadConfig} from 'postcss-load-config'

const __dirname = import.meta.dirname ?? dirname(fileURLToPath(import.meta.url)) ?? ''

const draftWidthPoints = [375, 1440]
const mediaQueryPoints = [375, 768, 1440]
const snippetOutput = [
  join(__dirname, '.vscode/css-gum.code-snippets'),
]

const tailwindConfigOutput = [
  join(__dirname, 'css/tailwind/_config.css'),
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
