import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { accountTypeGuard } from '../../guards/account-type.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
  },
  { path: 'create-profile', component: CreateProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderRoutingModule {}
