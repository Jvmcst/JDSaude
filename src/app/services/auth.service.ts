import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioSessao {
  id: number;
  nome: string;
  perfil: 'secretario' | 'servidor' | 'administrador';
}

interface LoginRequest  { login: string; senha: string; }
interface LoginResponse { id: number; login: string; perfil: string; pessoaId: number; pessoaNome: string; }

const USUARIO_KEY = 'jd_usuario';

// Mapeio o enum da API para o perfil no usuario
const PERFIL_MAP: Record<string, UsuarioSessao['perfil']> = {
  ADMIN:      'administrador',
  SECRETARIO: 'secretario',
  SERVIDOR:   'servidor',
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  private usuarioSubject = new BehaviorSubject<UsuarioSessao | null>(this.carregarUsuario());
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // login com api com retorno do usuario e amarzeno a sessao no localStorage
  login(login: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/usuario/login`,
      { login, senha } as LoginRequest
    ).pipe(
      tap(res => {
        const sessao: UsuarioSessao = {
          id:    res.pessoaId,
          nome:  res.pessoaNome,
          perfil: PERFIL_MAP[res.perfil] ?? 'servidor',
        };
        localStorage.setItem(USUARIO_KEY, JSON.stringify(sessao));
        this.usuarioSubject.next(sessao);
      })
    );
  }

  entrar(usuario: UsuarioSessao): void {
    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  logout(): void {
    localStorage.removeItem(USUARIO_KEY);
    this.usuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  get usuarioAtual(): UsuarioSessao | null { return this.usuarioSubject.value; }
  get perfil(): string | null              { return this.usuarioAtual?.perfil ?? null; }
  estaAutenticado(): boolean               { return !!this.usuarioAtual; }
  temPerfil(perfis: string[]): boolean     { return !!this.perfil && perfis.includes(this.perfil); }

  rotaPorPerfil(): string {
    switch (this.perfil) {
      case 'secretario':    return '/secretario/home';
      case 'servidor':      return '/servidor/home';
      case 'administrador': return '/admin/home';
      default:              return '/login';
    }
  }

  private carregarUsuario(): UsuarioSessao | null {
    try {
      const raw = localStorage.getItem(USUARIO_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}
