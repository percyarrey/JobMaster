import { Component, ViewChild } from '@angular/core';
import { AgentDetails } from '../../interfaces/agentDetails';
import { textLength } from '../../../../shared/utils/textLength';

import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Agent } from '../../interfaces/agent';
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss',
})
export class AgentComponent {
  agent: AgentDetails = {
    service: {
      id: '',
      servicePic: '',
      name: '',
      description: '',
      category: '',
      minCost: 0,
      portfolio: [],
    },
    profile: {
      profilePic: '',
      fname: '',
      lname: '',
      country: {
        name: '',
        code: '',
        symbol: '',
      },
      city: '',
      address: '',
      rating: 0,
      review: 0,
      phone: '',
      whatsapp: '',
      about: '',
    },
  };

  textLength = textLength;
  constructor(private router: Router) {
    this.agent = {
      service: {
        id: '1',
        name: 'Electrician',
        servicePic: 'assets/images/client/home/agents/agent1.png',
        minCost: 568,
        description:
          'We provide technical and engineering services for homes, businesses, and communities. We have a team of diverse engineers and technicians with lots of hands-on experience. For maintenance, we are 30 minutes a call away.',
        portfolio: [
          'assets/images/client/details/carousel.png',
          'assets/images/client/details/carousel.png',
          'assets/images/client/details/carousel.png',
        ],
        category: 'Electrician',
      },
      profile: {
        rating: 4.5,
        review: 600,
        userId: '2342342',
        profilePic: 'assets/images/client/home/agents/agent1.png',
        fname: 'Sonman',
        lname: 'Joseph',
        country: { name: 'Cameroon', code: '+237', symbol: 'XAF' },
        city: 'Buea',
        address: 'Sample Address',
        about:
          'I am a certified electrician with years of experience in providing reliable electrical services.',
        whatsapp: '674751815',
        phone: '555-6753434',
      },
    };
    if (this.agent.service.servicePic) {
      this.agent.service.portfolio = [
        this.agent.service.servicePic,
        ...this.agent.service.portfolio,
      ];
    }

    this.agencies = [
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
    ];
  }

  /* BREADCRUMBS */
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      {
        label: this.agent.service.category,
        command: () => {
          const queryParams = { category: this.agent.service.category };
          this.router.navigate(['/agencies'], { queryParams: queryParams });
        },
      },
      {
        label: this.agent.profile.fname + ' ' + this.agent.profile.lname,
        command: () => {
          const queryParams = { category: this.agent.service.category };
          this.router.navigate(['/agencies'], { queryParams: queryParams });
        },
      },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

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

  onContact(action: string) {}

  /* PORTFOLIO CAROUSEL SECTION */
  portfolioNavForward: boolean = false;

  /* AGENCIES CAROUSEL SECTION */

  responsiveOptions: any[] | undefined;
  agencies: Agent[] = [];

  /* CONTACT SCROLL PY */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
