import { Routes } from '@angular/router';

/* MODULES */
import { HomeComponent } from './modules/user/home/home.component';

export const routes: Routes = [
  /* HOME */
  { path: '', component: HomeComponent },

  /* AUTH */
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];
