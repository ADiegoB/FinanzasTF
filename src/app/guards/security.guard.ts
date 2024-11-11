import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router  } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {} // Corregido 'onstructor' a 'constructor'

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('Verificando acceso a:', state.url);
    if (this.authService.isLoggedIn()) {
      console.log('Acceso permitido');
      return true; // Permitir el acceso a la ruta
    } else {
      console.log('Acceso denegado, redirigiendo a login');
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false; // Bloquear el acceso
    }
  }
}
