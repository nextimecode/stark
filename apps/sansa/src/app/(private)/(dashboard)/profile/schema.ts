import * as z from 'zod'

export const profileFormSchema = z.object({
  // Dados básicos
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  age: z.number().refine(val => !isNaN(Number(val)) && Number(val) >= 18, {
    message: 'Idade deve ser um número maior que 18'
  }),
  location: z.string().min(2, { message: 'Localização é obrigatória' }),

  // Personalidade
  mbtiType: z.string(),
  introExtroScale: z.number().min(1).max(10),
  communicationStyle: z.enum(['direct', 'indirect', 'mixed']),

  // Interesses
  hobbies: z.string(),
  musicPreference: z.string(),
  leisureActivities: z.string(),

  // Valores e expectativas
  coreValues: z.string(),
  lifeGoals: z.string(),
  relationshipExpectations: z.string(),

  // Configurações de relacionamento
  relationshipFocus: z.enum([
    'romantic',
    'professional',
    'friendship',
    'family'
  ]),
  desiredContactFrequency: z.enum(['daily', 'weekly', 'monthly', 'occasional']),
  conflictResolutionStyle: z.enum([
    'confrontational',
    'compromising',
    'avoiding',
    'collaborative'
  ]),

  // Extras específicos de contexto
  workingStyle: z.string().optional(),
  careerGoals: z.string().optional(),
  familyImportance: z.number().optional(),
  traditionalValues: z.number().optional(),

  // Relacionamento Amoroso
  maritalStatus: z.string().optional(),
  relationshipDuration: z.string().optional(),
  communicationExpectation: z.string().optional(),
  intimacyExpectation: z.string().optional(),

  // Ambiente de Trabalho
  technicalSkills: z.string().optional(),
  professionalExperience: z.string().optional(),
  workArea: z.string().optional(),
  currentPosition: z.string().optional(),
  workPreferences: z.array(z.string()).optional(),
  careerObjectives: z.string().optional(),

  // Amizade
  friendHobbies: z.array(z.string()).optional(),
  socializationFrequency: z.string().optional(),
  communicationPreference: z.string().optional(),
  friendActivities: z.array(z.string()).optional(),

  // Relação Familiar
  familyContactFrequency: z.string().optional(),
  familyRole: z.string().optional(),
  familyTraditionsImportance: z.string().optional(),
  familyDynamics: z.array(z.string()).optional()
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
