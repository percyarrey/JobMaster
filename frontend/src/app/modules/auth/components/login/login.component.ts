import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/* ICONS */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() submitFormData = new EventEmitter<any>();
  @Output() socialAuth = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private router: Router) {}

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
    this.submitFormData.emit(this.LoginForm.value);
  }

  /* SOCIAL AUTHENTICATION */
  handleSocialAuth = (action: string) => {
    this.socialAuth.emit(action);
  };
}
