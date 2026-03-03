# Visão Geral do Projeto (PROJECT.md)

Este documento descreve a infraestrutura técnica analisada no repositório do site de catálogo de revenda de veículos.

## 1. Stack Tecnológica
A stack real identificada nos arquivos do projeto (`package.json`, `next.config.mjs`, etc) é:

- **Framework Principal:** Next.js 15.1.7 (utilizando App Router e Turbopack) e React 19.
- **Linguagem:** JavaScript / JSX (com tipagem mínima ou ausente, baseada em `.js`/`.jsx` em vez de TypeScript) configurado com Babel/Next.js (Next config usa ext `.mjs`).
- **Estilização & UI:** 
  - TailwindCSS 3.4
  - shadcn/ui (Radix UI primitives class-variance-authority, clsx, tailwind-merge)
  - Lucide React (ícones)
  - Next Themes (Dark/Light mode)
- **Banco de Dados & ORM:** 
  - PostgreSQL hospedado no Supabase (`@supabase/ssr`, `@supabase/supabase-js`).
  - Prisma ORM 6.4.1.
- **Autenticação:** Clerk (`@clerk/nextjs`).
- **Gerenciamento de Estado/Dados no Cliente:** TanStack React Query v5.
- **Formulários & Validação:** React Hook Form e Zod.
- **Extras de UI:**
  - Recharts (Gráficos no Dashboard)
  - Swiper (Carrosséis)
  - React Day Picker (Seleção de datas)
  - React Dropzone (Upload de imagens)
  - Sonner (Notificações tipo Toast)
- **Hospedagem de Imagens:** Cloudinary (identificado pelo pacote `cloudinary` e config de domínios externos no Next.js) e Supabase Storage.
- **Segurança:** Arcjet (`@arcjet/next`) detectado nas dependências para proteção de rotas/rate-limiting.

## 2. Estrutura de Pastas
A estrutura segue o padrão do Next.js App Router dentro do diretório `src`:

```text
/
├── .env.example            # Template de variáveis de ambiente
├── next.config.mjs         # Configurações do Next.js (Domínios de imagem, Server Actions)
├── tailwind.config.mjs     # Configuração do Tailwind (Tema e plugins)
├── src/
│   ├── actions/            # Server Actions para mutações e buscas no BD (admin.js, vehicles.js, etc.)
│   ├── app/                # Next.js App Router
│   │   ├── (admin)/        # Rotas da área administrativa / Dashboard principal
│   │   │   └── admin/      # Pasta real que expõe as rotas `/admin/users`, `/admin/vehicles` e `/admin/settings` (Categorias, Marcas, Tipos)
│   │   ├── (auth)/         # Telas de login/registro providas pelo Clerk
│   │   ├── (main)/         # Rotas públicas e catálogo principal (home, /vehicles, /saved-cars)
│   │   ├── debug/          # Rotas auxiliares de teste/debug
│   │   └── waitlist/       # Landing page de captura de leads/lista de espera
│   ├── assets/             # Arquivos estáticos e mídias do projeto
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── ui/             # Componentes base do shadcn/ui (Botões, Inputs, Dialogs)
│   │   └── ...             # Componentes de negócio (VehicleCard, HomeSearch, DataTable)
│   ├── hooks/              # Custom Hooks React
│   ├── lib/                # Configurações e utilitários globais (Prisma Client, utils.js)
│   └── prisma/             # Schema do Prisma e seed do banco
```

## 3. Padrões Arquiteturais e Convenções
- **Server Actions:** Forte uso de React Server Actions (na pasta `src/actions`) para lidar com regras de negócio e persistência de dados. Evita a necessidade de gerenciar rotas REST em `/api`.
- **Route Groups:** Uso de parênteses nas pastas do App Router (ex: `(admin)`, `(main)`) para isolar os layouts da vitrine virtual em relação ao painel de administração e páginas de autenticação.
- **Separação de Componentes:** A UI baseada em design system (shadcn/ui) está contida em `src/components/ui/`, mantendo componentes complexos ou de negócios na raiz de `src/components/` (ex: `VehicleDetail.jsx`, `VehicleCard.jsx`).
- **ORM Orientado a Modelos Ricos:** O `schema.prisma` mapeia domínios bem definidos (`Vehicle`, `Category`, `Brand`, `VehicleType`, `User`, `VisitBooking`, `DealershipInfo`), utilizando as tabelas de Configurações para as relações dinâmicas do Catálogo de Veículos, além do uso de indexação explícita (índices b-tree compostos para pesquisas eficientes por categorias, marca, status e ano).
- **Sem Typescript:** O projeto usa JavaScript (`.js`, `.jsx`). A documentação e tipagem dependem implicitamente do Prisma (tipos automáticos) e do Zod no lado do cliente.

## 4. Variáveis de Ambiente
As variáveis esperadas (identificadas no arquivo `.env.example` e configuração) são:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  # Chave pública do Clerk (Client-side)
CLERK_SECRET_KEY=                   # Chave secreta do Clerk (Server-side)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=      # URL da rota de Login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=      # URL da rota de Cadastro

DATABASE_URL=                       # URL de conexão com o banco de dados via Connection Pooling (Supabase)
DIRECT_URL=                         # URL de conexão direta com o BD para migrações do Prisma
```
