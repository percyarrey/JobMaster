/* COMPONENT */

/* PRIMENG COMPONENT */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './components/dashboard-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, RouterModule],
  declarations: [DashboardLayoutComponent],
})
export class DashboardModule {}
