<p align="center">
  <a href="https://www.nextime.com.br/">
    <img src="https://github.com/nextimecode.png" width="150px" height="150px" alt="Nextime logo" />
  </a>
  <h1 align="center">NeXTIME - Every Second Counts</h1>
</p>

# Projeto Stark - Winter is Coming

<p align="left">
  <img src="./assets/stark-logo.png" width="300px" height="212px" alt="Chakra logo" />
</p>

## 📖 Sobre o Projeto Stark

O Projeto Stark é um aplicativo que conecta pessoas através da análise de compatibilidade, baseada em testes de personalidade e preferências individuais. Inspirado na ideia de promover conexões significativas, Stark é a ferramenta ideal para quem busca entender mais sobre si mesmo e sobre suas relações, sejam elas amorosas, de amizade, familiares ou profissionais.

## 🌟 Características Principais

    •	Teste de Personalidade: Um quiz interativo e gamificado que coleta informações sobre traços de personalidade e preferências.

    •	Análise de Compatibilidade: Comparação de perfis, apresentando um índice de compatibilidade e gráficos detalhados.

    •	Compartilhamento e Convites: Os usuários podem convidar outras pessoas para participar e comparar resultados.

    •	Feedback Contínuo: O aplicativo coleta opiniões dos usuários sobre a precisão dos resultados, ajudando a melhorar os algoritmos.

## 🧱 Estrutura do Projeto

O Stark é um monorepo com os seguintes apps e packages:

### **Apps**

- **[Arya](#arya):** A parte deslogada (www). Inspirada em Arya Stark, simboliza independência, liberdade e adaptabilidade. É a porta de entrada pública para o sistema.
- **[Bran](#bran):** O backend principal. Inspirado em Bran Stark, reflete inteligência e visão estratégica, processando e organizando dados de forma eficiente e segura.
- **[Sansa](#sansa):** A parte logada do sistema. Inspirada em Sansa Stark, representa resiliência e crescimento, oferecendo uma interface organizada e eficiente.

### **Packages**

- **[@stark/ui](#stark-ui):** Biblioteca de componentes reutilizáveis para manter consistência de design e eficiência no desenvolvimento.

## 🤔 Por que "Stark"?

Stark é uma aplicação inovadora projetada para explorar conexões humanas e facilitar o entendimento de compatibilidade entre indivíduos. Inspirado pela força, resiliência e senso de união da Casa Stark de Game of Thrones, este projeto busca criar um espaço onde usuários podem compreender melhor suas próprias características e comparar com as de outras pessoas, promovendo conexões mais significativas em diversos contextos: amizades, relacionamentos amorosos, trabalho ou até dinâmicas familiares.

Com base em testes personalizados e análises avançadas, Stark fornece um índice de compatibilidade acompanhado de insights visuais, como gráficos de radar. Este MVP inicial é voltado para coletar dados e validar a ideia, incentivando os usuários a convidarem outras pessoas para explorar a plataforma e compartilharem resultados, gerando crescimento orgânico e aprimoramento contínuo do algoritmo.

"Winter is coming", mas com Stark, estamos prontos para criar conexões mais fortes e significativas.

## 🛠️ Testes e2e

- `pnpm exec playwright test` - Executa os testes de ponta a ponta.
- `pnpm exec playwright test --ui` - Inicia o modo de UI interativa.
- `pnpm exec playwright test --project=chromium` - Executa os testes apenas no Chrome Desktop.
- `pnpm exec playwright test example` - Executa os testes em um arquivo específico.
- `pnpm exec playwright test --debug` - Executa os testes no modo de depuração.
- `pnpm exec playwright codegen` - Gera automaticamente testes com Codegen.

## 🛤️ Roadmap

## 🎯 Fluxo do MVP

1. **Cadastro ou Login:**
   O usuário insere e-mail e nome. Dados salvos na tabela `users`.

2. **Realização do Teste:**
   O usuário responde perguntas categorizadas (ex.: personalidade, interesses). Respostas salvas em `answers` e resultados processados em `tests`.

3. **Análise e Resultado:**
   Um gráfico de radar detalha os traços de personalidade. Caso outro usuário seja comparado, calcula-se a compatibilidade usando a tabela `compatibility_results`.

4. **Convites e Compartilhamento:**
   Gera links únicos para outros usuários realizarem o teste e compararem os resultados.

## 🚀 Próximos Passos

- [ ] Criar wireframes e protótipos para validar a interface.
- [ ] Implementar as APIs básicas de cadastro e testes.
- [ ] Configurar o banco de dados e o ORM (Prisma).
- [ ] Integrar um gráfico interativo para resultados visuais.

### Editor de Texto

Para futuras funcionalidades que exigem um editor de texto no aplicativo, escolhemos utilizar o **TiPTaP**. Este editor é robusto, versátil e bem adaptado para integrar-se com Next.js. Recomendamos o TiPTaP para todas as funcionalidades relacionadas à edição de texto avançada.

Para mais detalhes sobre o TiPTaP, visite a [documentação oficial](https://tiptap.dev/docs/editor/installation/nextjs).

### Animações

Se for necessário implementar animações no aplicativo, recomendamos utilizar uma das seguintes ferramentas:

- **Framer Motion:** Uma biblioteca poderosa para animações no React. Saiba mais e veja exemplos em [Framer Motion](https://www.framer.com/motion/).
- **Auto Animate:** Uma ferramenta que facilita a adição de animações automáticas com poucos ajustes de código. Confira mais detalhes em [Auto Animate](https://auto-animate.formkit.com/).

## ❓ FAQ

## 🖥️ Client-Side Rendering em Páginas Estáticas com `useSearchParams`

### Problema

Durante a renderização estática, toda a página pode ser convertida para renderização no lado do cliente devido ao uso de `useSearchParams`, caso não exista um limite de `Suspense` que o intercepte.

### Solução

Para reduzir a porção da rota que é renderizada no lado do cliente, você pode encapsular o componente que utiliza `useSearchParams` dentro de um limite de `Suspense`.

#### Exemplo

```tsx
// app/dashboard/search-bar.tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  return <>Search: {search}</>
}
```

```tsx
import { Suspense } from 'react'
import SearchBar from './search-bar'

// Este componente será renderizado como um placeholder para a barra de pesquisa no HTML inicial.
// Quando o valor estiver disponível durante a hidratação do React, o fallback
// será substituído pelo componente `<SearchBar>`.
function SearchBarFallback() {
  return <>placeholder</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

Adotando essa abordagem, você consegue manter parte da sua página sendo renderizada estaticamente, enquanto manipula os parâmetros de pesquisa de maneira eficaz no lado do cliente.
