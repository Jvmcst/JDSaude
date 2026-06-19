import { Atendimento } from './atendimento.model';
import { Medicamento } from './medicamento.model';

export interface Receita {
  id: number;
  descricao: string;
  atendimento: Atendimento;
  medicamento: Medicamento;
}

export interface ReceitaRequest {
  descricao: string;
  idAtendimento: number;
  idMedicamento: number;
}
