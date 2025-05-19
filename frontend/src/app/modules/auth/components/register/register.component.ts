import { Component, EventEmitter, NgModule, Output } from '@angular/core';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directive';

/* SERVICES */
import { AuthService } from '../../services/auth.service';

/* INTERFACES */
import { User } from '../../interfaces/user';

/* TOAST */
import { MessageService } from 'primeng/api';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
})
export class RegisterComponent {
  /* VARIABLE DECLARATION */
  countries: any[] | undefined;
  suggestions: any[] = [];
  accountType: string = 'client';
  @Output() submitFormData = new EventEmitter<any>();
  @Output() socialAuth = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.countries = this.authService.getSuggestions();
  }

  /* FORM BUILDER */
  RegisterForm = this.formBuilder.group(
    {
      fname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
        ],
      ],
      lname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      sendEmails: [false],
      termsAndConditions: [false, Validators.requiredTrue],
    },
    { validators: passwordMatchValidator }
  );

  /* GETTER */
  get fname() {
    return this.RegisterForm.controls['fname'];
  }
  get lname() {
    return this.RegisterForm.controls['lname'];
  }
  get email() {
    return this.RegisterForm.controls['email'];
  }
  get address() {
    return this.RegisterForm.controls['address'];
  }
  get country() {
    return this.RegisterForm.controls['country'];
  }
  get password() {
    return this.RegisterForm.controls['password'];
  }
  get confirmPassword() {
    return this.RegisterForm.controls['confirmPassword'];
  }
  get termsAndConditions() {
    return this.RegisterForm.controls['termsAndConditions'];
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

  /* HANDLE SWITCH ACCOUNT TYPE */
  handleAccountType(event: any) {
    this.accountType = event.target.name;
  }

  /* SOCIAL AUTHENTICATION */
  handleSocialAuth = (action: string) => {
    this.socialAuth.emit(action);
  };

  /* SUBMIT FORM */
  submitForm(): void {
    var finalForm = {
      ...this.RegisterForm.value,
      accounttype: this.accountType,
    };
    delete finalForm.confirmPassword;
    delete finalForm.termsAndConditions;

    this.submitFormData.emit(finalForm);
  }
}
