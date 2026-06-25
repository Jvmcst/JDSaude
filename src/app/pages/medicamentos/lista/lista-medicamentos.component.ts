import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicamentoService } from '../../../services/medicamento.service';
import { Medicamento } from '../../../models/medicamento.model';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-lista-medicamentos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ConfirmModalComponent],
  templateUrl: './lista-medicamentos.component.html',
  styleUrls: ['./lista-medicamentos.component.scss']
})
export class ListaMedicamentosComponent implements OnInit {
  medicamentos: Medicamento[] = [];
  carregando = true;
  erro = '';
  busca = '';

  paginaAtual = 1;
  readonly itensPagina = 8;

  modalExcluir = false;
  medicamentoSelecionado: Medicamento | null = null;
  excluindo = false;

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.medicamentoService.listar().subscribe({
      next: lista => {
        this.medicamentos = lista;
        this.paginaAtual  = 1;
        this.carregando   = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar medicamentos. Verifique se a API está rodando.';
        this.carregando = false;
      }
    });
  }

  get medicamentosFiltrados(): Medicamento[] {
    if (!this.busca.trim()) return this.medicamentos;
    const t = this.busca.toLowerCase();
    return this.medicamentos.filter(m =>
      m.nome.toLowerCase().includes(t) ||
      (m.descricao ?? '').toLowerCase().includes(t)
    );
  }

  get paginado(): Medicamento[] {
    const ini = (this.paginaAtual - 1) * this.itensPagina;
    return this.medicamentosFiltrados.slice(ini, ini + this.itensPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.medicamentosFiltrados.length / this.itensPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  abrirExcluir(m: Medicamento): void {
    this.medicamentoSelecionado = m;
    this.modalExcluir = true;
  }

  confirmarExcluir(): void {
    if (!this.medicamentoSelecionado) return;
    this.excluindo = true;
    this.medicamentoService.excluir(this.medicamentoSelecionado.id).subscribe({
      next: () => {
        this.excluindo              = false;
        this.modalExcluir           = false;
        this.medicamentoSelecionado = null;
        this.carregar();
      },
      error: () => {
        this.erro       = 'Erro ao excluir medicamento. Verifique se há receitas vinculadas.';
        this.excluindo  = false;
        this.modalExcluir = false;
      }
    });
  }
}
