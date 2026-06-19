import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PessoaService } from '../../../services/pessoa.service';
import { AtendimentoService } from '../../../services/atendimento.service';
import { Pessoa } from '../../../models/pessoa.model';
import { AtendimentoRequest } from '../../../models/atendimento.model';

interface DiaCalendario {
  data: Date;
  diaNum: number;
  mesAtual: boolean;
  hoje: boolean;
  selecionado: boolean;
  passado: boolean;
}

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {

  form: FormGroup = new FormGroup({
    idPessoaPaciente:     new FormControl('', Validators.required),
    idPessoaProfissional: new FormControl('', Validators.required),
    dataRealizacao:       new FormControl('', Validators.required),
  });

  carregando        = false;
  carregandoPessoas = true;
  sucesso           = false;
  erro              = '';

  pessoas: Pessoa[] = [];

  // calendario
  mesAtual!: Date;
  diasCalendario: DiaCalendario[] = [];
  dataSelecionada: Date | null = null;
  diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  constructor(
    private pessoaService: PessoaService,
    private atendimentoService: AtendimentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mesAtual = new Date();
    this.mesAtual.setDate(1);
    this.gerarCalendario();

    this.pessoaService.listar().subscribe({
      next: lista => {
        this.pessoas          = lista;
        this.carregandoPessoas = false;
      },
      error: () => {
        this.erro              = 'Erro ao carregar lista de pessoas da API.';
        this.carregandoPessoas = false;
      }
    });
  }

    //gerar Calendario 
  gerarCalendario(): void {
    const ano  = this.mesAtual.getFullYear();
    const mes  = this.mesAtual.getMonth();
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia   = new Date(ano, mes + 1, 0).getDate();
    const dias: DiaCalendario[] = [];

    for (let i = primeiroDia - 1; i >= 0; i--) {
      dias.push(this.criarDia(new Date(ano, mes, -i), false, hoje));
    }
    for (let i = 1; i <= ultimoDia; i++) {
      dias.push(this.criarDia(new Date(ano, mes, i), true, hoje));
    }
    while (dias.length % 7 !== 0) {
      const d = new Date(ano, mes + 1, dias.length - ultimoDia - primeiroDia + 1);
      dias.push(this.criarDia(d, false, hoje));
    }
    this.diasCalendario = dias;
  }

  private criarDia(data: Date, mesAtual: boolean, hoje: Date): DiaCalendario {
    const d = new Date(data); d.setHours(0, 0, 0, 0);
    return {
      data, diaNum: data.getDate(), mesAtual,
      hoje:      d.getTime() === hoje.getTime(),
      passado:   d < hoje,
      selecionado: this.dataSelecionada
        ? d.getTime() === new Date(this.dataSelecionada).setHours(0, 0, 0, 0)
        : false
    };
  }

  mesAnterior(): void {
    this.mesAtual = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() - 1, 1);
    this.gerarCalendario();
  }

  proximoMes(): void {
    this.mesAtual = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() + 1, 1);
    this.gerarCalendario();
  }

  selecionarDia(dia: DiaCalendario): void {
    if (dia.passado || !dia.mesAtual) return;
    this.dataSelecionada = dia.data;
    const iso = dia.data.toISOString().split('T')[0];
    this.form.patchValue({ dataRealizacao: iso });
    this.gerarCalendario();
  }

  get mesLabel(): string {
    return this.mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  // Submit
  agendar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const hoje = new Date().toISOString().split('T')[0];
    const req: AtendimentoRequest = {
      dataRegistro:         hoje,
      dataRealizacao:       this.form.value.dataRealizacao,
      situacao:             'AGENDADO',
      idPessoaPaciente:     Number(this.form.value.idPessoaPaciente),
      idPessoaProfissional: Number(this.form.value.idPessoaProfissional),
    };

    this.carregando = true;
    this.erro = '';

    this.atendimentoService.criar(req).subscribe({
      next: () => {
        this.carregando = false;
        this.sucesso    = true;
        setTimeout(() => this.router.navigate(['/secretario/home']), 1800);
      },
      error: (err: any) => {
        this.erro       = err?.error?.message ?? 'Erro ao agendar. Tente novamente.';
        this.carregando = false;
      }
    });
  }

  get pacienteCtrl()     { return this.form.get('idPessoaPaciente')!; }
  get profissionalCtrl() { return this.form.get('idPessoaProfissional')!; }
  get dataCtrl()         { return this.form.get('dataRealizacao')!; }
}
