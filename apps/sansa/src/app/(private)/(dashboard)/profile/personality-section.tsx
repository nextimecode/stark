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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface PersonalitySectionProps {
  form: any
  open: boolean
  toggle: () => void
}

export function PersonalitySection({
  form,
  open,
  toggle
}: PersonalitySectionProps) {
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
          Personalidade
        </CardTitle>
        <CardDescription>Informações sobre sua personalidade</CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              name="mbtiType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo MBTI</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu tipo MBTI" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ISTJ">ISTJ - Logístico</SelectItem>
                        <SelectItem value="ISFJ">ISFJ - Defensor</SelectItem>
                        <SelectItem value="INFJ">INFJ - Advogado</SelectItem>
                        <SelectItem value="INTJ">INTJ - Arquiteto</SelectItem>
                        <SelectItem value="ISTP">ISTP - Virtuoso</SelectItem>
                        <SelectItem value="ISFP">ISFP - Aventureiro</SelectItem>
                        <SelectItem value="INFP">INFP - Mediador</SelectItem>
                        <SelectItem value="INTP">INTP - Lógico</SelectItem>
                        <SelectItem value="ESTP">ESTP - Empresário</SelectItem>
                        <SelectItem value="ESFP">ESFP - Animador</SelectItem>
                        <SelectItem value="ENFP">ENFP - Ativista</SelectItem>
                        <SelectItem value="ENTP">ENTP - Inovador</SelectItem>
                        <SelectItem value="ESTJ">ESTJ - Executivo</SelectItem>
                        <SelectItem value="ESFJ">ESFJ - Cônsul</SelectItem>
                        <SelectItem value="ENFJ">
                          ENFJ - Protagonista
                        </SelectItem>
                        <SelectItem value="ENTJ">ENTJ - Comandante</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="introExtroScale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Escala de Introversão/Extroversão</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="text-muted-foreground flex justify-between text-sm">
                        <span>Introvertido</span>
                        <span>Extrovertido</span>
                      </div>
                      <Slider
                        defaultValue={[field.value]}
                        max={10}
                        min={1}
                        step={1}
                        onValueChange={vals => field.onChange(vals[0])}
                      />
                      <div className="text-muted-foreground text-center text-sm">
                        Valor: {field.value}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              name="communicationStyle"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Estilo de Comunicação</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-col space-y-1"
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="direct" />
                        </FormControl>
                        <FormLabel className="font-normal">Direto</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="indirect" />
                        </FormControl>
                        <FormLabel className="font-normal">Indireto</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="mixed" />
                        </FormControl>
                        <FormLabel className="font-normal">Misto</FormLabel>
                      </FormItem>
                    </RadioGroup>
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

export default PersonalitySection
