
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
}

/**
 * Logs an error message with red color formatting.
 *
 * @param message - The error message to display
 *
 * @example
 * ```typescript
 * consoleError('Invalid input parameters')
 * ```
 */
export const consoleError = (message: string) => {
  console.error(`${colors.red}[error]${colors.reset} ${message}`)
}

/**
 * Logs a warning message with yellow color formatting.
 *
 * @param message - The warning message to display
 *
 * @example
 * ```typescript
 * consoleWarn('Deprecated function usage')
 * ```
 */
export const consoleWarn = (message: string) => {
  console.warn(`${colors.yellow}[warn]${colors.reset} ${message}`)
}
