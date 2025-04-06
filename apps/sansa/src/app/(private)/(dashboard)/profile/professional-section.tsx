'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { Briefcase } from 'lucide-react'

interface ProfessionalSectionProps {
  form: any
  open: boolean
  toggle: () => void
}

export function ProfessionalSection({
  form,
  open,
  toggle
}: ProfessionalSectionProps) {
  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 cursor-pointer" onClick={toggle}>
        <button
          type="button"
          className="text-muted-foreground hover:text-primary"
        >
          {open ? 'Fechar' : 'Expandir'}
        </button>
      </div>
      <CardHeader>
        <CardTitle
          onClick={toggle}
          className="cursor-pointer flex items-center"
        >
          <Briefcase className="mr-2 h-5 w-5" />
          Ambiente de Trabalho
        </CardTitle>
        <CardDescription>Informações sobre sua carreira</CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="technicalSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilidades Técnicas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Liste suas habilidades técnicas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="professionalExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiência Profissional</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tempo de experiência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1-year">
                          Menos de 1 ano
                        </SelectItem>
                        <SelectItem value="1-3-years">1 a 3 anos</SelectItem>
                        <SelectItem value="3-5-years">3 a 5 anos</SelectItem>
                        <SelectItem value="5-10-years">5 a 10 anos</SelectItem>
                        <SelectItem value="more-than-10-years">
                          Mais de 10 anos
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Atuação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex.: Desenvolvimento Frontend"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo Atual</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Desenvolvedor Sênior" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estilo de Trabalho</FormLabel>
                  <FormDescription>
                    Selecione as opções que melhor descrevem seu estilo
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('individual')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'individual'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'individual'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="work-individual">Individual</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('team')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([...(field.value || []), 'team'])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'team'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="work-team">Equipe</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('structured')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'structured'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'structured'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="work-structured">Estruturado</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('flexible')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'flexible'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'flexible'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="work-flexible">Flexível</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('remote')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([...(field.value || []), 'remote'])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'remote'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="work-remote">Remoto</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('presential')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'presential'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'presential'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="work-presential">Presencial</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('hybrid')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([...(field.value || []), 'hybrid'])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'hybrid'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="work-hybrid">Híbrido</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="careerObjectives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivos de Carreira</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical-growth">
                          Crescimento Técnico
                        </SelectItem>
                        <SelectItem value="leadership">Liderança</SelectItem>
                        <SelectItem value="stability">Estabilidade</SelectItem>
                        <SelectItem value="challenges">Desafios</SelectItem>
                        <SelectItem value="work-life-balance">
                          Equilíbrio Trabalho/Vida
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default ProfessionalSection
