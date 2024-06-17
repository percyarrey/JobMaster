import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  Inject,
  inject,
} from '@angular/core';

interface Category {
  name: string;
  description: string;
  image: string;
}
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

/* PRIMENG */
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SidebarModule } from 'primeng/sidebar';
import { Sidebar } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ClientService } from '../../../modules/client/services/client.service';
import { User } from '../../../modules/auth/interfaces/user';
import { Store } from '@ngrx/store';
import { deleteCookie } from '../../utils/decodeCookie';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    TieredMenuModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    FormsModule,
    AutoCompleteModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  /* CHECK SCROLL */
  Scrolled: boolean = false;
  userData: User | undefined;
  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private router: Router,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private store: Store<{ user: User }>
  ) {
    if (isPlatformBrowser(this.platformID)) {
      this.Scrolled = window.scrollY !== 0;
      window.addEventListener('scroll', () => {
        this.Scrolled = window.scrollY !== 0;
      });
    }
    this.store.select('user').subscribe((user) => {
      this.userData = user;
    });
  }

  /* MENU */
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.services = this.clientService.getSuggestions('service');
    this.country = this.clientService.getSuggestions('country');
    this.items = [
      {
        label: this.userData?.fname + ' ' + this.userData?.lname,
        disabled: true,
      },
      {
        label: this.userData?.email,
        disabled: true,
      },
      {
        separator: true,
      },
      {
        label: 'Employer',
        icon: 'pi  pi-briefcase',
        items: [
          {
            label: 'add a job',
            icon: 'pi pi-plus',
            command: (event) => {
              this.router.navigate(['employer/addjob']);
            },
          },
          {
            label: 'edit profile',
            icon: 'pi pi-file',
            command: (event) => {
              this.router.navigate(['employer/editprofile']);
            },
          },
          {
            label: 'all jobs',
            icon: 'pi pi-building ',
            command: (event) => {
              /* this.router.navigate(['/company/', res.id]); */
            },
          },
        ],
        visible: this.userData?.accounttype === 'employer',
      },
      {
        label: 'Messages',
        icon: 'pi pi-envelope',
      },
      {
        label: 'Notifications',
        icon: 'pi pi-bell',
      },

      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (event) => {
          this.logout();
        },
      },
    ];
  }

  isRoute(route: string | string[]): boolean {
    const routes = Array.isArray(route) ? route : [route];

    return routes.some((el) => {
      if (el === '') {
        return this.router.url.valueOf() === '/';
      } else {
        return this.router.url.startsWith('/' + el);
      }
    });
  }

  logout(): void {
    deleteCookie('token');
    this.refreshPage();
  }

  refreshPage(): void {
    window.location.reload();
  }

  /*  SIDEBAR */
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
  sidebarCategoryExpand: boolean = false;

  /* CHANGE LANGUAGE */
  changeLang(): void {}

  /* AUTO COMPLETE SERVICES*/
  services: any[] | undefined;
  serviceSuggestions: any[] = [];

  selectedService: any;

  searchJob(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.services as any[]).length; i++) {
      let service = (this.services as any[])[i];
      if (service.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(service);
      }
    }

    this.serviceSuggestions = filtered;
  }

  /* AUTO COMPLETE COUNTRY*/
  country: any[] | undefined;
  countrySuggestions: any[] = [];

  selectedCountry: any;

  searchCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.country as any[]).length; i++) {
      let country = (this.country as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.countrySuggestions = filtered;
  }

  /* SEARCH DROPDOWN */
  searchVisible: boolean = false;

  searchClient() {
    this.searchVisible = false;
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    queryParams['query'] = this.selectedService?.name
      ? this.selectedService.name
      : this.selectedService;
    this.router.navigate(['/joblisting'], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }
}
