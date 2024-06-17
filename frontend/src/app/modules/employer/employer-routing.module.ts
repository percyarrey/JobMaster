import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './components/create-profile';
import { CrudJobComponent } from './components/crud-job/crud-job.component';
import { authGuard } from '../../guards/auth.guard';
import { CrudProfileComponent } from './components/crud-profile/crud-profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: CreateProfileComponent,
  },
  {
    path: 'addjob',
    component: CrudJobComponent,
  },
  {
    path: 'editjob/:id',
    component: CrudJobComponent,
  },
  {
    path: 'editprofile',
    component: CrudProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}
