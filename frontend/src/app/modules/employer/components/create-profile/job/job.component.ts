import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceProviderService } from '../../../services/service-provider.service';

/* FORM */
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { User } from '../../../../auth/interfaces/user';

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
}

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent{
  /* VARIABLE DECLARATION */
  newReq: string = '';
  categoryItems: SelectItem[] = [
    { label: 'Software', value: 'Software' },
    { label: 'Digital assistant', value: 'Digital assistant' },
    { label: 'Social Media Marketer', value: 'Social Media Marketer' },
    { label: 'Others', value: 'others' },
  ];

  suggestions: string[] = [];

  @Output() submitFormData = new EventEmitter<any>();
  constructor(
    private spJob: ServiceProviderService,
    private formBuilder: FormBuilder,
    private store: Store<{ user: User }>
  ) {
    this.store.select('user').subscribe((user) => {
      this.spJob.getJob(user.id).subscribe({
        next:res=>{
          if(res){
            this.JobForm.patchValue(res);
          this.requirements = res.requirements
          }
        },
        error:err=>{
          console.log(err)
        }
      })
    });}

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

    if(this.JobForm.value.otherJob){
      const {otherJob,...final} = {
        ...finalForm,
        category:this.JobForm.value.otherJob
      }
      this.submitFormData.emit(final);
      return
    }
    this.submitFormData.emit(finalForm);
  }
}
