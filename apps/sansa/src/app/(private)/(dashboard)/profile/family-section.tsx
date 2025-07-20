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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Home } from 'lucide-react'

interface FamilySectionProps {
  form: any
  open: boolean
  toggle: () => void
}

export function FamilySection({ form, open, toggle }: FamilySectionProps) {
  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 cursor-pointer" onClick={toggle}>
        <button
          className="text-muted-foreground hover:text-primary"
          type="button"
        >
          {open ? 'Fechar' : 'Expandir'}
        </button>
      </div>
      <CardHeader>
        <CardTitle
          className="flex cursor-pointer items-center"
          onClick={toggle}
        >
          <Home className="mr-2 h-5 w-5" />
          Relação Familiar
        </CardTitle>
        <CardDescription>Informações sobre sua família</CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              name="familyContactFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência de Contato Familiar</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diária</SelectItem>
                        <SelectItem value="several-times-week">
                          Algumas vezes por semana
                        </SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="biweekly">Quinzenal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="special-occasions">
                          Ocasiões especiais
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="familyRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Papel na Família</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu papel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="counselor">
                          Conselheiro(a)
                        </SelectItem>
                        <SelectItem value="provider">Provedor(a)</SelectItem>
                        <SelectItem value="mediator">Mediador(a)</SelectItem>
                        <SelectItem value="caretaker">Cuidador(a)</SelectItem>
                        <SelectItem value="independent">
                          Independente
                        </SelectItem>
                        <SelectItem value="social-connector">
                          Conector(a) Social
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="familyTraditionsImportance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importância das Tradições Familiares</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a importância" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-important">
                          Muito Importante
                        </SelectItem>
                        <SelectItem value="important">Importante</SelectItem>
                        <SelectItem value="moderate">Moderada</SelectItem>
                        <SelectItem value="less-important">
                          Pouco Importante
                        </SelectItem>
                        <SelectItem value="not-important">
                          Sem Importância
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="familyDynamics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dinâmica Familiar</FormLabel>
                  <FormDescription>
                    Selecione as opções que melhor descrevem sua convivência
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('constant')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'constant'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'constant'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="dynamic-constant">
                          Convivência constante
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('balanced')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'balanced'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'balanced'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="dynamic-balanced">
                          Convivência equilibrada
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('privacy')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'privacy'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'privacy'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="dynamic-privacy">
                          Prioriza privacidade
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('casual')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([...(field.value || []), 'casual'])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'casual'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="dynamic-casual">
                          Encontros casuais
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('activities')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'activities'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'activities'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="dynamic-activities">
                          Participa de atividades familiares
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes('emotional')}
                          onCheckedChange={checked => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                'emotional'
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== 'emotional'
                                ) || []
                              )
                            }
                          }}
                        />
                        <label htmlFor="dynamic-emotional">
                          Contato emocional com distância
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default FamilySection
