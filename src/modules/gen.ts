import {vw, vwc, vwe, vh, vhc, vhe, em, lh, percent, lvw, svw, dvw, dvh, lvh, svh, dvwc, svwc, lvwc, dvwe, lvwe, svwe, dvhc, lvhc, svhc, dvhe, lvhe, svhe} from './core'
import {DEFAULT_SNIPPET, genVSCodeSnippetCore, genVSCodeSnippetDraftHeight, genVSCodeSnippetDraftWidth, SnippetConfig} from './snippets'
import type {Pixel, SpaceFlag, DesignDraft} from './types'
interface PropsSpace {
  space?: SpaceFlag
}

type PropsDraftFuncs = {
  points?: number[]
  firstIndex?: number
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

export const DEFAULT: Required<PropsDraftFuncs & GenFuncsNameCustomWidth & GenFuncsNameCustomHeight & GenFuncsNameCustomOther> = {
  space: 0,
  firstIndex: 1,
  points: [],

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

export const genFuncsDraftWidth = ({
  space = DEFAULT.space,
  scope = DEFAULT_SNIPPET.SCOPE,
  points = DEFAULT.points,
  firstIndex = DEFAULT.firstIndex,

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
}: PropsDraftFuncs & GenFuncsNameCustomWidth & Pick<SnippetConfig, 'scope'>) => {
  const validPoints = points.filter(point => point > 0)

  validPoints.sort((a, b) => a - b)

  const temp: Record<string, ((pixel: Pixel, spaceOverride?: SpaceFlag) => string) | ((pixel: Pixel) => string)> = {}

  for (let i = 0; i < validPoints.length; i++) {
    const idx = i + firstIndex
    const point = validPoints[i]

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
      pointsSize: validPoints.length,
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

export const genFuncsDraftHeight = ({
  space = DEFAULT.space,
  scope = DEFAULT_SNIPPET.SCOPE,
  points = DEFAULT.points,
  firstIndex = DEFAULT.firstIndex,

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
}: PropsDraftFuncs & GenFuncsNameCustomHeight & Pick<SnippetConfig, 'scope'>) => {
  const validPoints = points.filter(point => point > 0)

  validPoints.sort((a, b) => a - b)

  const temp: Record<string, ((pixel: Pixel, spaceOverride?: SpaceFlag) => string) | ((pixel: Pixel) => string)> = {}

  for (let i = 0; i < validPoints.length; i++) {
    const idx = i + firstIndex
    const point = validPoints[i]

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
      pointsSize: validPoints.length,
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

export const genFuncsCore = ({
  space = DEFAULT.space,
  scope = DEFAULT_SNIPPET.SCOPE,

  nameEm = DEFAULT.nameEm,
  nameLh = DEFAULT.nameLh,
  namePercent = DEFAULT.namePercent,

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
}: GenFuncsNameCustomWidth & GenFuncsNameCustomHeight & GenFuncsNameCustomOther & PropsSpace & Pick<SnippetConfig, 'scope'> = {}) => {
  const temp = {
    [nameEm]: em,
    [nameLh]: lh,
    [namePercent]: percent,

    [nameVw]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => vw(pixel, designDraft, spaceOverride ?? space),
    [nameDvw]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => dvw(pixel, designDraft, spaceOverride ?? space),
    [nameLvw]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => lvw(pixel, designDraft, spaceOverride ?? space),
    [nameSvw]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => svw(pixel, designDraft, spaceOverride ?? space),

    [nameVh]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => vh(pixel, designDraft, spaceOverride ?? space),
    [nameDvh]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => dvh(pixel, designDraft, spaceOverride ?? space),
    [nameLvh]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => lvh(pixel, designDraft, spaceOverride ?? space),
    [nameSvh]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => svh(pixel, designDraft, spaceOverride ?? space),

    [nameVwc]: vwc,
    [nameDvwc]: dvwc,
    [nameLvwc]: lvwc,
    [nameSvwc]: svwc,

    [nameVwe]: vwe,
    [nameDvwe]: dvwe,
    [nameLvwe]: lvwe,
    [nameSvwe]: svwe,

    [nameVhc]: vhc,
    [nameDvhc]: dvhc,
    [nameLvhc]: lvhc,
    [nameSvhc]: svhc,

    [nameVhe]: vhe,
    [nameDvhe]: dvhe,
    [nameLvhe]: lvhe,
    [nameSvhe]: svhe,
  }

  delete temp['']

  return {
    core: temp,
    VSCodeSnippet: genVSCodeSnippetCore({
      scope,

      nameEm,
      nameLh,
      namePercent,

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
