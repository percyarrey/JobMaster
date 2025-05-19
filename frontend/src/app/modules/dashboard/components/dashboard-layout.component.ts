import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-layout',
  template: `
    <section class="x-bg-secondary" style="height: 100%;margin-top: 9px;">
      <div class="grid gap-4 relative">
        <div
          class="x-bg-secondary h-full pl-4 lg:pl-6 pr-2 pt-4 pb-8 panel"
          style="z-index: 1;"
          [ngClass]="toggleNav ? 'closePanel' : ''"
        >
          <div class="flex justify-content-between align-items-center">
            <div class="x-primary text-3xl font-bold">ADMIN PANEL</div>

            <button
              (click)="toggleNav = !toggleNav"
              style="all: unset;cursor: pointer;"
            >
              <img
                src="assets/images/dashboard/indent.png"
                height="28"
                alt="close icon"
              />
            </button>
          </div>
          <div class="tabs-elements mt-5">
            <a
              routerLink="/dashboard"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <i class="pi pi-chart-bar"></i>
              <span>Dashboard</span>
            </a>
            <a routerLink="/dashboard/admin/agencies" routerLinkActive="active">
              <i class="pi pi-bolt"></i>
              <span>Agencies</span>
            </a>
            <a routerLink="/dashboard/admin/users" routerLinkActive="active">
              <i class="pi pi-users"></i>
              <span>Users</span>
            </a>
            <a
              routerLink="/dashboard/admin/categories"
              routerLinkActive="active"
            >
              <i class="pi pi-shopping-cart"></i>
              <span>Categories</span>
            </a>
            <a
              routerLink="/dashboard/admin/subscriptions"
              routerLinkActive="active"
            >
              <i class="pi pi-money-bill"></i>
              <span>Subscription Plan</span>
            </a>
            <!-- <a routerLink="/dashboard">
              <i class="pi pi-bell"></i>
              <span>Notifications</span>
            </a>
            <a routerLink="/dashboard">
              <i class="pi pi-envelope"></i>
              <div
                class="flex justify-content-between align-items-center w-full"
              >
                <span>Message</span>
                <i class="pi pi-chevron-right x-black75 text-lg"></i>
              </div>
            </a>
            <a routerLink="/dashboard">
              <i class="pi pi-megaphone"></i>
              <span>Announcement</span>
            </a> -->
            <a routerLink="/">
              <i class="pi pi-globe"></i>
              <span>Visit Website</span>
            </a>
          </div>
        </div>
        <div class="col pt-4 pr-3 lg:pr-5" style="z-index: 0;overflow-x: auto;">
          <router-outlet> </router-outlet>
        </div>
      </div>

      <!-- MENU BUTTON -->
      <div class="menu-btn bg-white lg:hidden">
        <button
          (click)="toggleNav = !toggleNav"
          class="mt-auto"
          style="all: unset;cursor: pointer;"
        >
          <i class="pi pi-bars text-4xl x-primary"></i>
          <i class="pi  text-3xl x-primary"></i>
        </button>
        <div class="shadow-3 w-full mt-auto" style="margin-bottom: 1px;">
          <hr style="padding: 0; margin: 0" class="x-black25" />
        </div>
      </div>
    </section>
    <hr class="p-0 m-0" style="opacity: 0.2" />
  `,
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  toggleNav: boolean = false;
  constructor() {}
}
