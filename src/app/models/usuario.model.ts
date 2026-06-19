export type PerfilUsuario = 'secretario' | 'servidor' | 'administrador';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
  criadoEm?: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  perfil: PerfilUsuario;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}
