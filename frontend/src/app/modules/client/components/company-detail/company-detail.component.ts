import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Company } from '../../interfaces/company';
import { Job } from '../../interfaces/job';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  company!: Company
  jobs!: Job[]


  constructor(private route: ActivatedRoute, private router: Router, private clientService:ClientService) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.clientService.getCompanyDetails(id).subscribe({
        next: (res) => {
          if(res){
          this.company = res
          }
        }
      });
      this.clientService.getJobByCompany(id).subscribe({
        next:res=>{
          this.jobs = res
        }
      })
    });
    
  }

  ngOnInit() {
    // Fetch company details from the API using the 'ref' parameter in the URL
    const ref = this.route.snapshot.paramMap.get('ref');
    // Replace this with your actual API call
  }

  navigateToJob(id: string) {
    this.router.navigate(['/job', id]);
  }
}
