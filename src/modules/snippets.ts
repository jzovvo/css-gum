import {DEFAULT, type GenFuncsNameCustomHeight, type GenFuncsNameCustomOther, type GenFuncsNameCustomWidth} from './gen'
import type {Snippets, VSCodeLanguageIdentifier} from './types'

export interface PropsAddSnippet {
  snippets: Snippets;
  name: string;
  suffix?: number | string;
  args?: string;
  scope?: VSCodeLanguageIdentifier[];
}

export const DEFAULT_SNIPPET: {
  args: NonNullable<PropsAddSnippet['args']>
  scope: NonNullable<PropsAddSnippet['scope']>
  scopePictureNormal: NonNullable<PropsAddSnippet['scope']>
  scopePictureReact: NonNullable<PropsAddSnippet['scope']>
} = {
  args: '$1',
  scope: ['html','css','sass','scss','less','stylus'],
  scopePictureNormal: ['html', 'vue'],
  scopePictureReact: ['javascriptreact', 'typescriptreact'],
}

const addSnippetIfEnabled = ({
  snippets,
  name,
  suffix = '',
  args = DEFAULT_SNIPPET.args,
  scope = DEFAULT_SNIPPET.scope,
}: PropsAddSnippet) => {
  if (name !== '') {
    const key = name + suffix

    snippets[key] = {
      prefix: key,
      body: `${key}(${args})$0`,
    }

    scope.length !== 0 && (snippets[key]['scope'] = scope.join(','))
  }
}

type PropsGenVSCodeSnippetCore = GenFuncsNameCustomWidth & GenFuncsNameCustomHeight & GenFuncsNameCustomOther & Pick<PropsAddSnippet, 'scope'>

export const genVSCodeSnippetCore = ({
  scope = DEFAULT_SNIPPET.scope,

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

  addSnippetIfEnabled({snippets, name: nameEm, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameLh, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: namePercent, args: '$1,$2', scope})

  addSnippetIfEnabled({snippets, name: nameVw, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameDvw, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameLvw, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameSvw, args: '$1,$2', scope})

  addSnippetIfEnabled({snippets, name: nameVwc, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameDvwc, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameLvwc, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameSvwc, args: '$1,$2', scope})

  addSnippetIfEnabled({snippets, name: nameVwe, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameDvwe, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameLvwe, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameSvwe, args: '$1,$2', scope})

  addSnippetIfEnabled({snippets, name: nameVh, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameDvh, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameLvh, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameSvh, args: '$1,$2', scope})

  addSnippetIfEnabled({snippets, name: nameVhc, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameDvhc, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameLvhc, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameSvhc, args: '$1,$2', scope})

  addSnippetIfEnabled({snippets, name: nameVhe, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameDvhe, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameLvhe, args: '$1,$2', scope})
  addSnippetIfEnabled({snippets, name: nameSvhe, args: '$1,$2', scope})

  return snippets
}

type PropsGenVSCodeSnippetDraft = {
  pointsSize: number
  firstIndex?: number
} & Pick<PropsAddSnippet, 'scope'>

type PropsGenVSCodeSnippetDraftWidth = PropsGenVSCodeSnippetDraft & GenFuncsNameCustomWidth

export const genVSCodeSnippetDraftWidth = ({
  pointsSize,
  scope = DEFAULT_SNIPPET.scope,
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

    addSnippetIfEnabled({snippets, name: nameVw, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameDvw, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameLvw, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameSvw, suffix: idx, scope})

    addSnippetIfEnabled({snippets, name: nameVwc, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameDvwc, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameLvwc, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameSvwc, suffix: idx, scope})

    addSnippetIfEnabled({snippets, name: nameVwe, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameDvwe, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameLvwe, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameSvwe, suffix: idx, scope})
  }

  return snippets
}

type PropsGenVSCodeSnippetDraftHeight = PropsGenVSCodeSnippetDraft & GenFuncsNameCustomHeight

export const genVSCodeSnippetDraftHeight = ({
  pointsSize,
  scope = DEFAULT_SNIPPET.scope,
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

    addSnippetIfEnabled({snippets, name: nameVh, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameDvh, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameLvh, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameSvh, suffix: idx, scope})

    addSnippetIfEnabled({snippets, name: nameVhc, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameDvhc, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameLvhc, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameSvhc, suffix: idx, scope})

    addSnippetIfEnabled({snippets, name: nameVhe, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameDvhe, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameLvhe, suffix: idx, scope})
    addSnippetIfEnabled({snippets, name: nameSvhe, suffix: idx, scope})
  }

  return snippets
}
