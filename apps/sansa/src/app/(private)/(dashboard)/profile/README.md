# Página de Perfil de Usuário

Esta página permite aos usuários configurar seu perfil com informações detalhadas para melhorar a análise de compatibilidade.

## Estrutura de Arquivos

- `page.tsx` - Componente de página do Next.js (Server Component)
- `layout.tsx` - Layout compartilhado para a página de perfil
- `profile-form.tsx` - Componente do cliente com o formulário interativo
- `schema.ts` - Schema de validação com Zod

## Melhorias Implementadas

1. **Separação de Responsabilidades**:

   - Componente de servidor (`page.tsx`) para o carregamento inicial
   - Componente de cliente (`profile-form.tsx`) para interatividade
   - Schema de validação separado (`schema.ts`)

2. **Conformidade com Next.js 15**:

   - Uso do padrão de App Router
   - Separação clara entre componentes de servidor e cliente

3. **Padrões de Design**:

   - Componentes funcionais com TypeScript
   - Tipagem de props com interfaces
   - Uso de ShadCN UI para componentes consistentes
   - Design limpo seguindo diretrizes Apple

4. **UX Melhorada**:

   - Seções colapsáveis para melhor navegação
   - Validação de formulário com feedback claro
   - Layout responsivo

5. **Código Limpo**:
   - Nomes de variáveis descritivos
   - Função com responsabilidade única
   - Organização lógica do código
   - Validação de dados com Zod

## Uso

Este formulário coleta informações detalhadas sobre:

- Dados pessoais básicos
- Personalidade e traços comportamentais
- Interesses e hobbies
- Valores e expectativas
- Preferências para diferentes tipos de relacionamentos (romântico, profissional, amizade, familiar)

## Tecnologias Utilizadas

- Next.js 15
- TypeScript
- TailwindCSS 4
- ShadCN UI
- React Hook Form
- Zod para validação
