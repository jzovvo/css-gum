import type {SpaceFlag, Order} from '../../utils/types'



export interface PropsSpace {
  space?: SpaceFlag
}

export type PropsDraftFuncs = {
  points: number[]
  firstIndex?: number
  order?: Order
} & PropsSpace

export interface GenFuncsNameCustomWidth {
  nameVw?: string
  nameDvw?: string
  nameLvw?: string
  nameSvw?: string

  nameVwc?: string
  nameDvwc?: string
  nameLvwc?: string
  nameSvwc?: string

  nameVwe?: string
  nameDvwe?: string
  nameLvwe?: string
  nameSvwe?: string
}

export interface GenFuncsNameCustomHeight {
  nameVh?: string
  nameDvh?: string
  nameLvh?: string
  nameSvh?: string

  nameVhc?: string
  nameDvhc?: string
  nameLvhc?: string
  nameSvhc?: string

  nameVhe?: string
  nameDvhe?: string
  nameLvhe?: string
  nameSvhe?: string
}

export interface GenFuncsNameCustomOther {
  nameEm?: string
  nameLh?: string
  namePercent?: string
}
