import {Gen} from 'css-gum'
import {join} from 'path'

const points = [375, 1440]
const snippetUrl = [
  join(import.meta.dirname, '.vscode/css.code-snippets'),
]
const {core, genVSCodeSnippet} = Gen.genFuncsDraftWidth({points: points})

genVSCodeSnippet(snippetUrl)

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
