import { compatibilityTestSchema } from '@/app/api/compatibility/route'
import { createDocument } from 'zod-openapi'
import { subscriptionSchema } from '../app/api/subscriptions/route'

export const openApiDocument = createDocument({
  info: {
    title: 'Stark API',
    version: '1.0.0'
  },
  openapi: '3.1.1',
  paths: {
    '/api/compatibility': {
      post: {
        requestBody: {
          content: {
            'application/json': {
              schema: compatibilityTestSchema
            }
          }
        },
        responses: {
          200: {
            description: 'Teste de compatibilidade realizado com sucesso'
          },
          400: { description: 'Erro de validação' },
          404: { description: 'Usuário não encontrado' },
          500: { description: 'Erro interno no servidor' }
        }
      }
    },
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
          201: { description: 'Inscrição criada com sucesso' },
          400: { description: 'Erro de validação' }
        }
      }
    }
  }
})
