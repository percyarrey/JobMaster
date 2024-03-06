import { inject, NgZone } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const ngzone = inject(NgZone);
  if (token) {
    const tokenExpirationDate = getTokenExpirationDate(token);
    const isTokenExpired =
      tokenExpirationDate && tokenExpirationDate < new Date();

    if (!isTokenExpired) {
      return true; // Allow access to the route
    } else if (decodeToken(token).authstatus === 'partial') {
      ngzone.run(() => {
        router.navigate(['auth/complete-registration']);
      });

      return false;
    }
  }
  // Redirect to login page
  ngzone.run(() => {
    router.navigate(['/auth/login']);
  });

  return false;

  function getTokenExpirationDate(token: string): Date | null {
    const tokenDecoded = decodeToken(token);

    if (tokenDecoded && tokenDecoded.exp) {
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(tokenDecoded.exp);
      return expirationDate;
    }

    return null;
  }

  function decodeToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
    }
  }
};
