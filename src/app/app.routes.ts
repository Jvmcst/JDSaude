import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { secretarioGuard, servidorGuard, adminGuard } from './guards/role.guards';

export const routes: Routes = [

  // Publicas qualquer pessoa que acessar pode ver
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent)
  },

  // Secretario
  {
    path: 'secretario',
    canActivate: [authGuard, secretarioGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/secretario/home/home-secretario.component').then(m => m.HomeSecretarioComponent) },
      { path: 'agendamento', loadComponent: () => import('./pages/secretario/agendamento/agendamento.component').then(m => m.AgendamentoComponent) },
    ]
  },

  // Servidor
  {
    path: 'servidor',
    canActivate: [authGuard, servidorGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/servidor/home/home-servidor.component').then(m => m.HomeServidorComponent) },
      { path: 'consultas', loadComponent: () => import('./pages/servidor/consultas-abertas/consultas-abertas.component').then(m => m.ConsultasAbertasComponent) },
      { path: 'consultas/:id/registro', loadComponent: () => import('./pages/servidor/registro-consulta/registro-consulta.component').then(m => m.RegistroConsultaComponent) },
    ]
  },

  // Administrador
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/admin/home/home-admin.component').then(m => m.HomeAdminComponent) },
      { path: 'usuarios', loadComponent: () => import('./pages/admin/usuarios/gerenciar-usuarios.component').then(m => m.GerenciarUsuariosComponent) },
      { path: 'usuarios/:id/editar', loadComponent: () => import('./pages/admin/editar-usuario/editar-usuario.component').then(m => m.EditarUsuarioComponent) },
    ]
  },

  // Pacientes
  {
    path: 'pacientes',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/pacientes/lista/lista-pacientes.component').then(m => m.ListaPacientesComponent) },
      { path: 'novo', loadComponent: () => import('./pages/pacientes/cadastro/cadastro-paciente.component').then(m => m.CadastroPacienteComponent) },
      { path: ':id/editar', loadComponent: () => import('./pages/pacientes/editar/editar-paciente.component').then(m => m.EditarPacienteComponent) },
    ]
  },

  // Profissionais
  {
    path: 'profissionais',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/profissionais/lista/lista-profissionais.component').then(m => m.ListaProfissionaisComponent) },
      { path: ':id/historico', loadComponent: () => import('./pages/profissionais/historico/historico-profissional.component').then(m => m.HistoricoProfissionalComponent) },
    ]
  },

  // Agenda
  {
    path: 'agenda',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/agenda/calendario/calendario.component').then(m => m.CalendarioComponent) },
      { path: 'escalas', loadComponent: () => import('./pages/agenda/escalas/escalas.component').then(m => m.EscalasComponent) },
      { path: 'servidores', loadComponent: () => import('./pages/agenda/agenda-servidor/agenda-servidor.component').then(m => m.AgendaServidorComponent) },
    ]
  },

  {
    path: 'medicamentos',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/medicamentos/lista/lista-medicamentos.component').then(m => m.ListaMedicamentosComponent) },
      { path: 'novo', loadComponent: () => import('./pages/medicamentos/form/medicamento-form.component').then(m => m.MedicamentoFormComponent) },
      { path: ':id/editar', loadComponent: () => import('./pages/medicamentos/form/medicamento-form.component').then(m => m.MedicamentoFormComponent) },
    ]
  },

  // Relatorios
  {
    path: 'relatorios',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/relatorios/relatorios.component').then(m => m.RelatoriosComponent) },
      { path: 'semanal', loadComponent: () => import('./pages/relatorios/relatorio-semanal.component').then(m => m.RelatorioSemanalComponent) },
      { path: 'agenda', loadComponent: () => import('./pages/relatorios/agenda-pesquisa.component').then(m => m.AgendaPesquisaComponent) },
    ]
  },

  // 
  { path: '**', redirectTo: 'login' }
];
