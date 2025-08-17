import {Gen} from 'css-gum'

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-functions': {
      functions: {
        ...Gen.genDraftWidthFuncs({points: [375, 1440]}),
      },
    },
  },
}
