import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AgenciesComponent,
  ServiceCategoryComponent,
  SubscriptionPlanComponent,
  UsersComponent,
} from '.';
import { NotFoundComponent } from '../../../extra/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'agencies',
    component: AgenciesComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'categories',
    component: ServiceCategoryComponent,
  },
  {
    path: 'subscriptions',
    component: SubscriptionPlanComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
