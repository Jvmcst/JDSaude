import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AtendimentoService } from '../../../services/atendimento.service';
import { AuthService } from '../../../services/auth.service';
import { Atendimento } from '../../../models/atendimento.model';
import { StatusBadgeComponent } from '../../../components/status-badge/status-badge.component';
import { DateBrPipe } from '../../../pipes/date-br.pipe';

@Component({
  selector: 'app-home-servidor',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, DateBrPipe],
  templateUrl: './home-servidor.component.html',
  styleUrls: ['./home-servidor.component.scss']
})
export class HomeServidorComponent implements OnInit {
  atendimentos: Atendimento[] = [];
  carregando = true;
  erro       = '';
  dataHoje   = new Date();

  constructor(
    private atendimentoService: AtendimentoService,
    public  authService: AuthService
  ) {}

  ngOnInit(): void {
    this.atendimentoService.listar().subscribe({
      next: lista => {
        // Exibo apenas os nao finalizou
        this.atendimentos = lista.filter(
          a => a.situacao === 'AGENDADO' || a.situacao === 'EM_ANDAMENTO'
        );
        this.carregando = false;
      },
      error: () => { this.erro = 'Erro ao carregar atendimentos.'; this.carregando = false; }
    });
  }

  get stats() {
    return {
      pendentes:    this.atendimentos.filter(a => a.situacao === 'AGENDADO').length,
      emAndamento:  this.atendimentos.filter(a => a.situacao === 'EM_ANDAMENTO').length,
      total:        this.atendimentos.length,
    };
  }

  get proximoAtendimento(): Atendimento | null {
    return this.atendimentos.find(a => a.situacao === 'AGENDADO') ?? null;
  }

  get dataFormatada(): string {
    return this.dataHoje.toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  get nomeUsuario(): string {
    return this.authService.usuarioAtual?.nome ?? 'Servidor';
  }
}
