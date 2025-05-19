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
  samplePhotos?: string[] | null | undefined;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent implements OnInit {
  /* VARIABLE DECLARATION */
  countries: any[] | undefined;
  services: SelectItem[] = [
    { label: 'Plumbing', value: 'plumbing' },
    { label: 'Electrical', value: 'electrical' },
    { label: 'Carpentry', value: 'carpentry' },
    { label: 'Painting', value: 'painting' },
    { label: 'Others', value: 'others' },
  ];

  suggestions: string[] = [];
  selectedImage: string | undefined;

  @Output() submitFormData = new EventEmitter<any>();
  constructor(
    private spService: ServiceProviderService,
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
  ServiceForm = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
        ],
      ],
      service: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
        ],
      ],
      otherService: [
        '',
        [Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/)],
      ],

      minCost: [, [Validators.required]],
      maxCost: [, [Validators.required]],
      description: ['', [Validators.required]],
    },
    { validators: this.costValidator }
  );

  ngOnInit(): void {
    this.countries = this.spService.getSuggestions();
  }

  /* READ IMAGE */
  onImageChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    } else {
      this.selectedImage = undefined;
    }
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
    return this.ServiceForm.controls['name'];
  }
  get service() {
    return this.ServiceForm.controls['service'];
  }
  get otherService() {
    return this.ServiceForm.controls['otherService'];
  }
  get minCost() {
    return this.ServiceForm.controls['minCost'];
  }
  get maxCost() {
    return this.ServiceForm.controls['maxCost'];
  }

  get description() {
    return this.ServiceForm.controls['description'];
  }

  images: string[] = [];

  handleFileInput(event: any) {
    if (this.images.length < 3) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.images.push(e.target?.result as string);
        };

        reader.readAsDataURL(file);
      }
    }
  }

  /* SUBMIT FORM */
  submitForm() {
    var finalForm: FinalForm = {
      ...this.ServiceForm.value,
    };

    if (this.selectedImage) {
      finalForm = {
        ...finalForm,
        photo: this.selectedImage,
      };
    }
    if (this.images.length > 0) {
      finalForm = {
        ...finalForm,
        samplePhotos: this.images,
      };
    }

    this.submitFormData.emit(finalForm);
  }
}
