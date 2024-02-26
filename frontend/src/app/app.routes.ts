import { Routes } from '@angular/router';

/* COMPONENTS */
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomeComponent } from './modules/user/home/home.component';
import { ForgotpasswordComponent } from './modules/auth/forgotpassword/forgotpassword.component';

export const routes: Routes = [
  /* HOME */
  { path: '', component: HomeComponent },

  /* AUTH */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
];
