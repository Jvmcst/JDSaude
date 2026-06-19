import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

// Estrutura que a API vai retornar pra mim quando eu fizer requisicoes relacionadas a escala
export interface EscalaAPI {
  id: number;
  data: string;           // YYYY-MM-DD
  horario: string;        // HH:mm:ss
  disponibilidade: 'DISPONIVEL' | 'INDISPONIVEL';
  pessoaProfissional: { id: number; nome: string; cpf: string; email: string };
}

export interface EscalaRequest {
  data: string;
  horario: string;
  disponibilidade: 'DISPONIVEL' | 'INDISPONIVEL';
  idPessoaProfissional: number;
}

@Injectable({ providedIn: 'root' })
export class EscalaService extends ApiService {

  private readonly PATH = '/escala';

  listar(): Observable<EscalaAPI[]> {
    return this.get<EscalaAPI[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<EscalaAPI> {
    return this.get<EscalaAPI>(`${this.PATH}/${id}`);
  }

  criar(req: EscalaRequest): Observable<EscalaAPI> {
    return this.post<EscalaAPI>(this.PATH, req);
  }

  atualizar(id: number, req: EscalaRequest): Observable<EscalaAPI> {
    return this.put<EscalaAPI>(`${this.PATH}/${id}`, req);
  }

  excluir(id: number): Observable<void> {
    return this.delete<void>(`${this.PATH}/${id}`);
  }
}
