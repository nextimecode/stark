'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
  FormControl,
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

interface RelationshipSectionProps {
  form: any
  open: boolean
  toggle: () => void
}

export function RelationshipSection({
  form,
  open,
  toggle
}: RelationshipSectionProps) {
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
        <CardTitle onClick={toggle} className="cursor-pointer">
          Configurações de Relacionamento
        </CardTitle>
        <CardDescription>Como você se relaciona com os outros</CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="relationshipFocus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foco Principal</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de relacionamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="romantic">Romântico</SelectItem>
                        <SelectItem value="professional">
                          Profissional
                        </SelectItem>
                        <SelectItem value="friendship">Amizade</SelectItem>
                        <SelectItem value="family">Familiar</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredContactFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência de Contato</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diária</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="occasional">Ocasional</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conflictResolutionStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estilo de Resolução de Conflitos</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Como lida com conflitos?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confrontational">
                          Confrontacional
                        </SelectItem>
                        <SelectItem value="compromising">
                          Conciliador
                        </SelectItem>
                        <SelectItem value="avoiding">Evitativo</SelectItem>
                        <SelectItem value="collaborative">
                          Colaborativo
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

export default RelationshipSection
