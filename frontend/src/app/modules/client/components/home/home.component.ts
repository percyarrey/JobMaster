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

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
interface Company {
  id: string;
  name: string;
  logo: string;
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
    public router: Router,
    private route: ActivatedRoute
  ) {}

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
  /* AUTO COMPLETE COUNTRY*/
  countries: any[] | undefined;
  countrySuggestions: any[] = [];

  selectedCountry: any;

  searchCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.countrySuggestions = filtered;
  }
  /* SEARCH */
  searchClient() {
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    (queryParams['s'] = this.selectedService?.name
      ? this.selectedService.name
      : this.selectedService),
      (queryParams['location'] = this.selectedCountry?.name
        ? this.selectedCountry.name
        : this.selectedCountry);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  ngOnInit() {
    this.services = this.clientService.getSuggestions('service');
    this.countries = this.clientService.getSuggestions('country');
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
    this.companies = [
      {
        id: '1',
        name: 'Google',
        logo: 'assets/images/client/home/electrician.png',
      },
      {
        id: '2',
        name: 'Twitter',
        logo: 'assets/images/client/home/electronic.png',
      },
      {
        id: '3',
        name: 'Whatsapp',
        logo: 'assets/images/client/home/mechanic.png',
      },
      {
        id: '4',
        name: 'Meta',
        logo: 'assets/images/client/home/glazier.png',
      },
      {
        id: '5',
        name: 'Facebook',
        logo: 'assets/images/client/home/fridge.jpg',
      },
    ];
  }

  /* CAROUSEL SECTION */
  companies: Company[] = [];
  responsiveOptions: any[] | undefined;
  navForward: boolean = false;

  @ViewChild('carousel') carousel: any;
  @ViewChild('testimonialCarousel') testimonialCarousel: any;
  ngAfterViewInit() {
    this.navForward = this.carousel.isForwardNavDisabled(); // Assign the result to navForward
    this.testimonialNavForward =
      this.testimonialCarousel.isForwardNavDisabled(); // Ass
  }

  /* jobListing CAROUSEL SECTION */
  agenciesNavForward: boolean = false;
  jobListing: Job[] = [
    {
      logo: 'assets/images/client/home/electrician.png',
      company: 'Project Gateway',
      country: 'United States',
      jobType: 'Full-Time',
      name: 'Project Writer',
      town: 'Washington',
    },
    {
      logo: 'assets/images/client/home/electrician.png',
      company: 'Eco Innovators',
      country: 'Canada',
      jobType: 'Part-Time',
      name: 'Sustainability Consultant',
      town: 'Vancouver',
    },
    {
      logo: 'assets/images/client/home/electrician.png',
      company: 'Tech Solutions Inc.',
      country: 'United Kingdom',
      jobType: 'Full-Time',
      name: 'Software Developer',
      town: 'London',
    },
    {
      logo: 'assets/images/client/home/electrician.png',
      company: 'HealthFirst',
      country: 'Australia',
      jobType: 'Contract',
      name: 'Healthcare Analyst',
      town: 'Sydney',
    },
    {
      logo: 'assets/images/client/home/electrician.png',
      company: 'Green Energy Co.',
      country: 'Germany',
      jobType: 'Full-Time',
      name: 'Renewable Energy Engineer',
      town: 'Berlin',
    },
    {
      logo: 'assets/images/client/home/electrician.png',
      company: 'EduTech',
      country: 'India',
      jobType: 'Remote',
      name: 'E-learning Specialist',
      town: 'Bangalore',
    },
    {
      logo: 'assets/images/client/home/electrician.png',
      company: 'Marketing Masters',
      country: 'France',
      jobType: 'Full-Time',
      name: 'Digital Marketing Manager',
      town: 'Paris',
    },
  ];

  getCountryInfo(country: any): any {
    const result =
      this.countries?.filter(
        (el) => el.name.toLowerCase() === country.toLowerCase()
      ) || [];
    return result[0] === undefined
      ? { name: 'Cameroon', code: '+237', symbol: 'XAF' }
      : result[0];
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
