import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/* MODULES */
import { NotFoundComponent } from './modules/extra/not-found/not-found.component';

export const routes: Routes = [
  /* HOME OR CLIENT*/
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule),
    title: 'JobMaster - Online Remote Job Portal',
  },

  /* AUTH */
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [authGuard],
    title: 'JobMaster | Authentication',
  },

  /* EMPLOYER*/
  {
    path: 'employer',
    loadChildren: () =>
      import('./modules/employer/employer.module').then(
        (m) => m.EmployerModule
      ),

    canActivate: [authGuard],
    title: 'JobMaster | Employers',
  },

  /* 404 */
  { path: '**', component: NotFoundComponent },
];
