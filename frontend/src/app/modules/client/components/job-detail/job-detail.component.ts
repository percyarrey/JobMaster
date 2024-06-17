import { Component } from '@angular/core';
import { Job } from '../../interfaces/job';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss',
})
export class JobDetailComponent {
  constructor(private route: ActivatedRoute,private clientService:ClientService) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.clientService.getJobDetails(id).subscribe({
        next: (res) => {
          if(res){
          this.job= res
          }
        }
      });
    });
  }

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
  }
  job!: Job
  
}
