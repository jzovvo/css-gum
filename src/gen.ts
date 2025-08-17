import {vw, vwc, vwe, vh, vhc, vhe} from './core'
import type {Pixel} from './types'


interface PropsDraftFuncs {
  points?: number[]
  firstIndex?: number
}

interface PropsDraftWidthFuncs {
  nameVw?: string
  nameVwc?: string
  nameVwe?: string
}

interface PropsDraftHeightFuncs {
  nameVh?: string
  nameVhc?: string
  nameVhe?: string
}

export const genDraftWidthFuncs = ({
  points = [],
  firstIndex = 1,
  nameVw = 'vw',
  nameVwc = 'vwc',
  nameVwe = 'vwe',
}: PropsDraftFuncs & PropsDraftWidthFuncs) => {
  points.sort((a, b) => a - b)

  const temp: Record<string, (pixel: Pixel) => string> = {}

  for (let i = 0; i < points.length; i++) {
    const idx = i + firstIndex
    const point = points[i] ?? 0

    temp[nameVw + idx] = (pixel: Pixel) => vw(pixel, point)
    temp[nameVwc + idx] = (pixel: Pixel) => vwc(pixel, point)
    temp[nameVwe + idx] = (pixel: Pixel) => vwe(pixel, point)
  }

  return temp
}
export const genDraftHeightFuncs = ({
  points = [],
  firstIndex = 1,
  nameVh = 'vh',
  nameVhc = 'vhc',
  nameVhe = 'vhe',
}: PropsDraftFuncs & PropsDraftHeightFuncs) => {
  points.sort((a, b) => a - b)

  const temp: Record<string, (pixel: Pixel) => string> = {}

  for (let i = 0; i < points.length; i++) {
    const idx = i + firstIndex
    const point = points[i] ?? 0

    temp[nameVh + idx] = (pixel: Pixel) => vh(pixel, point)
    temp[nameVhc + idx] = (pixel: Pixel) => vhc(pixel, point)
    temp[nameVhe + idx] = (pixel: Pixel) => vhe(pixel, point)
  }

  return temp
}
