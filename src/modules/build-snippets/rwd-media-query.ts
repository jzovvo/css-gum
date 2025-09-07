import {normalizePoints} from '../../utils/point-utils'
import {Snippets} from '../../utils/types'
import {DEFAULT} from '../generator-functions/const'
import {DEFAULT_SNIPPET} from './const'
import {RWD} from './types'

export type PropsGenVSCodeSnippetMediaQuery = {
  firstIndex?: number
  nameMin?: string
  nameMax?: string
} & RWD

export const genVSCodeSnippetMediaQuery = ({
  points,
  pointOffset = 0,
  firstIndex = 0,
  scope = DEFAULT_SNIPPET.scopeCss,
  nameMax = 'max-p',
  nameMin = 'min-p',
  order = DEFAULT.order,
}: PropsGenVSCodeSnippetMediaQuery) => {
  const normalizedPoints = normalizePoints(points, order)

  const snippets: Snippets = {}
  const scopeString = scope.join(',')

  for (let i = 0; i <= normalizedPoints.length - 1; i++) {
    const idx = i + firstIndex
    const point = normalizedPoints[i] + pointOffset

    snippets[`minP${idx}`] = {
      'prefix': `${nameMin}${idx}`,
      'body': [
        `@media (width >= ${point}px) {`,
        '  $1',
        '}$0',
      ],
      'scope': scopeString,
    }

    snippets[`maxP${idx}`] = {
      'prefix': `${nameMax}${idx}`,
      'body': [
        `@media (width < ${point}px) {`,
        '  $1',
        '}$0',
      ],
      'scope': scopeString,
    }
  }

  return snippets
}
