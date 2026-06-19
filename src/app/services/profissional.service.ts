import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Pessoa } from '../models/pessoa.model';

@Injectable({ providedIn: 'root' })
export class ProfissionalService extends ApiService {

  private readonly PATH = '/pessoa';

  listar(): Observable<Pessoa[]> {
    return this.get<Pessoa[]>(this.PATH);
  }

  buscarPorId(id: number): Observable<Pessoa> {
    return this.get<Pessoa>(`${this.PATH}/${id}`);
  }
}
