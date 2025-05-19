import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { getCookie } from '../shared/utils/decodeCookie';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platform = inject(PLATFORM_ID);
  if (isPlatformBrowser(platform)) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + getCookie('token')),
    });
    return next(reqWithHeader);
  }
  return next(req);
};
