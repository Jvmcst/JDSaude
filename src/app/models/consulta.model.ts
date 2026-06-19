export type StatusConsulta =
  | 'agendada'
  | 'confirmada'
  | 'em_atendimento'
  | 'concluida'
  | 'cancelada'
  | 'falta';

export interface Consulta {
  id: number;
  pacienteNome: string;
  pacienteCpf: string;
  profissionalNome: string;
  profissionalEspecialidade: string;
  data: string;          
  horario: string;       
  status: StatusConsulta;
  sala?: string;
  observacao?: string;
  criadoEm?: string;
}

export interface AgendamentoRequest {
  pacienteId: number;
  profissionalId: number;
  data: string;
  horario: string;
  sala?: string;
  observacao?: string;
}

export interface SlotHorario {
  horario: string;   // HH:mm
  disponivel: boolean;
  consultaId?: number;
}
