import { Component, EventEmitter, Output } from '@angular/core';

/* FORM */
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directive';

/* SERVICES */
import { AuthService } from '../../services/auth.service';

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
export class CompleteRegisterComponent {
  /* VARIABLE DECLARATION */
  countries: any[] | undefined;
  suggestions: any[] = [];
  accountType: string = 'client';
  @Output() submitFormData = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.countries = this.authService.getSuggestions();
  }

  /* FORM BUILDER */
  CompleteRegForm = this.formBuilder.group(
    {
      address: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: passwordMatchValidator }
  );

  /* GETTER */
  get address() {
    return this.CompleteRegForm.controls['address'];
  }
  get country() {
    return this.CompleteRegForm.controls['country'];
  }
  get password() {
    return this.CompleteRegForm.controls['password'];
  }
  get confirmPassword() {
    return this.CompleteRegForm.controls['confirmPassword'];
  }

  /* AUTO COMPLETE */
  search(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.suggestions = filtered;
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

    this.submitFormData.emit(finalForm);

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
