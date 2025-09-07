import {PropsAddFunctionSnippet} from './generator-functions'

export const CSS_SNIPPET_SCOPE_SYNTAX_INDENT: NonNullable<PropsAddFunctionSnippet['scope']> = ['sass', 'stylus']
export const CSS_SNIPPET_SCOPE_SYNTAX_BRACKET: NonNullable<PropsAddFunctionSnippet['scope']> = ['css','scss','less']
export const CSS_SNIPPET_SCOPE_REACT: NonNullable<PropsAddFunctionSnippet['scope']> = ['javascriptreact', 'typescriptreact']

export const DEFAULT_SNIPPET: {
  args: NonNullable<PropsAddFunctionSnippet['args']>
  scopeCss: NonNullable<PropsAddFunctionSnippet['scope']>
  scopePictureNormal: NonNullable<PropsAddFunctionSnippet['scope']>
  scopePictureReact: NonNullable<PropsAddFunctionSnippet['scope']>
} = {
  args: '$1',
  scopeCss: ['html', ...CSS_SNIPPET_SCOPE_SYNTAX_INDENT, ...CSS_SNIPPET_SCOPE_SYNTAX_BRACKET],
  scopePictureNormal: ['html', 'vue'],
  scopePictureReact: [...CSS_SNIPPET_SCOPE_REACT],
}
