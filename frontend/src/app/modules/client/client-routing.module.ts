import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* COMPONENTS */
import {
  CompanyDetailComponent,
  HomeComponent,
  JobDetailComponent,
  JobListingComponent,
} from './components';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
