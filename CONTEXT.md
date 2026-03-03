# Contexto do Projeto (CONTEXT.md)

Este documento descreve o estado atual da implementação do sistema de catálogo para revenda de veículos, com base na análise do repositório. O produto final visa ser uma vitrine virtual e área administrativa.

## 1. O que está claramente implementado

- **Modelagem de Dados Completa:** O banco de dados (Prisma) reflete bem o domínio com as tabelas `User`, `Vehicle`, `DealershipInfo`, `VisitBooking`, `UserSavedVehicle` e `WorkingHour`.
- **Autenticação de Usuários:** Configurada com o provedor Clerk, com suporte a diferentes papéis (ex. diferenciação entre acesso `ADMIN` e `USER`), além de rotas `/sign-in` e `/sign-up` isoladas no grupo de rotas `(auth)`.
- **Área Administrativa (Dashboard):** 
  - Estruturada sob `src/app/(admin)/admin/`.
  - Contém sub-rotas para gerenciamento de usuários (`users`), estoque de veículos (`vehicles`) e um módulo flexível de configurações catalogais (`settings` para `categories`, `brands` e `vehicle-types`).
  - Utiliza Server Actions (`src/actions/admin.js`, `vehicles.js`, `categories.js`, `users.js`, etc.) para operações de CRUD com suporte dinâmico a upload de imagens via Cloudinary.
  - Componentes de listagem em tabela com filtros reativos originados do banco de dados (ex. `DataTable.jsx`, `ListVehiclesTable.jsx`).
- **Vitrine Virtual (Catálogo Público):**
  - Configurada sob `src/app/(main)/`.
  - Página inicial com busca orientada a IA (`HomeSearch.jsx`), carrosséis e banners construídos via banco de dados consumindo a modelagem `Category`, `Brand` e `VehicleType`.
  - Catálogo de veículos com filtros flexíveis (dinâmicos do BD) e cards customizados (`VehicleCard.jsx`).
  - Detalhamento avançado de um veículo por ID (`src/app/(main)/vehicles/[id]` usando o `VehicleDetail.jsx`).
  - Funcionalidade para o usuário salvar/favoritar carros (`src/app/(main)/saved-cars`).
- **Design System:** Extensa utilização de componentes base criados a partir do shadcn/ui (em `components/ui/`) para consistência visual.

## 2. Decisões Arquiteturais e de Produto

- **Foco em Leads e Agendamentos em vez de Checkout:** A presença de `VisitBooking` e a ausência de integrações como Stripe ou carrinhos de compra indicam que o modelo de negócios é gerar leads (contatos) e visitas físicas à concessionária, não realizar a venda diretamente pelo app estruturado.
- **Server Actions como API:** Optou-se por concentrar a lógica de conexão com o Prisma em arquivos centralizados na pasta `src/actions/`, em vez de pulverizar a lógica de busca de dados no Next.js Route Handlers (`/api`).
- **Uso de Soft-Deletes / Desativação:** Campos como `status` (ex. "Disponível", "Vendido") em veículos em geral preferem gerir o ciclo de vida por status e não apagar dados históricos que poderiam quebrar relacionamentos.
- **Armazenamento Externo de Imagens:** O uso deliberado do `Cloudinary` ou `Supabase` retira a carga do servidor Next.js para entregar a mídia de alta qualidade dos veículos.

## 3. O que parece incompleto ou ausente

- **Gestão de Agendamentos de Visita (`VisitBooking`):** Embora o schema do banco de dados possua tabelas avançadas relativas a `VisitBooking` e `WorkingHour` (horários de funcionamento), **não foram identificadas rotas administrativas específicas** (como `/admin/bookings`) para os funcionários gerenciarem esses agendamentos ou aprovarem presenças. É possível que os agendamentos ainda dependam de implementação no painel admin ou operem apenas na visualização do cliente.
- **Integração de Outras Configurações da Concessionária (`DealershipInfo`):** Apesar do módulo `/admin/settings` gerir eficientemente categorias, marcas, e tipos com Cloudinary agora — as configurações macro da loja (telefone de contato, CNPJ, logoUrl em `DealershipInfo`) ainda não compõem um painel explícito de gerenciamento nesse diretório.
- **Rotas de Debug / Waitlist:** Há presença de arquivos/pastas `debug` e `waitlist`, indicando que algumas funcionalidades talvez ainda estejam em experimentação ou o produto teve um lançamento via captura de demanda anterior à finalização do catálogo.
