import * as z from 'zod'

export const profileFormSchema = z.object({
  age: z
    .number()
    .refine(val => !Number.isNaN(Number(val)) && Number(val) >= 18, {
      message: 'Idade deve ser um número maior que 18'
    }),
  careerGoals: z.string().optional(),
  careerObjectives: z.string().optional(),
  communicationExpectation: z.string().optional(),

  communicationPreference: z.string().optional(),
  communicationStyle: z.enum(['direct', 'indirect', 'mixed']),
  conflictResolutionStyle: z.enum([
    'confrontational',
    'compromising',
    'avoiding',
    'collaborative'
  ]),

  // Valores e expectativas
  coreValues: z.string(),
  currentPosition: z.string().optional(),
  desiredContactFrequency: z.enum(['daily', 'weekly', 'monthly', 'occasional']),

  email: z.string().email({ message: 'Email inválido' }),
  // Relação Familiar
  familyContactFrequency: z.string().optional(),
  familyDynamics: z.array(z.string()).optional(),

  familyImportance: z.number().optional(),
  familyRole: z.string().optional(),
  familyTraditionsImportance: z.string().optional(),

  friendActivities: z.array(z.string()).optional(),
  // Amizade
  friendHobbies: z.array(z.string()).optional(),
  // Interesses
  hobbies: z.string(),
  intimacyExpectation: z.string().optional(),

  introExtroScale: z.number().min(1).max(10),
  leisureActivities: z.string(),
  lifeGoals: z.string(),
  location: z.string().min(2, { message: 'Localização é obrigatória' }),

  // Relacionamento Amoroso
  maritalStatus: z.string().optional(),
  // Personalidade
  mbtiType: z.string(),
  musicPreference: z.string(),
  // Dados básicos
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  professionalExperience: z.string().optional(),
  relationshipDuration: z.string().optional(),

  relationshipExpectations: z.string(),
  // Configurações de relacionamento
  relationshipFocus: z.enum([
    'romantic',
    'professional',
    'friendship',
    'family'
  ]),
  socializationFrequency: z.string().optional(),
  // Ambiente de Trabalho
  technicalSkills: z.string().optional(),

  traditionalValues: z.number().optional(),
  workArea: z.string().optional(),
  // Extras específicos de contexto
  workingStyle: z.string().optional(),
  workPreferences: z.array(z.string()).optional()
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
