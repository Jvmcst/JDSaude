import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Atendimento, AtendimentoRequest } from '../models/atendimento.model';

@Injectable({ providedIn: 'root' })
export class AtendimentoService extends ApiService {

  private readonly PATH = '/atendimento';

  listar(): Observable<Atendimento[]> {
    return this.get<Atendimento[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<Atendimento> {
    return this.get<Atendimento>(`${this.PATH}/${id}`);
  }

  buscarPorPaciente(idPaciente: number): Observable<Atendimento[]> {
    return this.get<Atendimento[]>(`${this.PATH}/paciente/${idPaciente}`);
  }

  buscarPorProfissional(idProfissional: number): Observable<Atendimento[]> {
    return this.get<Atendimento[]>(`${this.PATH}/profissional/${idProfissional}`);
  }

  buscarPorDataRealizacao(data: string): Observable<Atendimento[]> {
    return this.get<Atendimento[]>(`${this.PATH}/realizadas`, { data });
  }

  criar(req: AtendimentoRequest): Observable<Atendimento> {
    return this.post<Atendimento>(this.PATH, req);
  }

  atualizar(id: number, req: AtendimentoRequest): Observable<Atendimento> {
    return this.put<Atendimento>(`${this.PATH}/${id}`, req);
  }

  cancelar(id: number, req: AtendimentoRequest): Observable<Atendimento> {
    return this.put<Atendimento>(`${this.PATH}/${id}`, { ...req, situacao: 'CANCELADO' });
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
