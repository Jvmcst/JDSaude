import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Consulta, AgendamentoRequest, SlotHorario, StatusConsulta } from '../models/consulta.model';

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private readonly API = '/api/consultas';

  constructor(private http: HttpClient) {}

  // listar
  listarHoje(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.API}/hoje`);
  }

  listarPorData(data: string): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.API}`, {
      params: new HttpParams().set('data', data)
    });
  }

  listarPorProfissional(profissionalId: number, data: string): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.API}`, {
      params: new HttpParams()
        .set('profissionalId', profissionalId)
        .set('data', data)
    });
  }

  buscar(termo: string): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.API}/buscar`, {
      params: new HttpParams().set('q', termo)
    });
  }

  // crud
  agendar(req: AgendamentoRequest): Observable<Consulta> {
    return this.http.post<Consulta>(this.API, req);
  }

  cancelar(id: number, motivo?: string): Observable<void> {
    return this.http.patch<void>(`${this.API}/${id}/cancelar`, { motivo });
  }

  atualizarStatus(id: number, status: StatusConsulta): Observable<Consulta> {
    return this.http.patch<Consulta>(`${this.API}/${id}/status`, { status });
  }

  // disponibilidade
  slotsDisponiveis(profissionalId: number, data: string): Observable<SlotHorario[]> {
    return this.http.get<SlotHorario[]>(`${this.API}/slots`, {
      params: new HttpParams()
        .set('profissionalId', profissionalId)
        .set('data', data)
    });
  }

  // Mock enquanto nao tenho a api 
  mockConsultasHoje(): Consulta[] {
    const hoje = new Date().toISOString().split('T')[0];
    return [
      { id: 1, pacienteNome: 'Maria Oliveira',   pacienteCpf: '123.456.789-00', profissionalNome: 'Dr. Carlos Lima',    profissionalEspecialidade: 'Clínico Geral',   data: hoje, horario: '08:00', status: 'concluida',       sala: 'Sala 1' },
      { id: 2, pacienteNome: 'João Santos',       pacienteCpf: '987.654.321-00', profissionalNome: 'Dra. Ana Souza',     profissionalEspecialidade: 'Cardiologia',     data: hoje, horario: '08:30', status: 'em_atendimento',  sala: 'Sala 3' },
      { id: 3, pacienteNome: 'Pedro Alves',       pacienteCpf: '456.789.123-00', profissionalNome: 'Dr. Carlos Lima',    profissionalEspecialidade: 'Clínico Geral',   data: hoje, horario: '09:00', status: 'confirmada',      sala: 'Sala 1' },
      { id: 4, pacienteNome: 'Lucia Ferreira',    pacienteCpf: '321.654.987-00', profissionalNome: 'Dr. Marcos Reis',    profissionalEspecialidade: 'Ortopedia',       data: hoje, horario: '09:30', status: 'agendada',        sala: 'Sala 2' },
      { id: 5, pacienteNome: 'Ana Costa',         pacienteCpf: '789.123.456-00', profissionalNome: 'Dra. Ana Souza',     profissionalEspecialidade: 'Cardiologia',     data: hoje, horario: '10:00', status: 'agendada',        sala: 'Sala 3' },
      { id: 6, pacienteNome: 'Roberto Martins',   pacienteCpf: '654.321.098-00', profissionalNome: 'Dr. Paulo Neves',    profissionalEspecialidade: 'Pediatria',       data: hoje, horario: '10:30', status: 'cancelada',       sala: 'Sala 4' },
      { id: 7, pacienteNome: 'Fernanda Lima',     pacienteCpf: '111.222.333-00', profissionalNome: 'Dr. Carlos Lima',    profissionalEspecialidade: 'Clínico Geral',   data: hoje, horario: '11:00', status: 'agendada',        sala: 'Sala 1' },
      { id: 8, pacienteNome: 'Carlos Mendes',     pacienteCpf: '444.555.666-00', profissionalNome: 'Dr. Marcos Reis',    profissionalEspecialidade: 'Ortopedia',       data: hoje, horario: '14:00', status: 'agendada',        sala: 'Sala 2' },
    ];
  }

  mockSlots(): SlotHorario[] {
    const horarios = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'];
    return horarios.map((h, i) => ({ horario: h, disponivel: ![1,3,6].includes(i) }));
  }
}
