import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AtendimentoService } from '../../../services/atendimento.service';
import { Atendimento, SituacaoAtendimento } from '../../../models/atendimento.model';
import { DateBrPipe } from '../../../pipes/date-br.pipe';

@Component({
  selector: 'app-consultas-abertas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DateBrPipe],
  templateUrl: './consultas-abertas.component.html',
  styleUrls: ['./consultas-abertas.component.scss']
})
export class ConsultasAbertasComponent implements OnInit {
  atendimentos: Atendimento[] = [];
  carregando  = true;
  erro        = '';
  busca       = '';
  filtroSituacao: SituacaoAtendimento | '' = '';

  readonly situacaoOpcoes: { valor: SituacaoAtendimento | ''; label: string }[] = [
    { valor: '',             label: 'Todas as situações' },
    { valor: 'AGENDADO',     label: 'Agendados'          },
    { valor: 'EM_ANDAMENTO', label: 'Em andamento'       },
    { valor: 'CONCLUIDO',    label: 'Concluídos'         },
    { valor: 'CANCELADO',    label: 'Cancelados'         },
  ];

  constructor(private atendimentoService: AtendimentoService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.atendimentoService.listar().subscribe({
      next: lista => {
        this.atendimentos = lista;
        this.carregando = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar atendimentos. Verifique se a API está rodando.';
        this.carregando = false;
      }
    });
  }

  get atendimentosFiltrados(): Atendimento[] {
    return this.atendimentos.filter(a => {
      const matchBusca = !this.busca.trim() ||
        a.pessoaPaciente.nome.toLowerCase().includes(this.busca.toLowerCase()) ||
        a.pessoaPaciente.cpf.includes(this.busca);
      const matchSituacao = !this.filtroSituacao || a.situacao === this.filtroSituacao;
      return matchBusca && matchSituacao;
    });
  }

  get stats() {
    return {
      agendados:    this.atendimentos.filter(a => a.situacao === 'AGENDADO').length,
      emAndamento:  this.atendimentos.filter(a => a.situacao === 'EM_ANDAMENTO').length,
      concluidos:   this.atendimentos.filter(a => a.situacao === 'CONCLUIDO').length,
      cancelados:   this.atendimentos.filter(a => a.situacao === 'CANCELADO').length,
    };
  }

  labelSituacao(s: string): string {
    const map: Record<string, string> = {
      AGENDADO: 'Agendado', EM_ANDAMENTO: 'Em andamento',
      CONCLUIDO: 'Concluído', CANCELADO: 'Cancelado'
    };
    return map[s] ?? s;
  }
}
