import type {Order, VSCodeLanguageIdentifier} from '../../utils/types'

export interface RWD {
  points: number[]
  pointOffset?: number
  scope?: VSCodeLanguageIdentifier[]
  order?: Order
}

export interface SnippetPrefixCustomWidth {
  snippetPrefixVw?: string
  snippetPrefixDvw?: string
  snippetPrefixLvw?: string
  snippetPrefixSvw?: string

  snippetPrefixVwc?: string
  snippetPrefixDvwc?: string
  snippetPrefixLvwc?: string
  snippetPrefixSvwc?: string

  snippetPrefixVwe?: string
  snippetPrefixDvwe?: string
  snippetPrefixLvwe?: string
  snippetPrefixSvwe?: string
}

export interface SnippetPrefixCustomHeight {
  snippetPrefixVh?: string
  snippetPrefixDvh?: string
  snippetPrefixLvh?: string
  snippetPrefixSvh?: string

  snippetPrefixVhc?: string
  snippetPrefixDvhc?: string
  snippetPrefixLvhc?: string
  snippetPrefixSvhc?: string

  snippetPrefixVhe?: string
  snippetPrefixDvhe?: string
  snippetPrefixLvhe?: string
  snippetPrefixSvhe?: string
}

export interface SnippetPrefixCustomOther {
  snippetPrefixEm?: string
  snippetPrefixLh?: string
  snippetPrefixPercent?: string
}
