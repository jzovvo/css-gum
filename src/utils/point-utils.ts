import {Order} from './types'

export const normalizePoints = (points: number[], order: Order) => points.filter(point => point > 0).sort((a, b) => order === 'asc' ? a - b : b - a)
