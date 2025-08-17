import {vw, lvw, ddws, vh, lvh, ddhs} from './core'
import type {Pixel} from './types'


interface PropsDraftFuncs {
  points?: number[]
  firstIndex?: number
}

interface PropsDraftWidthFuncs {
  nameVw?: string
  nameLvw?: string
  nameDdws?: string
}

interface PropsDraftHeightFuncs {
  nameVh?: string
  nameLvh?: string
  nameDdhs?: string
}

export const genDraftWidthFuncs = ({
  points = [],
  firstIndex = 1,
  nameVw = 'vw',
  nameLvw = 'lvw',
  nameDdws = 'ddws',
}: PropsDraftFuncs & PropsDraftWidthFuncs) => {
  points.sort((a, b) => a - b)

  const temp: Record<string, (pixel: Pixel) => string> = {}
  for (let i = 0; i < points.length; i++) {
    const idx = i + firstIndex
    const point = points[i] ?? 0
    temp[nameVw + idx] = (pixel: Pixel) => vw(pixel, point)
    temp[nameLvw + idx] = (pixel: Pixel) => lvw(pixel, point)
    temp[nameDdws + idx] = (pixel: Pixel) => ddws(pixel, point)
  }
  return temp
}

export const genDraftHeightFuncs = ({
  points = [],
  firstIndex = 1,
  nameVh = 'vh',
  nameLvh = 'lvh',
  nameDdhs = 'ddhs',
}: PropsDraftFuncs & PropsDraftHeightFuncs) => {
  points.sort((a, b) => a - b)

  const temp: Record<string, (pixel: Pixel) => string> = {}
  for (let i = 0; i < points.length; i++) {
    const idx = i + firstIndex
    const point = points[i] ?? 0
    temp[nameVh + idx] = (pixel: Pixel) => vh(pixel, point)
    temp[nameLvh + idx] = (pixel: Pixel) => lvh(pixel, point)
    temp[nameDdhs + idx] = (pixel: Pixel) => ddhs(pixel, point)
  }
  return temp
}
