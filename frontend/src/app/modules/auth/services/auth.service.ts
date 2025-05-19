import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../interfaces/user';
import { isPlatformBrowser } from '@angular/common';
import decodeToken from '../../../shared/utils/decodeToken';
import { setCookie } from '../../../shared/utils/decodeCookie';

/* SOCIAL AUTHENTICATION */
/* GOOGLE AUTH */
declare var google: any;

/* FACEBOOK AUTH */
declare const FB: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private appId = environment.appID;

  private platformID = inject(PLATFORM_ID);
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngzone: NgZone
  ) {
    /* FACEBOOK AUTH */
    if (isPlatformBrowser(this.platformID)) {
      (window as any).fbAsyncInit = () => {
        FB.init({
          appId: this.appId,
          cookie: true,
          xfbml: true,
          version: 'v19.0',
        });
      };
      // Load the Facebook SDK asynchronously
      (function (d, s, id) {
        let js: any,
          fjs: any = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }

  /* REGISTER USER */
  registerUser(userDetails: User) {
    return this.http.post(
      `${environment.backendUrl}auth/register`,
      userDetails
    );
  }

  /* LOGIN USER */
  loginUser(userDetails: { email: string; password: string }) {
    return this.http.post(`${environment.backendUrl}auth/login`, {
      username: userDetails.email,
      password: userDetails.password,
    });
  }

  /* GET USER PROFILE */
  userProfile() {
    return this.http.get(`${environment.backendUrl}auth/profile`);
  }

  /* COMPLETE REGISTRATION*/
  completeRegistration(userDetails: any) {
    return this.http.patch(
      `${environment.backendUrl}auth/completeRegister`,
      userDetails
    );
  }

  /* FORGOT PASSWORD*/
  forgotPassword(email: string) {
    return true;
  }
  /* FORGOT PASSWORD*/
  resetPassword(email: string) {
    return true;
  }
  /* FORGOT PASSWORD*/
  verifyEmail(email: string) {
    return true;
  }

  /* GET SUGGESTION */
  getSuggestions(): string[] {
    const results: string[] = [];
    try {
      const data$: Observable<string[]> = this.http.get<string[]>(
        './assets/countrySuggestionData.json'
      );
      data$.subscribe((data: any) => {
        for (const item of data) {
          results.push(item);
        }
      });
    } catch (error) {}

    return results;
  }
  /* SOCIAL AUTHENTICATION */
  /* GOOGLE AUTH */
  InitGoogle(): void {
    if (isPlatformBrowser(this.platformID)) {
      google.accounts.id.initialize({
        client_id: environment.clientID,
        callback: this.handleGoogleResponse,
      });
      google.accounts.id.prompt();
      this.googleButtonWrapper = this.createFakeGoogleWrapper();
      /* google.accounts.id.prompt((notification: any) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
    }
  }); */
      google.accounts.id.renderButton(
        document.getElementById('custom-google-btn'),
        {
          theme: 'filled_blue',
          sharp: 'pill',
          width: 400,
        }
      );
    }
  }
  googleSignInWithGoogle = null;
  createFakeGoogleWrapper = () => {
    const googleLoginWrapper = document.createElement('div');
    // Or you can simple hide it in CSS rule for custom-google-button
    googleLoginWrapper.style.display = 'none';

    googleLoginWrapper.id = 'custom-google-btn';

    // Add the wrapper to body
    document.body.appendChild(googleLoginWrapper);

    // Use GSI javascript api to render the button inside our wrapper
    // You can ignore the properties because this button will not appear
    google.accounts.id.renderButton(
      document.getElementById('custom-google-btn'),
      {
        theme: 'filled_blue',
        sharp: 'pill',
        width: 400,
      }
    );
    const googleLoginWrapperButton: any =
      googleLoginWrapper.querySelector('div[role=button]');
    return {
      click: () => {
        googleLoginWrapperButton.click();
      },
    };
  };
  // Now we have a wrapper to click
  googleButtonWrapper: any = null;

  handleGoogleLogin = () => {
    // Use wrapper click to prevent Illegal invocation exception
    this.googleButtonWrapper.click();
    // This will open GSI login and after success you will have
    // a response on googleLoginCallback method previously created
  };

  handleGoogleResponse = (response: any) => {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const finalForm = {
      profilepic: payload.profilepic,
      accounttype: 'none',
      fname: payload.given_name,
      lname: payload.family_name,
      email: payload.email,
      address: 'none',
      country: 'none',
      password: 'none',
      sendEmails: true,
    };

    this.http
      .post(`${environment.backendUrl}auth/socialRegister`, finalForm)
      .subscribe({
        next: (res: any) => {
          setCookie('token', res.token, 30);
          const payload = decodeToken(res.token);
          if (payload.authstatus === 'full') {
            this.ngzone.run(() => {
              this.router?.navigate(['/service-provider']);
            });
          } else {
            this.ngzone.run(() => {
              this.router?.navigate(['/auth/complete-registration']);
            });
          }
        },
        error: (err) => {
          if (err.status === 409) {
            this.ngzone.run(() => {
              this.router?.navigate(['']);
            });
          } else {
            console.error(err);
          }
        },
      });
  };

  /* FACEBOOK AUTH */
  handleFacebookLogin() {
    FB.login(
      (response: any) => {
        if (response.authResponse) {
          console.log(response.authResponse.accessToken);
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  }
}
