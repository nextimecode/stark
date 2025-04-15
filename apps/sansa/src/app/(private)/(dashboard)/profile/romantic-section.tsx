"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Heart } from "lucide-react";

interface RomanticSectionProps {
  form: any;
  open: boolean;
  toggle: () => void;
}

export function RomanticSection({ form, open, toggle }: RomanticSectionProps) {
  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 cursor-pointer" onClick={toggle}>
        <button
          type="button"
          className="text-muted-foreground hover:text-primary"
        >
          {open ? "Fechar" : "Expandir"}
        </button>
      </div>
      <CardHeader>
        <CardTitle
          onClick={toggle}
          className="cursor-pointer flex items-center"
        >
          <Heart className="mr-2 h-5 w-5" />
          Relacionamento Amoroso
        </CardTitle>
        <CardDescription>
          Informações sobre relacionamentos amorosos
        </CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu estado civil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Solteiro(a)</SelectItem>
                        <SelectItem value="dating">Namorando</SelectItem>
                        <SelectItem value="married">Casado(a)</SelectItem>
                        <SelectItem value="stable-union">
                          União Estável
                        </SelectItem>
                        <SelectItem value="divorced">Divorciado(a)</SelectItem>
                        <SelectItem value="widowed">Viúvo(a)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="relationshipDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo de Relacionamento</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tempo do relacionamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-applicable">
                          Não aplicável
                        </SelectItem>
                        <SelectItem value="less-than-6-months">
                          Menos de 6 meses
                        </SelectItem>
                        <SelectItem value="6-months-to-1-year">
                          6 meses a 1 ano
                        </SelectItem>
                        <SelectItem value="1-3-years">1 a 3 anos</SelectItem>
                        <SelectItem value="3-5-years">3 a 5 anos</SelectItem>
                        <SelectItem value="more-than-5-years">
                          Mais de 5 anos
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
              name="communicationExpectation"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Expectativas sobre Comunicação</FormLabel>
                  <FormDescription>
                    Selecione a opção que melhor descreve sua expectativa
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="frequent" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Contato frequente
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="regular" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Contato regular
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="occasional" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Contato ocasional
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="deep" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Conversas profundas
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="light" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Conversas leves
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="intimacyExpectation"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Expectativas sobre Intimidade</FormLabel>
                  <FormDescription>
                    Selecione a opção que melhor descreve sua expectativa
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="deep-emotional" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Conexão emocional profunda
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="physical" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Valoriza o aspecto físico
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="balanced" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Equilíbrio entre emocional e físico
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="need-time" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Precisa de tempo para desenvolver intimidade
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="not-priority" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Intimidade não é prioridade
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default RomanticSection;
