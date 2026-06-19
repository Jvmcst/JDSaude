export type Sexo = 'M' | 'F' | 'O';
export type TipoSanguineo = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;       // YYYY-MM-DD
  sexo: Sexo;
  telefone: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  uf?: string;
  tipoSanguineo?: TipoSanguineo;
  alergias?: string;
  observacoes?: string;
  ativo: boolean;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface PacienteRequest {
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: Sexo;
  telefone: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  uf?: string;
  tipoSanguineo?: TipoSanguineo;
  alergias?: string;
  observacoes?: string;
}

export interface PacienteFiltro {
  busca?: string;
  ativo?: boolean;
  pagina?: number;
  itensPorPagina?: number;
}
