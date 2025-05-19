import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { accountTypeGuard } from '../../guards/account-type.guard';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [accountTypeGuard],
  },
  { path: 'create-profile', component: CreateProfileComponent },
  { path: 'getting-started', component: GettingStartedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderRoutingModule {}
