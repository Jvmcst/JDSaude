import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TriagemService } from '../../../services/triagem.service';
import { PessoaService } from '../../../services/pessoa.service';
import { AtendimentoService } from '../../../services/atendimento.service';
import { Triagem, TriagemRequest } from '../../../models/triagem.model';
import { Pessoa } from '../../../models/pessoa.model';
import { Atendimento } from '../../../models/atendimento.model';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { DateBrPipe } from '../../../pipes/date-br.pipe';

@Component({
  selector: 'app-escalas',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, ConfirmModalComponent, DateBrPipe],
  templateUrl: './escalas.component.html',
  styleUrls: ['./escalas.component.scss']
})
export class EscalasComponent implements OnInit {
  triagens: Triagem[]        = [];
  atendimentos: Atendimento[] = [];
  profissionais: Pessoa[]    = [];
  carregando                 = true;
  erro                       = '';
  exibirFormulario           = false;
  salvando                   = false;
  filtroProfId               = 0;

  form: FormGroup = new FormGroup({
    descricao:            new FormControl('', Validators.required),
    idAtendimento:        new FormControl('', Validators.required),
    idPessoaProfissional: new FormControl('', Validators.required),
  });

  modalExcluir               = false;
  triagemSelecionada: Triagem | null = null;
  excluindo                  = false;

  constructor(
    private triagemService: TriagemService,
    private pessoaService: PessoaService,
    private atendimentoService: AtendimentoService
  ) {}

  ngOnInit(): void {
    this.carregarPessoas();
    this.carregar();
  }

  carregarPessoas(): void {
    this.pessoaService.listar().subscribe({
      next: lista => { this.profissionais = lista; },
      error: () => {}
    });
    this.atendimentoService.listar().subscribe({
      next: lista => { this.atendimentos = lista; },
      error: () => {}
    });
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.triagemService.listar().subscribe({
      next: lista => {
        this.triagens = this.filtroProfId
          ? lista.filter(t => t.pessoaProfissional.id === +this.filtroProfId)
          : lista;
        this.carregando = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar triagens. Verifique se a API está rodando.';
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.salvando = true;

    const req: TriagemRequest = {
      descricao:            this.form.value.descricao,
      idAtendimento:        Number(this.form.value.idAtendimento),
      idPessoaProfissional: Number(this.form.value.idPessoaProfissional),
    };

    this.triagemService.criar(req).subscribe({
      next: () => {
        this.salvando         = false;
        this.exibirFormulario = false;
        this.form.reset();
        this.carregar();
      },
      error: (err: any) => {
        this.erro     = err?.error?.message ?? 'Erro ao salvar triagem.';
        this.salvando = false;
      }
    });
  }

  abrirExcluir(t: Triagem): void { this.triagemSelecionada = t; this.modalExcluir = true; }

  confirmarExcluir(): void {
    if (!this.triagemSelecionada) return;
    this.excluindo = true;
    this.triagemService.excluir(this.triagemSelecionada.id).subscribe({
      next: () => {
        this.excluindo          = false;
        this.modalExcluir       = false;
        this.triagemSelecionada = null;
        this.carregar();
      },
      error: () => {
        this.erro         = 'Erro ao excluir triagem.';
        this.excluindo    = false;
        this.modalExcluir = false;
      }
    });
  }

  get triagensPorData(): { data: string; items: Triagem[] }[] {
    const mapa = new Map<string, Triagem[]>();
    this.triagens.forEach(t => {
      const data = t.dataRegistro.split('T')[0];
      if (!mapa.has(data)) mapa.set(data, []);
      mapa.get(data)!.push(t);
    });
    return Array.from(mapa.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([data, items]) => ({ data, items }));
  }

  labelAtendimento(id: number): string {
    const a = this.atendimentos.find(x => x.id === id);
    return a ? `#${a.id} — ${a.pessoaPaciente.nome}` : `Atendimento #${id}`;
  }
}
