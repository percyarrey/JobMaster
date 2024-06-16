import { Component } from '@angular/core';
import decodeToken from '../../../../shared/utils/decodeToken';
import { ServiceProviderService } from '../../services/service-provider.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
  providers: [MessageService],
})
export class CreateProfileComponent {
  activeIndex: number = localStorage.getItem('getStarted')? Number(localStorage.getItem('getStarted')):0;
  step: number = localStorage.getItem('getStarted')? Number(localStorage.getItem('getStarted')):0;
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
        this.spService.saveProfile(data).subscribe({
          next:(res=>{
            
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Company added Succesfully',
            });

            this.activeIndex = 1;
            this.step = 1;
            localStorage.setItem('getStarted','1')
          }),
          error:(err=>{
            console.log(err)
          })
        });
        break;
      case 1:
        /*  */
        this.spService.addJob(data).subscribe({
          next:res=>{
            this.activeIndex = 2;
        this.step = 2;
        localStorage.setItem('getStarted','2')
          },
          error:err=>{
            console.log(err)
          }
        });
        break;
      case 2:
        localStorage.setItem('getStarted','3')
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile Created Succesfully',
        });
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 1000);
        break;
      default:
        break;
    }

    
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
