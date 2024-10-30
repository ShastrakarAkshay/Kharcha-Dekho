import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.isLoggedIn().pipe(
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
    })
  );

  return true;
};
