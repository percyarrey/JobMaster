import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceProviderService } from '../../../services/service-provider.service';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { User } from '../../../../auth/interfaces/user';

/* INTERFACES */
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface FinalForm {
  logo: string | null | undefined;
  name?: string | null | undefined;
  year?: string | null | undefined;
  phone?: string | null | undefined;
  whatsapp?: string | null | undefined;
  town?: string | null | undefined;
  services:string[];
  country?: string | null | undefined;
  background?: string | null | undefined;
  facebook?: string | null | undefined;
  linkedin?: string | null | undefined;
  website?: string | null | undefined;
  
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  /* VARIABLE DECLARATION */
  newService: string = '';
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
    year: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]],
    whatsapp: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]],
    town: ['', Validators.required],
    country: ['', Validators.required],
    background: ['', Validators.required],
    facebook: '',
    linkedin: '',
    website: '',
  });
  yearDate: any = ''

  constructor(
    private spService: ServiceProviderService,
    private formBuilder: FormBuilder,
    private store: Store<{ user: User }>
  ) {
    this.countries = this.spService.getSuggestions();
    this.store.select('user').subscribe((user) => {
      this.spService.getProfile(user.id).subscribe({
        next:res=>{
          if(res){
            this.ProfileForm.patchValue(res);
          this.selectedImage = res.logo
          this.services = res.services
          this.yearDate = res.year
          }
        },
        error:err=>{
          console.log(err)
        }
      })
    });
  }
  ngOnInit(): void {
    
    
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
  services: string[] = [];
  updateService(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.newService = inputElement.value;
  }
  addService() {
    if (this.newService !== '') {
      this.services.push(this.newService);
    }
  }

  /* GETTER */
  get name() {
    return this.ProfileForm.controls['name'];
  }
  get year() {
    return this.ProfileForm.controls['year'];
  }
  get phone() {
    return this.ProfileForm.controls['phone'];
  }
  get whatsapp() {
    return this.ProfileForm.controls['whatsapp'];
  }

  get town() {
    return this.ProfileForm.controls['town'];
  }

  get country() {
    return this.ProfileForm.controls['country'];
  }

  get background() {
    return this.ProfileForm.controls['background'];
  }

  /* SUBMIT FORM */
  submitForm() {
    var finalForm: FinalForm = {
      ...this.ProfileForm.value,
      services:this.services,
      logo: this.selectedImage,
    };
    this.submitFormData.emit(finalForm);
  }
}
