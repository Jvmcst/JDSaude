import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../../services/pessoa.service';
import { Pessoa, PessoaRequest } from '../../../models/pessoa.model';
import { PacienteFormComponent } from '../paciente-form/paciente-form.component';

@Component({
  selector: 'app-editar-paciente',
  standalone: true,
  imports: [CommonModule, RouterLink, PacienteFormComponent],
  template: `
<div class="page-wrapper">
  <header class="page-header">
    <a routerLink="/pacientes" class="btn-voltar">
      <i class="bi bi-arrow-left me-2"></i>Voltar
    </a>
    <div>
      <h1 class="page-titulo">Editar Paciente</h1>
      <p class="page-sub" *ngIf="pessoa">{{ pessoa.nome }}</p>
    </div>
  </header>

  <div class="loading-state" *ngIf="buscando">
    <span class="spinner-border spinner-border-sm me-2" style="color:#5ADB94"></span>
    Carregando dados...
  </div>

  <div class="alert-nao-encontrado" *ngIf="!buscando && !pessoa">
    <i class="bi bi-exclamation-triangle me-2"></i>
    Paciente não encontrado. <a routerLink="/pacientes">Voltar à lista</a>
  </div>

  <div class="alert-sucesso" *ngIf="sucesso">
    <i class="bi bi-check-circle-fill me-2"></i>Dados atualizados com sucesso!
  </div>
  <div class="alert-erro" *ngIf="erro">
    <i class="bi bi-exclamation-circle-fill me-2"></i>{{ erro }}
  </div>

  <app-paciente-form
    *ngIf="!buscando && pessoa"
    [paciente]="pessoa"
    [carregando]="carregando"
    (formSubmit)="salvar($event)"
    (cancelar)="router.navigate(['/pacientes'])"
  ></app-paciente-form>
</div>`,
  styleUrls: ['../cadastro/cadastro-paciente.component.scss']
})
export class EditarPacienteComponent implements OnInit {
  pessoa: Pessoa | null = null;
  buscando   = true;
  carregando = false;
  sucesso    = false;
  erro       = '';

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    public  router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pessoaService.buscarPorId(id).subscribe({
      next: p => {
        this.pessoa   = p;
        this.buscando = false;
      },
      error: () => {
        this.pessoa   = null;
        this.buscando = false;
      }
    });
  }

  salvar(req: PessoaRequest): void {
    if (!this.pessoa) return;
    this.carregando = true;
    this.erro = '';
    this.pessoaService.atualizar(this.pessoa.id, req).subscribe({
      next: () => {
        this.carregando = false;
        this.sucesso    = true;
        setTimeout(() => this.router.navigate(['/pacientes']), 1500);
      },
      error: err => {
        this.erro       = err?.error?.message ?? 'Erro ao atualizar. Tente novamente.';
        this.carregando = false;
      }
    });
  }
}
