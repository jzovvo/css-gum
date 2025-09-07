import {normalizePoints} from '../../utils/point-utils'
import {vh, vhc, vhe, dvh, lvh, svh, dvhc, lvhc, svhc, dvhe, lvhe, svhe} from '../core'
import {DEFAULT_SNIPPET, genVSCodeSnippetDraftHeight, PropsAddSnippet} from '../build-snippets/generator-functions'
import type {Pixel, SpaceFlag} from '../../utils/types'
import {DEFAULT} from './const'
import {GenFuncsNameCustomHeight, PropsDraftFuncs} from './types'


export const genFuncsDraftHeight = ({
  points,
  space = DEFAULT.space,
  scope = DEFAULT_SNIPPET.scope,
  firstIndex = DEFAULT.firstIndex,
  order = DEFAULT.order,

  nameVh = DEFAULT.nameVh,
  nameDvh = DEFAULT.nameDvh,
  nameLvh = DEFAULT.nameLvh,
  nameSvh = DEFAULT.nameSvh,

  nameVhc = DEFAULT.nameVhc,
  nameDvhc = DEFAULT.nameDvhc,
  nameLvhc = DEFAULT.nameLvhc,
  nameSvhc = DEFAULT.nameSvhc,

  nameVhe = DEFAULT.nameVhe,
  nameDvhe = DEFAULT.nameDvhe,
  nameLvhe = DEFAULT.nameLvhe,
  nameSvhe = DEFAULT.nameSvhe,
}: PropsDraftFuncs & GenFuncsNameCustomHeight & Pick<PropsAddSnippet, 'scope'>) => {
  const normalizedPoints = normalizePoints(points, order)

  const temp: Record<string, ((pixel: Pixel, spaceOverride?: SpaceFlag) => string) | ((pixel: Pixel) => string)> = {}

  for (let i = 0; i < normalizedPoints.length; i++) {
    const idx = i + firstIndex
    const point = normalizedPoints[i]

    nameVh !== '' && (temp[nameVh + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => vh(pixel, point, spaceOverride ?? space))
    nameDvh !== '' && (temp[nameDvh + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => dvh(pixel, point, spaceOverride ?? space))
    nameLvh !== '' && (temp[nameLvh + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => lvh(pixel, point, spaceOverride ?? space))
    nameSvh !== '' && (temp[nameSvh + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => svh(pixel, point, spaceOverride ?? space))

    nameVhc !== '' && (temp[nameVhc + idx] = (pixel: Pixel) => vhc(pixel, point))
    nameDvhc !== '' && (temp[nameDvhc + idx] = (pixel: Pixel) => dvhc(pixel, point))
    nameLvhc !== '' && (temp[nameLvhc + idx] = (pixel: Pixel) => lvhc(pixel, point))
    nameSvhc !== '' && (temp[nameSvhc + idx] = (pixel: Pixel) => svhc(pixel, point))

    nameVhe !== '' && (temp[nameVhe + idx] = (pixel: Pixel) => vhe(pixel, point))
    nameDvhe !== '' && (temp[nameDvhe + idx] = (pixel: Pixel) => dvhe(pixel, point))
    nameLvhe !== '' && (temp[nameLvhe + idx] = (pixel: Pixel) => lvhe(pixel, point))
    nameSvhe !== '' && (temp[nameSvhe + idx] = (pixel: Pixel) => svhe(pixel, point))
  }

  return {
    core: temp,
    VSCodeSnippet: genVSCodeSnippetDraftHeight({
      pointsSize: normalizedPoints.length,
      firstIndex,
      scope,

      nameVh,
      nameDvh,
      nameLvh,
      nameSvh,

      nameVhc,
      nameDvhc,
      nameLvhc,
      nameSvhc,

      nameVhe,
      nameDvhe,
      nameLvhe,
      nameSvhe,
    }),
  }
}
