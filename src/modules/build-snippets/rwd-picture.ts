import {normalizePoints} from '../../utils/point-utils'
import {Snippets, VSCodeLanguageIdentifier} from '../../utils/types'
import {DEFAULT} from '../generator-functions/const'
import {CSS_SNIPPET_SCOPE_REACT, DEFAULT_SNIPPET} from './const'
import {RWD} from './types'

export type PropsGenVSCodeSnippetPicture = {
  snippetPrefixPic?: string
} & RWD

export const genVSCodeSnippetPicture = ({
  points,
  pointOffset = 0,
  snippetPrefixPic = 'pic',
  scope = [...DEFAULT_SNIPPET.scopePictureNormal, ...DEFAULT_SNIPPET.scopePictureReact],
  order = DEFAULT.order,
}: PropsGenVSCodeSnippetPicture) => {
  const normalizedPoints = normalizePoints(points, order)

  const snippets: Snippets = {}
  const snippetScopeNormal: VSCodeLanguageIdentifier[] = []
  const snippetScopeReact: VSCodeLanguageIdentifier[] = []

  for(let i = 0; i <= scope.length - 1; i++) {
    const id = scope[i]
    if (CSS_SNIPPET_SCOPE_REACT.includes(id)) {
      snippetScopeReact.push(id)
    } else {
      snippetScopeNormal.push(id)
    }
  }

  if (snippetScopeNormal.length !== 0) {
    snippets['pictureNormal'] = {
      prefix: snippetPrefixPic,
      body: [
        '<picture$1>',
        ...normalizedPoints.map((point, index) => {
          if (index !== normalizedPoints.length - 1) {
            return `  <source media="(max-width: ${point + pointOffset}px)" srcset="$${index + 2}"/>`
          }
          return `  <img src="$${index + 2}" alt="$${index + 3}"/>`
        }),
        '</picture>$0',
      ],
      scope: snippetScopeNormal.join(','),
    }
  }

  if (snippetScopeReact.length !== 0) {
    snippets['pictureReact'] = {
      prefix: snippetPrefixPic,
      body: [
        '<picture$1>',
        ...normalizedPoints.map((point, index) => {
          if (index !== normalizedPoints.length - 1) {
            return `  <source media="(max-width: ${point + pointOffset}px)" srcSet="$${index + 2}"/>`
          }
          return `  <img src="$${index + 2}" alt="$${index + 3}"/>`
        }),
        '</picture>$0',
      ],
      scope: snippetScopeReact.join(','),
    }
  }

  return snippets
}
