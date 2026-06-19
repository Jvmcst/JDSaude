import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AtendimentoService } from '../../services/atendimento.service';
import { PessoaService } from '../../services/pessoa.service';
import { Atendimento } from '../../models/atendimento.model';

declare const Chart: any;

interface KPIs {
  totalAtendimentos: number;
  totalPessoas: number;
  atendimentosHoje: number;
  concluidos: number;
  cancelados: number;
  taxaConclusao: string;
}

interface AtendPorDia { dia: string; total: number; concluidos: number; cancelados: number; }
interface AtendPorPaciente { nome: string; total: number; }

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartBarras')   chartBarrasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartDonut')    chartDonutRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartAgrupado') chartAgrupadoRef!: ElementRef<HTMLCanvasElement>;

  kpis: KPIs | null = null;
  atendPorDia: AtendPorDia[] = [];
  topPacientes: AtendPorPaciente[] = [];
  carregando = true;
  erro       = '';

  private charts: any[] = [];

  constructor(
    private atendimentoService: AtendimentoService,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    const hoje = new Date().toISOString().split('T')[0];

    Promise.all([
      this.atendimentoService.listar().toPromise(),
      this.pessoaService.listar().toPromise(),
    ]).then(([atendimentos, pessoas]) => {
      const ats = atendimentos ?? [];
      const ps  = pessoas ?? [];

      const concluidos = ats.filter(a => a.situacao === 'CONCLUIDO').length;
      const cancelados = ats.filter(a => a.situacao === 'CANCELADO').length;
      const taxa = ats.length > 0
        ? ((concluidos / ats.length) * 100).toFixed(1)
        : '0';

      this.kpis = {
        totalAtendimentos: ats.length,
        totalPessoas:      ps.length,
        atendimentosHoje:  ats.filter(a => a.dataRealizacao === hoje).length,
        concluidos,
        cancelados,
        taxaConclusao: taxa,
      };

      // ultimos 14 dias
      this.atendPorDia = this.calcularPorDia(ats, 14);

      // 5 pacientes com mais atendimentos
      const contagem = new Map<string, number>();
      ats.forEach(a => {
        const nome = a.pessoaPaciente.nome;
        contagem.set(nome, (contagem.get(nome) ?? 0) + 1);
      });
      this.topPacientes = Array.from(contagem.entries())
        .map(([nome, total]) => ({ nome, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

      this.carregando = false;
      setTimeout(() => this.renderizarGraficos(), 150);
    }).catch(() => {
      this.erro       = 'Erro ao carregar dados. Verifique se a API está rodando.';
      this.carregando = false;
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.charts.forEach(c => { try { c?.destroy(); } catch {} });
  }

  private calcularPorDia(ats: Atendimento[], dias: number): AtendPorDia[] {
    const resultado: AtendPorDia[] = [];
    for (let i = dias - 1; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      const doDia = ats.filter(a => a.dataRealizacao === iso);
      resultado.push({
        dia:       d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        total:     doDia.length,
        concluidos: doDia.filter(a => a.situacao === 'CONCLUIDO').length,
        cancelados: doDia.filter(a => a.situacao === 'CANCELADO').length,
      });
    }
    return resultado;
  }

  renderizarGraficos(): void {
    this.renderBarras();
    this.renderDonut();
    this.renderAgrupado();
  }

  private renderBarras(): void {
    if (!this.chartBarrasRef?.nativeElement) return;
    const ctx = this.chartBarrasRef.nativeElement.getContext('2d');
    if (!ctx) return;
    this.charts.push(new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.atendPorDia.map(d => d.dia),
        datasets: [{
          label: 'Atendimentos',
          data: this.atendPorDia.map(d => d.total),
          backgroundColor: 'rgba(90,219,148,0.6)',
          borderColor: '#5ADB94',
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(90,219,148,0.06)' }, ticks: { color: '#6b8f78', font: { size: 11 } } },
          y: { grid: { color: 'rgba(90,219,148,0.06)' }, ticks: { color: '#6b8f78', font: { size: 11 } }, beginAtZero: true }
        }
      }
    }));
  }

  private renderDonut(): void {
    if (!this.chartDonutRef?.nativeElement || !this.kpis) return;
    const ctx = this.chartDonutRef.nativeElement.getContext('2d');
    if (!ctx) return;
    this.charts.push(new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Concluídos', 'Cancelados', 'Agendados', 'Em andamento'],
        datasets: [{
          data: [
            this.kpis.concluidos,
            this.kpis.cancelados,
            this.kpis.totalAtendimentos - this.kpis.concluidos - this.kpis.cancelados,
            0
          ],
          backgroundColor: ['#5ADB94', '#f08080', '#5ab8db', '#dbb45a'],
          borderColor: '#0e1a14',
          borderWidth: 2,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '65%',
        plugins: {
          legend: { position: 'right', labels: { color: '#a8c8b8', font: { size: 11 }, padding: 10, usePointStyle: true } }
        }
      }
    }));
  }

  private renderAgrupado(): void {
    if (!this.chartAgrupadoRef?.nativeElement) return;
    const ctx = this.chartAgrupadoRef.nativeElement.getContext('2d');
    if (!ctx) return;
    this.charts.push(new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.atendPorDia.map(d => d.dia),
        datasets: [
          {
            label: 'Concluídos',
            data: this.atendPorDia.map(d => d.concluidos),
            backgroundColor: 'rgba(90,219,148,0.7)',
            borderColor: '#5ADB94', borderWidth: 1, borderRadius: 3,
          },
          {
            label: 'Cancelados',
            data: this.atendPorDia.map(d => d.cancelados),
            backgroundColor: 'rgba(240,128,128,0.6)',
            borderColor: '#f08080', borderWidth: 1, borderRadius: 3,
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#a8c8b8', font: { size: 11 }, usePointStyle: true } } },
        scales: {
          x: { grid: { color: 'rgba(90,219,148,0.06)' }, ticks: { color: '#6b8f78', font: { size: 11 } } },
          y: { grid: { color: 'rgba(90,219,148,0.06)' }, ticks: { color: '#6b8f78', font: { size: 11 } }, beginAtZero: true }
        }
      }
    }));
  }
}
