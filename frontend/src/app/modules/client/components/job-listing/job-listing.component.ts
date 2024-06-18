import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { textLength } from '../../../../shared/utils/textLength';
import { Job } from '../../interfaces/job';
import { ClientService } from '../../services/client.service';

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
  jobs: Job[] = [];
  params: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    clientService: ClientService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      clientService
        .getJobs(
          params['query'],
          params['first'],
          params['items'],
          params['country']
        )
        .subscribe({
          next: (res) => {
            this.jobs = res.data;
            this.totalRecords = res.totalRecords;
            if (res.data.length < this.items) {
              (async () => {
                await fetch(
                  `https://remotive.com/api/remote-jobs?${
                    params['query'] ? 'search=' + params['query'] + '&' : ''
                  }limit=${this.items - res.data.length}`
                ).then(async (res: any) => {
                  const jobs = await res.json();

                  jobs.jobs.forEach((job: any) => {
                    const externalJob: any = {
                      category: job.category,
                      description: job.description,
                      id: job.id,
                      deadline: job.publication_date,
                      maxsalary: job.salary,
                      name: job.title,
                      requirements: job.tags,
                      type: job.job_type,
                      url: job.url,
                      company: {
                        name: job.company_name,
                        logo: job.company_logo,
                        background: job.description,
                        country: job.candidate_required_location,
                        town: '',
                      },
                    };
                    this.jobs.push(externalJob);
                  });
                });
              })();
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    });
  }

  /* PAGINATOR */

  first: number = 1;

  items: number = 8;

  totalRecords: number = 120;

  options = [
    { label: 4, value: 4 },
    { label: 8, value: 8 },
    { label: 12, value: 12 },
  ];

  onPageChange(event: event) {
    this.first = event.first || 1;
    this.items = event.rows || 8;
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    queryParams['first'] = event.first;
    queryParams['items'] = event.rows;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  handleItemsChange() {
    this.first = 1;
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    queryParams['first'] = this.first;
    queryParams['items'] = this.items;

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

  navigateToJob(path: string) {
    window.open(
      path,
      path.slice(0, 4) === '/job' || path.slice(0, 4) === '/com'
        ? '_parent'
        : '_blank'
    );
  }
}
