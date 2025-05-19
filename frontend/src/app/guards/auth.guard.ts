import { isPlatformBrowser } from '@angular/common';
import { inject, NgZone, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCookie } from '../shared/utils/decodeCookie';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const ngZone = inject(NgZone);
  const platform = inject(PLATFORM_ID);

  if (isPlatformBrowser(platform)) {
    const token = getCookie('token');

    if (token) {
      const tokenExpirationDate = getTokenExpirationDate(token);
      const isTokenExpired =
        tokenExpirationDate && tokenExpirationDate < new Date();

      const decoded = decodeToken(token);

      if (decoded?.authstatus === 'full' && !isTokenExpired) {
        return true;
      } else if (decoded?.authstatus === 'partial') {
        ngZone.run(() => {
          router.navigate(['auth/complete-registration']);
        });
        return false;
      } else if (!isRoute(router.url, '/')) {
        ngZone.run(() => {
          router.navigate(['/auth/login']);
        });
        return false;
      }
    }
  }

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
      console.error(error);
      localStorage.removeItem('token');
      return null;
    }
  }

  function isRoute(currentUrl: string, route: string | string[]): boolean {
    const routes = Array.isArray(route) ? route : [route];
    return routes.some((el) =>
      el === '' ? currentUrl === '/' : currentUrl.startsWith('/' + el)
    );
  }
};
