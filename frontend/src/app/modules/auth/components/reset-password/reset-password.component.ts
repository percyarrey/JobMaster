import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

/* FORM */ import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directive';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  @Output() submitFormData = new EventEmitter<any>();
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  /* FORM BUILDER */
  ResetPwdForm = this.formBuilder.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: passwordMatchValidator }
  );

  /*TOGGLE PASSWORD ICONS */
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get password() {
    return this.ResetPwdForm.controls['password'];
  }
  get confirmPassword() {
    return this.ResetPwdForm.controls['confirmPassword'];
  }

  /* SUBMIT FORM */
  submitForm(): void {
    var finalForm = this.ResetPwdForm.value;
    delete finalForm.confirmPassword;
    this.submitFormData.emit(finalForm);
  }
}
