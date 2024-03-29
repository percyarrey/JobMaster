import { Component, NgModule } from '@angular/core';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/password-match.directive';

/* SERVICES */
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/* INTERFACES */
import { User } from '../interfaces/user';

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
  suggestions: any[] = [];
  accountType: string = 'client';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
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
      town: ['', Validators.required],
      quarter: ['', Validators.required],
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
  get town() {
    return this.RegisterForm.controls['town'];
  }
  get quarter() {
    return this.RegisterForm.controls['quarter'];
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
    /* this.router?.navigate(['/auth/completeregistration']); */
  };

  /* FACEBOOK AUTH */
  handleFacebookLogin() {
    this.authService.handleFacebookLogin();
    /* this.router?.navigate(['/auth/completeregistration']); */
  }

  /* SUBMIT FORM */
  submitForm(): void {
    var finalForm = {
      ...this.RegisterForm.value,
      accounttype: this.accountType,
    };
    delete finalForm.confirmPassword;
    delete finalForm.termsAndConditions;

    this.authService.registerUser(finalForm as User).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registered Successfully',
        });
        localStorage.setItem('token', res.token);
        const payload = this.authService.decodeToken(res.token);

        setTimeout(() => {
          // Handle Navigation
          if (payload.accountType === 'serviceProvider') {
            this.router?.navigate(['/service-provider/create-profile']);
          } else {
            this.router?.navigate(['']);
          }
        }, 1000);
      },
      (error) => {
        let errorMessage = 'Something went wrong';

        if (error.status === 400) {
          errorMessage = error.message;
        } else if (error.status === 409) {
          errorMessage = error.message;
        } else if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = 'An error occurred on the client side';
        } else if (error.status >= 500) {
          // Server-side error
          errorMessage = 'An error occurred on the server';
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });

        console.error(error);
      }
    );

    /* this.authService.userProfile().subscribe(
      (res) => {
        console.log('profile');
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.router?.navigate(['/auth/login']);
      }
    ); */
  }
}
