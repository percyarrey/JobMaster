import { Component } from '@angular/core';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/password-match.directive';

/* SERVICES */
import { AuthService } from '../services/auth.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-completeregister',
  templateUrl: './completeregister.component.html',
  styleUrl: './completeregister.component.scss',
})
export class CompleteregisterComponent {
  /* VARIABLE DECLARATION */
  suggestions: any[] = [];
  accountType: string = 'client';

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService
  ) {}

  ngOnInit() {}
  /* FORM BUILDER */
  CompleteRegForm = this.formBuilder.group(
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
      country: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: passwordMatchValidator }
  );

  /* GETTER */
  get fname() {
    return this.CompleteRegForm.controls['fname'];
  }
  get lname() {
    return this.CompleteRegForm.controls['lname'];
  }
  get country() {
    return this.CompleteRegForm.controls['country'];
  }
  get address() {
    return this.CompleteRegForm.controls['address'];
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
    this.suggestions = this.AuthService.getSuggestions(query);
  }

  /* HANDLE SWITCH ACCOUNT TYPE */
  handleAccountType(event: any) {
    this.accountType = event.target.name;
  }

  /* SUBMIT FORM */
  submitForm(): void {
    console.log(this.CompleteRegForm.value);
  }
}
