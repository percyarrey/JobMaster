import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/* FORM */
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* ICONS */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router, private formBuilder: FormBuilder) {}

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
    console.log(this.LoginForm.value);
  }
}
