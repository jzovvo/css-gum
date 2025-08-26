import {Gen, Snippet} from 'css-gum'
import {join} from 'path'

const draftWidthPoints = [375, 1440]
const snippetOutput = [
  join(import.meta.dirname, '.vscode/css.code-snippets'),
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
