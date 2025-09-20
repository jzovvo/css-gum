import {DEFAULT} from './const'
import {GenFuncsNameCustomHeight, GenFuncsNameCustomOther, GenFuncsNameCustomWidth, PropsSpace} from './types'

import {vw, vwc, vwe, vh, vhc, vhe, em, lh, percent, lvw, svw, dvw, dvh, lvh, svh, dvwc, svwc, lvwc, dvwe, lvwe, svwe, dvhc, lvhc, svhc, dvhe, lvhe, svhe} from '../core'
import {genVSCodeSnippetCore, PropsAddFunctionSnippet} from '../build-snippets/generator-functions'
import type {Pixel, SpaceFlag, DesignDraft, Percent} from '../../utils/types'
import {DEFAULT_SNIPPET} from '../build-snippets/const'
import {SnippetPrefixCustomHeight, SnippetPrefixCustomOther, SnippetPrefixCustomWidth} from '../build-snippets/types'


export const genFuncsCore = ({
  space = DEFAULT.space,
  scope = DEFAULT_SNIPPET.scopeCss,

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

  snippetPrefixEm,
  snippetPrefixLh,
  snippetPrefixPercent,

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
}: GenFuncsNameCustomWidth & GenFuncsNameCustomHeight & GenFuncsNameCustomOther & SnippetPrefixCustomWidth & SnippetPrefixCustomHeight & SnippetPrefixCustomOther & PropsSpace & Pick<PropsAddFunctionSnippet, 'scope'> = {}) => {
  const temp = {
    [nameEm]: (child: number, parent: number, spaceOverride?: SpaceFlag) => em(child, parent, spaceOverride ?? space),
    [nameLh]: (child: number, parent: number, spaceOverride?: SpaceFlag) => lh(child, parent, spaceOverride ?? space),
    [namePercent]: (child: number, parent: number, spaceOverride?: SpaceFlag) => percent(child, parent, spaceOverride ?? space),

    [nameVw]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => vw(pixel, designDraft, spaceOverride ?? space),
    [nameDvw]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => dvw(pixel, designDraft, spaceOverride ?? space),
    [nameLvw]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => lvw(pixel, designDraft, spaceOverride ?? space),
    [nameSvw]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => svw(pixel, designDraft, spaceOverride ?? space),

    [nameVh]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => vh(pixel, designDraft, spaceOverride ?? space),
    [nameDvh]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => dvh(pixel, designDraft, spaceOverride ?? space),
    [nameLvh]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => lvh(pixel, designDraft, spaceOverride ?? space),
    [nameSvh]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => svh(pixel, designDraft, spaceOverride ?? space),

    [nameVwc]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => vwc(pixel, designDraft, spaceOverride ?? space),
    [nameDvwc]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => dvwc(pixel, designDraft, spaceOverride ?? space),
    [nameLvwc]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => lvwc(pixel, designDraft, spaceOverride ?? space),
    [nameSvwc]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => svwc(pixel, designDraft, spaceOverride ?? space),

    [nameVhc]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => vhc(pixel, designDraft, spaceOverride ?? space),
    [nameDvhc]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => dvhc(pixel, designDraft, spaceOverride ?? space),
    [nameLvhc]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => lvhc(pixel, designDraft, spaceOverride ?? space),
    [nameSvhc]: (pixel: Pixel, designDraft: DesignDraft, spaceOverride?: SpaceFlag) => svhc(pixel, designDraft, spaceOverride ?? space),

    [nameVwe]: (pixel: Pixel, designDraft: DesignDraft, percent?: Percent, spaceOverride?: SpaceFlag) => vwe(pixel, designDraft, percent, spaceOverride ?? space),
    [nameDvwe]: (pixel: Pixel, designDraft: DesignDraft, percent?: Percent, spaceOverride?: SpaceFlag) => dvwe(pixel, designDraft, percent, spaceOverride ?? space),
    [nameLvwe]: (pixel: Pixel, designDraft: DesignDraft, percent?: Percent, spaceOverride?: SpaceFlag) => lvwe(pixel, designDraft, percent, spaceOverride ?? space),
    [nameSvwe]: (pixel: Pixel, designDraft: DesignDraft, percent?: Percent, spaceOverride?: SpaceFlag) => svwe(pixel, designDraft, percent, spaceOverride ?? space),

    [nameVhe]: (pixel: Pixel, designDraft: DesignDraft, percent?: Percent, spaceOverride?: SpaceFlag) => vhe(pixel, designDraft, percent, spaceOverride ?? space),
    [nameDvhe]: (pixel: Pixel, designDraft: DesignDraft, percent?: Percent, spaceOverride?: SpaceFlag) => dvhe(pixel, designDraft, percent, spaceOverride ?? space),
    [nameLvhe]: (pixel: Pixel, designDraft: DesignDraft, percent?: Percent, spaceOverride?: SpaceFlag) => lvhe(pixel, designDraft, percent, spaceOverride ?? space),
    [nameSvhe]: (pixel: Pixel, designDraft: DesignDraft, percent?: Percent, spaceOverride?: SpaceFlag) => svhe(pixel, designDraft, percent, spaceOverride ?? space),
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

      snippetPrefixEm,
      snippetPrefixLh,
      snippetPrefixPercent,

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
