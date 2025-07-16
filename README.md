This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# AllCritics - Front-End

Este é o repositório do front-end para o projeto AllCritics, uma plataforma para avaliação de filmes, séries, jogos e mais. A aplicação é construída com Next.js, TypeScript e Tailwind CSS, seguindo uma arquitetura moderna e escalável.
First, run the development server:

## Tecnologias

- Framework: Next.js (com App Router)
- Linguagem:(https://www.typescriptlang.org/)
- Estilização:(https://tailwindcss.com/)
- Gerenciamento de Estado (Servidor):(https://tanstack.com/query/latest)
- Gerenciamento de Estado (Cliente): Zustand & Jotai

## Estrutura do Projeto


```bash
  /allcritics-frontend
    ├── src/
    │   ├── app/                  # Roteamento, layouts e páginas (App Router) [1]
    │   │   ├── (main)/           # Grupo de rotas para páginas públicas (não afeta a URL) [3]
    │   │   │   ├── movies/
    │   │   │   │   ├── [slug]/page.tsx # Rota dinâmica para detalhes do filme
    │   │   │   │   └── page.tsx        # Rota para listagem de filmes
    │   │   │   ├── games/
    │   │   │   └──...
    │   │   ├── (auth)/           # Grupo de rotas para autenticação
    │   │   │   ├── login/page.tsx
    │   │   │   └── register/page.tsx
    │   │   └── (dashboard)/      # Grupo de rotas para o painel do usuário
    │   │       ├── dashboard/
    │   │       │   ├── layout.tsx      # Layout específico do painel (com sidebar)
    │   │       │   └── settings/page.tsx
    │   │       └── layout.tsx
    │   │
    │   ├── components/           # Componentes React reutilizáveis [1, 2]
    │   │   ├── ui/               # Componentes de UI atômicos e genéricos (Button, Card, Input)
    │   │   ├── layout/           # Componentes estruturais (Header, Footer, Sidebar)
    │   │   └── features/         # Componentes complexos com lógica de negócio (ReviewForm)
    │   │
    │   ├── lib/                  # Lógica de negócio, clientes de API, helpers de autenticação [1]
    │   │   ├── api.ts            # Configuração do cliente para chamadas à API do back-end
    │   │   └── server/           # Funções que rodam exclusivamente no servidor (protegido com 'server-only') [4]
    │   │
    │   ├── hooks/                # Custom React Hooks (ex: useDebounce) [2]
    │   │
    │   ├── store/                # Stores de gerenciamento de estado do cliente (Zustand/Jotai) [1]
    │   │   ├── useAuthStore.ts   # Exemplo de store Zustand para autenticação
    │   │   └── atoms/            # Átomos Jotai para estados de UI complexos
    │   │
    │   ├── styles/               # Estilos globais e variáveis de tema [1, 2]
    │   │   └── globals.css
    │   │
    │   └── types/                # Definições de tipo do TypeScript [2]
    │       └── api.ts            # Tipos da API gerados automaticamente a partir do OpenAPI
    │
    ├── public/                   # Arquivos estáticos (imagens, fontes, etc.)
    ├──.env.local                # Variáveis de ambiente locais
    ├── next.config.mjs           # Configuração do Next.js
    ├── package.json              # Dependências e scripts do projeto
    ├── tailwind.config.js        # Configuração e design tokens do Tailwind CSS [5]
    └── tsconfig.json             # Configuração do TypeScript
```

## Explicação dos Diretórios Principais
- `src/app`: Utilizado exclusivamente para definir a estrutura de roteamento da aplicação com o App Router do Next.js. Utiliza convenções como page.tsx para páginas, layout.tsx para UIs compartilhadas, e grupos de rotas (...) para organização lógica sem afetar as URLs.   

- `src/components`: Organizado em três níveis para evitar um diretório plano e promover a reutilização :  
  - `ui/`: Blocos de construção básicos e agnósticos à aplicação.
- `layout/`: Componentes que definem a estrutura das páginas.
- `features/`: Componentes que encapsulam a lógica de uma funcionalidade específica.

- `src/lib`: Centraliza a lógica que interage com serviços externos ou contém regras de negócio. O subdiretório lib/server é crucial para garantir que código sensível (com chaves de API, por exemplo) nunca seja exposto no lado do cliente.   

- `src/utils`: Contém funções puras, sem estado e sem efeitos colaterais (ex: formatação de datas, helpers de string).

- `src/store`: Abriga a lógica de gerenciamento de estado do lado do cliente. A arquitetura combina Zustand para estado global (como autenticação) e Jotai para estados de UI complexos e interdependentes (como formulários de filtro avançado).   

-  `src/types`: Contém todas as definições de tipo do TypeScript. O arquivo api.ts é especialmente importante, pois é gerado automaticamente a partir da especificação OpenAPI do back-end, garantindo segurança de tipos de ponta a ponta

## Como Iniciar

1. Instalar dependências:
2. Rodar o servidor de desenvolvimento:


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
