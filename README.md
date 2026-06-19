# JD Sistema de Saúde

> Sistema de gestão integrada de consultas, pacientes e profissionais de saúde.

---

## 🚀 Setup Rápido

### Pré-requisitos
- Node.js 20+ (LTS recomendado)
- Angular CLI 18+

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm start
# → http://localhost:4200
```

---

## 🎨 Identidade Visual (Bloco 1)

| Token | Valor |
|---|---|
| Cor primária | `#5ADB94` (Verde Menta) |
| Font principal | Plus Jakarta Sans |
| Font mono | JetBrains Mono |
| Tema | Dark (bg: `#0d1117`) |
| Bootstrap | 5.3.x |

### Variáveis CSS principais
```scss
--color-primary:  #5ADB94;
--bg-base:        #0d1117;
--bg-surface:     #161b22;
--text-primary:   #e6edf3;
--font-sans:      'Plus Jakarta Sans', system-ui, sans-serif;
```

---

## 📁 Estrutura de Pastas

```
src/app/
├── components/          # Componentes globais reutilizáveis
│   ├── navbar/          # ✅ Bloco 1 — Navbar responsiva
│   ├── footer/          # ✅ Bloco 1 — Footer
│   └── status-badge/    # ✅ Bloco 1 — Badge de perfil de usuário
├── pages/               # Páginas (telas PT-xxx)
│   └── login/           # 🔄 Bloco 2 — Placeholder
├── services/            # Serviços Angular
│   └── api.service.ts   # ✅ Bloco 1 — Serviço base HTTP
├── models/              # Interfaces TypeScript
│   └── base.model.ts    # ✅ Bloco 1 — Tipos base
├── guards/              # Route guards (Bloco 2)
├── interceptors/        # HTTP interceptors (Bloco 2)
├── shared/              # SharedModule
└── environments/        # Configuração de ambiente
```

---

## 🗺️ Roadmap de Blocos

| Bloco | Status | Descrição |
|---|---|---|
| **Bloco 1** | ✅ | Configuração inicial + Identidade visual |
| **Bloco 2** | 🔜 | Login, Cadastro e Guards (JWT) |
| **Bloco 3** | 🔜 | Home Secretário + Agendamento |
| **Bloco 4** | 🔜 | Gerenciamento de Pacientes |
| **Bloco 5** | 🔜 | Profissionais + Histórico |
| **Bloco 6** | 🔜 | Home Servidor + Registro de Consultas |
| **Bloco 7** | 🔜 | Agendas + Escalas |
| **Bloco 8** | 🔜 | Home Admin + Gerenciar Usuários |
| **Bloco 9** | 🔜 | Dados Globais + Relatórios |

---

## 👥 Perfis de Usuário

| Perfil | Descrição |
|---|---|
| **Secretário** | Agendamentos, pacientes, cadastros |
| **Servidor** | Registro de consultas, agenda, escalas |
| **Administrador** | Gestão de usuários, relatórios globais |

---

## 🛠️ Tecnologias

- **Angular 18** (Standalone Components + Signals)
- **Bootstrap 5.3** + **Bootstrap Icons**
- **Plus Jakarta Sans** + **JetBrains Mono** (Google Fonts)
- **Reactive Forms**
- **JWT Authentication** (Bloco 2)
- **RxJS 7**
