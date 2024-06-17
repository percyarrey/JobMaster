import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { textLength } from '../../../../shared/utils/textLength';
import { Job } from '../../interfaces/job';

interface event {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.scss',
})
export class JobListingComponent {
  textLength = textLength;
  jobs: any = [];
  params: any = [];
  constructor(private route: ActivatedRoute, public router: Router) {

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
  filterCountry(event: any) {
    const selectedValue = event.target.value;
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    queryParams['country'] = selectedValue;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  /* SIMILAR services */
  similarJob: string[] = [
    'software developer',
    'writer',
    'management',
    'director',
    'official',
  ];

  navigateToCompany(id: string) {
    this.router.navigate(['/company', id]);
  }
  navigateToJob(id: string) {
    this.router.navigate(['/job', id]);
  }
}
