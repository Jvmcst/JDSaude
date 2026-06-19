import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Pessoa, PessoaRequest } from '../models/pessoa.model';

@Injectable({ providedIn: 'root' })
export class PacienteService extends ApiService {

  private readonly PATH = '/pessoa';

  listar(): Observable<Pessoa[]> {
    return this.get<Pessoa[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<Pessoa> {
    return this.get<Pessoa>(`${this.PATH}/${id}`);
  }

  criar(req: PessoaRequest): Observable<Pessoa> {
    return this.post<Pessoa>(this.PATH, req);
  }

  atualizar(id: number, req: PessoaRequest): Observable<Pessoa> {
    return this.put<Pessoa>(`${this.PATH}/${id}`, req);
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
