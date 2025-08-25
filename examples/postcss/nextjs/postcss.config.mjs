import {Gen, Snippet} from 'css-gum'

const draftWidthPoints = [375, 1440]
const snippetOutput = [
  './.vscode/css.code-snippets',
]
const {core, VSCodeSnippet} = Gen.genFuncsDraftWidth({points: draftWidthPoints})

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
