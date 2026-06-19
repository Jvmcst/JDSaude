import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Medicamento, MedicamentoRequest } from '../models/medicamento.model';

@Injectable({ providedIn: 'root' })
export class MedicamentoService extends ApiService {

  private readonly PATH = '/medicamento';

  listar(): Observable<Medicamento[]> {
    return this.get<Medicamento[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<Medicamento> {
    return this.get<Medicamento>(`${this.PATH}/${id}`);
  }

  buscarPorNome(nome: string): Observable<Medicamento[]> {
    return this.get<Medicamento[]>(`${this.PATH}/nome/${nome}`);
  }

  buscarPorDescricao(descricao: string): Observable<Medicamento[]> {
    return this.get<Medicamento[]>(`${this.PATH}/descricao/${descricao}`);
  }

  criar(req: MedicamentoRequest): Observable<Medicamento> {
    return this.post<Medicamento>(this.PATH, req);
  }

  atualizar(id: number, req: MedicamentoRequest): Observable<Medicamento> {
    return this.put<Medicamento>(`${this.PATH}/${id}`, req);
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
