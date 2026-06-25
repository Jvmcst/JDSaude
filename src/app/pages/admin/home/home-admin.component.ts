import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PessoaService } from '../../../services/pessoa.service';
import { AtendimentoService } from '../../../services/atendimento.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  dataHoje = new Date();

  stats = {
    totalPessoas:       0,
    totalAtendimentos:  0,
    atendimentosConcluidos: 0,
  };

readonly menuItems = [
  { label: 'Dashboard',     route: '/admin/home',     icon: 'bi-speedometer2' },
  { label: 'Pacientes',     route: '/pacientes',      icon: 'bi-people'       },
  { label: 'Profissionais', route: '/profissionais',  icon: 'bi-person-badge' },
  { label: 'Agenda',        route: '/agenda',         icon: 'bi-calendar3'    },
  { label: 'Medicamentos',  route: '/medicamentos',   icon: 'bi-capsule-pill' },
  { label: 'Relatórios',    route: '/relatorios',     icon: 'bi-bar-chart'    },
];

  constructor(
    public  authService: AuthService,
    private pessoaService: PessoaService,
    private atendimentoService: AtendimentoService
  ) {}

  ngOnInit(): void {
    this.pessoaService.listar().subscribe({
      next: lista => { this.stats.totalPessoas = lista.length; },
      error: () => {}
    });
    this.atendimentoService.listar().subscribe({
      next: lista => {
        this.stats.totalAtendimentos      = lista.length;
        this.stats.atendimentosConcluidos = lista.filter(a => a.situacao === 'CONCLUIDO').length;
      },
      error: () => {}
    });
  }

  get nomeUsuario(): string {
    return this.authService.usuarioAtual?.nome ?? 'Administrador';
  }

  get dataFormatada(): string {
    return this.dataHoje.toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
  }
}
