# 🛣️ Rohan - O Amigo do Motorista

![Logo do Rohan](url-da-imagem-do-logo-aqui)

## 📖 Sobre

"Rohan" é o seu novo companheiro nas estradas. Inspirado na vasta e mágica terra de Rohan do universo de Tolkien, este aplicativo foi projetado para ser o guardião e amigo fiel de todos os motoristas. Projetado para o motorista moderno, ele oferece recursos avançados que ajudam a garantir uma condução segura, eficiente e agradável.

## 🌟 Características Principais

- **Navegação Inteligente:** Orientação otimizada através de rotas atualizadas em tempo real, garantindo a chegada ao destino pela via mais eficiente.
- **Suporte ao Motorista:** Compilação de dicas práticas, lembretes essenciais e informações relevantes, projetadas para maximizar a performance na estrada.
- **Prioridade à Segurança:** Implementação de alertas e notificações estratégicas para promover uma experiência de direção segura em todas as viagens.

## 💰 Novas Funcionalidades de Gerenciamento Financeiro

- **Controle de Ganhos e Gastos:** Permite que o usuário adicione manualmente os ganhos realizados em todas as plataformas ou estabelecimentos, além dos gastos com itens como combustível, refeições e manutenção.
- **Cálculo do Lucro Real:** Com base nos dados inseridos, o aplicativo calcula o lucro real do usuário, ajudando a entender melhor a rentabilidade de suas jornadas.
- **Definição de Metas Financeiras:** Os usuários podem estabelecer metas diárias, semanais ou mensais para seus ganhos, incentivando uma gestão financeira mais eficaz e motivacional.
s

## 🤔 Por que "Rohan"?

Rohan, no universo de Tolkien, é uma terra de bravos cavaleiros, vastas planícies e um povo leal e determinado. Assim como os Rohirrim, os cavaleiros de Rohan, estão sempre prontos para defender e apoiar, nosso aplicativo busca oferecer suporte contínuo ao motorista. Embarque nesta aventura e sinta-se em boa companhia!

## 🚀 Começando

1. Baixe o aplicativo na [App Store](url-da-app-store-aqui) ou no [Google Play](url-do-google-play-aqui).
2. Siga as instruções de instalação.
3. Inicie o aplicativo e configure o seu perfil.
4. Comece a sua jornada com Rohan ao seu lado!

## 🛠️ Testes e2e

- `pnpm exec playwright test` - Executa os testes de ponta a ponta.
- `pnpm exec playwright test --ui` - Inicia o modo de UI interativa.
- `pnpm exec playwright test --project=chromium` - Executa os testes apenas no Chrome Desktop.
- `pnpm exec playwright test example` - Executa os testes em um arquivo específico.
- `pnpm exec playwright test --debug` - Executa os testes no modo de depuração.
- `pnpm exec playwright codegen` - Gera automaticamente testes com Codegen.

## 🛤️ Roadmap

### Editor de Texto

Para futuras funcionalidades que exigem um editor de texto no aplicativo Rohan, escolhemos utilizar o **TiPTaP**. Este editor é robusto, versátil e bem adaptado para integrar-se com Next.js. Recomendamos o TiPTaP para todas as funcionalidades relacionadas à edição de texto avançada.

Para mais detalhes sobre o TiPTaP, visite a [documentação oficial](https://tiptap.dev/docs/editor/installation/nextjs).

### Animações

Se for necessário implementar animações no aplicativo Rohan, recomendamos utilizar uma das seguintes ferramentas:

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

Desenvolvido com ❤️ por [NeXTIME](url-do-seu-site-aqui).
