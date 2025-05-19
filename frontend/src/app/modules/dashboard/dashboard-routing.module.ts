import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NotFoundComponent } from '../extra/not-found/not-found.component';
// import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./components/admin/admin.module').then((m) => m.AdminModule),
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
