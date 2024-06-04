import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
/* COMPONENTS */
import {
  CreateProfileComponent,
  ProfileComponent,
  PublishComponent,
  JobComponent,
} from './components/create-profile';

/* PRIME NG COMPONENT */
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { InputGroupModule } from 'primeng/inputgroup';
@NgModule({
  declarations: [
    /* CREATE PROFILE COMPONENTS*/
    CreateProfileComponent,
    ProfileComponent,
    JobComponent,
    PublishComponent,
  ],
  imports: [
    CalendarModule,
    CommonModule,
    EmployerRoutingModule,
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
    InputGroupModule,
    FormsModule,
  ],
})
export class EmployerModule {}
