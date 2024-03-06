import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* PRIMENG MODULES */
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';

/* COMPONENT */
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './reset-password/reset-password.component';
import { CompleteregisterComponent } from './complete-register/complete-register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    CompleteregisterComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterModule,
    AutoCompleteModule,
    ToastModule,
  ],
})
export class AuthModule {}
