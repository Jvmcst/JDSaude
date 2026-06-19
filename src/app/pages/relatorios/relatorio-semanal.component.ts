import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AtendimentoService } from '../../services/atendimento.service';
import { Atendimento } from '../../models/atendimento.model';

interface LinhaSemanal {
  profissionalId: number;
  profissionalNome: string;
  total: number;
  concluidos: number;
  cancelados: number;
  agendados: number;
}

@Component({
  selector: 'app-relatorio-semanal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './relatorio-semanal.component.html',
  styleUrls: ['./relatorio-semanal.component.scss']
})
export class RelatorioSemanalComponent implements OnInit {
  dados: LinhaSemanal[] = [];
  carregando = true;
  erro       = '';

  semanaOffset = 0;

  constructor(private atendimentoService: AtendimentoService) {}

  ngOnInit(): void { this.carregar(); }

  get semanaLabel(): string {
    const inicio = this.inicioSemana(this.semanaOffset);
    const fim    = new Date(inicio); fim.setDate(fim.getDate() + 6);
    const fmt    = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    return `${fmt(inicio)}–${fmt(fim)}`;
  }

  private inicioSemana(offsetSemanas: number): Date {
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    const dow  = hoje.getDay();
    const seg  = new Date(hoje); seg.setDate(hoje.getDate() - (dow === 0 ? 6 : dow - 1));
    seg.setDate(seg.getDate() - offsetSemanas * 7);
    return seg;
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';

    const inicio = this.inicioSemana(this.semanaOffset);
    const fim    = new Date(inicio); fim.setDate(fim.getDate() + 6);
    const isoInicio = inicio.toISOString().split('T')[0];
    const isoFim    = fim.toISOString().split('T')[0];

    this.atendimentoService.listar().subscribe({
      next: lista => {
        const daSemana = lista.filter(
          a => a.dataRealizacao >= isoInicio && a.dataRealizacao <= isoFim
        );
        this.dados = this.agruparPorProfissional(daSemana);
        this.carregando = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar atendimentos.';
        this.carregando = false;
      }
    });
  }

  private agruparPorProfissional(ats: Atendimento[]): LinhaSemanal[] {
    const mapa = new Map<number, LinhaSemanal>();
    ats.forEach(a => {
      const id   = a.pessoaProfissional.id;
      const nome = a.pessoaProfissional.nome;
      if (!mapa.has(id)) {
        mapa.set(id, { profissionalId: id, profissionalNome: nome, total: 0, concluidos: 0, cancelados: 0, agendados: 0 });
      }
      const linha = mapa.get(id)!;
      linha.total++;
      if (a.situacao === 'CONCLUIDO')    linha.concluidos++;
      if (a.situacao === 'CANCELADO')    linha.cancelados++;
      if (a.situacao === 'AGENDADO')     linha.agendados++;
    });
    return Array.from(mapa.values()).sort((a, b) => b.total - a.total);
  }

  get totais() {
    return {
      total:      this.dados.reduce((s, d) => s + d.total,      0),
      concluidos: this.dados.reduce((s, d) => s + d.concluidos, 0),
      cancelados: this.dados.reduce((s, d) => s + d.cancelados, 0),
    };
  }

  taxaConclusao(linha: LinhaSemanal): string {
    if (linha.total === 0) return '—';
    return ((linha.concluidos / linha.total) * 100).toFixed(0) + '%';
  }

  corTaxa(taxa: string): string {
    const n = parseFloat(taxa);
    if (isNaN(n)) return '#6b8f78';
    if (n >= 80)  return '#5ADB94';
    if (n >= 50)  return '#dbb45a';
    return '#f08080';
  }

  iniciais(nome: string): string {
    return nome.split(' ').slice(0, 2).map(n => n[0]).join('');
  }

  exportarCSV(): void {
    const cab    = ['Profissional', 'Total', 'Concluídos', 'Cancelados', 'Agendados', 'Taxa'];
    const linhas = this.dados.map(d =>
      [d.profissionalNome, d.total, d.concluidos, d.cancelados, d.agendados, this.taxaConclusao(d)].join(';')
    );
    const csv  = [cab.join(';'), ...linhas].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `relatorio-semanal-${this.semanaLabel.replace(/\//g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
