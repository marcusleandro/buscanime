# Buscanime

Aplicação de listagem de animes para o desafio frontend Winnin. Consome a [API GraphQL da AniList](https://docs.anilist.co/guide/graphql/) com busca por texto, filtro por formato, paginação e estados de loading/erro/vazio.

## Stack

- React 19 + TypeScript + Vite
- TanStack Query + graphql-request
- nuqs (filtros na URL)
- Tailwind CSS v4 + shadcn/ui
- GraphQL Code Generator

## Pré-requisitos

- Node.js 20+
- Yarn

## Como executar

```bash
# Instalar dependências
yarn install

# Gerar tipos GraphQL (após alterar a query em AnimeService.ts)
yarn codegen

# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Preview do build
yarn preview
```

Acesse `http://localhost:5173` após `yarn dev`.

## Scripts úteis

| Script | Descrição |
|--------|-----------|
| `yarn dev` | Servidor de desenvolvimento |
| `yarn build` | Typecheck + build |
| `yarn typecheck` | Verificação de tipos |
| `yarn lint` | ESLint |
| `yarn format` | Prettier |
| `yarn codegen` | Gera tipos em `src/types/generated/graphql.ts` |
| `yarn test` | Testes unitários (Vitest) |
| `yarn test:e2e` | Testes e2e (Playwright) |

## Funcionalidades

- Listagem de animes com cards (capa, título, formato, gêneros, score)
- Score colorido: vermelho (&lt;50), amarelo (50–80), verde (&gt;80)
- Busca com debounce (500ms)
- Filtro por formato (TV, Filme, OVA, etc.)
- Paginação com botão **Ver Mais**
- Filtros sincronizados na URL (`?search=&format=`)
- Skeleton loading sem layout shift
- Dark mode (tecla `d`)

## Estrutura principal

```
src/
├── components/anime/     # AnimeCard, AnimeGrid, SearchBar, FormatFilter
├── components/common/    # Skeleton, ErrorState, EmptyState
├── hooks/                # useAnimeList, useAnimeFilters, useDebounce
├── services/             # AnimeService (GraphQL + query)
├── types/generated/      # Tipos gerados pelo Codegen
└── pages/AnimeList.tsx   # Página principal
```

## Deploy

O projeto pode ser publicado na [Vercel](https://vercel.com) conectando o repositório GitHub. O build command é `yarn build` e o output directory é `dist`.
