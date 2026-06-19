export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  email: string;
}

export interface PessoaRequest {
  nome: string;
  cpf: string;
  email: string;
}
