import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';

/* COMPONENT */
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CompleteregisterComponent } from './completeregister/completeregister.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    CompleteregisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterModule,
    AutoCompleteModule,
  ],
})
export class AuthModule {}
