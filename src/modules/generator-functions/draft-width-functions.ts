import {normalizePoints} from '../../utils/point-utils'
import {vw, vwc, vwe, lvw, svw, dvw, dvwc, svwc, lvwc, dvwe, lvwe, svwe} from '../core'
import {DEFAULT_SNIPPET, genVSCodeSnippetDraftWidth, PropsAddSnippet} from '../build-snippets/generator-functions'
import type {Pixel, SpaceFlag} from '../../utils/types'
import {DEFAULT} from './const'
import {GenFuncsNameCustomWidth, PropsDraftFuncs} from './types'

export const genFuncsDraftWidth = ({
  points,
  space = DEFAULT.space,
  scope = DEFAULT_SNIPPET.scope,
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
}: PropsDraftFuncs & GenFuncsNameCustomWidth & Pick<PropsAddSnippet, 'scope'>) => {
  const normalizedPoints = normalizePoints(points, order)

  const temp: Record<string, ((pixel: Pixel, spaceOverride?: SpaceFlag) => string) | ((pixel: Pixel) => string)> = {}

  for (let i = 0; i < normalizedPoints.length; i++) {
    const idx = i + firstIndex
    const point = normalizedPoints[i]

    nameVw !== '' && (temp[nameVw + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => vw(pixel, point, spaceOverride ?? space))
    nameDvw !== '' && (temp[nameDvw + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => dvw(pixel, point, spaceOverride ?? space))
    nameLvw !== '' && (temp[nameLvw + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => lvw(pixel, point, spaceOverride ?? space))
    nameSvw !== '' && (temp[nameSvw + idx] = (pixel: Pixel, spaceOverride?: SpaceFlag) => svw(pixel, point, spaceOverride ?? space))

    nameVwc !== '' && (temp[nameVwc + idx] = (pixel: Pixel) => vwc(pixel, point))
    nameDvwc !== '' && (temp[nameDvwc + idx] = (pixel: Pixel) => dvwc(pixel, point))
    nameLvwc !== '' && (temp[nameLvwc + idx] = (pixel: Pixel) => lvwc(pixel, point))
    nameSvwc !== '' && (temp[nameSvwc + idx] = (pixel: Pixel) => svwc(pixel, point))

    nameVwe !== '' && (temp[nameVwe + idx] = (pixel: Pixel) => vwe(pixel, point))
    nameDvwe !== '' && (temp[nameDvwe + idx] = (pixel: Pixel) => dvwe(pixel, point))
    nameLvwe !== '' && (temp[nameLvwe + idx] = (pixel: Pixel) => lvwe(pixel, point))
    nameSvwe !== '' && (temp[nameSvwe + idx] = (pixel: Pixel) => svwe(pixel, point))
  }

  return {
    core: temp,
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
    }),
  }
}
