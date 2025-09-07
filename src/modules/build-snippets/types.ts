import type {Order, VSCodeLanguageIdentifier} from '../../utils/types'

export interface RWD {
  points: number[]
  pointOffset?: number
  scope?: VSCodeLanguageIdentifier[]
  order?: Order
}
