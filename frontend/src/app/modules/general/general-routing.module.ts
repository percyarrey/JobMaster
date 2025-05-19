import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './components/general.component';
import { ServiceDomainComponent } from './components/service-domain/service-domain.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
  },
  {
    path: 'service-domains',
    component: ServiceDomainComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }