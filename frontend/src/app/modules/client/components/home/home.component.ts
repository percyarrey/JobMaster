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
    this.navForward = this.carousel.isForwardNavDisabled(); // Assign the result to navForward
    this.testimonialNavForward =
      this.testimonialCarousel.isForwardNavDisabled(); // Ass
  }

  /* jobListing CAROUSEL SECTION */
  agenciesNavForward: boolean = false;
  jobListing: Job[] = [
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
    {
      company: {
        id: '1',
        logo: 'assets/images/client/home/electrician.png',
        name: 'TechMasterLimited',
        country: 'United States',
        town: 'San Francisco',
      },
      job: {
        id: '1',
        title: 'Software Engineer',
        type: 'Full-time',
        description:
          'We are looking for a talented software engineer to join our team.',
        experience: 3,
        deadline: new Date('2024-06-30T00:00:00.000Z'),
      },
    },
  ];

  navigateToCompany(id: string) {
    this.router.navigate(['/company', id]);
  }
  navigateToJob(id: string) {
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
