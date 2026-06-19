import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormGroup, FormControl,
  Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService, UsuarioSessao } from '../../services/auth.service';

function senhasIguais(ctrl: AbstractControl): ValidationErrors | null {
  const senha    = ctrl.get('senha')?.value;
  const confirmar = ctrl.get('confirmarSenha')?.value;
  return senha && confirmar && senha !== confirmar ? { senhasDivergentes: true } : null;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  form: FormGroup = new FormGroup({
    nome:           new FormControl('', [Validators.required, Validators.minLength(3)]),
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
    private auth: AuthService,
    private router: Router
  ) {}

  get nome()           { return this.form.get('nome')!; }
  get email()          { return this.form.get('email')!; }
  get perfil()         { return this.form.get('perfil')!; }
  get senha()          { return this.form.get('senha')!; }
  get confirmarSenha() { return this.form.get('confirmarSenha')!; }

  cadastrar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const usuario: UsuarioSessao = {
      id:     Date.now(),
      nome:   this.form.value.nome,
      perfil: this.form.value.perfil,
    };
    this.auth.entrar(usuario);
    this.router.navigate([this.auth.rotaPorPerfil()]);
  }
}
