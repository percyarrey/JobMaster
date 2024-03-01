import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

/* ICONS */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  LoginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
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
    console.log(this.LoginForm.value);
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

  /* FACEBOOK AUTH */
  handleFacebookLogin() {
    this.authService.handleFacebookLogin();
    this.router?.navigate(['/auth/completeregistration']);
  }
}
