import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../interfaces/company';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  company: Company = {
    id: 'asdf',
    name: 'Ajua Market',
    website: 'www.ajuamarket.com',
    established: 2021,
    background: 'Company background',
    services: ['Services', 'Expertise'],
    country: 'Cameroon',
    town: 'Remotely',
    logo: 'assets/images/client/home/electrician.png',
    jobs: [
      {
        id: '32',
        title: 'Job Doorway Affiliate Marketer',
        type: 'Part-time',
        description:
          'You work as an afilaite Marketer, recommending the services of Job Doorway to employers and employees and earn from your effort.',

        experience: 2,
        deadline: 2021,
      },
      {
        id: '1',
        title: 'Restaurant Workers',
        type: 'Full-time',
        description: 'Served customers within working hours',
        experience: 2,
        deadline: 2021,
      },
    ],
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Fetch company details from the API using the 'ref' parameter in the URL
    const ref = this.route.snapshot.paramMap.get('ref');
    // Replace this with your actual API call
  }

  navigateToJob(id: string) {
    this.router.navigate(['/job', id]);
  }
}
