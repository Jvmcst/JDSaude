
/*
 * Perfil de usuario do sistema
 * Uso em guards, pipes e condicionais de template
 */
export type UserRole = 'secretario' | 'servidor' | 'administrador';

/*
 * Resposta que vem da API
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

/*
 * Parametros da paginacao
 */
export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}

/*
 * Resposta
 */
export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
