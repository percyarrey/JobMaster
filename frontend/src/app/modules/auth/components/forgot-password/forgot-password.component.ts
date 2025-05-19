import { Component, EventEmitter, Output } from '@angular/core';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  @Output() submitFormData = new EventEmitter<any>();
  /* VARIABLE DECLARATION */
  tokenSendSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ForgetPwdForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() {
    return this.ForgetPwdForm.controls['email'];
  }

  /* SUBMIT FORM */
  submitForm(): void {
    this.submitFormData.emit(this.ForgetPwdForm.value);
    this.tokenSendSuccess = true;
  }
}
