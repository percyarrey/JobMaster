import { Component, OnInit } from '@angular/core';
import { Agent } from '../../interfaces/agent';
import { ActivatedRoute, Router } from '@angular/router';
import { textLength } from '../../../../shared/utils/textLength';

interface event {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  textLength = textLength;
  agencies: Agent[] = [];
  params: any = [];
  constructor(private route: ActivatedRoute, private router: Router) {
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
      {
        service: {
          id: '6',
          name: 'House Cleaner',
          servicePic: 'assets/images/client/home/agents/agent2.png',
          minCost: 200,
          description:
            'Professional house cleaners offering thorough cleaning services for residential properties. We ensure a clean and sanitized living space, paying attention to every detail.',
        },
        profile: {
          rating: 4.3,
          review: 180,
          profilePic: 'assets/images/client/home/agents/agent2.png',
          fname: 'Fatou',
          lname: 'Diallo',
          country: { name: 'Senegal', code: '+221', symbol: 'XOF' },
          city: 'Dakar',
        },
      },
      {
        service: {
          id: '7',
          name: 'Security Guard',
          servicePic: 'assets/images/client/home/agents/agent3.png',
          minCost: 800,
          description:
            'Trained security guards providing protection and surveillance services for residential and commercial properties. We prioritize safety and ensure peace of mind.',
        },
        profile: {
          rating: 4.7,
          review: 320,
          profilePic: 'assets/images/client/home/agents/agent3.png',
          fname: 'Kwame',
          lname: 'Osei',
          country: { name: 'Ghana', code: '+233', symbol: 'GHS' },
          city: 'Accra',
        },
      },
      {
        service: {
          id: '8',
          name: 'Interior Designer',
          servicePic: 'assets/images/client/home/agents/agent4.png',
          minCost: 1000,
          description:
            'Experienced interior designers offering creative and functional design solutions for residential and commercial spaces. We transform interiors into beautiful and inviting environments.',
        },
        profile: {
          rating: 4.9,
          review: 450,
          profilePic: 'assets/images/client/home/agents/agent4.png',
          fname: 'Nadia',
          lname: 'Kamara',
          country: { name: 'Sierra Leone', code: '+232', symbol: 'SLL' },
          city: 'Freetown',
        },
      },
    ];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });
  }

  /* PAGINATOR */

  first: number = 0;

  items: number = 8;

  totalRecords: number = 120;

  options = [
    { label: 4, value: 4 },
    { label: 8, value: 8 },
    { label: 12, value: 12 },
  ];

  onPageChange(event: event) {
    this.first = event.first || 0;
    this.items = event.rows || 8;
    console.log(event.rows);
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    queryParams['first'] = event.first;
    queryParams['items'] = event.rows;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  /* SIMILAR services */
  similarServices: string[] = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Appliance Repair',
    'Furniture Assembly',
  ];
}
