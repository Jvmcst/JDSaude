import { Atendimento } from './atendimento.model';
import { Pessoa } from './pessoa.model';

export interface Triagem {
  id: number;
  dataRegistro: string; 
  descricao: string;
  atendimento: Atendimento;
  pessoaProfissional: Pessoa;
}

export interface TriagemRequest {
  descricao: string;
  idAtendimento: number;
  idPessoaProfissional: number;
}
