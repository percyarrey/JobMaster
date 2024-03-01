import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/* FORM */
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  /* VARIABLE DECLARATION */
  tokenSendSuccess: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ForgetPwdForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() {
    return this.ForgetPwdForm.controls['email'];
  }

  /* SUBMIT FORM */
  submitForm(): void {
    console.log(this.ForgetPwdForm.value);

    this.tokenSendSuccess = true;
  }
}
