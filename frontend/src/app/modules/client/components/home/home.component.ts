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
import { Agent } from '../../interfaces/agent';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
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

  searchServices(event: AutoCompleteCompleteEvent) {
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

  /* SWAP FADE HERO CAROUSEL */
  swapCarousel: boolean = true;

  ngOnInit() {
    this.services = this.clientService.getSuggestions('service');
    this.countries = this.clientService.getSuggestions('country');
    if (isPlatformBrowser(this.platformID)) {
      this.ngzone.runOutsideAngular(() => {
        setInterval(() => {
          this.swapCarousel = !this.swapCarousel;
        }, 10000);
      });
    }
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
    this.categories = [
      {
        id: '1',
        name: 'Electrician',
        description: 'Offers electrical installation.',
        image: 'assets/images/client/home/electrician.png',
      },
      {
        id: '2',
        name: 'Plumber',
        description: 'Provides plumbing services.',
        image: 'assets/images/client/home/electronic.png',
      },
      {
        id: '3',
        name: 'Mechanic',
        description: 'Specializes in automotive repairs',
        image: 'assets/images/client/home/mechanic.png',
      },
      {
        id: '4',
        name: 'Glazier',
        description: 'Install glass on any structures.',
        image: 'assets/images/client/home/glazier.png',
      },
      {
        id: '5',
        name: 'Fridge Repairer',
        description: 'Repair any type of Fridge.',
        image: 'assets/images/client/home/fridge.jpg',
      },
    ];
  }

  /* CAROUSEL SECTION */
  categories: Category[] = [];
  responsiveOptions: any[] | undefined;
  navForward: boolean = false;

  @ViewChild('carousel') carousel: any;
  @ViewChild('agenciesCarousel') agenciesCarousel: any;
  @ViewChild('testimonialCarousel') testimonialCarousel: any;
  ngAfterViewInit() {
    this.navForward = this.carousel.isForwardNavDisabled(); // Assign the result to navForward
    this.agenciesNavForward = this.agenciesCarousel.isForwardNavDisabled(); // Assign the result to navForward
    this.testimonialNavForward =
      this.testimonialCarousel.isForwardNavDisabled(); // Ass
  }

  /* AGENCIES CAROUSEL SECTION */
  agenciesNavForward: boolean = false;
  agencies: Agent[] = [
    {
      service: {
        id: '1',
        name: 'Electrician',
        servicePic: 'assets/images/client/home/agents/agent1.png',
        minCost: 568,
        description:
          'We provide technical and engineering services for homes, businesses, and communities. We have a team of diverse engineers and technicians with lots of hands-on experience. For maintenance, we are 30 minutes a call away.',
      },
      profile: {
        profilePic: 'assets/images/client/home/agents/agent1.png',
        fname: 'Sonman',
        lname: 'Joseph',
        country: { name: 'Cameroon', code: '+237', symbol: 'XAF' },
        city: 'Buea',
        rating: 4.5,
        review: 600,
      },
    },
    {
      service: {
        id: '2',
        name: 'Plumber',
        servicePic: 'assets/images/client/home/agents/agent2.png',
        minCost: 450,
        description:
          'Experienced plumbers providing high-quality plumbing services for residential and commercial properties. We handle all types of plumbing repairs, installations, and maintenance.',
      },
      profile: {
        profilePic: 'assets/images/client/home/agents/agent2.png',
        fname: 'Adebayo',
        lname: 'Oluwasegun',
        country: { name: 'Nigeria', code: '+234', symbol: 'NGN' },
        city: 'Lagos',
        rating: 4.8,
        review: 400,
      },
    },
    {
      service: {
        id: '3',
        name: 'Carpenter',
        servicePic: 'assets/images/client/home/agents/agent3.png',
        minCost: 600,
        description:
          'Skilled carpenters specializing in custom furniture design and woodworking. We create unique and functional pieces tailored to your specific needs and preferences.',
      },
      profile: {
        profilePic: 'assets/images/client/home/agents/agent3.png',
        fname: 'Sekou',
        lname: 'Traore',
        country: { name: 'Mali', code: '+223', symbol: 'XOF' },
        city: 'Bamako',
        rating: 4.2,
        review: 250,
      },
    },
    {
      service: {
        id: '4',
        name: 'Painter',
        servicePic: 'assets/images/client/home/agents/agent4.png',
        minCost: 300,
        description:
          'Professional painters offering interior and exterior painting services. We use high-quality paints and techniques to transform your spaces and create beautiful finishes.',
      },
      profile: {
        rating: 4.6,
        review: 300,
        profilePic: 'assets/images/client/home/agents/agent4.png',
        fname: 'Lerato',
        lname: 'Molefe',
        country: { name: 'South Africa', code: '+27', symbol: 'ZAR' },
        city: 'Johannesburg',
      },
    },
    {
      service: {
        id: '5',
        name: 'Gardener',
        servicePic: 'assets/images/client/home/agents/agent1.png',
        minCost: 250,
        description:
          'Experienced gardeners providing landscaping and maintenance services. We create beautiful outdoor spaces, offer plant care, and handle garden upkeep.',
      },
      profile: {
        profilePic: 'assets/images/client/home/agents/agent1.png',
        fname: 'Ndeye',
        lname: 'Diop',
        country: { name: 'Senegal', code: '+221', symbol: 'XOF' },
        city: 'Dakar',
        rating: 4.4,
        review: 150,
      },
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
