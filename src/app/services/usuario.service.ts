import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface UsuarioAPI {
  id: number;
  login: string;
  perfil: 'ADMIN' | 'SECRETARIO' | 'SERVIDOR';
  pessoaId: number;
  pessoaNome: string;
}

export interface UsuarioRequest {
  login: string;
  senha: string;
  perfil: 'ADMIN' | 'SECRETARIO' | 'SERVIDOR';
  pessoaId: number;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService extends ApiService {

  private readonly PATH = '/usuario';

  listar(): Observable<UsuarioAPI[]> {
    return this.get<UsuarioAPI[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<UsuarioAPI> {
    return this.get<UsuarioAPI>(`${this.PATH}/${id}`);
  }

  criar(req: UsuarioRequest): Observable<UsuarioAPI> {
    return this.post<UsuarioAPI>(this.PATH, req);
  }

  atualizar(id: number, req: UsuarioRequest): Observable<UsuarioAPI> {
    return this.put<UsuarioAPI>(`${this.PATH}/${id}`, req);
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
