import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../../services/pessoa.service';
import { AtendimentoService } from '../../../services/atendimento.service';
import { Pessoa } from '../../../models/pessoa.model';
import { Atendimento } from '../../../models/atendimento.model';
import { DateBrPipe } from '../../../pipes/date-br.pipe';

@Component({
  selector: 'app-historico-profissional',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DateBrPipe],
  templateUrl: './historico-profissional.component.html',
  styleUrls: ['./historico-profissional.component.scss']
})
export class HistoricoProfissionalComponent implements OnInit {
  profissional: Pessoa | null = null;
  atendimentos: Atendimento[] = [];
  carregando = true;
  erro       = '';
  busca      = '';

  paginaAtual      = 1;
  readonly itensPagina = 6;

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private atendimentoService: AtendimentoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pessoaService.buscarPorId(id).subscribe({
      next: p => { this.profissional = p; },
      error: () => { this.erro = 'Profissional não encontrado.'; this.carregando = false; }
    });
    this.atendimentoService.buscarPorProfissional(id).subscribe({
      next: lista => {
        this.atendimentos = lista;
        this.carregando   = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar histórico.';
        this.carregando = false;
      }
    });
  }

  iniciais(nome: string): string {
    return nome.split(' ').slice(0, 2).map(n => n[0]).join('');
  }

  get atendimentosFiltrados(): Atendimento[] {
    if (!this.busca.trim()) return this.atendimentos;
    const t = this.busca.toLowerCase();
    return this.atendimentos.filter(a =>
      a.pessoaPaciente.nome.toLowerCase().includes(t) ||
      a.pessoaPaciente.cpf.includes(t)
    );
  }

  get paginado(): Atendimento[] {
    const ini = (this.paginaAtual - 1) * this.itensPagina;
    return this.atendimentosFiltrados.slice(ini, ini + this.itensPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.atendimentosFiltrados.length / this.itensPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get stats() {
    return {
      total: this.atendimentos.length,
      pacientes: new Set(this.atendimentos.map(a => a.pessoaPaciente.id)).size,
      ultimo: this.atendimentos[0]?.dataRealizacao ?? null,
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
