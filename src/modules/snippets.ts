import type {PropsNameCustomHeight, PropsNameCustomOther, PropsNameCustomWidth} from './gen'


export interface PropsDraftFuncs {
  pointsSize?: number
  firstIndex?: number
}

export interface SnippetConfig {
  prefix: string
  body: string
  description?: string
}

/**
 * Creates a snippet configuration object.
 *
 * @param prefix - The snippet prefix (trigger)
 * @param body - The snippet body (content)
 * @returns Snippet configuration object
 *
 * @example
 * ```typescript
 * const snippet = createSnippet('vw1', 'vw1($1,$2)')
 * ```
 */
const createSnippet = (prefix: string, body: string): SnippetConfig => ({
  prefix,
  body,
})
/**
 * Adds a snippet to the collection if the name is not empty.
 *
 * @param snippets - Snippets collection to add to
 * @param name - Function name prefix
 * @param index - Index to append to name
 * @param args - Arguments for the snippet body
 *
 * @example
 * ```typescript
 * addSnippetIfEnabled(snippets, 'vw', 1, '$1,$2')
 * ```
 */
const addSnippetIfEnabled = (
  snippets: Record<string, SnippetConfig>,
  name: string,
  index: number | string = '',
  args: string = '$1',
) => {
  if (name !== '') {
    const key = name + index

    snippets[key] = createSnippet(key, `${key}(${args})`)
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
  nameEm = 'em',
  nameLh = 'lh',
  nameVh = 'vh',
  nameVhc = 'vhc',
  nameVhe = 'vhe',
  nameVw = 'vw',
  nameVwc = 'vwc',
  nameVwe = 'vwe',
  namePercent = 'percent',
}: PropsNameCustomWidth & PropsNameCustomHeight & PropsNameCustomOther = {}) => {
  const snippets: Record<string, SnippetConfig> = {}

  addSnippetIfEnabled(snippets, nameEm, '', '$1,$2')
  addSnippetIfEnabled(snippets, nameLh, '', '$1,$2')
  addSnippetIfEnabled(snippets, nameVh, '', '$1,$2')
  addSnippetIfEnabled(snippets, nameVhc, '', '$1,$2')
  addSnippetIfEnabled(snippets, nameVhe, '', '$1,$2')
  addSnippetIfEnabled(snippets, nameVw, '', '$1,$2')
  addSnippetIfEnabled(snippets, nameVwc, '', '$1,$2')
  addSnippetIfEnabled(snippets, nameVwe, '', '$1,$2')
  addSnippetIfEnabled(snippets, namePercent, '', '$1,$2')

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
  pointsSize = 0,
  firstIndex = 1,
  nameVw = 'vw',
  nameVwc = 'vwc',
  nameVwe = 'vwe',
}: PropsDraftFuncs & PropsNameCustomWidth = {}) => {
  const snippets: Record<string, SnippetConfig> = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addSnippetIfEnabled(snippets, nameVw, idx)
    addSnippetIfEnabled(snippets, nameVwc, idx)
    addSnippetIfEnabled(snippets, nameVwe, idx)
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
  pointsSize = 0,
  firstIndex = 1,
  nameVh = 'vh',
  nameVhc = 'vhc',
  nameVhe = 'vhe',
}: PropsDraftFuncs & PropsNameCustomHeight = {}) => {
  const snippets: Record<string, SnippetConfig> = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addSnippetIfEnabled(snippets, nameVh, idx)
    addSnippetIfEnabled(snippets, nameVhc, idx)
    addSnippetIfEnabled(snippets, nameVhe, idx)
  }

  return snippets
}
