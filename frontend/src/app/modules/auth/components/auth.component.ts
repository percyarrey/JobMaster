import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* SERVICES */
import { AuthService } from '../services/auth.service';

/* TOAST */
import { MessageService } from 'primeng/api';

/* UTILS */
import decodeToken from '../../../shared/utils/decodeToken';

/* INTERFACES */
import { User } from '../interfaces/user';
import { setCookie } from '../../../shared/utils/decodeCookie';
import { Store } from '@ngrx/store';
import { setUser } from '../../../actions/user.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [MessageService],
})
export class AuthComponent implements OnInit {
  activePage: string = '404';
  authStatus: string = decodeToken()?.authstatus || 'none';
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private store: Store<{ user: User }>
  ) {
    this.route.url.subscribe((url: any) => {
      if (url[0] && url[0].path) {
        switch (url[0].path) {
          case 'login':
            this.activePage = 'login';
            break;
          case 'register':
            this.activePage = 'register';
            break;
          case 'complete-registration':
            this.activePage = 'complete-registration';
            break;
          case 'forgot-password':
            this.activePage = 'forgot-password';
            break;
          case 'reset-password':
            this.activePage = 'reset-password';
            break;
          case 'verify-email':
            this.activePage = 'verify-email';
            break;
          // Add more cases for additional login pages

          default:
            this.router.navigate(['/']);
            break;
        }
      } else {
        router.navigate(['/auth/login']);
      }
    });
  }

  ngOnInit() {
    /* SOCIAL AUTHENTICATION */
    this.authService.InitGoogle();
    this.route.url.subscribe((url: any) => {
      if (url[0] && url[0].path) {
        switch (url[0].path) {
          case 'login':
            this.activePage = 'login';
            break;
          case 'register':
            this.activePage = 'register';
            break;
          case 'complete-registration':
            this.activePage = 'complete-registration';
            break;
          case 'forgot-password':
            this.activePage = 'forgot-password';
            break;
          case 'reset-password':
            this.activePage = 'reset-password';
            break;
          case 'verify-email':
            this.activePage = 'verify-email';
            break;
          // Add more cases for additional login pages

          default:
            this.router.navigate(['/']);
            break;
        }
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  submitForm(action: string, data: any): any {
    switch (action) {
      case 'login':
        this.authService.loginUser(data).subscribe({
          next: (res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Login Successfully',
            });
            setCookie('token', res.token, 30);
            const userData = decodeToken(res.token);
            this.store.dispatch(setUser({ user: userData }));
            setTimeout(() => {
              this.router?.navigate(['/']);
            }, 1000);
          },
          error(err) {
            handleFailure(err);
            console.error(err);
          },
        });
        break;
      case 'register':
        this.authService.registerUser(data as User).subscribe({
          next: (res: any) => {
            handleSuccess(res, 'Registered Successfully');
          },
          error: (error) => {
            handleFailure(error);
            console.error(error);
          },
        });
        break;

      case 'complete-registration':
        this.authService.completeRegistration(data).subscribe(
          (res: any) => {
            handleSuccess(res, 'Registered Successfully');
            this.router.navigate(['/']);
          },
          (error) => {
            handleFailure(error);

            console.error(error);
          }
        );
        break;
      case 'forgot-password':
        this.authService.forgotPassword(data.email);
        return true;
        break;
      case 'reset-password':
        this.authService.resetPassword(data.password);
        return true;
        break;
      case 'verify-email':
        this.authService.verifyEmail(data.email);
        return true;
        break;
      default:
        break;
    }

    /* SUBMIT UTIL FUNCTIONS */
    const handleSuccess = (res: any, message: string) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: message,
      });
      setCookie('token', res.token, 30);
      const userData = decodeToken(res.token);
      this.store.dispatch(setUser({ user: userData }));
      setTimeout(() => {
        // Handle Navigation
        if (userData.accounttype === 'employer') {
          this.router?.navigate(['/employer']);
        } else {
          this.router?.navigate(['/']);
        }
      }, 1000);
    };
    const handleFailure = (error: any) => {
      let errorMessage = {
        message: 'Something went wrong',
        type: 'error',
      };
      switch (error.status) {
        case 400:
          errorMessage.message = error.error.message;
          break;
        case 409:
          errorMessage.message = error.error.message;
          errorMessage.type = 'warn';
          break;
        case 401:
          errorMessage.message = 'Wrong Credentials';
          errorMessage.type = 'warn';
          break;
        case 500:
          errorMessage.message = 'An error occurred on the server';
          break;
        default:
          errorMessage.message = 'Something went wrong';
          errorMessage.type = 'error';
          break;
      }
      this.messageService.add({
        severity: errorMessage.type,
        summary: 'Error',
        detail: errorMessage.message,
      });
    };
  }

  socialAuth(action: any): void {
    switch (action) {
      case 'google':
        /* GOOGLE AUTH*/
        /* this.authService.handleGoogleLogin(); */
        break;

      case 'facebook':
        /* FACEBOOK AUTH */
        /* this.authService.handleFacebookLogin(); */
        break;
      default:
        break;
    }
  }
}
