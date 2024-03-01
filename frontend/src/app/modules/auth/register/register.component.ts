import { Component, NgModule } from '@angular/core';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/password-match.directive';

/* SERVICES */
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  /* VARIABLE DECLARATION */
  suggestions: any[] = [];
  accountType: string = 'client';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

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
      country: ['', Validators.required],
      address: ['', Validators.required],
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
  get country() {
    return this.RegisterForm.controls['country'];
  }
  get address() {
    return this.RegisterForm.controls['address'];
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
    const query = event.query;
    this.suggestions = this.authService.getSuggestions(query);
  }

  /* HANDLE SWITCH ACCOUNT TYPE */
  handleAccountType(event: any) {
    this.accountType = event.target.name;
  }

  /* SOCIAL AUTHENTICATION */
  /* GOOGLE AUTH*/
  ngOnInit(): void {
    this.authService.InitGoogle();
  }
  handleGoogleLogin = () => {
    this.authService.handleGoogleLogin();
    this.router?.navigate(['/auth/completeregistration']);
  };

  /* SUBMIT FORM */
  submitForm(): void {
    console.log(this.RegisterForm.value);
  }
}