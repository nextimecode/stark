import { z } from 'zod'

export const inviteParamsSchema = z
  .object({
    id: z
      .string()
      .transform(val => {
        const num = Number(val)

        if (Number.isNaN(num)) {
          throw new TypeError('Invalid invite ID')
        }
        return num
      })
      .meta({
        description: 'ID do convite',
        example: '1'
      })
  })
  .meta({
    description: 'Parâmetros para operações de convite',
    id: 'InviteParams'
  })
