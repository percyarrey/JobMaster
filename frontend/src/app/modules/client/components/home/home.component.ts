import {
  Component,
  Inject,
  NgZone,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ClientService } from '../../services/client.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../interfaces/job';
import { Company } from '../../interfaces/company';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
interface Testimonial {
  name: string;
  service?: string;
  profilePath: string;
  testimony: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private clientService: ClientService,
    @Inject(PLATFORM_ID) private platformID: Object,
    private ngzone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientService.getCompany().subscribe({
      next: (res) => {
        this.companyData = [...res, ...this.companyData];
      },
    });
    this.clientService.getJobs('', 0, 10, '').subscribe({
      next: (res) => {
        this.jobListing = [...res];
      },
    });
  }

  /* ! HERO SECTION */
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
  /* SEARCH */
  searchClient() {
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    (queryParams['query'] = this.selectedService?.name
      ? this.selectedService.name
      : this.selectedService),
      this.router.navigate(['/joblisting'], {
        queryParams: queryParams,
      });
  }

  ngOnInit() {
    this.services = this.clientService.getSuggestions('service');
    this.responsiveOptions = [
      {
        breakpoint: '1200px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '576px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  /* CAROUSEL SECTION */
  responsiveOptions: any[] | undefined;
  navForward: boolean = false;

  @ViewChild('carousel') carousel: any;
  @ViewChild('testimonialCarousel') testimonialCarousel: any;
  ngAfterViewInit() {
    /* this.navForward = this.carousel.isForwardNavDisabled(); */ // Assign the result to navForward
    this.testimonialNavForward =
      this.testimonialCarousel.isForwardNavDisabled(); // Ass
  }

  /* jobListing CAROUSEL SECTION */
  agenciesNavForward: boolean = false;
  companyData: Company[] = [
    {
      background: 'https://via.placeholder.com/1920x1080',
      country: 'United States',
      facebook: 'https://www.facebook.com/example-company',
      id: '1',
      linked: '',
      logo: 'https://via.placeholder.com/150',
      name: 'Example Company',
      phone: '+1 (555) 555-5555',
      services: ['Web Development', 'Graphic Design', 'Digital Marketing'],
      town: 'New York',
      userId: 1,
      website: '',
      whatsapp: '+1 (555) 555-5555',
      year: new Date('2015-01-01'),
    },
    {
      background: 'https://via.placeholder.com/1920x1080',
      country: 'Canada',
      facebook: 'https://www.facebook.com/another-example-company',
      id: '2',
      linked: '',
      logo: 'https://via.placeholder.com/150',
      name: 'Another Example Company',
      phone: '+1 (555) 555-5556',
      services: ['Software Development', 'IT Consulting', 'Cloud Services'],
      town: 'Toronto',
      userId: 2,
      website: '',
      whatsapp: '+1 (555) 555-5556',
      year: new Date('2010-05-01'),
    },
    {
      background: 'https://via.placeholder.com/1920x1080',
      country: 'United Kingdom',
      facebook: 'https://www.facebook.com/third-example-company',
      id: '3',
      linked: '',
      logo: 'https://via.placeholder.com/150',
      name: 'Third Example Company',
      phone: '+44 (0) 1234 567890',
      services: ['Branding', 'Social Media Marketing', 'Event Planning'],
      town: 'London',
      userId: 3,
      website: '',
      whatsapp: '+44 (0) 1234 567890',
      year: new Date('2018-09-15'),
    },
    {
      background: 'https://via.placeholder.com/1920x1080',
      country: 'United Kingdom',
      facebook: 'https://www.facebook.com/third-example-company',
      id: '3',
      linked: '',
      logo: 'https://via.placeholder.com/150',
      name: 'Third Example Company',
      phone: '+44 (0) 1234 567890',
      services: ['Branding', 'Social Media Marketing', 'Event Planning'],
      town: 'London',
      userId: 3,
      website: '',
      whatsapp: '+44 (0) 1234 567890',
      year: new Date('2018-09-15'),
    },
  ];
  jobListing!: Job[];

  navigateToCompany(id: string) {
    this.router.navigate(['/company', id]);
  }
  navigateToJob(id: Number) {
    this.router.navigate(['/job', id]);
  }

  /* TESTIMONIAL CAROUSEL SECTION */
  testimonialNavForward: boolean = false;
  testimonials: Testimonial[] = [
    {
      name: 'Kelly Rose Mary',
      service: 'Engineer at Google',
      profilePath: 'assets/images/client/home/agents/agent1.png',
      testimony:
        'We have built a network of trusted freelancers we can depend on when we need something done.',
    },
    {
      name: 'John Doe',
      service: 'Marketing Manager',
      profilePath: 'assets/images/client/home/agents/agent2.png',
      testimony:
        'Working with this team has been a game-changer for our marketing campaigns.',
    },
    {
      name: 'Sarah Johnson',
      profilePath: 'assets/images/client/home/agents/agent3.png',
      testimony:
        'The level of professionalism and expertise exhibited by this agency is unmatched.',
    },
    {
      name: 'Michael Smith',
      service: 'Business Owner',
      profilePath: 'assets/images/client/home/agents/agent4.png',
      testimony:
        'I highly recommend their services. They consistently deliver outstanding results.',
    },
  ];
}
