import { createDocument } from 'zod-openapi'

import { subscriptionSchema } from '@/app/api/subscriptions/route'

export const openApiDocument = createDocument({
  openapi: '3.0.0',
  info: {
    title: 'Minha API',
    version: '1.0.0'
  },
  paths: {
    '/api/subscription': {
      post: {
        requestBody: {
          content: {
            'application/json': {
              schema: subscriptionSchema
            }
          }
        },
        responses: {
          201: {
            description: 'Inscrição criada com sucesso'
          },
          400: {
            description: 'Erro de validação'
          }
        }
      }
    }
  }
})
