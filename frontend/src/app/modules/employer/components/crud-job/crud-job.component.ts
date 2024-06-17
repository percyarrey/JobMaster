import { Component, EventEmitter, OnInit, Output } from '@angular/core';

/* FORM */
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { User } from '../../../auth/interfaces/user';
import { ServiceProviderService } from '../../services/service-provider.service';
import { ActivatedRoute, Router } from '@angular/router';

/* INTERFACES */
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface FinalForm {
  name?: string | null | undefined;
  otherJob?: string | null | undefined;
  category?: string | null | undefined;
  minsalary?: Number | null | undefined;
  maxsalary?: Number | null | undefined;
  requirements?: string[] | null | undefined;
  description?: string | null | undefined;
  type?: string | null | undefined;
  experience?: Number | null | undefined;
  deadline?: string | null | undefined;
}

@Component({
  selector: 'app-crud-job',
  templateUrl: './crud-job.component.html',
  styleUrl: './crud-job.component.scss',
  providers: [MessageService],
})
export class CrudJobComponent {
  /* VARIABLE DECLARATION */
  newReq: string = '';
  categoryItems: SelectItem[] = [
    { label: 'Software', value: 'Software' },
    { label: 'Digital assistant', value: 'Digital assistant' },
    { label: 'Social Media Marketer', value: 'Social Media Marketer' },
    { label: 'Others', value: 'others' },
  ];

  suggestions: string[] = [];
  jobId: string | null = '';

  @Output() submitFormData = new EventEmitter<any>();
  constructor(
    private spJob: ServiceProviderService,
    private formBuilder: FormBuilder,
    private store: Store<{ user: User }>,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.jobId = this.route.snapshot.paramMap.get('id');

    if (this.jobId) {
      this.store.select('user').subscribe((user) => {
        this.spJob.getJob(user.id).subscribe({
          next: (res) => {
            if (res) {
              this.JobForm.patchValue(res);
              this.requirements = res.requirements;
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      });
    }
  }

  costValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const minCost = control.get('minsalary');
    const maxCost = control.get('maxsalary');

    if (!minCost || !maxCost) {
      return null;
    }

    return minCost.value < maxCost.value ? null : { costMismatch: true };
  };

  /* FORM BUILDER */
  JobForm = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
        ],
      ],
      category: ['', [Validators.required]],
      otherJob: '',
      minsalary: [, [Validators.required]],
      maxsalary: [, [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      experience: [, [Validators.pattern('^[0-9]+$')]],
      deadline: ['', [Validators.required]],
    },
    { validators: this.costValidator }
  );

  /* GETTER */
  get name() {
    return this.JobForm.controls['name'];
  }
  get category() {
    return this.JobForm.controls['category'];
  }
  get minsalary() {
    return this.JobForm.controls['minsalary'];
  }
  get maxsalary() {
    return this.JobForm.controls['maxsalary'];
  }

  get description() {
    return this.JobForm.controls['description'];
  }
  get otherJob() {
    return this.JobForm.controls['otherJob'];
  }
  get deadline() {
    return this.JobForm.controls['deadline'];
  }
  get type() {
    return this.JobForm.controls['type'];
  }
  get experience() {
    return this.JobForm.controls['experience'];
  }

  requirements: string[] = [];
  updateReq(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.newReq = inputElement.value;
  }
  addReq() {
    if (this.newReq !== '') {
      this.requirements.push(this.newReq);
    }
  }

  /* SUBMIT FORM */
  submitForm() {
    var finalForm: FinalForm = {
      ...this.JobForm.value,
      requirements: this.requirements,
    };

    if (this.JobForm.value.otherJob) {
      finalForm = {
        ...finalForm,
        category: this.JobForm.value.otherJob,
        experience: this.JobForm.value.experience
          ? this.JobForm.value.experience
          : 0,
      };
    }
    delete finalForm.otherJob;
    this.spJob.addJob(finalForm).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.jobId
            ? 'Job Edited Succesfully'
            : 'Job added Succesfully',
        });
        setTimeout(() => {
          this.router.navigate(['/job/', res.id]);
        }, 1500);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Something went wrong',
        });
        console.log(err);
      },
    });
  }
}
