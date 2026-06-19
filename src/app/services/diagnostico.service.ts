import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Diagnostico, DiagnosticoRequest } from '../models/diagnostico.model';

@Injectable({ providedIn: 'root' })
export class DiagnosticoService extends ApiService {

  private readonly PATH = '/diagnostico';

  listar(): Observable<Diagnostico[]> {
    return this.get<Diagnostico[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<Diagnostico> {
    return this.get<Diagnostico>(`${this.PATH}/${id}`);
  }

  buscarPorAtendimento(idAtendimento: number): Observable<Diagnostico[]> {
    return this.get<Diagnostico[]>(`${this.PATH}/atendimento/${idAtendimento}`);
  }

  criar(req: DiagnosticoRequest): Observable<Diagnostico> {
    return this.post<Diagnostico>(this.PATH, req);
  }

  atualizar(id: number, req: DiagnosticoRequest): Observable<Diagnostico> {
    return this.put<Diagnostico>(`${this.PATH}/${id}`, req);
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
