import {DEFAULT} from '../generator-functions/const'
import {GenFuncsNameCustomHeight, GenFuncsNameCustomOther, GenFuncsNameCustomWidth} from '../generator-functions/types'
import type {Snippets, VSCodeLanguageIdentifier} from '../../utils/types'
import {DEFAULT_SNIPPET} from './const'
import {SnippetPrefixCustomHeight, SnippetPrefixCustomOther, SnippetPrefixCustomWidth} from './types'

export interface PropsAddFunctionSnippet {
  snippets: Snippets;
  name: string;
  prefix?: string;
  suffix?: number | string;
  args?: string;
  scope?: VSCodeLanguageIdentifier[];
}

const addFunctionSnippet = ({
  snippets,
  name,
  prefix,
  suffix = '',
  args = DEFAULT_SNIPPET.args,
  scope = DEFAULT_SNIPPET.scopeCss,
}: PropsAddFunctionSnippet) => {
  const _prefix = prefix ?? name

  if (name !== '') {
    const functionName = name + suffix
    const snippetPrefix = _prefix + suffix

    snippets[functionName] = {
      prefix: snippetPrefix,
      body: `${functionName}(${args})$0`,
    }

    scope.length !== 0 && (snippets[functionName]['scope'] = scope.join(','))
  }
}

type PropsGenVSCodeSnippetCore = GenFuncsNameCustomWidth & GenFuncsNameCustomHeight & GenFuncsNameCustomOther & SnippetPrefixCustomWidth & SnippetPrefixCustomHeight & SnippetPrefixCustomOther & Pick<PropsAddFunctionSnippet, 'scope'>

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
}: PropsGenVSCodeSnippetCore = {}) => {
  const snippets: Snippets = {}

  addFunctionSnippet({snippets, name: nameEm, prefix: snippetPrefixEm, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLh, prefix: snippetPrefixLh, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: namePercent, prefix: snippetPrefixPercent, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVw, prefix: snippetPrefixVw, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvw, prefix: snippetPrefixDvw, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvw, prefix: snippetPrefixLvw, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvw, prefix: snippetPrefixSvw, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVwc, prefix: snippetPrefixVwc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvwc, prefix: snippetPrefixDvwc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvwc, prefix: snippetPrefixLvwc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvwc, prefix: snippetPrefixSvwc, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVwe, prefix: snippetPrefixVwe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvwe, prefix: snippetPrefixDvwe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvwe, prefix: snippetPrefixLvwe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvwe, prefix: snippetPrefixSvwe, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVh, prefix: snippetPrefixVh, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvh, prefix: snippetPrefixDvh, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvh, prefix: snippetPrefixLvh, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvh, prefix: snippetPrefixSvh, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVhc, prefix: snippetPrefixVhc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvhc, prefix: snippetPrefixDvhc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvhc, prefix: snippetPrefixLvhc, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvhc, prefix: snippetPrefixSvhc, args: '$1,$2', scope})

  addFunctionSnippet({snippets, name: nameVhe, prefix: snippetPrefixVhe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameDvhe, prefix: snippetPrefixDvhe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameLvhe, prefix: snippetPrefixLvhe, args: '$1,$2', scope})
  addFunctionSnippet({snippets, name: nameSvhe, prefix: snippetPrefixSvhe, args: '$1,$2', scope})

  return snippets
}

type PropsGenVSCodeSnippetDraft = {
  pointsSize: number
  firstIndex?: number
} & Pick<PropsAddFunctionSnippet, 'scope'>

type PropsGenVSCodeSnippetDraftWidth = PropsGenVSCodeSnippetDraft & GenFuncsNameCustomWidth & SnippetPrefixCustomWidth

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
}: PropsGenVSCodeSnippetDraftWidth) => {
  const snippets: Snippets = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addFunctionSnippet({snippets, name: nameVw, prefix: snippetPrefixVw, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvw, prefix: snippetPrefixDvw, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvw, prefix: snippetPrefixLvw, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvw, prefix: snippetPrefixSvw, suffix: idx, scope})

    addFunctionSnippet({snippets, name: nameVwc, prefix: snippetPrefixVwc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvwc, prefix: snippetPrefixDvwc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvwc, prefix: snippetPrefixLvwc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvwc, prefix: snippetPrefixSvwc, suffix: idx, scope})

    addFunctionSnippet({snippets, name: nameVwe, prefix: snippetPrefixVwe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvwe, prefix: snippetPrefixDvwe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvwe, prefix: snippetPrefixLvwe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvwe, prefix: snippetPrefixSvwe, suffix: idx, scope})
  }

  return snippets
}

type PropsGenVSCodeSnippetDraftHeight = PropsGenVSCodeSnippetDraft & GenFuncsNameCustomHeight & SnippetPrefixCustomHeight

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
}: PropsGenVSCodeSnippetDraftHeight) => {
  const snippets: Snippets = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addFunctionSnippet({snippets, name: nameVh, prefix: snippetPrefixVh, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvh, prefix: snippetPrefixDvh, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvh, prefix: snippetPrefixLvh, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvh, prefix: snippetPrefixSvh, suffix: idx, scope})

    addFunctionSnippet({snippets, name: nameVhc, prefix: snippetPrefixVhc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvhc, prefix: snippetPrefixDvhc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvhc, prefix: snippetPrefixLvhc, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvhc, prefix: snippetPrefixSvhc, suffix: idx, scope})

    addFunctionSnippet({snippets, name: nameVhe, prefix: snippetPrefixVhe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameDvhe, prefix: snippetPrefixDvhe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameLvhe, prefix: snippetPrefixLvhe, suffix: idx, scope})
    addFunctionSnippet({snippets, name: nameSvhe, prefix: snippetPrefixSvhe, suffix: idx, scope})
  }

  return snippets
}
