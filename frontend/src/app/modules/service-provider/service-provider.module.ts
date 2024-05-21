import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProviderRoutingModule } from './service-provider-routing.module';

/* COMPONENTS */
import { CreateProfileComponent } from './create-profile/create-profile.component';

@NgModule({
  declarations: [CreateProfileComponent],
  imports: [CommonModule, ServiceProviderRoutingModule],
})
export class ServiceProviderModule {}
