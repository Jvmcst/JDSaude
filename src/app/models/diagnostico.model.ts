import { Atendimento } from './atendimento.model';

export interface Diagnostico {
  id: number;
  descricao: string;
  atendimento: Atendimento;
}

export interface DiagnosticoRequest {
  descricao: string;
  idAtendimento: number;
}
