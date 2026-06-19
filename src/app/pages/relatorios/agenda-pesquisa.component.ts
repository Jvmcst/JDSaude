import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { AtendimentoService } from '../../services/atendimento.service';
import { Pessoa } from '../../models/pessoa.model';
import { Atendimento } from '../../models/atendimento.model';

interface CardProfissional {
  pessoa: Pessoa;
  totalAtendimentos: number;
  proximos: number;
  ultimaData: string | null;
}

@Component({
  selector: 'app-agenda-pesquisa',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './agenda-pesquisa.component.html',
  styleUrls: ['./agenda-pesquisa.component.scss']
})
export class AgendaPesquisaComponent implements OnInit {
  cards: CardProfissional[] = [];
  carregando = true;
  erro       = '';
  busca      = '';

  readonly Math = Math;

  constructor(
    private pessoaService: PessoaService,
    private atendimentoService: AtendimentoService
  ) {}

  ngOnInit(): void {
    const hoje = new Date().toISOString().split('T')[0];

    Promise.all([
      this.pessoaService.listar().toPromise(),
      this.atendimentoService.listar().toPromise(),
    ]).then(([pessoas, atendimentos]) => {
      const ps  = pessoas      ?? [];
      const ats = atendimentos ?? [];

      this.cards = ps.map(p => {
        const doProfissional = ats.filter(a => a.pessoaProfissional.id === p.id);
        const proximos = doProfissional.filter(
          a => a.dataRealizacao >= hoje && a.situacao !== 'CANCELADO'
        ).length;
        const datas = doProfissional.map(a => a.dataRealizacao).sort();
        return {
          pessoa:            p,
          totalAtendimentos: doProfissional.length,
          proximos,
          ultimaData:        datas[datas.length - 1] ?? null,
        };
      }).filter(c => c.totalAtendimentos > 0)
        .sort((a, b) => b.proximos - a.proximos);

      this.carregando = false;
    }).catch(() => {
      this.erro       = 'Erro ao carregar dados. Verifique se a API está rodando.';
      this.carregando = false;
    });
  }

  get cardsFiltrados(): CardProfissional[] {
    if (!this.busca.trim()) return this.cards;
    const t = this.busca.toLowerCase();
    return this.cards.filter(c =>
      c.pessoa.nome.toLowerCase().includes(t) ||
      c.pessoa.email.toLowerCase().includes(t)
    );
  }

  iniciais(nome: string): string {
    return nome.split(' ').slice(0, 2).map(n => n[0]).join('');
  }

  corProximos(n: number): string {
    if (n >= 5) return '#5ADB94';
    if (n >= 2) return '#dbb45a';
    return '#f08080';
  }

  formatarData(iso: string | null): string {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }
}
