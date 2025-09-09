import {normalizePoints} from '../../utils/point-utils'
import {Snippets, VSCodeLanguageIdentifier} from '../../utils/types'
import {DEFAULT} from '../generator-functions/const'
import {CSS_SNIPPET_SCOPE_SYNTAX_BRACKET, CSS_SNIPPET_SCOPE_SYNTAX_INDENT, DEFAULT_SNIPPET} from './const'
import {RWD} from './types'

export type PropsGenVSCodeSnippetMediaQuery = {
  firstIndex?: number
  snippetPrefixMin?: string
  snippetPrefixMax?: string
} & RWD

export const genVSCodeSnippetMediaQuery = ({
  points,
  pointOffset = 0,
  firstIndex = 0,
  scope = DEFAULT_SNIPPET.scopeCss,
  snippetPrefixMax = 'max-p',
  snippetPrefixMin = 'min-p',
  order = DEFAULT.order,
}: PropsGenVSCodeSnippetMediaQuery) => {
  const normalizedPoints = normalizePoints(points, order)

  const snippets: Snippets = {}
  const snippetScopeCssBracket: VSCodeLanguageIdentifier[] = []
  const snippetScopeCssIndent: VSCodeLanguageIdentifier[] = []


  for(let i = 0; i <= scope.length - 1; i++) {
    const id = scope[i]

    if (CSS_SNIPPET_SCOPE_SYNTAX_BRACKET.includes(id)) {
      snippetScopeCssBracket.push(id)
    }

    if (CSS_SNIPPET_SCOPE_SYNTAX_INDENT.includes(id)) {
      snippetScopeCssIndent.push(id)
    }
  }

  if (snippetScopeCssBracket.length) {
    const scopeCssBracketString = snippetScopeCssBracket.join(',')

    for (let i = 0; i <= normalizedPoints.length - 1; i++) {
      const idx = i + firstIndex
      const point = normalizedPoints[i] + pointOffset

      snippets[`cssBracketMinP${idx}`] = {
        'prefix': `${snippetPrefixMin}${idx}`,
        'body': [
          `@media (width >= ${point}px) {`,
          '  $1',
          '}',
        ],
        'scope': scopeCssBracketString,
      }

      snippets[`cssBracketMaxP${idx}`] = {
        'prefix': `${snippetPrefixMax}${idx}`,
        'body': [
          `@media (width < ${point}px) {`,
          '  $1',
          '}',
        ],
        'scope': scopeCssBracketString,
      }
    }
  }

  if (snippetScopeCssIndent.length) {
    const scopeCssIndentString = snippetScopeCssIndent.join(',')

    for (let i = 0; i <= normalizedPoints.length - 1; i++) {
      const idx = i + firstIndex
      const point = normalizedPoints[i] + pointOffset

      snippets[`cssIndentMinP${idx}`] = {
        'prefix': `${snippetPrefixMin}${idx}`,
        'body': [
          `@media (width >= ${point}px)`,
          '  $1',
        ],
        'scope': scopeCssIndentString,
      }

      snippets[`cssIndentMaxP${idx}`] = {
        'prefix': `${snippetPrefixMax}${idx}`,
        'body': [
          `@media (width < ${point}px)`,
          '  $1',
        ],
        'scope': scopeCssIndentString,
      }
    }
  }

  return snippets
}
