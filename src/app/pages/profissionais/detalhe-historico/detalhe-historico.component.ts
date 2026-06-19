import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PessoaService } from '../../../services/pessoa.service';
import { AtendimentoService } from '../../../services/atendimento.service';
import { Pessoa } from '../../../models/pessoa.model';
import { Atendimento } from '../../../models/atendimento.model';
import { DateBrPipe } from '../../../pipes/date-br.pipe';
import { StatusBadgeComponent } from '../../../components/status-badge/status-badge.component';

@Component({
  selector: 'app-detalhe-historico',
  standalone: true,
  imports: [CommonModule, RouterLink, DateBrPipe, StatusBadgeComponent],
  templateUrl: './detalhe-historico.component.html',
  styleUrls: ['./detalhe-historico.component.scss']
})
export class DetalheHistoricoComponent implements OnInit {

  profissional: Pessoa | null   = null;
  atendimento: Atendimento | null = null;
  carregando = true;
  erro       = '';

  profissionalId!: number;

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private atendimentoService: AtendimentoService
  ) {}

  ngOnInit(): void {
    this.profissionalId  = Number(this.route.snapshot.paramMap.get('profId'));
    const atendimentoId  = Number(this.route.snapshot.paramMap.get('consultaId'));

    forkJoin({
      profissional: this.pessoaService.buscarPorId(this.profissionalId),
      atendimento:  this.atendimentoService.buscarPorId(atendimentoId),
    }).subscribe({
      next: ({ profissional, atendimento }) => {
        this.profissional = profissional;
        this.atendimento  = atendimento;
        this.carregando   = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar dados. Verifique se a API está rodando.';
        this.carregando = false;
      }
    });
  }

  iniciais(nome: string): string {
    return nome.split(' ').slice(0, 2).map(n => n[0]).join('');
  }

  labelSituacao(s: string): string {
    const map: Record<string, string> = {
      AGENDADO: 'Agendado', EM_ANDAMENTO: 'Em andamento',
      CONCLUIDO: 'Concluído', CANCELADO: 'Cancelado'
    };
    return map[s] ?? s;
  }
}
