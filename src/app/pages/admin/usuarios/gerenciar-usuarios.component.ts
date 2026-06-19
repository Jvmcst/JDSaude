import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../../services/pessoa.service';
import { Pessoa } from '../../../models/pessoa.model';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { CpfMaskPipe } from '../../../pipes/cpf-mask.pipe';

@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ConfirmModalComponent, CpfMaskPipe],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.scss']
})
export class GerenciarUsuariosComponent implements OnInit {
  pessoas: Pessoa[] = [];
  carregando = true;
  erro       = '';
  busca      = '';

  paginaAtual      = 1;
  readonly itensPagina = 10;

  modalExcluir        = false;
  pessoaSelecionada: Pessoa | null = null;
  excluindo           = false;

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.pessoaService.listar().subscribe({
      next: lista => { this.pessoas = lista; this.paginaAtual = 1; this.carregando = false; },
      error: () => { this.erro = 'Erro ao carregar. Verifique se a API está rodando.'; this.carregando = false; }
    });
  }

  get pessoasFiltradas(): Pessoa[] {
    if (!this.busca.trim()) return this.pessoas;
    const t = this.busca.toLowerCase();
    return this.pessoas.filter(p =>
      p.nome.toLowerCase().includes(t) ||
      p.cpf.includes(t) ||
      p.email.toLowerCase().includes(t)
    );
  }

  get paginado(): Pessoa[] {
    const ini = (this.paginaAtual - 1) * this.itensPagina;
    return this.pessoasFiltradas.slice(ini, ini + this.itensPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.pessoasFiltradas.length / this.itensPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  abrirExcluir(p: Pessoa): void {
    this.pessoaSelecionada = p;
    this.modalExcluir = true;
  }

  confirmarExcluir(): void {
    if (!this.pessoaSelecionada) return;
    this.excluindo = true;
    this.pessoaService.excluir(this.pessoaSelecionada.id).subscribe({
      next: () => {
        this.excluindo        = false;
        this.modalExcluir     = false;
        this.pessoaSelecionada = null;
        this.carregar();
      },
      error: () => {
        this.erro      = 'Erro ao excluir. Pode haver atendimentos vinculados.';
        this.excluindo = false;
        this.modalExcluir = false;
      }
    });
  }
}
