'use client'

import type { OpenAPIObject } from 'openapi3-ts/oas31'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export interface ReactSwaggerProps {
  spec: OpenAPIObject
}

export function ReactSwagger({ spec }: ReactSwaggerProps) {
  return <SwaggerUI spec={spec} />
}
