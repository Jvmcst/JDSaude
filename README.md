# JD Saúde — Sistema de Gestão em Saúde

> Plataforma web para gestão integrada de consultas, agendamentos, pacientes e profissionais de saúde, com controle de acesso por perfil de usuário.

---

## 🚀 Setup Rápido

### Pré-requisitos

- Node.js 20+ (LTS recomendado)
- Angular CLI 18+

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar em modo de desenvolvimento
npm start
# → http://localhost:4200
```

### Build para produção

```bash
npm run build
```

---

## 🏗️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Angular | 18 | Framework principal (Standalone Components) |
| TypeScript | 5.4 | Linguagem |
| Bootstrap | 5.3 | Estilização e layout responsivo |
| Bootstrap Icons | 1.11 | Ícones |
| RxJS | 7.8 | Programação reativa |
| Chart.js | 4.5 | Gráficos nos relatórios |
| SCSS | — | Estilização customizada |

> Autenticação via sessão armazenada em `localStorage`, com guards por perfil de usuário.

---

## 🎨 Identidade Visual

| Token | Valor |
|---|---|
| Cor primária | `#5ADB94` (Verde Menta) |
| Fundo base | `#0d1117` |
| Fundo superfície | `#161b22` |
| Texto principal | `#e6edf3` |
| Font principal | Plus Jakarta Sans |
| Font mono | JetBrains Mono |
| Tema | Dark |

### Variáveis CSS principais

```scss
--color-primary:  #5ADB94;
--bg-base:        #0d1117;
--bg-surface:     #161b22;
--text-primary:   #e6edf3;
--font-sans:      'Plus Jakarta Sans', system-ui, sans-serif;
```

---

## 👥 Perfis de Usuário

O sistema possui três perfis com acessos e fluxos distintos, controlados por route guards (`authGuard`, `secretarioGuard`, `servidorGuard`, `adminGuard`).

| Perfil | Rota base | Permissões |
|---|---|---|
| **Secretário** | `/secretario` | Agendamentos, pacientes, profissionais, agenda, medicamentos |
| **Servidor** | `/servidor` | Consultas abertas, registro de atendimento, agenda, escalas |
| **Administrador** | `/admin` | Gerenciamento de usuários, relatórios globais |

Após o login, o usuário é redirecionado automaticamente para a home do seu perfil.

---

## 📁 Estrutura do Projeto

```
src/app/
├── components/                  # Componentes reutilizáveis globais
│   ├── navbar/                  # Navbar responsiva com menu por perfil
│   ├── footer/                  # Rodapé
│   ├── status-badge/            # Badge de status de consulta
│   ├── data-table/              # Tabela genérica com ordenação e paginação
│   └── confirm-modal/           # Modal de confirmação de ações
│
├── pages/                       # Telas da aplicação
│   ├── login/                   # Autenticação
│   ├── cadastro/                # Cadastro de novos usuários
│   ├── secretario/
│   │   ├── home/                # Dashboard do secretário
│   │   └── agendamento/         # Agendamento de consultas
│   ├── servidor/
│   │   ├── home/                # Dashboard do servidor
│   │   ├── consultas-abertas/   # Lista de consultas do dia
│   │   └── registro-consulta/   # Registro de triagem, diagnóstico e receita
│   ├── admin/
│   │   ├── home/                # Dashboard do administrador
│   │   ├── usuarios/            # Listagem e gerenciamento de usuários
│   │   └── editar-usuario/      # Edição de perfil de usuário
│   ├── pacientes/
│   │   ├── lista/               # Listagem com filtros
│   │   ├── paciente-form/       # Formulário compartilhado (criar/editar)
│   │   ├── cadastro/            # Cadastro de paciente
│   │   └── editar/              # Edição de paciente
│   ├── profissionais/
│   │   ├── lista/               # Listagem com filtros por tipo/especialidade
│   │   ├── historico/           # Histórico de consultas do profissional
│   │   └── detalhe-historico/   # Detalhe de uma consulta no histórico
│   ├── agenda/
│   │   ├── calendario/          # Visão de calendário de agendamentos
│   │   ├── escalas/             # Gerenciamento de escalas de trabalho
│   │   └── agenda-servidor/     # Agenda específica por servidor
│   ├── medicamentos/
│   │   ├── lista/               # Listagem de medicamentos
│   │   └── form/                # Formulário criar/editar medicamento
│   └── relatorios/
│       ├── relatorios/          # Dashboard de relatórios
│       ├── relatorio-semanal/   # Relatório semanal de atendimentos
│       └── agenda-pesquisa/     # Pesquisa por agenda e período
│
├── services/                    # Serviços de comunicação com a API
│   ├── api.service.ts           # Serviço base HTTP (URL configurável por ambiente)
│   ├── auth.service.ts          # Autenticação e sessão do usuário
│   ├── paciente.service.ts
│   ├── profissional.service.ts
│   ├── consulta.service.ts
│   ├── atendimento.service.ts
│   ├── triagem.service.ts
│   ├── diagnostico.service.ts
│   ├── receita.service.ts
│   ├── medicamento.service.ts
│   ├── escala.service.ts
│   ├── usuario.service.ts
│   ├── pessoa.service.ts
│   └── relatorio.service.ts
│
├── models/                      # Interfaces TypeScript
│   ├── base.model.ts            # Tipos base compartilhados
│   ├── paciente.model.ts        # Paciente, PacienteRequest, PacienteFiltro
│   ├── profissional.model.ts    # Profissional, HistoricoConsulta
│   ├── consulta.model.ts        # Consulta, AgendamentoRequest, SlotHorario
│   ├── atendimento.model.ts
│   ├── triagem.model.ts
│   ├── diagnostico.model.ts
│   ├── receita.model.ts
│   ├── medicamento.model.ts
│   ├── escala.model.ts
│   ├── usuario.model.ts
│   └── usuario-admin.model.ts
│
├── guards/                      # Proteção de rotas
│   ├── auth.guard.ts            # Verifica se o usuário está autenticado
│   ├── admin.guard.ts           # Restringe acesso a administradores
│   └── role.guards.ts           # Guards por perfil (secretario, servidor, admin)
│
├── interceptors/
│   └── auth.interceptor.ts      # Intercepta requisições HTTP
│
├── directives/
│   └── only-numbers.directive.ts # Restringe input a apenas dígitos
│
├── pipes/
│   ├── cpf-mask.pipe.ts         # Formata CPF: 000.000.000-00
│   └── date-br.pipe.ts          # Formata datas no padrão brasileiro
│
└── shared/
    └── shared.module.ts         # Módulo compartilhado (pipes, diretivas)
```

---

## 🗺️ Rotas

| Rota | Componente | Acesso |
|---|---|---|
| `/login` | LoginComponent | Público |
| `/cadastro` | CadastroComponent | Público |
| `/secretario/home` | HomeSecretarioComponent | Secretário |
| `/secretario/agendamento` | AgendamentoComponent | Secretário |
| `/servidor/home` | HomeServidorComponent | Servidor |
| `/servidor/consultas` | ConsultasAbertasComponent | Servidor |
| `/servidor/consultas/:id/registro` | RegistroConsultaComponent | Servidor |
| `/admin/home` | HomeAdminComponent | Admin |
| `/admin/usuarios` | GerenciarUsuariosComponent | Admin |
| `/admin/usuarios/:id/editar` | EditarUsuarioComponent | Admin |
| `/pacientes` | ListaPacientesComponent | Autenticado |
| `/pacientes/novo` | CadastroPacienteComponent | Autenticado |
| `/pacientes/:id/editar` | EditarPacienteComponent | Autenticado |
| `/profissionais` | ListaProfissionaisComponent | Autenticado |
| `/profissionais/:id/historico` | HistoricoProfissionalComponent | Autenticado |
| `/agenda` | CalendarioComponent | Autenticado |
| `/agenda/escalas` | EscalasComponent | Autenticado |
| `/agenda/servidores` | AgendaServidorComponent | Autenticado |
| `/medicamentos` | ListaMedicamentosComponent | Autenticado |
| `/medicamentos/novo` | MedicamentoFormComponent | Autenticado |
| `/medicamentos/:id/editar` | MedicamentoFormComponent | Autenticado |
| `/relatorios` | RelatoriosComponent | Autenticado |
| `/relatorios/semanal` | RelatorioSemanalComponent | Autenticado |
| `/relatorios/agenda` | AgendaPesquisaComponent | Autenticado |

---

## 🌐 API

A URL base da API é configurada por ambiente:

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://jdsaude-api.onrender.com',
};
```

Todos os serviços consomem esta URL base via `ApiService`. O interceptor de autenticação (`auth.interceptor.ts`) pode ser utilizado para injetar headers de sessão nas requisições.

---

## 🔐 Autenticação

O fluxo de autenticação é gerenciado pelo `AuthService`:

1. O usuário envia login e senha para `POST /usuario/login`
2. A resposta retorna o perfil (`ADMIN`, `SECRETARIO`, `SERVIDOR`)
3. Os dados da sessão (`id`, `nome`, `perfil`) são persistidos em `localStorage`
4. Um `BehaviorSubject` mantém o estado reativo do usuário logado
5. O `authGuard` protege todas as rotas autenticadas
6. Os guards de perfil (`secretarioGuard`, `servidorGuard`, `adminGuard`) controlam o acesso às áreas restritas

---

## 📊 Modelos Principais

### Paciente
```ts
interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;   // YYYY-MM-DD
  sexo: 'M' | 'F' | 'O';
  telefone: string;
  tipoSanguineo?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  alergias?: string;
  ativo: boolean;
}
```

### Consulta
```ts
type StatusConsulta = 'agendada' | 'confirmada' | 'em_atendimento' | 'concluida' | 'cancelada' | 'falta';

interface Consulta {
  id: number;
  pacienteNome: string;
  profissionalNome: string;
  profissionalEspecialidade: string;
  data: string;       // YYYY-MM-DD
  horario: string;    // HH:mm
  status: StatusConsulta;
}
```

### Profissional
```ts
type TipoProfissional = 'medico' | 'enfermeiro' | 'tecnico' | 'outro';

interface Profissional {
  id: number;
  nome: string;
  crm?: string;
  coren?: string;
  especialidade: string;
  tipo: TipoProfissional;
  ativo: boolean;
}
```

---

## 🧩 Componentes Compartilhados

| Componente | Descrição |
|---|---|
| `DataTableComponent` | Tabela genérica com colunas configuráveis, ordenação e paginação |
| `ConfirmModalComponent` | Modal Bootstrap para confirmar ações destrutivas |
| `StatusBadgeComponent` | Badge colorido por status de consulta |
| `NavbarComponent` | Barra de navegação responsiva com menu adaptado ao perfil |
| `FooterComponent` | Rodapé padrão da aplicação |

### Pipes

| Pipe | Exemplo |
|---|---|
| `CpfMaskPipe` | `12345678900` → `123.456.789-00` |
| `DateBrPipe` | `2025-06-25` → `25/06/2025` |

### Diretivas

| Diretiva | Comportamento |
|---|---|
| `OnlyNumbersDirective` | Bloqueia qualquer entrada não numérica em campos de input |
