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

/* INTERFACES */
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface FinalForm {
  name?: string | null | undefined;
  type?: string | null | undefined;
  phone?: string | null | undefined;
  whatsapp?: string | null | undefined;
  address?: string | null | undefined;
  country?: string | null | undefined;
  bio?: string | null | undefined;
  facebook?: string | null | undefined;
  linkedIn?: string | null | undefined;
  website?: string | null | undefined;
  photo?: string | null | undefined; // Add the 'photo' property with the appropriate type
  Requirements?: string[] | null | undefined;
}

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent implements OnInit {
  /* VARIABLE DECLARATION */
  newReq: string = '';
  countries: any[] | undefined;
  jobs: SelectItem[] = [
    { label: 'Software', value: 'Software' },
    { label: 'Digital assistant', value: 'Digital assistant' },
    { label: 'Social Media Marketer', value: 'Social Media Marketer' },
    { label: 'Others', value: 'others' },
  ];

  suggestions: string[] = [];
  selectedImage: string | undefined;

  @Output() submitFormData = new EventEmitter<any>();
  constructor(
    private spJob: ServiceProviderService,
    private formBuilder: FormBuilder
  ) {}

  costValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const minCost = control.get('minCost');
    const maxCost = control.get('maxCost');

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
      job: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
        ],
      ],
      otherJob: ['', [Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/)]],

      minCost: [, [Validators.required]],
      maxCost: [, [Validators.required]],
      description: ['', [Validators.required]],
    },
    { validators: this.costValidator }
  );

  ngOnInit(): void {
    this.countries = this.spJob.getSuggestions();
  }

  /* AUTO COMPLETE */
  search(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.suggestions = filtered;
  }

  /* GETTER */
  get name() {
    return this.JobForm.controls['name'];
  }
  get job() {
    return this.JobForm.controls['job'];
  }
  get otherJob() {
    return this.JobForm.controls['otherJob'];
  }
  get minCost() {
    return this.JobForm.controls['minCost'];
  }
  get maxCost() {
    return this.JobForm.controls['maxCost'];
  }

  get description() {
    return this.JobForm.controls['description'];
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
    };

    if (this.selectedImage) {
      finalForm = {
        ...finalForm,
        photo: this.selectedImage,
      };
    }
    if (this.requirements.length > 0) {
      finalForm = {
        ...finalForm,
        Requirements: this.requirements,
      };
    }

    this.submitFormData.emit(finalForm);
  }
}
