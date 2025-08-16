import { defineConfig } from 'tsup'

export default defineConfig((options) => (
  {
  entry: [
    'src/index.ts'
  ],
  minify: !options.watch,
  format: [
    'esm',
    'cjs',
  ],
  target: [
    'es6'
  ],
  treeshake: true,
}))
