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
import { Textarea } from '@/components/ui/textarea'

interface ValuesSectionProps {
  form: any
  open: boolean
  toggle: () => void
}

export function ValuesSection({ form, open, toggle }: ValuesSectionProps) {
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
        <CardTitle className="cursor-pointer" onClick={toggle}>
          Valores e Expectativas
        </CardTitle>
        <CardDescription>O que é importante para você</CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              name="coreValues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valores Centrais</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Quais valores são importantes para você?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="lifeGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivos de Vida</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Quais são seus principais objetivos?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="relationshipExpectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expectativas em Relacionamentos</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="O que espera de um relacionamento?"
                      {...field}
                    />
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

export default ValuesSection
