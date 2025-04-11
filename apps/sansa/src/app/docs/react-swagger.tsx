import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export interface ReactSwaggerProps {
  spec: Record<string, any>
}

export function ReactSwagger({ spec }: ReactSwaggerProps) {
  return <SwaggerUI spec={spec} />
}
