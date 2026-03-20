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

**O que Claude NUNCA deve fazer:**

- ❌ Modificar arquivos em qualquer branch que não tenha o sufixo `_claude`
- ❌ Fazer qualquer alteração diretamente em `main`
- ❌ Fazer merge, rebase ou qualquer operação em outras branches — essa responsabilidade é exclusiva do desenvolvedor
- ❌ Assumir que já está na branch correta sem verificar com `git branch`

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

### 9.1 Regra principal

**Toda implementação de tela, página ou componente visual exige obrigatoriamente um design de referência do Figma**, enviado por meio de uma das formas abaixo:

| Forma de envio             | Como usar                                                             |
| -------------------------- | --------------------------------------------------------------------- |
| **Integração Figma** (MCP) | Claude acessa diretamente o frame/componente pelo Figma MCP conectado |
| **Print / foto da tela**   | Imagem enviada na conversa antes de iniciar a implementação           |

### 9.2 Comportamento obrigatório ao receber um design

Ao receber o design, Claude deve:

1. **Analisar antes de codificar** — identificar layout, hierarquia visual, espaçamentos, cores, tipografia e estados do componente (hover, loading, empty, error)
2. **Seguir o design com fidelidade pixel a pixel** — usar os tokens de cor, tamanho e espaçamento exatamente como definidos no Figma
3. **Usar os componentes shadcn/ui existentes** como base sempre que aplicável — customizar via Tailwind para atingir o visual do Figma, nunca criar do zero se já existe equivalente
4. **Mapear estados** — implementar todos os estados visíveis no design (loading skeleton, estado vazio, erro, sucesso)
5. **Respeitar responsividade** — se o Figma mostrar variações de breakpoint, implementar todas

### 9.3 Comportamento obrigatório quando NÃO há design

Se for solicitada a implementação de qualquer tela, página ou componente visual **sem que um design tenha sido enviado**, Claude deve **parar imediatamente** e responder:

> "Preciso do design do Figma para implementar essa tela. Por favor, envie o frame via integração Figma ou uma foto/print da tela antes de prosseguir."

Claude **não deve**:

- ❌ Inventar um layout por conta própria
- ❌ Usar "bom senso" ou "consistência com o restante do projeto" como justificativa para implementar sem design
- ❌ Perguntar se pode continuar mesmo assim — a resposta sempre será não

A única exceção é para alterações puramente funcionais que não afetam nenhum elemento visual (ex: corrigir uma chamada de API, ajustar validação de formulário sem mudar o layout).

### 9.4 Fidelidade ao implementar

```
Design Figma recebido
  └─► Identificar: cores, tipografia, espaçamentos, bordas, sombras, ícones
        └─► Mapear para: classes Tailwind v4 + tokens shadcn/ui existentes
              └─► Implementar: estrutura HTML/JSX fiel ao layout
                    └─► Verificar: todos os estados (loading, vazio, erro, sucesso)
                          └─► Nunca: improvisar elementos que não estão no design
```

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

---

**Design:**

- Implementar qualquer tela ou componente visual sem design do Figma enviado
- Inventar layouts, espaçamentos ou cores por conta própria
- Ignorar estados do componente (loading, vazio, erro) presentes no design
- Usar "bom senso visual" como substituto para o design oficial

**Qualidade e Bibliotecas:**

- Instalar biblioteca para algo que a stack atual já resolve
- Instalar duas libs que resolvem o mesmo problema
- Preferir solução complexa quando código limpo simples resolve
- Instalar nova lib sem informar proativamente o motivo e a justificativa

- Escrever qualquer nome de variável, função, classe, método, arquivo ou coluna nova em português
- Misturar convenções de linguagem (ex: `snake_case` em variável TypeScript, `camelCase` em coluna SQL)
- Usar prefixo `I` em interfaces TypeScript
- Omitir sufixos obrigatórios no Java (`Service`, `Repository`, `DTO`, `Controller`)
- Escrever SQL keywords em minúsculo
- Exibir mensagens de UI em inglês para o usuário final

- Implementar qualquer leitura ou escrita no banco sem confirmar tabela, endpoint e origem/destino dos dados
- Assumir que um endpoint existente serve para o novo caso sem verificar
- Montar payload de POST/PATCH sem confirmar de onde cada campo vem

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
