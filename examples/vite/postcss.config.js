import {Gen} from 'css-gum'

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-functions': {
      functions: {
        ...Gen.genFuncsDraftWidth({points: [375, 1440]}),
      },
    },
  },
}
