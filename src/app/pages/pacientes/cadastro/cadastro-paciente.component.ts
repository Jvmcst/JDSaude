import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PessoaService } from '../../../services/pessoa.service';
import { PessoaRequest } from '../../../models/pessoa.model';
import { PacienteFormComponent } from '../paciente-form/paciente-form.component';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [CommonModule, RouterLink, PacienteFormComponent],
  template: `
<div class="page-wrapper">
  <header class="page-header">
    <a routerLink="/pacientes" class="btn-voltar">
      <i class="bi bi-arrow-left me-2"></i>Voltar
    </a>
    <div>
      <h1 class="page-titulo">Novo Paciente</h1>
      <p class="page-sub">Preencha os dados cadastrais</p>
    </div>
  </header>

  <div class="alert-sucesso" *ngIf="sucesso">
    <i class="bi bi-check-circle-fill me-2"></i>Paciente cadastrado com sucesso!
  </div>
  <div class="alert-erro" *ngIf="erro">
    <i class="bi bi-exclamation-circle-fill me-2"></i>{{ erro }}
  </div>

  <app-paciente-form
    [carregando]="carregando"
    (formSubmit)="salvar($event)"
    (cancelar)="router.navigate(['/pacientes'])"
  ></app-paciente-form>
</div>`,
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent {
  carregando = false;
  sucesso    = false;
  erro       = '';

  constructor(
    private pessoaService: PessoaService,
    public  router: Router
  ) {}

  salvar(req: PessoaRequest): void {
    this.carregando = true;
    this.erro = '';
    this.pessoaService.criar(req).subscribe({
      next: () => {
        this.carregando = false;
        this.sucesso    = true;
        setTimeout(() => this.router.navigate(['/pacientes']), 1500);
      },
      error: err => {
        this.erro       = err?.error?.message ?? 'Erro ao cadastrar. Verifique os dados e tente novamente.';
        this.carregando = false;
      }
    });
  }
}
