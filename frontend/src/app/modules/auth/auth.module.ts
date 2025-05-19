import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* PRIME NG MODULES */
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';

/* COMPONENT */
import {
  CompleteRegisterComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
  VerifyEmailComponent,
  ForgotPasswordComponent,
  AuthComponent,
} from './components';

@NgModule({
  declarations: [
    AuthComponent,
    CompleteRegisterComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterModule,
    AutoCompleteModule,
    ToastModule,
    FloatLabelModule,
  ],
})
export class AuthModule {}
