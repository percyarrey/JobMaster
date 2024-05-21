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
/* COMPONENTS */
import { HomeComponent } from './components';

@NgModule({
  declarations: [HomeComponent],
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
  ],
})
export class ClientModule {}
