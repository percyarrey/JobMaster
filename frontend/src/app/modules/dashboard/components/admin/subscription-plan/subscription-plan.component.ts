import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SubscriptionPlanService } from './subscription-service/subscription-plan.service';
import { SubscriptionPlan } from './interface/subscription';

@Component({
  selector: 'app-subscription-plan',

  templateUrl: './subscription-plan.component.html',
  styleUrl: './subscription-plan.component.scss',
})
export class SubscriptionPlanComponent {
  subscriptionPlanService: any = inject(SubscriptionPlanService);

  filteredSubscriptions: any[] = [];
  subscriptionList: SubscriptionPlan[] = [];
  dialogVisibility: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    /*
      this.subscriptionPlanService.getAll().subscribe(
        {
          next: (val: any) => {
            this.subscriptions = val;
            console.log(val)
          }
        }
      );

      */
  }

  initSubscription: SubscriptionPlan = {
    adminId: '',
    planName: '',
    duration: '',
    cost: '',
    createdAt: '',
    updatedAt: '',
  };

  subscription: SubscriptionPlan = {
    adminId: '',
    planName: '',
    duration: '',
    cost: '',
    createdAt: '',
    updatedAt: '',
  };

  subscriptions: SubscriptionPlan[] = [
    {
      adminId: 'admin-01',
      planName: 'Business-subscription',
      duration: '4months',
      cost: '25000',
      createdAt: '2nd March',
      updatedAt: '2nd March',
    },
    {
      adminId: 'admin-02',
      planName: 'tech-subscription',
      duration: '2days',
      cost: '2500',
      createdAt: 'August 8',
      updatedAt: 'August 8',
    },
    {
      adminId: 'admin-03',
      planName: 'product-subscription',
      duration: '3months',
      cost: '10000',
      createdAt: '1st October',
      updatedAt: '1st October',
    },
    {
      adminId: 'admin-04',
      planName: 'some-subscription',
      duration: '5weeks',
      cost: '8000',
      createdAt: '7nd Dec',
      updatedAt: '2nd Dec',
    },
  ];

  confirm(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.deleteRecord(event.id);
      },
      reject: () => {
        //nothing happens here
      },
    });
  }

  toggleDialogue() {
    this.dialogVisibility = !this.dialogVisibility;
  }

  handleAction(event: any) {
    switch (event.action) {
      case 'CREATE':
        this.subscription = this.initSubscription;
        this.toggleDialogue();
        break;

      case 'SAVE':
        const somelist = this.subscriptions;
        let length = this.subscriptions.length;
        const subscription = event.data;
        subscription.adminId = `${length + 1}`;
        somelist.push(event.data);
        this.subscriptions = [...somelist];
        this.toggleDialogue();
        break;

      case 'EDIT':
        this.subscription =
          this.subscriptions.find((obj) => obj.adminId === event.adminId) ||
          this.initSubscription;
        this.toggleDialogue();
        break;

      case 'UPDATE':
        const subscriptionSet = this.subscriptions;
        const choosen =
          this.subscriptions.find(
            (obj: any) => obj.adminId === event.adminId
          ) || this.initSubscription;
        subscriptionSet[subscriptionSet.indexOf(choosen)] = event.data;
        this.subscriptions = [...subscriptionSet];
        this.dialogVisibility = false;
        break;
      case 'DELETE':
        this.confirm(event);
        //console.log(event.id)
        break;
      case 'CLEAR':
        let i: number = 0;
        while (i < this.subscriptions.length) {
          this.subscriptions.pop();
        }
        // this.subscriptions = [];
        break;
      case 'CANCEL':
        this.toggleDialogue();
        break;
      default:
        console.log({ event });
    }
  }
  deleteRecord(id: any) {
    this.subscriptions = this.subscriptions.filter((obj) => obj.adminId !== id);
    this.messageService.add({
      severity: 'error',
      summary: 'confirmed',
      detail: 'record deleted!',
    });
    console.log(this.subscriptions);
  }
}
