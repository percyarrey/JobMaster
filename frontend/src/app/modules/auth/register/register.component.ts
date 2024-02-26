import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/* SUGGESTION INPUT */
import { PrimeNGConfig } from 'primeng/api';

/* FORM */
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../shared/password-match.directive';

/* SERVICES */
import { AuthService } from '../services/auth.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
    RouterModule,
    AutoCompleteModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  suggestions: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService
  ) {}

  ngOnInit() {}
  /* FORM BUILDER */
  RegisterForm = this.formBuilder.group(
    {
      name: [
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
    },
    { validators: passwordMatchValidator }
  );

  /* GETTER */
  get name() {
    return this.RegisterForm.controls['name'];
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

  /* SUBMIT FORM */
  submitForm(): void {
    console.log(this.RegisterForm.value);
  }

  /* AUTO COMPLETE */
  search(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.suggestions = this.AuthService.getSuggestions(query);
  }
}
