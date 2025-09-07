import {normalizePoints} from '../../utils/point-utils'
import {Snippets, VSCodeLanguageIdentifier} from '../../utils/types'
import {DEFAULT} from '../generator-functions/const'
import {DEFAULT_SNIPPET} from './const'
import {RWD} from './types'

export type PropsGenVSCodeSnippetPicture = {
  namePic?: string
} & RWD

export const genVSCodeSnippetPicture = ({
  points,
  pointOffset = 0,
  namePic = 'pic',
  scope = [...DEFAULT_SNIPPET.scopePictureNormal, ...DEFAULT_SNIPPET.scopePictureReact],
  order = DEFAULT.order,
}: PropsGenVSCodeSnippetPicture) => {
  const normalizedPoints = normalizePoints(points, order)

  const snippets: Snippets = {}
  const snippetScopeNormal: VSCodeLanguageIdentifier[] = []
  const snippetScopeReact: VSCodeLanguageIdentifier[] = []
  const REACT_ID: VSCodeLanguageIdentifier[] = DEFAULT_SNIPPET.scopePictureReact

  for(let i = 0; i <= scope.length - 1; i++) {
    const id = scope[i]
    if (REACT_ID.includes(id)) {
      snippetScopeReact.push(id)
    } else {
      snippetScopeNormal.push(id)
    }
  }

  if (snippetScopeNormal.length !== 0) {
    snippets['pictureNormal'] = {
      prefix: namePic,
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
      prefix: namePic,
      body: [
        '<picture$1>',
        ...normalizedPoints.map((point, index) => {
          if (index !== normalizedPoints.length - 1) {
            return `  <source media="(max-width: ${point}px)" srcSet="$${index + 2}"/>`
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
