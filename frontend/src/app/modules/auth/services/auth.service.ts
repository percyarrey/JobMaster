import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

/* SOCIAL AUTHENTICATION */
/* GOOGLE AUTH */
declare var google: any;

/* FACEBOOK AUTH */
declare const FB: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private appId = '784300333637176';

  jsonData: string[] = [];

  constructor(private http: HttpClient, private router: Router) {
    /* FETCH SUGGESTIONS */
    this.http
      .get<string[]>('./assets/suggestionData.json')
      .subscribe((data) => {
        this.jsonData = data;
      });

    /* FACEBOOK AUTH */
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

  /* GET SUGGESTION */
  getSuggestions(query: string): string[] {
    const results: string[] = [];
    const normalizedQuery = query.toLowerCase();

    for (const item of this.jsonData) {
      const normalizedItem = item.toLowerCase();
      if (normalizedItem.startsWith(normalizedQuery)) {
        results.push(item);
        if (results.length === 5) {
          break; // Break the loop if 5 suggestions are found
        }
      }
    }

    if (results.length === 0) {
      for (const item of this.jsonData) {
        const normalizedItem = item.toLowerCase();
        if (normalizedItem.includes(normalizedQuery)) {
          results.push(item);
          if (results.length >= 5) {
            break; // Break the loop if 5 suggestions are found
          }
        }
      }
    }

    return results;
  }

  /* SOCIAL AUTHENTICATION */
  /* GOOGLE AUTH */
  InitGoogle(): void {
    google.accounts.id.initialize({
      client_id:
        '707075028141-5uk97hhsh5unkvvkegdi1rjt0a4hme0h.apps.googleusercontent.com',
      callback: this.handleGoogleResponse,
    });
    google.accounts.id.prompt();
    this.googleButtonWrapper = this.createFakeGoogleWrapper();
    /* google.accounts.id.prompt((notification: any) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      console.log(notification.getNotDisplayedReason());
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

  handleGoogleResponse(response: any) {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    console.log(payload);
    this.router?.navigate(['/auth/completeregistration']);
  }

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
