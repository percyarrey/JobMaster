import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/* MODULES */

export const routes: Routes = [
  /* HOME OR CLIENT*/
  {
    path: '',
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule),
  },

  /* AUTH */
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    /* canActivate: [
      () => {
        const token = localStorage.getItem('token');
        return token ? false : true;
      },
    ], */
  },

  /* SERVICE PROVIDER*/
  {
    path: 'service-provider',
    loadChildren: () =>
      import('./modules/service-provider/service-provider-routing.module').then(
        (m) => m.ServiceProviderRoutingModule
      ),

    canActivate: [authGuard],
    title: 'Service Provider',
  },
];
