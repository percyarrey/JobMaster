import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

/* TOAST */
import { MessageService } from 'primeng/api';

/* ICONS */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  LoginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /*TOGGLE PASSWORD ICONS */
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get email() {
    return this.LoginForm.controls['email'];
  }
  get password() {
    return this.LoginForm.controls['password'];
  }

  /* SUBMIT FORM */
  submitForm(): void {
    this.authService.loginUser(this.LoginForm.value as any).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login Successfully',
        });
        localStorage.setItem('token', res.token);
        const payload = this.authService.decodeToken(res.token);

        setTimeout(() => {
          // Handle Navigation
          if (payload.accounttype === 'serviceProvider') {
            this.router?.navigate(['/service-provider']);
          } else {
            this.router?.navigate(['']);
          }
        }, 1000);
      },
      (error) => {
        let errorMessage = 'Something went wrong';

        if (error.status === 400) {
          errorMessage = error.message;
        } else if (error.status === 401) {
          errorMessage = error.message;
          this.messageService.add({
            severity: 'warn',
            summary: 'Error',
            detail: errorMessage,
          });
          return;
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
}
