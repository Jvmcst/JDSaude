import { Pessoa } from './pessoa.model';

export type SituacaoAtendimento = 'AGENDADO' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';

export interface Atendimento {
  id: number;
  dataRegistro: string;   // YYYY-MM-DD
  dataRealizacao: string; // YYYY-MM-DD
  situacao: SituacaoAtendimento;
  pessoaPaciente: Pessoa;
  pessoaProfissional: Pessoa;
}

export interface AtendimentoRequest {
  dataRegistro: string;
  dataRealizacao: string;
  situacao: SituacaoAtendimento;
  idPessoaPaciente: number;
  idPessoaProfissional: number;
}
