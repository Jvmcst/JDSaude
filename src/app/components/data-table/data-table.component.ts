import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';


export interface ColunaDef {
  campo: string;
  titulo: string;
  pipe?: 'date' | 'hora' | 'cpf' | 'none';
  sortable?: boolean;
  width?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusBadgeComponent],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnChanges {
  @Input() colunas: ColunaDef[] = [];
  @Input() dados: any[] = [];
  @Input() carregando = false;
  @Input() itensPorPagina = 8;
  @Input() mensagemVazia = 'Nenhum registro encontrado.';

  @Output() acaoLinha = new EventEmitter<{ acao: string; item: any }>();

  paginaAtual = 1;
  termoBusca  = '';
  sortCampo   = '';
  sortAsc     = true;

  get dadosFiltrados(): any[] {
    let lista = [...this.dados];
    if (this.termoBusca.trim()) {
      const t = this.termoBusca.toLowerCase();
      lista = lista.filter(item =>
        Object.values(item).some(v => String(v).toLowerCase().includes(t))
      );
    }
    if (this.sortCampo) {
      lista.sort((a, b) => {
        const va = a[this.sortCampo] ?? '';
        const vb = b[this.sortCampo] ?? '';
        return this.sortAsc
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      });
    }
    return lista;
  }

  get paginado(): any[] {
    const ini = (this.paginaAtual - 1) * this.itensPorPagina;
    return this.dadosFiltrados.slice(ini, ini + this.itensPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.dadosFiltrados.length / this.itensPorPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c['dados']) this.paginaAtual = 1;
  }

  ordenar(campo: string): void {
    if (this.sortCampo === campo) this.sortAsc = !this.sortAsc;
    else { this.sortCampo = campo; this.sortAsc = true; }
  }

  emitir(acao: string, item: any, event: Event): void {
    event.stopPropagation();
    this.acaoLinha.emit({ acao, item });
  }

  formatarValor(item: any, col: ColunaDef): string {
    const v = item[col.campo];
    if (v == null) return '—';
    switch (col.pipe) {
      case 'date': return new Date(v + 'T00:00:00').toLocaleDateString('pt-BR');
      case 'hora': return v;
      case 'cpf':  return v;
      default:     return String(v);
    }
  }
}
