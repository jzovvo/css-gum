import type {PropsNameCustomHeight, PropsNameCustomOther, PropsNameCustomWidth} from './gen'
import fs from 'fs'
import {dirname} from 'path'

interface PropFile {
  output?: string[]
}

interface PropsDraftFuncs {
  pointsSize?: number
  firstIndex?: number
}

interface SnippetConfig {
  prefix: string
  body: string
  description?: string
}

/**
 * Reads existing VS Code snippets file and returns parsed JSON object
 * @param filePath - Path to the snippets file
 * @returns Parsed snippets object or empty object if file doesn't exist or is invalid
 */
const readExistingSnippets = (filePath: string): Record<string, SnippetConfig> => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')

      return JSON.parse(content)
    }
  } catch (error) {
    console.warn(`Warning: Could not parse existing snippets file ${filePath}:`, error)
    console.warn('Creating backup and starting with empty snippets')

    try {
      const backupPath = `${filePath}.backup`

      fs.copyFileSync(filePath, backupPath)
      console.warn(`Backup created at: ${backupPath}`)
    } catch (backupError) {
      console.warn('Could not create backup:', backupError)
    }
  }

  return {}
}
/**
 * Merges new snippets with existing ones, removing duplicate keys
 * @param existing - Existing snippets object
 * @param newSnippets - New snippets to add
 * @returns Merged snippets object
 */
const mergeSnippets = (existing: Record<string, SnippetConfig>, newSnippets: Record<string, SnippetConfig>): Record<string, SnippetConfig> => {
  return {...existing, ...newSnippets}
}
/**
 * Writes snippets to output files
 * @param snippets - Snippets object to write
 * @param output - Array of file paths to write to
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
 * Creates a snippet configuration object
 * @param prefix - The snippet prefix (trigger)
 * @param body - The snippet body (content)
 * @returns Snippet configuration object
 */
const createSnippet = (prefix: string, body: string): SnippetConfig => ({
  prefix,
  body,
})
/**
 * Adds a snippet to the collection if the name is not empty
 * @param snippets - Snippets collection to add to
 * @param name - Function name prefix
 * @param index - Index to append to name
 * @param args - Arguments for the snippet body
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

export const genVscodeSnippetCore = ({
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

  // Add core function snippets (all take 2 arguments)
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
 * Generates VS Code snippets for width functions with multiple design draft breakpoints
 * @param params - Configuration object
 * @returns Generated snippets object
 */
export const genVscodeSnippetDraftWidth = ({
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
 * Generates VS Code snippets for height functions with multiple design draft breakpoints
 * @param params - Configuration object
 * @returns Generated snippets object
 */
export const genVscodeSnippetDraftHeight = ({
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
