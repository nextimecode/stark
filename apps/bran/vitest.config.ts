// vitest.config.ts

import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    root: './'
  },
  plugins: [
    tsConfigPaths(),
  ],
  esbuild: {
    target: 'esnext',
    loader: 'ts',
    format: 'esm',
  },
  resolve: {
    mainFields: ['module', 'main', 'jsnext:main'],
    conditions: ['import', 'require'],
    extensions: ['.mjs', '.js', '.ts', '.json']
  }
})
