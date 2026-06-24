import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Pessoa, PessoaRequest } from '../models/pessoa.model';

@Injectable({ providedIn: 'root' })
export class PessoaService extends ApiService {

  private readonly PATH = '/pessoa';

  listar(): Observable<Pessoa[]> {
    return this.get<Pessoa[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<Pessoa> {
    return this.get<Pessoa>(`${this.PATH}/${id}`);
  }

  buscarPorCpf(cpf: string): Observable<Pessoa> {
    return this.get<Pessoa>(`${this.PATH}/cpf/${cpf}`);
  }

  buscarPorEmail(email: string): Observable<Pessoa> {
    return this.get<Pessoa>(`${this.PATH}/email/${email}`);
  }

  buscarPorNome(nome: string): Observable<Pessoa> {
    return this.get<Pessoa>(`${this.PATH}/nome/${nome}`);
  }

  criar(req: PessoaRequest): Observable<Pessoa> {
    return this.post<Pessoa>(this.PATH, req);
  }

  listarProfissionais(): Observable<Pessoa[]> {
    return this.get<Pessoa[]>(`${this.PATH}/profissionais`);
  }

  atualizar(id: number, req: PessoaRequest): Observable<Pessoa> {
    return this.put<Pessoa>(`${this.PATH}/${id}`, req);
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
