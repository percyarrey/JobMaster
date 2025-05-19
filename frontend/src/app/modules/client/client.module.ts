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
import { AgencyComponent } from './shared/agency/agency.component';
import { AgentComponent, ClientsComponent, HomeComponent } from './components';

/* REVIEWS */

import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {
  ReviewsComponent,
  ReviewsFormComponent,
  ReviewsListComponent,
} from './components/agent/review/components';

@NgModule({
  declarations: [
    HomeComponent,
    AgencyComponent,
    ClientsComponent,
    AgentComponent,

    /* DUMB REVIEW COMPONENT */
    ReviewsComponent,
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
    /* REVIEWS */
    ReviewsListComponent,
    ReviewsFormComponent,
    DialogModule,
    ConfirmPopupModule,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export class ClientModule {}
