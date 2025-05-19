import { Component, Input, inject } from '@angular/core';

import { Review } from '../interface/reviews';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AgentDetails } from '../../../../interfaces/agentDetails';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ReviewsComponent {
  @Input() agent!: AgentDetails;
  dialogVisible: boolean = false;
  initReview: Review = {
    userId: '',
    date: '',
    name: '',
    rating: 0,
    review: ' ',
    image: '',
  };
  review: Review = {
    userId: '',
    date: '',
    name: '',
    rating: 0,
    review: ' ',
    image: '',
  };
  reviews: Review[] = [
    {
      userId: '1',
      name: 'John Doe',
      image: 'assets/images/client/home/agents/agent1.png',
      date: '2022-10-15',
      rating: 4,
      review: 'This product exceeded my expectations. Highly recommended!',
    },
    {
      userId: '2',
      name: 'Jane Smith',
      image: 'assets/images/client/home/agents/agent2.png',
      date: '2022-09-28',
      rating: 5,
      review: "Absolutely fantastic! I'm extremely satisfied with my purchase.",
    },
    {
      userId: '3',
      name: 'Michael Johnson',
      image: 'assets/images/client/home/agents/agent3.png',
      date: '2022-08-20',
      rating: 3,
      review: 'The product is good, but there is room for improvement.',
    },
    {
      userId: '4',
      name: 'Emily Davis',
      image: 'assets/images/client/home/agents/agent4.png',
      date: '2022-07-12',
      rating: 5,
      review: 'Outstanding quality and exceptional customer service.',
    },
  ];
  constructor(
    private confimationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  toggleDialog() {
    this.dialogVisible = !this.dialogVisible;
  }
  handleAction(event: any) {
    switch (event.action) {
      case 'CANCEL':
        this.toggleDialog();
        break;
      case 'create':
        this.review = { ...this.initReview };
        this.toggleDialog();
        break;
      case 'save':
        var list = this.reviews;

        const item = event.data;
        //UserId
        item.userId = this.agent.profile.userId;
        //DATE
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        item.date = formattedDate;

        //IMAGE
        item.image = this.agent.profile.profilePic;
        //NAME
        item.name = this.agent.profile.fname + ' ' + this.agent.profile.lname;

        list = [item, ...list];
        this.reviews = [...list];
        this.toggleDialog();
        break;
      case 'update':
        const items = this.reviews;
        const selected =
          this.reviews.find((obj) => obj.userId === event.userId) ||
          this.initReview;
        items[items.indexOf(selected)] = event.data;
        this.reviews = [...items];
        this.dialogVisible = false;
        break;
      case 'edit':
        this.review =
          this.reviews.find((obj) => obj.userId === event.userId) ||
          this.initReview;
        this.toggleDialog();
        break;
      case 'delete':
        this.confirm(event);
        break;

      default:
    }
  }
  confirm(event: any) {
    this.confimationService.confirm({
      target: event.target as EventTarget,
      message: 'Please confirm to proceed Delete.',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      rejectButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-help p-button-sm',
      accept: () => {
        this.deleteService(event.userId);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
          life: 3000,
        });
      },
      reject: () => {},
    });
  }
  deleteService(userId: any) {
    this.reviews = this.reviews.filter((obj) => obj.userId !== userId);
  }
}
