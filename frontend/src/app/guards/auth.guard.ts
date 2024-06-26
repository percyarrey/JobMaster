import { inject, NgZone } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const ngZone = inject(NgZone);
  const store = inject(Store);
  return store.select('user').pipe(
    map((user) => {
      if (route.parent?.url[0]?.path && route.parent?.url[0]?.path === 'employer') {
        
        if (user && user.accounttype === 'employer') {
          if(!localStorage.getItem('getStarted') || localStorage.getItem('getStarted')!=='3'){
            return true;
          }else{
            ngZone.run(() => {
              router.navigate(['/']);
            });
            return false;
          }
          
        } else {
          ngZone.run(() => {
            router.navigate(['/']);
          });
          return false;
        }
      } else if (user) {
        if (route.routeConfig?.path === 'auth') {
          ngZone.run(() => {
            router.navigate(['/']);
          });
          return false;
        } else if (user.authStatus === 'partial') {
          ngZone.run(() => {
            router.navigate(['auth/complete-registration']);
          });
          return false;
        }
        // Allow access to the route
        return true;
      } else if(route.routeConfig?.path === 'auth') {
        return true; // Deny access to the route
      } else{
        ngZone.run(() => {
          router.navigate(['/']);
        });
        return false;
      }
    }),
    take(1)
  );
};
