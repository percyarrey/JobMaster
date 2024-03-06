import { Component } from '@angular/core';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/password-match.directive';

/* SERVICES */
import { AuthService } from '../services/auth.service';

/* TOAST */
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-completeregister',
  templateUrl: './complete-register.component.html',
  styleUrl: './complete-register.component.scss',
  providers: [MessageService],
})
export class CompleteregisterComponent {
  /* VARIABLE DECLARATION */
  suggestions: any[] = [];
  accountType: string = 'client';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {}
  /* FORM BUILDER */
  CompleteRegForm = this.formBuilder.group(
    {
      town: ['', Validators.required],
      quarter: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: passwordMatchValidator }
  );

  /* GETTER */
  get town() {
    return this.CompleteRegForm.controls['town'];
  }
  get quarter() {
    return this.CompleteRegForm.controls['quarter'];
  }
  get password() {
    return this.CompleteRegForm.controls['password'];
  }
  get confirmPassword() {
    return this.CompleteRegForm.controls['confirmPassword'];
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

  /* SUBMIT FORM */
  submitForm(): void {
    var finalForm = {
      ...this.CompleteRegForm.value,
      accounttype: this.accountType,
    };
    delete finalForm.confirmPassword;

    this.authService.completeRegistration(finalForm as any).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registered Successfully',
        });
        localStorage.setItem('token', res.token);

        setTimeout(() => {
          // Handle Navigation
          if (this.accountType === 'serviceProvider') {
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
