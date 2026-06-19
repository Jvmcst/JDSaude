export type TurnoEscala = 'manha' | 'tarde' | 'noite' | 'plantao_12' | 'plantao_24';

export interface Escala {
  id: number;
  profissionalId: number;
  profissionalNome: string;
  profissionalEspecialidade: string;
  tipo: string;            // 'medico' | 'enfermeiro' 
  data: string;            // YYYY-MM-DD
  turno: TurnoEscala;
  horaInicio: string;
  horaFim: string;
  sala?: string;
  observacao?: string;
}

export interface EventoCalendario {
  id: number;
  titulo: string;
  data: string;            // YYYY-MM-DD
  horaInicio: string;
  horaFim: string;
  tipo: 'consulta' | 'escala' | 'bloqueio';
  profissionalId?: number;
  profissionalNome?: string;
  especialidade?: string;
  pacienteNome?: string;
  status?: string;
  cor: string;
}

export interface SemanaCalendario {
  inicio: Date;
  fim: Date;
  dias: DiaCalendarioSemana[];
}

export interface DiaCalendarioSemana {
  data: Date;
  dataStr: string;     // YYYY-MM-DD
  hoje: boolean;
  eventos: EventoCalendario[];
}
