import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  carregando   = false;
  erro         = '';
  mostrarSenha = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.estaAutenticado()) {
      this.router.navigate([this.auth.rotaPorPerfil()]);
    }
  }

  entrar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.carregando = true;
    this.erro = '';

    const { login, senha } = this.form.value;

    this.auth.login(login, senha).subscribe({
      next: () => {
        this.carregando = false;
        this.router.navigate([this.auth.rotaPorPerfil()]);
      },
      error: () => {
        this.erro       = 'Login ou senha inválidos.';
        this.carregando = false;
      }
    });
  }

  get loginCtrl() { return this.form.get('login')!; }
  get senha()     { return this.form.get('senha')!; }
  toggleSenha(): void { this.mostrarSenha = !this.mostrarSenha; }
}
