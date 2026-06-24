import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormGroup, FormControl,
  Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService, UsuarioSessao } from '../../services/auth.service';
import { PessoaService } from '../../services/pessoa.service';
import { UsuarioService, UsuarioRequest } from '../../services/usuario.service';
import { PessoaRequest } from '../../models/pessoa.model';
import { OnlyNumbersDirective } from '../../directives/only-numbers.directive';
import { cpfValidator, formatarCpf } from '../../shared/cpf.utils';

function senhasIguais(ctrl: AbstractControl): ValidationErrors | null {
  const senha     = ctrl.get('senha')?.value;
  const confirmar = ctrl.get('confirmarSenha')?.value;
  return senha && confirmar && senha !== confirmar ? { senhasDivergentes: true } : null;
}

const PERFIL_API_MAP: Record<string, 'ADMIN' | 'SECRETARIO' | 'SERVIDOR'> = {
  administrador: 'ADMIN',
  secretario:    'SECRETARIO',
  servidor:      'SERVIDOR',
};

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, OnlyNumbersDirective],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  form: FormGroup = new FormGroup({
    nome:           new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf:            new FormControl('', [Validators.required, cpfValidator]),
    email:          new FormControl('', [Validators.required, Validators.email]),
    perfil:         new FormControl('', Validators.required),
    senha:          new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmarSenha: new FormControl('', Validators.required),
  }, { validators: senhasIguais });

  carregando   = false;
  erro         = '';
  mostrarSenha = false;
  mostrarConf  = false;

  perfis = [
    { valor: 'secretario',    label: 'Secretário(a)' },
    { valor: 'servidor',      label: 'Servidor(a)'   },
    { valor: 'administrador', label: 'Administrador' }
  ];

  constructor(
    private auth:           AuthService,
    private router:         Router,
    private pessoaService:  PessoaService,
    private usuarioService: UsuarioService
  ) {
    this.form.get('cpf')!.valueChanges.subscribe(v => {
      const fmt = formatarCpf(v ?? '');
      if (fmt !== v) this.form.get('cpf')!.setValue(fmt, { emitEvent: false });
    });
  }

  get nome()           { return this.form.get('nome')!; }
  get cpf()            { return this.form.get('cpf')!; }
  get email()          { return this.form.get('email')!; }
  get perfil()         { return this.form.get('perfil')!; }
  get senha()          { return this.form.get('senha')!; }
  get confirmarSenha() { return this.form.get('confirmarSenha')!; }

  cadastrar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.carregando = true;
    this.erro = '';

    const pessoaReq: PessoaRequest = {
      nome:  this.form.value.nome,
      cpf:   this.form.value.cpf,
      email: this.form.value.email,
    };

    this.pessoaService.criar(pessoaReq).subscribe({
      next: (pessoa) => {
        const usuarioReq: UsuarioRequest = {
          login:    this.form.value.email,
          senha:    this.form.value.senha,
          perfil:   PERFIL_API_MAP[this.form.value.perfil],
          pessoaId: pessoa.id,
        };

        this.usuarioService.criar(usuarioReq).subscribe({
          next: (usuario) => {
            const sessao: UsuarioSessao = {
              id:     usuario.pessoaId,
              nome:   pessoa.nome,
              perfil: this.form.value.perfil,
            };
            this.auth.entrar(sessao);
            this.carregando = false;
            this.router.navigate([this.auth.rotaPorPerfil()]);
          },
          error: (err) => {
            this.erro = err?.error?.message ?? 'Erro ao criar usuário. Tente novamente.';
            this.carregando = false;
          }
        });
      },
      error: (err) => {
        this.erro = err?.error?.message ?? 'Erro ao cadastrar pessoa. Verifique os dados.';
        this.carregando = false;
      }
    });
  }
}