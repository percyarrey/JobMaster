import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ChipModule } from 'primeng/chip';
/* COMPONENTS */
import {
  CompanyDetailComponent,
  HomeComponent,
  JobDetailComponent,
  JobListingComponent,
} from './components';
import { ToastModule } from 'primeng/toast';
import { ApplySuccessComponent } from './components/apply-success/apply-success.component';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    HomeComponent,
    JobListingComponent,
    JobDetailComponent,
    CompanyDetailComponent,
    ApplySuccessComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    AutoCompleteModule,
    FormsModule,
    ButtonModule,
    CarouselModule,
    RouterModule,
    PaginatorModule,
    BreadcrumbModule,
    ChipModule,
    ButtonModule,
    ToastModule,
    ButtonModule,
    RippleModule,
  ],
})
export class ClientModule {}
