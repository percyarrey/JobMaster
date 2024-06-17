import { Component } from '@angular/core';
import { Job } from '../../interfaces/job';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { User } from '../../../auth/interfaces/user';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss',
  providers: [MessageService],
})
export class JobDetailComponent {
  userData: User | undefined;
  job!: Job;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private store: Store<{ user: User }>,
    private router: Router,
    private messageService: MessageService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.clientService.getJobDetails(id).subscribe({
        next: (res) => {
          this.job = res;
        },
      });
    });

    this.store.select('user').subscribe((user) => {
      this.userData = user;
    });
  }

  handleDelete() {
    this.clientService.deleteJob(this.job.id).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Job Deleted Succesfully',
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
    });
  }
  handleEdit() {
    this.router.navigate([`employer/editjob/${this.job.id}`]);
  }

  handleApply() {
    this.router.navigate(['success']);
  }
}
