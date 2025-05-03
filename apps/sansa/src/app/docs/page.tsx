// app/api-doc/page.tsx
'use client'

import { openApiDocument } from '@/lib/openapi'
import { ReactSwagger } from './react-swagger'

export default function ApiDocPage() {
  return (
    <section className="container">
      <ReactSwagger spec={openApiDocument} />
    </section>
  )
}
