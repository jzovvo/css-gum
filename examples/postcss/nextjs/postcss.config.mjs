import {Gen, Snippet} from 'css-gum'

const draftWidthPoints = [375, 1440]
const snippetOutput = [
  './.vscode/css-gum.code-snippets',
]
const {core, VSCodeSnippet} = Gen.genFuncsDraftWidth({points: draftWidthPoints, space: 1})

Snippet.writeSnippetsToFiles(VSCodeSnippet, snippetOutput)

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
