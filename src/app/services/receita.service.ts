import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Receita, ReceitaRequest } from '../models/receita.model';

@Injectable({ providedIn: 'root' })
export class ReceitaService extends ApiService {

  private readonly PATH = '/receita';

  listar(): Observable<Receita[]> {
    return this.get<Receita[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<Receita> {
    return this.get<Receita>(`${this.PATH}/${id}`);
  }

  buscarPorAtendimento(idAtendimento: number): Observable<Receita[]> {
    return this.get<Receita[]>(`${this.PATH}/atendimento/${idAtendimento}`);
  }

  buscarPorMedicamento(idMedicamento: number): Observable<Receita[]> {
    return this.get<Receita[]>(`${this.PATH}/medicamento/${idMedicamento}`);
  }

  criar(req: ReceitaRequest): Observable<Receita> {
    return this.post<Receita>(this.PATH, req);
  }

  atualizar(id: number, req: ReceitaRequest): Observable<Receita> {
    return this.put<Receita>(`${this.PATH}/${id}`, req);
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
