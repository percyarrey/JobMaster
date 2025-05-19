import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProviderRoutingModule } from './service-provider-routing.module';

/* COMPONENTS */
import {
  CreateProfileComponent,
  ProfileComponent,
  PublishComponent,
  ServiceComponent,
} from './components/create-profile';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';

/* PRIME NG COMPONENT */
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    GettingStartedComponent,

    /* CREATE PROFILE COMPONENTS*/
    CreateProfileComponent,
    ProfileComponent,
    ServiceComponent,
    PublishComponent,
  ],
  imports: [
    CommonModule,
    ServiceProviderRoutingModule,
    AccordionModule,
    TabViewModule,
    AutoCompleteModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    FloatLabelModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    CarouselModule,
    ButtonModule,
    RouterModule,
  ],
})
export class ServiceProviderModule {}
