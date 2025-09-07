import {DEFAULT} from '../generator-functions/const'
import {GenFuncsNameCustomHeight, GenFuncsNameCustomOther, GenFuncsNameCustomWidth} from '../generator-functions/types'
import type {Snippets, VSCodeLanguageIdentifier} from '../../utils/types'
import {DEFAULT_SNIPPET} from './const'

export interface PropsAddFunctionSnippet {
  snippets: Snippets;
  name: string;
  suffix?: number | string;
  args?: string;
  scope?: VSCodeLanguageIdentifier[];
}

const addFunctionSnippet = ({
  snippets,
  name,
  suffix = '',
  args = DEFAULT_SNIPPET.args,
  scope = DEFAULT_SNIPPET.scopeCss,
}: PropsAddFunctionSnippet) => {
  if (name !== '') {
    const key = name + suffix

    snippets[key] = {
      prefix: key,
      body: `${key}(${args})$0`,
    }

    scope.length !== 0 && (snippets[key]['scope'] = scope.join(','))
  }
}

type PropsGenVSCodeSnippetCore = GenFuncsNameCustomWidth & GenFuncsNameCustomHeight & GenFuncsNameCustomOther & Pick<PropsAddFunctionSnippet, 'scope'>

export const genVSCodeSnippetCore = ({
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
}: PropsGenVSCodeSnippetCore = {}) => {
  const snippets: Snippets = {}

  addFunctionSnippet({snippets, name: nameEm, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLh, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: namePercent, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVw, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvw, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvw, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvw, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVwc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvwc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvwc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvwc, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVwe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvwe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvwe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvwe, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVh, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvh, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvh, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvh, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVhc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvhc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvhc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvhc, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVhe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvhe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvhe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvhe, args: '$1,$2', scope})

  return snippets
}

type PropsGenVSCodeSnippetDraft = {
  pointsSize: number
  firstIndex?: number
} & Pick<PropsAddFunctionSnippet, 'scope'>

type PropsGenVSCodeSnippetDraftWidth = PropsGenVSCodeSnippetDraft & GenFuncsNameCustomWidth

export const genVSCodeSnippetDraftWidth = ({
  pointsSize,
  scope = DEFAULT_SNIPPET.scopeCss,
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
}: PropsGenVSCodeSnippetDraftWidth) => {
  const snippets: Snippets = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addFunctionSnippet({snippets, name: nameVw, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvw, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvw, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvw, suffix: idx, scope})

    addFunctionSnippet({snippets, name: nameVwc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvwc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvwc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvwc, suffix: idx, scope})

    addFunctionSnippet({snippets, name: nameVwe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvwe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvwe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvwe, suffix: idx, scope})
  }

  return snippets
}

type PropsGenVSCodeSnippetDraftHeight = PropsGenVSCodeSnippetDraft & GenFuncsNameCustomHeight

export const genVSCodeSnippetDraftHeight = ({
  pointsSize,
  scope = DEFAULT_SNIPPET.scopeCss,
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
}: PropsGenVSCodeSnippetDraftHeight) => {
  const snippets: Snippets = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addFunctionSnippet({snippets, name: nameVh, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvh, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvh, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvh, suffix: idx, scope})

    addFunctionSnippet({snippets, name: nameVhc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvhc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvhc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvhc, suffix: idx, scope})

    addFunctionSnippet({snippets, name: nameVhe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvhe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvhe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvhe, suffix: idx, scope})
  }

  return snippets
}
