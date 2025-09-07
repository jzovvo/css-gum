import {consoleWarn} from '../../utils/console'
import fs from 'fs'
import {dirname} from 'path'
import type {SnippetConfig} from '../../utils/types'

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
const mergeSnippets = (existing: Record<string, SnippetConfig>, newSnippets: Record<string, SnippetConfig>): Record<string, SnippetConfig> => {
  return {...existing, ...newSnippets}
}

export const writeSnippetsToFiles = (snippets: Record<string, SnippetConfig>, output: string[]) => {
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
