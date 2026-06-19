import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DadosGlobais {
  totalConsultas: number;
  totalPacientes: number;
  totalProfissionais: number;
  totalUsuarios: number;
  consultasHoje: number;
  consultasSemana: number;
  consultasMes: number;
  taxaConclusao: number;
}

export interface ConsultasPorDia {
  dia: string;
  total: number;
  concluidas: number;
  canceladas: number;
}

export interface ConsultasPorEspecialidade {
  especialidade: string;
  total: number;
  percentual: number;
}

export interface RelatorioSemanal {
  semana: string;
  profissionalNome: string;
  profissionalEspecialidade: string;
  totalConsultas: number;
  concluidas: number;
  canceladas: number;
  faltasHoras: number;
  escalasCumpridas: number;
  escalasTotal: number;
}

export interface AgendaPesquisa {
  profissionalId: number;
  profissionalNome: string;
  especialidade: string;
  tipo: string;
  escalasProximas: number;
  proximaData: string;
  proximoTurno: string;
}

@Injectable({ providedIn: 'root' })
export class RelatorioService {

  private readonly API = '/api/relatorios';

  constructor(private http: HttpClient) {}

  dadosGlobais(): Observable<DadosGlobais> {
    return this.http.get<DadosGlobais>(`${this.API}/globais`);
  }

  consultasPorDia(dias: number): Observable<ConsultasPorDia[]> {
    return this.http.get<ConsultasPorDia[]>(`${this.API}/consultas-dia`, {
      params: new HttpParams().set('dias', dias)
    });
  }

  consultasPorEspecialidade(): Observable<ConsultasPorEspecialidade[]> {
    return this.http.get<ConsultasPorEspecialidade[]>(`${this.API}/especialidades`);
  }

  relatorioSemanal(semana: string): Observable<RelatorioSemanal[]> {
    return this.http.get<RelatorioSemanal[]>(`${this.API}/semanal`, {
      params: new HttpParams().set('semana', semana)
    });
  }

  agendaPesquisa(): Observable<AgendaPesquisa[]> {
    return this.http.get<AgendaPesquisa[]>(`${this.API}/agenda-pesquisa`);
  }

  // Mocks enquanto to sem a api real 

  mockDadosGlobais(): DadosGlobais {
    return {
      totalConsultas: 342,
      totalPacientes: 187,
      totalProfissionais: 7,
      totalUsuarios: 10,
      consultasHoje: 8,
      consultasSemana: 38,
      consultasMes: 162,
      taxaConclusao: 87.5,
    };
  }

  mockConsultasPorDia(): ConsultasPorDia[] {
    const dias    = ['01/06','02/06','03/06','04/06','05/06','06/06','07/06','08/06','09/06','10/06','11/06','12/06','13/06','14/06'];
    const totais  = [6, 9, 7, 11, 8, 5, 0, 10, 12, 9, 8, 11, 7, 8];
    const conc    = [5, 8, 7, 10, 7, 4, 0,  9, 11, 8, 7, 10, 6, 7];
    const canc    = [1, 1, 0,  1, 1, 1, 0,  1,  1, 1, 1,  1, 1, 1];
    return dias.map((d, i) => ({ dia: d, total: totais[i], concluidas: conc[i], canceladas: canc[i] }));
  }

  mockConsultasPorEspecialidade(): ConsultasPorEspecialidade[] {
    return [
      { especialidade: 'Clínico Geral', total: 98, percentual: 28.7 },
      { especialidade: 'Cardiologia',   total: 74, percentual: 21.6 },
      { especialidade: 'Ortopedia',     total: 61, percentual: 17.8 },
      { especialidade: 'Pediatria',     total: 55, percentual: 16.1 },
      { especialidade: 'Dermatologia',  total: 34, percentual: 9.9  },
      { especialidade: 'Outros',        total: 20, percentual: 5.9  },
    ];
  }

  mockRelatorioSemanal(): RelatorioSemanal[] {
    return [
      { semana: '02/06–08/06', profissionalNome: 'Dr. Carlos Lima',     profissionalEspecialidade: 'Clínico Geral', totalConsultas: 18, concluidas: 16, canceladas: 2, faltasHoras: 0, escalasCumpridas: 5, escalasTotal: 5 },
      { semana: '02/06–08/06', profissionalNome: 'Dra. Ana Souza',      profissionalEspecialidade: 'Cardiologia',   totalConsultas: 14, concluidas: 13, canceladas: 1, faltasHoras: 0, escalasCumpridas: 4, escalasTotal: 5 },
      { semana: '02/06–08/06', profissionalNome: 'Dr. Marcos Reis',     profissionalEspecialidade: 'Ortopedia',     totalConsultas: 12, concluidas: 11, canceladas: 1, faltasHoras: 2, escalasCumpridas: 4, escalasTotal: 5 },
      { semana: '02/06–08/06', profissionalNome: 'Dr. Paulo Neves',     profissionalEspecialidade: 'Pediatria',     totalConsultas: 10, concluidas:  9, canceladas: 1, faltasHoras: 0, escalasCumpridas: 5, escalasTotal: 5 },
      { semana: '02/06–08/06', profissionalNome: 'Dra. Juliana Melo',   profissionalEspecialidade: 'Dermatologia',  totalConsultas:  8, concluidas:  7, canceladas: 1, faltasHoras: 1, escalasCumpridas: 3, escalasTotal: 4 },
      { semana: '02/06–08/06', profissionalNome: 'Enf. Roberto Silva',  profissionalEspecialidade: 'Enf. Geral',    totalConsultas:  0, concluidas:  0, canceladas: 0, faltasHoras: 0, escalasCumpridas: 6, escalasTotal: 6 },
      { semana: '02/06–08/06', profissionalNome: 'Enf. Fernanda Alves', profissionalEspecialidade: 'UTI',           totalConsultas:  0, concluidas:  0, canceladas: 0, faltasHoras: 3, escalasCumpridas: 4, escalasTotal: 5 },
    ];
  }

  mockAgendaPesquisa(): AgendaPesquisa[] {
    const hoje = new Date();
    const fmt  = (d: Date) => d.toLocaleDateString('pt-BR');
    const add  = (n: number) => { const d = new Date(hoje); d.setDate(d.getDate() + n); return fmt(d); };
    return [
      { profissionalId: 1, profissionalNome: 'Dr. Carlos Lima',     especialidade: 'Clínico Geral', tipo: 'medico',     escalasProximas: 5, proximaData: add(1), proximoTurno: 'Manhã (07h–13h)'       },
      { profissionalId: 2, profissionalNome: 'Dra. Ana Souza',      especialidade: 'Cardiologia',   tipo: 'medico',     escalasProximas: 4, proximaData: add(2), proximoTurno: 'Tarde (13h–19h)'       },
      { profissionalId: 3, profissionalNome: 'Dr. Marcos Reis',     especialidade: 'Ortopedia',     tipo: 'medico',     escalasProximas: 3, proximaData: add(4), proximoTurno: 'Manhã (07h–13h)'       },
      { profissionalId: 4, profissionalNome: 'Dr. Paulo Neves',     especialidade: 'Pediatria',     tipo: 'medico',     escalasProximas: 5, proximaData: add(1), proximoTurno: 'Manhã (07h–13h)'       },
      { profissionalId: 5, profissionalNome: 'Dra. Juliana Melo',   especialidade: 'Dermatologia',  tipo: 'medico',     escalasProximas: 2, proximaData: add(3), proximoTurno: 'Tarde (13h–19h)'       },
      { profissionalId: 6, profissionalNome: 'Enf. Roberto Silva',  especialidade: 'Enf. Geral',    tipo: 'enfermeiro', escalasProximas: 6, proximaData: add(0), proximoTurno: 'Plantão 12h (07h–19h)' },
      { profissionalId: 7, profissionalNome: 'Enf. Fernanda Alves', especialidade: 'UTI',           tipo: 'enfermeiro', escalasProximas: 4, proximaData: add(2), proximoTurno: 'Noite (19h–07h)'       },
    ];
  }
}
