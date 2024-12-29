// vitest.config.ts

import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    deps: {
      fallbackCJS: true,
    },
  },
  plugins: [tsConfigPaths()],
  esbuild: {
    target: 'esnext',
    loader: 'ts',
    format: 'esm'
  },
  resolve: {
    alias: {
      '@/*': path.resolve(__dirname, 'apps/bran/src/*'),
    },
    mainFields: ['module', 'main', 'jsnext:main'],
    conditions: ['import', 'require'],
    extensions: ['.mjs', '.js', '.ts', '.json']
  }
})
