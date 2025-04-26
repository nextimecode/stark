"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

import { Users } from "lucide-react";

interface FriendshipSectionProps {
  form: any;
  open: boolean;
  toggle: () => void;
}

export function FriendshipSection({
  form,
  open,
  toggle,
}: FriendshipSectionProps) {
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
          <Users className="mr-2 h-5 w-5" />
          Amizade
        </CardTitle>
        <CardDescription>Preferências sociais e de amizade</CardDescription>
      </CardHeader>
      <Collapsible open={open}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="friendHobbies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hobbies</FormLabel>
                  <FormDescription>
                    Selecione os hobbies que mais gosta
                  </FormDescription>
                  <FormControl>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("sports")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "sports",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "sports",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="hobby-sports">Esportes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("fitness")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "fitness",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "fitness",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="hobby-fitness">Academia</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("games")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), "games"]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "games",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="hobby-games">Jogos</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("reading")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "reading",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "reading",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="hobby-reading">Leitura</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("movies")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "movies",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "movies",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="hobby-movies">Filmes e Séries</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("music")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), "music"]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "music",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="hobby-music">Música</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socializationFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência de Socialização</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Frequência ideal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diária</SelectItem>
                        <SelectItem value="several-times-week">
                          Algumas vezes por semana
                        </SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="biweekly">Quinzenal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="occasionally">
                          Ocasionalmente
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
              name="communicationPreference"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Estilo de Comunicação</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="extroverted" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Extrovertido(a)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="introverted" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Introvertido(a)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ambiverted" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Ambivertido(a)
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
              name="friendActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atividades com Amigos</FormLabel>
                  <FormDescription>
                    Selecione as atividades que mais gosta
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("home-gatherings")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "home-gatherings",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "home-gatherings",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="activity-home">Reuniões em casa</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("outdoor-activities")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "outdoor-activities",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "outdoor-activities",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="activity-outdoor">
                          Atividades ao ar livre
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("parties")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "parties",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "parties",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="activity-parties">Festas</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("group-sports")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "group-sports",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "group-sports",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="activity-sports">
                          Esportes em grupo
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("trips")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), "trips"]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "trips",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="activity-trips">Viagens</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("restaurants")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "restaurants",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "restaurants",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="activity-restaurants">
                          Restaurantes
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes("cultural-events")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                "cultural-events",
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (selectedOption: string) =>
                                    selectedOption !== "cultural-events",
                                ) || [],
                              );
                            }
                          }}
                        />
                        <label htmlFor="activity-cultural">
                          Eventos Culturais
                        </label>
                      </div>
                    </div>
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

export default FriendshipSection;
