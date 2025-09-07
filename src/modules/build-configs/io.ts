import {consoleWarn} from '../../utils/console'
import fs from 'fs'
import {dirname} from 'path'

const readExistingConfig = (filePath: string): string => {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8').trim()
    }
  } catch (error) {
    consoleWarn(`Could not read existing config file ${filePath}: ${error}`)
  }

  return ''
}

export const writeConfigToFiles = (_config: string, outputPaths: string[]) => {
  const config = _config.trim()
  if (!config) {
    consoleWarn('Config content is empty, skipping write operation')
    return
  }

  for (let i = 0; i < outputPaths.length; i++) {
    const filePath = outputPaths[i]

    const dir = dirname(filePath)
    const existingConfig = readExistingConfig(filePath)

    if (existingConfig === config) {
      continue
    }

    if (existingConfig !== '') {
      try {
        const backupPath = `${filePath}.backup`
        fs.writeFileSync(backupPath, existingConfig)
        consoleWarn(`Backup created at: ${backupPath}`)
      } catch (backupError) {
        consoleWarn(`Could not create backup: ${backupError}`)
      }
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true})
    }

    try {
      fs.writeFileSync(filePath, config)
    } catch (writeError) {
      consoleWarn(`Could not write config to ${filePath}: ${writeError}`)
    }
  }
}
