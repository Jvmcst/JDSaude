import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AtendimentoService } from '../../../services/atendimento.service';
import { Atendimento } from '../../../models/atendimento.model';
import { StatusBadgeComponent } from '../../../components/status-badge/status-badge.component';
import { DateBrPipe } from '../../../pipes/date-br.pipe';

const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const iso     = (d: Date) => d.toISOString().split('T')[0];

interface DiaCalendario {
  data: Date;
  dataStr: string;
  hoje: boolean;
  atendimentos: Atendimento[];
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, StatusBadgeComponent, DateBrPipe],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  semanaAtual!: Date;
  dias: DiaCalendario[] = [];
  atendimentos: Atendimento[] = [];
  carregando = true;
  erro       = '';

  readonly DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  atendimentoSelecionado: Atendimento | null = null;

  constructor(private atendimentoService: AtendimentoService) {}

  ngOnInit(): void {
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    const dow  = hoje.getDay();
    this.semanaAtual = addDays(hoje, dow === 0 ? -6 : 1 - dow);
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.atendimentoService.listar().subscribe({
      next: lista => {
        this.atendimentos = lista;
        this.gerarDias();
        this.carregando = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar atendimentos. Verifique se a API está rodando.';
        this.carregando = false;
      }
    });
  }

  gerarDias(): void {
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    this.dias = Array.from({ length: 7 }, (_, i) => {
      const data    = addDays(this.semanaAtual, i);
      const dataStr = iso(data);
      return {
        data,
        dataStr,
        hoje: data.getTime() === hoje.getTime(),
        atendimentos: this.atendimentos
          .filter(a => a.dataRealizacao === dataStr)
          .sort((a, b) => a.dataRealizacao.localeCompare(b.dataRealizacao))
      };
    });
  }

  semanaAnterior(): void { this.semanaAtual = addDays(this.semanaAtual, -7); this.carregar(); }
  proximaSemana():  void { this.semanaAtual = addDays(this.semanaAtual,  7); this.carregar(); }
  irHoje():         void { this.ngOnInit(); }

  get labelSemana(): string {
    const fim  = addDays(this.semanaAtual, 6);
    const opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
    return `${this.semanaAtual.toLocaleDateString('pt-BR', opts)} – ${fim.toLocaleDateString('pt-BR', opts)} ${fim.getFullYear()}`;
  }

  selecionar(a: Atendimento, ev: Event): void {
    ev.stopPropagation();
    this.atendimentoSelecionado = this.atendimentoSelecionado?.id === a.id ? null : a;
  }

  fecharPopup(): void { this.atendimentoSelecionado = null; }

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
