import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  AgenciesComponent,
  ServiceCategoryComponent,
  ServiceCategoryFormComponent,
  ServiceCategoryListComponent,
  SubscriptionPlanComponent,
  SubscriptionPlanFormComponent,
  SubscriptionPlanListComponent,
  UsersComponent,
} from '.';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    DashboardComponent,
    AgenciesComponent,
    UsersComponent,
    ServiceCategoryComponent,
    SubscriptionPlanComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    ChartModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    PaginatorModule,
    ToggleButtonModule,
    ServiceCategoryFormComponent,
    ServiceCategoryListComponent,
    ConfirmPopupModule,

    /* SUBSCRIPTION PLAN */
    SubscriptionPlanListComponent,
    SubscriptionPlanFormComponent,
    FormsModule,
    CommonModule,
    AutoCompleteModule,
    InputTextModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class AdminModule {}
