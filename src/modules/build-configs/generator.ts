import {normalizePoints} from '../../utils/point-utils'
import {Order} from '../../utils/types'

export interface PropsGenTailwindBreakpointConfig {
  points: number[]
  prefix?: string
  firstIndex?: number
  unit?: string
  wrapper?: string
  order?: Order
}

export const genTailwindBreakpointConfig = ({
  points,
  prefix = 'breakpoint-p',
  firstIndex = 0,
  unit = 'px',
  wrapper = 'theme',
  order = 'asc',
}: PropsGenTailwindBreakpointConfig): string => {
  const normalizedPoints = normalizePoints(points, order)

  if (normalizedPoints.length === 0) {
    return ''
  }

  const configLines = normalizedPoints.map((point, index) => `  --${prefix}${index + firstIndex}: ${point}${unit};`)

  return [
    `@${wrapper} {`,
    ...configLines,
    '}',
  ].join('\n')
}
