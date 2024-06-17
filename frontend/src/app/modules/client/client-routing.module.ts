import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* COMPONENTS */
import {
  CompanyDetailComponent,
  HomeComponent,
  JobDetailComponent,
  JobListingComponent,
} from './components';
import { ApplySuccessComponent } from './components/apply-success/apply-success.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'joblisting',
    component: JobListingComponent,
  },
  {
    path: 'job/:id',
    component: JobDetailComponent,
  },
  {
    path: 'company/:id',
    component: CompanyDetailComponent,
  },
  {
    path: 'success',
    component: ApplySuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
