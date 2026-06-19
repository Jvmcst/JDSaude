import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Triagem, TriagemRequest } from '../models/triagem.model';

@Injectable({ providedIn: 'root' })
export class TriagemService extends ApiService {

  private readonly PATH = '/triagem';

  listar(): Observable<Triagem[]> {
    return this.get<Triagem[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<Triagem> {
    return this.get<Triagem>(`${this.PATH}/${id}`);
  }

  buscarPorAtendimento(idAtendimento: number): Observable<Triagem[]> {
    return this.get<Triagem[]>(`${this.PATH}/atendimento/${idAtendimento}`);
  }

  buscarPorProfissional(idProfissional: number): Observable<Triagem[]> {
    return this.get<Triagem[]>(`${this.PATH}/profissional/${idProfissional}`);
  }

  criar(req: TriagemRequest): Observable<Triagem> {
    return this.post<Triagem>(this.PATH, req);
  }

  atualizar(id: number, req: TriagemRequest): Observable<Triagem> {
    return this.put<Triagem>(`${this.PATH}/${id}`, req);
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
