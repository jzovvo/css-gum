import type {PropsNameCustomHeight, PropsNameCustomOther, PropsNameCustomWidth} from './gen'
import {consoleWarn} from '../utils/console'
import fs from 'fs'
import {dirname} from 'path'

interface PropFile {
  output?: string[]
}

interface PropsDraftFuncs {
  pointsSize?: number
  firstIndex?: number
}

export interface SnippetConfig {
  prefix: string
  body: string
  description?: string
}

/**
 * Reads existing VSCode snippets file and returns parsed JSON object.
 *
 * @param filePath - Path to the snippets file
 * @returns Parsed snippets object or empty object if file doesn't exist or is invalid
 *
 * @example
 * ```typescript
 * const snippets = readExistingSnippets('.vscode/css.code-snippets')
 * ```
 */
const readExistingSnippets = (filePath: string): Record<string, SnippetConfig> => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')

      return JSON.parse(content)
    }
  } catch (error) {
    consoleWarn(`Could not parse existing snippets file ${filePath}: ${error}`)
    consoleWarn('Creating backup and starting with empty snippets')

    try {
      const backupPath = `${filePath}.backup`

      fs.copyFileSync(filePath, backupPath)
      consoleWarn(`Backup created at: ${backupPath}`)
    } catch (backupError) {
      consoleWarn(`Could not create backup: ${backupError}`)
    }
  }

  return {}
}
/**
 * Merges new snippets with existing ones, removing duplicate keys.
 *
 * @param existing - Existing snippets object
 * @param newSnippets - New snippets to add
 * @returns Merged snippets object
 *
 * @example
 * ```typescript
 * const merged = mergeSnippets(existingSnippets, newSnippets)
 * ```
 */
const mergeSnippets = (existing: Record<string, SnippetConfig>, newSnippets: Record<string, SnippetConfig>): Record<string, SnippetConfig> => {
  return {...existing, ...newSnippets}
}
/**
 * Writes snippets to output files.
 *
 * @param snippets - Snippets object to write
 * @param output - Array of file paths to write to
 *
 * @example
 * ```typescript
 * writeSnippetsToFiles(snippets, ['.vscode/css.code-snippets'])
 * ```
 */
const writeSnippetsToFiles = (snippets: Record<string, SnippetConfig>, output: string[]) => {
  for (let i = 0; i < output.length; i++) {
    const filePath = output[i]
    const dir = dirname(filePath)
    const existingSnippets = readExistingSnippets(filePath)
    const mergedSnippets = mergeSnippets(existingSnippets, snippets)
    const content = JSON.stringify(mergedSnippets, null, 2)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true})
    }

    fs.writeFileSync(filePath, content)
  }
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
 * @param params.output - Array of output file paths
 * @returns Generated snippets object
 *
 * @example
 * ```typescript
 * const snippets = genVSCodeSnippetCore({
 *   nameVw: 'vw',
 *   namePercent: 'percent',
 *   output: ['.vscode/css.code-snippets']
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
  output = [],
}: PropsNameCustomWidth & PropsNameCustomHeight & PropsNameCustomOther & PropFile = {}) => {
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

  writeSnippetsToFiles(snippets, output)

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
 * @param params.output - Array of output file paths
 * @returns Generated snippets object
 *
 * @example
 * ```typescript
 * const snippets = genVSCodeSnippetDraftWidth({
 *   pointsSize: 3,
 *   nameVw: 'vw',
 *   output: ['.vscode/css.code-snippets']
 * })
 * ```
 */
export const genVSCodeSnippetDraftWidth = ({
  pointsSize = 0,
  firstIndex = 1,
  nameVw = 'vw',
  nameVwc = 'vwc',
  nameVwe = 'vwe',
  output = [],
}: PropsDraftFuncs & PropsNameCustomWidth & PropFile = {}) => {
  const snippets: Record<string, SnippetConfig> = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addSnippetIfEnabled(snippets, nameVw, idx)
    addSnippetIfEnabled(snippets, nameVwc, idx)
    addSnippetIfEnabled(snippets, nameVwe, idx)
  }

  writeSnippetsToFiles(snippets, output)

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
 * @param params.output - Array of output file paths
 * @returns Generated snippets object
 *
 * @example
 * ```typescript
 * const snippets = genVSCodeSnippetDraftHeight({
 *   pointsSize: 3,
 *   nameVh: 'vh',
 *   output: ['.vscode/css.code-snippets']
 * })
 * ```
 */
export const genVSCodeSnippetDraftHeight = ({
  pointsSize = 0,
  firstIndex = 1,
  nameVh = 'vh',
  nameVhc = 'vhc',
  nameVhe = 'vhe',
  output = [],
}: PropsDraftFuncs & PropsNameCustomHeight & PropFile = {}) => {
  const snippets: Record<string, SnippetConfig> = {}

  for (let i = 0; i < pointsSize; i++) {
    const idx = i + firstIndex

    addSnippetIfEnabled(snippets, nameVh, idx)
    addSnippetIfEnabled(snippets, nameVhc, idx)
    addSnippetIfEnabled(snippets, nameVhe, idx)
  }

  writeSnippetsToFiles(snippets, output)

  return snippets
}
