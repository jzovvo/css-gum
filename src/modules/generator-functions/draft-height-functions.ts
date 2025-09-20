import {normalizePoints} from '../../utils/point-utils'
import {vh, vhc, vhe, dvh, lvh, svh, dvhc, lvhc, svhc, dvhe, lvhe, svhe} from '../core'
import {genVSCodeSnippetDraftHeight, PropsAddFunctionSnippet} from '../build-snippets/generator-functions'
import type {Percent, Pixel, SpaceFlag} from '../../utils/types'
import {DEFAULT} from './const'
import {GenFuncsNameCustomHeight, PropsDraftFuncs} from './types'
import {DEFAULT_SNIPPET} from '../build-snippets/const'
import {SnippetPrefixCustomHeight} from '../build-snippets/types'


export const genFuncsDraftHeight = ({
  points,
  space = DEFAULT.space,
  scope = DEFAULT_SNIPPET.scopeCss,
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

  snippetPrefixVh,
  snippetPrefixDvh,
  snippetPrefixLvh,
  snippetPrefixSvh,

  snippetPrefixVhc,
  snippetPrefixDvhc,
  snippetPrefixLvhc,
  snippetPrefixSvhc,

  snippetPrefixVhe,
  snippetPrefixDvhe,
  snippetPrefixLvhe,
  snippetPrefixSvhe,
}: PropsDraftFuncs & GenFuncsNameCustomHeight & SnippetPrefixCustomHeight & Pick<PropsAddFunctionSnippet, 'scope'>) => {
  const normalizedPoints = normalizePoints(points, order)

  const core: Record<string,
    | ((pixel: Pixel, spaceOverride?: SpaceFlag) => string)
    | ((pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => string)
  > = {}

  for (let i = 0; i < normalizedPoints.length; i++) {
    const idx = i + firstIndex
    const point = normalizedPoints[i]

    nameVh !== '' && (core[nameVh + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => vh(pixel, point, spaceOverride ?? space))
    nameDvh !== '' && (core[nameDvh + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => dvh(pixel, point, spaceOverride ?? space))
    nameLvh !== '' && (core[nameLvh + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => lvh(pixel, point, spaceOverride ?? space))
    nameSvh !== '' && (core[nameSvh + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => svh(pixel, point, spaceOverride ?? space))

    nameVhc !== '' && (core[nameVhc + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => vhc(pixel, point, spaceOverride ?? space))
    nameDvhc !== '' && (core[nameDvhc + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => dvhc(pixel, point, spaceOverride ?? space))
    nameLvhc !== '' && (core[nameLvhc + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => lvhc(pixel, point, spaceOverride ?? space))
    nameSvhc !== '' && (core[nameSvhc + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => svhc(pixel, point, spaceOverride ?? space))

    nameVhe !== '' && (core[nameVhe + idx] = (pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => vhe(pixel, point, percent, spaceOverride ?? space))
    nameDvhe !== '' && (core[nameDvhe + idx] = (pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => dvhe(pixel, point, percent, spaceOverride ?? space))
    nameLvhe !== '' && (core[nameLvhe + idx] = (pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => lvhe(pixel, point, percent, spaceOverride ?? space))
    nameSvhe !== '' && (core[nameSvhe + idx] = (pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => svhe(pixel, point, percent, spaceOverride ?? space))
  }

  return {
    core,
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

      snippetPrefixVh,
      snippetPrefixDvh,
      snippetPrefixLvh,
      snippetPrefixSvh,

      snippetPrefixVhc,
      snippetPrefixDvhc,
      snippetPrefixLvhc,
      snippetPrefixSvhc,

      snippetPrefixVhe,
      snippetPrefixDvhe,
      snippetPrefixLvhe,
      snippetPrefixSvhe,
    }),
  }
}
