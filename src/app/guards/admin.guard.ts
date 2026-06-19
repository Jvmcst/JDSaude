import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (!auth.estaAutenticado()) {
    router.navigate(['/login']);
    return false;
  }

  if (auth.perfil === 'administrador') return true;

  router.navigate([auth.rotaPorPerfil()]);
  return false;
};
