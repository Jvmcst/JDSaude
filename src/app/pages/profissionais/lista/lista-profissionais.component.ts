import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../../services/pessoa.service';
import { Pessoa } from '../../../models/pessoa.model';
import { CpfMaskPipe } from '../../../pipes/cpf-mask.pipe';

@Component({
  selector: 'app-lista-profissionais',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CpfMaskPipe],
  templateUrl: './lista-profissionais.component.html',
  styleUrls: ['./lista-profissionais.component.scss']
})
export class ListaProfissionaisComponent implements OnInit {
  profissionais: Pessoa[] = [];
  carregando = true;
  erro       = '';
  busca      = '';

  paginaAtual      = 1;
  readonly itensPagina = 8;

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.pessoaService.listar().subscribe({
      next: lista => {
        this.profissionais = lista;
        this.paginaAtual   = 1;
        this.carregando    = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar profissionais. Verifique se a API está rodando.';
        this.carregando = false;
      }
    });
  }

  get profissionaisFiltrados(): Pessoa[] {
    if (!this.busca.trim()) return this.profissionais;
    const t = this.busca.toLowerCase();
    return this.profissionais.filter(p =>
      p.nome.toLowerCase().includes(t) ||
      p.cpf.includes(t) ||
      p.email.toLowerCase().includes(t)
    );
  }

  get paginado(): Pessoa[] {
    const ini = (this.paginaAtual - 1) * this.itensPagina;
    return this.profissionaisFiltrados.slice(ini, ini + this.itensPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.profissionaisFiltrados.length / this.itensPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  iniciais(nome: string): string {
    return nome.split(' ').slice(0, 2).map(n => n[0]).join('');
  }
}
