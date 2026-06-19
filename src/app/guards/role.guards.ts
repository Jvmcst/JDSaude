import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

function criarGuardPerfil(perfis: string[]): CanActivateFn {
  return () => {
    const auth   = inject(AuthService);
    const router = inject(Router);

    if (!auth.estaAutenticado()) {
      router.navigate(['/login']);
      return false;
    }

    if (auth.temPerfil(perfis)) return true;

    router.navigate([auth.rotaPorPerfil()]);
    return false;
  };
}

export const secretarioGuard:      CanActivateFn = criarGuardPerfil(['secretario']);
export const servidorGuard:        CanActivateFn = criarGuardPerfil(['servidor']);
export const adminGuard:           CanActivateFn = criarGuardPerfil(['administrador']);
export const secretarioAdminGuard: CanActivateFn = criarGuardPerfil(['secretario', 'administrador']);
