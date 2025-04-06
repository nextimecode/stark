'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { Save, UserCircle } from 'lucide-react'

import { ProfileFormValues, profileFormSchema } from './schema'

export interface ProfileFormProps {}

export function ProfileForm({}: ProfileFormProps) {
  const router = useRouter()
  const [openSections, setOpenSections] = useState({
    basic: true,
    personality: false,
    interests: false,
    values: false,
    relationship: false,
    romantic: false,
    professional: false,
    friendship: false,
    family: false
  })

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      introExtroScale: 5,
      communicationStyle: 'mixed',
      relationshipFocus: 'romantic',
      desiredContactFrequency: 'weekly',
      conflictResolutionStyle: 'collaborative',
      familyImportance: 5,
      traditionalValues: 5,
      workPreferences: [],
      friendHobbies: [],
      friendActivities: [],
      familyDynamics: []
    }
  })

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // Aqui você faria uma chamada API para salvar os dados

      // Simulando um processo de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } catch (error) {
      console.error('Erro ao salvar os dados:', error)
    }
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Seção 1: Dados Básicos */}
        <Card className="relative">
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => toggleSection('basic')}
          >
            <button
              type="button"
              className="text-muted-foreground hover:text-primary"
            >
              {openSections.basic ? 'Fechar' : 'Expandir'}
            </button>
          </div>
          <CardHeader>
            <CardTitle
              onClick={() => toggleSection('basic')}
              className="cursor-pointer flex items-center"
            >
              <UserCircle className="mr-2 h-5 w-5" />
              Dados Básicos
            </CardTitle>
            <CardDescription>Informações gerais sobre você</CardDescription>
          </CardHeader>
          <Collapsible open={openSections.basic}>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu.email@exemplo.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idade</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="25" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localização</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade, Estado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Botão de Submissão */}
        <div className="flex justify-end pt-6">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar e Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}
