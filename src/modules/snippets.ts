import type {PropsNameCustomHeight, PropsNameCustomOther, PropsNameCustomWidth} from './gen'

const DEFAULT_NAME = {
  EM: 'em',
  LH: 'lh',
  VH: 'vh',
  VHC: 'vhc',
  VHE: 'vhe',
  VW: 'vw',
  VWC: 'vwc',
  VWE: 'vwe',
  PERCENT: 'percent',
}
const DEFAULT_DRAFT_FUNC = {
  POINTS_SIZE: 0,
  FIRST_INDEX: 1,
}
const DEFAULT_SNIPPET = {
  ARGS: '$1',
}

export interface SnippetConfig {
  prefix: string
  body: string
  description?: string
}

type Snippets = Record<string, SnippetConfig>

export interface PropsDraftFuncs {
  pointsSize?: number
  firstIndex?: number
}

/**
 * Creates a snippet configuration object.
 *
 * @param params - Configuration object
 * @param params.prefix - The snippet prefix (trigger)
 * @param params.body - The snippet body (content)
 * @returns Snippet configuration object
 *
 * @example
 * ```typescript
 * const snippet = createSnippet({prefix: 'vw1', body: 'vw1($1,$2)'})
 * ```
 */
interface PropsCreateSnippet {
  prefix: string;
  body: string;
}

const createSnippet = ({prefix, body}: PropsCreateSnippet): SnippetConfig => ({
  prefix,
  body,
})
/**
 * Adds a snippet to the collection if the name is not empty.
 *
 * @param params - Configuration object
 * @param params.snippets - Snippets collection to add to
 * @param params.name - Function name prefix
 * @param params.suffix - Suffix to append to name
 * @param params.args - Arguments for the snippet body
 *
 * @example
 * ```typescript
 * addSnippetIfEnabled({snippets, name: 'vw', suffix: 1, args: '$1,$2'})
 * ```
 */

interface PropsAddSnippet {
  snippets: Snippets;
  name: string;
  suffix?: number | string;
  args?: string;
}

const addSnippetIfEnabled = ({
  snippets,
  name,
  suffix = '',
  args = DEFAULT_SNIPPET.ARGS,
}: PropsAddSnippet) => {
  if (name !== '') {
    const key = name + suffix

    snippets[key] = createSnippet({
      prefix: key,
      body: `${key}(${args})$0`,
    })
  }
}

/**
 * Generates VSCode snippets for core functions.
 *
 * @param params - Configuration object
 * @param params.nameEm - Custom name for em function
 * @param params.nameLh - Custom name for lh function
 * @param params.nameVh - Custom name for vh function
 * @param params.nameVhc - Custom name for vhc function
 * @param params.nameVhe - Custom name for vhe function
 * @param params.nameVw - Custom name for vw function
 * @param params.nameVwc - Custom name for vwc function
 * @param params.nameVwe - Custom name for vwe function
 * @param params.namePercent - Custom name for percent function
 * @returns Generated snippets object
 *
 * @example
 * ```typescript
 * const snippets = genVSCodeSnippetCore({
 *   nameVw: 'vw',
 *   namePercent: 'percent'
 * })
 * ```
 */
export const genVSCodeSnippetCore = ({
  nameEm = DEFAULT_NAME.EM,
  nameLh = DEFAULT_NAME.LH,
  nameVh = DEFAULT_NAME.VH,
  nameVhc = DEFAULT_NAME.VHC,
  nameVhe = DEFAULT_NAME.VHE,
  nameVw = DEFAULT_NAME.VW,
  nameVwc = DEFAULT_NAME.VWC,
  nameVwe = DEFAULT_NAME.VWE,
  namePercent = DEFAULT_NAME.PERCENT,
}: PropsNameCustomWidth & PropsNameCustomHeight & PropsNameCustomOther = {}) => {
  const snippets: Snippets = {}

  addSnippetIfEnabled({snippets, name: nameEm, args: '$1,$2'})
  addSnippetIfEnabled({snippets, name: nameLh, args: '$1,$2'})
  addSnippetIfEnabled({snippets, name: nameVh, args: '$1,$2'})
  addSnippetIfEnabled({snippets, name: nameVhc, args: '$1,$2'})
  addSnippetIfEnabled({snippets, name: nameVhe, args: '$1,$2'})
  addSnippetIfEnabled({snippets, name: nameVw, args: '$1,$2'})
  addSnippetIfEnabled({snippets, name: nameVwc, args: '$1,$2'})
  addSnippetIfEnabled({snippets, name: nameVwe, args: '$1,$2'})
  addSnippetIfEnabled({snippets, name: namePercent, args: '$1,$2'})

  return snippets
}

/**
 * Generates VSCode snippets for width functions with multiple design draft breakpoints.
 *
 * @param params - Configuration object
 * @param params.pointsSize - Number of breakpoints to generate
 * @param params.firstIndex - Starting index for generated function names
 * @param params.nameVw - Prefix for vw functions
 * @param params.nameVwc - Prefix for vwc functions
 * @param params.nameVwe - Prefix for vwe functions
 * @returns Generated snippets object
 *
 * @example
 * ```typescript
 * const snippets = genVSCodeSnippetDraftWidth({
 *   pointsSize: 3,
 *   nameVw: 'vw'
 * })
 * ```
 */
export const genVSCodeSnippetDraftWidth = ({
  pointsSize = DEFAULT_DRAFT_FUNC.POINTS_SIZE,
  firstIndex = DEFAULT_DRAFT_FUNC.FIRST_INDEX,
  nameVw = DEFAULT_NAME.VW,
  nameVwc = DEFAULT_NAME.VWC,
  nameVwe = DEFAULT_NAME.VWE,
}: PropsDraftFuncs & PropsNameCustomWidth = {}) => {
  const snippets: Snippets = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addSnippetIfEnabled({snippets, name: nameVw, suffix: idx})
    addSnippetIfEnabled({snippets, name: nameVwc, suffix: idx})
    addSnippetIfEnabled({snippets, name: nameVwe, suffix: idx})
  }

  return snippets
}

/**
 * Generates VSCode snippets for height functions with multiple design draft breakpoints.
 *
 * @param params - Configuration object
 * @param params.pointsSize - Number of breakpoints to generate
 * @param params.firstIndex - Starting index for generated function names
 * @param params.nameVh - Prefix for vh functions
 * @param params.nameVhc - Prefix for vhc functions
 * @param params.nameVhe - Prefix for vhe functions
 * @returns Generated snippets object
 *
 * @example
 * ```typescript
 * const snippets = genVSCodeSnippetDraftHeight({
 *   pointsSize: 3,
 *   nameVh: 'vh'
 * })
 * ```
 */
export const genVSCodeSnippetDraftHeight = ({
  pointsSize = DEFAULT_DRAFT_FUNC.POINTS_SIZE,
  firstIndex = DEFAULT_DRAFT_FUNC.FIRST_INDEX,
  nameVh = DEFAULT_NAME.VH,
  nameVhc = DEFAULT_NAME.VHC,
  nameVhe = DEFAULT_NAME.VHE,
}: PropsDraftFuncs & PropsNameCustomHeight = {}) => {
  const snippets: Snippets = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addSnippetIfEnabled({snippets, name: nameVh, suffix: idx})
    addSnippetIfEnabled({snippets, name: nameVhc, suffix: idx})
    addSnippetIfEnabled({snippets, name: nameVhe, suffix: idx})
  }

  return snippets
}
