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

interface InterestsSectionProps {
  form: any
  open: boolean
  toggle: () => void
}

export function InterestsSection({
  form,
  open,
  toggle
}: InterestsSectionProps) {
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
          Interesses e Hobbies
        </CardTitle>
        <CardDescription>Seus gostos e atividades preferidas</CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              name="hobbies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hobbies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Liste seus hobbies favoritos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="musicPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferências Musicais</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Liste seus gêneros musicais"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="leisureActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atividades de Lazer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Como prefere passar seu tempo livre?"
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

export default InterestsSection
