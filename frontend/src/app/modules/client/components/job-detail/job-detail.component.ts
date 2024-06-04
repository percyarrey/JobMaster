import { Component } from '@angular/core';
import { Job } from '../../interfaces/job';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss',
})
export class JobDetailComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
  }
  job: Job = {
    company: {
      logo: 'assets/images/client/home/electrician.png',
      id: '1',
      name: 'Acme Inc.',
      country: 'United States',
      town: 'San Francisco',
    },
    job: {
      id: '1',
      title: 'Senior Software Engineer',
      type: 'Full-time',
      description:
        'We are looking for an experienced software engineer to join our team and work on challenging projects.',
      experience: 5,
      deadline: new Date('2023-12-31'),
      requirements: [
        "Bachelor's degree in Computer Science or a related field",
        '5+ years of experience in software development',
        'Proficient in JavaScript, TypeScript, and Angular',
        'Strong problem-solving and critical thinking skills',
        'Excellent communication and teamwork abilities',
      ],
    },
  };
}
