export interface PropsGenTailwindBreakpointConfig {
  points: number[]
  prefix?: string
  firstIndex?: number
  unit?: string
  wrapper?: string
}

export const genTailwindBreakpointConfig = ({
  points,
  prefix = 'breakpoint-p',
  firstIndex = 0,
  unit = 'px',
  wrapper = 'theme',
}: PropsGenTailwindBreakpointConfig): string => {
  const validPoints = points.filter(point => point > 0).sort((a, b) => a - b)

  if (validPoints.length === 0) {
    return ''
  }

  const configLines = validPoints.map((point, index) => `  --${prefix}${index + firstIndex}: ${point}${unit};`)

  return [
    `@${wrapper} {`,
    ...configLines,
    '}',
  ].join('\n')
}
