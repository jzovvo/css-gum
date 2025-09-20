import {normalizePoints} from '../../utils/point-utils'
import {vw, vwc, vwe, lvw, svw, dvw, dvwc, svwc, lvwc, dvwe, lvwe, svwe} from '../core'
import {genVSCodeSnippetDraftWidth, PropsAddFunctionSnippet} from '../build-snippets/generator-functions'
import type {Percent, Pixel, SpaceFlag} from '../../utils/types'
import {DEFAULT} from './const'
import {GenFuncsNameCustomWidth, PropsDraftFuncs} from './types'
import {DEFAULT_SNIPPET} from '../build-snippets/const'
import {SnippetPrefixCustomWidth} from '../build-snippets/types'

export const genFuncsDraftWidth = ({
  points,
  space = DEFAULT.space,
  scope = DEFAULT_SNIPPET.scopeCss,
  firstIndex = DEFAULT.firstIndex,
  order = DEFAULT.order,

  nameVw = DEFAULT.nameVw,
  nameDvw = DEFAULT.nameDvw,
  nameLvw = DEFAULT.nameLvw,
  nameSvw = DEFAULT.nameSvw,

  nameVwc = DEFAULT.nameVwc,
  nameDvwc = DEFAULT.nameDvwc,
  nameLvwc = DEFAULT.nameLvwc,
  nameSvwc = DEFAULT.nameSvwc,

  nameVwe = DEFAULT.nameVwe,
  nameDvwe = DEFAULT.nameDvwe,
  nameLvwe = DEFAULT.nameLvwe,
  nameSvwe = DEFAULT.nameSvwe,

  snippetPrefixVw,
  snippetPrefixDvw,
  snippetPrefixLvw,
  snippetPrefixSvw,

  snippetPrefixVwc,
  snippetPrefixDvwc,
  snippetPrefixLvwc,
  snippetPrefixSvwc,

  snippetPrefixVwe,
  snippetPrefixDvwe,
  snippetPrefixLvwe,
  snippetPrefixSvwe,
}: PropsDraftFuncs & GenFuncsNameCustomWidth & SnippetPrefixCustomWidth & Pick<PropsAddFunctionSnippet, 'scope'>) => {
  const normalizedPoints = normalizePoints(points, order)

  const core: Record<string,
    | ((pixel: Pixel, spaceOverride?: SpaceFlag) => string)
    | ((pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => string)
  > = {}

  for (let i = 0; i < normalizedPoints.length; i++) {
    const idx = i + firstIndex
    const point = normalizedPoints[i]

    nameVw !== '' && (core[nameVw + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => vw(pixel, point, spaceOverride ?? space))
    nameDvw !== '' && (core[nameDvw + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => dvw(pixel, point, spaceOverride ?? space))
    nameLvw !== '' && (core[nameLvw + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => lvw(pixel, point, spaceOverride ?? space))
    nameSvw !== '' && (core[nameSvw + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => svw(pixel, point, spaceOverride ?? space))

    nameVwc !== '' && (core[nameVwc + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => vwc(pixel, point, spaceOverride ?? space))
    nameDvwc !== '' && (core[nameDvwc + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => dvwc(pixel, point, spaceOverride ?? space))
    nameLvwc !== '' && (core[nameLvwc + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => lvwc(pixel, point, spaceOverride ?? space))
    nameSvwc !== '' && (core[nameSvwc + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => svwc(pixel, point, spaceOverride ?? space))

    nameVwe !== '' && (core[nameVwe + idx] = (pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => vwe(pixel, point, percent, spaceOverride ?? space))
    nameDvwe !== '' && (core[nameDvwe + idx] = (pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => dvwe(pixel, point, percent, spaceOverride ?? space))
    nameLvwe !== '' && (core[nameLvwe + idx] = (pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => lvwe(pixel, point, percent, spaceOverride ?? space))
    nameSvwe !== '' && (core[nameSvwe + idx] = (pixel: Pixel, percent?: Percent, spaceOverride?: SpaceFlag) => svwe(pixel, point, percent, spaceOverride ?? space))
  }

  return {
    core,
    VSCodeSnippet: genVSCodeSnippetDraftWidth({
      pointsSize: normalizedPoints.length,
      firstIndex,
      scope,

      nameVw,
      nameDvw,
      nameLvw,
      nameSvw,

      nameVwc,
      nameDvwc,
      nameLvwc,
      nameSvwc,

      nameVwe,
      nameDvwe,
      nameLvwe,
      nameSvwe,

      snippetPrefixVw,
      snippetPrefixDvw,
      snippetPrefixLvw,
      snippetPrefixSvw,

      snippetPrefixVwc,
      snippetPrefixDvwc,
      snippetPrefixLvwc,
      snippetPrefixSvwc,

      snippetPrefixVwe,
      snippetPrefixDvwe,
      snippetPrefixLvwe,
      snippetPrefixSvwe,
    }),
  }
}
