import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/* MODULES */
import { NotFoundComponent } from './modules/extra/not-found/not-found.component';

export const routes: Routes = [
  /* HOME OR CLIENT*/
  {
    path: '',
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule),

    /* canActivate: [authGuard], */
  },

  /* AUTH */
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    title: 'JobMaster | Authentication',
  },

  /* SERVICE PROVIDER*/
  {
    path: 'service-provider',
    loadChildren: () =>
      import('./modules/service-provider/service-provider.module').then(
        (m) => m.ServiceProviderModule
      ),

    canActivate: [authGuard],
    title: 'JobMaster | Service Provider',
  },

  /* DASHBOARD*/
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),

    canActivate: [authGuard],
    title: 'JobMaster | Dashboard',
  },
  { path: '**', component: NotFoundComponent },
];
