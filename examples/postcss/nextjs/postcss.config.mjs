import {Gen, Snippet, Config} from 'css-gum'

const draftWidthPoints = [375, 1440]
const mediaQueryPoints = [375, 768, 1440]
const snippetOutput = [
  './.vscode/css-gum.code-snippets',
]

const tailwindConfigOutput = [
  './src/css/tailwind/_config.css',
]

const {core, VSCodeSnippet} = Gen.genFuncsDraftWidth({points: draftWidthPoints, space: 1})

Snippet.writeSnippetsToFiles({
  ...VSCodeSnippet,
  ...Snippet.genVSCodeSnippetMediaQuery({points: mediaQueryPoints}),
  ...Snippet.genVSCodeSnippetPicture({points: mediaQueryPoints, pointOffset: -1}),
}, snippetOutput)

Config.writeConfigToFiles(Config.genTailwindBreakpointConfig({points: mediaQueryPoints}), tailwindConfigOutput)


/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-functions': {
      functions: {
        ...core,
      },
    },
  },
}
