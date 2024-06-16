import { HttpInterceptorFn } from '@angular/common/http';
import { getCookie } from '../shared/utils/decodeCookie';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + getCookie('token')
    ),
  });
  return next(reqWithHeader);
};
