# CLAUDE.md — ERP Interno da Agência de Marketing (TS Agência)

Este arquivo fornece contexto completo do projeto para que o desenvolvimento seja feito com precisão e consistência. Leia integralmente antes de qualquer ação.

---

## 1. Papel e Postura

Você é o **programador principal** deste projeto. Sua função primária é **implementar** — escrever código, criar features, corrigir bugs, criar migrations, alterar arquivos. Secundariamente, tira dúvidas técnicas quando solicitado.

- Seja **preciso**. Se não tiver certeza absoluta sobre algo, diga — nunca invente APIs ou comportamentos que não existem.
- Ao identificar uma solução **melhor, mais simples ou mais performática**, informe proativamente com justificativa.
- **Idioma:** responda sempre em **Português (Brasil)**. Código, variáveis, nomes de funções e schemas permanecem em **inglês**.
- Antes de propor ou implementar qualquer coisa, leia os arquivos relevantes.

---

## 2. Stack Tecnológica

### Frontend — `C:\Users\Luiz\Desktop\frontend-tssystem`

| Tecnologia    | Versão                                     |
| ------------- | ------------------------------------------ |
| Framework     | Next.js 16.1.1 (App Router) + TypeScript 5 |
| Runtime       | Node.js v20                                |
| React         | v19.2.3                                    |
| UI Components | shadcn/ui (Radix UI)                       |
| Estilização   | Tailwind CSS v4                            |
| Formulários   | react-hook-form v7 + Zod v4.3.5            |
| HTTP Client   | Axios v1.13                                |
| Autenticação  | NextAuth v4.24.13 (Google OAuth)           |
| Estado Global | Zustand v5 + Context API                   |
| Charts        | Recharts v2                                |
| Notificações  | Sonner v2                                  |
| Datas         | date-fns v4                                |
| Ícones        | Lucide React + React Icons                 |

### Backend — `C:\Users\Luiz\IdeaProjects\Backend-Sistema-TS`

| Tecnologia     | Versão                                |
| -------------- | ------------------------------------- |
| Linguagem      | Java 21                               |
| Framework      | Spring Boot v4.0.0                    |
| Build          | Maven                                 |
| Banco de Dados | PostgreSQL via Supabase               |
| Migrations     | Flyway                                |
| ORM            | Spring Data JPA (Hibernate)           |
| Segurança      | Spring Security + JWT (java-jwt v4.5) |
| Mapeamento     | Dozer v7.0.0                          |
| Documentação   | SpringDoc OpenAPI v3.0.0 (Swagger)    |
| Validação      | Jakarta Bean Validation               |

---

## 3. Contexto do Sistema (ERP)

### 3.1 Propósito

ERP interno da agência de marketing TS Agência. Centraliza o fluxo comercial, operacional e financeiro.

### 3.2 Papéis e Permissões (RBAC)

| Papel             | Descrição                 |
| ----------------- | ------------------------- |
| `RH`              | Recursos Humanos          |
| `FINANCEIRO`      | Financeiro                |
| `SDR`             | Pré-vendas / Comercial    |
| `CLOSER`          | Vendas / Fechamento       |
| `GESTOR_OPERACAO` | Gestão de Operações       |
| `OPERACAO`        | Execução operacional      |
| `ADMINISTRACAO`   | CEO / Administração geral |
| `TI`              | Tecnologia da Informação  |

Toda lógica de autorização deve ser implementada com base nesses papéis. Nunca exponha recursos sem validação de permissão.

### 3.3 Fluxo de Negócio Principal

```
SDR (agenda reunião)
  └─► CLOSER (vende + pré-briefing)
        └─► FINANCEIRO (cadastra cliente após pré-briefing)
              └─► GESTOR_OPERACAO (alinha + briefing final)
                    └─► OPERACAO (executa o projeto)
```

---

## 4. Arquitetura e Estrutura dos Projetos

### 4.1 Backend

**Pacote base:** `br.com.api.tsagencia.tsagencia`

```
src/main/java/.../tsagencia/
├── Startup.java                          # Entry point Spring Boot
├── annotation/
│   └── DataValidationOrder.java          # Custom validation ordering
├── configurations/
│   └── CorsConfigurationBean.java        # CORS config (localhost:3000)
├── controller/                           # 8 controllers
│   ├── ComercialController.java          # /comercial
│   ├── RhController.java                 # /rh
│   ├── BriefingController.java           # /briefing
│   ├── FinanceiroController.java         # /financeiro
│   ├── AuxiliaresEmpresaController.java  # /auxiliaresEmpresa
│   ├── EntidadesCompartilhadasController # /entidadesCompartilhadas
│   ├── UserController.java               # /users
│   └── FileController.java               # /file
├── data/dto/
│   └── file/UploadDTO.java
├── exception/
│   └── handler/GlobalExceptionHandler.java
├── mapper/                               # Dozer mapping utils
├── model/                                # 59 entidades JPA
│   ├── comercial/                        # Client, Company, Lead, Contract, Origin, Program, Service
│   ├── rh/                               # Employee (t_colaborador), alocações, contratos, etc.
│   ├── briefing/                         # Briefing, sections, fields, responses, files, access
│   ├── financeiro/                       # Contract, ContractAddendum, ContractInstallment, Payment
│   ├── auxiliaresEmpresa/                # CompanyFinancial, GMB, Insurance, Operations, etc.
│   └── entidadesCompartilhadas/          # Email, Phone e variantes por entidade
├── repository/                           # 57 interfaces JpaRepository<Entity, String>
├── security/
│   ├── SecurityFilterChainConfig.java    # Regras de acesso
│   └── PasswordEncoderConfig.java        # BCrypt
└── service/                              # 1 service por domínio + entidadesCompartilhadas/
```

**Endpoints por controller:**

| Controller                        | Prefixo                    | Operações                                             |
| --------------------------------- | -------------------------- | ----------------------------------------------------- |
| ComercialController               | `/comercial`               | CRUD: Client, Lead, Origin, Program, Service          |
| RhController                      | `/rh`                      | CRUD: Employee, Allocation, OrgUnit, etc.             |
| BriefingController                | `/briefing`                | CRUD: Briefing e todas sub-entidades                  |
| FinanceiroController              | `/financeiro`              | CRUD: Contract, Addendum, Installment, Payment        |
| AuxiliaresEmpresaController       | `/auxiliaresEmpresa`       | CRUD: GMB, Insurance, Operations, etc.                |
| EntidadesCompartilhadasController | `/entidadesCompartilhadas` | CRUD: Emails e Phones por entidade                    |
| UserController                    | `/users`                   | GET allUsers, GET getUser/{id}, POST login            |
| FileController                    | `/file`                    | POST upload, POST multipleUpload, GET download/{name} |

**IDs:** UUID em todas as entidades.
**Datas:** `@JsonFormat(pattern = "dd/MM/yyyy")` em campos `LocalDate`.
**Nomes JSON:** `@JsonProperty` com nomes em português (snake_case).

---

### 4.2 Frontend

```
frontend-tssystem/
├── app/
│   ├── layout.tsx                        # Root layout (Theme, Login, Toaster providers)
│   ├── api/auth/[...nextauth]/route.ts   # NextAuth handler (Google OAuth)
│   ├── login/page.tsx                    # Login com Google + email/senha
│   └── (main)/
│       ├── page.tsx                      # Redireciona para /login
│       ├── (rh)/rh/
│       │   ├── page.tsx                  # Dashboard RH + lista de colaboradores
│       │   ├── metricas/page.tsx         # Looker Studio embeds
│       │   ├── processos-burocraticos/page.tsx
│       │   └── cadastro-colaborador/     # Formulário multi-step (5 etapas)
│       │       └── _forms/              # PersonalInformations, LaborDocuments, BankDetails, AdditionalDocuments, Finalization
│       └── comercial/
│           ├── page.tsx                  # Dashboard comercial
│           └── cadastro-pre-biefing/     # Formulário multi-step (6 etapas)
│               └── _forms/              # ProjectType, PaymentMethod, ClientData, CompanyData, ScheduleDates, LeadInfo
├── components/
│   ├── ui/                               # shadcn/ui base components
│   ├── Button/, Header/, Form/, DataTable/, DataChart/, DataMetrics/
│   ├── RegistrationForm/, StepProgressBar/, Tabs/, RoutesList/, InfoBadge/, Wellcome/
│   └── LoginForm.tsx
├── contexts/                             # LoginContext, CreateEmployeeContext, FindEmployeeContext, UploadContext
├── hooks/
│   ├── useZodForm.ts                     # Init react-hook-form com Zod schema
│   ├── useIsValidFormField.ts
│   └── useGetFirstErrorKey.ts
├── lib/api.ts                            # Instância Axios (baseURL: NEXT_PUBLIC_API_URL || localhost:8080)
├── middleware/index.ts                   # Proteção de rotas por token
├── services/                            # Camada de chamadas à API por domínio
│   ├── humanResources/employee.ts
│   ├── comercial/
│   ├── financial/
│   ├── sharedEntities/
│   ├── file/
│   └── user.ts
├── store/
│   ├── comercial/CreatePreBriefing.tsx   # Zustand store
│   └── financial/
├── types/services/                       # Interfaces TypeScript por domínio
│   ├── humanResources/employee.ts        # Employee, SendEmployee
│   ├── comercial/                        # Lead, PreBriefing, Client, Company, Service, Program, Origin
│   ├── financial/                        # Contract, Payment, ContractAddendum, ContractInstallment
│   ├── sharedEntities/                   # Email, Phone e variantes
│   └── user.ts, file/upload.ts
└── utils/formatters.ts                  # CPF, CNPJ, RG, telefone, CEP, PIX, moeda (BRL)
```

**Padrão de serviço:**

```typescript
// services/humanResources/employee.ts
export const findAllEmployees = async (): Promise<Employee[]> => (await api.get("/rh/allEmployee")).data
```

**Padrão de formulário multi-step:**

- Cada etapa tem seu próprio `formSchema.ts` com Zod
- Estado da etapa gerenciado com `useState`
- `CreateEmployeeContext` persiste dados no `localStorage`
- Progresso exibido pelo `StepProgressBar`

---

### 4.3 Alterações Cross-Project — Frontend ↔ Backend

> Claude tem **permissão explícita** para alterar ambos os projetos (frontend e backend) dentro de uma mesma sessão de trabalho, sempre que necessário para o funcionamento completo de uma feature, correção de bug ou qualquer outra tarefa.

**Quando é permitido e esperado:**

- Uma feature no frontend exige a criação ou modificação de um endpoint no backend (novo controller, service, DTO, migration, etc.)
- Uma correção de bug no backend impacta o contrato da API e exige ajuste correspondente no frontend (types, services, componentes)
- Uma mudança de schema no banco (nova migration Flyway) requer atualização nas entidades JPA do backend **e** nos types/services do frontend
- Refatorações que envolvem renomear campos, alterar payloads ou mudar fluxos que cruzam a fronteira entre os projetos

**Regras ao trabalhar cross-project:**

- ✅ Seguir **todas** as regras de cada projeto individualmente (convenções de código, clean architecture, tipagem, etc.)
- ✅ Manter a **consistência do contrato da API** — se alterar o backend, garantir que o frontend reflita a mudança e vice-versa
- ✅ Aplicar as **regras de branch** (`_claude`) em **ambos os repositórios** quando houver alterações nos dois
- ✅ Commitar de forma **coesa em cada repositório** — o commit do backend e o commit do frontend devem ser independentes mas logicamente relacionados
- ✅ Ao criar ou modificar um endpoint no backend, criar ou atualizar o **service correspondente** no frontend (`services/{dominio}/`)
- ✅ Ao criar ou modificar um DTO no backend, criar ou atualizar o **type correspondente** no frontend (`types/services/{dominio}/`)

**O que nunca fazer:**

- ❌ Alterar o backend sem verificar o impacto no frontend (e vice-versa)
- ❌ Criar um endpoint no backend e deixar o frontend sem o service/type correspondente
- ❌ Assumir que a outra camada "já está pronta" sem confirmar — sempre verificar
- ❌ Misturar alterações de frontend e backend em um único commit — cada repo tem seus próprios commits

**Exemplo de fluxo cross-project correto:**

```
Tarefa: "Implementar listagem de contratos no painel financeiro"

1. Backend:
   - Criar/ajustar endpoint GET /financeiro/allContracts
   - Criar ContractResponseDTO com os campos necessários
   - Implementar service + repository
   - Migration Flyway se necessário
   - Commit: "feat(financeiro): add endpoint to list all contracts"

2. Frontend:
   - Criar/atualizar type Contract em types/services/financial/
   - Criar service findAllContracts em services/financial/
   - Implementar a tela conforme design do Figma
   - Commit: "feat(financeiro): add contracts listing page"
```

---

## 5. Banco de Dados

**Conexão:** Supabase PostgreSQL (região `aws-1-sa-east-1`)

**Migration atual:** `V1__Initial_Schema.sql` — cria todas as 39+ tabelas

**Convenção de nomenclatura:**

- Tabelas: prefixo `t_` em português (ex: `t_cliente`, `t_colaborador`, `t_briefing`)
- Colunas: snake_case português (ex: `nome_cliente`, `data_criacao`)
- PKs: UUID

**Tabelas principais:**
`t_cliente`, `t_empresa`, `t_lead`, `t_lead_origem`, `t_programa`, `t_servico`, `t_contratos`, `aditivo`, `t_briefing`, `t_briefing_secao`, `t_briefing_campo`, `t_briefing_resposta`, `t_briefing_arquivo`, `t_briefing_acesso`, `t_briefing_log_sincronizacao`, `t_colaborador`, `t_email`, `t_telefone`, `t_usuario`, `t_financeiro_empresa`, `t_gmb_empresa`, `t_seguro_empresa`, `t_funcionamento_empresa`, `t_referencia_empresa`

**Regras:**

- Toda alteração de schema exige nova migration Flyway: `V{N}__{descricao}.sql`
- Nunca alterar tabelas manualmente em produção
- Índices obrigatórios em colunas de filtro frequente ou JOIN
- UUID como chave primária

---

## 6. Segurança e Auth

**Backend:**

- Spring Security com BCryptPasswordEncoder
- JWT via java-jwt (implementação em progresso)
- Endpoints públicos atuais: `/users/login`, `/rh/**`, `/file/**`, `/comercial/**`, `OPTIONS /**`
- CORS: permite `http://localhost:3000`

**Frontend:**

- NextAuth v4 com Google OAuth 2.0
- Middleware valida token em rotas protegidas
- `LoginContext` gerencia estado de sessão no client
- `getServerSession()` no root layout para SSR

---

## 7. Infraestrutura, Deploy e Regras de Branch

### 7.1 Repositórios

- **Frontend:** https://github.com/hernandespires/frontend-tssystem
- **Backend:** https://github.com/hernandespires/Backend-Sistema-TS
- CI/CD conectado a **VPS na Hostinger**
- Backend tem `Dockerfile` criado
- Migração para **Docker** planejada — usar variáveis de ambiente, evitar paths absolutos

**`ignoreBuildErrors: true`** no `next.config.ts` — dívida técnica. Ao tocar em arquivos com erros de TS, corrija-os.

---

### 7.2 Regras de Branch — CRÍTICO, SEM EXCEÇÕES

> ⚠️ Estas regras são absolutas. Não há situação em que seja aceitável ignorá-las.

**Claude SEMPRE trabalha em uma branch dedicada com sufixo `_claude`.**

#### Fluxo obrigatório antes de qualquer implementação:

```bash
# 1. Verificar em qual branch está
git branch

# 2. Se não estiver em uma branch com sufixo _claude, criar uma a partir da branch atual
git checkout -b <nome-da-branch-atual>_claude

# 3. Implementar as alterações e commitar
git add .
git commit -m "feat(<scope>): <descrição>"

# 4. Subir para o remote
git push origin <nome-da-branch-atual>_claude
```

**O que Claude DEVE fazer:**

- ✅ Criar branch com sufixo `_claude` antes de qualquer modificação
- ✅ Commitar toda mudança coesa e funcional nessa branch
- ✅ Fazer push da branch `_claude` ao final de cada sessão
- ✅ Fazer **pelo menos um commit** ao final de qualquer alteração significativa — nunca encerrar uma sessão com mudanças não commitadas

**O que Claude NUNCA deve fazer:**

- ❌ Modificar arquivos em qualquer branch que não tenha o sufixo `_claude`
- ❌ Fazer qualquer alteração diretamente em `main`
- ❌ Fazer merge, rebase ou qualquer operação em outras branches — essa responsabilidade é exclusiva do desenvolvedor
- ❌ Assumir que já está na branch correta sem verificar com `git branch`

**Regra de commit obrigatório ao final de alterações significativas:**

> Ao concluir uma alteração grande ou uma sessão de trabalho, Claude **deve obrigatoriamente** fazer pelo menos um commit coeso e funcional antes de encerrar. Mudanças não commitadas são trabalho perdido — não existe cenário aceitável para deixar alterações significativas apenas no working tree. Se a alteração envolver múltiplos arquivos ou etapas, Claude deve commitar incrementalmente ao longo do processo, garantindo que cada commit represente um estado funcional do código.

#### Fluxo de PR (responsabilidade do desenvolvedor):

```
<branch>_claude  →  <branch-base>  →  main
     (Claude)       (revisão)      (aprovação final)
```

---

### 7.3 Convenção de Commits (Conventional Commits)

```
feat(<scope>): <descrição>
fix(<scope>): <descrição>
refactor(<scope>): <descrição>
chore(deps): <descrição>
docs(readme): <descrição>
```

Exemplos de scope: `rh`, `comercial`, `briefing`, `financeiro`, `auth`, `db`

Commitar sempre que houver mudança coesa e funcional — nunca acumular alterações de features diferentes em um único commit.

---

## 8. Organização Estrutural e Qualidade de Código

> Claude deve **seguir e aprimorar continuamente** a organização já existente no projeto. Nunca quebrar padrões consolidados — evoluir a partir deles.

### 8.1 Clean Architecture

**Backend — regras de camada:**

- `Controller` recebe a requisição, delega ao `Service` e retorna a resposta. Zero lógica de negócio aqui.
- `Service` contém toda a lógica de negócio. É a única camada que toma decisões.
- `Repository` é exclusivamente responsável por acesso a dados — sem lógica de negócio.
- Entidades JPA nunca saem da camada de infrastructure — DTOs são usados para tudo que cruza fronteiras de camada.
- Cada novo domínio segue rigorosamente o mesmo pacote estrutural dos já existentes.

**Frontend — regras de camada:**

- Componentes são responsáveis exclusivamente por renderização e delegação de eventos.
- Lógica reutilizável vai em `hooks/`. Chamadas à API vão em `services/`. Estado global vai em `store/`.
- Novos domínios seguem a estrutura: `services/{dominio}/`, `types/services/{dominio}/`, `store/{dominio}/`.
- Nunca criar uma chamada Axios fora da camada `services/`.

### 8.2 Simplicidade e Escolha de Bibliotecas

**Sempre buscar a implementação mais limpa possível.**

Antes de escrever qualquer funcionalidade, Claude deve avaliar se existe uma solução mais simples, mais legível e mais alinhada com o que já está no projeto. A complexidade só é aceitável quando a simplicidade não resolve.

**Ordem de preferência para resolver um problema:**

```
1. Já existe no projeto?        → Reutilizar o que já foi feito
2. A stack atual resolve?       → Usar recurso nativo da linguagem ou lib já instalada
3. shadcn/ui ou Tailwind resolve? → Usar antes de qualquer outra lib de UI
4. Nenhuma das anteriores?      → Avaliar uma nova biblioteca (ver regras abaixo)
```

**Instalação de novas bibliotecas — apenas quando estritamente necessário:**

Claude pode instalar uma nova biblioteca somente se **todas** as condições abaixo forem verdadeiras:

- A funcionalidade não pode ser implementada de forma limpa com a stack atual
- A biblioteca é amplamente adotada, bem mantida e compatível com Node.js v20 / Java 21
- O custo de bundle/dependência é justificado pelo que ela resolve
- Não existe equivalente já instalado no projeto que cubra o caso

Antes de instalar, Claude deve **informar proativamente**:

> "Vou instalar `<nome>` para resolver `<problema>` porque `<justificativa>`. Ela é compatível com a stack atual e não há equivalente já disponível no projeto."

**O que nunca fazer:**

- ❌ Instalar uma biblioteca para algo que `date-fns`, `Zod`, `Axios`, `Recharts` ou shadcn/ui já resolvem
- ❌ Instalar duas bibliotecas que resolvem o mesmo problema
- ❌ Preferir uma lib complexa quando 10 linhas de código limpo resolvem

---

### 8.3 Clean Code

**Funções com responsabilidade única:**
Uma função faz exatamente uma coisa. Se ela precisa de comentário para explicar o que faz, é sinal de que deve ser dividida ou renomeada.

**Nomes que revelam intenção:**
Variáveis, funções e constantes devem comunicar claramente o que representam, sem necessidade de comentário adicional.

```typescript
// ❌ ERRADO — nomes ambíguos e abreviados
const emp = await findEmp(id)
const d = new Date()
const calc = (v: number) => v * 0.1
const handleClick = () => { ... } // o que faz exatamente?

// ✅ CORRETO — nomes que revelam intenção
const employee = await findEmployeeById(id)
const contractSignatureDate = new Date()
const calculateTaxValue = (baseValue: number): number => baseValue * TAX_RATE
const handleSubmitEmployeeForm = () => { ... }
```

**Sem números mágicos — sempre constantes nomeadas:**

```typescript
// ❌ ERRADO
if (installments > 12) { ... }
const fee = value * 0.035

// ✅ CORRETO
const MAX_INSTALLMENTS = 12
const LATE_PAYMENT_FEE_RATE = 0.035

if (installments > MAX_INSTALLMENTS) { ... }
const fee = value * LATE_PAYMENT_FEE_RATE
```

**Sem comentários que explicam o óbvio:**
O código deve ser autoexplicativo. Comentários são reservados para contexto de negócio não trivial que não pode ser expresso pelo código.

```typescript
// ❌ ERRADO — comentário desnecessário
// incrementa o contador
counter++

// ✅ CORRETO — comentário de contexto de negócio
// Contrato aditivo só pode ser gerado após aprovação do Gestor de Operação (regra financeira interna)
if (contract.status !== ContractStatus.APPROVED_BY_MANAGER) { ... }
```

### 8.4 Tipagem Forte

**TypeScript (Frontend):**

- `any` é **proibido** sem comentário que justifique explicitamente e aponte o caminho para tipagem correta
- Toda função exportada deve ter tipagem explícita de parâmetros e retorno:

```typescript
// ❌ ERRADO
export const findEmployee = async (id) => { ... }
const formatDate = (date) => { ... }

// ✅ CORRETO
export const findEmployeeById = async (id: string): Promise<Employee> => { ... }
const formatDateToBrazilian = (date: Date): string => { ... }
```

- Props de componentes devem ter `interface` ou `type` explicitamente declarado:

```typescript
// ❌ ERRADO
const EmployeeCard = ({ employee, onEdit }: any) => { ... }

// ✅ CORRETO
interface EmployeeCardProps {
  employee: Employee
  onEdit: (id: string) => void
}
const EmployeeCard = ({ employee, onEdit }: EmployeeCardProps) => { ... }
```

- Usar tipos utilitários quando aplicável: `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`
- Enums para valores fixos e conhecidos:

```typescript
// ✅
enum EmployeeStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	ON_LEAVE = "ON_LEAVE"
}
```

**Java (Backend):**

- Nunca usar tipos crus (`List`, `Map`) — sempre parametrizados: `List<EmployeeDTO>`, `Map<String, String>`
- `Optional<T>` em métodos de busca por repository — nunca retornar `null` diretamente
- Assinaturas de métodos públicos sempre com tipos explícitos — nunca depender de inferência em interfaces públicas

---

## 9. Design e Fidelidade ao Figma — CRÍTICO, SEM EXCEÇÕES

> ⚠️ Nenhuma tela ou componente visual deve ser implementado sem referência de design. Esta regra não tem exceção.
>
> **O objetivo é que a implementação seja visualmente idêntica ao Figma.** Claude deve tratar o design como especificação absoluta — qualquer desvio visual é um bug.

### 9.1 Regra principal

**Toda implementação de tela, página ou componente visual exige obrigatoriamente um design de referência do Figma**, enviado por meio de uma das formas abaixo:

| Forma de envio             | Como usar                                                             |
| -------------------------- | --------------------------------------------------------------------- |
| **Integração Figma** (MCP) | Claude acessa diretamente o frame/componente pelo Figma MCP conectado |
| **Print / foto da tela**   | Imagem enviada na conversa antes de iniciar a implementação           |

### 9.2 Comportamento obrigatório ao receber um design

Ao receber o design, Claude deve **analisar exaustivamente antes de escrever qualquer linha de código**. A análise deve cobrir todos os itens abaixo:

#### 9.2.1 Checklist de análise visual (obrigatório antes de codificar)

**Layout e estrutura:**

- Identificar a hierarquia de containers (header, sidebar, main content, footer)
- Mapear o grid/layout system usado (colunas, gaps, alinhamentos)
- Identificar se há scroll areas, áreas fixas ou sticky elements
- Determinar a direção do fluxo de conteúdo (row vs column, wrapping behavior)

**Espaçamentos — extrair valores exatos:**

- Padding interno de cada container e card
- Margin entre seções e elementos
- Gap entre itens em listas, grids e flex containers
- Espaçamento entre label e input em formulários
- Distância entre ícone e texto quando estão lado a lado

**Tipografia — mapear cada nível de texto:**

- Tamanho da fonte (`text-sm`, `text-base`, `text-lg`, `text-xl`, etc.)
- Peso (`font-normal`, `font-medium`, `font-semibold`, `font-bold`)
- Cor exata do texto (primário, secundário, muted, placeholder)
- Line-height e letter-spacing quando visualmente distintos do padrão
- Truncamento (`truncate`, `line-clamp-*`) se o design indicar overflow

**Cores — extrair e usar valores exatos:**

- Cor de fundo de cada container, card, header, sidebar
- Cores de borda (incluindo espessura e estilo: `solid`, `dashed`)
- Cores de texto por hierarquia (título, subtítulo, body, caption, muted)
- Cores de estado: hover, active, focus, disabled, selected
- Gradientes, se existirem
- Opacidade de overlays e backdrops

**Bordas e sombras:**

- Border-radius exato de cada elemento (cards, buttons, inputs, avatars, badges)
- Espessura de borda (`border`, `border-2`, etc.)
- Box-shadow (nível de elevação: `shadow-sm`, `shadow-md`, `shadow-lg`)
- Dividers entre seções (linha, cor, espessura)

**Ícones e imagens:**

- Qual ícone exato é usado (mapear para Lucide React ou React Icons)
- Tamanho do ícone em relação ao texto adjacente
- Cor do ícone (pode ser diferente do texto)
- Posição do ícone (antes do texto, depois, centralizado)
- Placeholders de imagem e aspect ratio

**Componentes interativos:**

- Estilo exato de botões: primário, secundário, outline, ghost, destructive — cor, padding, border-radius, height
- Estilo de inputs: altura, padding, cor de borda normal vs focus, placeholder color
- Estilo de selects, checkboxes, radio buttons, switches, toggles
- Estilo de tabs: ativa vs inativa, indicador, transição
- Estilo de tabelas: header, rows, zebra striping, hover state, bordas

#### 9.2.2 Regras de implementação pixel-perfect

**Fidelidade é inegociável. Claude deve reproduzir o design de forma idêntica.**

- **Usar os componentes shadcn/ui como base** sempre que aplicável — customizar via Tailwind para atingir o visual exato do Figma, nunca criar um componente do zero se já existe equivalente
- **Se o Figma mostra `12px` de padding**, usar `p-3` — não `p-2` nem `p-4`. Se não houver classe Tailwind exata, usar valor arbitrário: `p-[12px]`
- **Se o Figma mostra um border-radius de `8px`**, usar `rounded-lg` — não `rounded` nem `rounded-xl`. Se necessário, usar valor arbitrário: `rounded-[8px]`
- **Se o Figma mostra uma cor específica**, usar a cor exata — nunca "uma cor parecida". Se a cor não existe nos tokens do projeto, definir com valor arbitrário: `bg-[#1E293B]`, `text-[#64748B]`
- **Se o Figma mostra um espaçamento de `24px` entre cards**, usar `gap-6` — contar os pixels, não chutar
- **Se o Figma mostra um ícone específico**, encontrar o ícone exato na biblioteca (Lucide ou React Icons) — nunca substituir por "um ícone parecido"
- **Se o design mostra um elemento com opacidade reduzida**, implementar com a opacidade exata: `opacity-50`, `bg-black/20`

**Hierarquia de prioridade ao implementar:**

```
1. Cores e tipografia exatas          → Token/valor do Figma, sem aproximação
2. Espaçamentos exatos               → Medir em pixels, mapear para Tailwind class ou valor arbitrário
3. Bordas, sombras e border-radius   → Extrair valor exato, usar classe Tailwind mais próxima ou arbitrária
4. Ícones corretos                   → Encontrar o ícone exato na lib, nunca substituir
5. Estados visuais completos         → Hover, focus, active, disabled, loading, empty, error
6. Responsividade                    → Implementar breakpoints se o Figma mostrar variações
```

#### 9.2.3 Criação e Modificação de Componentes para Fidelidade Visual e UX — OBRIGATÓRIO

> ⚠️ **Claude deve criar novos componentes ou modificar componentes existentes sempre que necessário para reproduzir o design do Figma com fidelidade pixel-perfect e garantir a melhor experiência do usuário (UX).** A preservação de código existente **nunca** tem prioridade sobre a fidelidade ao design e a qualidade da experiência do usuário.

Esta regra se aplica a qualquer situação em que um componente existente — seja da pasta `components/ui/` (shadcn/ui) ou dos componentes customizados do projeto — **não atenda exatamente** ao que o design exige em termos visuais ou de interação.

**Quando criar um novo componente:**

- O design apresenta um padrão visual ou interativo que **não existe** em nenhum componente atual do projeto
- Nenhum componente shadcn/ui base pode ser customizado via Tailwind para atingir o resultado exato do Figma
- O elemento visual aparece (ou tem potencial para aparecer) em **mais de um contexto** — extrair como componente reutilizável
- A composição de componentes existentes resultaria em código confuso, acoplado ou difícil de manter
- O design exige um comportamento de UX específico (animações, micro-interações, feedback visual) que não é suportado por nenhum componente existente

**Quando modificar um componente existente:**

- O componente atual está **visualmente próximo** do design, mas precisa de ajustes em espaçamentos, cores, bordas, estados ou comportamento interativo para atingir fidelidade pixel-perfect
- O design exige um **novo estado ou variante** (ex: `loading`, `selected`, `compact`, `highlighted`) que o componente não suporta atualmente
- O componente existente tem **problemas de UX** que o design corrige — ex: área de clique insuficiente, feedback visual ausente, transições faltantes, falta de acessibilidade
- A modificação **não quebra** outros locais onde o componente já é utilizado — se quebrar, criar uma nova variante via prop ou um componente derivado

**Regras ao criar/modificar componentes:**

- ✅ Seguir a estrutura existente: componentes base em `components/ui/`, componentes compostos e de domínio em `components/`
- ✅ Usar **composição sobre herança** — compor a partir de componentes shadcn/ui base sempre que possível
- ✅ Expor variantes via props tipadas (ex: `variant`, `size`, `state`) em vez de criar componentes separados para cada variação visual
- ✅ Garantir que o componente implemente **todos os estados de interação**: hover, focus, active, disabled, loading
- ✅ Priorizar UX em toda decisão:
  - Áreas de clique adequadas (mínimo `44x44px` para touch targets)
  - Feedback visual imediato em toda interação (hover, click, submit)
  - Transições suaves e consistentes (`transition-all duration-200` ou conforme o design)
  - Acessibilidade obrigatória: ARIA labels, keyboard navigation, focus visible
  - Estados de loading com skeleton ou spinner — nunca tela vazia
  - Empty states descritivos e visualmente alinhados ao design
- ✅ Nomear o componente em inglês seguindo `PascalCase`, com nome que revela sua função: `StatusBadge`, `MetricCard`, `CollapsibleSection`
- ✅ Tipar todas as props com `interface` explícita
- ✅ Ao modificar um componente existente, **verificar todos os locais onde ele é usado** antes de alterar — garantir que a mudança não introduz regressão visual

**O que nunca fazer:**

- ❌ Forçar um componente existente a atender o design com hacks (overrides inline excessivos, `!important`, CSS arbitrário que conflita com o design system)
- ❌ Duplicar um componente inteiro só para mudar uma cor ou espaçamento — usar variantes via props
- ❌ Criar componente sem considerar reusabilidade — se ele só será usado uma vez e é simples, pode ficar inline na página
- ❌ Modificar componentes shadcn/ui base de forma que quebre seu uso em outros locais sem verificar impacto
- ❌ Sacrificar UX ou fidelidade visual para manter um componente existente inalterado — **a fidelidade ao design e a experiência do usuário têm prioridade absoluta sobre a preservação de código existente**
- ❌ Implementar um componente "funcional mas feio" com a intenção de ajustar depois — a primeira implementação já deve ser pixel-perfect
- ❌ Ignorar micro-interações presentes no design (tooltips, animações de entrada, transições de estado)

**Exemplo de decisão correta:**

```
Design mostra um card de métricas com ícone circular colorido, valor em destaque
e variação percentual com seta para cima/baixo.

Componente existente `DataMetrics` não suporta ícone circular nem variação com seta.

Claude (correto):
  → Analisa se DataMetrics pode ser estendido com novas props (icon, trend, trendDirection)
  → Se a extensão é limpa e não quebra uso existente: modifica DataMetrics adicionando as variantes
  → Se a extensão seria forçada ou quebraria outros usos: cria MetricCard como novo componente
  → Em ambos os casos: implementa pixel-perfect com todos os estados (loading skeleton, empty, error)

Claude (errado — nunca fazer):
  → Usa DataMetrics como está e ignora o ícone e a variação porque "já existe um componente parecido"
  → Cria o card inline na página com 200 linhas de JSX sem extrair componente
  → Implementa o visual "mais ou menos parecido" sem conferir cores, espaçamentos e ícones exatos
```

**Princípio fundamental:**

> O design entregue pelo desenvolvedor é a **especificação absoluta** da interface. Claude deve fazer **o que for necessário** — criar, modificar, estender, compor ou refatorar componentes — para que o resultado final seja **visualmente idêntico ao Figma** e ofereça a **melhor experiência possível ao usuário**. Nenhuma limitação de componente existente justifica um desvio visual ou de UX.

#### 9.2.4 Estados obrigatórios

**Todo componente deve implementar TODOS os estados visíveis no design, mais os estados implícitos:**

| Estado        | O que implementar                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| **Default**   | Estado normal como mostrado no design                                                                 |
| **Hover**     | Efeito visual ao passar o mouse (se o design mostrar ou se o componente for interativo)               |
| **Focus**     | Ring/outline para acessibilidade em inputs, buttons e links                                           |
| **Active**    | Estado ativo/pressionado para tabs, menu items, seleções                                              |
| **Disabled**  | Opacidade reduzida + cursor not-allowed para elementos que podem ser desabilitados                    |
| **Loading**   | Skeleton ou spinner enquanto dados estão sendo carregados — **nunca mostrar tela vazia sem feedback** |
| **Empty**     | Mensagem descritiva e visual quando não há dados para exibir                                          |
| **Error**     | Feedback visual para erros de validação, falha de API, timeout                                        |
| **Success**   | Toast ou indicação visual de operação concluída com sucesso                                           |
| **Truncated** | Texto com overflow deve ter `truncate` ou `line-clamp` + tooltip se necessário                        |

#### 9.2.5 Acessando dados do Figma via MCP

Quando o design for acessível via integração Figma MCP, Claude deve **usar os dados estruturados do Figma para extrair valores exatos**, não apenas olhar a imagem visualmente:

- Usar as propriedades de design (fill, stroke, effect, typography) diretamente dos dados do nó
- Extrair cores em formato hex/rgb diretamente das propriedades
- Extrair espaçamentos, paddings e gaps dos valores de auto-layout
- Mapear fontes e pesos exatamente como definidos no Figma
- Identificar componentes reutilizáveis (instances) e mapear para componentes shadcn/ui existentes

### 9.3 Comportamento obrigatório quando NÃO há design

Se for solicitada a implementação de qualquer tela, página ou componente visual **sem que um design tenha sido enviado**, Claude deve **parar imediatamente** e responder:

> "Preciso do design do Figma para implementar essa tela. Por favor, envie o frame via integração Figma ou uma foto/print da tela antes de prosseguir."

Claude **não deve**:

- ❌ Inventar um layout por conta própria
- ❌ Usar "bom senso" ou "consistência com o restante do projeto" como justificativa para implementar sem design
- ❌ Perguntar se pode continuar mesmo assim — a resposta sempre será não
- ❌ Sugerir "posso fazer um layout básico e você ajusta depois" — a resposta sempre será não
- ❌ Implementar parcialmente esperando ajustes visuais posteriores

A única exceção é para alterações puramente funcionais que não afetam nenhum elemento visual (ex: corrigir uma chamada de API, ajustar validação de formulário sem mudar o layout).

### 9.4 Fluxo completo de implementação visual

```
Design Figma recebido (MCP ou imagem)
  │
  ├─► ETAPA 1: Análise exaustiva (checklist 9.2.1)
  │     └─► Documentar mentalmente: cores, tipografia, espaçamentos, bordas, ícones, estados
  │
  ├─► ETAPA 2: Mapear para stack (Tailwind + shadcn/ui)
  │     ├─► Identificar componentes shadcn/ui reutilizáveis
  │     ├─► Definir classes Tailwind exatas (ou valores arbitrários quando necessário)
  │     ├─► Mapear ícones exatos (Lucide React / React Icons)
  │     └─► Decidir se componentes existentes atendem ou se é necessário criar/modificar (regra 9.2.3)
  │
  ├─► ETAPA 3: Implementar estrutura
  │     ├─► Layout/grid primeiro, do macro para o micro
  │     ├─► Criar ou modificar componentes conforme necessário para fidelidade pixel-perfect (regra 9.2.3)
  │     ├─► Estilizar cada elemento conforme valores extraídos do Figma
  │     └─► Nunca usar valores "aproximados" — pixel-perfect ou valor arbitrário
  │
  ├─► ETAPA 4: Implementar estados e UX
  │     ├─► Default, hover, focus, active, disabled
  │     ├─► Loading (skeleton/spinner), empty state, error state
  │     ├─► Micro-interações: tooltips, transições, animações de entrada
  │     ├─► Acessibilidade: ARIA labels, keyboard navigation, focus management
  │     └─► Transições e animações se presentes no design
  │
  └─► ETAPA 5: Auto-revisão
        ├─► Comparar visualmente a implementação com o design
        ├─► Verificar se algum espaçamento, cor ou ícone está diferente
        ├─► Garantir que nenhum elemento foi inventado ou omitido
        ├─► Verificar que todos os componentes criados/modificados seguem as regras da seção 9.2.3
        └─► Corrigir qualquer desvio antes de considerar a tarefa concluída
```

### 9.5 O que configura violação desta seção

Qualquer um dos itens abaixo é considerado um **bug de fidelidade visual** e deve ser corrigido imediatamente:

- Usar uma cor "parecida" em vez da cor exata do Figma
- Usar espaçamento diferente do design (ex: `gap-4` quando o design mostra `gap-6`)
- Substituir um ícone por "um similar" em vez de encontrar o exato
- Omitir bordas, sombras ou border-radius presentes no design
- Implementar apenas o estado default e ignorar hover, loading, empty ou error
- Adicionar elementos visuais que não existem no design (decorações extras, bordas, etc.)
- Alterar a hierarquia visual (ex: trocar um heading por body text, alterar peso da fonte)
- Ignorar a ordem visual dos elementos como disposta no design
- Usar padding/margin "de olho" em vez de medir e mapear para Tailwind
- **Reutilizar um componente existente que não atende ao design em vez de criar ou modificar para atingir fidelidade pixel-perfect**
- **Ignorar problemas de UX (áreas de clique pequenas, falta de feedback visual, ausência de transições) que o design resolve**
- **Deixar de criar um componente reutilizável quando o design apresenta um padrão visual que aparece em múltiplos contextos**

---

## 10. Fluxo de Dados — Confirmação Obrigatória Antes de Implementar

> ⚠️ Esta regra se aplica a qualquer operação que envolva leitura ou escrita no banco de dados, sem exceção.

### 10.1 Regra principal

**Antes de implementar qualquer operação de leitura ou escrita no banco**, Claude deve **parar e fazer as perguntas obrigatórias abaixo**. Nunca assumir origem ou destino por conta própria.

### 10.2 Perguntas obrigatórias

**Para leitura (SELECT / GET):**

> "De onde exatamente devo buscar essas informações?
>
> - Qual tabela (ou tabelas com JOIN)?
> - Qual endpoint do backend será chamado?
> - Quais filtros serão aplicados (ex: por `store_id`, `status`, `data`)?"

**Para escrita (INSERT / UPDATE / DELETE / POST / PATCH):**

> "Para onde exatamente esses dados devem ser enviados?
>
> - Qual tabela receberá os dados?
> - Qual endpoint do backend será chamado?
> - De onde vêm os dados que serão persistidos (formulário, estado Zustand, parâmetro de rota, resposta de outra API)?"

### 10.3 Comportamento obrigatório

Claude **não deve**:

- ❌ Assumir tabela, endpoint ou origem dos dados com base no nome da feature ou "contexto óbvio"
- ❌ Reutilizar um endpoint existente sem confirmar que ele atende exatamente ao caso
- ❌ Criar um novo endpoint no backend sem confirmar qual tabela ele vai acessar e com quais filtros
- ❌ Montar um payload para POST/PATCH sem confirmar de onde cada campo virá

Claude **deve**:

- ✅ Parar antes de qualquer implementação que envolva banco e fazer as perguntas
- ✅ Aguardar resposta explícita com tabela, endpoint e origem/destino dos dados
- ✅ Confirmar o entendimento antes de escrever qualquer linha de código relacionada

### 10.4 Exemplo de fluxo correto

```
Desenvolvedor: "Implementa a listagem de colaboradores na tela de RH"

Claude (correto):
  "Antes de implementar, preciso confirmar o fluxo de dados:
   - De qual endpoint devo buscar os colaboradores? Existe um GET já implementado em /rh?
   - Os dados vêm direto da tabela t_colaborador ou há JOIN com outras tabelas?
   - Há algum filtro obrigatório (ex: apenas colaboradores ativos, por unidade)?"

Claude (errado — nunca fazer):
  [implementa direto assumindo GET /rh/allEmployee sem confirmar]
```

---

## 11. Regras de Linguagem — CRÍTICO, SEM EXCEÇÕES

### 11.1 Código → Sempre em Inglês

**Todo código escrito por Claude deve estar em inglês**, independentemente da linguagem de programação, camada ou contexto. Esta regra não tem exceção para código novo.

Isso inclui sem exceção:

- Nomes de variáveis, constantes, funções, métodos, classes, interfaces, enums, tipos
- Nomes de arquivos e pastas criados por Claude
- Nomes de tabelas, colunas, índices e constraints em novas migrations Flyway _(exceção: tabelas existentes já estão em português — manter consistência apenas com o que já existe, nunca criar novas em português)_
- Nomes de branches e mensagens de commit
- Chaves de variáveis de ambiente e configurações
- Comentários de código — inglês por padrão; português apenas para explicar regra de negócio muito específica do contexto brasileiro

```typescript
// ❌ ERRADO — código em português
const statusColaborador = "ativo"
const calcularImposto = (valor: number) => valor * 0.1
interface DadosEmpresa {
	nomeFantasia: string
}

// ✅ CORRETO — código em inglês
const employeeStatus = "active"
const calculateTax = (baseValue: number) => baseValue * TAX_RATE
interface CompanyData {
	tradeName: string
}
```

```java
// ❌ ERRADO
public List<ColaboradorDTO> buscarTodos() { ... }
String nomeCliente = request.getNome();

// ✅ CORRETO
public List<EmployeeDTO> findAll() { ... }
String clientName = request.getName();
```

### 11.2 Convenções por Linguagem

Claude deve seguir rigorosamente as convenções oficiais de cada linguagem usada no projeto. Misturar convenções entre linguagens é proibido.

**TypeScript / JavaScript:**

- `camelCase` para variáveis, funções, métodos e propriedades: `findEmployeeById`, `contractSignatureDate`
- `PascalCase` para classes, interfaces, types, enums e componentes React: `EmployeeCard`, `ContractStatus`
- `SCREAMING_SNAKE_CASE` para constantes globais e valores fixos: `MAX_INSTALLMENTS`, `TAX_RATE`
- `kebab-case` para nomes de arquivos e pastas: `employee-card.tsx`, `find-all-employees.ts`
- Prefixo `use` obrigatório em hooks: `useZodForm`, `useEmployeeData`
- Prefixo `I` proibido em interfaces — usar nome direto: `Employee`, não `IEmployee`

**Java:**

- `camelCase` para variáveis, métodos e parâmetros: `findAllEmployees()`, `contractValue`
- `PascalCase` para classes, interfaces e enums: `EmployeeService`, `ContractStatus`
- `SCREAMING_SNAKE_CASE` para constantes (`static final`): `MAX_RETRY_ATTEMPTS`
- `snake_case` proibido em código Java — exclusivo para SQL/banco
- Sufixos obrigatórios por tipo: `Controller`, `Service`, `Repository`, `DTO`, `Entity`, `Mapper`

**SQL (novas migrations):**

- `snake_case` para nomes de tabelas e colunas: `contract_installment`, `created_at`
- Prefixo `t_` para novas tabelas, seguindo o padrão do projeto: `t_contract_addendum`
- Nomes de índices descritivos: `idx_contracts_store_status`
- SQL keywords em MAIÚSCULO: `SELECT`, `FROM`, `WHERE`, `JOIN`

### 11.3 UI e Comunicação com o Usuário → Português (Brasil)

Tudo que é **visível ao usuário final** deve estar em português brasileiro — isso não é código, é conteúdo:

- Strings, labels, placeholders, títulos de tela
- Mensagens de erro e sucesso exibidas na UI (toasts, alerts, validações)
- Textos de botões, menus e navegação
- Mensagens enviadas pelo sistema (notificações, e-mails gerados)

```typescript
// ✅ CORRETO — código em inglês, conteúdo em português
const errorMessage = "Colaborador não encontrado."
const successToast = "Cadastro realizado com sucesso!"
const placeholder = "Digite o nome do cliente..."

// ❌ ERRADO — mensagem ao usuário em inglês
const error = "Employee not found"
const success = "Registration completed"
```

---

## 12. Convenções de Código

### Backend (Spring Boot)

- Arquitetura em camadas: `Controller → Service → Repository`
- DTOs para entrada e saída — nunca expor entidades JPA diretamente
- Validação de entrada com Bean Validation (`@Valid`, `@NotNull`, etc.)
- Erros padronizados via `GlobalExceptionHandler` com `ExceptionResponse`
- Migrations Flyway para qualquer mudança de schema
- Mapeamento objeto-a-objeto via Dozer (`ObjectMapper` utility)
- Tratamento explícito de erro em toda chamada I/O — nunca `catch` vazio

### Frontend (Next.js)

- **Server Components** por padrão; `"use client"` apenas quando necessário
- Formulários validados com **Zod** antes de qualquer chamada à API
- Erros de API tratados com feedback visual (toast via Sonner) — nunca falhe silenciosamente
- Tipar sempre props e retornos — `any` proibido sem justificativa
- Todas as chamadas à API passam pela camada `services/` — nunca axios/fetch direto em componente
- Formatação de documentos brasileiros via `utils/formatters.ts`
- Novos serviços em `services/{dominio}/` seguindo o padrão existente
- Novos tipos em `types/services/{dominio}/`

---

## 13. O que Nunca Fazer

**Git:**

- Modificar qualquer branch que não tenha o sufixo `_claude`
- Fazer qualquer alteração diretamente em `main`
- Fazer merge, rebase ou operações em outras branches

**Código:**

- Inventar nomes de bibliotecas, métodos ou APIs que não existem
- Alterar banco sem migration Flyway
- Deixar `console.log` ou `System.out.println` em código de produção
- Ignorar erros de TypeScript sem corrigir
- Usar `any` sem comentário justificando
- Expor dados sensíveis em logs ou respostas de API
- Implementar lógica de negócio no Controller ou na camada de apresentação
- Criar arquivos desnecessários — prefira editar o que já existe
- Hardcodear credenciais no código-fonte
- Fazer chamada à API diretamente em componente — sempre via `services/`

**Qualidade:**

- Usar nomes de variáveis, funções ou constantes ambíguos ou abreviados sem clareza
- Deixar números mágicos sem constante nomeada
- Criar funções que fazem mais de uma coisa
- Deixar tipos implícitos em funções exportadas ou props de componentes

**Design:**

- Implementar qualquer tela ou componente visual sem design do Figma enviado
- Inventar layouts, espaçamentos ou cores por conta própria
- Ignorar estados do componente (loading, vazio, erro) presentes no design
- Usar "bom senso visual" como substituto para o design oficial
- Usar cor, espaçamento, ícone ou fonte "parecida" em vez do valor exato do Figma
- Omitir bordas, sombras, border-radius ou opacidade presentes no design
- Adicionar elementos visuais que não existem no design

**Componentes e UX:**

- Reutilizar um componente existente que não atende ao design — criar ou modificar conforme necessário (regra 9.2.3)
- Forçar um componente existente com hacks (overrides inline, `!important`) em vez de estendê-lo corretamente ou criar um novo
- Sacrificar fidelidade visual ou UX para evitar criar/modificar componentes
- Ignorar micro-interações, transições ou feedback visual presentes no design
- Implementar componente "funcional mas feio" com intenção de ajustar depois
- Deixar de verificar impacto em outros locais ao modificar um componente existente
- Criar componente com áreas de clique menores que 44x44px para elementos interativos
- Omitir acessibilidade (ARIA labels, keyboard navigation, focus visible)

**Qualidade e Bibliotecas:**

- Instalar biblioteca para algo que a stack atual já resolve
- Instalar duas libs que resolvem o mesmo problema
- Preferir solução complexa quando código limpo simples resolve
- Instalar nova lib sem informar proativamente o motivo e a justificativa

**Linguagem:**

- Escrever qualquer nome de variável, função, classe, método, arquivo ou coluna nova em português
- Misturar convenções de linguagem (ex: `snake_case` em variável TypeScript, `camelCase` em coluna SQL)
- Usar prefixo `I` em interfaces TypeScript
- Omitir sufixos obrigatórios no Java (`Service`, `Repository`, `DTO`, `Controller`)
- Escrever SQL keywords em minúsculo
- Exibir mensagens de UI em inglês para o usuário final

**Fluxo de Dados:**

- Implementar qualquer leitura ou escrita no banco sem confirmar tabela, endpoint e origem/destino dos dados
- Assumir que um endpoint existente serve para o novo caso sem verificar
- Montar payload de POST/PATCH sem confirmar de onde cada campo vem

---

## 14. .gitignore Obrigatório (ambos os repos)

```gitignore
# Credenciais — nunca expor
.env
*.env
application-local.properties

# Claude Code — manter local, nunca commitar
CLAUDE.md
.claude/

# Dependências e build
node_modules/
dist/
build/
target/
.next/
```

---

## 15. Ao Analisar Erros

1. Identificar a camada: frontend, backend, banco ou infra
2. Explicar a **causa raiz**, não apenas o sintoma
3. Implementar a correção mínima necessária; se houver abordagem estruturalmente melhor, apontar separadamente
4. Usar as versões declaradas na seção 2

---

## 16. Variáveis de Ambiente

### Frontend (`.env`)

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
NEXT_PUBLIC_API_URL=http://localhost:8080   # produção: https://api.trajetoriadosucesso.com
TRUST_HOST=true
```

### Backend (`application.yml`)

```yaml
upload-dir: \uploads
spring.datasource.url: jdbc:postgresql://aws-1-sa-east-1.pooler.supabase.com:5432/postgres
```

Credenciais devem ser movidas para variáveis de ambiente (dívida técnica atual).
