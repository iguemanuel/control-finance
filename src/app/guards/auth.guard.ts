// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredUserId = route.paramMap.get('userId'); // Exemplo: resgata o 'userId' da URL
    const userId = this.authService.getUserId(); // Resgata o ID do usuário autenticado

    if (this.authService.isAuthenticated() && userId === requiredUserId) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redireciona para login se não estiver autenticado ou se o ID não bater
      return false;
    }
  }
}
