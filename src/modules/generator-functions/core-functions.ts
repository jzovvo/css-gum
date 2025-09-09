import {DEFAULT} from './const'
import {GenFuncsNameCustomHeight, GenFuncsNameCustomOther, GenFuncsNameCustomWidth, PropsSpace} from './types'

import {vw, vwc, vwe, vh, vhc, vhe, em, lh, percent, lvw, svw, dvw, dvh, lvh, svh, dvwc, svwc, lvwc, dvwe, lvwe, svwe, dvhc, lvhc, svhc, dvhe, lvhe, svhe} from '../core'
import {genVSCodeSnippetCore, PropsAddFunctionSnippet} from '../build-snippets/generator-functions'
import type {Pixel, SpaceFlag, DesignDraft} from '../../utils/types'
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
