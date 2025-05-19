import { Component } from '@angular/core';
import decodeToken from '../../../../shared/utils/decodeToken';
import { ServiceProviderService } from '../../services/service-provider.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { setCookie } from '../../../../shared/utils/decodeCookie';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
  providers: [MessageService],
})
export class CreateProfileComponent {
  activeIndex: number = 0;
  step: number = 0;
  subscriptionData: any[] = [];
  constructor(
    private spService: ServiceProviderService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.spService.getSubscriptionData().subscribe({
      next: (res) => {
        this.subscriptionData = res;
      },
    });
  }

  submitForm(data: any): any {
    switch (this.activeIndex) {
      case 0:
        /* this.spService.saveProfile(data).subscribe((res: any) => {
          handleSuccess(res, 'Login Successfully');
        }); */
        this.activeIndex = 1;
        this.step = 1;
        break;
      case 1:
        this.activeIndex = 2;
        this.step = 2;
        /* this.spService.saveService(data).subscribe((res: any) => {
          handleSuccess(res, 'Login Successfully');
        }); */
        break;
      case 2:
        /* this.spService.saveService(data).subscribe((res: any) => {
          handleSuccess(res, 'Login Successfully');
        }); */
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
      const token = decodeToken(res.token);
      setTimeout(() => {
        // Handle Navigation
        if (token.accounttype === 'serviceProvider') {
          this.router?.navigate(['/service-provider/getting-started']);
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
          errorMessage.message = error.message;
          break;
        case 409:
          errorMessage.message = error.message;
          break;
        case 401:
          errorMessage.message = error.message;
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
}
