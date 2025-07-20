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
import { Input } from '@/components/ui/input'
import { UserCircle } from 'lucide-react'

interface BasicSectionProps {
  form: any
  open: boolean
  toggle: () => void
}

export function BasicSection({ form, open, toggle }: BasicSectionProps) {
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
          <UserCircle className="mr-2 h-5 w-5" />
          Dados Básicos
        </CardTitle>
        <CardDescription>Informações gerais sobre você</CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
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
              control={form.control}
            />
            <FormField
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
              control={form.control}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
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
                control={form.control}
              />
              <FormField
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
                control={form.control}
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default BasicSection
