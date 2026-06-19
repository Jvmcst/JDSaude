import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AtendimentoService } from '../../../services/atendimento.service';
import { AuthService } from '../../../services/auth.service';
import { Atendimento } from '../../../models/atendimento.model';
import { StatusBadgeComponent } from '../../../components/status-badge/status-badge.component';
import { DateBrPipe } from '../../../pipes/date-br.pipe';

@Component({
  selector: 'app-home-secretario',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, DateBrPipe],
  templateUrl: './home-secretario.component.html',
  styleUrls: ['./home-secretario.component.scss']
})
export class HomeSecretarioComponent implements OnInit {
  atendimentos: Atendimento[] = [];
  carregando = true;
  erro       = '';
  dataHoje   = new Date();

  cancelandoId: number | null  = null;
  confirmandoId: number | null = null;

  constructor(
    private atendimentoService: AtendimentoService,
    public  authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const hoje = new Date().toISOString().split('T')[0];
    this.atendimentoService.buscarPorDataRealizacao(hoje).subscribe({
      next: lista => { this.atendimentos = lista; this.carregando = false; },
      error: () => {
        this.atendimentoService.listar().subscribe({
          next: lista => { this.atendimentos = lista; this.carregando = false; },
          error: () => { this.erro = 'Erro ao carregar atendimentos.'; this.carregando = false; }
        });
      }
    });
  }

  confirmarCancelamento(id: number): void {
    this.confirmandoId = id;
  }

  fecharConfirmacao(): void {
    this.confirmandoId = null;
  }

  cancelarAtendimento(): void {
    const id = this.confirmandoId;
    if (id == null) return;

    const atendimento = this.atendimentos.find(a => a.id === id);
    if (!atendimento) return;

    this.cancelandoId  = id;
    this.confirmandoId = null;

    const req = {
      dataRegistro:        atendimento.dataRegistro,
      dataRealizacao:      atendimento.dataRealizacao,
      situacao:            'CANCELADO' as const,
      idPessoaPaciente:    atendimento.pessoaPaciente.id,
      idPessoaProfissional: atendimento.pessoaProfissional.id,
    };

    this.atendimentoService.atualizar(id, req).subscribe({
      next: () => { this.cancelandoId = null; this.carregar(); },
      error: () => { this.erro = 'Erro ao cancelar atendimento.'; this.cancelandoId = null; }
    });
  }

  get stats() {
    return {
      total:       this.atendimentos.length,
      agendados:   this.atendimentos.filter(a => a.situacao === 'AGENDADO').length,
      emAndamento: this.atendimentos.filter(a => a.situacao === 'EM_ANDAMENTO').length,
      concluidos:  this.atendimentos.filter(a => a.situacao === 'CONCLUIDO').length,
      cancelados:  this.atendimentos.filter(a => a.situacao === 'CANCELADO').length,
    };
  }

  get dataFormatada(): string {
    return this.dataHoje.toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  labelSituacao(s: string): string {
    const map: Record<string, string> = {
      AGENDADO: 'Agendado', EM_ANDAMENTO: 'Em andamento',
      CONCLUIDO: 'Concluído', CANCELADO: 'Cancelado'
    };
    return map[s] ?? s;
  }
}
