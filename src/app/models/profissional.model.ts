import { StatusConsulta } from './consulta.model';

export type TipoProfissional = 'medico' | 'enfermeiro' | 'tecnico' | 'outro';

export interface Profissional {
  id: number;
  nome: string;
  crm?: string;              // madicos
  coren?: string;            // enfermeiros
  registro?: string;        
  especialidade: string;
  tipo: TipoProfissional;
  telefone?: string;
  email?: string;
  ativo: boolean;
  criadoEm?: string;
}

export interface HistoricoConsulta {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  pacienteCpf: string;
  pacienteIdade: number;
  profissionalId: number;
  profissionalNome: string;
  data: string;          // YYYY-MM-DD
  horario: string;       // HH:mm
  status: StatusConsulta;
  diagnostico?: string;
  prescricao?: string;
  observacoes?: string;
  retorno?: string;      // data de retorno recomendada
}

export interface ProfissionalFiltro {
  busca?: string;
  tipo?: TipoProfissional | '';
  especialidade?: string;
  ativo?: boolean;
}
