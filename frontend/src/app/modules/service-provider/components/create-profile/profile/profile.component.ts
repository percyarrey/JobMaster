import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceProviderService } from '../../../services/service-provider.service';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
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
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  /* VARIABLE DECLARATION */
  countries: any[] | undefined;
  types: SelectItem[] = [
    { label: 'Agent', value: 'Agent' },
    { label: 'Agency', value: 'Agency' },
  ];

  suggestions: string[] = [];
  selectedImage: string | undefined;

  @Output() submitFormData = new EventEmitter<any>();

  /* FORM BUILDER */
  ProfileForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
      ],
    ],
    type: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
      ],
    ],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]],
    whatsapp: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]],
    address: ['', Validators.required],
    country: ['', Validators.required],
    bio: '',
    facebook: '',
    linkedIn: '',
    website: '',
  });

  constructor(
    private spService: ServiceProviderService,
    private formBuilder: FormBuilder
  ) {}
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
    return this.ProfileForm.controls['name'];
  }
  get type() {
    return this.ProfileForm.controls['type'];
  }
  get phone() {
    return this.ProfileForm.controls['phone'];
  }
  get whatsapp() {
    return this.ProfileForm.controls['whatsapp'];
  }

  get address() {
    return this.ProfileForm.controls['address'];
  }

  get country() {
    return this.ProfileForm.controls['country'];
  }

  get bio() {
    return this.ProfileForm.controls['bio'];
  }

  /* SUBMIT FORM */
  submitForm() {
    var finalForm: FinalForm = {
      ...this.ProfileForm.value,
    };

    if (this.selectedImage) {
      finalForm = {
        ...finalForm,
        photo: this.selectedImage,
      };
    }

    this.submitFormData.emit(finalForm);
  }
}
