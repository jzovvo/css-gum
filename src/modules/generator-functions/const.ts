import {GenFuncsNameCustomHeight, GenFuncsNameCustomOther, GenFuncsNameCustomWidth, PropsDraftFuncs} from './types'


export const DEFAULT: Required<Omit<PropsDraftFuncs, 'points'> & GenFuncsNameCustomWidth & GenFuncsNameCustomHeight & GenFuncsNameCustomOther> = {
  space: 0,
  firstIndex: 0,
  order: 'asc',

  nameEm: 'em',
  nameLh: 'lh',
  namePercent: 'percent',

  nameVw: 'vw',
  nameDvw: 'dvw',
  nameLvw: 'lvw',
  nameSvw: 'svw',

  nameVwc: 'vwc',
  nameDvwc: 'dvwc',
  nameLvwc: 'lvwc',
  nameSvwc: 'svwc',

  nameVwe: 'vwe',
  nameDvwe: 'dvwe',
  nameLvwe: 'lvwe',
  nameSvwe: 'svwe',

  nameVh: 'vh',
  nameDvh: 'dvh',
  nameLvh: 'lvh',
  nameSvh: 'svh',

  nameVhc: 'vhc',
  nameDvhc: 'dvhc',
  nameLvhc: 'lvhc',
  nameSvhc: 'svhc',

  nameVhe: 'vhe',
  nameDvhe: 'dvhe',
  nameLvhe: 'lvhe',
  nameSvhe: 'svhe',
}
