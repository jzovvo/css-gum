
// ANSI color codes
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
}

export const consoleError = (message: string) => {
  console.error(`${colors.red}[error]${colors.reset} ${message}`)
}

export const consoleWarn = (message: string) => {
  console.warn(`${colors.yellow}[warn]${colors.reset} ${message}`)
}
