// vitest.workspace.js

import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./apps/bran/vitest.config.e2e.ts",
  "./apps/bran/vitest.config.ts",
  "./apps/bran/dist/vitest.config.js",
  "./apps/bran/dist/vitest.config.e2e.js"
])
