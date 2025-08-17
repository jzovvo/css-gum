import {vw, vwc, vwe, vh, vhc, vhe, em, lh, percent} from './core'
import type {Pixel} from './types'


interface PropsDraftFuncs {
  points?: number[]
  firstIndex?: number
}

interface PropsNameCustomWidth {
  nameVw?: string
  nameVwc?: string
  nameVwe?: string
}

interface PropsNameCustomHeight {
  nameVh?: string
  nameVhc?: string
  nameVhe?: string
}

interface PropsNameCustomOther {
  nameEm?: string
  nameLh?: string
  namePercent?: string
}

export const genDraftWidthFuncs = ({
  points = [],
  firstIndex = 1,
  nameVw = 'vw',
  nameVwc = 'vwc',
  nameVwe = 'vwe',
}: PropsDraftFuncs & PropsNameCustomWidth) => {
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
}: PropsDraftFuncs & PropsNameCustomHeight) => {
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
export const genCoreFuncs = ({
  nameEm = 'em',
  nameLh = 'lh',
  nameVh = 'vh',
  nameVhc = 'vhc',
  nameVhe = 'vhe',
  nameVw = 'vw',
  nameVwc = 'vwc',
  nameVwe = 'vwe',
  namePercent = 'percent',
}: PropsNameCustomWidth & PropsNameCustomHeight & PropsNameCustomOther = {}) => {
  return {
    [nameEm]: em,
    [nameLh]: lh,
    [nameVh]: vh,
    [nameVhc]: vhc,
    [nameVhe]: vhe,
    [nameVw]: vw,
    [nameVwc]: vwc,
    [nameVwe]: vwe,
    [namePercent]: percent,
  }
}
