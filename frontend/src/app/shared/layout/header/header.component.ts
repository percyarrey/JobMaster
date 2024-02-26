import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  menuItems: MenuItem[] | undefined;

  ngOnInit() {
    this.menuItems = [
      { label: 'Home', icon: 'pi pi-home' },
      { label: 'Search', icon: 'pi pi-search' },
      { label: 'Notifications', icon: 'pi pi-bell' },
      // Add more menu items as needed
    ];
  }
}
