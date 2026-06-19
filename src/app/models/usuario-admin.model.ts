import { PerfilUsuario } from './usuario.model';

export interface UsuarioAdmin {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
  criadoEm: string;
  ultimoAcesso?: string;
  telefone?: string;
  especialidade?: string;   // servidores
  crm?: string;             // medicos
  coren?: string;           // enfermeiros
}

export interface UsuarioEditRequest {
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  telefone?: string;
  especialidade?: string;
  crm?: string;
  coren?: string;
  novaSenha?: string;
}
