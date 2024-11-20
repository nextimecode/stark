- [ ] Criar os cards no github
- [ ] Crias as telas no https://balsamiq.cloud/sr0yt5p/ppityt0/r2278


# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)


Aqui está o texto formatado com melhor organização e legibilidade:

# Padrão de Mensagens de Commit

Este projeto segue o padrão **Conventional Commits**. O uso deste padrão é fundamental para:

- Garantir um histórico de commits legível.
- Facilitar a automação de processos como geração de changelogs e versionamento semântico.
- Melhorar a colaboração entre os desenvolvedores.

---

## Estrutura da Mensagem de Commit

Cada mensagem de commit deve seguir o formato abaixo:

```
<tipo>(escopo opcional): <descrição breve>

<corpo opcional>

<rodapé opcional>
```

### Exemplos:

- `feat(login): adiciona validação de senha forte`
- `fix(api): corrige erro 500 em requisições POST`
- `docs: atualiza o README com instruções de configuração`

---

## Tipos Suportados

Os principais tipos utilizados no projeto são:

- **feat**: Adição de uma nova funcionalidade.
- **fix**: Correção de bugs.
- **docs**: Alterações na documentação.
- **style**: Ajustes de formatação ou estilo que não afetam o comportamento.
- **refactor**: Refatorações de código sem alteração de funcionalidades.
- **test**: Adição ou modificação de testes.
- **chore**: Atualizações em ferramentas ou configurações que não afetam o código de produção.
- **perf**: Melhorias de performance.
- **ci**: Alterações relacionadas à integração contínua.
- **build**: Alterações no sistema de build ou dependências.
- **revert**: Reversão de um commit anterior.

---

## Regras para o Escopo

O **escopo** é opcional, mas recomendamos seu uso para indicar a área afetada pela alteração.

### Exemplos:

- `feat(auth)` para funcionalidades relacionadas à autenticação.
- `fix(ui)` para correções de problemas no front-end.

---

## Dicas de Uso

- Mantenha a descrição breve e objetiva.
- Use o corpo da mensagem para detalhar a alteração, se necessário.
- Utilize o rodapé para mencionar tickets ou issues relacionados, como `Closes #123`.

---

## Benefícios

- Histórico de commits claro e padronizado.
- Facilita a revisão de código e o entendimento das mudanças.
- Suporte a ferramentas de automação (changelogs, versionamento semântico, etc.).

---

**Adote este padrão em todos os seus commits no projeto.**
Caso tenha dúvidas, consulte a documentação oficial ou entre em contato com o time técnico.

# Stark Project

O **Stark Project** é uma aplicação inspirada na família Stark de *Game of Thrones*. Cada módulo do sistema é representado por um personagem da família, refletindo suas características e funções dentro do projeto.

## Estrutura do Projeto

### 🛠️ **Eddard** - Parte Logada Web (Dashboard)
- **Descrição**: Representa o painel do usuário após login.
- **Inspiração**: Nomeado em homenagem a **Eddard Stark** (Ned), o patriarca da Casa Stark, que simboliza liderança e ordem.
---

### 🌐 **Arya** - Parte Deslogada Web (Acesso Público)
- **Descrição**: Interface pública de acesso ao sistema.
- **Inspiração**: Nomeado em homenagem a **Arya Stark**, que simboliza independência, liberdade e adaptabilidade.

---

### 🧠 **Bran** - Backend
- **Descrição**: O cérebro do sistema, responsável por toda a lógica de negócios e gerenciamento de dados.
- **Inspiração**: Nomeado em homenagem a **Bran Stark**, que reflete inteligência, visão estratégica e conectividade.

---

### 📱 **Jon** - Aplicativo Mobile
- **Descrição**: Aplicativo móvel que acompanha o usuário em movimento.
- **Inspiração**: Nomeado em homenagem a **Jon Snow**, que simboliza mobilidade, exploração e versatilidade.
---
