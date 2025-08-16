import { defineConfig } from 'tsup'

export default defineConfig((options) => (
  {
    clean: true,
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
    dts: true,
    sourcemap: true,
}))
