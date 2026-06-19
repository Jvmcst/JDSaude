import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../../services/pessoa.service';
import { AtendimentoService } from '../../../services/atendimento.service';
import { Pessoa } from '../../../models/pessoa.model';
import { Atendimento } from '../../../models/atendimento.model';
import { DateBrPipe } from '../../../pipes/date-br.pipe';

@Component({
  selector: 'app-agenda-servidor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DateBrPipe],
  templateUrl: './agenda-servidor.component.html',
  styleUrls: ['./agenda-servidor.component.scss']
})
export class AgendaServidorComponent implements OnInit {
  profissionais: Pessoa[]    = [];
  profSelecionado: Pessoa | null = null;
  atendimentos: Atendimento[] = [];
  carregando       = true;
  carregandoAtend  = false;
  erro             = '';

  constructor(
    private pessoaService: PessoaService,
    private atendimentoService: AtendimentoService
  ) {}

  ngOnInit(): void {
    this.pessoaService.listar().subscribe({
      next: lista => {
        this.profissionais = lista;
        this.carregando    = false;
        if (lista.length > 0) this.selecionarProfissional(lista[0]);
      },
      error: () => {
        this.erro       = 'Erro ao carregar profissionais.';
        this.carregando = false;
      }
    });
  }

  selecionarProfissional(p: Pessoa): void {
    this.profSelecionado  = p;
    this.carregandoAtend  = true;
    this.atendimentos     = [];
    this.atendimentoService.buscarPorProfissional(p.id).subscribe({
      next: lista => {
        this.atendimentos    = lista.sort((a, b) => b.dataRealizacao.localeCompare(a.dataRealizacao));
        this.carregandoAtend = false;
      },
      error: () => { this.carregandoAtend = false; }
    });
  }

  iniciais(nome: string): string {
    return nome.split(' ').slice(0, 2).map(n => n[0]).join('');
  }

  get atendimentosFuturos(): Atendimento[] {
    const hoje = new Date().toISOString().split('T')[0];
    return this.atendimentos.filter(a => a.dataRealizacao >= hoje && a.situacao !== 'CANCELADO');
  }

  get atendimentosPassados(): Atendimento[] {
    const hoje = new Date().toISOString().split('T')[0];
    return this.atendimentos.filter(a => a.dataRealizacao < hoje || a.situacao === 'CONCLUIDO');
  }

  get stats() {
    const hoje = new Date().toISOString().split('T')[0];
    return {
      total:      this.atendimentos.length,
      futuros:    this.atendimentosFuturos.length,
      concluidos: this.atendimentos.filter(a => a.situacao === 'CONCLUIDO').length,
    };
  }

  corSituacao(s: string): string {
    const map: Record<string, string> = {
      AGENDADO: '#5ab8db', EM_ANDAMENTO: '#dbb45a',
      CONCLUIDO: '#5ADB94', CANCELADO: '#f08080'
    };
    return map[s] ?? '#9a9ab0';
  }

  labelSituacao(s: string): string {
    const map: Record<string, string> = {
      AGENDADO: 'Agendado', EM_ANDAMENTO: 'Em andamento',
      CONCLUIDO: 'Concluído', CANCELADO: 'Cancelado'
    };
    return map[s] ?? s;
  }
}
